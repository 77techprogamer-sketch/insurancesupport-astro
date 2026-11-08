#!/usr/bin/env python3
"""
Generate all_urls.txt from sitemap files for IndexNow Python script.
Run after build: python scripts/generate_all_urls.py
"""
import os
import re
import glob
from pathlib import Path

DIST_DIR = Path(__file__).parent.parent / 'dist'
SITEMAPS_DIR = DIST_DIR / 'sitemaps'
OUTPUT_FILE = DIST_DIR / 'all_urls.txt'

def extract_locs(xml):
    """Extract all <loc> URLs from XML sitemap."""
    return re.findall(r'<loc>([^<]+)</loc>', xml)

def main():
    urls = set()
    
    # Add root URL
    urls.add('https://insurancesupport.online/')
    
    # Read sitemap-index.xml
    index_path = DIST_DIR / 'sitemap-index.xml'
    sub_sitemaps = []
    if index_path.exists():
        index_xml = index_path.read_text(encoding='utf-8')
        sub_sitemaps = extract_locs(index_xml)
        # Filter for sub-sitemaps
        sub_sitemaps = [u for u in sub_sitemaps if '/sitemaps/' in u]
        
        for sub in sub_sitemaps:
            # Convert to local path
            sub_name = sub.replace('https://insurancesupport.online/sitemaps/', '')
            sub_path = SITEMAPS_DIR / sub_name
            if sub_path.exists():
                sub_xml = sub_path.read_text(encoding='utf-8')
                for loc in extract_locs(sub_xml):
                    urls.add(loc.strip())
    
    # Also check for any sitemaps directly in sitemaps dir
    processed_sitemap_names = [Path(u).name for u in sub_sitemaps if '/sitemaps/' in u]
    for sitemap_file in SITEMAPS_DIR.glob('*-sitemap.xml'):
        if sitemap_file.name not in processed_sitemap_names:
            sub_xml = sitemap_file.read_text(encoding='utf-8')
            for loc in extract_locs(sub_xml):
                urls.add(loc.strip())
    
    # Write sorted URLs
    sorted_urls = sorted(urls)
    OUTPUT_FILE.write_text('\n'.join(sorted_urls) + '\n', encoding='utf-8', newline='\n')
    print(f"Generated {len(sorted_urls)} URLs to {OUTPUT_FILE}")

if __name__ == '__main__':
    main()