# Design Plan — Resume Tailor

> Derived from marketing-doc.md. Upload this to Claude Design together with reference screenshots.
> It is the whole brief: narrative, tone, palette, type, references, anti-references, screen inventory, real copy.

## 1. Narrative

The user is in the middle of a job search, at their laptop working through a list of applications (phone access comes later). Before, every application meant another hour of rewriting and a vague memory of which resume went where. After, they paste the posting, move on to the next one, and come back to a tailored resume they trust, with a clear list of what to double-check and a tracker that shows exactly where each application stands.

## 2. Tone, mood & personality

- **Mood:** calm workspace. Paper-like surfaces, one confident accent for the primary action, nothing that feels like a gamified "AI magic" product.
- **Three words:** trustworthy, focused, quick
- **Sounds like:** "Your resume for Acme is ready. 2 things to check before you apply."
- **Never sounds like:** "✨ Our AI crafted the PERFECT resume to land your dream job! ✨"

## 3. References and anti-references

| Reference (like this) | What to take from it |
|---|---|
| Linear issue list | Dense, scannable rows with status pills; keyboard-friendly on laptop |
| Apple Notes / Things on iPhone | Big paste area, calm typography; one-thumb input matters once phone access arrives |
| GitHub pull request "checks" panel | Step-by-step run progress with clear pass / running / failed states |

| Anti-reference (NOT like this) | What to avoid |
|---|---|
| Typical AI resume-builder landing pages | Sparkles, gradients, "score" gauges, upsell banners |
| Spreadsheet-style job trackers | Tiny cells and horizontal scrolling on phones |

## 4. Visual foundations

- **Palette:** template sample for now — ink `#12294A` · accent `#E8612A` · surface `#F2EFEA` · muted `#5B6B82` · success `#1F8A4C` · warning `#C98A00` · error `#C62F2F`. Replace via Claude Design if desired; warning is used heavily (gaps, review flags), so it must pass AA on surface.
- **Typography:** headings Space Grotesk · body IBM Plex Sans · mono IBM Plex Mono (job description text, run logs). Resume preview uses the resume template's own font, not the app's.
- **Type scale:** 12 / 14 / 16 / 20 / 28 / 40
- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48
- **Radii:** 8px soft
- **Elevation:** flat with subtle shadows on cards
- **Motion:** subtle; only for step progress and toasts
- **Layout:** laptop first (two-pane list + detail); stays responsive down to one column under 768px so phone access later needs no redesign
- **Dark mode:** required
- **Accessibility floor:** WCAG AA contrast, visible focus states, keyboard-reachable, 44px touch targets, status never shown by colour alone (pill text + icon)

## 5. Build order for Claude Design (tokens first, pages last)

1. Tokens: colour (light + dark), type scale, spacing, radii, elevation, states
2. Components with variants and states (inventory below)
3. Patterns: paste form, run progress, resume preview with flags, application list with filters, empty states, bottom navigation (phone) / sidebar (laptop)
4. Pages assembled from the above (screen inventory below)
5. Tweak until it feels right, then stop fiddling
6. Export: tokens → `design-system/tokens.css` (and `tailwind.config.js`); components with props and states → `design-system/components.md`

## 6. Component inventory

| Component | Variants | States |
|---|---|---|
| Button | primary, secondary, ghost, danger | default, hover, focus-visible, active, disabled, loading |
| Input / Textarea | text, url, large paste area (textarea) | default, focus, filled, error, disabled |
| Select | default | default, focus, open, disabled |
| Card | default, interactive | default, hover, selected |
| List | default | default, loading, empty, error |
| StatusPill | generated, applied, interviewing, offer, rejected, withdrawn, archived | — |
| RunStepper | 4 steps (Reading job, Matching, Writing, Checking) | pending, running, done, failed, skipped |
| FlagCallout | gap, unsupported-claim, needs-check | default, resolved |
| ResumePreview | — | loading, ready, stale (master resume changed since) |
| Toast | success, error, info | — |
| NavBar | bottom tabs (phone), sidebar (laptop) | active item |
| KeyField | masked API key with "Test" action | empty, saved, testing, valid, invalid |

## 7. Screen inventory (traceability: every screen maps to a story)

| ID | Screen | Purpose | Stories |
|---|---|---|---|
| SC-01 | Sign in | Single-user sign-in. **Deferred** to Phone access (change 2026-10-20) | S-02 (deferred) |
| SC-02 | Applications (home / tracker) | List, filter and search every application by status | S-00, S-11, S-12 |
| SC-03 | New application | Paste a job description, optional URL / company / role, start generation | S-06 |
| SC-04 | Application detail | Run progress, resume preview, gaps and flags, notes, status, download, regenerate | S-07, S-08, S-09, S-10, S-12, S-14 |
| SC-05 | Master resume | Edit the source of truth: contact, summary, experience bullets, projects, skills, education | S-04 |
| SC-06 | Settings — AI providers | Add API keys, test them, pick a model per pipeline step; see spend | S-03, S-14 |

## 8. Real copy (no lorem ipsum)

**SC-01 Sign in** (deferred to Phone access)
- Headline: "Resume Tailor"
- Subhead: "Paste a job. Get an honest, tailored resume."
- Primary CTA: "Sign in with GitHub"
- Not allowed: "This app is private. Your account isn't on the allowlist."

**SC-02 Applications**
- Title: "Applications"
- Primary CTA: "New application"
- Filters: "All" · "Generated" · "Applied" · "Interviewing" · "Closed"
- Search placeholder: "Search company or role"
- Empty: "No applications yet. Paste a job description to make your first tailored resume." · CTA "New application"
- Empty, but no master resume: "Add your master resume first. Every tailored resume is built only from what's in it." · CTA "Set up master resume"

**SC-03 New application**
- Title: "New application"
- Field: "Job description" · hint "Paste the full posting, including requirements."
- Field: "Posting link (optional)"
- Fields: "Company (optional)" · "Role (optional)" · hint "Left blank, these are read from the posting."
- Primary CTA: "Tailor my resume"
- Validation: "Paste a job description of at least 200 characters."
- No API key: "Add an AI provider key in Settings before generating." · CTA "Open settings"
- Started toast: "Working on it. You can close this page; it keeps going while the app is running."

**SC-04 Application detail**
- Steps: "Reading the job" · "Matching your experience" · "Writing your resume" · "Checking every claim"
- Done: "Ready. {n} things to check before you apply."
- Done, nothing to check: "Ready. Every line traces back to your master resume."
- Gaps section: "Gaps — the job asks for these and your master resume doesn't show them. They are not in your resume."
- Flag: "Not found in your master resume. Remove it or add it to your master resume first."
- Actions: "Download .docx" · "Regenerate" · "Mark as applied"
- Stale: "Your master resume changed after this was generated." · CTA "Regenerate"
- Failed: "Something went wrong at '{step}'. Nothing was charged beyond the steps that ran." · CTA "Try again"
- Interrupted: "This run stopped when the app was closed. Pick up where it left off?" · CTA "Try again"
- Notes placeholder: "Recruiter name, referral, follow-up plans…"
- Cost line: "This run used about {cost}."

**SC-05 Master resume**
- Title: "Master resume"
- Intro: "Put everything here you'd be willing to claim. Tailored resumes only use what's on this page."
- Add buttons: "Add role" · "Add bullet" · "Add project" · "Add skill"
- Saved toast: "Saved. Existing resumes are marked as out of date."

**SC-06 Settings — AI providers**
- Title: "AI providers"
- Intro: "Use your own API key from any supported provider. Keys are encrypted and never shown again after saving."
- Key field: "API key" · CTA "Test key"
- Valid: "Key works." · Invalid: "That key didn't work. Check it and try again."
- Per step: "Model for: Reading the job / Matching / Writing / Checking"
- Spend: "Spent this month: {cost}"

**Errors (global)**
- Network: "Can't reach the server. Check your connection and try again."
- Provider error: "Your AI provider returned an error: {provider message}. Check your key or credit balance."

## 9. Out of scope for design

- Landing / marketing pages (single-user app)
- Hosting, sign-in and phone install (deferred to the Phone access milestone)
- Auto-apply and form-filling flows
- Multi-user, sharing, teams, billing
- Multiple resume visual templates (one clean template for MVP)
- Cover letters, company research, job feeds (backlog)
