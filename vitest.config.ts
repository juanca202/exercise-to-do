import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "out"],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: [
        "src/features/todos/lib/**/*.ts",
        "src/features/todos/store/**/*.ts",
        "src/features/todos/components/**/*.{ts,tsx}",
      ],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/testing/**",
        "src/features/todos/index.ts",
      ],
      thresholds: {
        "src/features/todos/lib/**": {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        "src/features/todos/store/**": {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
