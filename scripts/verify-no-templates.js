import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = join(process.cwd(), 'dist');

const VISIBLE_TAGS = new Set([
  'main',
  'section',
  'nav',
  'article',
  'header',
  'footer',
  'aside',
  'div',
  'span',
  'p',
  'li',
  'h1',
  'h2',
  'h3',
  'h4',
  'details',
  'summary',
  'a',
  'button',
  'label',
  'form',
  'ul',
  'ol',
  'table',
  'body',
  'figure',
  'figcaption',
  'blockquote',
  'pre',
  'code',
  'em',
  'strong',
  'small',
  'cite',
]);

/**
 * Simple recursive-descent HTML tokenizer + visible-text extractor.
 *
 * It only cares about one thing: which text nodes are inside a visible
 * element path. It intentionally ignores attribute values and deliberately
 * skips <script>, <style>, <template>, and raw text elements so the guard
 * does not complain about JSON-LD strings or inline styles.
 */
function isRawTextTag(tag) {
  return tag === 'script' || tag === 'style' || tag === 'noscript' || tag === 'template';
}

function parseTree(html) {
  const nodes = [];
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) {
      if (i < html.length) nodes.push({ type: 'text', value: html.slice(i) });
      break;
    }
    if (lt > i) {
      nodes.push({ type: 'text', value: html.slice(i, lt) });
    }
    const gt = html.indexOf('>', lt);
    if (gt === -1) break;
    const raw = html.slice(lt, gt + 1);
    i = gt + 1;

    if (raw.startsWith('<!') || raw.startsWith('<?')) {
      nodes.push({ type: 'comment', value: raw });
      continue;
    }
    if (raw.startsWith('</')) {
      nodes.push({ type: 'close', name: tagNameOf(raw) });
      continue;
    }
    if (raw.startsWith('<')) {
      const inner = raw.slice(1, raw.length - 1);
      const tag = tagNameOfInner(inner);
      if (!tag) {
        nodes.push({ type: 'unknown', value: raw });
        continue;
      }
      const selfClose = raw.endsWith('/>') || isVoidTag(tag);
      const content = raw.charAt(raw.length - 1) === '/' ? inner : inner;
      nodes.push({ type: 'open', tag, selfClose, raw });
      continue;
    }
    nodes.push({ type: 'unknown', value: raw });
  }
  return nodes;
}

function tagNameOfOpen(rawInner) {
  const m = rawInner.match(/^([a-zA-Z][a-zA-Z0-9]*)\b/);
  return m ? m[1].toLowerCase() : null;
}

function tagNameOf(raw) {
  const inner = raw.slice(2, raw.length - 1);
  return tagNameOfOpen(inner);
}

function tagNameOfInner(inner) {
  return tagNameOfOpen(inner);
}

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

function isVoidTag(tag) {
  return VOID_TAGS.has(tag);
}

function visibleText(html) {
  const nodes = parseTree(html);
  const out = [];
  const stack = [true]; // visible path stack

  let idx = 0;
  while (idx < nodes.length) {
    const node = nodes[idx];
    if (node.type === 'text') {
      if (stack[stack.length - 1]) out.push(node.value);
      idx += 1;
      continue;
    }
    if (node.type === 'open') {
      const tag = node.tag;
      if (isRawTextTag(tag)) {
        // enter a raw-text zone: skip until the matching close
        idx += 1;
        let depth = 1;
        while (idx < nodes.length && depth > 0) {
          const n = nodes[idx];
          if (n.type === 'open' && n.tag === tag) depth += 1;
          else if (n.type === 'close' && n.name === tag) depth -= 1;
          idx += 1;
        }
        continue;
      }
      const visible = VISIBLE_TAGS.has(tag);
      stack.push(visible ? stack[stack.length - 1] : false);
      idx += 1;
      continue;
    }
    if (node.type === 'close') {
      if (stack.length > 1) stack.pop();
      idx += 1;
      continue;
    }
    idx += 1;
  }

  return out.join('');
}

function walk(dir) {
  const result = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      result.push(full);
    }
  }
  return result;
}

const htmlFiles = walk(DIST);
const offenders = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const visible = visibleText(html);
  if (visible.includes('${locality}') || visible.includes('${') || visible.includes('toLowerCase()')) {
    offenders.push({ file: relative(DIST, file), visible });
  }
}

if (offenders.length > 0) {
  console.error('VISIBLE TEMPLATE ARTIFACTS DETECTED:');
  for (const o of offenders) {
    console.error('  File:', o.file);
    const hit = o.visible.match(/.*\$\{locality[^}]*\}.*/gi)?.slice(0, 5) || [];
    for (const line of hit) console.error('    ->', line.trim());
  }
  process.exit(1);
}

console.log('OK: no visible ${locality} / template artifacts in service page HTML across:', htmlFiles.length, 'HTML files.');
