# Design Plan — [Project Name]

> Derived from marketing-doc.md. Upload this to Claude Design together with reference screenshots.
> It is the whole brief: narrative, tone, palette, type, references, anti-references, screen inventory, real copy.

## 1. Narrative

[2–3 sentences: who the user is, what they feel before, what they feel after.]

## 2. Tone, mood & personality

- **Mood:** [e.g. "dark pop": deep navy with one hot accent, calm but energetic]
- **Three words:** [e.g. confident, warm, direct]
- **Sounds like:** [example sentence]
- **Never sounds like:** [example sentence]

## 3. References and anti-references

Attach screenshots alongside this file. "Not like X" is often clearer than "like Y".

| Reference (like this) | What to take from it |
|---|---|
| [Reference 1 — screenshot attached] | [layout / density / motion] |
| [Reference 2 — screenshot attached] | |

| Anti-reference (NOT like this) | What to avoid |
|---|---|
| [Anti-reference — screenshot attached] | [e.g. cluttered dashboards, stock-photo hero] |

## 4. Visual foundations

- **Palette:** dark `#12294A` · pop `#E8612A` · [surface] · [muted] · [success] · [error]
- **Typography:** headings [Space Grotesk] · body [IBM Plex Sans] · mono [optional]
- **Type scale:** [e.g. 12 / 14 / 16 / 20 / 28 / 40]
- **Spacing scale:** [4 / 8 / 12 / 16 / 24 / 32 / 48]
- **Radii:** [2px sharp / 8px soft]
- **Elevation:** [flat / subtle shadows]
- **Motion:** [none / subtle / expressive]
- **Accessibility floor:** WCAG AA contrast, visible focus states, keyboard-reachable

## 5. Build order for Claude Design (tokens first, pages last)

1. Tokens: colour, type scale, spacing, radii, elevation, states
2. Components with variants and states
3. Patterns (forms, lists, empty states, navigation)
4. Pages (assembled from the above, never drawn one by one)
5. Tweak until it feels right, then stop fiddling.
6. Export (Share → download a zip, or copy the link):
   - tokens as CSS variables → `design-system/tokens.css` (or a Tailwind config → `design-system/tailwind.config.js`)
   - components as specs with props and states → `design-system/components.md`
   - never hand Claude Code screenshots or prose descriptions of the design

## 6. Component inventory

| Component | Variants | States |
|---|---|---|
| Button | primary, secondary, ghost | default, hover, focus-visible, active, disabled, loading, error |
| Input | text, select, checkbox | default, focus, filled, error, disabled |
| Card | default, interactive | default, hover, selected |
| List | default | default, loading, empty, error |
| [Component] | | |

## 7. Screen inventory (traceability: every screen maps to a story)

| ID | Screen | Purpose | Stories (from build-plan.md) |
|---|---|---|---|
| SC-01 | [Landing] | | S-00 |
| SC-02 | [Sign up] | | S-01 |
| SC-03 | [Dashboard] | | S-02 |

## 8. Real copy (no lorem ipsum)

**SC-01 Landing**
- Headline: "[headline]"
- Subhead: "[subhead]"
- Primary CTA: "[label]"

**Empty states**
- [List is empty]: "[message]" · CTA "[label]"

**Errors**
- [Network failure]: "[message]"

## 9. Out of scope for design

- [Anything explicitly not being designed — mirrors non-goals in marketing-doc.md]
