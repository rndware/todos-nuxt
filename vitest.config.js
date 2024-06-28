// vitest.config.js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./") }],
  },
});
