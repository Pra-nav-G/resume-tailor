---
name: sprint-0
description: Build Sprint 0, the walking skeleton — one thin vertical slice through the whole stack using real design tokens, with CI, .gitignore and all planning docs committed. Run with /sprint-0 once build-plan.md and design-system/ are in place.
disable-model-invocation: true
---

# Sprint 0: the walking skeleton

Goal: one thin path through the whole stack, using real tokens, that validates the entire handoff chain before any feature work. Documentation is part of the skeleton.

## Before you start
1. Read `build-plan.md` (§4 Build order, §5 Sprint 0, epic E0), `CLAUDE.md`, and `design-system/` (tokens.css, components.md).
2. If any of these still contain template placeholders like `[Project Name]` or `[Story title]`, stop and tell the user which ones. Sprint 0 builds on real plans, not templates.
3. Propose the plan in plan mode: stack setup (including every package the scaffold will install), the one screen or route you'll build end to end, the one real component, and the tests. Wait for approval.

## Build (on a branch: `s00-walking-skeleton`)
- [ ] Scaffold the stack named in `CLAUDE.md` → Stack & conventions, installing only the packages approved in your plan. Any other dependency needs the user's OK first, as `CLAUDE.md` requires.
- [ ] Import `design-system/tokens.css` globally (and `tailwind.config.js` if the stack uses Tailwind).
- [ ] Build one real component from `design-system/components.md` with all its listed states.
- [ ] Wire one screen or route end to end: UI → logic → data (a stub or local data store is fine).
- [ ] Write the test for that path first (tdd skill), plus lint config.
- [ ] Confirm `.env` is in `.gitignore` and `.env.example` lists any variables you introduced.
- [ ] Update `CLAUDE.md` → Commands if the real commands differ from the template.
- [ ] Use the prove-it skill: every check in `CLAUDE.md` → Commands passes, with output shown.

## Docs (same branch)
- [ ] Tick the Sprint 0 checklist and S-00 status in `build-plan.md`.
- [ ] Commit `marketing-doc.md`, `design-plan.md`, `build-plan.md`, `CLAUDE.md` and `design-system/` together with the skeleton.

## Finish
Open a PR using `.github/pull_request_template.md`, then **stop and show the user** before moving on:
- what runs end to end and how to try it
- anything in the plan that turned out wrong (propose edits to `build-plan.md` rather than silently diverging)
- the suggested next story in dependency order

Do not start feature stories in this run.
