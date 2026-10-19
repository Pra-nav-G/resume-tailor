# Team Roles, Git Habits, and Reviewer Checklist

## Rules for building with other people
1. **The spec lives in the repo and is versioned.** Changes go through pull requests. A diff replaces an alignment meeting.
2. **Every gate has a named owner.** "A human approves" scales to "this human approves," or gates become theatre.
3. **Epics declare their boundaries** (APIs, data shapes, events) so parallel agent sessions cannot collide.
4. **CI is the neutral referee.** A story passes acceptance criteria or it doesn't.
5. **The design system is a governed package.** Token changes are proposals with review.
6. **Steering files are shared assets.** `CLAUDE.md`, rules, skills, and the question funnel are maintained like code.
7. **Onboarding = clone the golden path.** A new contributor loads the same files and is aligned on day one.

## Hackathon / capstone roles — split the gates, not the repo
| Role | Owns | Rule |
|---|---|---|
| Spec owner | `marketing-doc.md`, story list | Approves scope changes |
| System owner | Tokens and components | No one else edits them mid-build |
| Build lead | `CLAUDE.md`, branch strategy, merge order | |
| Reviewer | Acceptance criteria, reading diffs | Rotates — everyone takes a turn |

Names: Spec ______ · System ______ · Build ______ · Reviewer (this week) ______

Two people prompting the same files against different assumptions is the classic weekend failure. The spec is how you avoid it. Everyone loads the same two files, so alignment comes from the repo, not from standing around a laptop.

**Merge on green:** tests pass, criteria met, design system used.

### Make the gates real on GitHub
1. Put each person's GitHub username against their role in `.github/CODEOWNERS`. GitHub then asks the owner to review any PR that touches their files.
2. Settings → Branches → **Add rule** for `main`:
   - **Require a pull request before merging** (no direct commits, for people or agents)
   - **Require status checks to pass** → select `test` (CI is the referee)
   - **Require review from Code Owners** (teams only; on a solo project you can't approve your own PR)
3. Track stories as GitHub issues with the **User story** template, and close them from the PR ("Closes #12").

## 48-hour budget
| Time | Activity |
|---|---|
| 60 min | Think — funnel, spec, story list |
| 45 min | Design — tokens and three components |
| 90 min | Walking skeleton, committed |
| Rest | Story loops, docs updated as you go |

## Git habits
```bash
git switch -c s14-filter-by-tag          # one branch per story, id in the name
git add src/ build-plan.md               # docs travel with the code
git commit -m "S-14: filter list by tag" # small commits, plain messages ("Implements S-14: filter by tag" beats "fixes")
git push -u origin s14-filter-by-tag     # agents work on branches too; never straight to main
```
- Pull requests carry the acceptance criteria in the description, so a reviewer checks boxes instead of guessing what done meant. For example:
  - [ ] AC1 tag filter persists in the URL
  - [ ] AC2 empty state uses the design system
  - [ ] AC3 tests added, lint clean
- Docs move in the same PR as the code. Spec, plan, and `CLAUDE.md` updates ship with the change, never after.
- Secrets never enter the repo: `.env` in `.gitignore` on day one, plus the block-secrets hook.

(The slide shows `git add src/ docs/build-plan.md`. In this template `build-plan.md` sits at the repo root, matching the folder layout slide, so it's `git add src/ build-plan.md`.)

## If you can't explain it, don't merge it
- Read the whole diff before accepting it. Every line, especially the first few weeks.
- Ask the agent to explain any block you don't follow, then check the explanation against the code.
- Write or review the tests yourself. Tests are where your judgment lives.
- Delete what you didn't ask for. Unused code is a liability you will be asked about.

The skill that stays scarce is judgment: knowing what to build, spotting when the output is wrong, and being able to defend both.

## For coursework
- Read your course's AI policy **before** you start, not after you submit. Policies differ by instructor, not just by school.
- Where tool use is allowed, disclose it plainly: what you used it for and what you wrote yourself.
- Your commit history is your evidence of process. It is also the thing that protects you.

## What a reviewer opens
- [ ] README — what it does and who for, in five lines
- [ ] `marketing-doc.md` — the thinking, including what you decided not to build
- [ ] `CLAUDE.md` — your rules
- [ ] Commit history and PRs — small, described, reviewed
- [ ] Tests and a green CI badge

## Answers worth having ready
- What did you cut, and why?
- Where was the agent wrong, and how did you catch it?
- Show me one correction that became a rule.
- Which part would you rewrite now?

Everyone has a demo now, so show your reasoning instead. `CLAUDE.md` is the file that reads as seniority. One repo you can walk through beats five you generated: depth is the signal.
