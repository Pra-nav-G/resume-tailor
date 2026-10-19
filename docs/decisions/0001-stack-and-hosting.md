# 0001: Stack and hosting

**Status:** Proposed (confirm in `/grill-me S-00`) · **Date:** 2026-10-18 · **Decided by:** @Pra-nav-G
**Related:** S-00

## Context
One codebase must serve phone and laptop (marketing-doc §9). Single user, low traffic, free tiers preferred. The template's CI assumes Node/TypeScript.

## Options considered
1. **Next.js (App Router) on Vercel + Postgres (Neon) + Drizzle:** one deploy for UI and API, generous free tiers, typed schema and migrations. Cons: serverless time limits affect background runs (see 0003).
2. **Next.js on Railway/Fly (long-running server) + Postgres:** no function time limits. Cons: small monthly cost, more ops.
3. **Separate frontend + Python API:** better for AI tooling. Cons: two codebases and deploys, against "simplest thing that works".

## Decision
Option 1, unless the S-00 dummy job shows the background runner can't fit Vercel's limits; then option 2 with the same code.

## Consequences
- Easier: one repo, one deploy, preview URLs per PR.
- Harder: background work needs an external runner or durable steps (0003).
- Revisit if: runs are routinely cut off, or free-tier limits are hit.
