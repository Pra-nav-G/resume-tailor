# Start Here: Think → Design → Build Template

From the talk "Think First, Then Build". Every step produces a file the next step consumes. The files are the method.

## The flow
```
Claude Chat   → marketing-doc.md ──┬→ design-plan.md → Claude Design → design-system/
(question funnel, red-team,        │
 real user interviews)             └→ build-plan.md + CLAUDE.md ─────→ Claude Code → repo
                     ↑                                                     │
                     └──────── every change starts at the source of truth ─┘
```

## Two ways to use it
- **As a project template** (the full workflow): click **Use this template**. You get the planning docs, design system, CI, security setup and all the Claude Code skills. Follow the steps below.
- **As a plugin** (just the Claude Code skills, subagents and hooks, in any existing project):
  ```
  /plugin marketplace add Pra-nav-G/dev-workflow-template
  /plugin install think-design-build@dev-workflow-template
  ```
  Plugin skills are namespaced, e.g. `/think-design-build:fix-bug`. `tdd`, `fix-bug`, `prove-it`, `grill-me`, `handoff`, `security-audit` and both subagents work in any project; `/implement-story`, `/sprint-0`, `/check-spec` and `/sync-docs` expect this template's planning files (`build-plan.md`, `design-system/`). Plugins can't ship `CLAUDE.md` or `.claude/rules/`, so copy `.claude/rules/security.md` and `testing.md` into your project if you want those standards too. Don't install the plugin into a project made from this template: you'd get every hook twice.

## What's in this repo
```
├── START-HERE.md                  ← you are here (delete in your project if you like)
├── README.md · LICENSE · SECURITY.md · CREDITS.md
├── marketing-doc.md               ← source of truth (Lean Canvas, gates, red-team, interview log)
├── design-plan.md                 ← feed to Claude Design
├── build-plan.md                  ← epics, stories, acceptance criteria
├── CLAUDE.md                      ← steering file: principles, stack, definition of done
├── .gitignore · .env.example · .editorconfig
├── design-system/                 ← tokens.css, tailwind.config.js, components.md
├── docs/
│   ├── decisions/                 ← one file per technical decision
│   ├── changes/                   ← one proposal per scope change (/sync-docs)
│   └── handoffs/                  ← created by /handoff (security-audit and review-prep reports stay local, gitignored)
├── scripts/
│   ├── init.sh                    ← run once: names, owners, badge, permissions
│   └── check-design-tokens.sh     ← fails on hard-coded colours/sizes (in CI)
├── .github/
│   ├── CODEOWNERS · dependabot.yml · pull_request_template.md
│   ├── ISSUE_TEMPLATE/story.md
│   └── workflows/
│       ├── ci.yml                 ← .env guard, token check, lint, tests, e2e, build,
│       │                             npm audit, dependency review, docs-drift warning
│       └── codeql.yml             ← security scanning when app code changes
├── .claude/
│   ├── settings.json              ← permissions + hook wiring
│   ├── rules/                     ← git-workflow, security (always on); design-system, testing (for matching files)
│   ├── skills/                    ← see "Slash commands" below
│   ├── agents/                    ← reviewer, security-reviewer (independent subagents)
│   ├── hooks/                     ← block-secrets.sh, format-file.sh
│   └── plugin-hooks.json          ← hooks for plugin installs
├── .claude-plugin/ · agents/      ← plugin packaging (init.sh removes these in your project)
└── playbook/
    ├── slide-map.md               ← every slide → where it lives; toolkit; next steps
    ├── prompts.md                 ← every prompt from the talk, plus extras
    ├── question-worksheet.md      ← the 5-gate, 25-question funnel
    ├── red-team-prompts.md        ← pre-mortem, assumptions, kill criteria, buyer attack
    ├── user-interview-guide.md    ← how to test assumptions with real people
    ├── quality-guide.md           ← testing, debugging, security, best practices
    └── team-and-habits.md         ← roles, git habits, branch protection, reviewer checklist
```

## Slash commands (Claude Code)
| Command | Use it |
|---|---|
| `/sprint-0` | Once: build the walking skeleton, then stop for review |
| `/grill-me S-xx` | Before a story: resolve every open question |
| `/implement-story S-xx` | Build one story: test-first, verified, reviewed, documented |
| `/check-spec` | Every few stories: does the code still match the plan? |
| `/sync-docs [change]` | Scope change: proposal, then source of truth, then everything derived |
| `/security-audit` | Before a launch or demo with real users |
| `/handoff` | End of a long session, or passing work on |
| `/prep-review [audience]` | Before a demo, grading or interview |
| `/add-rule [mistake]` | Whenever you correct the agent |

These run automatically when relevant: **tdd** (test first), **debug** (root cause before fixing), **verify** (evidence before "done"). Subagents: **reviewer** (checks a branch against its acceptance criteria) and **security-reviewer** (sensitive stories).

## How to use it on a new project
1. **Create and set up:** click **Use this template** → **Create a new repository**, clone it, then run:
   ```bash
   bash scripts/init.sh "Your Project Name"
   ```
   It fills in the project name, CI badge, CODEOWNERS and LICENSE, removes the plugin packaging, and prints how to protect `main`.
2. **Turn on GitHub security** (Settings → Code security): Dependency graph (needed for dependency review in CI), secret scanning with push protection, Dependabot alerts, private vulnerability reporting.
3. **Think:** open Claude Chat, use the opening prompt in `playbook/prompts.md`, run the question worksheet, then the red-team prompts. Paste the results into `marketing-doc.md`.
4. **Talk to real users:** use `playbook/user-interview-guide.md` to test your top three assumptions with about five people. Log them in `marketing-doc.md` §7b. If a kill criterion is hit, say so out loud.
5. **Handoff:** have Claude Chat derive `design-plan.md`, `build-plan.md`, and the steering file from `marketing-doc.md`. Replace the template versions. The talk calls the steering file `SteeringFile.md`; save it as `CLAUDE.md` so Claude Code loads it automatically.
6. **Design:** give `design-plan.md` and reference screenshots to Claude Design. Export and replace `design-system/` (tokens, and component specs if you have them).
7. **Build:** open Claude Code in the folder, start in plan mode, run `/sprint-0`, then for each story `/grill-me S-xx` and `/implement-story S-xx`. Check each branch with the `reviewer` subagent before merging.
8. **Keep it honest:** `/check-spec` every few stories, `/sync-docs` when scope changes, `/handoff` at the end of long sessions, `/security-audit` and `/prep-review` before demos. Fill in `README.md` as you go, including the AI-use disclosure.

Not sure which slide a file came from? See `playbook/slide-map.md`. Testing, debugging and security explained for humans: `playbook/quality-guide.md`.

## Customize before use
- `CLAUDE.md`, `ci.yml`, `codeql.yml` and `settings.json` assume a Node/TypeScript project. Change commands, stack and CodeQL language to match yours.
- Token values in `tokens.css` are the talk's sample palette (`#12294A` / `#E8612A`). Replace them. If you don't use Tailwind, delete `tailwind.config.js`.
- CI passes on a fresh copy. Lint, tests, build and audit start once you add a `package.json`; the token check once you have `src/`; CodeQL once app code changes.
- Uncomment the npm section of `.github/dependabot.yml` once you have a `package.json`.
- The format hook does nothing until you install Prettier in the project (`npm install --save-dev prettier`).
- On a team, edit the roles in `.github/CODEOWNERS` after running `init.sh`.
- Check your course's AI policy before you start.
- If a hook doesn't run, make it executable: `chmod +x .claude/hooks/*.sh` (`init.sh` does this).
- Hook and permission syntax may change between Claude Code versions; check code.claude.com/docs if something doesn't load.

## Maintaining the template (for the repo owner)
- Edit subagents in `.claude/agents/`, then `cp .claude/agents/*.md agents/`. CI fails if the two folders differ, because the plugin ships from `agents/`.
- Bump `version` in `.claude-plugin/plugin.json` when you change skills, so plugin users get the update.
- Check the plugin with `claude plugin validate .` (one expected warning: the template's own `CLAUDE.md` isn't shipped as plugin context).
- After editing `CLAUDE.md`, rules or skills, run `/doctor prompt-audit` in Claude Code to catch outdated or conflicting instructions. Keep each rule in one place: `CLAUDE.md` summarizes and points to `.claude/rules/` for detail.
