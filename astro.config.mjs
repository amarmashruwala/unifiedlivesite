import { defineConfig } from 'astro/config';

const origin = process.env.SITE_URL;
if (origin) {
  const url = new URL(origin);
  if (!['https:', 'http:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL must be an HTTP(S) origin, such as https://your-domain.com');
  }
}
export default defineConfig({ site: origin, output: 'static', trailingSlash: 'never', build: { format: 'directory' }, devToolbar: { enabled: false } });
