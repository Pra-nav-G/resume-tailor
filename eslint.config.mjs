import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "next-env.d.ts",
      "drizzle/**",
      "test-results/**",
      "playwright-report/**",
      // Template tooling and the design-system export are not app code
      "design-system/**",
      ".claude/**",
      "scripts/**",
    ],
  },
];

export default config;
