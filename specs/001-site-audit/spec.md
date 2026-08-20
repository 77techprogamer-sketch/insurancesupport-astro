# Feature Specification: Site Audit for insurancesupport.online

**Feature ID:** 001-site-audit
**Date:** 2026-08-20
**Author:** Hermes Agent (automated via Spec Kit)
**Status:** Draft

---

## 1. Purpose & Background

We need to perform a comprehensive site audit of `insurancesupport.online` — an Astro static site hosted on Cloudflare Pages — to identify SEO, performance, content quality, and indexing issues. This audit establishes the baseline before any future changes are made.

The site is a niche insurance advisory portal targeting Indian policyholders (Bangalore/Koramangala HQ), led by Hari Kotian (IRDAI Reg 0149161D), focused on:
- Insurance claim rejection appeals
- LIC policy revival after lapse
- Cashless hospitalization disputes
- Pre-existing disease (PED) coverage clarification
- Ombudsman / IRDAI IGMS complaint filing

## 2. In Scope

Audit dimensions to cover:

1. **SEO baseline**
   - Sitemap coverage (pages, sitemaps, URLs)
   - Meta tags (titles, descriptions, OpenGraph, canonical)
   - Heading structure (H1 per page, H2/H3 nesting)
   - Internal linking depth (orphan pages, click depth)
   - Schema.org structured data (LocalBusiness, FAQPage, Article, BreadcrumbList)

2. **Indexing health**
   - Page-level renderability (no JS-only routes)
   - Status codes (404s, 500s, soft-404 patterns)
   - Canonical correctness
   - Robots.txt coverage
   - Crawl-budget blockers

3. **Content quality**
   - Word count per page (thin content detection)
   - Duplicate content / keyword cannibalization
   - First-person vs templated narratives
   - City/region page differentiation

4. **Core Web Vitals proxy**
   - Image formats & lazy/eager loading
   - Critical CSS / hydration model
   - JS bundle size
   - Font loading strategy

5. **Backlink profile**
   - Referring domains count and quality
   - Anchor text distribution
   - Disavow candidates

## 3. Out of Scope

- Live crawl with rendered JS (we will inspect source code)
- Server-side log analysis
- Real-user performance metrics (we have no production telemetry)
- Bing Webmaster Tools indexing state (requires login)
- Domain registration / DNS analysis

## 4. User Stories

- **As a site owner**, I want to know exactly which pages have indexation issues so I can fix them before Google applies further ranking penalties.
- **As a marketer**, I want a baseline scorecard (CWV proxy, content quality, backlinks) so future changes can be measured against it.
- **As a developer**, I want a list of structural issues (duplicate content, broken internal links, missing alt text) so I can fix them in batches.

## 5. Functional Requirements

### FR-1: Sitemap inventory
The audit MUST produce a list of all sitemap files, their URL counts, and any URLs in sitemap that fail to render as expected (404, soft-404, low word count).

### FR-2: Page-level content scan
The audit MUST report per-page:
- Title, meta description, canonical URL
- Word count (from rendered HTML or source markdown)
- H1 count (must be exactly 1 per page)
- Internal link count (inbound + outbound)
- Schema.org JSON-LD presence

### FR-3: Indexability blockers
The audit MUST flag any pages with:
- `noindex` meta tag
- Blocked by robots.txt
- Missing canonical
- Soft-404 patterns (low word count + status 200)

### FR-4: Performance proxy
The audit MUST report:
- Total dist/ build size
- Number of JS chunks > 50KB
- Image format usage (PNG vs WebP vs AVIF)
- Lazy vs eager loading directives on above-fold images

### FR-5: Backlink profile review
The audit MUST inspect any backlink data files available in the repo (disavow.txt, search console exports) and summarize the toxic vs legitimate profile.

## 6. Non-Functional Requirements

- The audit MUST complete in under 5 minutes for a 500-page site.
- All findings MUST include absolute file paths and page URLs so the user can navigate to the issue.
- The audit MUST distinguish between *definite* issues (verified in code/data) and *probable* issues (heuristic-only).
- The audit MUST NOT make any changes to the codebase — read-only analysis.

## 7. Acceptance Criteria

A complete audit delivers:
- [ ] Sitemap inventory table
- [ ] Page-level scan CSV or markdown table
- [ ] List of indexability blockers (file paths + URLs)
- [ ] Performance proxy metrics
- [ ] Backlink profile summary
- [ ] Prioritized action list (Critical / High / Medium / Low)

## 8. Open Questions

- Should we audit against the live deployed site or the local `dist/` build?
  - **Decision:** Both — local for source-level issues, live for headers/robots/status codes.
- Do we count redirect URLs as "indexed" or treat them as "resolved"?
  - **Decision:** Treat redirects as resolved; report redirect count separately.
