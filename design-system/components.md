# Component specs

> Machine-readable component definitions for Claude Code. Replace these with the specs from your Claude Design export.
> Every component lists its props and every state. A story isn't done unless it uses these: no bespoke styles, no "I'll fix it later".
> Changes here are proposals with review, not edits made during a feature story.

Tokens referenced below are defined in `tokens.css`.

---

## Button

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"primary"` | |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | |
| `disabled` | `boolean` | `false` | |
| `loading` | `boolean` | `false` | Shows a spinner, blocks clicks, keeps width |
| `onClick` | `() => void` | none | |
| `children` | `ReactNode` | none | Label text, using real copy from design-plan.md |

| State | Background | Text | Other |
|---|---|---|---|
| default | `--color-primary` | `--color-text-on-primary` | `--radius-sm`, padding `--space-3` / `--space-5` |
| hover | `--color-primary-hover` | same | transition `--duration-fast` |
| focus-visible | same | same | outline `--state-focus-outline` |
| active | `--color-primary-active` | same | |
| disabled | same | same | opacity `--state-disabled-opacity` |
| loading | same | hidden; spinner shown | `aria-busy="true"` |
| error | `--color-error` | `--color-text-on-primary` | used after a failed action |

## Input

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | none | Always visible, never placeholder-only |
| `value` | `string` | none | |
| `error` | `string \| undefined` | none | Message shown under the field |
| `disabled` | `boolean` | `false` | |
| `hint` | `string` | none | Helper text |

| State | Border | Other |
|---|---|---|
| default | `--color-border` | `--radius-sm` |
| focus | `--color-focus-ring` | outline `--state-focus-outline` |
| filled | `--color-border` | |
| error | `--color-error` | error text in `--color-error`, `aria-invalid="true"` |
| disabled | `--color-border` | opacity `--state-disabled-opacity` |

## List (with empty state)

| Prop | Type | Notes |
|---|---|---|
| `items` | `T[]` | |
| `loading` | `boolean` | Show skeleton rows |
| `error` | `string \| undefined` | Show error copy and a retry button |
| `emptyMessage` | `string` | Real copy from design-plan.md §8 |
| `emptyAction` | `{ label: string; onClick: () => void }` | Optional CTA in the empty state |

| State | What renders |
|---|---|
| default | Rows separated by `--color-border` |
| loading | 3 skeleton rows in `--color-surface` |
| empty | `emptyMessage` + optional `emptyAction` Button |
| error | Error copy in `--color-error` + "Try again" Button |

## Card

| Prop | Type | Default |
|---|---|---|
| `interactive` | `boolean` | `false` |
| `selected` | `boolean` | `false` |

| State | Background | Shadow |
|---|---|---|
| default | `--color-bg` | `--shadow-1` |
| hover (interactive) | `--color-bg` | `--shadow-2` |
| selected | `--color-surface` | `--shadow-2`, border `--color-primary` |

---

## Adding a component

1. Propose it, with its props and states, in a PR that only touches `design-system/`.
2. The system owner reviews it.
3. Once merged, feature stories can use it.
