# Index status — 12 November 2026

**What this file can and cannot tell you.** It cannot tell you how many pages Google has indexed. That number lives in Search Console and nowhere else, and there is no API access to it from this workspace.

What it does give you is the other half of the comparison: every page the site publishes, whether it asks to be indexed, how much text it carries, and how many internal links point at it. Put the `indexable-urls.csv` list beside Search Console → Indexing → Pages and the difference is your "not indexed" list.

## The numbers

- HTML pages published: **853**
- Pages asking to be indexed: **235**
- Pages deliberately noindexed: **618**
- URLs in the sitemaps: **233**
- Indexable pages kept out of the sitemaps because they canonicalise elsewhere: **2** (by design)

## What Google is being asked to index

| Section | Pages |
|---|---|
| Blog | 98 |
| Location pages | 57 |
| Core / brand | 18 |
| Service pages | 12 |
| Case studies | 11 |
| Comparisons | 10 |
| Locality pages | 10 |
| Topic hubs | 7 |
| Lead magnets | 4 |
| Tools | 4 |
| Bengaluru hub | 1 |
| Brand / hub | 1 |
| Loans | 1 |
| home | 1 |

Full URL list with titles, word counts and internal link counts: `seo/indexable-urls.csv`.

## What is deliberately kept out

| Section | Pages |
|---|---|
| Blog | 542 |
| Locality pages | 74 |
| Core / brand | 2 |

Full list: `seo/noindex-urls.csv`. This is the honest reason the indexable count is 235 and not 859: the locality pages beyond the nine with unique content, the machine-translated duplicates and the utility pages are all noindexed on purpose. Publishing 859 competing pages would thin the site, not deepen it.

## Pages most likely to be skipped

These are the candidates for "Crawled — currently not indexed" or "Discovered — currently not indexed" in Search Console. They are indexable, but each has a property Google uses to decide a page is not worth the slot.

### Under 500 words (13)

- `/blog/lic-jeevan-anand-vs-jeevan-labh-comparison/` — 416 words — LIC Jeevan Anand vs Jeevan Labh 2026
- `/about-hari-kotian/` — 208 words — About Hari Kotian | Insurance Support
- `/about/` — 431 words — About Hari Kotian | Insurance Support
- `/contact/` — 376 words — Contact Us | Insurance Support by Hari Kotian
- `/disclaimer/` — 170 words — Disclaimer
- `/expert-insights/` — 357 words — Expert Insights | Insurance Support by Hari Kotian
- `/policy-review-checklist/` — 392 words — Printable Insurance Policy Review Checklist
- `/resources/how-it-works/` — 460 words — How It Works | Insurance Support | Insurance Support
- `/tools/` — 450 words — Free Insurance Tools & Calculators | Insurance Support
- `/tools/human-life-value-calculator/` — 488 words — Human Life Value (HLV) Calculator | Free Tool
- `/tools/policy-recovery/` — 423 words — LIC Policy Recovery | Find Lost & Lapsed Policies
- `/tools/risk-scorecard/` — 462 words — Free Insurance Risk Scorecard | Is Your Family Underinsured?
- `/guides/` — 466 words — Insurance Guides by Topic (2026) | Insurance Support


### No internal links pointing at them (0)

_None._


### Duplicate titles (10 groups)

- *IRDAI Complete Guide for Indian Policyholders (2026)* — 2 pages: `/blog/irdai-complete-guide-policyholders-india-2026/`, `/blog/irdai-policyholders-guide-india-2026/`
- *About Hari Kotian | Insurance Support* — 2 pages: `/about-hari-kotian/`, `/about/`
- *Insurance Advisor in Bellandur, Bangalore | Hari Kotian* — 2 pages: `/cities/bellandur/`, `/locations/bangalore-bellandur/`
- *Insurance Advisor in HSR Layout, Bangalore | Hari Kotian* — 2 pages: `/cities/hsr-layout/`, `/locations/bangalore-hsr-layout/`
- *Insurance Advisor in Indiranagar, Bangalore | Hari Kotian* — 2 pages: `/cities/indiranagar/`, `/locations/bangalore-indiranagar/`
- *Insurance Advisor in Jayanagar, Bangalore | Hari Kotian* — 2 pages: `/cities/jayanagar/`, `/locations/bangalore-jayanagar/`
- *Insurance Advisor in Koramangala, Bangalore | Hari Kotian* — 2 pages: `/cities/koramangala/`, `/locations/bangalore-koramangala/`
- *Insurance Advisor in Marathahalli, Bangalore | Hari Kotian* — 2 pages: `/cities/marathahalli/`, `/locations/bangalore-marathahalli/`
- *Insurance Advisor in Whitefield, Bangalore | Hari Kotian* — 2 pages: `/cities/whitefield/`, `/locations/bangalore-whitefield/`
- *Insurance Advisor in Yelahanka, Bangalore | Hari Kotian* — 2 pages: `/cities/yelahanka/`, `/locations/bangalore-yelahanka/`


### Missing a meta description (0)

_None._


### Canonical pointing elsewhere (2)

These are deliberate consolidations, not faults — Google folds them into the target URL. They are listed only so the sitemap count and the indexed count are not expected to match exactly.


- `/blog/irdai-policyholders-guide-india-2026/` → https://insurancesupport.online/blog/irdai-complete-guide-policyholders-india-2026/
- `/about-hari-kotian/` → https://insurancesupport.online/about/


## How to get the real number in ten minutes

1. Open Search Console for `insurancesupport.online`.
2. **Indexing → Pages**. The summary bar gives Indexed and Not indexed counts, and the "Why pages
   aren't indexed" table splits the second number by reason.
3. Export the "Indexed" table and the "Not indexed" table (top right of each list).
4. Compare against `seo/indexable-urls.csv`. Anything in the CSV that is absent from Google's
   Indexed list is genuinely not indexed yet — that is the list you asked for.

A quick sanity check that needs no login: search `site:insurancesupport.online` in Google. The
count under the results is approximate, but the number is in the right order of magnitude and it
tells you immediately whether the site is indexed at all.

## What to send me

The two CSV exports from Search Console. With those I can name the exact pages Google is holding
back and fix the reason — usually thin content, duplicate intent or a page that is only reachable
through the sitemap.
