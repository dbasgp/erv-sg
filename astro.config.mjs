import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Article stubs are noindex, so keep them out of the sitemap too.
const stubArticles = readdirSync('./src/content/articles')
  .filter((f) => f.endsWith('.md') && /^stub:\s*true/m.test(readFileSync(`./src/content/articles/${f}`, 'utf8')))
  .map((f) => `/learn/${f.replace(/\.md$/, '')}/`);

// www is the canonical host (a Cloudflare redirect rule sends apex -> www; site hosted on Render).
export default defineConfig({
  site: 'https://www.erv.sg',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !stubArticles.some((s) => page.endsWith(s)),
    }),
  ],
});
