# Build Plan — [Project Name]

> Written as an expert product owner. Derived from marketing-doc.md and design-plan.md.
> **Rule:** a story is done only when its acceptance criteria pass AND it uses the design system.
> **Traceability:** every story references screens; every screen maps to a story.

## 1. Purpose

[One paragraph lifted from marketing-doc.md.]

## 2. Non-goals (from marketing-doc.md §4)

- [Non-goal 1]
- [Non-goal 2]

## 3. Definition of done (applies to every story)

- [ ] Acceptance criteria below all pass, each with a test written first
- [ ] Uses design-system tokens/components; no bespoke styles
- [ ] Every check in `CLAUDE.md` → Commands passes, run after the last change (output shown in the PR)
- [ ] Security-reviewed if the story touches auth, payments, personal data, file uploads or user-generated content
- [ ] Docs updated in the same PR (build-plan.md, CLAUDE.md if rules changed)
- [ ] PR description carries the acceptance criteria as a checklist

## 4. Build order

Dependency order, story by story.

| Order | Epic | Why now |
|---|---|---|
| 0 | E0 Walking skeleton | Validates the whole handoff chain |
| 1 | E1 [Epic name] | |
| 2 | E2 [Epic name] | |

## 5. Sprint 0 — Walking skeleton

One thin vertical slice through the whole stack, using real design tokens.

- [ ] Repo scaffolded; branch protection on `main`
- [ ] `design-system/tokens.css` imported and used by one real component
- [ ] One route/screen renders end to end (UI → logic → data)
- [ ] CI runs lint + tests on push (green badge)
- [ ] marketing-doc.md, design-plan.md, build-plan.md, CLAUDE.md, design-system/ committed
- [ ] `.env` in `.gitignore`; secret-blocking hook active

## 6. Epics and stories

### E0 — Walking skeleton
**Goal:** prove stack, tokens, CI, and docs work together.

#### S-00 — [Story title]
- **As a** [user], **I want** [capability], **so that** [outcome].
- **Screens:** SC-01
- **Depends on:** —
- **Acceptance criteria:**
  - AC1 [observable, testable condition]
  - AC2 [empty/error state uses the design system]
  - AC3 [tests added, lint clean]
- **Tasks:**
  - [ ] [task]
  - [ ] [task]
- **Open questions:** [none / list — agent must ask before assuming]

### E1 — [Epic name]
**Goal:** [outcome]
**Boundaries (APIs / data shapes / events this epic owns):** [list, so parallel sessions don't collide]

#### S-01 — [Story title]
- **As a** … **I want** … **so that** …
- **Screens:** SC-02
- **Depends on:** S-00
- **Acceptance criteria:**
  - AC1
  - AC2
  - AC3
- **Tasks:**
  - [ ]
- **Open questions:**

## 7. Traceability matrix

| Story | Screens | Epic | Status |
|---|---|---|---|
| S-00 | SC-01 | E0 | ☐ |
| S-01 | SC-02 | E1 | ☐ |
| S-02 | SC-03 | E1 | ☐ |

## 8. Workshop cycle (repeat)

Review → refine stories → rebuild → re-verify. Every cycle ends with docs updated and committed.
Stale documentation is how the agent starts guessing again.

## 9. Roadmap / backlog

| Milestone | Epics | Target date |
|---|---|---|
| Skeleton | E0 | |
| MVP (smallest version that delivers core value) | E1–E3 | |
| Next | | |
