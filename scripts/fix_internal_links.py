import json, re

# Load data
with open('src/content/cities/index.json', 'r') as f:
    cities = json.load(f)
with open('src/data/blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)
with open('src/data/services.json', 'r', encoding='utf-8') as f:
    services = json.load(f)

service_slugs = {s.get('slug', '') for s in services if isinstance(s, dict)}

# Mapping broken service links to correct valid services
service_redirects = {
    'health-insurance-portability': 'health-insurance',
    'claim-dispute-resolution': 'claim-support',
    'insurance-portfolio-planning': 'life-insurance',
    'lic-policy-consulting': 'life-insurance',
    'cyber-insurance': 'life-insurance',  # no cyber service page exists
    'wedding-insurance': 'motor-insurance',  # no wedding service
    'sme-insurance': 'sme-insurance',
    'life-insurance-audit': 'life-insurance',
    'motor-insurance': 'motor-insurance',
    'pension-plans': 'pension-plans',
    'health-insurance-audit': 'health-insurance',
    'ulip-plans': 'ulip-plans',
    'term-insurance': 'term-insurance',
    'travel-insurance': 'travel-insurance',
}

# Also identify claim/rejection posts for cross-linking
claim_slugs = []
for b in blogs:
    slug = b['slug']
    if 'claim' in slug.lower() or 'rejection' in slug.lower() or 'rejected' in slug.lower():
        claim_slugs.append(slug)

print('Claim/rejection posts:', claim_slugs)

fixed_count = 0
crosslinked_count = 0

for b in blogs:
    original_content = b['content']
    content = b['content']
    slug = b['slug']
    
    # Fix broken service links: /services/old-slug/ -> /services/new-slug/
    def fix_service_link(match):
        global fixed_count
        old_slug = match.group(1)
        if old_slug in service_redirects:
            new_slug = service_redirects[old_slug]
            if new_slug in service_slugs:
                fixed_count += 1
                return f'/services/{new_slug}'
        # Remove broken links entirely if we can't redirect
        if old_slug not in service_slugs:
            fixed_count += 1
            return ''
        return match.group(0)
    
    # Only fix links that are in markdown format [text](/services/slug)
    content = re.sub(r'/services/([^/)]+)(?:/)?', fix_service_link, content)
    
    # Add cross-links between claim/rejection posts
    if slug in claim_slugs:
        # Build a cross-link paragraph
        other_claims = [s for s in claim_slugs if s != slug]
        if other_claims and not re.search(r'RELATED READING.*claim', content):
            link_texts = []
            for cs in other_claims[:3]:  # link to max 3 related
                # Get title
                c_title = next((b['title'] for b in blogs if b['slug'] == cs), cs.replace('-', ' ').title())
                link_texts.append(f'[{c_title}](https://insurancesupport.online/blog/{cs}/)')
            
            crosslink_block = '\n\n## Related Reading: Claim Rejection Resources\n\n' + ' | '.join(link_texts) + '\n'
            content = content + crosslink_block
            crosslinked_count += 1
    
    if content != original_content:
        b['content'] = content
        print(f'Updated: {slug}')

with open('src/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blogs, f, indent=2, ensure_ascii=False)

print(f'\nTotal broken links fixed: {fixed_count}')
print(f'Total cross-links added: {crosslinked_count}')
