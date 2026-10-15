import { readdirSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir, depth = 0) {
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name !== 'node_modules' && e.name !== '.astro' && e.name !== '.git') {
          walk(full, depth + 1);
        }
      } else if (e.isFile() && /\.(astro|tsx?|json|mjs|js)$/.test(e.name)) {
        console.log(full);
      }
    }
  } catch {}
}

walk('src');
