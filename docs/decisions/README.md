# Decisions

One short file per significant technical decision: a choice that's hard to reverse, that someone will later ask "why did we do it this way?", or where the agent's suggestion was overruled.

Product and scope decisions go in `marketing-doc.md` §9 Decision log. Technical ones go here.

**To add one:** copy `0000-template.md` to the next number, e.g. `0001-use-postgres.md`, fill it in, and commit it in the same PR as the change.

| # | Decision | Status | Date |
|---|---|---|---|
| 0001 | Stack and hosting: Next.js + Postgres (Neon) + Drizzle on Vercel | Proposed | 2026-10-18 |
| 0002 | Provider-agnostic AI layer with bring-your-own keys | Proposed | 2026-10-18 |
| 0003 | Background runs: Inngest, fallback to DB-chained steps | Proposed | 2026-10-18 |
| 0004 | Source-traced resume content | Accepted | 2026-10-18 |
| 0005 | Single-user auth: GitHub OAuth allowlist | Proposed | 2026-10-18 |
