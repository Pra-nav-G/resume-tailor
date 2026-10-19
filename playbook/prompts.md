# Prompt Library — Think → Design → Build

Copy, fill in the brackets, paste. Sections 1–3 follow the talk; section 4 adds prompts built on the same files.

---

## 1. THINK (Claude Chat)

### Opening prompt
```
I want to build [your idea]. Act as a market analyst: who is this for,
who already does it, and what would make mine worth using? Push back
where the idea is weak. When we are done, write everything we agreed
into a single file called marketing-doc.md.
```
Tips: ask for pushback explicitly; name the output file in the first prompt; if you have a brief or pitch, paste it in first.

### Question funnel
```
Now interrogate marketing-doc.md using the five gates in question-worksheet.md
(Problem, Market, Position, Money, Feasibility). Ask one gate at a time, wait for my
answers, then give me a go / sharpen / stop recommendation with reasons.
```

### Red-team
Same conversation, about half an hour. See `red-team-prompts.md`.

### Handoff — derive the three files
As on the slide:
```
Now act as my product owner. From marketing-doc.md,
write design-plan.md, build-plan.md (epics, user stories,
tasks, acceptance criteria), and a first SteeringFile.md.
```
Optional additions that enforce the rules from the same slide:
```
Include non-goals in build-plan.md. Derive everything from marketing-doc.md,
not from memory. Every story must reference screens and every screen must
map to a story. Use the templates in this repo as the structure.
```
**SteeringFile.md = CLAUDE.md.** The slide calls the steering file `SteeringFile.md`. Claude Code reads it automatically only when it's named `CLAUDE.md` at the repo root, so save it as `CLAUDE.md`.

---

## 2. DESIGN (claude.ai/design)

Upload `design-plan.md` and screenshots of your references (including anti-references).

```
Here is design-plan.md and screenshots of my references. Build me a design
system from it: colour, type scale, spacing, radii and states first, then
components with variants, then the screens in the inventory. Export the
tokens as CSS variables.
```
Order: colour, type scale, spacing, radii, elevation, states → components with variants and states → patterns → pages. Never pages first. Tweak until it feels right, then stop fiddling.
Export: Share → download a zip (tokens, components, pages), or copy the link. Save tokens to `design-system/tokens.css` (or a Tailwind config) and component specs to `design-system/components.md`.

---

## 3. BUILD (Claude Code)

Open Claude Code in the project folder with `build-plan.md`, the design-system export, and `CLAUDE.md` at the root. Start in plan mode: have the agent read the epics and tokens and propose a build order before it writes a line. Review the order, approve it, then go.

### Build order
```
Here is build-plan.md and my design system. Plan the build order off the
epics, and tell me where to start.
```

### Walking skeleton
```
/sprint-0
```
Or, without the slash command:
```
Build Sprint 0 as a walking skeleton: one thin vertical slice through the
whole stack using real tokens from design-system/. Make sure CI passes and
.env is gitignored, and commit the docs. Stop and show me before moving on.
```

### Roadmap
```
Build a roadmap and backlog from the epics in build-plan.md, in dependency
order, and write it into build-plan.md.
```

### Story loop
```
/implement-story S-[id]
```

### Review
```
Use the reviewer subagent to review this branch against the acceptance
criteria for S-[id].
```

### Turn a correction into a rule
```
/add-rule [what went wrong]
```
Or: "You got [X] wrong. Add a one-line rule to CLAUDE.md under 'Lessons learned' so it doesn't happen again."

### Explain before I merge
```
Explain the block in [file] lines [a–b] in plain language, and tell me
what would break if I removed it.
```

### Change scope (Claude Code)
```
/sync-docs [the change]
```
Writes a change proposal for you to approve, then updates `marketing-doc.md` first and everything derived from it after.

### Before a demo, grading or interview (Claude Code)
```
/prep-review [audience]
```

### All slash commands
The full list, with when to use each, is in `START-HERE.md` → Slash commands. Three run on their own when relevant: `tdd` (test first), `fix-bug` (root cause before any fix) and `prove-it` (evidence before "done"); you can also type them.

Subagents: "Use the reviewer subagent on this branch" checks it against the acceptance criteria. "Use the security-reviewer subagent on this branch" checks for secrets, access control, injection and data exposure.

### Fix a bug (Claude Code)
```
/fix-bug [the symptom or error message]
```
Expect: reproduce → evidence → one hypothesis at a time → a regression test → the fix. Ask "what was the root cause, and which test proves it?"

---

## 4. ANY TIME (Claude Chat)

Not in the talk, but built on the same files. Paste `marketing-doc.md` into the chat first.

### Interview script (before talking to real users)
```
From the ranked assumptions in marketing-doc.md, write a 20-minute interview
script to test the top three with my ideal first customer. Ask only about
their past behaviour, never about my idea or what they'd do in future. For each
assumption, tell me what answer would count as evidence against it.
```
Guide: `playbook/user-interview-guide.md`.

### Make sense of interview notes
```
Here are my notes from [n] user interviews. Which assumptions in
marketing-doc.md do they support, which do they weaken, and has any kill
criterion been hit? Separate what people did from what they said they'd do.
Then list the exact edits I should make to marketing-doc.md.
```

### Scope change (start at the source of truth)
```
I want to change [the change]. First write a short change proposal: why,
what changes, what stays the same, and which stories and screens are
affected. Once I approve it, update marketing-doc.md and add a row to its
decision log. Then list everything in design-plan.md, build-plan.md and
CLAUDE.md that is now out of date. Don't edit those until I approve the list.
```
The same flow as `/sync-docs` in Claude Code. Save the proposal in `docs/changes/`.

### Pitch or demo script
```
From marketing-doc.md, write a [60-second / 3-minute] pitch for [judges /
a professor / an employer / a first customer]. Use the positioning sentence,
name the customer, the alternative and the wedge, and say one thing we
deliberately won't do. No claims the document doesn't support.
```
The pitch is an edit of the marketing document, not a new story.

### README
```
From marketing-doc.md, build-plan.md and CLAUDE.md, fill in README.md: what it
does and who it's for in five lines, how to run it, what we cut and why, and
an honest AI-use disclosure. Leave [brackets] where only I know the answer.
```

### Mock interview
```
Act as a [technical interviewer / capstone examiner]. Ask me these one at a
time and push back on vague answers: walk me through it; what did you cut and
why; where was the AI wrong and how did you catch it; show me a correction
that became a rule; what would you rewrite now. Score each answer and tell me
what evidence from the repo would make it stronger.
```
