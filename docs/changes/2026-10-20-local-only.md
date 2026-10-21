# Change: Run locally on the laptop, no hosting (for now)

**Status:** Approved · **Date:** 2026-10-20 · **Proposed by:** @Pra-nav-G

> Every change starts at the source of truth. This file is written first, approved, then `marketing-doc.md` and the derived files are updated to match.

## Why
The owner decided before S-00 to run the app only on their own laptop instead of hosting it. Without hosting, a database server, a background-job service and internet-facing sign-in are no longer needed, so the simplest design changes.

Decisions made with the owner (2026-10-20):
- No hosting; the app runs with `npm run dev` / `npm start` on the laptop
- Database is a single SQLite file on the laptop
- Laptop only for now: the server listens on `127.0.0.1`, so nothing else on the network can reach it. Phone access comes later.

## What changes
- `marketing-doc.md`: positioning and MVP say "laptop first, phone later"; new non-goal "hosting on the internet (for now)"; feasibility and pre-mortem updated (background-run risk gone; new risk: data lives only on the laptop); decision-log row.
- `design-plan.md`: narrative leads with the laptop; layout stays responsive so phone access later needs no redesign; SC-01 Sign in deferred; hosting added to out of scope.
- `build-plan.md`:
  - S-00: no deploy. Runs locally against SQLite; dummy job runs in-process; server bound to localhost; steps shortened (the 20–40 s sleeps tested serverless time limits, which no longer apply).
  - S-02 Sign-in: **Deferred** to the "Phone access" milestone; replaced in the MVP by the localhost-only binding in S-00.
  - S-06 AC4, S-07: unchanged in intent; "close the page" still works because the job runs in the server process, not the browser.
  - New S-07 AC6: runs left unfinished by a server restart are marked failed on startup, so "Try again" can resume them.
  - S-13 PWA: **Deferred** to "Phone access".
  - Roadmap: new "Phone access" milestone (same Wi-Fi or Tailscale + sign-in + PWA).
- `CLAUDE.md`: stack line (SQLite via Drizzle, in-process runner); "Never" adds committing the database file.
- `docs/decisions/`: 0001 and 0003 **Replaced by 0006**; 0005 **Deferred**; new 0006 "Local-only with SQLite and an in-process runner".
- `.env.example`, `.gitignore`: database path instead of URL; auth and Inngest variables removed; `data/` ignored (it holds personal data).

## What stays the same
- Truthfulness rule (ADR 0004), bring-your-own API keys (ADR 0002), keys encrypted at rest
- Each application is its own record; the tracker; screens SC-02 to SC-06
- Every other story and acceptance criterion

## Affected work
| Story / screen | Status | Effect |
|---|---|---|
| S-00 Walking skeleton | Not started | Changed (local, SQLite, in-process job, localhost only) |
| S-02 Sign-in / SC-01 | Not started | Deferred to Phone access |
| S-07 Background pipeline | Not started | Changed (new AC6, restart recovery) |
| S-13 PWA | Not started | Deferred to Phone access |
| S-03, S-04, S-06 | Not started | Dependency on S-02 removed |

## Risks and open questions
- **Data lives on one laptop.** Losing the laptop loses the tracker. Mitigation: the database is one file the owner can back up; a backup/export story stays in the backlog.
- **Moving to hosting later** means switching SQLite → Postgres and adding sign-in. Drizzle keeps the query code similar; the schema needs porting.
- **No phone use until "Phone access"**, which was part of the original goal. Accepted by the owner for now.
