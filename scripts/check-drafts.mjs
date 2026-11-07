// Fails if any draft project or stub article made it into dist/.
// Run after `npm run build`:  npm run check:drafts
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const hidden = [
  ['src/content/projects', /^draft:\s*true/m],
  ['src/content/articles', /^stub:\s*true/m],
].flatMap(([dir, re]) => readdirSync(dir)
  .filter((f) => f.endsWith('.md') && re.test(readFileSync(join(dir, f), 'utf8')))
  .map((f) => ({ file: join(dir, f), slug: f.replace(/\.md$/, '') })));

const files = [];
const walk = (d) => readdirSync(d).forEach((n) => { const p = join(d, n); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk('dist');
const text = files.filter((f) => /\.(html|xml|js|json|txt)$/.test(f)).map((f) => [f, readFileSync(f, 'utf8')]);

let leaks = 0;
for (const { file, slug } of hidden) {
  const hits = text.filter(([, t]) => t.includes(slug)).map(([f]) => f);
  console.log(`${hits.length ? 'LEAK' : 'ok  '}  ${slug}  (${file})${hits.length ? '\n      ' + hits.join('\n      ') : ''}`);
  leaks += hits.length;
}
console.log(`\n${hidden.length} hidden entries checked against ${text.length} built files: ${leaks ? leaks + ' leak(s)' : 'none in build output'}`);
process.exit(leaks ? 1 : 0);
