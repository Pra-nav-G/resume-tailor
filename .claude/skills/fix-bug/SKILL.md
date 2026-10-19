---
name: fix-bug
description: Systematic debugging for bugs, failing tests, errors, crashes and performance problems. Use whenever something doesn't work as expected, before proposing any fix. Finds the root cause by reproducing, gathering evidence and testing one hypothesis at a time, then fixes it with a regression test.
argument-hint: [symptom or error message]
---

# Systematic debugging

Symptom: $ARGUMENTS (if empty, the failure currently in front of you)

**No fixes before a root cause.** Guessing and patching symptoms creates new bugs and hides the real one. Work through these phases in order.

## 1. Reproduce
- Get the exact error, stack trace, failing test name, input and expected-vs-actual result. Read the whole error message: it often names the problem.
- Reproduce it reliably with the fewest steps. Ideally as a failing automated test (see the tdd skill); otherwise a single command.
- If you can't reproduce it, don't fix anything yet. Gather more information: logs, environment, the exact steps the user took, what's different between where it works and where it doesn't.

## 2. Gather evidence
- **What changed?** `git log --oneline -15`, `git diff main...HEAD`, recent dependency or config changes. If it used to work, `git bisect` finds the commit.
- **Where does good data turn bad?** Trace the value backwards from the symptom, one boundary at a time (UI → handler → service → data). Add temporary logging at each boundary rather than guessing.
- **Find a working example** in the codebase that does something similar, and compare it line by line.

## 3. One hypothesis at a time
- State it explicitly: "I think X causes this because Y."
- Make the smallest change that would prove or disprove it. Change one thing only.
- If it's disproved, undo that change before trying the next hypothesis. Don't stack guesses.
- **After 3 failed hypotheses, stop.** Report what you've learned and ruled out, and question your assumptions (the architecture, the test, the environment) with the user before trying a fourth.

## 4. Fix the cause, not the symptom
- Write or keep a regression test that fails because of the bug.
- Fix the root cause with the smallest change. No unrelated refactors in the same commit.
- Run the regression test (now passing) and the full suite (still passing).
- Remove every temporary log and debug line you added.

## 5. Close the loop
- Commit with the story or bug id and the cause in plain words: `S-14: fix filter reset — URL param was read before hydration`.
- If the bug came from a pattern the agent is likely to repeat, turn it into a rule with the add-rule skill.
- If it reveals a wrong assumption in the plan, flag it for `build-plan.md` or `marketing-doc.md` rather than silently working around it.

## Red flags you're guessing
"Let's just try…", changing several things at once, adding `try/catch` to hide an error, increasing a timeout without knowing why, or "it works now" without knowing what fixed it. If any of these happen, go back to phase 2.
