# The Question Worksheet

One page. Five gates. Ask them of your marketing document, in order, with Claude Chat as your first interviewer. About thirty minutes.
A first draft is always too optimistic. After each gate, make a go / no-go call. The best outcome is sometimes: **don't build this.** Say so out loud: a kill at this stage costs a conversation, not a quarter.
The model does not replace talking to real users. It makes you walk into those conversations with sharper questions.

Project: ______________________  Date: ____________

---

## Gate 1 — Problem
1. Who specifically has this problem, and how do they solve it today?
2. What does the current workaround cost them — time, money, or frustration?
3. Is this a vitamin, a painkiller, or a cure? What is the evidence?
4. How often does the problem occur for the target customer?
5. Would the customer describe the problem in the same words I do?
6. What would have to be true for this problem to disappear on its own?

**Stop if:** infrequent, cheap to work around, or self-resolving.
Decision: ☐ Go ☐ Sharpen ☐ Stop  Notes: ______________________

## Gate 2 — Market
7. Who are the three closest existing solutions, and what do their customers complain about?
8. How large is the addressable audience, and what is the honest serviceable slice?
9. What has been tried here and failed, and why?
10. What changed recently (technology, regulation, behaviour) that makes this newly possible?
11. Who would be angriest if this succeeded, and what would they do about it?
12. Is this a feature, a product, or a company?

**Stop if:** loved incumbents, shrinking market, or nothing changed.
Decision: ☐ Go ☐ Sharpen ☐ Stop  Notes: ______________________

## Gate 3 — Position
13. What is the one-sentence answer to "why this instead of the obvious alternative"?
14. What can this do that competitors structurally cannot copy in six months?
15. Who is the ideal first customer — the one who feels the pain most acutely?
16. What will this deliberately not do, even if customers ask?
17. What is the wedge — the narrow first use case that opens the broader one?

**Sharpen or stop if:** differentiation is only "better UX" or "AI-powered".
Decision: ☐ Go ☐ Sharpen ☐ Stop  Notes: ______________________

## Gate 4 — Money
18. Who holds the budget, and is it the same person who feels the pain?
19. What is the pricing anchor — what do they pay for adjacent things today?
20. What usage signal would prove value before you ask anyone to pay?
21. What do unit economics look like at 100 customers? At 10,000?

**Stop if:** no buyer or broken economics.
Decision: ☐ Go ☐ Sharpen ☐ Stop  Notes: ______________________

## Gate 5 — Feasibility
22. What is the riskiest technical assumption, and the cheapest test of it?
23. What data, integrations, or permissions does this depend on that you don't control?
24. What is the regulatory and trust surface — privacy, security, liability?
25. What is the smallest version that delivers the core value?

**Reshape or stop if:** an untestable core assumption.
Decision: ☐ Go ☐ Reshape ☐ Stop  Notes: ______________________

---

## How to run it
1. Paste your project brief or pitch into Claude Chat and ask it to act as a market analyst.
2. Work through one gate at a time. Ask for pushback; the model will cheerlead unless told otherwise.
3. Write each answer back into `marketing-doc.md`.
4. Then run `red-team-prompts.md`.
5. Test your top assumptions with real people (`user-interview-guide.md`) and update the answers.
6. Only when all five gates pass, derive `design-plan.md`, `build-plan.md`, and `CLAUDE.md`.

*Note: the talk's main slides (11–12) show a 21-question version. This worksheet is the 25-question appendix version (slides 40–41), which adds questions 6, 12, 21 and 24 and widens the market-size question (8) to include the addressable audience. For the short version, skip 6, 12, 21 and 24.*
