---
paths:
  - "**/*.{test,spec}.{ts,tsx,js,jsx}"
  - "**/__tests__/**"
  - "tests/**"
  - "e2e/**"
---

# Testing rules

- Every acceptance criterion has at least one test that would fail if the AC broke. Name the AC in the test name or a comment (`// AC2`).
- Name tests after behaviour: `shows the empty state when there are no items`, not `renders correctly`.
- Test what the user or caller sees: rendered text, roles, URLs, responses, stored data. Query UI by role or label text, not CSS classes or test ids, unless there's no accessible alternative.
- Cover the states in `design-system/components.md`: default, empty, loading, error, disabled.
- Mock only at the edges (network, clock, randomness, third-party APIs). Never mock the module under test.
- No real network, no shared mutable state between tests, no dependence on test order, no fixed sleeps (wait for a condition instead).
- Never skip, `.only`, or weaken an assertion to make a test pass. If a test is wrong, fix it and explain why in the commit.
- A bug fix comes with a regression test that failed before the fix.
- Test data: realistic but fake. Never real personal data, real credentials or production URLs.
- Shape of the suite: mostly fast unit tests; integration tests for each API or data boundary; a few end-to-end tests for the critical user paths (at least the walking skeleton's path).
