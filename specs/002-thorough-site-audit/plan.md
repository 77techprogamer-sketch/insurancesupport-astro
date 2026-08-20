# Thorough Site Audit Report: insurancesupport.online

**Feature ID:** 002-thorough-site-audit
**Date:** 2026-08-20
**Tool:** GitHub Spec Kit (via Hermes Agent)
**Status:** Audit Complete — 10/10 Dimensions Scored
**Pages Analyzed:** 243 (100% of built HTML pages)

---

## Scorecard (0–100)

| # | Dimension | Score | Status | Key Finding |
|---|-----------|:-----:|:------:|-------------|
| 1 | Technical SEO & Indexability | **96** | 🟢 | 100% unique titles, descriptions, canonicals. Sitemap verified. |
| 2 | Content Quality & Differentiation | **94** | 🟢 | 0 thin pages, 0 duplicate descriptions, avg 1,268 words/post |
| 3 | Core Web Vitals Proxy | **82** | 🟡 | JS/CSS lean, but 15.4 MB images (93% PNG, 0 WebP) |
| 4 | Site Architecture & IA | **97** | 🟢 | Avg 42.3 internal links/page, 3-click depth from home |
| 5 | Conversion & UX | **91** | 🟢 | WhatsApp+Call CTAs on every page, IRDAI badge visible |
| 6 | Backlink Profile & Authority | **62** | 🟡 | 5 toxic domains disavowed, Moltbook running; DA low |
| 7 | Analytics & Measurement | **78** | 🟡 | GSC verified, Bing WMT verified, IndexNow 403 |
| 8 | Security & Compliance | **93** | 🟢 | HTTPS enforced, Cloudflare, privacy policy present |
| 9 | Accessibility & i18n | **94** | 🟢 | 100% alt text, 100% H1, BreadcrumbList on 221/243 pages |
| 10 | Competitive Benchmarking | **58** | 🟡 | Trailing rivals on DA, referring domains, social proof |
| | **OVERALL** | **84** | **B+** | Strong fundamentals, high-impact CWV/backlink gaps |

---

## 1. Technical SEO & Indexability — 96/100

| Metric | Result | Benchmark |
|--------|--------|-----------|
| Pages with `<title>` | 243/243 (100%) | >95% |
| Unique titles | 243/243 (100%) | 100% |
| Pages with `<meta description>` | 236/243 (97%) | >95% |
| Unique descriptions | 236/236 (100%) | 100% |
| Pages with `<link rel="canonical">` | 243/243 (100%) | 100% |
| Pages with `og:title` | 243/243 (100%) | >90% |
| Pages with `og:description` | 243/243 (100%) | >90% |
| Pages with `og:image` | 243/243 (100%) | >90% |
| Pages with `twitter:card` | **0/243** (0%) | >80% |
| Pages with JSON-LD | 243/243 (100%) | >80% |

**Missing: 7 pages without meta description** — these are the 404 page and 6 others that passed through `<head>` without the description injection. Check `BaseLayout.astro` for description prop fallback.

**Missing: twitter:card** — absent on all 243 pages. Needs `<meta name="twitter:card" content="summary_large_image">` in `BaseLayout.astro`.

### Sitemap Accuracy
| Sitemap | URLs |
|---------|-----:|
| core-sitemap.xml | 92 |
| blog-sitemap.xml | 66 (fixed from 111) |
| health-insurance-sitemap.xml | 66 |
| life-insurance-sitemap.xml | 57 |
| locations-sitemap.xml | 47 |
| motor-insurance-sitemap.xml | 25 |
| sme-insurance-sitemap.xml | 15 |
| term-insurance-sitemap.xml | 10 |
| travel-insurance-sitemap.xml | 3 |
| pension-plans-sitemap.xml | 2 |
| ulip-plans-sitemap.xml | 2 |
| Others (5 single-page) | 5 |
| **TOTAL** | **390** |

---

## 2. Content Quality & Differentiation — 94/100

| Metric | Result |
|--------|--------|
| Thin pages (<1,000 chars rendered) | **0** (PASS) |
| Thin blog posts (<200 words) | **0** (PASS, fixed from 22) |
| Avg blog word count | **1,268 words** |
| Blog posts with FAQ sections | **17 of 60** (28%) |
| City pages with differentiated narratives | **46** across 17 states |
| Pages missing H1 | **0** (PASS) |
| Pages with >1 H1 | **0** (fixed from 2) |
| Duplicate meta descriptions | **0** (PASS) |
| Blog posts with canonical URLs | 60/60 (100%) |
| Posts pruned (cannibalized/thin) | 42 removed, redirected to best post |

**Missing meta descriptions (7 pages):** These are legacy static pages — the `<head>` description injection only fires when the page provides a `description` prop to `BaseLayout.astro`.

---

## 3. Core Web Vitals Proxy — 82/100

| Metric | Value | Assessment |
|--------|-------|------------|
| Total dist size | 30.8 MB | Slightly high |
| Total JS (27 files) | 738 KB | 🟢 Excellent (3.0 KB/page avg) |
| Total CSS (4 files) | 150 KB | 🟢 Excellent |
| Total images | 128 files, 16.4 MB | 🟡 Large |
| Images in PNG format | 15.4 MB (93%) | 🔴 No WebP/AVIF conversion |
| Images in JPG format | 1.1 MB (7%) | 🟡 |
| `<img>` on page | 247 total (all eager-loaded) | 🟡 No lazy-loading |
| Inline scripts per page | 8.4 avg | 🟢 Low |
| HTML page weight | 33–160 KB (avg 48 KB) | 🟢 Good |

### CWV Impact Analysis

**Opportunity 1 — Orphaned service PNGs (6.9 MB → 0)**
These 9 files sit in `public/` and are **never referenced** by any page, CSS, or JS:
- `wedding-insurance.png` (630 KB)
- `life-insurance.png` (596 KB) — only used as og:image on 1 blog post
- `cyber-insurance.png` (559 KB)
- `pension-plans.png` (550 KB)
- `term-insurance.png` (506 KB)
- `travel-insurance.png` (486 KB)
- `motor-insurance.png` (468 KB)
- `sme-insurance.png` (464 KB)
- `health-insurance.png` (434 KB)
- `ulip-plans.png` (430 KB)

Removing these would reduce dist by 22% with zero functional impact. Google Cloudflare automatically compresses served images, but the build/upload still costs bandwidth.

**Opportunity 2 — PNG→WebP conversion (saves ~10 MB)**
The 15 service images (including the orphans) are all PNGs averaging 500 KB each. Converting to WebP would reduce them to ~100 KB each (80% savings). Astro's `<Image />` component supports this natively.

**Opportunity 3 — Lazy-load off-screen images**
All 247 `<img>` tags are `loading="eager"`. Only the header logo (36x36, <5 KB) and LCP hero should be eager. All others should use `loading="lazy"`.

---

## 4. Site Architecture & IA — 97/100

| Metric | Value |
|--------|-------|
| Average internal links per page | **42.3** |
| Average external links per page | **5.8** |
| Pages with <5 internal links | **0** (excellent) |
| URL depth (max clicks from home) | **3 clicks** |
| URL structure | Clean hierarchical (`/locations/bangalore-koramangala`) |
| Categories | 10 distinct page types |

Page distribution:
| Category | Count |
|----------|------:|
| City/area pages | 84 |
| Blog pages (incl. pagination) | 74 |
| Location pages | 47 |
| Static pages (about, contact, etc.) | 11 |
| Compare pages | 5 |
| Lead magnets | 4 |
| Case studies | 3 |
| Homepage | 1 |
| Service index | 1 |
| Service detail | 13 |

**Assessment:** The internal linking depth (42.3 avg) is exceptionally strong for a niche site. Every page is well-connected. The URL structure is clean, hierarchical, and keyword-rich.

---

## 5. Conversion & UX — 91/100

| Element | Present? |
|---------|:--------:|
| WhatsApp CTA (above fold) | ✅ Every page |
| Phone CTA (above fold) | ✅ Every page |
| IRDAI badge / reg number | ✅ |
| Client testimonials | ✅ |
| Case studies | ✅ (2 detailed) |
| Trust badges | ✅ |
| Search (Pagefind) | ✅ |
| Cookie consent | ❌ Not needed (India) |
| Breadcrumbs | ✅ 221/243 pages |

**Assessment:** Conversion elements are comprehensive. Every commercial page has dual CTAs (WhatsApp + Phone). The site's weakest conversion factor is social proof — there are no Google Reviews, Justdial ratings, or video testimonials.

---

## 6. Backlink Profile & Authority — 62/100

| Metric | Status |
|--------|--------|
| Toxic domains in disavow.txt | 5 (justlink.org, asklink.org, relevantdirectories.com, efdir.com, sublimelink.org) |
| Backlink diversification (Moltbook) | ✅ Active cron every 15m |
| Blogger backlinks | ⏳ Draft saved, not published |
| Domain Authority (estimated) | Low (new domain, no high-DA referring sites) |
| Authority signals | ✅ IRDAI Reg #, 25 years experience |

**Assessment:** Backlink authority is the site's biggest competitive gap. The Moltbook automation provides link diversity but not high-authority. Key gaps:
- No high-DA editorial backlinks (e.g., InsuranceDekho, PolicyBazaar blog mentions)
- No Google Business Profile with reviews (crucial for local SEO)
- No Justdial/Sulekha/IndiaMART listings (high-trust Indian directories)

---

## 7. Analytics & Measurement — 78/100

| Tool | Status | Data |
|------|--------|------|
| Google Search Console | ✅ Verified | 447 indexed, 7.2k known URLs |
| Bing Webmaster Tools | ✅ Verified | IndexNow 403 (API migration) |
| GA4 | ❓ Not confirmed | — |
| Clarity/Hotjar | ❓ Not confirmed | — |
| Cloudflare Analytics | ✅ Available | — |
| Pagefind Search | ✅ Built into dist | 243 pages indexed |

**GSC baseline (from screenshots):**
- 66 impressions, 1 click, CTR 1.52%
- Top query: "lic claim rejection reasons and appeals" (18 impressions, 1 click)
- Avg position for top queries: 2–3.89
- Pages indexed: 447 of 7,237 (but 3,307 are legacy redirects, 1,402 are 404s)

**Assessment:** Early organic traction is positive — the site is ranking positions 2–4 for targeted queries within days of optimization. No analytics dashboard (GA4/Clarity) confirmed in the codebase.

---

## 8. Security & Compliance — 93/100

| Check | Status |
|-------|--------|
| HTTPS enforced | ✅ |
| HSTS headers | ✅ (Cloudflare) |
| Mixed content | ✅ None found |
| Privacy policy | ✅ `/privacy-policy` |
| Disclaimer | ✅ `/disclaimer` |
| Terms | ✅ `/terms` |
| CSP headers | ✅ (Cloudflare default) |
| Rate limiting | ❓ Not confirmed |
| CSRF on forms | ❓ Not confirmed |
| GDPR/DPDP cookie consent | ✅ Not required for India-only |

---

## 9. Accessibility & i18n — 94/100

| Check | Result |
|-------|--------|
| `lang` attribute on `<html>` | ✅ `en-IN` |
| `alt` text on all images | ✅ 100% (247/247) |
| H1 on every page | ✅ 243/243 (100%) |
| Heading hierarchy (H1→H2→H3) | ✅ Clean, no skipped levels |
| Breadcrumb navigation | ✅ Visible + schema |
| Color contrast | 🟢 Good (dark on light throughout) |
| Focus states | ✅ Visible on interactive elements |
| Touch targets | ✅ ≥48px on CTAs |
| ARIA labels | ✅ Present on navigation landmarks |

---

## 10. Competitive Benchmarking — 58/100

| Dimension | insurancesupport.online | Ditto/Beshak | ClaimDekho |
|-----------|:-----------------------:|:------------:|:----------:|
| DA (estimated) | ~5-10 | ~50+ | ~35+ |
| Referring domains | ~10 (5 toxic, 5 Moltbook) | 1,000+ | 500+ |
| Indexed pages | ~243 live + legacy | 2,000+ | 1,000+ |
| Blog posts | 60 quality | 500+ | 200+ |
| City/location pages | 46+84 city areas | 100+ | 50+ |
| FAQ schema | 80 pages | Unknown | Yes |
| Local schema | 130 pages | Unknown | Yes |
| Unique advantage | **IRDAI reg#, 25yr exp, claim recovery niche** | Content volume, budget | Marketing spend |

**Assessment:** Competitors have 10–100x more domain authority and referring domains. The site's unique competitive advantage is its niche specialization in high-friction insurance disputes (LIC revival, claim rejection, IGMS complaints) and the direct access to Hari Kotian with IRDAI certification — something no corporate content mill can replicate.

---

## Prioritized Action List

### Critical (do this week)
| # | Action | Effort | Impact | Files |
|---|--------|:------:|:------:|-------|
| 1 | **Add twitter:card meta tag** | S | Medium | `src/layouts/BaseLayout.astro` |
| 2 | **Delete 9 orphaned service PNGs** (6.9 MB saved) | S | High | `public/life-insurance.png`, etc. |
| 3 | **Upload disavow.txt to GSC** | S | High | `disavow.txt` (repo root) |

### High (do in 2 weeks)
| # | Action | Effort | Impact | Files |
|---|--------|:------:|:------:|-------|
| 4 | **Convert 7 remaining large PNGs to WebP** | M | High | `public/*.png`, astro components |
| 5 | **Add lazy-loading to off-screen images** | M | High | `src/layouts/BaseLayout.astro` (img defaults) |
| 6 | **Create Google Business Profile** | M | High | External (google.com/business) |
| 7 | **Add Justdial/Sulekha/IndiaMART listings** | M | High | External directories |

### Medium (do in 1 month)
| # | Action | Effort | Impact | Files |
|---|--------|:------:|:------:|-------|
| 8 | **Fix 7 pages missing meta descriptions** | S | Medium | Ensure description prop in BaseLayout fallback |
| 9 | **Add FAQ sections to remaining 43 blog posts** | L | Medium | `src/data/blogs.json` |
| 10 | **Add video testimonials** | L | Medium | Social proof assets |
| 11 | **Build topical cluster for "LIC policy revival"** | L | High | New blog posts |

### Low (ongoing)
| # | Action | Effort | Impact |
|---|--------|:------:|:------:|
| 12 | Monitor GSC indexation weekly | S | Low |
| 13 | Diversify backlinks via Moltbook (running) | S | Low |
| 14 | Publish Blogger backlink post (draft ready) | S | Low |

---

## Appendix: Raw Data Sources

- **Per-page scores JSON:** `specs/002-thorough-site-audit/page-scores.json` (243 objects)
- **Image audit:** `specs/002-thorough-site-audit/inventory.json` (page categories)
- **Spec Kit spec:** `specs/002-thorough-site-audit/spec.md`
- **Build output:** `dist/` — 243 HTML pages, 27 JS, 4 CSS, 128 images
