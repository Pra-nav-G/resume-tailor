# 0006: Local-only, SQLite, in-process background runner

**Status:** Accepted · **Date:** 2026-10-20 · **Decided by:** @Pra-nav-G
**Related:** S-00, S-07 · Replaces 0001 and 0003 · Change: `docs/changes/2026-10-20-local-only.md`

## Context
The owner decided to run the app only on their laptop for now. Hosting-driven choices (managed Postgres, a durable job service, internet-facing sign-in) no longer earn their cost.

## Options considered
1. **SQLite file + in-process runner, server on 127.0.0.1:** nothing to install or run besides the app; one file to back up. Cons: moving to hosting later means porting to Postgres and adding sign-in.
2. **Local Postgres (Docker or Postgres.app) + in-process runner:** closest to the old plan. Cons: a database server to keep running on the laptop.
3. **Keep the hosted plan (0001, 0003):** Cons: three accounts and services the owner doesn't want yet.

## Decision
Option 1, chosen by the owner. Drizzle with SQLite (`better-sqlite3` driver), migrations applied on startup. Background runs execute in the Next.js server process via `src/runner/`; every run and step status is written to the database as it changes, so the UI only reads the database. On startup, runs left `running` are marked failed ("interrupted") and can be resumed (S-07 AC6). `npm run dev` / `npm start` bind to `127.0.0.1`.

## Consequences
- Easier: no accounts, no services, no network exposure; tests use a real temporary SQLite file.
- Harder: data lives on one laptop (owner backs up `data/`); a run stops if the laptop sleeps or the app closes.
- Revisit when: phone access is wanted (needs network exposure + S-02 sign-in, and likely Postgres if hosted).
