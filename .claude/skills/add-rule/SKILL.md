---
name: add-rule
description: Turn a correction into a permanent rule in CLAUDE.md under "Lessons learned". Use when the user corrects the agent, says "don't do that again", or runs /add-rule with a description of what went wrong.
argument-hint: [what went wrong]
---

# Turn a correction into a rule

What went wrong: $ARGUMENTS
(If that's empty, use the correction the user just made in this conversation. If there isn't one, ask what went wrong.)

## Steps

1. **Name the mistake** in one line: what you did, and what should have happened.
2. **Write the rule** so it would have prevented the mistake. It must be:
   - specific and checkable ("Use `--space-*` tokens for padding", not "write clean code")
   - about how, not what
   - one line
3. **Check for overlap.** Read `CLAUDE.md` and `.claude/rules/`. If an existing rule already covers it, sharpen that rule instead of adding a new one.
4. **Choose where it goes:**
   - applies everywhere → `CLAUDE.md` → "Lessons learned"
   - applies only to certain files → the matching file in `.claude/rules/` (or a new path-scoped rule file)
5. **Add it** in this format:
   `- [YYYY-MM-DD] [what went wrong] → [rule]`
6. **Show the user** the exact line and where it went. Commit it with the change that fixed the mistake (docs move in the same PR as the code), not on its own later.

## Why this matters
Reviewers ask "show me one correction that became a rule." Each entry here is that answer. Keep `CLAUDE.md` under about 200 lines; if Lessons learned grows long, move topic-specific rules into `.claude/rules/`.
