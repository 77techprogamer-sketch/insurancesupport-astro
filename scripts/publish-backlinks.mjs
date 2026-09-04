// Publish all 182 backlink pages to here.now and save claim URLs
// Uses Node native fetch — avoids MSYS curl header mangling on Windows
// Correct flow per https://here.now/docs:
//   Step 1: POST /publish -> { siteUrl, upload.uploads[0].url, finalizeUrl }
//   Step 2: PUT upload URL with file
//   Step 3: POST finalizeUrl with { versionId }
// Authenticated (Bearer API key) = permanent sites owned by account (NO claimUrl).
// Anonymous = 24h expiry + claimUrl (must save claimUrl byte-for-byte).
// Usage: node scripts/publish-backlinks.mjs [--limit N] [--resume]
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', 'backlinks', 'bangalore');
const MANIFEST = path.join(__dirname, '..', 'backlinks', 'claim-urls.json');
const API = 'https://here.now/api/v1/publish';

// Load here.now API key
function getToken() {
  try {
    return fs.readFileSync(os.homedir() + '/.herenow/credentials', 'utf8').trim();
  } catch (e) {
    return '';
  }
}
const TOKEN = getToken();

const files = [];
for (const locDir of fs.readdirSync(BASE)) {
  const locPath = path.join(BASE, locDir);
  if (!fs.statSync(locPath).isDirectory()) continue;
  for (const f of fs.readdirSync(locPath)) {
    if (f.endsWith('.html')) {
      files.push({ loc: locDir, svc: f.replace('.html', ''), file: path.join(locPath, f) });
    }
  }
}
files.sort((a, b) => a.loc.localeCompare(b.loc) || a.svc.localeCompare(b.svc));

let manifest = {};
if (fs.existsSync(MANIFEST)) {
  try { manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf-8')); } catch (e) { manifest = {}; }
}

const limitArg = process.argv.find(a => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : files.length;
const resume = process.argv.includes('--resume');
const toPublish = resume ? files.filter(f => !manifest[`${f.loc}/${f.svc}`]) : files.slice(0, limit);
console.log(`Total: ${files.length} | To publish: ${toPublish.length}${resume ? ' (resume)' : ` (limit ${limit})`}` + (TOKEN ? ' [AUTHENTICATED]' : ' [ANONYMOUS]'));

async function publishOne(item) {
  const size = fs.statSync(item.file).size;
  const key = `${item.loc}/${item.svc}`;

  // Step 1: create site
  const headers = { 'content-type': 'application/json', 'X-HereNow-Client': 'hermes-agent/publish' };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;
  const r1 = await fetch(API, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'X-HereNow-Client': 'hermes-agent/publish', ...(TOKEN ? { 'Authorization': `Bearer ${TOKEN}` } : {}) },
    body: JSON.stringify({ files: [{ path: 'index.html', size, contentType: 'text/html; charset=utf-8' }] }),
  });
  const d1 = await r1.json();

  if (r1.status !== 200 || d1.error) {
    throw new Error(`Step1 failed for ${key}: ${JSON.stringify(d1).slice(0, 200)}`);
  }
  const slug = d1.slug;
  const siteUrl = d1.siteUrl;
  const versionId = d1.upload?.versionId;
  const uploadUrl = d1.upload?.uploads?.[0]?.url;
  const finalizeUrl = d1.upload?.finalizeUrl;
  console.log('DEBUG vars', { uploadUrl: !!uploadUrl, versionId: !!versionId, finalizeUrl: !!finalizeUrl });
  if (!uploadUrl || !versionId || !finalizeUrl) {
    throw new Error(`Step1 missing fields for ${key}: ${JSON.stringify(d1).slice(0, 200)}`);
  }

  // Only anonymous sites include claimUrl (24h expiry). Authenticated = permanent (no claim needed).
  const claimUrl = d1.claimUrl || null;
  const claimToken = d1.claimToken || null;

  // Step 2: upload file
  const html = fs.readFileSync(item.file, 'utf-8');
  const r2 = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: html,
  });
  if (r2.status < 200 || r2.status >= 300) throw new Error(`Step2 upload failed for ${key}: HTTP ${r2.status}`);

  // Step 3: finalize (requires Auth for authenticated/personal sites)
  const finalizeHeaders = { 'content-type': 'application/json' };
  if (TOKEN) finalizeHeaders['Authorization'] = `Bearer ${TOKEN}`;
  const r3 = await fetch(finalizeUrl, {
    method: 'POST',
    headers: finalizeHeaders,
    body: JSON.stringify({ versionId }),
  });
  const d3 = await r3.json();
  if (r3.status !== 200 || (d3.error && r3.status >= 400)) {
    throw new Error(`Step3 finalize failed for ${key}: HTTP ${r3.status} ${JSON.stringify(d3).slice(0, 200)}`);
  }
  const finalSiteUrl = d3.siteUrl || siteUrl || `https://${slug}.here.now/`;
  manifest[key] = { loc: item.loc, svc: item.svc, slug, siteUrl: finalSiteUrl, claimUrl, claimToken, publishedAt: new Date().toISOString() };
}

let ok = 0, fail = 0, failed = [];
let consecutiveRateLimit = 0;
for (let i = 0; i < toPublish.length; i++) {
  const item = toPublish[i];
  try {
    await publishOne(item);
    ok++;
    consecutiveRateLimit = 0;
    if (ok % 10 === 0 || ok === toPublish.length) {
      fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
      console.log(`Progress: ${ok}/${toPublish.length} (${Math.round(ok / toPublish.length * 100)}%)`);
    }
  } catch (e) {
    const isRateLimit = /rate_limit|429|too many|missing fields|no upload/i.test(e.message);
    fail++;
    failed.push({ key: `${item.loc}/${item.svc}`, err: e.message });
    console.error(`FAIL ${item.loc}/${item.svc}: ${e.message}`);
    if (isRateLimit) {
      consecutiveRateLimit++;
      if (consecutiveRateLimit >= 3) {
        console.log('\nRate limit hit (3 consecutive). Saving progress and stopping — re-run --resume after the limit resets.');
        break;
      }
    } else {
      consecutiveRateLimit = 0;
    }
  }
  // Respect 60/hour rate limit: small delay between publishes
  if (i < toPublish.length - 1) await new Promise(r => setTimeout(r, 1500));
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`\nDONE: ${ok} published, ${fail} failed`);
console.log(`Manifest: ${MANIFEST}`);
if (failed.length) {
  console.log('\nFailed:');
  failed.forEach(f => console.log('  ' + f.key + ': ' + f.err.slice(0, 120)));
}
const claims = Object.values(manifest).filter(e => e.claimUrl);
console.log(`Claim URLs captured: ${claims.length}/${Object.keys(manifest).length}`);
