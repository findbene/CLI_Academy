import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["lib/**/*.test.ts", "lib/**/*.test.tsx", "components/**/*.test.ts", "components/**/*.test.tsx", "app/**/*.test.ts", "app/**/*.test.tsx"],
    exclude: ["node_modules", "e2e", ".next"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
