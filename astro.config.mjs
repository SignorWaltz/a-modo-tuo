// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages: SITE_URL + BASE_PATH are set by .github/workflows/deploy.yml
const site = process.env.SITE_URL;
const base = process.env.BASE_PATH;

// https://astro.build/config
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  ...(site ? { site } : {}),
  ...(base ? { base } : {}),
});
