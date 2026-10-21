# Build Plan — Resume Tailor

> Written as an expert product owner. Derived from marketing-doc.md and design-plan.md.
> **Rule:** a story is done only when its acceptance criteria pass AND it uses the design system.
> **Traceability:** every story references screens; every screen maps to a story.

## 1. Purpose

A personal web app that runs locally on the owner's laptop (phone access later) and turns a pasted job description into a tailored, truthful resume built only from the owner's master resume, runs that work in the background, and keeps every application as its own tracked record.

## 2. Non-goals (from marketing-doc.md §4)

- Auto-submitting applications or filling application forms
- Scraping LinkedIn, Indeed or other boards that prohibit it
- Inventing skills, titles, dates or metrics not in the master resume
- Multi-user accounts, teams or billing
- Using consumer AI subscriptions as the backend (API keys only)
- Hosting it on the internet (for now; see docs/changes/2026-10-20-local-only.md)

## 3. Definition of done (applies to every story)

- [ ] Acceptance criteria below all pass, each with a test written first
- [ ] Uses design-system tokens/components; no bespoke styles
- [ ] Every check in `CLAUDE.md` → Commands passes, run after the last change (output shown in the PR)
- [ ] Security-reviewed if the story touches auth, personal data (resume content, job history), stored API keys, or AI output shown to the user
- [ ] Docs updated in the same PR (build-plan.md, CLAUDE.md if rules changed)
- [ ] PR description carries the acceptance criteria as a checklist

## 4. Build order

| Order | Epic | Why now |
|---|---|---|
| 0 | E0 Walking skeleton + pipeline spike | Validates the stack, background runs, and the riskiest assumption (output quality) before any UI |
| 1 | E1 AI settings | Nothing can run without a working key (sign-in deferred) |
| 2 | E2 Master resume | The only source the pipeline may draw from |
| 3 | E3 Applications and pipeline | The core value |
| 4 | E4 Tracker | Keeps applications separate and findable |
| 5 | E5 Polish | Cost visibility; phone install deferred to Phone access |

## 5. Sprint 0 — Walking skeleton

- [x] Repo scaffolded from the template; branch protection on `main`
- [ ] Next.js app with `design-system/tokens.css` used by one real component
- [ ] Applications page (SC-02) renders an empty state from the database (UI → server → SQLite)
- [ ] A dummy 3-step background job runs to completion in the server process and writes its status to the database (ADR 0006)
- [ ] Server reachable only on `127.0.0.1`
- [ ] CI runs lint + tests on push (green badge)
- [ ] `.env` and `data/` in `.gitignore`; `.env.example` lists every variable; secret-blocking hook active

## 6. Epics and stories

### E0 — Walking skeleton and pipeline spike
**Goal:** prove the stack, background execution and output quality.

#### S-00 — Walking skeleton
- **As the** owner, **I want** an empty Applications page served from the real local database, **so that** the whole stack and CI are proven before features.
- **Screens:** SC-02
- **Depends on:** —
- **Acceptance criteria:**
  - AC1 After `npm run dev`, visiting `http://127.0.0.1:3000/` shows SC-02's empty-state copy, read through a server query to SQLite (not hard-coded). The database file is created and migrated automatically at `DATABASE_PATH` (default `data/resume-tailor.db`)
  - AC2 `npm run dev` and `npm start` bind to `127.0.0.1` only
  - AC3 A dummy job with 3 steps keeps running after the call that started it returns; each step's status is written to the database as it changes, and the run ends `succeeded` with 3 `done` steps (integration test against a real temporary SQLite file)
  - AC4 Lint, unit tests, the end-to-end test of AC1, and build pass in CI; the token check passes
  - AC5 `data/` and `*.db` files are gitignored, so the database (personal data) can't be committed
- **Tasks:**
  - [ ] Scaffold Next.js + TypeScript strict + Tailwind wired to tokens
  - [ ] SQLite + Drizzle migrations per ADR 0006; `runs` and `run_steps` tables
  - [ ] In-process runner in `src/runner/` per ADR 0006
  - [ ] Empty-state List on SC-02
- **Open questions:** none (resolved 2026-10-20: local only, SQLite, localhost only)

#### S-01 — Pipeline spike (no UI)
- **As the** owner, **I want** to run the four pipeline steps from a script on 5 real job descriptions, **so that** I know the output is worth building an app around (kill criterion, marketing-doc §7).
- **Screens:** —
- **Depends on:** —
- **Acceptance criteria:**
  - AC1 `npm run spike -- <job.md>` reads a local master resume JSON and a job description file and writes `parsed.json`, `match.json`, `resume.json`, `review.json` to a gitignored `spike-output/` folder
  - AC2 Every bullet in `resume.json` has `sourceIds` pointing at existing master-resume bullet IDs (schema-validated)
  - AC3 Results for 5 real jobs logged in marketing-doc §7b: corrections needed and minutes saved; go / redesign decision recorded in §9
  - AC4 Token usage and estimated cost printed per step
- **Tasks:**
  - [ ] Zod schemas for master resume, parsed job, match, resume, review (these become the shared data shapes)
  - [ ] Prompts for each step in `src/pipeline/prompts/`
- **Open questions:** which provider/model the owner has a key for first

### E1 — Access and AI settings
**Goal:** the app can call any supported provider with the owner's key. (Sign-in deferred to Phone access.)
**Boundaries:** owns `provider_credentials`, `model_settings`; exposes `getModelForStep(step)` to E3.

#### S-02 — Single-user sign-in — Deferred to Phone access (change 2026-10-20)
> While the server listens only on `127.0.0.1` (S-00 AC2), there is nobody else to keep out. Build this before the app is reachable from any other device.
- **As the** owner, **I want** to sign in and have everyone else refused, **so that** my resume and job history stay private.
- **Screens:** SC-01
- **Depends on:** S-00
- **Acceptance criteria:**
  - AC1 Signing in with the allowlisted account (env `ALLOWED_GITHUB_LOGIN`) reaches SC-02
  - AC2 Any other account sees the "This app is private…" message and no data
  - AC3 Every server route and action except sign-in returns 401 without a session (tested per route)
  - AC4 Session cookie is httpOnly, secure, SameSite=Lax
- **Tasks:** [ ] Auth per ADR 0005 · [ ] route-protection middleware + tests
- **Open questions:** none once ADR 0005 is accepted. **Sensitive: security review.**

#### S-03 — Bring-your-own API keys and model per step
- **As the** owner, **I want** to save an API key for any supported provider and pick a model for each pipeline step, **so that** I can use whichever AI account I have.
- **Screens:** SC-06
- **Depends on:** S-00
- **Acceptance criteria:**
  - AC1 Supported providers at launch: Anthropic, OpenAI, Google, OpenRouter (list lives in one config file)
  - AC2 Saving a key encrypts it with AES-256-GCM using `KEY_ENCRYPTION_SECRET`; the database never holds plaintext (test reads the raw row)
  - AC3 After saving, the key is shown only as `••••last4`; it is never returned to the browser
  - AC4 "Test key" makes one minimal call and shows "Key works." or the invalid message
  - AC5 Each of the 4 steps has a model selector limited to providers with a saved key; defaults apply when unset
  - AC6 Keys and prompts never appear in logs (test asserts logger output)
- **Tasks:** [ ] provider registry per ADR 0002 · [ ] encryption helper + tests · [ ] settings UI
- **Open questions:** default model per step. **Sensitive: security review.**

### E2 — Master resume
**Goal:** a structured source of truth the pipeline can cite.
**Boundaries:** owns `master_resume_versions`; the `MasterResume` schema (from S-01) is a shared data shape — changes need a proposal.

#### S-04 — Master resume editor
- **As the** owner, **I want** to edit my contact details, summary, roles with bullets, projects, skills and education, **so that** every tailored resume draws from one place.
- **Screens:** SC-05
- **Depends on:** S-00, S-01 (schema)
- **Acceptance criteria:**
  - AC1 Every bullet, role, project and skill has a stable ID that survives edits and reordering
  - AC2 Each save creates a new immutable version; runs record which version they used
  - AC3 After a save, resumes built from an older version show the "stale" state on SC-04
  - AC4 Server validates with the `MasterResume` schema; invalid input returns field errors
  - AC5 Usable on a 375px-wide screen (e2e at mobile viewport)
- **Tasks:** [ ] versioned storage · [ ] editor UI with add/reorder/delete
- **Open questions:** none. **Sensitive (personal data): security review.**

### E3 — Applications and pipeline
**Goal:** paste a job, get a truthful tailored resume in the background.
**Boundaries:** owns `applications`, `job_descriptions`, `runs`, `run_steps`, `resume_versions`; consumes `getModelForStep` (E1) and `MasterResume` (E2).

#### S-06 — Paste a job description to start an application
- **As the** owner, **I want** to paste a posting and tap one button, **so that** a tailored resume starts generating while I do something else.
- **Screens:** SC-03
- **Depends on:** S-03, S-04
- **Acceptance criteria:**
  - AC1 Submitting creates one application record with an immutable snapshot of the pasted text, optional URL, company and role
  - AC2 Under 200 characters, or over 30,000, shows a validation error and creates nothing
  - AC3 With no saved key, or no master resume, the matching blocker copy is shown and nothing is created
  - AC4 The request returns in under 2 s and redirects to SC-04; generation continues if the page is closed
  - AC5 Company and role left blank are filled from the parse step's output
- **Open questions:** none

#### S-07 — Background pipeline with visible progress
- **As the** owner, **I want** to see each step's progress and have failures retried or clearly reported, **so that** I trust what's happening without watching it.
- **Screens:** SC-04
- **Depends on:** S-06, S-00 (runner)
- **Acceptance criteria:**
  - AC1 Steps run in order: parse → match → write → review; each step's output is validated against its schema and stored
  - AC2 SC-04 shows each step as pending / running / done / failed, updating without a manual refresh (polling is fine)
  - AC3 A provider error or invalid output retries the step up to 2 times, then marks the run failed with the step name
  - AC4 "Try again" resumes from the failed step, reusing completed steps' outputs
  - AC5 Only one run per application at a time
  - AC6 On server start, runs left `running` by a restart or shutdown are marked failed with reason "interrupted"; SC-04 shows the Interrupted copy and "Try again" resumes them (AC4)
- **Open questions:** none

#### S-08 — Truthfulness guarantee
- **As the** owner, **I want** every line in my resume to trace back to my master resume, **so that** nothing invented ever goes into an application.
- **Screens:** SC-04
- **Depends on:** S-07
- **Acceptance criteria:**
  - AC1 The write step's schema requires `sourceIds` on every bullet, summary sentence and skill; IDs must exist in the run's master-resume version (checked in code, not by the model)
  - AC2 The review step compares each line to its sources and flags unsupported specifics (numbers, tools, titles, dates)
  - AC3 Lines that fail the code check are removed and listed as flags; the resume is never shown with them
  - AC4 Requirements the master resume can't support appear only in the Gaps list, never in the resume
  - AC5 An adversarial fixture (job asking for skills absent from the master resume) produces gaps and zero unsupported lines
- **Open questions:** none. **Sensitive (AI output shown as the user's claims): security review.**

#### S-09 — Application detail
- **As the** owner, **I want** one page per application with the resume, gaps, flags, notes and status, **so that** each application is self-contained.
- **Screens:** SC-04
- **Depends on:** S-08
- **Acceptance criteria:**
  - AC1 Shows company, role, link, status, dates, resume preview, gaps, flags, notes and the original job description
  - AC2 "Regenerate" creates a new resume version; earlier versions stay viewable and labelled with date and model
  - AC3 Flags can be marked resolved; notes save automatically
  - AC4 One application's data never appears on another's page (test with two applications)

#### S-10 — Download .docx
- **As the** owner, **I want** to download the tailored resume as a Word file, **so that** I can upload it to any application form.
- **Screens:** SC-04
- **Depends on:** S-09
- **Acceptance criteria:**
  - AC1 "Download .docx" returns a file generated on demand from the stored resume version (no file storage)
  - AC2 File name: `{Name}_Resume_{Company}_{Role}.docx`, sanitized
  - AC3 The file opens in Word and Google Docs with headings, bullets and contact details intact (fixture snapshot test of the document XML)

### E4 — Tracker
**Goal:** see every application and where it stands.

#### S-11 — Applications list
- **As the** owner, **I want** a list of applications with status, filters and search, **so that** I always know what I've sent and where.
- **Screens:** SC-02
- **Depends on:** S-06
- **Acceptance criteria:**
  - AC1 Rows show company, role, status pill (text + icon), date generated, date applied
  - AC2 Filters (All / Generated / Applied / Interviewing / Closed) and search by company or role work together
  - AC3 Newest first; loading, empty and error states use the List component
  - AC4 Phone: single column; laptop: list + detail side by side

#### S-12 — Status and dates
- **As the** owner, **I want** to update an application's status and follow-up date, **so that** the tracker stays accurate.
- **Screens:** SC-02, SC-04
- **Depends on:** S-11
- **Acceptance criteria:**
  - AC1 Statuses: generated, applied, interviewing, offer, rejected, withdrawn, archived
  - AC2 "Mark as applied" sets status and date applied in one tap
  - AC3 Every status change is stored with a timestamp (history visible on SC-04)
  - AC4 Optional follow-up date; rows past their follow-up date are highlighted on SC-02

### E5 — Polish
**Goal:** cost visibility now; phone install once phone access exists.

#### S-13 — Installable PWA — Deferred to Phone access (change 2026-10-20)
- **As the** owner, **I want** to add the app to my phone's home screen, **so that** pasting a job is one tap away.
- **Screens:** all
- **Depends on:** S-06
- **Acceptance criteria:**
  - AC1 Valid web manifest, icons and service worker; installable on iOS Safari and Android Chrome
  - AC2 The share target (Android) accepts shared text into SC-03's job description field
  - AC3 Lighthouse PWA and accessibility checks pass

#### S-14 — Cost per run
- **As the** owner, **I want** to see what each run and each month cost, **so that** API spend never surprises me.
- **Screens:** SC-04, SC-06
- **Depends on:** S-07, S-03
- **Acceptance criteria:**
  - AC1 Each step stores input/output tokens and model; cost is computed from a price table in one config file
  - AC2 SC-04 shows the run's cost; SC-06 shows this month's total
  - AC3 Unknown model price shows "cost unknown" rather than a wrong number

## 7. Traceability matrix

| Story | Screens | Epic | Status |
|---|---|---|---|
| S-00 | SC-02 | E0 | ☐ |
| S-01 | — | E0 | ☐ |
| S-02 | SC-01 | E1 | Deferred |
| S-03 | SC-06 | E1 | ☐ |
| S-04 | SC-05 | E2 | ☐ |
| S-06 | SC-03 | E3 | ☐ |
| S-07 | SC-04 | E3 | ☐ |
| S-08 | SC-04 | E3 | ☐ |
| S-09 | SC-04 | E3 | ☐ |
| S-10 | SC-04 | E3 | ☐ |
| S-11 | SC-02 | E4 | ☐ |
| S-12 | SC-02, SC-04 | E4 | ☐ |
| S-13 | all | E5 | Deferred |
| S-14 | SC-04, SC-06 | E5 | ☐ |

S-05 is reserved for "Import an existing resume" (backlog).

## 8. Workshop cycle (repeat)

Review → refine stories → rebuild → re-verify. Every cycle ends with docs updated and committed.

## 9. Roadmap / backlog

| Milestone | Epics / stories | Target date |
|---|---|---|
| Skeleton + spike | S-00, S-01 | Week 1 |
| MVP on the laptop (usable for real applications) | S-03, S-04, E3, E4 | Week 3 |
| Cost visibility | S-14 | Week 4 |
| Phone access (deferred) | Reach from phone (same Wi-Fi or Tailscale) · S-02 sign-in · S-13 PWA | When the owner asks |
| Next (backlog, not committed) | S-05 import existing resume (.docx/.pdf/paste) · PDF export · cover letter step · company research step · job feeds from public ATS boards (Greenhouse, Lever, Ashby) · push notification when a run finishes · CSV export / backup of the tracker and database | — |
