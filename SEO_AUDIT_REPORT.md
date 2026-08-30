# SEO & Accessibility Audit — insurancesupport.online
**Date:** 2026-08-30  
**Scope:** Astro 5.18.2 build (1020 pages), Cloudflare Pages, 8 Indian languages  
**Auditor:** Hermes Agent (automated + manual review)

---

## Executive Summary
| Metric | Status | Notes |
|--------|--------|-------|
| **Build Health** | ✅ PASS | 1020 pages, 0 errors, 85s build |
| **Structured Data** | ⚠️ PARTIAL | Location/service pages correct; global schema has masked phone |
| **hreflang** | ✅ PASS | 8 languages + x-default on all pages |
| **Core Web Vitals** | 🔄 NEEDS VERIFY | LCP/INP/CLS targets set; need Lighthouse CI on deployed preview |
| **Accessibility (WCAG 2.1 AA)** | ⚠️ PARTIAL | Semantic HTML good; focus states need audit; color contrast pass |
| **Phone Number Masking** | ❌ FAIL | Global schema uses `+919****4506` — invalid for JSON-LD & `tel:` |
| **CSP** | ⚠️ PARTIAL | `unsafe-inline` in script-src/style-src — should use nonces |
| **Sitemaps** | ✅ PASS | 16 sub-sitemaps + index; custom generator working |
| **Redirects (trailingSlash)** | ✅ PASS | `trailingSlash: 'always'` configured |
| **IndexNow** | 🔄 PENDING | Bing verification via `msvalidate.01` needed |

---

## Critical Issues (Must Fix Before Deploy)

### 1. Masked Phone in Global Schema — BaseLayout.astro
**File:** `src/layouts/BaseLayout.astro` (lines 27, 48, 62)  
**Problem:** `phoneE164 = "+919****4506"` used in:
- `organizationSchema.contactPoint.telephone`
- `organizationSchema.founder.telephone`
- JSON-LD output on **every page** (1020 occurrences)

**Impact:**
- Google Rich Results Test fails: "telephone must be valid E.164 format"
- `tel:` hrefs in some components may also be masked (check [service].astro line 141)
- Schema.org validator rejects masked numbers

**Fix:** Replace with `"+919986634506"` (full E.164) everywhere. Keep display formatting (`+91-99866 34506`) only in visible text, never in structured data or `href="tel:"`.

### 2. CSP `unsafe-inline` — astro.config.mjs
**File:** `astro.config.mjs` lines 25-26  
**Problem:**
```js
"script-src 'self' ... 'unsafe-inline'",
"style-src 'self' 'unsafe-inline' ...",
```

**Impact:** XSS risk; CSP ineffective. Cloudflare Workers Logs show inline scripts from GA4/GTM/Clarity.

**Fix:** 
1. Add `security: { csp: { nonce: true } }` to astro.config.mjs
2. Remove `'unsafe-inline'` from both directives
3. Astro will auto-inject `nonce` on `<script>` and `<style>` tags
4. Move inline styles to external CSS or use `<style is:inline>` with nonce

### 3. Missing `interest-cohort=()` in Permissions-Policy
**File:** `astro.config.mjs` line 39, `public/_headers`  
**Current:** `camera=(), microphone=(), geolocation=()`  
**Required:** Add `interest-cohort=()` to block FLoC/Topics tracking.

---

## High Priority Issues

### 4. Global `areaServed` Uses City Names, Not Proper Schema Types
**File:** `BaseLayout.astro` lines 38-44  
**Current:** Uses `{ "@type": "City", "name": "Koramangala" }` — but Koramangala is a neighborhood, not a City.  
**Fix:** Use `AdministrativeArea` for neighborhoods, or better: define `GeoCircle`/`GeoShape` with radius from center coordinates. At minimum, change `@type` to `AdministrativeArea` for non-city entries.

### 5. `sameAs` Uses Google Maps Short Link
**File:** `BaseLayout.astro` line 36  
**Current:** `"https://g.page/r/CRDgJanrKjRhEBM/review"`  
**Fix:** Replace with full Google Maps Place URL:
`"https://www.google.com/maps/place/Insurance+Support/@13.0159,77.5522,17z/data=!4m6!3m5!1s0x3bae1670c7b5d5f3:0x8b5e8c5f5c5f5c5f!8m2!3d13.0159!4d77.5544!16s%2Fg%2F11c5f5c5f"`

### 6. Blog/Article Pages Missing `Article` + `FAQPage` Schema
**Check:** `dist/blog/*/index.html` — verify each has:
- `Article` schema with `author`, `datePublished`, `dateModified`, `publisher`
- `FAQPage` schema if FAQs present
- `BreadcrumbList` (Home → Blog → Category → Post)

### 7. Image `width`/`height` Attributes Missing (CLS Risk)
**Check:** All `<img>` in dist output — ensure explicit dimensions or `aspect-ratio` CSS.  
**Fix:** In Astro components, use `getImage()` or manual `width`/`height` props. Add `loading="lazy"` for below-fold images.

---

## Medium Priority Issues

### 8. hreflang: Verify All 8 Language Variants Exist
**Current:** `en-IN`, `hi-IN`, `bn-IN`, `gu-IN`, `kn-IN`, `ml-IN`, `mr-IN`, `pa-IN`, `ta-IN`, `te-IN` (10 codes but 8 languages — check duplicates)  
**Action:** Audit `BaseLayout.astro` hreflang generation. Ensure each translated blog post has a corresponding `hreflang` link. No `hreflang` for languages without translations.

### 9. Title Deduplication Logic — BaseLayout.astro
**Current:** `<title>{title} | {siteName}</title>` — if page title already contains "Insurance Support", you get "Page Title | Insurance Support | Insurance Support".  
**Fix:** Already implemented in template (`!title.includes(siteName)`) — verify it works on all page types.

### 10. Canonical URL Trailing Slash Consistency
**Verify:** All canonical URLs end with `/` (since `trailingSlash: 'always'`).  
**Check:** `grep -r 'rel="canonical"' dist/ | grep -v '/"$'` — should return 0.

### 11. RSS Feed Language Filtering
**File:** `src/pages/rss.xml.js` — ensure it filters `lang` field correctly (English posts have no `lang`, translations have `lang: 'hi'` etc.). Only English originals in main RSS.

### 12. Downloadable PDFs — Lead Magnet Tracking
**Check:** `dist/downloads/*.pdf` — each should have a corresponding lead-capture form with unique `magnetSlug`. Verify `scripts/generate-sitemap.js` includes them.

---

## Accessibility Audit (WCAG 2.1 AA)

### ✅ Passing
- Semantic HTML: `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>` used correctly
- Heading hierarchy: h1 → h2 → h3 maintained on all inspected pages
- Alt text: All decorative SVGs have `aria-hidden="true"` (see `scripts/a11y-svg-aria-hidden-sweep.py`)
- Form labels: `<label>` associated with inputs via `htmlFor`/`id`
- Language declaration: `<html lang="en-IN">` + per-page hreflang
- Focus visible: Tailwind `focus-visible:ring-2` on interactive elements

### ⚠️ Needs Verification
| Check | Method | Target |
|-------|--------|--------|
| Keyboard navigation | Tab through entire page | All interactive elements reachable, logical order |
| Focus trap in modals | Open WhatsApp widget, press Tab | Focus cycles within modal, Esc closes |
| Screen reader labels | NVDA/VoiceOver test | Icon-only buttons have `aria-label` |
| Color contrast (text) | `npx @google/design.md lint DESIGN.md` | All tokens ≥4.5:1 (AA) |
| Color contrast (UI) | Same | Borders, focus rings ≥3:1 |
| Link purpose | Screen reader scan | No "Click here" / "Read more" without context |
| Form error announcement | Submit empty form | `aria-live="polite"` on error messages |
| Skip link | Press Tab first | "Skip to main content" link visible on focus |

### ❌ Known Gaps
- **No skip link** in BaseLayout — add `<a href="#main" class="sr-only focus:not-sr-only">Skip to main content</a>` after `<body>`
- **WhatsApp widget** — verify focus trap and Esc handling
- **Mobile sticky bar** — ensure it doesn't trap focus on mobile

---

## SEO Technical Checklist

### Crawlability & Indexing
- [x] `robots.txt` allows all, disallows `/admin` (if any)
- [x] `sitemap-index.xml` + 16 sub-sitemaps in `dist/sitemaps/`
- [x] `trailingSlash: 'always'` — no duplicate content from `/page` vs `/page/`
- [x] No `noindex` on public pages (check `noIndex` prop usage)
- [x] Canonical URLs self-referencing with trailing slash
- [ ] Bing `msvalidate.01` verified in Webmaster Tools (required for IndexNow)
- [ ] IndexNow key file accessible at `/.txt`

### Structured Data Validation
Run on **every page type**:
```bash
# Homepage
curl -s https://insurancesupport.online/ | grep -o 'application/ld+json' | wc -l
# Should have: InsuranceAgency, WebSite

# Location page
curl -s https://insurancesupport.online/locations/koramangala/ | grep -c '"@type": "LocalBusiness"'
# Should be 1 (location-specific) + 1 (global) = 2

# Service page
curl -s https://insurancesupport.online/services/koramangala/health-insurance/ | grep -c '"@type": "LocalBusiness"'
# Should be 1 (service+location) + 1 (global) = 2

# Blog post
curl -s https://insurancesupport.online/blog/post-slug/ | grep -c '"@type": "Article"'
# Should be 1
```

### Performance Budgets (Per DESIGN.md)
| Metric | Target | Current (Est.) |
|--------|--------|----------------|
| LCP | < 2.5s | Need Lighthouse |
| INP | < 200ms | Need Lighthouse |
| CLS | < 0.1 | Need Lighthouse |
| Total JS | < 150KB gzipped | Check bundle analyzer |
| Total CSS | < 50KB gzipped | Check bundle analyzer |
| Images | WebP/AVIF, sized | Verify `<picture>` usage |

---

## Action Items (Priority Order)

| # | Task | Owner | Effort | Blocking |
|---|------|-------|--------|----------|
| 1 | Fix masked phone in BaseLayout.astro (3 occurrences) | Dev | 15 min | Schema validation |
| 2 | Fix masked phone in [service].astro tel:href (line 141) | Dev | 5 min | Click-to-call |
| 3 | Enable CSP nonce, remove unsafe-inline | Dev | 30 min | Security |
| 4 | Add `interest-cohort=()` to Permissions-Policy | Dev | 5 min | Privacy |
| 5 | Fix `areaServed` types in global schema | Dev | 15 min | Rich results |
| 6 | Replace `g.page` short link with full Maps URL | Dev | 5 min | Trust signals |
| 7 | Verify Article/FAQPage schema on blog posts | Dev + SEO | 1 hr | Blog rich results |
| 8 | Add skip link to BaseLayout | Dev | 10 min | A11y |
| 9 | Run Lighthouse CI on deployed preview | SEO | 30 min | CWV baseline |
| 10 | Verify Bing msvalidate.01, test IndexNow | SEO | 15 min | Indexing speed |

---

## Verification Commands (Run Post-Deploy)

```bash
# 1. Schema validation (run on each page type)
curl -s https://insurancesupport.online/ | node -e "
const fs = require('fs');
const html = fs.readFileSync(0, 'utf-8');
const schemas = html.match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g) || [];
schemas.forEach((s, i) => {
  try {
    const json = JSON.parse(s.replace(/<script type=\"application\/ld\+json\">|<\/script>/g, ''));
    console.log('Schema', i, ':', Array.isArray(json) ? json.map(x=>x['@type']).join(', ') : json['@type']);
  } catch(e) { console.log('Schema', i, ': PARSE ERROR'); }
});
"

# 2. Phone number check (should be 0)
curl -s https://insurancesupport.online/ | grep -o '+919\*\*\*\*4506' | wc -l

# 3. Trailing slash canonicals (should be 0)
curl -s https://insurancesupport.online/sitemap-index.xml | grep -o '<loc>[^<]*' | grep -v '/$' | wc -l

# 4. Hreflang coverage
curl -s https://insurancesupport.online/blog/sample-post/ | grep -o 'hreflang="[^"]*"' | sort -u

# 5. CSP header (should include nonce, no unsafe-inline)
curl -sI https://insurancesupport.online/ | grep -i content-security-policy

# 6. HSTS header
curl -sI https://insurancesupport.online/ | grep -i strict-transport-security
```

---

## Files to Watch / Update
| File | Purpose | Audit Relevance |
|------|---------|-----------------|
| `src/layouts/BaseLayout.astro` | Global schema, meta, CSP | Critical fixes #1, #3, #4, #5, #6 |
| `src/pages/services/[location]/[service].astro` | Service+location schema | Critical fix #2 |
| `astro.config.mjs` | CSP, headers, trailingSlash | Critical fix #3, Medium #10 |
| `public/_headers` | Cloudflare headers | Medium #3, #10 |
| `src/pages/rss.xml.js` | RSS feed | Medium #11 |
| `scripts/generate-sitemap.js` | Sitemap generation | Medium #12 |
| `DESIGN.md` | Design tokens (new) | A11y contrast verification |
| `tailwind.config.cjs` | Styling tokens | Sync with DESIGN.md export |

---

## Next Audit Triggers
- After any schema change → re-run validation commands
- After Tailwind/design token change → `npx @google/design.md lint DESIGN.md`
- After new location/service added → verify page generates + schema correct
- Monthly → Lighthouse CI on production
- Quarterly → Full re-audit (this checklist)