<!--
Steering file: the slides call it SteeringFile.md. Keep it named CLAUDE.md at the repo root so Claude Code reads it automatically.
Keep it short, specific, and about HOW, not what (epics say what). Details live in .claude/rules/; don't repeat them here.
Anti-patterns: pasting the whole spec in here · vague virtues ("write clean code") · rules nobody enforces.
-->
# Project: Resume Tailor

## Purpose
A personal, single-user web app that runs locally on the owner's laptop and turns a pasted job description into a tailored resume built **only** from the owner's master resume, runs the work in the background, and tracks each application as its own record. The owner applies manually; the app never submits applications.
Plan: see `build-plan.md`. Spec: see `marketing-doc.md`. Design system: see `design-system/`.

## Working principles
- **Think before coding:** state your assumptions; if something is ambiguous, ask instead of guessing; name the tradeoffs when there's a real choice.
- **Simplest thing that works:** the minimum code the story needs. No speculative features, options or abstractions.
- **Surgical changes:** touch only what the task requires. Don't reformat, rename or "improve" unrelated code; clean up only what you added.
- **Prove it:** define success as checks that can pass or fail (tests, the ACs), work until they pass, and show the output before saying it's done.

## Stack & conventions
- Next.js (App Router), TypeScript strict, Tailwind; SQLite via Drizzle (ADR 0006); AI calls only through `src/ai/` (ADR 0002); background runs only through `src/runner/`, in-process with state in the database (ADR 0006); the server binds to `127.0.0.1` only — tokens come from `/design-system/tokens.css` (Tailwind theme: `/design-system/tailwind.config.js`); component props and states in `/design-system/components.md`
- Never add a dependency without asking
- Prefer small, pure functions; no dead code
- Components in PascalCase

## Commands
- Install: `npm ci`
- Dev: `npm run dev`
- Test: `npm test` · end-to-end: `npm run test:e2e`
- Lint: `npm run lint`
- Build: `npm run build`
- Design-token check: `bash scripts/check-design-tokens.sh`

## Definition of done
- Acceptance criteria in the story pass, each with a test written first (tdd skill)
- Uses design-system tokens and components; no bespoke styles
- Every command above passes, run after the last change, with the output shown (prove-it skill)
- Docs updated in the same PR
- Security-reviewed if the story touches a sensitive area (defined in `.claude/rules/security.md`)

## How to work
- Building or changing behaviour → tdd skill · something broken → fix-bug skill (root cause before any fix) · about to say "done" → prove-it skill
- Standards: `.claude/rules/` — git workflow, security (always loaded); design system, testing (loaded for matching files)
- Start non-trivial work in plan mode and propose before building
- Never commit directly to `main`; one branch per story (details in `.claude/rules/git-workflow.md`)
- Record hard-to-reverse technical decisions in `docs/decisions/` (copy `0000-template.md`)
- New environment variables go in `.env.example` with a placeholder, never in code

## Product rules (non-negotiable)
- **Truthfulness:** generated resume content must cite master-resume IDs (`sourceIds`), checked in code, not by the model (ADR 0004). Never add a path that shows uncited content to the user.
- **Separation:** every query on application data is scoped by application ID (and by the signed-in user once S-02 exists); never mix applications.
- **Provider-agnostic:** no provider SDK imported outside `src/ai/`. Model IDs and prices live in `src/ai/models.ts`.
- **Secrets and personal data:** API keys encrypted at rest (AES-256-GCM), never sent to the browser, never logged. Never log job descriptions, resume content or prompts.
- **Schemas are shared data shapes:** `src/pipeline/schemas.ts` changes need a proposal (`/sync-docs`).

## Before assuming, ask
- Anything touching a sensitive area (auth, payments, personal data, uploads, user-generated content), including any new personal data field
- Any story with an open question in `build-plan.md`
- Any change to the design system or shared data shapes

## Never
- Commit secrets, `.env` files or the database (`data/`, `*.db`): it holds personal data
- Make the server reachable beyond `127.0.0.1` before S-02 sign-in exists
- Edit generated files
- Skip a gate (tests, lint, token check, acceptance criteria)
- Add features that are not in `build-plan.md`

## Lessons learned (each correction becomes a rule; use /add-rule)
- (none yet)
