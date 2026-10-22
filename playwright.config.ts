import os from "node:os";
import path from "node:path";
import { defineConfig } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "e2e",
  use: { baseURL },
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: false,
    // A fresh throwaway database per run, so e2e never touches the owner's data
    env: {
      DATABASE_PATH: path.join(os.tmpdir(), `resume-tailor-e2e-${Date.now()}.db`),
    },
  },
});
