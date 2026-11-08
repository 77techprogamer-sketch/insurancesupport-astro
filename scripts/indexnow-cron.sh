#!/bin/bash
# IndexNow submission cron wrapper
# Runs every 15 minutes to keep search indexes fresh

cd /c/Users/A/Desktop/insurancesupport-astro

# Regenerate URL list from sitemap (in case new content was added)
python -c "
import xml.etree.ElementTree as ET
import sys
import os

sitemap_path = 'blog-sitemap.xml'
try:
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    ns = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = [url.find('ns:loc', ns).text for url in root.findall('ns:url', ns) if url.find('ns:loc', ns) is not None]
    with open('all_urls.txt', 'w') as f:
        for url in urls:
            f.write(url + '\n')
    print(f'Generated all_urls.txt with {len(urls)} URLs')
except Exception as e:
    print(f'Warning: Could not regenerate URL list: {e}', file=sys.stderr)
"

# Submit to IndexNow
python scripts/indexnow-submit.py