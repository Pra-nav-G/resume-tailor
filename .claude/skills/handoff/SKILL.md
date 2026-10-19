---
name: handoff
description: Write a handoff note so the next session (or a teammate) can continue without re-explaining anything. Run with /handoff before ending a long session, before clearing context, or when passing work to someone else.
argument-hint: [optional topic]
disable-model-invocation: true
---

# Hand off the work

Topic: $ARGUMENTS (default: what this session worked on)

Write `docs/handoffs/<YYYY-MM-DD>-<short-topic>.md`. The reader has the repo (and its `CLAUDE.md`, `build-plan.md`) but none of this conversation. Don't repeat what the docs already say; link to them.

## Contents
```markdown
# Handoff: [topic] ([date])

## Goal
What we're trying to achieve, and which story or stories (S-xx).

## State
- Branch: `...` · last commit: `...` · CI: passing/failing
- Done: ...
- In progress: ... (exactly where it stopped)
- Not started: ...

## Decisions made (and why)
Choices made in this session that aren't yet in the docs. Flag any that should go into build-plan.md, docs/decisions/ or CLAUDE.md.

## Gotchas
Things that wasted time or will trip up the next person: failing tests and why, environment quirks, wrong assumptions we corrected.

## Next steps
1. The very next action, specific enough to start immediately
2. ...

## Open questions
For the user or the team.
```

## Then
- Run `git status` and mention any uncommitted work in the handoff (or commit it first, if the user agrees).
- Tell the user the file path, and suggest starting the next session with: "Read docs/handoffs/<file> and continue."
- If a decision belongs in the permanent docs, offer to move it there now. Handoffs are temporary; the docs are the source of truth.
