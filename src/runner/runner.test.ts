import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { asc, eq } from "drizzle-orm";
import { describe, expect, it, vi } from "vitest";
import { openDb, type Db } from "@/db";
import { runSteps, runs } from "@/db/schema";
import { startRun } from "./index";

function tempDb(): Db {
  return openDb(path.join(mkdtempSync(path.join(os.tmpdir(), "rt-runner-")), "test.db"));
}

// A step that waits until the test releases it, so each in-between state can be observed
function gatedStep(name: string) {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => (release = resolve));
  return { step: { name, run: () => gate }, release };
}

function runStatus(db: Db, runId: number) {
  return db.select().from(runs).where(eq(runs.id, runId)).get()?.status;
}

function stepStatuses(db: Db, runId: number) {
  return db
    .select()
    .from(runSteps)
    .where(eq(runSteps.runId, runId))
    .orderBy(asc(runSteps.position))
    .all()
    .map((s) => s.status);
}

describe("startRun", () => {
  // AC3
  it("keeps running after it returns, writing each step's status as it changes, and ends succeeded", async () => {
    const db = tempDb();
    const [a, b, c] = [gatedStep("one"), gatedStep("two"), gatedStep("three")];

    const runId = startRun(db, [a.step, b.step, c.step]);

    // The call has returned, but the job is still going
    expect(runStatus(db, runId)).toBe("running");
    expect(stepStatuses(db, runId)).toEqual(["running", "pending", "pending"]);

    a.release();
    await vi.waitFor(() => expect(stepStatuses(db, runId)).toEqual(["done", "running", "pending"]));

    b.release();
    await vi.waitFor(() => expect(stepStatuses(db, runId)).toEqual(["done", "done", "running"]));

    c.release();
    await vi.waitFor(() => expect(runStatus(db, runId)).toBe("succeeded"));
    expect(stepStatuses(db, runId)).toEqual(["done", "done", "done"]);
  });

  it("marks the step and the run failed when a step throws, and runs no later steps", async () => {
    const db = tempDb();
    const third = vi.fn(async () => {});

    const runId = startRun(db, [
      { name: "one", run: async () => {} },
      { name: "two", run: async () => Promise.reject(new Error("provider down")) },
      { name: "three", run: third },
    ]);

    await vi.waitFor(() => expect(runStatus(db, runId)).toBe("failed"));
    expect(stepStatuses(db, runId)).toEqual(["done", "failed", "pending"]);
    expect(third).not.toHaveBeenCalled();
  });

  it("logs a generic message instead of an unhandled rejection when the database write itself fails", async () => {
    const db = tempDb();
    const logged = vi.spyOn(console, "error").mockImplementation(() => {});

    // Closing the connection makes the runner's next status write throw
    startRun(db, [
      {
        name: "one",
        run: async () => {
          db.$client.close();
        },
      },
    ]);

    await vi.waitFor(() => expect(logged).toHaveBeenCalledWith(expect.stringMatching(/stopped unexpectedly/)));
    logged.mockRestore();
  });
});
