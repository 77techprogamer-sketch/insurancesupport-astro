# Comprehensive Site Traffic Analysis Report
## insurancesupport.online — Why You're Not Getting Search Engine Traffic

**Date:** October 11, 2026  
**Site:** https://insurancesupport.online  
**Business:** Insurance advisory and claim support in Bengaluru  
**Owner:** Hari Kotian (IRDAI Reg: 0149161D)

---

## EXECUTIVE SUMMARY

Your site is **technically well-built** but faces multiple critical issues preventing search engine traffic:

| Category | Status | Impact |
|----------|--------|--------|
| Technical SEO | ✅ Good | Site is crawlable, indexed properly |
| Content Quality | ⚠️ Mixed | Good core content but some outdated info |
| Trust Signals | ❌ **Critical** | Contradictory claims, some metrics show as zero |
| Authority/Links | ❌ **Critical** | New domain, zero real backlinks |
| Recovery Actions | ✅ In Progress | Cleaned up spam content, disavowed bad links |

**Bottom line:** The code/structure is NOT your main problem. You're a brand-new domain with no authority whose previous spammy signals (machine-translated content, link schemes) got you algorithmically suppressed. You've cleaned those up. Now you need to (1) get indexed properly, (2) build real authority.

---

## CRITICAL ISSUES (Preventing Traffic RIGHT NOW)

### 1. Algorithmic Suppression from Past Spam (Most Important)

**What happened:**
- Your site had ~536 machine-translated `/blog/{lang}/{post}` pages + 8 language hub indexes
- Had an automated link scheme using here.now satellite network
- This triggered Google's algorithmic spam filters

**What's been done:**
- ✅ All 536 machine-translated pages → `noindex, nofollow`
- ✅ ~156 thin `/services/{location}/{service}` doorway pages → `noindex`
- ✅ ~74 thin `/cities/{area}` pages → `noindex`
- ✅ Sitemap reduced from 1,001 → ~200 URLs (all clean, English content)
- ✅ Disavow file filed for here.now domains + low-quality directories
- ✅ All here.now traces removed from site

**Current state (verified Oct 11, 2026):**
- Sitemap has 7 sub-sitemaps with ~197 clean URLs total
- Verified via curl: core (23), blog (89), locations (46), services (19), leadMagnets (4), caseStudies (10), compare (6)
- All sitemaps accessible and populated

**What's needed:**
- Re-submit sitemap in Google Search Console
- Request indexing on homepage + top 5-10 blog posts
- Wait 1-4 weeks for clean pages to index
- Old spam URLs should drop out in 2-6 weeks as Google re-crawls

---

### 2. Trust & E-E-A-T Problems (High Impact on Rankings)

Your site makes claims that contradict each other or show as zero:

**Homepage issues found:**
- Hero section shows: `₹0 Cr+`, `0+ Years Experience`, `0+ Happy Families` (ZERO values!)
- Later on page shows: `₹50 Cr+`, `25+ years`, `1,000+ families` (correct values)
- **Google sees the zeros in the initial HTML** — this destroys trust

**Other contradictions found:**
- GST FAQ says 18% GST on health premiums (STALE — individual health/life exempt since Sept 2025)
- Cashless denial article says 30-minute pre-auth (STALE — IRDAI says 1 hour)
- Ombudsman compensation: some pages say ₹30 lakh, others say ₹50 lakh
- Quote page claims: 15k+ clients, 98% claims settled, 50+ awards (conflicts with homepage)
- Support page shows different IRDAI registration number than homepage

**Impact:**
- Google's quality raters (and algorithms) see conflicting/contradictory information
- Zero-value animated counters show Google your metrics are fake or broken
- YMYL (Your Money Your Life) content — insurance is HIGH-risk topic — requires EXCELLENT trust signals

---

### 3. Outdated Regulatory Information (Trust Killer)

Insurance is a YMYL topic. Outdated regulatory info = Google won't rank you.

**Specific issues:**
| Topic | Your Site Says | Correct Info | Source |
|-------|---------------|--------------|--------|
| GST on health/life premiums | 18% GST applies | EXEMPT for individual policies since Sept 22, 2025 | GST Council + PIB |
| Cashless pre-auth timeline | 30 minutes | 1 hour pre-auth, 3 hours discharge | IRDAI health guidance |
| Ombudsman limit | ₹30 lakh (some pages) | ₹50 lakh (current rules) | Insurance Ombudsman Rules 2017 |

---

### 4. Zero Backlinks / Domain Authority

**The hard truth:**
- This is a brand-new domain
- No meaningful backlinks from authoritative sources
- No mentions in insurance/finance media
- Google Business Profile exists (23 reviews, 4.2★) — this is good but not enough

**Why this matters:**
- New domains with zero authority get ~zero traffic regardless of content quality
- You need REAL backlinks from trusted sources
- Machine-translated content and link schemes didn't help — they hurt

---

## TECHNICAL SEO: What's Working

### ✅ Good Implementation

| Feature | Status | Notes |
|---------|--------|-------|
| Astro 5 static site | ✅ Excellent | Fast, crawlable, SSR HTML |
| robots.txt | ✅ Good | Allows all crawlers, points to sitemap |
| Sitemap | ✅ Working | 7 sub-sitemaps, proper structure |
| IndexNow | ⚠️ Partial | Script runs on build, Bing verification needed |
| hreflang | ✅ Good | 8 Indian languages + x-default |
| Canonical URLs | ✅ Good | Self-referencing, trailing slash |
| Structured data | ⚠️ Needs work | JSON-LD present but has conflicting entities |
| Security headers | ✅ Good | HSTS, CSP, nosniff, X-Frame-Options |
| Google verification | ✅ Done | GSC meta tag present |
| Bing verification | ⚠️ Needs check | msvalidate.01 present, verify in WMT |

### Sitemap Structure (Current - Verified via Live Site)
```
sitemap.xml (index) → 7 sub-sitemaps
├── core-sitemap.xml (23 pages: homepage, about, contact, faq, services, etc.)
├── blog-sitemap.xml (89 English blog posts)
├── locations-sitemap.xml (46 city pages)
├── services-sitemap.xml (19 service pages)
├── leadMagnets-sitemap.xml (4 lead magnets)
├── caseStudies-sitemap.xml (10 case studies)
└── compare-sitemap.xml (6 comparison pages)

Total: ~197 URLs in sitemaps

All sitemaps verified accessible and populated (curl check Oct 11, 2026).
```

### Content Available (Good Foundation)

**Blog posts (English, original):**
- Claim rejection/appeal guides (multiple comprehensive articles)
- LIC policy guides (revival, claims, plans)
- Health insurance deep dives (portability, pre-existing conditions, claims)
- IRDAI regulatory guides (grievance process, cashless rules, Ombudsman)
- Term insurance, motor insurance, travel insurance guides
- Tax benefit articles (80C, 80D, Section 80CCD)

**Total English blog posts:** ~100 articles  
**Core pages:** ~24 (homepage, about, services, locations, support, faq, etc.)  
**City location pages:** 46 cities  
**Service pages:** Multiple insurance types

---

## PAGE-BY-PAGE ANALYSIS

### Homepage (/)
**URL:** https://insurancesupport.online/  
**Meta:** "Insurance Claim Support in Bengaluru | Insurance Support"  
**Description:** "Insurance Support helps people understand policy options, organize claim documents, and navigate insurer follow-up. Based in Jalahalli, Bengaluru."

**Issues:**
1. **ZERO-value animated counters** — `₹0 Cr+`, `0+ Years`, `0+ Families` in initial HTML
2. **GST FAQ still mentions 18% GST** — but ticker says exempt (contradiction)
3. **title tag slightly long** — could be more concise
4. **Trust metrics need reconciliation** — homepage vs quote page vs support page

**Good:**
- FAQ section with 8 comprehensive questions + answers
- FAQPage JSON-LD schema present
- Strong internal linking to services, blog, resources
- IRDAI registration number displayed
- Google review link present

---

### Blog Posts (Examples)

**Good patterns:**
- Claim rejection/appeal content is comprehensive and practical
- LIC policy guides are detailed and helpful
- IRDAI regulatory content is relevant and needed

**Issues found:**
- Some statistics lack primary source links (e.g., "78% appeal success rate" with vague "IRDAI Annual Reports" citation)
- LIC rejection ranges differ between summary, table, and FAQ in same article
- Some articles have stale regulatory info (30-min pre-auth)
- Publisher name varies across article schema

---

### Location Pages

**Issue:** Some old location pages still indexed with:
- Unresolved `{{city}}` placeholders
- Stale trust metrics
- Thin/templated content

**Example:** `https://insurancesupport.online/locations/kharagpur/life-insurance` — shows `{{city}}` placeholder in search results

**Action needed:** Audit all location pages, fix/replace/redirect stale ones

---

## WHAT'S BLOCKING TRAFFIC: ROOT CAUSE ANALYSIS

```
                    WHY NO TRAFFIC?
                           │
                           ▼
            ┌─────────────────────────────┐
            │ ALGORITHMIC SUPPRESSION     │
            │ (spam signals from past)    │
            └─────────────┬───────────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
    ┌─────────────────┐    ┌──────────────────┐
    │ Old spam pages  │    │ Link scheme      │
    │ still being     │    │ (here.now        │
    │ deindexed       │    │  satellites)     │
    └─────────────────┘    └──────────────────┘
              │                       │
              └───────────┬───────────┘
                          │
                          ▼
              ┌─────────────────────────────┐
              │ NEW DOMAIN + ZERO AUTHORITY │
              │ No real backlinks           │
              │ No mentions in media        │
              │ No industry citations       │
              └─────────────┬───────────────┘
                            │
                            ▼
                    ┌──────────────────┐
                    │ Trust issues     │
                    │ (contradictory   │
                    │  claims, zeros)  │
                    └──────────────────┘
```

**The sequence:**
1. Site had spammy signals (machine translations, link schemes)
2. Google algorithmically suppressed the site
3. You cleaned up the spam (good!)
4. But now you have: clean site + new domain + zero authority + some trust issues
5. Result: No traffic until you build real authority

---

## ACTION PLAN (Prioritized)

### IMMEDIATE (This Week)

| # | Action | Why | Expected Impact |
|---|--------|-----|-----------------|
| 1 | **Re-submit sitemap in GSC** | Triggers re-crawl of clean URLs | Indexing of ~200 pages |
| 2 | **Request indexing on homepage + top 10 posts** | Forces immediate recrawl | Faster indexing |
| 3 | **Verify Bing Webmaster Tools** | msvalidate.01 needs verification | Bing indexing + IndexNow works |
| 4 | **Fix zero-value counters on homepage** | Google sees zeros = fake/broken | Trust signal improvement |
| 5 | **Fix GST FAQ contradiction** | Outdated regulatory info | YMYL trust improvement |
| 6 | **Reconcile all business metrics** | Conflicting claims hurt trust | Consistency = credibility |

### SHORT TERM (2-4 Weeks)

| # | Action | Why |
|---|--------|-----|
| 7 | **Add primary-source citations** to all regulatory/statistical claims | YMYL requires verifiable info |
| 8 | **Consolidate schema identity** — one Organization, one Person, consistent NAP | Trust signals |
| 9 | **Fix/update llms.txt** on live site | AI citation readiness |
| 10 | **Audit and fix/replace/redirect stale location pages** | Remove low-quality indexed URLs |
| 11 | **Add author bylines with credentials** on blog posts | E-E-A-T signals |
| 12 | **Add source notes and last-reviewed dates** to YMYL content | Trust + freshness |

### MEDIUM TERM (1-3 Months)

| # | Action | Why | Expected Impact |
|---|--------|-----|-----------------|
| 13 | **Google Business Profile optimization** — posts, photos, services, Q&A | Local insurance-intent traffic | HIGH — this is how locals find you |
| 14 | **Build real backlinks** — Justdial, IndiaMART, Sulekha, local directories | Authority signals | MEDIUM — foundation |
| 15 | **Guest articles/expert quotes** on insurance/finance sites | Authority + referral traffic | MEDIUM-HIGH |
| 16 | **Community engagement** — Reddit, Quora, Indian finance forums | Brand awareness + natural links | LOW-MEDIUM initially |
| 17 | **Create linkable assets** — claim recovery toolkit PDF, calculators, data studies | Natural backlinks | MEDIUM-HIGH (if good) |
| 18 | **Press/citations** — HARO, local business awards, media mentions | High-value backlinks | Sporadic but valuable |

### LONG TERM (3-6 Months)

| # | Action | Why |
|---|--------|-----|
| 19 | **Consistent content publishing** — fresh, expert content regularly | Authority building |
| 20 | **Link building outreach** — targeted, non-spammy | Domain authority |
| 21 | **Monitor GSC weekly** — track indexing, queries, clicks | Measure progress |
| 22 | **Expand topic coverage** — more comprehensive guides | More ranking opportunities |

---

## REALISTIC TIMELINE

| Milestone | Expected Timeframe |
|-----------|-------------------|
| Clean pages indexed | 1-4 weeks after sitemap resubmit |
| Old spam URLs dropped | 2-6 weeks (as Google re-crawls) |
| First long-tail organic clicks | 2-4 months (with GBP + few backlinks) |
| Meaningful traffic | 3-6 months (new domain, building authority) |
| Competitive keyword rankings | 6-12 months (insurance is competitive) |

**Key insight:** This is NOT a quick fix. You're building from zero authority. The cleanup was necessary but not sufficient. Traffic will come as you build real authority through GBP, backlinks, and consistent expert content.

---

## WHAT NOT TO DO

❌ **Do NOT re-enable machine translations** — this is what got you suppressed  
❌ **Do NOT buy links or join link networks** — will trigger more suppression  
❌ **Do NOT create more satellite sites** — here.now pattern was harmful  
❌ **Do NOT expect overnight results** — new domain + zero authority = slow start  
❌ **Do NOT respond to "no traffic" with aggressive SEO** — you're in recovery, not offense  

---

## CURRENT STRENGTHS TO BUILD ON

✅ **Good technical foundation** — Astro static site, fast, crawlable  
✅ **Comprehensive content** — 100+ English blog posts on relevant topics  
✅ **Local presence** — physical Bengaluru address, phone, IRDAI registration  
✅ **Google Business Profile** — 23 reviews, 4.2★ (optimize this!)  
✅ **Multi-language support** — 8 Indian languages (good for local reach)  
✅ **Claim recovery focus** — practical, needed content that can earn links  
✅ **Clean after spam removal** — no more suppressing signals  

---

## FILES TO REVIEW/UPDATE

| File | Issue | Action |
|------|-------|--------|
| `src/layouts/BaseLayout.astro` | Phone masked in schema (`+919****4506`) | Unmask for valid E.164 |
| `src/pages/index.astro` | Zero-value counters, GST contradiction | Fix counters, update FAQ |
| `public/llms.txt` | Generic description on live site | Upload complete version from workspace |
| `public/sitemaps/` | All sitemaps verified populated | No action needed — sitemaps OK |
| Various blog posts | Outdated regulatory info, weak citations | Update with current rules + sources |

---

## BOTTOM LINE

Your site's technical SEO is solid. The lack of traffic is primarily because:

1. **You're recovering from algorithmic suppression** — clean-up done, now waiting for Google to re-index the good stuff
2. **Zero domain authority** — new domain, no real backlinks yet
3. **Some trust issues** — contradictory claims, zero-value counters, outdated regulatory info

**The path forward:**
1. Get indexed (sitemap resubmit, URL inspection requests)
2. Fix trust issues (reconcile metrics, update regulatory info, fix zeros)
3. Build real authority (GBP optimization, genuine backlinks, expert content)
4. Be patient — this is a 3-6 month process minimum for meaningful traffic

The code isn't your problem. Authority is. Keep building.

---

*Analysis based on: live site inspection, sitemap review, GEO audit (Oct 4-5, 2026), SEO audit (Aug 30, 2026), RECOVERY_PLAN.md, and codebase analysis.*
