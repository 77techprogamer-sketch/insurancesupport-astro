import { promises as fs } from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';

const INDEXNOW_KEY = '6f345ded6a94be2d28ae371306ffcd79';
const SITE_URL = 'https://insurancesupport.online';
const DIST_DIR = path.join(process.cwd(), 'dist');

/** Extract all <loc> URLs from an XML string */
function extractLocs(xml) {
  const matches = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) matches.push(m[1]);
  return matches.map((u) => u.trim()).filter(Boolean);
}

/**
 * Collect all page URLs:
 *  - If dist sitemap files exist, parse them (recursively through the index) for the true URL set.
 *  - Fall back to core pages + sitemap URL if files aren't available yet.
 */
async function collectUrls() {
  const fallback = [`${SITE_URL}/`, `${SITE_URL}/sitemap.xml`];
  try {
    const indexPath = path.join(DIST_DIR, 'sitemap-index.xml');
    const indexXml = await fs.readFile(indexPath, 'utf8');
    const subSitemaps = extractLocs(indexXml)
      .filter((u) => u.includes('/sitemaps/'))
      .map((u) => u.replace(SITE_URL, '').replace(/^\//, ''));

    const urls = new Set([`${SITE_URL}/`]);
    for (const sub of subSitemaps) {
      const subPath = path.join(DIST_DIR, sub);
      try {
        const xml = await fs.readFile(subPath, 'utf8');
        extractLocs(xml).forEach((u) => urls.add(u));
      } catch {
        // skip any sub-sitemap that isn't present locally
      }
    }
    if (urls.size > 1) return [...urls];
  } catch {
    // no sitemap yet — fall through to fallback list
  }
  return fallback;
}

async function pingIndexNow() {
  const urlList = await collectUrls();
  console.log(`IndexNow: submitting ${urlList.length} URLs to Bing/Yandex/Seznam`);

  const payload = JSON.stringify({
    host: SITE_URL.replace('https://', ''),
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urlList.slice(0, 10000)
  });

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://search.yandex.com/indexnow',
    'https://search.seznam.cz/indexnow'
  ];

  for (const endpoint of endpoints) {
    try {
      await new Promise((resolve) => {
        const url = new URL(endpoint);
        const client = url.protocol === 'https:' ? https : http;
        const req = client.request(url.href, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(payload)
          },
          timeout: 8000
        }, (res) => {
          let body = '';
          res.on('data', (chunk) => body += chunk);
          res.on('end', () => {
            if (res.statusCode === 200) {
              console.log(`  ✓ IndexNow accepted by ${endpoint}`);
            } else if (res.statusCode === 403) {
              console.log(`  ? IndexNow ${endpoint} 403: complete Bing/Yandex site verification in Webmaster Tools first.`);
            } else if (res.statusCode === 202) {
              console.log(`  ✓ IndexNow queued by ${endpoint} (202)`);
            } else {
              console.log(`  ? IndexNow ${endpoint} responded ${res.statusCode}: ${body.slice(0, 120)}`);
            }
            resolve();
          });
        });
        req.on('error', (e) => {
          console.log(`  ✗ IndexNow ${endpoint} failed: ${e.message}`);
          resolve();
        });
        req.write(payload);
        req.end();
      });
    } catch { /* skip failed endpoint */ }
  }
}

pingIndexNow().catch((err) => {
  console.error('IndexNow error:', err.message);
});
