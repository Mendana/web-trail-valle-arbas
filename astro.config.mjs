// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // site: "https://vallearbas.es/",
  site: 'https://mendana.github.io',
  base: '/web-trail-valle-arbas',
  vite: {
    plugins: [tailwind()],
  },

  integrations: [react(), sitemap()],
});