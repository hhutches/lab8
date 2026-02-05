import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // GitHub Pages repo name
  base: "/lab7/",

  // Output folder GitHub Pages can serve
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});