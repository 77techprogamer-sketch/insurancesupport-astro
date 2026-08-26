#!/usr/bin/env python3
"""
scripts/add-all-internal-links.py

Adds comprehensive internal links to ALL blog posts (English + 8 Indian languages).
Uses a curated keyword map to link important insurance terms to relevant posts.

Usage:
  python scripts/add-all-internal-links.py            # Process all posts
  python scripts/add-all-internal-links.py --dry-run  # Preview changes
"""

import json
import re
import os
import sys
from collections import defaultdict

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
BLOGS_PATH = os.path.join(PROJECT_DIR, 'src', 'data', 'blogs.json')

# Curated keyword-to-URL mapping for important insurance terms
# Maps English keywords → (English slug, English title)
KEYWORD_MAP = {
    # LIC / Life Insurance
    'lic policy': ('lic-policy-hub-complete-guide-2026', 'LIC Policy Hub'),
    'lic claim': ('lic-claim-rejection-appeal-guide-2026', 'LIC Claim Rejection'),
    'lic premium': ('lic-premium-calculator-2026', 'LIC Premium Calculator'),
    'lic surrender': ('lic-policy-surrender-charges-guide-2026', 'LIC Surrender Charges'),
    'lic revival': ('lic-policy-revival-after-lapse-the-complete-2026-step-by-step-guide-modes-fees-documents', 'LIC Revival'),
    'lic maturity': ('lic-maturity-claim-process-2026', 'LIC Maturity Claim'),
    'lic loan': ('loan-against-insurance-policy-in-india-2026-get-instant-funds-without-surrendering', 'LIC Loan Against Policy'),
    'lic jeevan anand': ('lic-latest-plans-2026-jeevan-utsav-amritbaal-index-plus', 'LIC Jeevan Anand'),
    'lic jeevan lakshya': ('lic-latest-plans-2026-jeevan-utsav-amritbaal-index-plus', 'LIC Jeevan Lakshya'),
    'lic jeevan tarang': ('lic-latest-plans-2026-jeevan-utsav-amritbaal-index-plus', 'LIC Jeevan Tarang'),
    'lic amrutbaal': ('lic-latest-plans-2026-jeevan-utsav-amritbaal-index-plus', 'LIC Amrutbaal'),
    'lic pension': ('lic-pension-plans-2026', 'LIC Pension Plan'),
    'life insurance': ('life-insurance-in-india-2026-complete-guide-to-choosing-the-right-policy', 'Life Insurance Guide'),
    'term insurance': ('term-insurance-comparison-hub-2026', 'Term Insurance Comparison'),
    'ulip': ('ulip-plans-india-2026-complete-guide-to-unit-linked-insurance-plans', 'ULIP Plans'),
    'endowment plan': ('whole-life-vs-term-vs-endowment-insurance-comparison-2026', 'Endowment Plan'),
    'money back policy': ('money-back-policy-vs-term-insurance-sip-which-better-returns-2026', 'Money Back Policy'),
    'whole life insurance': ('whole-life-vs-term-vs-endowment-insurance-comparison-2026', 'Whole Life Insurance'),
    'death claim': ('how-to-file-a-death-claim-on-life-insurance-in-india-2026-complete-guide', 'Death Claim Process'),
    'claim rejection': ('health-insurance-claim-rejection-rights-2026', 'Claim Rejection Rights'),
    'claim rejection appeal': ('insurance-claim-rejected-here-s-your-complete-legal-practical-fight-back-guide-2026', 'Claim Rejection Appeal'),
    'claim settlement ratio': ('health-insurance-claim-settlement-ratio-2026', 'Claim Settlement Ratio'),
    'insurance claim process': ('motor-insurance-claim-process-guide-2026', 'Insurance Claim Process'),

    # Health Insurance
    'health insurance': ('health-insurance-hub-complete-2026-guide', 'Health Insurance Hub'),
    'health insurance portability': ('health-insurance-portability-india-2026-switch-insurer-without-losing-benefits', 'Health Insurance Portability'),
    'pre-existing disease': ('health-insurance-pre-existing-disease-waiting-period-guide-2026', 'Pre-existing Disease Waiting Period'),
    'restoration benefit': ('health-insurance-restoration-benefit-reclaim-sum-insured-2026', 'Restoration Benefit'),
    'waiting period': ('health-insurance-pre-existing-disease-waiting-period-guide-2026', 'Waiting Period'),
    'health insurance tax': ('health-insurance-tax-benefits-india-2026-save-tax-under-section-80d', 'Health Insurance Tax Benefits'),
    'section 80d': ('health-insurance-tax-benefits-india-2026-save-tax-under-section-80d', 'Section 80D'),
    'cashless claim': ('irdai-cashless-claim-pre-authorization-approval-rejection-rules-2026', 'Cashless Claim'),
    'pre-authorization': ('irdai-cashless-claim-pre-authorization-approval-rejection-rules-2026', 'Pre-authorization'),
    'family floater': ('family-floater-vs-individual-health-insurance-comparison-2026', 'Family Floater'),
    'critical illness': ('critical-illness-insurance-in-india-2026-do-you-really-need-it-complete-guide', 'Critical Illness'),

    # Motor Insurance
    'car insurance': ('car-insurance-renewal-online-bangalore', 'Car Insurance Renewal'),
    'motor insurance': ('motor-insurance-claim-process-guide-2026', 'Motor Insurance'),
    'no claim bonus': ('zero-depreciation-car-insurance-add-on-cover-guide-2026', 'No Claim Bonus'),
    'zero depreciation': ('zero-depreciation-car-insurance-add-on-cover-guide-2026', 'Zero Depreciation'),
    'idv': ('how-to-calculate-idv-insured-declared-value-vehicle-2026', 'IDV Calculator'),
    'insured declared value': ('how-to-calculate-idv-insured-declared-value-vehicle-2026', 'Insured Declared Value'),

    # Tax & Savings
    'section 80c': ('section-80c-insurance-premium-deduction-2026-save-tax-life-insurance', 'Section 80C'),
    'section 80ccd': ('nps-section-80ccd1b-extra-50000-tax-deduction-india-2026', 'Section 80CCD'),
    'tax benefit': ('health-insurance-tax-benefits-india-2026-save-tax-under-section-80d', 'Tax Benefits'),
    'tax deduction': ('section-80c-insurance-premium-deduction-2026-save-tax-life-insurance', 'Tax Deduction'),

    # IRDAI & Legal
    'irdai': ('irdai-grievance-process-complaint-guide-2026', 'IRDAI Grievance Process'),
    'irdai registration': ('about', 'IRDAI Registration'),
    'ombudsman': ('irdai-ombudsman-process-insurance-complaint-resolution-2026', 'IRDAI Ombudsman'),
    'grievance': ('irdai-grievance-process-complaint-guide-2026', 'IRDAI Grievance'),
    'igms portal': ('how-to-file-complaint-irdai-igms-portal-2026', 'IRDAI IGMS Portal'),
    'legal': ('insurance-claim-rejected-here-s-your-complete-legal-practical-fight-back-guide-2026', 'Legal Claim Fight-Back'),

    # Other services
    'child education plan': ('child-education-planning-hub-2026', 'Child Education Plan'),
    'pension plan': ('pension-plans-india-2026-nps-annuity-pension-insurance-complete-guide', 'Pension Plans'),
    'nps': ('nps-section-80ccd1b-extra-50000-tax-deduction-india-2026', 'NPS'),
    'cyber insurance': ('cyber-insurance-india-2026-protect-your-business-from-digital-threats', 'Cyber Insurance'),
    'travel insurance': ('travel-insurance-india-2026-why-you-must-buy-before-your-next-trip', 'Travel Insurance'),
    'sme insurance': ('sme-insurance-in-india-2026-complete-guide-for-small-and-medium-businesses', 'SME Insurance'),
    'wedding insurance': ('wedding-insurance-india-2026-protect-your-big-day-from-unexpected-disruptions', 'Wedding Insurance'),
    'professional indemnity': ('professional-indemnity-insurance-in-india-2026-complete-guide', 'Professional Indemnity'),

    # General terms
    'insurance advisor': ('insurance-support-services-across-india-find-local-insurance-help-in-your-city-2026', 'Insurance Advisor'),
    'premium': ('term-insurance-comparison-hub-2026', 'Insurance Premium'),
    'sum insured': ('health-insurance-hub-complete-2026-guide', 'Sum Insured'),
    'deductible': ('health-insurance-hub-complete-2026-guide', 'Deductible'),
    'riders': ('lic-accidental-death-disability-rider-guide-2026', 'Insurance Riders'),
    'claim process': ('motor-insurance-claim-process-guide-2026', 'Claim Process'),
    'renewal': ('car-insurance-renewal-online-bangalore', 'Insurance Renewal'),
    'comparison': ('term-insurance-comparison-hub-2026', 'Insurance Comparison'),
    'guide': ('insurance-guides-hub-2026', 'Insurance Guides Hub'),
}

def load_posts():
    with open(BLOGS_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def find_already_linked(content):
    """Find all URLs already linked in content."""
    linked = set()
    for match in re.finditer(r'\[(?:[^\]]*)\]\(([^)]+)\)', content):
        linked.add(match.group(1).rstrip('/'))
    return linked

def link_keywords(content, max_links=10, lang='en'):
    """
    Add internal links to content by matching keywords.
    Skips keywords already linked, matches case-insensitively.
    Links to translated posts when lang != 'en'.
    """
    already_linked = find_already_linked(content)
    links_added = 0

    # Sort by keyword length (longest first for specificity)
    sorted_keywords = sorted(KEYWORD_MAP.keys(), key=len, reverse=True)

    for keyword in sorted_keywords:
        if links_added >= max_links:
            break

        slug, title = KEYWORD_MAP[keyword]
        # When linking from a translated post, link to the translated version
        if lang != 'en':
            translated_slug = f"{lang}-{slug}"
            url = f'/blog/{lang}/{slug}'
        else:
            url = f'/blog/{slug}'

        if url.rstrip('/') in already_linked:
            continue

        # Case-insensitive, word-boundary match
        pattern = re.compile(
            r'(?<!\w)(' + re.escape(keyword) + r')(?!\w)',
            re.IGNORECASE
        )

        match = pattern.search(content)
        if match:
            matched_text = match.group(1)
            link = f'[{matched_text}]({url})'
            content = content[:match.start()] + link + content[match.end():]
            already_linked.add(url.rstrip('/'))
            links_added += 1

    return content, links_added

def main():
    dry_run = '--dry-run' in sys.argv
    lang_filter = None
    if '--lang' in sys.argv:
        idx = sys.argv.index('--lang')
        if idx + 1 < len(sys.argv):
            lang_filter = sys.argv[idx + 1]

    posts = load_posts()
    print(f"Loaded {len(posts)} posts")

    total_links = 0
    posts_modified = 0

    for i, post in enumerate(posts):
        lang = post.get('lang', 'en')
        if lang_filter and lang != lang_filter:
            continue

        if not post.get('content') or len(post.get('content', '')) < 200:
            continue

        # Skip if content already has many links (avoid double-linking)
        existing_links = len(re.findall(r'\[([^\]]+)\]\(/blog/', post['content']))
        if existing_links >= 10:
            continue

        new_content, links_added = link_keywords(post['content'])

        if links_added > 0:
            posts_modified += 1
            total_links += links_added
            post['content'] = new_content
            print(f"  [{i+1}] {post.get('lang','en')}:{post['slug']}: +{links_added} links")

    print(f"\nSummary: {posts_modified} posts modified, {total_links} links added")

    if not dry_run and posts_modified > 0:
        with open(BLOGS_PATH, 'w', encoding='utf-8') as f:
            json.dump(posts, f, indent=2, ensure_ascii=False)
        print(f"✅ Updated {BLOGS_PATH}")
    elif dry_run:
        print("(dry-run - no changes written)")

if __name__ == '__main__':
    main()