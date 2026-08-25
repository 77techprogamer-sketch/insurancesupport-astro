#!/usr/bin/env python3
"""
scripts/add-internal-links.py

Adds internal links to blog content by matching important keywords
to relevant blog posts. Creates a keyword-to-URL mapping from post
titles, categories, and tags, then links first occurrences in content.

Usage:
  python scripts/add-internal-links.py            # Process all posts
  python scripts/add-internal-links.py --dry-run  # Show what would change
  python scripts/add-internal-links.py --lang hi  # Process only Hindi posts
"""

import json
import re
import os
import sys
import argparse
from collections import defaultdict

def load_posts(blogs_path):
    with open(blogs_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def build_keyword_map(posts):
    """Build a mapping of keywords -> (url, title) from all posts."""
    keyword_map = {}
    
    for post in posts:
        if post.get('lang') and post['lang'] != 'en':
            continue  # Only use English posts for keyword mapping
        
        slug = post['slug']
        title = post.get('title', '')
        categories = post.get('categories', [])
        tags = post.get('tags', [])
        
        # URL for this post
        url = f'/blog/{slug}'
        
        # Extract important keywords from title
        # Remove common stop words and extract meaningful phrases
        title_clean = re.sub(r'[:\(\)\[\]]', '', title)
        title_words = title_clean.split()
        
        # Create 2-4 word phrases from title
        for n in [4, 3, 2]:
            for i in range(len(title_words) - n + 1):
                phrase = ' '.join(title_words[i:i+n]).strip()
                # Skip if too short or contains only stop words
                if len(phrase) < 8:
                    continue
                # Skip if phrase is just numbers or common words
                if re.match(r'^[\d\s]+$', phrase):
                    continue
                # Store in lowercase for case-insensitive matching
                key = phrase.lower()
                if key not in keyword_map:
                    keyword_map[key] = (url, title)
        
        # Add category-based keywords
        for cat in categories:
            if len(cat) > 5:
                key = cat.lower()
                if key not in keyword_map:
                    keyword_map[key] = (url, title)
        
        # Add specific insurance terms that map to relevant posts
        insurance_terms = {
            'lic policy': '/blog/lic-policy-hub-complete-guide-2026',
            'lic claim': '/blog/lic-claim-rejection-appeal-guide-2026',
            'health insurance': '/blog/health-insurance-hub-complete-2026-guide',
            'term insurance': '/blog/term-insurance-comparison-hub-2026',
            'car insurance': '/blog/car-insurance-renewal-online-bangalore',
            'motor insurance': '/blog/motor-insurance-claim-process-guide-2026',
            'claim rejection': '/blog/health-insurance-claim-rejection-rights-2026',
            'claim settlement': '/blog/health-insurance-claim-settlement-ratio-2026',
            'irdai': '/blog/irdai-grievance-process-complaint-guide-2026',
            'premium': '/blog/section-80c-insurance-premium-deduction-2026-save-tax-life-insurance',
            'tax benefit': '/blog/health-insurance-tax-benefits-india-2026-save-tax-under-section-80d',
            'portability': '/blog/health-insurance-portability-india-2026-switch-insurer-without-losing-benefits',
            'waiting period': '/blog/health-insurance-pre-existing-disease-waiting-period-guide-2026',
            'no claim bonus': '/blog/zero-depreciation-car-insurance-add-on-cover-guide-2026',
            'riders': '/blog/lic-accidental-death-disability-rider-guide-2026',
            'ulip': '/blog/ulip-plans-india-2026-complete-guide-to-unit-linked-insurance-plans',
            'pension': '/blog/pension-plans-india-2026-nps-annuity-pension-insurance-complete-guide',
            'nps': '/blog/nps-section-80ccd1b-extra-50000-tax-deduction-india-2026',
            'child plan': '/blog/child-education-planning-hub-2026',
            'death claim': '/blog/how-to-file-a-death-claim-on-life-insurance-in-india-2026-complete-guide',
            'surrender': '/blog/lic-policy-revival-complete-guide-2026',
            'revival': '/blog/lic-policy-revival-after-lapse-the-complete-2026-step-by-step-guide-modes-fees-documents',
            'loan against policy': '/blog/loan-against-insurance-policy-in-india-2026-get-instant-funds-without-surrendering',
            'family floater': '/blog/family-floater-vs-individual-health-insurance-comparison-2026',
            'cashless claim': '/blog/irdai-cashless-claim-pre-authorization-approval-rejection-rules-2026',
            'grievance': '/blog/how-to-file-complaint-irdai-igms-portal-2026',
            'ombudsman': '/blog/irdai-ombudsman-process-insurance-complaint-resolution-2026',
            'cyber insurance': '/blog/cyber-insurance-india-2026-protect-your-business-from-digital-threats',
            'travel insurance': '/blog/travel-insurance-india-2026-why-you-must-buy-before-your-next-trip',
            'wedding insurance': '/blog/wedding-insurance-india-2026-protect-your-big-day-from-unexpected-disruptions',
            'sme insurance': '/blog/sme-insurance-in-india-2026-complete-guide-for-small-and-medium-businesses',
            'idv': '/blog/how-to-calculate-idv-insured-declared-value-vehicle-2026',
            'zero depreciation': '/blog/zero-depreciation-car-insurance-add-on-cover-guide-2026',
            'restoration benefit': '/blog/health-insurance-restoration-benefit-reclaim-sum-insured-2026',
            'critical illness': '/blog/critical-illness-insurance-in-india-2026-do-you-really-need-it-complete-guide',
            'money back policy': '/blog/money-back-policy-vs-term-insurance-sip-which-better-returns-2026',
            'whole life insurance': '/blog/whole-life-vs-term-vs-endowment-insurance-comparison-2026',
            'endowment plan': '/blog/whole-life-vs-term-vs-endowment-insurance-comparison-2026',
            'claim process': '/blog/motor-insurance-claim-process-guide-2026',
            'insurance advisor': '/blog/insurance-support-services-across-india-find-local-insurance-help-in-your-city-2026',
            'tier 2 cities': '/blog/insurance-in-tier-2-cities-india-vellore-coimbatore-vizag-surat-lucknow-more-2026',
        }
        
        for term, url in insurance_terms.items():
            if term not in keyword_map:
                keyword_map[term] = (url, '')
    
    return keyword_map

def find_already_linked(content):
    """Find all URLs already linked in the content."""
    linked = set()
    # Match [text](url) patterns
    for match in re.finditer(r'\[([^\]]*)\]\(([^)]+)\)', content):
        linked.add(match.group(2).rstrip('/'))
    # Match href="url" patterns
    for match in re.finditer(r'href="([^"]+)"', content):
        linked.add(match.group(1).rstrip('/'))
    return linked

def add_links_to_content(content, keyword_map, max_links=8):
    """Add internal links to content by matching keywords."""
    already_linked = find_already_linked(content)
    links_added = 0
    modified = False
    
    # Sort keywords by length (longest first) to match more specific terms first
    sorted_keywords = sorted(keyword_map.keys(), key=len, reverse=True)
    
    for keyword in sorted_keywords:
        if links_added >= max_links:
            break
        
        url, title = keyword_map[keyword]
        
        # Skip if already linked to this URL
        if url.rstrip('/') in already_linked:
            continue
        
        # Case-insensitive search for the keyword
        # But only match whole words (not part of larger words)
        pattern = re.compile(r'(?<!\w)(' + re.escape(keyword) + r')(?!\w)', re.IGNORECASE)
        
        match = pattern.search(content)
        if match:
            matched_text = match.group(1)
            # Create the link
            link = f'[{matched_text}]({url})'
            # Replace only the first occurrence
            content = content[:match.start()] + link + content[match.end():]
            already_linked.add(url.rstrip('/'))
            links_added += 1
            modified = True
    
    return content, modified, links_added

def main():
    parser = argparse.ArgumentParser(description='Add internal links to blog content')
    parser.add_argument('--dry-run', action='store_true', help='Show what would change without writing')
    parser.add_argument('--lang', type=str, help='Process only posts in this language (e.g., hi, bn)')
    parser.add_argument('--max-links', type=int, default=8, help='Max internal links per post')
    args = parser.parse_args()
    
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    blogs_path = os.path.join(script_dir, 'src', 'data', 'blogs.json')
    
    posts = load_posts(blogs_path)
    keyword_map = build_keyword_map(posts)
    
    print(f"Built keyword map with {len(keyword_map)} keywords")
    
    # Filter posts to process
    if args.lang:
        posts_to_process = [p for p in posts if p.get('lang') == args.lang]
        print(f"Processing {len(posts_to_process)} posts in language: {args.lang}")
    else:
        posts_to_process = posts
        print(f"Processing all {len(posts_to_process)} posts")
    
    total_links_added = 0
    posts_modified = 0
    
    for i, post in enumerate(posts_to_process):
        content = post.get('content', '')
        if not content or len(content) < 100:
            continue
        
        new_content, modified, links_added = add_links_to_content(content, keyword_map, args.max_links)
        
        if modified:
            posts_modified += 1
            total_links_added += links_added
            post['content'] = new_content
            
            if args.dry_run:
                print(f"  [{i+1}] {post['slug']}: +{links_added} links")
            elif links_added > 0:
                print(f"  [{i+1}] {post['slug']}: +{links_added} links")
    
    print(f"\nSummary:")
    print(f"  Posts modified: {posts_modified}")
    print(f"  Total links added: {total_links_added}")
    
    if not args.dry_run and posts_modified > 0:
        with open(blogs_path, 'w', encoding='utf-8') as f:
            json.dump(posts, f, indent=2, ensure_ascii=False)
        print(f"\n✅ Updated {blogs_path}")

if __name__ == '__main__':
    main()