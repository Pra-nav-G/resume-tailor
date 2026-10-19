# Slide Map: "Think First, Then Build"

Every slide in the talk, and where it lives in this repo. Use it to find the file for a step, or to check nothing is missing.
Talk by DevCon Dave, Edmonton Unlimited, September 2026. Docs and install: code.claude.com/docs

## Why the workflow (the argument)

- **You can already build fast; this is how to build well (slide 4).** Everyone has the same models, so the advantage is the process around them. Coursework hands you the requirements; everywhere after that, working out what to build is most of the job.
- **The failure mode (slide 6).** Someone types "build me an app", gets a demo by Friday, and the product is dead by Tuesday: no validation, no design system, no plan, no rules. Every later session re-explains everything, burning tokens, time and patience.
- **The through-line (slide 5).** Every step produces a file the next step consumes. The files are the method.
- **The economic argument (slide 20).** The files are paid for once, not per session:
  - **Tokens:** the plan and design system are loaded once, so prompts stay short.
  - **Time:** acceptance criteria answer the agent's questions before it asks them.
  - **Focus:** scope is fixed in a file, so the agent builds what's in the plan, not what looks interesting at 11pm.
  - On a team, everyone loads the same two files. (The deck labels these savings "illustrative, not measured".)
- **Write it once, explain it five ways (slide 21).** The same files answer every audience. Employers ask to be walked through something you built, and the repo answers without you narrating. Professors ask what you did and how, and the commit history is the evidence; tool disclosure is a README line. Teammates ask what to build, and a story with acceptance criteria beats a group chat. Funders and judges ask why this and why you, and `marketing-doc.md` already names the customer, alternative, wedge and non-goals. Customers ask "is this for me?", and your positioning sentence is the interview script.
- **Three altitudes (slide 28).** Solo, the files keep you honest (discipline). On a team, they replace the meetings (coordination). In an internship or job, they show how you work (credibility). What scales is the chain of files, never the number of meetings.

## Slide → file

| Slides | Topic | Where it lives |
|---|---|---|
| 1–2 | Title, RoboRac mascot | n/a |
| 3, 38 | Questions for the room / to take with you | Reflection questions below |
| 4–6 | Why, the map, the failure mode | Section above |
| 7–8 | Act I: the marketing document (Lean Canvas, Markdown, start from a brief) | `marketing-doc.md` (§1b Lean Canvas) |
| 9 | Opening prompt | `playbook/prompts.md` → Opening prompt |
| 10–12 | Question funnel: 21 questions, 5 gates | `playbook/question-worksheet.md`, `marketing-doc.md` §2–6 |
| 13 | Handoff: three derived files, traceability rule, handoff prompt | `playbook/prompts.md` → Handoff; `design-plan.md`, `build-plan.md`, `CLAUDE.md` |
| 14 | Red-team the document: pre-mortem, assumptions, kill criteria | `playbook/red-team-prompts.md` Part A; `marketing-doc.md` §7 |
| 15 | Red-team the model: argue, critique, ask ten questions | `playbook/red-team-prompts.md` Part B; `marketing-doc.md` §7 |
| 16–17 | Act II: hand `design-plan.md` and references to claude.ai/design | `design-plan.md`; `playbook/prompts.md` → Design |
| 18 | Tokens → components → patterns → pages; export a zip or link | `design-plan.md` §5 |
| 19 | Machine-readable tokens; component specs; versioned package | `design-system/tokens.css`, `tailwind.config.js`, `components.md`; `.claude/rules/design-system.md` |
| 20–21 | Economic argument; five audiences | Section above |
| 22–23 | Act III: load both files, plan mode, ask where to start | `playbook/prompts.md` → Build order |
| 24 | Sprint 0 walking skeleton, roadmap, workshop cycles | `build-plan.md` §5, §8, §9; `playbook/prompts.md` |
| 25 | Steering files and repo layout | Repo root; `.claude/` |
| 26 | CLAUDE.md anatomy and anti-patterns | `CLAUDE.md` |
| 27 | Seven rules for building with other people | `playbook/team-and-habits.md` |
| 28 | Three altitudes | Section above |
| 29–30 | Act IV: the toolkit | Toolkit below |
| 31 | Git habits; PRs carry AC; secrets hook; agents on branches | `.claude/rules/git-workflow.md`, `.github/pull_request_template.md`, `.claude/hooks/block-secrets.sh`, `.gitignore`, `.claude/settings.json` |
| 32 | If you can't explain it, don't merge it; coursework policy | `playbook/team-and-habits.md`; `.claude/agents/reviewer.md`; `README.md` AI disclosure |
| 33 | Team roles; 48-hour budget; merge on green | `playbook/team-and-habits.md`; `.github/workflows/ci.yml` |
| 34 | What a reviewer opens; answers worth having ready | `playbook/team-and-habits.md`; `README.md` |
| 35 | Close: files all the way down, return loops | `START-HERE.md` flow; `marketing-doc.md` (change the source first) |
| 36 | Three things to do next | Your next moves below |
| 37, 39 | Questions, thank you | n/a |
| 40–41 | Appendix: 25-question worksheet | `playbook/question-worksheet.md` |

The implement-story skill (`.claude/skills/`) puts slides 24 and 31 into practice as a repeatable story loop.

## Beyond the slides

These aren't in the talk. They enforce its rules (slide 26 warns against "rules nobody enforces") or fill a step it points to but doesn't cover.

| Addition | Puts this from the talk into practice |
|---|---|
| `scripts/check-design-tokens.sh` (in CI) | "A story is not done unless it uses the system" (slide 19) |
| `.github/CODEOWNERS` + branch protection steps | "Every gate has a named owner" (slide 27) |
| docs-drift warning in CI | "Docs move in the same PR as the code" (slide 31) |
| `.claude/hooks/format-file.sh` | Rules enforced by tooling, not by asking (slide 26) |
| `playbook/user-interview-guide.md`, `marketing-doc.md` §7b | "It does not replace talking to real users" (slide 10) |
| `/sprint-0` | Walking skeleton (slide 24) |
| `/add-rule` | "Show me one correction that became a rule" (slides 34, 36) |
| `/sync-docs` | "Every change starts at the source of truth" (slide 35) |
| `/prep-review`, mock interview prompt | "Answers worth having ready" (slide 34) |
| Pitch prompt | "The pitch is an edit of it" (slide 21) |
| `scripts/init.sh`, `.env.example`, `LICENSE`, `CLAUDE.local.md`, `.editorconfig` | Setup and hygiene |
| `docs/decisions/`, story issue template | Decision trail and stories that reviewers can read (slides 21, 34) |
| `tdd`, `prove-it` skills, `.claude/rules/testing.md`, e2e step in CI | "Write or review the tests yourself. Tests are where your judgment lives" (slide 32) |
| `fix-bug` skill | "Spotting when the output is wrong" (slide 32) |
| `security-reviewer`, `/security-audit`, `.claude/rules/security.md`, CodeQL, npm audit, dependency review, Dependabot, `SECURITY.md` | "Secrets never enter the repo" (slide 31), extended to the rest of security |
| `/check-spec`, `docs/changes/` | "Stale documentation is how the agent starts guessing again" (slide 24) |
| `/grill-me` | "Before assuming, ask" (slide 26) |
| `/handoff` | Avoiding "every later conversation re-explains the whole thing" (slide 6) |
| Working principles in `CLAUDE.md` | Short, specific steering rules (slide 26) |
| Plugin packaging (`.claude-plugin/`) | "Steering files are shared assets" (slide 27) |

Ideas adapted from open-source projects are credited in `CREDITS.md`.

## The toolkit (slide 30): five tools, one repo, nothing exotic

| Tool | Where | Used for |
|---|---|---|
| Claude Chat | Browser | Question funnel, marketing document, the three derived files |
| Claude Design | Browser (claude.ai/design) | Tokens and components out as code, not screenshots |
| Claude Code | Terminal, in your project folder | Reads every file at the repo root; builds story by story |
| Git + GitHub | Your repo | The repo is the deliverable; everything above lives in it |
| GitHub Actions | `.github/workflows/ci.yml` | Tests and lint on every push; free for public repos; settles arguments |

Before you pay for anything, check what your institution already provides and check current student pricing. (The slide itself is marked "[verify before the talk]", so treat any prices as unconfirmed.) Start on the free tiers.

## Your next moves (slide 36)

1. **Tonight (30 minutes):** take the idea you've been carrying and run the question set against it. Let the model push back.
2. **This term:** put the spec, `CLAUDE.md` and the story list in your project repo before the first feature commit.
3. **Before you graduate:** have one repo you can walk anyone through end to end: spec, commits, tests, and a correction that became a rule.

If you're hiring-bound, a repo that shows your reasoning survives the interview better than a demo that only runs on your laptop.

## Reflection questions (slides 3 and 38)

Before you start:
1. What's something you've wanted to build or launch, where the only thing stopping you was that you'd need someone else to do it for you?
2. When you hand work to an AI, what do you actually need to know to tell whether it did a good job?

To take with you:
1. What's the one thing in your idea that you should never hand to an agent, and do you know why?
2. If everyone can now build ten times faster, what becomes the scarce thing?
3. What are you going to try before Monday?
