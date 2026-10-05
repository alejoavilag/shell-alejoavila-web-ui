import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const OUTWARD_ONLY = [
  {
    files: ["src/domain/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/application/*", "@/infrastructure/*", "@/components/*", "@/app/*", "react", "react-dom", "next", "next/*"],
              message:
                "The domain layer must not depend on application, infrastructure, presentation or any framework.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/application/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/infrastructure/*", "@/components/*", "@/app/*", "react", "react-dom", "next", "next/*"],
              message:
                "The application layer must depend on ports, never on adapters or on the framework.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/infrastructure/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/*", "@/app/*"],
              message: "Adapters must not depend on the presentation layer.",
            },
          ],
        },
      ],
    },
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...OUTWARD_ONLY,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
