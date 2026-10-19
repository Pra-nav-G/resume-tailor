# [Project Name]

[Five lines max: what it does, who it's for, why it's different, how to run it, status.]

![CI](https://github.com/[user]/[repo]/actions/workflows/ci.yml/badge.svg)

## What it does and who for
- **For:** [target customer]
- **Problem:** [one line]
- **Solution:** [one line]
- **Wedge:** [narrow first use case]
- **Deliberately not doing:** [one line]

## Quick start
```bash
git clone https://github.com/[user]/[repo].git
cd [repo]
npm ci
npm run dev
```

## How this project is built
| File | What it is |
|---|---|
| `marketing-doc.md` | The thinking: customer, alternatives, wedge, non-goals, kill criteria |
| `design-plan.md` | Design brief: tone, references, screen inventory, real copy |
| `design-system/` | Exported tokens and component specs |
| `build-plan.md` | Epics, stories, acceptance criteria, roadmap |
| `CLAUDE.md` | Operating rules for the coding agent |
| `.claude/` | Rules, skills (slash commands), subagents, hooks, permissions |
| `docs/decisions/` | Technical decisions and why they were made |
| `docs/changes/` | Scope changes and why the plan changed |
| `SECURITY.md` | How to report a vulnerability |

## Quality
- Tests written first for every acceptance criterion; CI runs lint, tests, end-to-end tests and build on every push
- Security: secret-blocking hook, `npm audit`, dependency review, CodeQL and Dependabot; independent security review for sensitive changes

## Workflow
Think (Claude Chat) → Design (Claude Design) → Build (Claude Code).
One branch per story, PRs carry acceptance criteria, docs move in the same PR as code.

## AI tool disclosure
- **Used AI for:** [market analysis and spec drafting, design-system generation, code generation under review]
- **Written/decided by me:** [product decisions, scope cuts, tests, code review, final architecture]
- **Course/employer policy checked:** [yes — link or note]

## What I cut, and why
- [Feature] — [reason]

## Where the agent was wrong
- [Mistake] → caught by [test/review] → became rule in `CLAUDE.md`: "[rule]"

## License
MIT, see `LICENSE`. If your course or employer requires different terms, replace `LICENSE` and update this line.
