// src/utils/ogImage.ts
// Resolve an Open Graph image URL to a file that actually exists in public/.
//
// The blog templates used to hard-code /images/og/<slug>.png for every post,
// but only a subset of those PNGs are generated. The rest produced a 404 for
// every social/link-preview crawler (and for Google's image sitemap), so we
// verify on disk at build time and fall back to the site-wide OG image.

import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://insurancesupport.online';
const OG_DIR = path.resolve(process.cwd(), 'public', 'images', 'og');
const DEFAULT_OG = `${SITE}/og-image.png`;

/** Slug-safe file name (mirrors the sanitising done by the OG image generator). */
function safeSlug(slug: string): string {
  return slug.replace(/[/\\?%*:|"<>]/g, '-');
}

function exists(name: string): boolean {
  try {
    return fs.existsSync(path.join(OG_DIR, name));
  } catch {
    return false;

  }
}

/**
 * Returns /images/og/<slug>.png when that file exists, otherwise tries the
 * optional fallback slug (e.g. the English source of a translated post), and
 * finally the default site OG image.
 */
export function ogImageForSlug(slug: string, fallbackSlug?: string): string {
  const candidates = [slug, fallbackSlug].filter(Boolean) as string[];
  for (const candidate of candidates) {
    const name = `${safeSlug(candidate)}.png`;
    if (exists(name)) return `${SITE}/images/og/${name}`;
  }
  return DEFAULT_OG;
}

/** Returns the named image under public/images/og only when it exists. */
export function ogImageIfExists(name: string): string | null {
  return exists(name) ? `${SITE}/images/og/${name}` : null;
}

export { DEFAULT_OG };
