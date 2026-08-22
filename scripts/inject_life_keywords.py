import json

# Core meaning/intent phrases grouped by topic
keyword_clusters = {
    "definition_meaning": [
        "life insurance definition",
        "life insurance meaning",
        "life insurance kya hota hai",
        "life insurance meaning in hindi",
        "life insurance meaning in kannada",
        "life insurance meaning in simple words",
        "life insurance kya hota hai in hindi",
        "life insurance ka matlab kya hota hai",
        "what is life insurance",
        "what life insurance means",
        "life insurance what is it"
    ],
    "companies_best": [
        "life insurance best company in india",
        "life insurance best company",
        "life insurance best policy",
        "life insurance best plan",
        "best life insurance companies",
        "best life insurance policy in india",
        "top life insurance companies in india",
        "top life insurance companies in india 2026",
        "top life insurance companies in world",
        "life insurance companies in india",
        "life insurance companies",
        "life insurance highest claim settlement ratio",
        "life insurance market share in india",
        "life insurance market size in india",
        "life insurance claims settlement ratio",
        "life insurance settlement ratio",
        "life insurance best",
        "the best life insurance companies",
        "top life insurance company in india 2025",
        "life insurance ranking in india"
    ],
    "indian_brands": [
        "life insurance corporation",
        "life insurance corporation of india login",
        "life insurance corporation of india was formed on",
        "life insurance corporation of india share price",
        "life insurance corporation of india news",
        "lic of i",
        "lic policy",
        "lic",
        "life insurance lic",
        "life insurance lic policy",
        "sbi life insurance",
        "sbi life insurance login",
        "login sbi life insurance",
        "tata aia life insurance",
        "hdfc life insurance",
        "login hdfc life insurance",
        "icici life insurance",
        "login icici life insurance",
        "max life insurance",
        "max life insurance login",
        "login max life insurance",
        "login axis max life insurance",
        "bajaj allianz life insurance",
        "bajaj life insurance",
        "bajaj allianz life insurance login",
        "bajaj life insurance login",
        "kotak life insurance",
        "kotak life insurance login",
        "life insurance kotak",
        "life insurance reliance",
        "reliance life insurance",
        "life insurance shriram",
        "shriram life insurance",
        "life insurance birla",
        "aditya birla sun life insurance",
        "life insurance sun",
        "life insurance canara hsbc",
        "canara hsbc life insurance",
        "canara hsbc life insurance share price",
        "life insurance future generali",
        "future generali life insurance",
        "life insurance dhfl",
        "life insurance edelweiss",
        "edelweiss life insurance",
        "exide life insurance",
        "life insurance exide",
        "life insurance pramerica",
        "pramerica life insurance",
        "life insurance bharti axa",
        "bharti axa life insurance",
        "life insurance axis",
        "axis max life insurance",
        "life insurance nippon",
        "nippon life insurance",
        "reliance nippon life insurance",
        "life insurance reliance nippon",
        "life insurance aviva",
        "aviva life insurance",
        "life insurance star",
        "star health life insurance"
    ]
}

# Read blogs.json
with open('src/data/blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

# Target comprehensive guides for keyword injection
target_slugs = [
    'life-insurance-in-india-2026-complete-guide-to-choosing-the-right-policy',
    'term-insurance-vs-life-insurance-key-differences-every-indian-must-know-2026',
    'life-insurance-death-claim-settlement-the-definitive-2026-guide-for-families-in-india'
]

injected_count = 0
for b in blogs:
    if b['slug'] in target_slugs:
        content = b.get('content', '')
        tags = b.get('tags', [])
        
        # Build FAQ section with clustered keywords
        faq_section = """

## Life Insurance FAQ: Key Questions Answered

### What is life insurance and how does it work in India?
Life insurance is a contract between you and an insurance company (like Life Insurance **Corporation of India**, SBI Life, HDFC Life, ICICI Pru, Max Life, Tata AIA, Bajaj Allianz, Kotak Life, or Aditya Birla Sun Life) where you pay regular premiums in exchange for a guaranteed sum assured on death or maturity.

### What are the best life insurance companies in India?
Based on IRDAI's **highest claim settlement ratio** data and customer satisfaction, the top life insurance companies in India 2026 are: LIC (market leader), SBI Life, HDFC Life, ICICI Pru, Max Life, Tata AIA, Bajaj Allianz, Kotak Life, Axis Max Life, Birla Sun Life, and Reliance Nippon Life. These offer the best life insurance policies with high returns and high claim settlement ratios.

### What is the difference between life insurance and term insurance?
While often used interchangeably, life insurance is the broad category of products (endowment, money-back, ULIP), while term insurance is the purest, most affordable life insurance plan that provides only the death benefit. For most Indian families, a combination of term insurance (protection) and health insurance (medical cover) is the ideal life insurance vs term insurance strategy.

### What are the benefits of life insurance?
Key life insurance benefits include: (1) Financial security for dependents after policyholder's death, (2) Maturity benefits with guaranteed returns on endowment plans, (3) Tax exemption under Section 80C, (4) Life insurance loan facility against the policy, (5) Guaranteed peace of mind as it protects your family's future.

### How much life insurance coverage do I need?
General rule: 10-15x your annual income, plus any outstanding loans (home, car) and children's education/marriage costs. Use our life insurance premium calculator and return calculator to determine optimal coverage.

### Is life insurance taxable and how does the new tax regime affect it?
Life insurance premiums qualify for deduction under Section 80C (up to 1.5 lakhs). Maturity proceeds are generally tax-free under Section 10(10D), though the new tax regime changes how you can claim this exemption. Life insurance deduction in income tax is available under Section 80C.

### Can I buy life insurance online and what documents are required?
Yes, you can purchase life insurance online via insurer websites, Policybazaar, Ditto, or through your local LIC agent. Required documents include PAN card, Aadhaar card, bank statement/PDC, medical reports (for high-sum policies), and age proof.

### What are life insurance plans for senior citizens above 65 years?
Several insurers offer life insurance for senior citizens above 65 years in India, including LIC Jeevan Shanti, SBI Life Pension plans, and post office life insurance policies (Jeevan Shanti). These are ideal for retirees seeking guaranteed regular income.
"""
        b['content'] = content + faq_section
        # Add cluster keywords as tags
        b['tags'] = tags + keyword_clusters['definition_meaning'] + keyword_clusters['companies_best']
        injected_count += 1
        slug = b['slug']
        print('Injected: ' + slug)

with open('src/data/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blogs, f, indent=2, ensure_ascii=False)

print(f'Injected into {injected_count} comprehensive guide posts!')
