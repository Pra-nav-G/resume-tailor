---
name: prove-it
description: Prove work is done before claiming it — run every check fresh and show the output as evidence. Use before saying a story or fix is complete, before opening a PR, and whenever about to report success. (Small commits inside a TDD loop don't need the full run.)
---

# Prove it before you say it's done

"It should work" is not evidence. Before saying a story or fix is done, fixed, passing or ready, run the checks and show what they printed.

## 1. Run every gate (fresh, not from memory)
Use the commands in `CLAUDE.md` → Commands. Typically:

```bash
npm run lint
npm test
npm run test:e2e                     # if the project defines it
npm run build                        # if the project has a build step
bash scripts/check-design-tokens.sh  # if the script exists
```

Run them now, after your last change. A result from before your last edit doesn't count.

For a change you can see or click in the app, also run the app and look at the result (Claude Code's built-in `/verify` does this where your version includes it).

## 2. Check the acceptance criteria one by one
For each AC in the story:
- name the test that proves it, and confirm that test ran and passed in step 1
- if an AC has no automated test (e.g. visual), say how you checked it, or say plainly that it's unchecked

## 3. Check the diff
```bash
git status
git diff --stat
git diff main...HEAD
```
- Only files the story needs are changed. No stray debug logs, commented-out code, `.only`/`.skip`, or TODOs you added.
- No secrets, no `.env`, no generated files.
- Docs updated in the same change (`build-plan.md` tasks and status at minimum).

## 4. Report with evidence
State what you ran and the result, quoting the key output lines, e.g.:

> `npm test`: 42 passed, 0 failed · `npm run lint`: no problems · token check: OK · AC1 → `tag-filter.test.ts: keeps filter in URL` ✓ · AC3: not covered by a test; checked manually in the browser.

## If anything fails
Don't report success, and don't soften it ("mostly works", "should be fine"). Say what failed, show the output, and either fix it (use the fix-bug skill for anything non-obvious) or stop and ask.
