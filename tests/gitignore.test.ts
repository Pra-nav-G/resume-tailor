import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

function isIgnored(file: string): boolean {
  try {
    execFileSync("git", ["check-ignore", "--quiet", "--no-index", file]);
    return true;
  } catch {
    return false;
  }
}

describe(".gitignore", () => {
  // AC5
  it.each(["data/resume-tailor.db", "data/anything-else.json", "elsewhere/copy.db", "data/resume-tailor.db-wal"])(
    "keeps %s out of git, since the database holds personal data",
    (file) => {
      expect(isIgnored(file)).toBe(true);
    },
  );

  it("still tracks source files", () => {
    expect(isIgnored("src/db/index.ts")).toBe(false);
  });
});
