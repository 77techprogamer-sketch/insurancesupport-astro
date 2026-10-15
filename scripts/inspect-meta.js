import { readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const PAGES = [
  'dist/pages/index.html',
  'dist/pages/services/btm-layout/index.html',
  'dist/pages/cities/btm-layout/index.html',
  'dist/pages/locations/bangalore-btm-layout/index.html',
  'dist/pages/faq/index.html',
  'dist/pages/contact/index.html',
];

function meta(html, name) {
  const m = html.match(new RegExp(`<meta[^>]*name="${name}"[^>]*content="([^"]*)"[^>]*>`, 'i'));
  return m ? m[1] : null;
}

for (const p of PAGES) {
  try {
    const html = readFileSync(resolve(p), 'utf8');
    const t = html.match(/<title>([\s\S]*?)<\/title>/i);
    console.log('\n==', p, '==');
    console.log('title:', t ? t[1].slice(0, 120) : null);
    console.log('description:', meta(html, 'description')?.slice(0, 200) ?? null);
    console.log('keywords:', meta(html, 'keywords')?.slice(0, 200) ?? null);
    console.log('canonical:', (html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i) || [])[1] ?? null);
  } catch (e) {
    console.log('\n==', p, '==');
    console.log('missing or unreadable:', e.message);
  }
}
