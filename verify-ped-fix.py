import json, re

with open('src/data/blogs.json', encoding='utf-8') as f:
    blogs = json.load(f)

def get(slug): return next(b for b in blogs if b['slug'] == slug)

# 1. Check no car-insurance terms in the 4 fixed posts
car_terms = ['zero depreciation', 'depreciation', 'bumper-to-bumper', 'car insurance', 'motor insurance', 'IDV', 'no-claim bonus']
slugs = [
    'health-insurance-pre-existing-disease-waiting-period-guide-2026',
    'hi-health-insurance-pre-existing-disease-waiting-period-guide-2026',
    'bn-health-insurance-pre-existing-disease-waiting-period-guide-2026',
    'mr-health-insurance-pre-existing-disease-waiting-period-guide-2026',
]
print("=== Car-insurance term check (should all be 0) ===")
all_clean = True
for s in slugs:
    c = get(s)['content'].lower()
    found = [t for t in car_terms if t in c]
    if found:
        all_clean = False
        print(f"  {s}: FOUND {found}")
print("  All clean:", all_clean)

# 2. Check FAQ section intact
print("\n=== FAQ intact check ===")
for s in slugs:
    c = get(s)['content']
    has_faq = '## FAQ' in c
    q_count = len(re.findall(r'\*\*Q:', c[c.find('## FAQ'):]))
    print(f"  {s}: FAQ={has_faq}, Q-count={q_count}")

# 3. Similarity between fixed EN post and the car post
def shingles(content, n=5):
    words = re.sub(r'[^a-z0-9 ]',' ', content.lower()).split()
    return set(' '.join(words[i:i+n]) for i in range(len(words)-n+1))

a = get('health-insurance-pre-existing-disease-waiting-period-guide-2026')['content']
b = get('zero-depreciation-car-insurance-add-on-cover-guide-2026')['content']
sa, sb = shingles(a), shingles(b)
inter = len(sa.intersection(sb))
union = len(sa.union(sb))
sim = inter / union if union else 0
print(f"\n=== Similarity (PED EN post vs car post): {sim:.1%} (was 97.8%) ===")

# 4. Word count of new posts
print("\n=== Word counts ===")
for s in slugs:
    c = get(s)['content']
    words = len(re.sub(r'[#>*`\[\]()!-]', ' ', c).split())
    print(f"  {s}: {words} words")