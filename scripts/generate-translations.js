/**
 * scripts/generate-translations.js
 *
 * Generates full-content translated blog post entries for all supported Indian languages
 * (excluding Urdu) using Google Translate via googletrans, and merges them into
 * src/data/blogs.json.
 *
 * Usage:
 *   node scripts/generate-translations.js            # Full run: translate all posts
 *   node scripts/generate-translations.js --dry-run   # Show what would be generated
 *   node scripts/generate-translations.js --resume    # Skip posts already translated
 *
 * The script:
 * 1. Reads src/data/blogs.json (English source posts only)
 * 2. Translates title, summary, and full markdown content into each language
 * 3. Preserves existing hub translations if --resume is used
 * 4. Writes back the complete blogs.json with English + all translations
 */