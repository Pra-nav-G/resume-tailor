// design-system/tailwind.config.js
// Optional: use this if your stack uses Tailwind (as in the sample CLAUDE.md).
// It maps Tailwind's theme to the CSS variables in tokens.css, so tokens.css stays
// the single source of truth and Tailwind classes can only produce system values.
//
// Usage: import tokens.css in your global stylesheet, then in your root config:
//   const ds = require("./design-system/tailwind.config.js");
//   module.exports = { ...ds, content: ["./src/**/*.{ts,tsx,js,jsx,html}"] };

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // Replace (not extend) so off-system colours and spacing aren't available.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: "var(--color-ink)",
      primary: {
        DEFAULT: "var(--color-primary)",
        hover: "var(--color-primary-hover)",
        active: "var(--color-primary-active)",
      },
      bg: "var(--color-bg)",
      surface: "var(--color-surface)",
      border: "var(--color-border)",
      text: {
        DEFAULT: "var(--color-text)",
        muted: "var(--color-text-muted)",
        "on-primary": "var(--color-text-on-primary)",
      },
      success: "var(--color-success)",
      warning: "var(--color-warning)",
      error: "var(--color-error)",
      focus: "var(--color-focus-ring)",
    },
    fontFamily: {
      heading: "var(--font-heading)",
      body: "var(--font-body)",
      mono: "var(--font-mono)",
    },
    fontSize: {
      xs: "var(--text-xs)",
      sm: "var(--text-sm)",
      md: "var(--text-md)",
      lg: "var(--text-lg)",
      xl: "var(--text-xl)",
      "2xl": "var(--text-2xl)",
    },
    spacing: {
      0: "0",
      1: "var(--space-1)",
      2: "var(--space-2)",
      3: "var(--space-3)",
      4: "var(--space-4)",
      5: "var(--space-5)",
      6: "var(--space-6)",
      7: "var(--space-7)",
      8: "var(--space-8)",
    },
    borderRadius: {
      none: "0",
      sm: "var(--radius-sm)",
      md: "var(--radius-md)",
      lg: "var(--radius-lg)",
      full: "var(--radius-pill)",
    },
    boxShadow: {
      none: "none",
      1: "var(--shadow-1)",
      2: "var(--shadow-2)",
      3: "var(--shadow-3)",
    },
    transitionDuration: {
      fast: "var(--duration-fast)",
      base: "var(--duration-base)",
    },
    transitionTimingFunction: {
      standard: "var(--ease-standard)",
    },
  },
};
