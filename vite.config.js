import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: "/album-web/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  buildEnd() {
    const indexPath = resolve(__dirname, "dist/index.html");
    const notFoundPath = resolve(__dirname, "dist/404.html");
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath);
    }
  },
});
