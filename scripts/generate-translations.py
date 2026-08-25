#!/usr/bin/env python3
"""
scripts/generate-translations.py

Generates full-content translated blog post entries for all supported Indian languages
(excluding Urdu) using Google Translate via the googletrans library, and merges them into
src/data/blogs.json.

Usage:
  python scripts/generate-translations.py            # Full run: translate all posts
  python scripts/generate-translations.py --dry-run  # Show what would be generated
  python scripts/generate-translations.py --resume   # Skip posts already translated

The script:
1. Reads src/data/blogs.json (English source posts only)
2. Translates title, summary, and full markdown content into each language
3. Preserves existing translations if --resume is used
4. Writes back the complete blogs.json with English + all translations
"""

import json
import sys
import os
import time
import argparse
import re

# Languages to translate into (all Indian languages except Urdu)
TARGET_LANGUAGES = [
    ('hi', 'Hindi'),
    ('bn', 'Bengali'),
    ('ta', 'Tamil'),
    ('te', 'Telugu'),
    ('mr', 'Marathi'),
    ('gu', 'Gujarati'),
    ('kn', 'Kannada'),
    ('ml', 'Malayalam'),
]

def chunk_text(text, max_len=4500):
    """Google Translate has limits on text length. Break into chunks on paragraph boundaries."""
    if len(text) <= max_len:
        return [text]
    
    chunks = []
    paragraphs = re.split(r'(\n\n+)', text)
    current = ""
    
    for i in range(0, len(paragraphs), 2):
        para = paragraphs[i]
        sep = paragraphs[i + 1] if i + 1 < len(paragraphs) else ""
        if len(current) + len(para) + len(sep) <= max_len:
            current += para + sep
        else:
            if current:
                chunks.append(current)
            current = para + sep
    
    if current:
        chunks.append(current)
    
    return chunks

def translate_text(translator, text, src, dest, retries=3):
    """Translate text with chunking and retry logic."""
    chunks = chunk_text(text)
    translated_parts = []
    
    for chunk in chunks:
        for attempt in range(retries):
            try:
                result = translator.translate(chunk.strip(), src=src, dest=dest)
                translated_parts.append(result.text)
                break
            except Exception as e:
                if attempt < retries - 1:
                    print(f"  Retry {attempt + 1}/{retries} for chunk ({len(chunk)} chars): {e}")
                    time.sleep(2 ** attempt)
                else:
                    print(f"  ERROR translating chunk ({len(chunk)} chars): {e}")
                    translated_parts.append(chunk)  # Fallback: keep original
    
    return ''.join(translated_parts)

def main():
    parser = argparse.ArgumentParser(description='Generate Indian language translations for blog posts')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be generated without writing')
    parser.add_argument('--resume', action='store_true', help='Skip languages that already have translations')
    args = parser.parse_args()
    
    # Load blogs.json
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    blogs_path = os.path.join(script_dir, 'src', 'data', 'blogs.json')
    
    with open(blogs_path, 'r', encoding='utf-8') as f:
        all_posts = json.load(f)
    
    # Separate English posts from existing translations
    english_posts = [p for p in all_posts if not p.get('lang') or p['lang'] == 'en']
    existing_translations = [p for p in all_posts if p.get('lang') and p['lang'] != 'en']
    
    print(f"Found {len(english_posts)} English posts")
    print(f"Found {len(existing_translations)} existing translated posts")
    print(f"Target languages: {[lang for lang, name in TARGET_LANGUAGES]}")
    print(f"Total translations to generate: {len(english_posts) * len(TARGET_LANGUAGES)}")
    
    if args.dry_run:
        print("\n[Dry run] Would generate the following new translations:")
        for i, post in enumerate(english_posts[:5]):
            for lang, name in TARGET_LANGUAGES:
                print(f"  {lang}: {post['slug']}")
        if len(english_posts) > 5:
            print(f"  ... and {len(english_posts) - 5} more posts × {len(TARGET_LANGUAGES)} languages")
        return
    
    # Import googletrans
    try:
        from googletrans import Translator
    except ImportError:
        print("ERROR: googletrans not installed. Run: pip install googletrans==4.0.0rc1")
        sys.exit(1)
    
    translator = Translator()
    
    # Test the translator
    try:
        test = translator.translate("Hello world", src='en', dest='hi')
        print(f"\nTranslator test: 'Hello world' -> '{test.text}'")
    except Exception as e:
        print(f"ERROR: Translator not working: {e}")
        sys.exit(1)
    
    # Build set of existing (lang, english_slug) pairs for --resume mode
    existing_pairs = set()
    for t in existing_translations:
        if t.get('translatedFrom'):
            existing_pairs.add((t['lang'], t['translatedFrom']))
    
    # Create translations
    new_translations = []
    total_to_generate = len(english_posts) * len(TARGET_LANGUAGES)
    if args.resume:
        total_to_generate = total_to_generate - len(existing_pairs)
    
    print(f"\nGenerating {total_to_generate} translations...")
    count = 0
    
    for i, post in enumerate(english_posts):
        english_slug = post['slug']
        print(f"\n[{i+1}/{len(english_posts)}] Processing: {english_slug}")
        
        title = post.get('title', '')
        summary = post.get('summary', '')
        content = post.get('content', '')
        
        for lang_code, lang_name in TARGET_LANGUAGES:
            if args.resume and (lang_code, english_slug) in existing_pairs:
                print(f"  [{lang_code}] Skipping (already translated)")
                continue
            
            print(f"  [{lang_code}] Translating...", end=" ", flush=True)
            
            # Translate title
            title_translated = translate_text(translator, title, 'en', lang_code)
            
            # Translate summary
            summary_translated = translate_text(translator, summary, 'en', lang_code)
            
            # Translate full content
            content_translated = translate_text(translator, content, 'en', lang_code)
            
            # Build translated post
            translated_post = {
                'slug': f'{lang_code}-{english_slug}',
                'title': title_translated,
                'date': post.get('date', ''),
                'categories': post.get('categories', []),
                'summary': summary_translated,
                'author': post.get('author', 'Hari Kotian'),
                'content': content_translated,
                'tags': post.get('tags', []),
                'modifiedDate': post.get('modifiedDate', post.get('date', '')),
                'lang': lang_code,
                'translatedFrom': english_slug,
                'originalTitle': title,
            }
            
            new_translations.append(translated_post)
            count += 1
            print(f"done ({count}/{total_to_generate})")
            
            # Rate limiting
            time.sleep(1)
        
        # Brief pause between posts
        time.sleep(0.5)
    
    # Merge: if --resume, keep existing translations; otherwise replace all
    if args.resume:
        # Keep existing translations that we're not replacing
        result_posts = [p for p in all_posts if not p.get('lang') or p['lang'] == 'en']
        result_posts.extend(existing_translations)
        result_posts.extend(new_translations)
    else:
        # Keep English posts + new translations
        result_posts = english_posts + new_translations
    
    # Sort by date (newest first), with English first within each slug group
    result_posts.sort(key=lambda p: (p.get('date', ''), p.get('lang', 'en') == 'en'), reverse=True)
    result_posts.sort(key=lambda p: p.get('date', ''), reverse=True)
    
    if not args.dry_run:
        with open(blogs_path, 'w', encoding='utf-8') as f:
            json.dump(result_posts, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Complete! Generated {count} new translations.")
        print(f"   Total posts in blogs.json: {len(result_posts)}")
        print(f"   English posts: {len(english_posts)}")
        print(f"   Total translated posts: {len([p for p in result_posts if p.get('lang') and p['lang'] != 'en'])}")

if __name__ == '__main__':
    main()