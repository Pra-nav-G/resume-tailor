---
name: grill-me
description: Interview the user about a plan, story or design until every ambiguity is resolved, before any code is written. Run with /grill-me and the story or idea, especially when a story has open questions or vague acceptance criteria.
argument-hint: [story id, feature or plan to interrogate]
disable-model-invocation: true
---

# Grill me before we build

Subject: $ARGUMENTS (default: the next story in `build-plan.md`)

A story with open questions gets built on guesses. Your job is to find every decision that hasn't been made yet and get the user to make it, one question at a time.

## How to run it
1. Read the subject in `build-plan.md`, the matching screens in `design-plan.md`, and the relevant parts of `marketing-doc.md` and the code.
2. List, privately, the decisions this work depends on: behaviour in edge cases, empty/error/loading states, data shapes, permissions, what happens on failure, performance expectations, what's explicitly out of scope.
3. Ask **one question at a time**, most important first. For each:
   - give your recommended answer and why, so the user can just say "yes"
   - offer 2–3 concrete options when there's a real choice
   - follow up on vague answers ("fast" → "under what time, on what data?")
4. Follow each branch until it's resolved before moving on. Stop when there are no open decisions left, or the user says stop.

## Good questions sound like
- "What should happen if the list is empty, and what does the message say?"
- "Who is allowed to do this: only the owner, or anyone in the team?"
- "If the save fails halfway, what does the user see, and what's kept?"
- "Is [X] part of this story, or a later one?"

## Finish
- Summarize every decision made, in one list.
- Update the story in `build-plan.md`: sharpen the acceptance criteria, move answered items out of "Open questions", add anything cut to non-goals. Show the diff.
- If an answer changes the product (scope, audience, non-goals), use /sync-docs instead so the change starts in `marketing-doc.md`.
