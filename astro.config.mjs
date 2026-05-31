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

  // Only use the Cloudflare adapter when not building on Vercel.
  // Vercel's build environment lacks GLIBC 2.35+, which is required by Cloudflare's workerd runtime.
  adapter: process.env.VERCEL ? undefined : cloudflare({
    prerenderEnvironment: 'node',
    imageService: 'compile',
  }),
});