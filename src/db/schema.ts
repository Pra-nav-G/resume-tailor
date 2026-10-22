import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Minimal for S-00 so SC-02 can query real data; S-06 adds the application fields.
export const applications = sqliteTable("applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const runs = sqliteTable("runs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  status: text("status", { enum: ["running", "succeeded", "failed"] }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const runSteps = sqliteTable("run_steps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  runId: integer("run_id")
    .notNull()
    .references(() => runs.id),
  position: integer("position").notNull(),
  name: text("name").notNull(),
  status: text("status", { enum: ["pending", "running", "done", "failed"] }).notNull(),
});
