import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";
import { getDb } from "@/db";
import { applications } from "@/db/schema";
import ApplicationsPage from "./page";

const emptyCopy = "No applications yet. Paste a job description to make your first tailored resume.";

beforeEach(() => {
  process.env.DATABASE_PATH = path.join(mkdtempSync(path.join(os.tmpdir(), "rt-page-")), "page.db");
  delete (globalThis as { db?: unknown }).db;
});

describe("Applications page (SC-02)", () => {
  // AC1
  it("shows the title and the empty state when the database has no applications", async () => {
    const html = renderToStaticMarkup(await ApplicationsPage());

    expect(html).toContain("<h1");
    expect(html).toContain("Applications");
    expect(html).toContain(emptyCopy);
  });

  // AC1: the empty state comes from the database, not hard-coded
  it("lists applications instead of the empty state once one exists", async () => {
    getDb().insert(applications).values({}).run();

    const html = renderToStaticMarkup(await ApplicationsPage());

    expect(html).not.toContain(emptyCopy);
    expect(html.match(/<li/g)).toHaveLength(1);
  });
});
