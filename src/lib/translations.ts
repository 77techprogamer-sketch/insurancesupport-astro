// src/lib/translations.ts
// Single source of truth for "which languages does this English post actually
// exist in?" — derived from blogs.json rather than assumed.
//
// Hreflang must only ever point at pages that exist. Not every English post is
// translated: stub posts and a few standalone articles have no translations at
// all, and emitting alternates for all eight languages on those pages declared
// alternates that 404. Ask the data instead of assuming full coverage.

import posts from '../data/blogs.json';

type RawPost = { lang?: string; translatedFrom?: string };

const byEnglishSlug = new Map<string, Set<string>>();

for (const post of posts as RawPost[]) {
  if (!post.lang || !post.translatedFrom) continue;
  let set = byEnglishSlug.get(post.translatedFrom);
  if (!set) {
    set = new Set<string>();
    byEnglishSlug.set(post.translatedFrom, set);
  }
  set.add(post.lang);
}

/**
 * Languages the given English slug has a real, built translation for.
 * Returns an empty Set for posts that were never translated.
 */
export function translatedLangs(englishSlug: string): Set<string> {
  return byEnglishSlug.get(englishSlug) ?? new Set<string>();
}

/** True when this English post exists in at least one other language. */
export function isTranslated(englishSlug: string): boolean {
  return byEnglishSlug.has(englishSlug);
}
