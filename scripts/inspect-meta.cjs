const { readFileSync } = require('fs');
const { resolve } = require('path');

const PAGES = [
  'dist/pages/index.html',
  'dist/services/btm-layout/index.html',
  'dist/cities/btm-layout/index.html',
  'dist/locations/bangalore-btm-layout/index.html',
  'dist/faq/index.html',
  'dist/contact/index.html',
  'dist/blog/index.html',
  'dist/compare/health-insurance/index.html',
];

function meta(html, name) {
  const m = html.match(new RegExp(`<meta[^>]*name="${name}"[^>]*content="([^"]*)"[^>]*>`, 'i'));
  return m ? m[1] : null;
}

for (const p of PAGES) {
  try {
    const html = readFileSync(resolve(p), 'utf8');
    const t = html.match(/<title>([\s\S]*?)<\/title>/i);
    console.log('\n== ' + p + ' ==');
    console.log('title:', t ? t[1].slice(0, 140) : null);
    console.log('description:', (meta(html, 'description') || '').slice(0, 240) || null);
    console.log('keywords:', (meta(html, 'keywords') || '').slice(0, 240) || null);
    const c = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i);
    console.log('canonical:', c ? c[1] : null);
  } catch (e) {
    console.log('\n== ' + p + ' ==');
    console.log('missing or unreadable:', e.message);
  }
}
