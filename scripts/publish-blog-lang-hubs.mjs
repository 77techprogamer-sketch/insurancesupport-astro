// Publish the 9 language blog-hub backlink pages to here.now + save claim URLs
// Usage: node scripts/publish-blog-lang-hubs.mjs
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', 'backlinks', 'blog-lang-hubs');
const MANIFEST = path.join(__dirname, '..', 'backlinks', 'blog-lang-claim-urls.json');
const API = 'https://here.now/api/v1/publish';

// Load here.now API key
function getToken() {
  try { return fs.readFileSync(os.homedir() + '/.herenow/credentials', 'utf8').trim(); } catch (e) { return ''; }
}
const TOKEN = getToken();
if (!TOKEN) { console.error('No here.now credentials found.'); process.exit(1); }

const files = fs.readdirSync(BASE)
  .filter(f => f.endsWith('.html'))
  .sort()
  .map(f => ({ lang: f.replace('.html', ''), file: path.join(BASE, f) }));

let manifest = {};
if (fs.existsSync(MANIFEST)) { try { manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf-8')); } catch (e) { manifest = {}; } }

const toPublish = files.filter(f => !manifest[f.lang]);
console.log(`Total: ${files.length} | Already: ${files.length - toPublish.length} | To publish: ${toPublish.length}`);

async function publishOne(item) {
  const size = fs.statSync(item.file).size;
  const r1 = await fetch(API, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ files: [{ path: 'index.html', size }], client: 'hermes-agent' }),
  });
  const d1 = await r1.json();
  if (d1.error) throw new Error(d1.message || JSON.stringify(d1));
  const slug = d1.slug;
  const versionId = d1.upload?.versionId;
  const uploadUrl = d1.upload?.uploads?.[0]?.url;
  const claimUrl = d1.claimUrl || '';
  const claimToken = d1.claimToken || '';
  if (!uploadUrl || !versionId) throw new Error(`Step1 failed: ${JSON.stringify(d1).slice(0, 200)}`);

  const html = fs.readFileSync(item.file, 'utf-8');
  const r2 = await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': 'text/html' }, body: html });
  if (!r2.ok) throw new Error(`Upload failed: HTTP ${r2.status}`);

  const finalizeHeaders = { 'content-type': 'application/json' };
  if (TOKEN) finalizeHeaders['Authorization'] = `Bearer ${TOKEN}`;
  const r3 = await fetch(`${API}/${slug}/finalize`, {
    method: 'POST',
    headers: finalizeHeaders,
    body: JSON.stringify({ versionId }),
  });
  const d3 = await r3.json();
  const siteUrl = d3.siteUrl || d1.siteUrl || `https://${slug}.here.now/`;
  manifest[item.lang] = { lang: item.lang, slug, siteUrl, claimUrl, claimToken, publishedAt: new Date().toISOString() };
}

let ok = 0, fail = 0;
for (const item of toPublish) {
  try {
    await publishOne(item);
    ok++;
    console.log(`[${ok}/${toPublish.length}] ${item.lang} -> ${manifest[item.lang].siteUrl}  claim: ${manifest[item.lang].claimUrl}`);
    fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  } catch (e) {
    fail++;
    console.error(`FAIL ${item.lang}: ${e.message}`);
    if (fail >= 3) { console.error('3 failures in a row — aborting.'); break; }
  }
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`\nDONE: ${ok} published, ${fail} failed`);
console.log(`Manifest: ${MANIFEST}`);
