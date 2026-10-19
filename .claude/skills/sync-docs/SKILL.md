---
name: sync-docs
description: Propagate a scope or product change from marketing-doc.md (the source of truth) to design-plan.md, build-plan.md and CLAUDE.md, so every file tells the same story. Run with /sync-docs and a description of the change.
argument-hint: [the change, e.g. "drop the team plan; focus on solo students"]
disable-model-invocation: true
---

# Sync the docs from the source of truth

The change: $ARGUMENTS
(If empty, compare `marketing-doc.md` against the other docs and find where they disagree.)

Every change starts at the source of truth and flows downstream. Never change a downstream file in a way `marketing-doc.md` doesn't support.

## Steps

1. **Branch:** `git switch -c docs-<short-name>`.
2. **Write the change proposal** at `docs/changes/<YYYY-MM-DD>-<short-name>.md` (copy `docs/changes/0000-template.md`): why, what changes, what stays the same, affected stories and screens, risks. Show it to the user and get a yes before editing any other file.
3. **Source first.** Update `marketing-doc.md`:
   - the affected sections (positioning, gates, non-goals, Lean Canvas)
   - a row in §9 Decision log: date, decision, why, which files change
   - if the change touches a ranked assumption or kill criterion, update §7
4. **Find the ripple.** For each downstream file, list what's now out of date:
   - `design-plan.md`: narrative, tone, screen inventory, real copy, out-of-scope list
   - `build-plan.md`: non-goals, epics, stories, acceptance criteria, build order, traceability matrix, roadmap
   - `CLAUDE.md`: purpose paragraph, "before assuming, ask", "never"
   - `design-system/`: only if the change affects the system. Propose it; don't edit it (it's a governed package).
5. **Show the list** to the user before editing. Flag any story already built or in progress that the change affects.
6. **Edit** the downstream files. Keep traceability intact: every story still references screens and every screen still maps to a story. Mark removed stories as `Cut — see decision log [date]` rather than deleting them silently.
7. **Check consistency:** non-goals match across all three files; no story contradicts the marketing doc; no screen is orphaned.
8. **Commit** the proposal and all doc changes together, e.g. `docs: narrow scope to solo students`, and open a PR that links the proposal and lists affected stories.
9. **After merge**, set the proposal's status to `Applied` with the PR number. The proposal stays in `docs/changes/` as the record of why the plan changed.
