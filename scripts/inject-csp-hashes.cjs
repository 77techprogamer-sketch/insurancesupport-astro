#!/usr/bin/env node
/**
 * Inject SHA-256 hashes of inline <script> blocks into the Content-Security-Policy
 * in dist/_headers, and ensure a script-src-attr directive for inline event handlers.
 *
 * Why: the CSP uses `script-src 'self'` (no 'unsafe-inline'). Astro emits its
 * island-hydration runtime — the inline script that calls
 * customElements.define('astro-island', ...) — as an INLINE <script>. Without a
 * matching hash the browser blocks it, astro-island never registers, React islands
 * never hydrate, and everything SSR'd at opacity:0 stays invisible (blank homepage).
 *
 * This keeps the CSP strict (hashes, not 'unsafe-inline') while letting first-party
 * inline scripts run. Run automatically as part of `npm run build`, after `astro build`.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dist = path.resolve(__dirname, '..', 'dist');
const headersPath = path.join(dist, '_headers');

if (!fs.existsSync(headersPath)) {
  console.error(`inject-csp-hashes: ${headersPath} not found. Run \`astro build\` first.`);
  process.exit(1);
}

// Script types the browser actually executes (and therefore hashes for CSP).
const EXEC_TYPES = new Set([
  '', 'text/javascript', 'application/javascript', 'module',
  'text/ecmascript', 'application/ecmascript',
]);

const scriptRe = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
const typeRe = /type\s*=\s*"([^"]*)"/i;
const hashes = new Set();
let scanned = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.html')) {
      scanned++;
      const html = fs.readFileSync(p, 'utf8');
      let m;
      scriptRe.lastIndex = 0;
      while ((m = scriptRe.exec(html)) !== null) {
        const attrs = m[1] || '';
        if (/\ssrc\s*=/i.test(attrs)) continue;           // external script
        const tm = attrs.match(typeRe);
        const type = tm ? tm[1].trim().toLowerCase() : '';
        if (!EXEC_TYPES.has(type)) continue;               // skip application/ld+json etc.
        const content = m[2];
        if (!content.trim()) continue;
        const b64 = crypto.createHash('sha256').update(content, 'utf8').digest('base64');
        hashes.add('sha256-' + b64);
      }
    }
  }
}
walk(dist);

if (hashes.size === 0) {
  console.error('inject-csp-hashes: no inline executable scripts found — refusing to rewrite CSP.');
  process.exit(1);
}

const sorted = [...hashes].sort();
const headers = fs.readFileSync(headersPath, 'utf8');
const lines = headers.split(/\r?\n/);

let cspIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (/^[ \t]*Content-Security-Policy:[ \t]*/.test(lines[i])) { cspIdx = i; break; }
}
if (cspIdx === -1) {
  console.error('inject-csp-hashes: no Content-Security-Policy header found in _headers.');
  process.exit(1);
}

const line = lines[cspIdx];
const m = line.match(/^([ \t]*Content-Security-Policy:[ \t]*)(.*)$/);
const prefix = m[1];
const value = m[2];

// Split the header value into directives on ';' (CSP directives never contain a raw ';').
let dirs = value.split(';').map(s => s.trim()).filter(s => s.length > 0);

const si = dirs.findIndex(d => /^script-src(\s|$)/.test(d));
if (si === -1) {
  console.error('inject-csp-hashes: no script-src directive in Content-Security-Policy.');
  process.exit(1);
}

// Idempotent: drop any hashes already present, then append the fresh set.
const base = dirs[si]
  .replace(/'sha256-[^']*'/g, '')
  .replace(/\s+/g, ' ')
  .trim();
dirs[si] = `${base} ${sorted.map(h => `'${h}'`).join(' ')}`;

// Inline event handlers (onclick/onmouseover) are governed by script-src-attr,
// which falls back to script-src (and would ignore 'unsafe-inline' now that hashes
// are present). Grant them explicitly so interactive tools keep working.
const ai = dirs.findIndex(d => /^script-src-attr(\s|$)/.test(d));
if (ai === -1) dirs.splice(si + 1, 0, "script-src-attr 'unsafe-inline'");

lines[cspIdx] = prefix + dirs.join('; ');
fs.writeFileSync(headersPath, lines.join(/\r?\n/.test(headers) && headers.includes('\r\n') ? '\r\n' : '\n'), 'utf8');

console.log(`inject-csp-hashes: scanned ${scanned} HTML files, injected ${sorted.length} script hashes + script-src-attr into ${headersPath}`);
for (const h of sorted) console.log('   ' + h);
