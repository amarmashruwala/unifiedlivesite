import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
if (!process.env.SITE_URL) {
  console.error('SITE_URL is required for a release build. Set the real public origin in your build environment.');
  process.exit(1);
}
const result = spawnSync(process.execPath, [fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url)), 'build'], { stdio: 'inherit', env: process.env });
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
