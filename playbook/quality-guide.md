# Quality Guide: Testing, Debugging, Security, Best Practices

The talk says: if you can't explain it, don't merge it, and tests are where your judgment lives. This guide is the human side of that. The agent side lives in `.claude/`: rules and hooks apply on their own, the `tdd`, `fix-bug` and `prove-it` skills kick in when relevant, and the rest are slash commands you run.

## Testing

**The loop (test-driven development):** for each acceptance criterion, write a test, watch it fail, write the least code to pass, clean up, repeat. The `tdd` skill makes Claude work this way.

**Why first?** A test written after the code tends to test whatever the code does. Written first, it tests what the story asks for, and you see it fail, which proves it can catch a break.

**What a good suite looks like**
| Kind | How many | Tests what | Example tools (JS/TS) |
|---|---|---|---|
| Unit | Most | One function or component, fast, no network | Vitest, Jest, Testing Library |
| Integration | Some | One boundary: an API route with its database, a form with its handler | Vitest/Jest + a test DB, MSW for HTTP |
| End-to-end | Few | The critical user paths in a real browser | Playwright (`npm run test:e2e` runs in CI if defined) |

**Your part (the agent can't do this for you)**
- Read the tests in every PR. Ask: would this test fail if the AC broke? If not, it isn't testing the AC.
- Watch for red flags: `.skip`, `.only`, assertions loosened to pass, mocks of the thing being tested, tests named "works" or "renders".
- Rules the agent follows: `.claude/rules/testing.md`.

## Debugging

The `fix-bug` skill makes Claude find the root cause before changing anything:
1. **Reproduce** it reliably, ideally as a failing test
2. **Gather evidence:** what changed (`git log`, `git bisect`), where good data turns bad
3. **One hypothesis at a time**, undoing failed attempts; stop after three and rethink
4. **Fix the cause**, keep the regression test, remove debug logging
5. **Close the loop:** if it's a repeatable mistake, `/add-rule`

You'll know the agent is guessing when it changes several things at once, wraps code in `try/catch` to make an error go away, or says "it works now" without saying why. Ask: "What was the root cause, and which test proves it's fixed?"

## Security

**What runs automatically**
| Layer | Where | Catches |
|---|---|---|
| Secrets hook | `.claude/hooks/block-secrets.sh` | Agent committing keys or `.env` |
| CI `.env` guard | `ci.yml` | Anyone committing `.env` |
| Dependency audit | `ci.yml` (`npm audit`) | Known-vulnerable packages |
| Dependency review | `ci.yml` (PRs that change dependency files) | PRs that add vulnerable packages |
| CodeQL | `codeql.yml` | Injection, XSS and other code-level flaws |
| Dependabot | `dependabot.yml` | Outdated actions and packages (uncomment npm once you have `package.json`) |
| Security rules | `.claude/rules/security.md` | What the agent should never write |
| Security reviewer | `security-reviewer` subagent | Access-control and logic flaws scanners miss |

**Turn these on in GitHub (once per repo)** — Settings → Code security:
- **Dependency graph** (required by the dependency-review check in CI)
- Secret scanning and **push protection** (blocks pushes containing known secret formats)
- Dependabot alerts and security updates
- Private vulnerability reporting (so `SECURITY.md` works)

**Before a launch or demo with real users:** run `/security-audit`.

**The big four to understand yourself**
1. **Secrets in env vars only.** If one leaks, rotate it; deleting the commit isn't enough.
2. **Check authorization on the server for every request**, including "does this user own this record". Hiding a button isn't security.
3. **Never build queries, commands or HTML from user input by gluing strings.** Use parameterized queries and the framework's escaping.
4. **Validate input on the server** with a schema, even if the form validates too.

## Best practices for working with the agent

**Habits**
- **Small and surgical:** one story per branch, small commits, no drive-by refactors. Big diffs hide bugs.
- **Evidence over claims:** "done" means the `prove-it` skill ran the checks and showed the output.
- **Turn every correction into a rule:** `/add-rule`. Your `CLAUDE.md` should get sharper every week.
- **Record decisions:** hard-to-reverse technical choices go in `docs/decisions/`; scope changes go through `/sync-docs`, which writes a proposal in `docs/changes/` first.

**A week in practice**
| When | Do | Why |
|---|---|---|
| Starting a story | `/grill-me S-xx`, then `/implement-story S-xx` | Ten minutes of questions beats a day of rework |
| Something breaks | Let the fix-bug skill find the root cause; ask what proved it | Guessed fixes create new bugs |
| Before merging | `reviewer` subagent; `security-reviewer` for sensitive stories; read the diff yourself | Nobody grades their own work |
| End of a session | `/handoff` | The next session starts without re-explaining |
| Every few stories | `/check-spec` | Catches drift between code and plan early |
| Before a demo or launch | `/check-spec`, `/security-audit`, `/prep-review` | Evidence ready, holes found first |

**Built into Claude Code (complements this template)**
- `/verify` (in recent versions) runs your app and checks a change by observing it; `prove-it` runs the checks. Use both for anything visible.
- `/security-review` gives a quick security pass on the current branch; the `security-reviewer` subagent goes deeper.
- `/review` reviews the current diff; the `reviewer` subagent also checks it against the story's acceptance criteria.
- `/doctor prompt-audit` audits `CLAUDE.md`, rules and skills for outdated or conflicting instructions. Run it after editing them.
