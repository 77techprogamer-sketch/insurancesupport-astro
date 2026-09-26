import fsSync from 'node:fs';
import { promises as fsp } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const redirectsPath = path.join(root, 'public', '_redirects');

function exists(p) {
  const rel = p.replace(/^\//, '');
  const asFile = path.join(dist, rel);
  if (rel.endsWith('/')) {
    return fsSync.existsSync(path.join(asFile, 'index.html'));
  }
  return fsSync.existsSync(asFile) || fsSync.existsSync(path.join(asFile, 'index.html'));
}

const raw = await fsp.readFile(redirectsPath, 'utf8');
const lines = raw.split('\n');

// Parse existing rules: "source target 301"
const rules = new Map(); // src -> target
for (const line of lines) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const parts = t.split(/\s+/);
  if (parts.length >= 2 && parts[parts.length - 1] === '301') {
    rules.set(parts[0], parts[1]);
  }
}

const additions = [];
for (const [src, target] of rules) {
  if (src.endsWith('/')) continue;            // already slash form
  const withSlash = src + '/';
  if (rules.has(withSlash)) continue;         // already covered
  if (exists(withSlash)) continue;            // real page — must NOT shadow it

  let newTarget = target;
  if (!newTarget.startsWith('/') || newTarget.includes(':')) continue; // splat/external — leave alone
  // Normalize page targets to trailing slash (site serves trailingSlash: always)
  if (!newTarget.endsWith('/') && !path.extname(newTarget)) {
    newTarget = newTarget + '/';
  }
  additions.push(`${withSlash} ${newTarget} 301`);
}

additions.sort();
const banner = [
  '',
  '# ---- Trailing-slash variants (auto-added by scripts/fix-redirects.mjs) ----',
  '# Search engines hold the /trailing/slash/ form of legacy URLs; without these',
  '# rules the slash variants 404 while the bare form redirects.',
  '# Real built pages are intentionally NOT shadowed by a redirect.',
  '',
];
const out = raw.replace(/\s*$/, '\n') + banner.join('\n') + additions.join('\n') + '\n';
await fsp.writeFile(redirectsPath, out);
console.log(`Added ${additions.length} trailing-slash redirect rules`);
