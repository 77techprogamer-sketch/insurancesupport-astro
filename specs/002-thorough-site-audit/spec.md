# Feature Specification: Thorough Site Audit for insurancesupport.online

**Feature ID:** 002-thorough-site-audit
**Date:** 2026-08-20
**Author:** Hermes Agent via Spec Kit
**Status:** Draft

---

## 1. Purpose & Background

This specification defines a comprehensive, multi-dimensional audit of `insurancesupport.online` — an Astro 4+ TypeScript + Tailwind + React static site on Cloudflare Pages. The site represents **Insurance Support by Hari Kotian** (IRDAI Reg 0149161D), a 25+ year veteran insurance advisor based in Bangalore/Koramangala, serving Indian policyholders nationwide.

The site's business objectives are:
- Generate high-intent phone call leads for insurance advisory
- Establish topical authority in niche high-friction insurance categories
- Build trust through demonstrable expertise (IRDAI certification, 25 years experience)
- Convert visitors via WhatsApp/Call CTAs on every page

This audit establishes a rigorous baseline across all dimensions that matter for SEO, conversion, and brand authority.

---

## 2. Audit Scope — 10 Dimensions

### 2.1 Technical SEO & Indexability
- **Sitemap accuracy**: All sitemap URLs must return 200, have canonical, no orphan pages
- **Crawl budget efficiency**: No 3xx chains, no 4xx/5xx in sitemap, no soft-404 patterns
- **Robots.txt**: Correct directives, no accidental blocking, IndexNow key present
- **Structured data completeness**: LocalBusiness/InsuranceAgency on all location pages, FAQPage on Q&A pages, Article on all blog posts, BreadcrumbList everywhere, Service on service pages
- **Meta tags**: Unique title/description per page, OpenGraph/Twitter cards, canonical self-referencing
- **Hreflang**: Not needed (India-only, English)

### 2.2 Content Quality & Differentiation
- **Word count**: No thin pages (<1,000 chars rendered text)
- **First-person narratives**: No templated/doorway intro patterns; each location page has distinct local knowledge
- **Blog depth**: Minimum 200 words (enforced by sitemap generator), target 1,500+ for pillar posts
- **Keyword cannibalization**: No two pages targeting same primary keyword
- **E-E-A-T signals**: Author bio (Hari Kotian), IRDAI reg #, experience years, case studies with specifics

### 2.3 Core Web Vitals Proxy (Static Build)
- **LCP**: Above-fold images eager-loaded, hero images WebP/AVIF, <200KB each
- **CLS**: Explicit width/height on all images, no layout shift on font load
- **INP**: Minimal JS (Astro islands only), no blocking scripts
- **Bundle size**: Total JS <500KB gzipped across all routes

### 2.4 Site Architecture & IA
- **URL structure**: Clean, hierarchical, keyword-rich (`/locations/bangalore-koramangala`, `/services/claim-support`)
- **Internal linking**: Every page reachable within 3 clicks from home; hub pages link to spokes
- **Navigation**: Global header/footer on ALL pages (BaseLayout enforcement)
- **Pagination**: blog index paginated, no infinite scroll
- **Search**: Pagefind client-side search functional

### 2.5 Conversion & UX
- **CTAs**: WhatsApp + Call buttons above fold on every commercial page
- **Contact forms**: Lead magnets gated, thank-you tracking
- **Trust signals**: IRDAI badge, Google Business link, client testimonials, case studies
- **Mobile usability**: Tap targets ≥48px, no horizontal scroll, readable font sizes

### 2.6 Backlink Profile & Authority
- **Referring domains**: Quality > quantity; disavow toxic directories
- **Anchor diversity**: Branded + topical + URL anchors, no exact-match over-optimization
- **Link velocity**: Natural acquisition pattern, no spikes
- **Competitor gap**: Identify referring domains rivals have that we don't

### 2.7 Analytics & Measurement
- **GA4**: Enhanced measurement, scroll depth, video plays, file downloads
- **GSC**: Sitemaps submitted, indexation monitored, manual actions check
- **Bing WMT**: Verified, sitemaps submitted, IndexNow functional
- **Heatmaps**: Clarity/Microsoft Clarity or Hotjar (if configured)

### 2.8 Security & Compliance
- **HTTPS**: HSTS, CSP headers via Cloudflare
- **Forms**: CSRF protection, honeypot, rate limiting
- **Privacy policy**: GDPR/India DPDP compliant, cookie consent if needed
- **No mixed content**: All resources HTTPS

### 2.9 Internationalization & Accessibility
- **WCAG 2.1 AA**: Color contrast, alt text, heading hierarchy, focus states, ARIA labels
- **Language**: `lang="en-IN"` on html tag
- **Currency**: INR (₹) formatting consistent

### 2.10 Competitive Benchmarking
- **Primary rivals**: Ditto, Beshak (advisory/content), ClaimDekho, Insurance Samadhan (claim recovery)
- **Gap analysis**: Content topics they cover that we don't; backlinks they have we don't; CWV scores

---

## 3. Out of Scope
- Server log analysis (no access)
- Real-user RUM data (no budget)
- Paid tool crawls (Ahrefs/Semrush — use free/Bing/GSC only)
- A/B testing
- Content creation (audit only)

---

## 4. User Stories

- **As Hari Kotian**, I want to know exactly which pages Google considers "low quality" so I can fix or remove them before they drag down the whole domain.
- **As a marketer**, I want a scored report card (0-100 per dimension) so I can prioritize fixes by ROI.
- **As a developer**, I want a machine-readable findings file (JSON) with file paths and line numbers so I can batch-fix structural issues.

---

## 5. Functional Requirements

### FR-1: Multi-source data collection
The audit MUST collect from: local `dist/` build, `src/` source files, `blogs.json`, `cities.json`, `public/_redirects`, `robots.txt`, GSC screenshots (provided), Bing WMT screenshots (provided), competitor research (web search).

### FR-2: Per-page scoring
Every one of the 243 built HTML pages MUST receive a JSON object with:
```json
{
  "url": "https://insurancesupport.online/locations/bangalore-koramangala",
  "source_file": "src/pages/locations/[slug].astro",
  "scores": {
    "technical_seo": 92,
    "content_quality": 88,
    "cwv_proxy": 95,
    "conversion_ux": 90,
    "a11y": 85
  },
  "issues": [
    {"severity": "high", "type": "missing_schema", "detail": "LocalBusiness schema missing 'areaServed'"}
  ],
  "passes": ["title_present", "meta_desc_unique", "canonical_correct", "breadcrumb_schema"]
}
```

### FR-3: Dimension roll-up scores
Produce aggregate scores (0-100) for each of the 10 dimensions with percentile vs. theoretical max.

### FR-4: Prioritized action list
Output a ranked task list (Critical/High/Medium/Low) with:
- Estimated effort (S/M/L/XL)
- Expected impact (traffic/conversion/authority)
- File paths to edit
- Acceptance criteria

### FR-5: Competitive gap matrix
Table comparing insurancesupport.online vs top 3 rivals on: indexed pages, referring domains, top 10 keywords, CWV, content depth.

---

## 6. Non-Functional Requirements

- **Runtime**: Complete in <5 minutes for 243-page site
- **Zero mutations**: Read-only analysis; no changes to codebase
- **Reproducible**: Same inputs → same outputs
- **Traceable**: Every finding references exact file/line or screenshot
- **Format**: Primary output as `audit-report.json` + human-readable `audit-report.md`

---

## 7. Acceptance Criteria

- [ ] All 10 dimensions scored with evidence
- [ ] 243 per-page score objects in JSON
- [ ] Top 20 priority tasks with file paths
- [ ] Competitive gap matrix populated
- [ ] No hallucinated data — every claim traceable to source

---

## 8. Open Questions

1. **Live vs local crawl**: Primary audit uses local `dist/` for speed; live spot-check of 20 URLs for headers/status. **Decision**: Local primary, live spot-check.
2. **GSC data access**: Screenshots provided; no API access. **Decision**: Use screenshot data as ground truth for indexation.
3. **Competitor CWV**: No access to their CrUX data. **Decision**: Use PageSpeed Insights API for top 5 URLs each (free tier).

---

## 9. Appendix — Known Baseline (from prior work)

- 243 HTML pages in `dist/`
- 60 blog posts (pruned from 102)
- 46 city pages across 17 states
- 14 service pages
- Sitemaps: 16 sub-sitemaps + index = ~435 unique URLs
- Disavow: 5 toxic domains submitted
- Moltbook cron: diversified backlinks every 15 min
- IndexNow: 403 on Bing (site verified, API transition)
- Build size: 30.8 MB (16.5 MB images, 738 KB JS, 150 KB CSS)
- Structured data: 100% pages have JSON-LD; LocalBusiness on 130, FAQPage on 80, Article on 70