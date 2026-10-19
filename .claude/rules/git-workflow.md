# Git workflow rules

- **Branches:** one per story, named with the story id: `s14-filter-by-tag`. Work that isn't a story uses a short prefix: `docs-<name>` (from /sync-docs), `fix-<name>`, `chore-<name>`.
- **Commits:** small and often. Story work: `S-14: filter list by tag` (story id + plain description). Other work: `docs: …`, `fix: …`, `chore: …`. Never "fixes", "wip" or "update".
- **Docs travel with the code:** `build-plan.md`, `CLAUDE.md` and `marketing-doc.md` changes go in the same branch and PR as the code they describe.
- **Before opening a PR:** use the prove-it skill, then fill in `.github/pull_request_template.md`, including the story's acceptance criteria as a checklist.
- **History:** don't force-push and don't rewrite shared history.
