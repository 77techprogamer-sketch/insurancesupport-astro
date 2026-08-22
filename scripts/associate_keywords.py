import json
import re

with open('src/data/blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

# Generate keywords based on title, tags, content
for b in blogs:
    slug = b['slug']
    title = b.get('title', '')
    tags = b.get('tags', [])
    content = b.get('content', '')
    
    # Build new keyword list based on title and existing tags
    keywords = list(tags)  # Start with existing tags
    
    # Keyword generation rules based on title keywords
    if 'LIC' in title or 'lic' in slug:
        lic_keywords = [
            'LIC policy',
            'LIC claim',
            'LIC premium',
            'LIC maturity',
            'LIC surrender',
            'LIC revival',
        ]
        # Extract plan names from title/content
        plan_match = re.findall(r'(Jeevan\s+\w+)', content, re.IGNORECASE)
        for plan in set(plan_match):
            keywords.append(f'{plan} review')
            keywords.append(f'{plan} details')
            keywords.append(f'{plan} maturity')
        keywords.extend(lic_keywords)
    
    if 'health insurance' in title.lower() or 'health-insurance' in slug:
        health_keywords = [
            'health insurance claim',
            'health insurance premium',
            'cashless claim',
            'pre-authorization',
            'deductible health insurance',
            'sum insured health insurance',
        ]
        keywords.extend(health_keywords)
    
    if 'motor' in title.lower() or 'car insurance' in title.lower() or 'bike insurance' in title.lower():
        motor_keywords = [
            'motor insurance claim',
            'car insurance premium',
            'bike insurance IDV',
            'zero depreciation',
            'engine protection',
            'no claim bonus',
        ]
        keywords.extend(motor_keywords)
    
    if 'term' in title.lower():
        term_keywords = [
            'term insurance premium',
            'term insurance calculator',
            'term insurance vs life insurance',
            'pure term plan',
            'term insurance for 40 years old',
        ]
        keywords.extend(term_keywords)
    
    if 'pension' in title.lower() or 'annuity' in title.lower():
        pension_keywords = [
            'pension plan investment',
            'annuity calculator',
            'NPS vs pension',
            'immediate annuity',
            'retirement planning',
        ]
        keywords.extend(pension_keywords)
    
    # Extract specific years from title/content
    years = set(re.findall(r'20\d{2}', content + title))
    for y in years:
        keywords.append(f'insurance {y}')
    
    # Remove duplicates while preserving order
    seen = set()
    unique_keywords = []
    for kw in keywords:
        if kw.lower() not in seen:
            seen.add(kw.lower())
            unique_keywords.append(kw)
    
    # Limit to reasonable number of keywords (avoid bloat)
    b['tags'] = unique_keywords[:50]  # Cap at 50 keywords per post
    
    if len(unique_keywords) > len(tags):
        print('Expanded ' + slug + ': ' + str(len(tags)) + ' -> ' + str(len(b['tags'])) + ' keywords')

with open('src/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blogs, f, indent=2, ensure_ascii=False)

print(f'\nKeyword association completed for {len(blogs)} blog posts.')
