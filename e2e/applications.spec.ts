import { expect, test } from "@playwright/test";

// AC1
test("the Applications page shows the empty state from a fresh database", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Applications" })).toBeVisible();
  await expect(
    page.getByText("No applications yet. Paste a job description to make your first tailored resume."),
  ).toBeVisible();
});
