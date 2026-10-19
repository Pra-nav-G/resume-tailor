---
name: prep-review
description: Prepare for a demo, code review, grading or job interview. Drafts evidence-backed answers to the questions reviewers ask (what did you cut, where was the agent wrong, a correction that became a rule, what you'd rewrite) from the repo's own history. Run with /prep-review.
argument-hint: [audience, e.g. "internship interview" or "capstone grading"]
disable-model-invocation: true
---

# Prepare for a review

Audience: $ARGUMENTS (default: a technical interviewer)

Reviewers open the README, `marketing-doc.md`, `CLAUDE.md`, the commit history and PRs, and the tests. Build the answers from those files only. **Never invent evidence.** If the repo has no example for an answer, say so and suggest what to do about it.

## Gather
1. `README.md`: can the five-line summary stand alone?
2. `marketing-doc.md`: non-goals, §7 red-team results, §7b interviews, §9 decision log.
3. `CLAUDE.md` → Lessons learned, and `.claude/rules/`.
4. `docs/decisions/`, if present.
5. `git log --oneline -50` and merged PR descriptions (especially "Where the agent was wrong" and "AI use").
6. Tests and the latest CI status.

## Draft (write to `docs/review-prep.md`, which is gitignored)
For each question: a short answer you could say out loud, plus the file, commit or PR that proves it.

1. **Walk me through it:** what it does, for whom, and why this instead of the alternative (from the positioning sentence).
2. **What did you cut, and why?** (non-goals, cut stories, decision log)
3. **Where was the agent wrong, and how did you catch it?** (PR notes, reverted commits, failing tests that caught it)
4. **Show me one correction that became a rule.** (a Lessons-learned line and the commit that added it)
5. **Which part would you rewrite now?** (honest: weakest module, missing tests, a decision you'd reverse)
6. **What did you use AI for, and what did you do yourself?** (README disclosure, PR "AI use" sections)

## Then
- List gaps: answers with no evidence, a README over five lines, a red CI badge, missing tests, an empty Lessons learned.
- Suggest the fixes that would most improve the review, smallest first.
- Offer a mock run: ask the questions one at a time and give feedback on each answer.
