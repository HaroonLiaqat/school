import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@school/ui": path.resolve(__dirname, "./src/ui/index.ts"),
      "@school/db": path.resolve(__dirname, "./src/ui/index.ts"),
      "@school/lib": path.resolve(__dirname, "./src/ui/index.ts"),
      "@school/hooks": path.resolve(__dirname, "./src/ui/index.ts"),
      "@school/assets": path.resolve(__dirname, "./src/ui/index.ts"),
      "@school/utils": path.resolve(__dirname, "./src/lib/index.ts"),
      "@school/components": path.resolve(__dirname, "./src/ui/index.ts"),
      "@school/validator": path.resolve(__dirname, "./src/validator/index.ts"),
    },
  },
});
