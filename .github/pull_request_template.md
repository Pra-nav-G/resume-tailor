## Story
Implements **S-[id]** — [story title]
Branch: `s[id]-[short-name]`

## What changed
- [bullet]
- [bullet]

## Acceptance criteria
<!-- Copy each AC from build-plan.md so the reviewer checks boxes instead of guessing what done meant.
     e.g. AC1 tag filter persists in the URL · AC2 empty state uses the design system · AC3 tests added, lint clean -->
- [ ] AC1 [copy from build-plan.md]
- [ ] AC2 [empty/error states use the design system]
- [ ] AC3 [tests added, lint clean]

## Tests (AC → test)
<!-- e.g. AC1 → tag-filter.test.ts "keeps the tag filter in the URL after reload" -->
- AC1 →
- AC2 →

## Definition of done
- [ ] Uses design-system tokens/components; no bespoke styles
- [ ] Tests written first, reviewed by me, and passing (no `.skip`/`.only`, no weakened assertions)
- [ ] Security-reviewed (`security-reviewer` subagent) if this touches auth, payments, personal data, file uploads or user-generated content
- [ ] Lint clean, CI green
- [ ] Docs updated in this PR (`build-plan.md`, `CLAUDE.md` if rules changed)
- [ ] No secrets, no unrelated files, no code I didn't ask for
- [ ] I read the whole diff and can explain every block

## AI use in this PR
- Agent wrote: [what]
- I changed/corrected: [what]
- Where the agent was wrong: [none / description → rule added?]

## Screenshots / notes for reviewer
[optional]
