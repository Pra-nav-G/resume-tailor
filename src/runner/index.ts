import { and, eq } from "drizzle-orm";
import type { Db } from "@/db";
import { runSteps, runs } from "@/db/schema";

export type JobStep = { name: string; run: () => Promise<void> };

type StepStatus = (typeof runSteps.$inferSelect)["status"];

// Records the run and its steps, then executes them in this server process without
// waiting. Every status change is written to the database, so the UI only reads it (ADR 0006).
export function startRun(db: Db, steps: JobStep[]): number {
  const runId = db.transaction((tx) => {
    const { id } = tx.insert(runs).values({ status: "running" }).returning({ id: runs.id }).get();
    tx.insert(runSteps)
      .values(steps.map((step, position) => ({ runId: id, position, name: step.name, status: "pending" as const })))
      .run();
    return id;
  });
  // A failed status write must not become an unhandled rejection in the server process.
  // The run stays "running" until startup recovery (S-07 AC6) marks it interrupted.
  execute(db, runId, steps).catch(() => console.error(`Run ${runId} stopped unexpectedly`));
  return runId;
}

async function execute(db: Db, runId: number, steps: JobStep[]) {
  for (const [position, step] of steps.entries()) {
    setStepStatus(db, runId, position, "running");
    try {
      await step.run();
    } catch {
      // Error details may carry personal data or provider responses, so only the step is logged
      console.error(`Run ${runId} failed at step "${step.name}"`);
      setStepStatus(db, runId, position, "failed");
      db.update(runs).set({ status: "failed" }).where(eq(runs.id, runId)).run();
      return;
    }
    setStepStatus(db, runId, position, "done");
  }
  db.update(runs).set({ status: "succeeded" }).where(eq(runs.id, runId)).run();
}

function setStepStatus(db: Db, runId: number, position: number, status: StepStatus) {
  db.update(runSteps)
    .set({ status })
    .where(and(eq(runSteps.runId, runId), eq(runSteps.position, position)))
    .run();
}
