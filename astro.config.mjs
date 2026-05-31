import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://onlineruler.com',
  integrations: [svelte(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare({
    prerenderEnvironment: 'node',
  }),
});