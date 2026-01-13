// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://web-trail-valle-arbas.web.app/",
  vite: {
    plugins: [tailwind()],
  },

  integrations: [react(), sitemap()],
});