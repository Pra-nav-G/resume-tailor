import { existsSync, mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { databasePath, openDb } from "./index";
import { applications, runSteps, runs } from "./schema";

describe("database", () => {
  // AC1
  it("creates and migrates the database file on first open, including missing folders", () => {
    const file = path.join(mkdtempSync(path.join(os.tmpdir(), "rt-db-")), "nested", "app.db");

    const db = openDb(file);

    expect(existsSync(file)).toBe(true);
    expect(db.select().from(applications).all()).toEqual([]);
    expect(db.select().from(runs).all()).toEqual([]);
    expect(db.select().from(runSteps).all()).toEqual([]);
  });

  // AC1
  it("uses DATABASE_PATH when set, and data/resume-tailor.db otherwise", () => {
    expect(databasePath("/tmp/x.db")).toBe("/tmp/x.db");
    expect(databasePath(undefined)).toBe("data/resume-tailor.db");
  });
});
