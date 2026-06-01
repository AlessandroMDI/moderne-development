// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Use sharp for build-time image optimization — no runtime functions
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
