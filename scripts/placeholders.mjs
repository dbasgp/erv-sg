// Lists every {{PLACEHOLDER}} still left in the source. Usage: npm run placeholders
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const roots = ['src', 'public'];
const found = new Map();
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) return walk(p);
  if (!/\.(astro|ts|md|json|txt|mjs|css)$/.test(f)) return;
  readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/\{\{([A-Z0-9_]+)\}\}/g)) {
      if (!found.has(m[1])) found.set(m[1], []);
      found.get(m[1]).push(`${p}:${i + 1}`);
    }
  });
});
roots.forEach(walk);
if (!found.size) { console.log('No placeholders left.'); process.exit(0); }
for (const [k, locs] of [...found].sort()) console.log(`{{${k}}}\n  ${locs.join('\n  ')}`);
console.log(`\n${found.size} placeholder(s) left.`);
