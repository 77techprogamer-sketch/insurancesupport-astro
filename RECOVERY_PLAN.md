# Organic Traffic Recovery Plan — insurancesupport.online

**Status:** No manual action in Google Search Console → the traffic suppression is **algorithmic** (scaled machine-translated content + link scheme + brand-new domain with zero authority).
**Technical cleanup: DONE and LIVE** (deploy confirmed 2026-09-29, sitemap index now serves 7 sub-sitemaps, blog sitemap serves English-only URLs).

---

## The situation in one paragraph

insurancesupport.online is **technically clean and fully indexable**, but a brand-new domain with no authority whose signals were suppressed by (~536) machine-translated pages and an automated link scheme will get ~zero organic traffic for months. The code is not the problem. We have removed the suppressing signals. Now the job is (1) get the ~200 clean URLs indexed, and (2) build genuine, real-world authority.

---

## What has already been done (by this recovery effort)

- **Deindexed all machine-translated content**: 536 `/blog/{lang}/{post}` pages + 8 language hub indexes → `noindex, nofollow`.
- **Deindexed thin templated pages**: ~156 `/services/{location}/{service}` doorway combos + 74 thin `/cities/{area}` pages (kept 9 cities with real detail; kept 13 core services, 6 standalone location service pages, 46 real `/locations/{city}` pages).
- **Sitemap reduced from 1,001 → 200 URLs** — all unique, original, expert-authored English content.
- **Disavow file** filed for the here.now satellite network + low-quality directory domains (created 2026-08-20, updated 2026-09-26).
- **Removed all here.now traces** sitewide (satellites, scripts, redirects, skill files).
- **Fixed broken build** (8 blog pages + blog router `[slug].astro`) so the site actually builds and deploys.

---

## Phase 1 — Index the clean site (DO NOW)

1. **Google Search Console**
   - Re-submit sitemap: `https://insurancesupport.online/sitemap.xml`
   - **Request Indexing** on the homepage and your top 5–10 blog posts via **URL Inspection → Request Indexing** (forces immediate recrawl of clean content).
   - For a few previously-indexed old translated/thin URLs, use URL Inspection → Request Indexing so Google re-crawls and discovers the `noindex` (this triggers deindexing faster).

2. **Bing Webmaster Tools** (you have `msvalidate.01` set)
   - Confirm site verified, submit the same sitemap. IndexNow already fires on every build (`scripts/indexnow-notify.js`).

3. **Check these GSC reports weekly:**
   - **Pages** → "Indexed" vs "Excluded." You want the ~200 clean URLs appearing as "Indexed," and the old translated/thin URLs dropping out as "Excluded (#noindex/explained)".
   - **Page indexing / Crawl stats** → confirm Google is actually crawling.

---

## Phase 2 — Build real authority (the actual traffic driver)

A fresh domain won't rank until it has trustworthy inbound links and signals. Non-spammy, legitimate sources for an **IRDAI-licensed insurance advisor in Bengaluru**:

### Local & business listings (highest leverage — do these first)
- **Google Business Profile** — *most important.* You already have 23 reviews / 4.2★. Ensure it is claimed + verified, links to the site, has services/areas/photos, and post regular updates. This is how local insurance-intent traffic finds you.
- Justdial, IndiaMART, Sulekha, AskLaila
- MSN/business directories via data aggregators (Birdeye, Yext) — one submission syndicates to many
- Bengaluru / Karnataka business directories and local chambers

### Industry & authority
- **IRDAI** official channels (regulator directory) — cite your Reg. No. 0149161D
- Guest articles or expert Q&As on respected insurance/finance sites (Policybazaar blog, MoneyControl, ET/Financial Express contributor pages) — *earned*, not bought
- Reddit r/IndiaInvestments, Quora, and Indian personal-finance forums — answer real questions and link to relevant guides (be helpful first; links second)

### Content that earns links naturally
- Your **claim-recovery guides** are strong link-bait (data-driven, real cases). Gate/syndicate them.
- A downloadable **claim-recovery toolkit / checklist PDF** others reference (you already have several PDFs — promote them).
- **Localized resources**: "Insurance claim help in Koramangala/Whitefield/etc." (the 9 real city pages).

### Press / citations (sporadic but high value)
- Local finance/media mentions, conference/business award citations, HARO/Help a Reporter for money/insurance questions.

---

## Phase 3 — What NOT to do

- ❌ Re-enable machine translations or thin templated pages (reintroduces the exact suppressing signal).
- ❌ Buy links, join link networks, or rebuild satellites.
- ❌ Expect overnight results; don't respond to "zero traffic" by doing *more aggressive* SEO.
- ❌ Delete the disavow file or re-add the here.now domains.

---

## Realistic timeline

| Stage | Expected |
|-------|----------|
| Indexing of ~200 clean pages | 1–4 weeks after sitemap resubmit + indexing requests |
| Old spam/duplicate URLs dropped (noindex) | 2–6 weeks as Google re-crawls |
| First meaningful organic clicks (long-tail) | 2–4 months (with GBP + a few real backlinks) |
| Broad keyword ranking | 3–6 months (new domain, zero authority) |

**Keep doing it week over week.** The drag is authority, not code.

---

## Key reference settings to verify in GSC

- **Domain property**: owns both `insurancesupport.online` and all subdomains.
- **Manual Actions**: No issues detected ✓ (no reconsideration needed).
- **Disavow tool**: confirm `domain:here.now` + directory domains show as uploaded/processed.
- **Sitemap**: `sitemap.xml` re-submitted and returning "Success."

*Last updated: 2026-09-29*
