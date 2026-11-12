#!/usr/bin/env python3
"""
scripts/generate-translations-v2.py

Generates full-content translated blog post entries for all supported Indian languages
including Punjabi, using multiple translation backends with proper rate limiting.

Supported backends:
- googletrans (free, rate-limited, Python 3.14 issues)
- deep_translator with Google Cloud (requires GOOGLE_CLOUD_API_KEY)
- deep_translator with DeepL (requires DEEPL_API_KEY)
- LibreTranslate (self-hosted or public instance)

Usage:
  python scripts/generate-translations-v2.py --backend deep_translator --api-key <KEY> --resume
  python scripts/generate-translations-v2.py --backend googletrans --resume  # free but limited
  python scripts/generate-translations-v2.py --dry-run
"""

import json
import sys
import os
import time
import argparse
import re
from typing import Optional

# All 9 Indian languages (including Punjabi)
TARGET_LANGUAGES = [
    ('hi', 'Hindi'),
    ('bn', 'Bengali'),
    ('ta', 'Tamil'),
    ('te', 'Telugu'),
    ('mr', 'Marathi'),
    ('gu', 'Gujarati'),
    ('kn', 'Kannada'),
    ('ml', 'Malayalam'),
    ('pa', 'Punjabi'),
]

# Language code mapping for different backends
LANG_CODE_MAP = {
    'googletrans': {
        'hi': 'hi', 'bn': 'bn', 'ta': 'ta', 'te': 'te', 
        'mr': 'mr', 'gu': 'gu', 'kn': 'kn', 'ml': 'ml', 'pa': 'pa'
    },
    'deep_translator_google': {
        'hi': 'hi', 'bn': 'bn', 'ta': 'ta', 'te': 'te', 
        'mr': 'mr', 'gu': 'gu', 'kn': 'kn', 'ml': 'ml', 'pa': 'pa'
    },
    'deep_translator_deepl': {
        'hi': 'hi', 'bn': 'bn', 'ta': 'ta', 'te': 'te', 
        'mr': 'mr', 'gu': 'gu', 'kn': 'kn', 'ml': 'ml', 'pa': 'pa'
    },
    'libretranslate': {
        'hi': 'hi', 'bn': 'bn', 'ta': 'ta', 'te': 'te', 
        'mr': 'mr', 'gu': 'gu', 'kn': 'kn', 'ml': 'ml', 'pa': 'pa'
    }
}

def chunk_text(text: str, max_len: int = 4500) -> list:
    """Break text into chunks on paragraph boundaries for translation API limits."""
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

class TranslationBackend:
    """Base class for translation backends."""
    def __init__(self, rate_limit_per_second: float = 1.0):
        self.rate_limit_per_second = rate_limit_per_second
        self.last_request_time = 0
    
    def _rate_limit(self):
        elapsed = time.time() - self.last_request_time
        min_interval = 1.0 / self.rate_limit_per_second
        if elapsed < min_interval:
            time.sleep(min_interval - elapsed)
        self.last_request_time = time.time()
    
    def translate(self, text: str, source: str, target: str) -> str:
        raise NotImplementedError
    
    def test(self) -> bool:
        raise NotImplementedError

class GoogleTransBackend(TranslationBackend):
    """Free Google Translate via googletrans library (rate-limited, Python 3.14 issues)."""
    def __init__(self):
        super().__init__(rate_limit_per_second=0.5)  # Very conservative
        try:
            from googletrans import Translator
            self.translator = Translator()
            self.available = True
        except ImportError:
            self.available = False
            self.translator = None
    
    def test(self) -> bool:
        if not self.available:
            return False
        try:
            result = self.translator.translate("Hello world", src='en', dest='hi')
            return bool(result.text)
        except Exception:
            return False
    
    def translate(self, text: str, source: str, target: str) -> str:
        if not self.available:
            raise RuntimeError("googletrans not available")
        
        chunks = chunk_text(text)
        translated_parts = []
        
        for chunk in chunks:
            for attempt in range(3):
                try:
                    self._rate_limit()
                    result = self.translator.translate(chunk.strip(), src=source, dest=target)
                    translated_parts.append(result.text)
                    break
                except Exception as e:
                    if attempt < 2:
                        time.sleep(2 ** attempt)
                    else:
                        print(f"  ERROR: {e}")
                        translated_parts.append(chunk)
        
        return ''.join(translated_parts)

class DeepTranslatorGoogleBackend(TranslationBackend):
    """Google Cloud Translation API via deep_translator (requires API key)."""
    def __init__(self, api_key: str):
        super().__init__(rate_limit_per_second=5.0)  # Google Cloud allows 100/sec
        try:
            from deep_translator import GoogleTranslator
            self.translator = GoogleTranslator(source='en', target='hi')
            self.translator.api_key = api_key
            self.available = True
        except ImportError:
            self.available = False
        except Exception as e:
            print(f"DeepTranslator Google init error: {e}")
            self.available = False
    
    def _set_target(self, target: str):
        if self.available:
            self.translator.target = target
    
    def test(self) -> bool:
        if not self.available:
            return False
        try:
            result = self.translator.translate("Hello world")
            return bool(result)
        except Exception:
            return False
    
    def translate(self, text: str, source: str, target: str) -> str:
        if not self.available:
            raise RuntimeError("DeepTranslator Google not available")
        
        self._set_target(target)
        chunks = chunk_text(text, max_len=5000)  # Google Cloud has higher limits
        translated_parts = []
        
        for chunk in chunks:
            for attempt in range(3):
                try:
                    self._rate_limit()
                    result = self.translator.translate(chunk.strip())
                    translated_parts.append(result)
                    break
                except Exception as e:
                    if "TooManyRequests" in str(type(e)) or "429" in str(e):
                        time.sleep(5 * (attempt + 1))
                    elif attempt < 2:
                        time.sleep(2 ** attempt)
                    else:
                        print(f"  ERROR: {e}")
                        translated_parts.append(chunk)
        
        return ''.join(translated_parts)

class DeepTranslatorDeepLBackend(TranslationBackend):
    """DeepL API via deep_translator (requires API key)."""
    def __init__(self, api_key: str):
        super().__init__(rate_limit_per_second=10.0)  # DeepL allows high rates
        try:
            from deep_translator import DeeplTranslator
            self.translator = DeeplTranslator(api_key=api_key, source='en', target='hi')
            self.available = True
        except ImportError:
            self.available = False
        except Exception as e:
            print(f"DeepTranslator DeepL init error: {e}")
            self.available = False
    
    def _set_target(self, target: str):
        if self.available:
            self.translator.target = target
    
    def test(self) -> bool:
        if not self.available:
            return False
        try:
            result = self.translator.translate("Hello world")
            return bool(result)
        except Exception:
            return False
    
    def translate(self, text: str, source: str, target: str) -> str:
        if not self.available:
            raise RuntimeError("DeepTranslator DeepL not available")
        
        self._set_target(target)
        chunks = chunk_text(text, max_len=5000)
        translated_parts = []
        
        for chunk in chunks:
            for attempt in range(3):
                try:
                    self._rate_limit()
                    result = self.translator.translate(chunk.strip())
                    translated_parts.append(result)
                    break
                except Exception as e:
                    if "TooManyRequests" in str(type(e)) or "429" in str(e) or "456" in str(e):
                        time.sleep(5 * (attempt + 1))
                    elif attempt < 2:
                        time.sleep(2 ** attempt)
                    else:
                        print(f"  ERROR: {e}")
                        translated_parts.append(chunk)
        
        return ''.join(translated_parts)

class LibreTranslateBackend(TranslationBackend):
    """LibreTranslate (self-hosted or public instance)."""
    def __init__(self, base_url: str = "https://libretranslate.de", api_key: Optional[str] = None):
        super().__init__(rate_limit_per_second=1.0)  # Public instance is slow
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.available = True
        try:
            import requests
            self.requests = requests
        except ImportError:
            self.available = False
    
    def test(self) -> bool:
        if not self.available:
            return False
        try:
            payload = {"q": "Hello world", "source": "en", "target": "hi", "format": "text"}
            if self.api_key:
                payload["api_key"] = self.api_key
            r = self.requests.post(f"{self.base_url}/translate", json=payload, timeout=30)
            return r.status_code == 200 and "translatedText" in r.json()
        except Exception:
            return False
    
    def translate(self, text: str, source: str, target: str) -> str:
        if not self.available:
            raise RuntimeError("requests not available")
        
        chunks = chunk_text(text, max_len=5000)
        translated_parts = []
        
        for chunk in chunks:
            for attempt in range(3):
                try:
                    self._rate_limit()
                    payload = {
                        "q": chunk.strip(),
                        "source": source,
                        "target": target,
                        "format": "text"
                    }
                    if self.api_key:
                        payload["api_key"] = self.api_key
                    r = self.requests.post(f"{self.base_url}/translate", json=payload, timeout=60)
                    if r.status_code == 200:
                        translated_parts.append(r.json()["translatedText"])
                        break
                    elif r.status_code == 429:
                        time.sleep(5 * (attempt + 1))
                    else:
                        raise Exception(f"HTTP {r.status_code}: {r.text}")
                except Exception as e:
                    if attempt < 2:
                        time.sleep(2 ** attempt)
                    else:
                        print(f"  ERROR: {e}")
                        translated_parts.append(chunk)
        
        return ''.join(translated_parts)

def get_backend(backend_name: str, api_key: Optional[str] = None, base_url: Optional[str] = None) -> TranslationBackend:
    """Factory function to create translation backend."""
    if backend_name == 'googletrans':
        return GoogleTransBackend()
    elif backend_name == 'deep_translator_google':
        if not api_key:
            raise ValueError("API key required for Google Cloud Translation")
        return DeepTranslatorGoogleBackend(api_key)
    elif backend_name == 'deep_translator_deepl':
        if not api_key:
            raise ValueError("API key required for DeepL")
        return DeepTranslatorDeepLBackend(api_key)
    elif backend_name == 'libretranslate':
        return LibreTranslateBackend(base_url or "https://libretranslate.de", api_key)
    else:
        raise ValueError(f"Unknown backend: {backend_name}")

def main():
    parser = argparse.ArgumentParser(description='Generate Indian language translations for blog posts')
    parser.add_argument('--backend', choices=['googletrans', 'deep_translator_google', 'deep_translator_deepl', 'libretranslate'],
                        default='googletrans', help='Translation backend to use')
    parser.add_argument('--api-key', help='API key for paid backends (Google Cloud, DeepL, LibreTranslate)')
    parser.add_argument('--base-url', help='Base URL for LibreTranslate (default: https://libretranslate.de)')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be generated without writing')
    parser.add_argument('--resume', action='store_true', help='Skip posts already translated')
    parser.add_argument('--languages', help='Comma-separated list of language codes to translate (default: all 9)')
    parser.add_argument('--post-slugs', help='Comma-separated list of English slugs to translate (default: all)')
    args = parser.parse_args()

    # Filter target languages if specified
    target_langs = TARGET_LANGUAGES
    if args.languages:
        lang_codes = [c.strip() for c in args.languages.split(',')]
        target_langs = [(c, n) for c, n in TARGET_LANGUAGES if c in lang_codes]
        if not target_langs:
            print(f"ERROR: No valid languages in {args.languages}")
            sys.exit(1)

    # Load blogs.json
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    blogs_path = os.path.join(script_dir, 'src', 'data', 'blogs.json')

    with open(blogs_path, 'r', encoding='utf-8') as f:
        all_posts = json.load(f)

    # Separate English posts from existing translations
    english_posts = [p for p in all_posts if not p.get('lang') or p['lang'] == '' or p['lang'] == 'en']
    existing_translations = [p for p in all_posts if p.get('lang') and p['lang'] not in ('', 'en')]

    # Filter by post slugs if specified
    if args.post_slugs:
        slugs = [s.strip() for s in args.post_slugs.split(',')]
        english_posts = [p for p in english_posts if p['slug'] in slugs]
        if not english_posts:
            print(f"ERROR: No matching English posts for slugs: {slugs}")
            sys.exit(1)

    print(f"Found {len(english_posts)} English posts")
    print(f"Found {len(existing_translations)} existing translated posts")
    print(f"Target languages: {[lang for lang, name in target_langs]}")
    print(f"Backend: {args.backend}")

    if args.dry_run:
        print("\n[Dry run] Would generate the following new translations:")
        for i, post in enumerate(english_posts[:5]):
            for lang, name in target_langs:
                print(f"  {lang}: {post['slug']}")
        if len(english_posts) > 5:
            print(f"  ... and {len(english_posts) - 5} more posts × {len(target_langs)} languages")
        return

    # Initialize backend
    try:
        backend = get_backend(args.backend, args.api_key, args.base_url)
    except Exception as e:
        print(f"ERROR initializing backend: {e}")
        sys.exit(1)

    # Test backend
    print("\nTesting translation backend...")
    if not backend.test():
        print("ERROR: Backend test failed. Check API key / connectivity.")
        sys.exit(1)
    print("Backend test passed!")

    # Build set of existing (lang, english_slug) pairs for --resume mode
    existing_pairs = set()
    for t in existing_translations:
        if t.get('translatedFrom'):
            existing_pairs.add((t['lang'], t['translatedFrom']))

    # Create translations
    new_translations = []
    total_to_generate = len(english_posts) * len(target_langs)
    if args.resume:
        total_to_generate = total_to_generate - len([p for p in existing_pairs if p[0] in [l for l, _ in target_langs]])

    print(f"\nGenerating {total_to_generate} translations...")
    count = 0

    for i, post in enumerate(english_posts):
        english_slug = post['slug']
        print(f"\n[{i+1}/{len(english_posts)}] Processing: {english_slug}")

        title = post.get('title', '')
        summary = post.get('summary', '')
        content = post.get('content', '')

        for lang_code, lang_name in target_langs:
            if args.resume and (lang_code, english_slug) in existing_pairs:
                print(f"  [{lang_code}] Skipping (already translated)")
                continue

            print(f"  [{lang_code}] Translating...", end=" ", flush=True)

            # Translate title
            title_translated = backend.translate(title, 'en', lang_code)

            # Translate summary
            summary_translated = backend.translate(summary, 'en', lang_code)

            # Translate full content
            content_translated = backend.translate(content, 'en', lang_code)

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

        # Brief pause between posts
        time.sleep(0.5)

    # Merge: if --resume, keep existing translations; otherwise replace all
    if args.resume:
        result_posts = [p for p in all_posts if not p.get('lang') or p['lang'] in ('', 'en')]
        result_posts.extend(existing_translations)
        result_posts.extend(new_translations)
    else:
        result_posts = english_posts + new_translations

    # Sort by date (newest first)
    result_posts.sort(key=lambda p: p.get('date', ''), reverse=True)

    if not args.dry_run:
        with open(blogs_path, 'w', encoding='utf-8') as f:
            json.dump(result_posts, f, indent=2, ensure_ascii=False)

        print(f"\n✅ Complete! Generated {count} new translations.")
        print(f"   Total posts in blogs.json: {len(result_posts)}")
        print(f"   English posts: {len(english_posts)}")
        print(f"   Total translated posts: {len([p for p in result_posts if p.get('lang') and p['lang'] not in ('', 'en')])}")

if __name__ == '__main__':
    main()