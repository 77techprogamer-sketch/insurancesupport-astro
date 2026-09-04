// add-meta-to-backlinks.mjs – inserts the required Google verification meta tag into all .html backlink files
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('backlinks');
const META_TAG = '<meta name="google-site-verification" content="rS-Jt7OZhItSlEfxn2FgvR2N7SXvG_fv_2t-p_kh-h8" />';

function insertMeta(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Find <head> tag
  const headIdx = content.indexOf('<head>');
  if (headIdx === -1) return; // no head
  const insertPos = content.indexOf('\n', headIdx) + 1; // after the line break following <head>
  // Avoid duplicate insert
  if (content.includes(META_TAG)) return;
  const before = content.slice(0, insertPos);
  const after = content.slice(insertPos);
  content = `${before}${META_TAG}\n${after}`;
  fs.writeFileSync(filePath, content);
  console.log('Updated', filePath);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      insertMeta(full);
    }
  }
}

walk(ROOT);
console.log('Meta tag insertion complete.');
