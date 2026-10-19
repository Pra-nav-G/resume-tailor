---
name: check-spec
description: Check that the code still matches the plan — every acceptance criterion implemented and tested, no unplanned features, screens and design system used as specified. Run with /check-spec after a few stories, before a demo, or when you suspect drift between the docs and the code.
argument-hint: [optional epic or story ids, e.g. "E2" or "S-10 S-11"]
disable-model-invocation: true
---

# Check the code against the spec

Scope: $ARGUMENTS (default: every story marked done or in progress in `build-plan.md`)

Spec drift (code and docs telling different stories) is how the agent starts guessing again. This check finds it. **Report only; don't fix anything in this run.**

## 1. Load the spec
- `build-plan.md`: stories in scope, their acceptance criteria, status, non-goals, traceability matrix
- `design-plan.md`: screen inventory and real copy
- `design-system/components.md` and `tokens.css`
- `marketing-doc.md`: non-goals and the decision log

## 2. Check each story in scope
For every acceptance criterion:
- **Implemented?** Find the code that does it (file:line).
- **Tested?** Find the test that would fail if it broke. Run the suite once and use real results.
- **Matches the wording?** Note partial or different behaviour.

## 3. Look the other way: code without a plan
- Routes, screens, components, API endpoints or settings that no story asks for
- Features that appear in the non-goals of `build-plan.md` or `marketing-doc.md`
- Copy in the UI that differs from `design-plan.md` §8

## 4. Design system
- Run `bash scripts/check-design-tokens.sh`.
- Components used with states that `components.md` doesn't define, or defined states that are never implemented (often empty and error states).

## 5. Docs consistency
- Story statuses in `build-plan.md` versus what's actually merged (`git log`)
- Traceability: every story has screens, every screen maps to a story
- Non-goals identical across `marketing-doc.md`, `build-plan.md` and `design-plan.md`

## 6. Report
Print, and offer to save as `docs/spec-check-<YYYY-MM-DD>.md`:

| Story | AC | Implemented | Tested | Notes |
|---|---|---|---|---|

Then three lists:
- **Missing:** ACs not implemented or not tested
- **Unplanned:** code with no story (decide: add a story via /sync-docs, or delete the code)
- **Docs out of date:** statuses, copy or traceability to fix

End with a one-line verdict: **Converged** (code and spec match) or **Drifted** (with the count of items to resolve), and the suggested next step for each item.
