import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://insurancesupport.online';
const DIST_DIR = path.join(__dirname, 'dist');

function extractLocs(xml) {
  const matches = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) matches.push(m[1]);
  return matches.map((u) => u.trim()).filter(Boolean);
}

async function collectUrls() {
  const indexPath = path.join(DIST_DIR, 'sitemap-index.xml');
  const indexXml = await fs.readFile(indexPath, 'utf8');
  const subSitemaps = extractLocs(indexXml)
    .filter((u) => u.includes('/sitemaps/'))
    .map((u) => u.replace(SITE_URL, '').replace(/^\//, ''));

  const urls = new Set([SITE_URL + '/']);
  for (const sub of subSitemaps) {
    const subPath = path.join(DIST_DIR, sub);
    try {
      const xml = await fs.readFile(subPath, 'utf8');
      extractLocs(xml).forEach((u) => urls.add(u));
    } catch (e) {
      console.log('skip:', sub, e.message);
    }
  }
  return [...urls].sort();
}

const urls = await collectUrls();
console.log('Total URLs:', urls.length);

const indexPath = path.join(DIST_DIR, 'sitemap-index.xml');
const indexXml = await fs.readFile(indexPath, 'utf8');
const subSitemaps = extractLocs(indexXml).filter(u => u.includes('/sitemaps/'));
for (const sub of subSitemaps) {
  const subPath = path.join(DIST_DIR, sub.replace(SITE_URL, '').replace(/^\//, ''));
  try {
    const xml = await fs.readFile(subPath, 'utf8');
    const locs = extractLocs(xml);
    console.log(' ', sub.split('/').pop(), ':', locs.length, 'URLs');
  } catch (e) {}
}