# Marketing Document — [Project Name]

> Source of truth. Every other file (design-plan.md, build-plan.md, CLAUDE.md) derives from this one.
> When the answer to anything below changes, change it HERE first.
> If you have a project brief or pitch, start from it: this document is that brief, expanded and stress-tested.

**Status:** Draft v0.1 · **Owner:** [name] · **Last updated:** [date]

---

## 1. Positioning (one sentence)

For **[target customer]** who **[has this problem]**, **[Project Name]** is a **[category]** that **[key benefit]**.
Unlike **[closest alternative]**, we **[structural difference]**.

## 1b. Lean Canvas (one-screen summary)

Fill this in with Claude Chat as market analyst first, product owner second. Keep each box to a line or two.
If you can't fill a box, you aren't ready to build yet. That's useful to learn on day one.

| Problem | Solution | Unique value proposition | Unfair advantage | Customer segments |
|---|---|---|---|---|
| Top 3 problems | Top 3 features | One clear, compelling message | Can't be easily copied or bought | Target customers / users |
| | | | | |
| **Existing alternatives** | **Key metrics** | **High-level concept** | **Channels** | **Early adopters** |
| | | | | |

| Cost structure | Revenue streams |
|---|---|
| | |

## 2. Problem (Gate 1)

- **Who specifically has this problem:** [persona, context]
- **How they solve it today:** [workaround]
- **What the workaround costs them (time / money / frustration):** [evidence]
- **Vitamin, painkiller, or cure?** [answer + evidence]
- **How often it occurs:** [frequency]
- **How the customer describes it in their own words:** "[quote]"
- **Gate 1 decision:** ☐ Go ☐ Sharpen ☐ Stop — [reason]

## 3. Market (Gate 2)

| Closest solution | What customers complain about |
|---|---|
| [Competitor 1] | |
| [Competitor 2] | |
| [Competitor 3] | |

- **Honest serviceable slice (not the total market):** [size + how derived]
- **What has been tried and failed, and why:** [notes]
- **What changed recently (tech / regulation / behaviour):** [notes]
- **Who would be angriest if this succeeded, and what would they do:** [notes]
- **Feature, product, or company?** [answer]
- **Gate 2 decision:** ☐ Go ☐ Sharpen ☐ Stop — [reason]

## 4. Position (Gate 3)

- **Why this instead of the obvious alternative (one sentence):** [answer]
- **What competitors structurally cannot copy in six months:** [answer]
- **Ideal first customer:** [who feels the pain most acutely]
- **The wedge (narrow first use case):** [answer]
- **Deliberately NOT doing (even if customers ask):**
  - [non-goal 1]
  - [non-goal 2]
- **Gate 3 decision:** ☐ Go ☐ Sharpen ☐ Stop — [reason]
  *(Sharpen or stop if differentiation is only "better UX" or "AI-powered".)*

## 5. Money (Gate 4)

- **Who holds the budget / is it the person who feels the pain:** [answer]
- **Pricing anchor (what they pay for adjacent things today):** [answer]
- **Usage signal that proves value before asking anyone to pay:** [answer]
- **Unit economics at 100 customers / 10,000 customers:** [rough numbers]
- **Gate 4 decision:** ☐ Go ☐ Sharpen ☐ Stop — [reason]

## 6. Feasibility (Gate 5)

- **Riskiest technical assumption + cheapest test of it:** [answer]
- **Data, integrations, permissions I don't control:** [list]
- **Regulatory and trust surface (privacy, security, liability):** [list]
- **Smallest version that delivers the core value (MVP):** [answer]
- **Gate 5 decision:** ☐ Go ☐ Reshape ☐ Stop — [reason]

## 7. Red-team results

### Pre-mortem ("It's 18 months from now and this project is dead")
| Likely cause of death | Testable in 30 days? | How |
|---|---|---|
| | | |

### Assumptions, ranked (dependence × lack of evidence)
| # | Assumption | Evidence so far | Cheapest test |
|---|---|---|---|
| 1 | | | |

### Kill criteria (decided in advance)
- If **[experiment]** results in **[threshold]**, we stop.

### Toughest-buyer objections (ranked by which kills it)
1.
2.
3.

### Questions I should be able to answer but can't (research list)
-

## 7b. User interview log

The model is your first interviewer, not your last. Log real conversations here (guide: `playbook/user-interview-guide.md`).

| # | Date | Who (role, context; no personal details) | Key quotes | Assumption tested (§7 #) | Supports / weakens |
|---|---|---|---|---|---|
| 1 | | | "" | | |

**Patterns after 5 interviews:** [what came up 3+ times; what this changes in §2–6]

## 8. Downstream files

- [ ] design-plan.md derived from this document
- [ ] build-plan.md derived from this document
- [ ] CLAUDE.md derived from this document

## 9. Decision log

| Date | Decision | Why | Changed in |
|---|---|---|---|
| [date] | | | |
