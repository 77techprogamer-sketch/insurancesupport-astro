import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import https from 'node:https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEXNOW_KEY = '71a80a3568ae5d1d945fda3ef57fe18e';
const SITE_URL = 'https://insurancesupport.online';

async function pingIndexNow() {
  const urls = [
    `${SITE_URL}/sitemap.xml`,
    SITE_URL
  ];

  const sitemapPath = path.join(__dirname, '../dist/sitemap.xml');
  try {
    const sitemapContent = await fs.readFile(sitemapPath, 'utf-8');
    const locs = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    urls.push(...locs.slice(0, 10000).map(l => l.replace(/<\/?loc>/g, '')));
  } catch { /* sitemap not found yet */ }

  const payload = JSON.stringify({
    host: SITE_URL.replace('https://', ''),
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls.slice(0, 10000)
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
          timeout: 5000
        }, (res) => {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
            if (res.statusCode === 200) {
              console.log(`✓ IndexNow submitted to ${endpoint}`);
            } else if (res.statusCode === 403) {
              console.log(`? IndexNow ${endpoint} responded 403: Site verification pending in Webmaster Tools.`);
            } else {
              console.log(`? IndexNow ${endpoint} responded ${res.statusCode}: ${body.slice(0, 100)}`);
            }
            resolve();
          });
        });
        req.on('error', (e) => {
          console.log(`✗ IndexNow ${endpoint} failed: ${e.message}`);
          resolve();
        });
        req.write(payload);
        req.end();
      });
    } catch { /* skip failed endpoint */ }
  }
}

pingIndexNow().catch(err => {
  console.error('IndexNow error:', err.message);
});
