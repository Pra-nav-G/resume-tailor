---
name: tdd
description: Test-driven development (red, green, refactor) driven by a story's acceptance criteria. Use when implementing any feature, behaviour change or bug fix, or when asked to write tests. Writes a failing test first, then the minimum code to pass, then cleans up.
argument-hint: [story id or behaviour to build]
---

# Test-driven development

Target: $ARGUMENTS (a story id like `S-14`, or a behaviour). If empty, use the story or bug in progress.

Tests are where judgment lives: they're the executable form of the acceptance criteria. Write them first so they test what the story asks for, not whatever the code happens to do.

## 0. Know what "done" means
- Read the story's acceptance criteria in `build-plan.md` and the testing standard in `.claude/rules/testing.md` (if present).
- Turn each AC into one or more test cases, in plain words, before writing code. Include the empty, error and loading states the AC or `design-system/components.md` mention.
- If an AC can't be turned into a test (it's vague, like "fast" or "nice"), stop and ask what observable result would prove it.

## 1. Red: write one failing test
- Write the smallest test for the next behaviour. Name it after the behaviour, e.g. `keeps the tag filter in the URL after reload`, not `test1` or `works`.
- **Run it and watch it fail.** Read the failure message: it must fail because the behaviour is missing, not because of a typo, bad import or broken setup. A test you never saw fail proves nothing.

## 2. Green: make it pass with the least code
- Write only enough code to pass that test. No extra branches, options or "while I'm here" changes.
- Run the test and confirm it passes. Then run the whole suite to make sure nothing else broke.

## 3. Refactor: clean up with the tests as a safety net
- Remove duplication, improve names, use design-system tokens and components. Don't change behaviour.
- Run the suite again after each refactor. All green, or undo the refactor.

## 4. Repeat
One behaviour per loop until every AC has a passing test. Commit after each green loop with the story id: `S-14: keep tag filter in URL`.

## Rules
- **Never edit a test to make it pass** unless the test itself was wrong; if so, say why in the commit message.
- **Never delete or skip a failing test** to get green (`.skip`, `xit`, commenting out). Fix the code, or stop and ask.
- **Test behaviour, not implementation.** Assert what a user or caller sees (output, rendered text, URL, stored data), not private functions or internal state.
- **Mock only at the edges**: network, time, randomness, third-party services. Don't mock the code under test.
- **Bug fixes start with a test that reproduces the bug** and fails, then the fix (see the fix-bug skill).
- Keep tests fast and independent: no shared state between tests, no order dependence, no real network.

## Done
Every AC maps to at least one passing test. Then use the prove-it skill to run every check and show the evidence, and list the AC-to-test mapping in the PR description.
