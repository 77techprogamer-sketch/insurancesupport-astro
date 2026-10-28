import os
import json
import re
from pathlib import Path
from collections import Counter

dist = Path('dist')
files = list(dist.rglob('*.html'))
print(f'Total HTML files: {len(files)}')

# Collect all valid URLs from dist
valid_urls = set()
for f in files:
    rel = f.relative_to(dist)
    if rel.name == 'index.html':
        url = '/' + str(rel.parent).replace('\\', '/')
        if url == '/.':
            url = '/'
    else:
        url = '/' + str(rel).replace('\\', '/').replace('.html', '')
    valid_urls.add(url)
    valid_urls.add(url + '/')

# Add known assets
for ext in ['.css', '.js', '.png', '.jpg', '.svg', '.ico', '.xml', '.txt', '.webp', '.avif']:
    for f in dist.rglob(f'*{ext}'):
        rel = f.relative_to(dist)
        url = '/' + str(rel).replace('\\', '/')
        valid_urls.add(url)

print(f'Valid URLs in dist: {len(valid_urls)}')

# Now check all links in HTML files
link_pattern = re.compile(r'href=["\']([^"\']+)["\']')
broken = []
for f in files:
    content = f.read_text(encoding='utf-8', errors='ignore')
    for match in link_pattern.finditer(content):
        href = match.group(1)
        if href.startswith('http') or href.startswith('mailto:') or href.startswith('tel:') or href.startswith('#'):
            continue
        if not href.startswith('/'):
            continue
        href = href.rstrip('/')
        if href not in valid_urls and href + '/' not in valid_urls:
            src_rel = f.relative_to(dist)
            broken.append({'source': '/' + str(src_rel).replace('\\', '/'), 'target': href})

print(f'Broken internal links: {len(broken)}')
targets = Counter(b['target'] for b in broken)
for target, count in targets.most_common(30):
    print(f'  {count}: {target}')

# Save full report
with open('broken-links-current.json', 'w') as f:
    json.dump({'broken': broken}, f, indent=2)
print('\nSaved to broken-links-current.json')