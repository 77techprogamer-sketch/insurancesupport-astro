import { promises as fsp } from 'node:fs';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

function exists(p) {
  // p like /locations/foo/ or /rss.xml
  const rel = p.replace(/^\//, '');
  const asFile = path.join(dist, rel);
  if (rel.endsWith('/')) {
    return fsSync.existsSync(path.join(asFile, 'index.html'));
  }
  return fsSync.existsSync(asFile) || fsSync.existsSync(path.join(asFile, 'index.html'));
}

const lines = (await fsp.readFile(path.join(root, 'public/_redirects'), 'utf8'))
  .split('\n')
  .map(l => l.trim())
  .filter(l => l && !l.startsWith('#'));

const shadowed = [];
const deadTargets = new Map(); // target -> [sources]

for (const line of lines) {
  const [src, target] = line.split(/\s+/);
  if (!src || !target) continue;
  // shadow risk: source WITH trailing slash is a real built page
  if (src.endsWith('/src') === false && exists(src.endsWith('/') ? src : src + '/')) {
    shadowed.push(`${src} -> ${target}`);
  }
  const normTarget = target === '/:splat' || target === '/:splat/' ? null : target;
  if (normTarget && !exists(normTarget)) {
    if (!deadTargets.has(normTarget)) deadTargets.set(normTarget, []);
    deadTargets.get(normTarget).push(src);
  }
}

console.log('=== SHADOWED (source+slash is a real page — redirect would shadow it) ===');
console.log(shadowed.length ? shadowed.join('\n') : '(none)');

console.log('\n=== DEAD TARGETS ===');
for (const [target, sources] of [...deadTargets.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${target}  (${sources.length} sources)  e.g. ${sources.slice(0, 3).join(', ')}`);
}

// Count how many legacy no-slash sources have no matching real page and no slash rule
let slashVariantNeeded = 0;
for (const line of lines) {
  const [src, target] = line.split(/\s+/);
  if (!src || !target) continue;
  if (src.endsWith('/')) continue;
  const withSlash = src + '/';
  if (!exists(withSlash) && !lines.some(l => l.startsWith(withSlash + ' '))) {
    slashVariantNeeded++;
  }
}
console.log(`\nTrailing-slash variants to add: ${slashVariantNeeded}`);
