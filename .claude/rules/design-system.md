---
paths:
  - "src/**/*.{ts,tsx,js,jsx,css,scss,html,vue,svelte}"
  - "app/**/*.{ts,tsx,js,jsx,css,scss,html,vue,svelte}"
  - "components/**/*.{ts,tsx,js,jsx,css,scss,html,vue,svelte}"
  - "pages/**/*.{ts,tsx,js,jsx,css,scss,html,vue,svelte}"
---

# Design system rules

- Use tokens from `design-system/tokens.css` (CSS variables, or the Tailwind theme in `tailwind.config.js`) for every colour, font size, spacing, radius, shadow, and duration.
- Don't hard-code hex or rgb/hsl colours, pixel sizes (other than `0px` and `1px` hairlines), or font stacks. `scripts/check-design-tokens.sh` enforces this in CI; a genuine exception needs a `design-system-ignore` comment on that line and a reason in the PR.
- Use the components specified in `design-system/components.md`, with the props and every state listed there (typically default, hover, focus-visible, disabled, loading, error and empty), before creating a new one. If a needed component, variant or state is missing, stop and propose it; don't invent a one-off style.
- Empty states and error messages use the real copy from `design-plan.md`. No lorem ipsum.
- Don't edit `design-system/` as part of a feature story. Token or component changes are a separate, reviewed proposal.
- Meet WCAG AA contrast and keep everything keyboard-reachable.
