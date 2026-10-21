# Marketing Document — Resume Tailor

> Source of truth. Every other file (design-plan.md, build-plan.md, CLAUDE.md) derives from this one.
> When the answer to anything below changes, change it HERE first.

**Status:** Draft v0.1 · **Owner:** @Pra-nav-G · **Last updated:** 2026-10-18

> **Context:** this is a personal tool for one job seeker (the owner), not a business. Gates 2 and 4 are answered for a single user; the real tests are "do I use it" and "does it save me time without hurting quality".

---

## 1. Positioning (one sentence)

For **a job seeker applying to many roles** who **spends too long rewriting a resume for each posting**, **Resume Tailor** is a **personal web app** that **turns a pasted job description into a tailored, truthful resume and tracks every application separately**.
Unlike **ChatGPT-in-a-tab or resume-builder SaaS**, we **only draw from a master resume the user maintains, check every claim against it, and keep a per-application record of what was sent where**.

## 1b. Lean Canvas (one-screen summary)

| Problem | Solution | Unique value proposition | Unfair advantage | Customer segments |
|---|---|---|---|---|
| 1. Tailoring a resume per job takes 30–60 min. 2. Generic AI rewrites invent skills or titles. 3. Losing track of which resume went to which job. | 1. Paste a job description, get a tailored resume in the background. 2. Every bullet traces back to the master resume; a reviewer step flags anything unsupported. 3. Tracker with one record per application. | Paste a job, get an honest tailored resume, never lose track of what you sent. | Built for exactly one user's workflow; no compromises for a market. | One person: the owner, actively applying. |
| **Existing alternatives** | **Key metrics** | **High-level concept** | **Channels** | **Early adopters** |
| Manual editing in Word/Docs; ChatGPT or Claude chat; Teal, Jobscan, Rezi. | Minutes from paste to usable resume; % of generated bullets needing correction; applications tracked. | "A truthful resume compiler for each job." | Own use; possibly open-sourced later. | The owner. |

| Cost structure | Revenue streams |
|---|---|
| Hosting (free tiers), Postgres (free tier), AI API usage (cents per resume). | None. Personal tool. |

## 2. Problem (Gate 1)

- **Who specifically has this problem:** the owner, actively applying to jobs, from a phone during the day and a laptop at home.
- **How they solve it today:** editing a resume by hand per job, or pasting the job description into an AI chat and copying results back.
- **What the workaround costs them:** time per application; risk of AI-invented claims; no record of which version went where.
- **Vitamin, painkiller, or cure?** Painkiller during an active search; irrelevant otherwise.
- **How often it occurs:** every application, several times a week.
- **In the user's own words:** "get a job description, paste it directly in the UI, and then in the background, agents run and generate me a resume for that job description that I can use to apply myself."
- **Gate 1 decision:** ☑ Go — the problem is the owner's own and recurring.

## 3. Market (Gate 2)

| Closest solution | What customers complain about |
|---|---|
| AI chat (Claude, ChatGPT) | Manual copy-paste per job; invents experience; no history. |
| Teal / Jobscan / Rezi | Subscription cost; locked to their templates and models; keyword-stuffing focus. |
| Manual editing | Slow; inconsistent quality when tired. |

- **Honest serviceable slice:** one user. No market claim.
- **What changed recently:** model quality and API prices make a multi-step "parse → match → write → review" pipeline cheap per run.
- **Feature, product, or company?** A personal product.
- **Gate 2 decision:** ☑ Go — not a business, so market size is not a gate.

## 4. Position (Gate 3)

- **Why this instead of the obvious alternative:** it never invents experience, it keeps every application separate, and it works with whichever AI provider's API key the user has.
- **Ideal first customer:** the owner.
- **The wedge:** paste a job description → tailored resume (.docx) + gap list + tracker row.
- **Deliberately NOT doing (even if asked later):**
  - Auto-submitting applications or filling application forms
  - Scraping LinkedIn, Indeed or other boards that prohibit it
  - Inventing skills, titles, dates or metrics not in the master resume
  - Multi-user accounts, teams, or billing
  - Using consumer AI subscriptions (Claude Pro, ChatGPT Plus) as the backend; API keys only
- **Gate 3 decision:** ☑ Go

## 5. Money (Gate 4)

- **Who pays:** the owner, for API usage only.
- **Pricing anchor:** a $20/month AI subscription; target is well under that per month at a normal application rate.
- **Usage signal that proves value:** the owner applies with generated resumes instead of editing by hand.
- **Unit economics:** cost per resume = sum of model calls across pipeline steps; must be shown per run (see S-14).
- **Gate 4 decision:** ☑ Go

## 6. Feasibility (Gate 5)

- **Riskiest technical assumption + cheapest test:** that the pipeline produces resumes the owner would send with light edits and **no invented claims**. Test: run the pipeline by hand (prompts only, no app) on 5 real job descriptions and count corrections (S-01 spike).
- **Second risk:** background runs of 1–3 minutes on serverless hosting without timeouts. Test: in Sprint 0, run a 3-step dummy job end to end on the chosen host.
- **Data, integrations, permissions I don't control:** AI provider APIs and their pricing; hosting and database free tiers.
- **Regulatory and trust surface:** personal data (resume contents, contact details, job history), stored API keys. Single user, but the app is on the public internet, so auth and encryption are required.
- **Smallest version that delivers the core value (MVP):** single-user login, master resume editor, paste job description → background pipeline → tailored .docx + gap list, application list with status, works on phone and laptop.
- **Gate 5 decision:** ☑ Go, pending the S-01 spike.

## 7. Red-team results

### Pre-mortem ("It's 6 months from now and the owner stopped using it")
| Likely cause of death | Testable in 30 days? | How |
|---|---|---|
| Output needed so much editing it wasn't faster than doing it by hand | Yes | S-01 spike: correction count on 5 real jobs |
| AI invented a claim that ended up on a real application | Yes | Reviewer step + every bullet carries a source reference; test with adversarial job descriptions |
| Phone experience too clunky, so the paste-and-go habit never formed | Yes | Use it on a phone for a week after MVP |
| Too much building, not enough applying | Yes | Hard MVP scope; time-box to the milestones in build-plan.md |

### Assumptions, ranked
| # | Assumption | Evidence so far | Cheapest test |
|---|---|---|---|
| 1 | A tailored resume from the pipeline needs only light edits | None | S-01 spike on 5 real job descriptions |
| 2 | Source-traced bullets prevent invented claims | Design reasoning only | Adversarial job descriptions asking for skills the owner lacks |
| 3 | Background generation is fine on free-tier serverless | None | Sprint 0 dummy job |
| 4 | Per-resume API cost stays small | Public pricing | Log token usage per run |

### Kill criteria
- If, after the S-01 spike, more than 1 in 3 bullets needs a factual correction, stop and redesign the pipeline before building UI.
- If the owner hasn't used the MVP for a real application within 2 weeks of it working, stop adding features.

### Toughest objections
1. "Just use Claude Code with a command, it's free with your subscription." Fair: the fallback. The app exists for phone use, a real tracker and provider choice.
2. "Recruiters can tell AI-written resumes." Mitigated by writing only from the owner's own bullets and a review step before sending.
3. "Storing resume data and API keys online is a risk." Mitigated by single-user auth, encryption of keys at rest, no logging of personal data.

### Research list
- Hosting limits for 1–3 minute background work (Vercel, Railway, Inngest, Trigger.dev free tiers).
- Which providers the owner will actually use first.

## 7b. User interview log

Single user (the owner). Instead of interviews, log real uses here after MVP.

| # | Date | Job (company, role) | Minutes to usable resume | Corrections needed | Notes |
|---|---|---|---|---|---|
| 1 | | | | | |

## 8. Downstream files

- [x] design-plan.md derived from this document
- [x] build-plan.md derived from this document
- [x] CLAUDE.md derived from this document

## 9. Decision log

| Date | Decision | Why | Changed in |
|---|---|---|---|
| 2026-10-18 | Scope to resume generation + tracker; the owner applies manually | Auto-applying breaks many sites' terms and needs human judgement on custom questions | §4 |
| 2026-10-18 | One responsive web app, installable as a PWA, instead of separate native and web apps | One codebase for phone and laptop | design-plan.md, build-plan.md |
| 2026-10-18 | Bring-your-own API key, provider-agnostic | Consumer subscriptions can't back a third-party app; the owner wants to switch providers | §4, docs/decisions/0002 |
| 2026-10-18 | Each application is its own record with its own job description snapshot, analysis and resume versions | Keep applications separate and auditable | build-plan.md E2 |
