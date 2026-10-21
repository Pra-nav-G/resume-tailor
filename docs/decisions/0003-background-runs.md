# 0003: Running the pipeline in the background

**Status:** Proposed (decided by the S-00 dummy-job test) · **Date:** 2026-10-18 · **Decided by:** @Pra-nav-G
**Related:** S-00, S-07

## Context
A run is 4 model calls and may take 1–3 minutes. The user must be able to close the page (S-06 AC4). Serverless functions have time limits.

## Options considered
1. **Durable step runner (Inngest or Trigger.dev):** each pipeline step is its own invocation with retries; free tier covers personal use. Cons: one more service and dependency.
2. **One step per request, chained through the database:** a step finishes, records its output, and triggers the next (e.g. Next.js `after()`); a cron sweep restarts stuck runs. Cons: hand-rolled retries and recovery.
3. **Long-running server with an in-process queue (Railway/Fly):** simplest code. Cons: always-on cost; jobs lost on restart unless persisted.

## Decision
Option 1 (Inngest) if it runs the S-00 dummy job cleanly on the free tier; otherwise option 2. Either way, run and step state live in our Postgres (`runs`, `run_steps`) so the UI never depends on the runner's dashboard, and all runner code stays in `src/runner/`.

## Consequences
- Easier: per-step retries and "resume from failed step" (S-07 AC3–4).
- Harder: local development needs the runner's dev server.
- Revisit if: free-tier limits are hit or the dependency becomes a problem.
