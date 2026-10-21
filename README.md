# Resume Tailor

Paste a job description, get a tailored resume built only from your own master resume, and track every application separately. A personal web app that runs locally on your laptop, using your own AI provider API key. **Status:** Sprint 0 (S-00) in progress.

![CI](https://github.com/Pra-nav-G/resume-tailor/actions/workflows/ci.yml/badge.svg)

## What it does and who for
- **For:** one job seeker (the owner) applying to many roles
- **Problem:** tailoring a resume per job is slow, AI chat invents claims, and it's easy to lose track of what went where
- **Solution:** a background pipeline (read job → match → write → check every claim) plus a per-application tracker
- **Wedge:** paste a posting, download a tailored .docx a minute later
- **Deliberately not doing:** auto-applying, scraping job boards that forbid it, or inventing experience

## Quick start
```bash
git clone https://github.com/Pra-nav-G/resume-tailor.git
cd resume-tailor
npm ci
cp .env.example .env   # then fill in KEY_ENCRYPTION_SECRET
npm run dev            # http://127.0.0.1:3000
```
Data is stored in `data/resume-tailor.db`. Back that file up; it isn't in git.

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
- Auto-applying — breaks many sites' terms; custom questions need human judgement
- Separate native app — one responsive web app; phone access comes later
- Hosting — runs locally on the laptop for now (docs/changes/2026-10-20-local-only.md)
- Using AI subscriptions as the backend — not possible for third-party apps; bring-your-own API key instead

## Where the agent was wrong
- [Mistake] → caught by [test/review] → became rule in `CLAUDE.md`: "[rule]"

## License
MIT, see `LICENSE`. If your course or employer requires different terms, replace `LICENSE` and update this line.
