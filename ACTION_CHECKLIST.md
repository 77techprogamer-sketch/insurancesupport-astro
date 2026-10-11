# Traffic Recovery Action Checklist

**Site:** insurancesupport.online  
**Current Issue:** No search engine traffic  
**Root Causes:** Algorithmic suppression recovery + zero authority + trust issues

---

## 🔴 IMMEDIATE (This Week) — Do These First

### Indexing & Discovery

- [ ] **Re-submit sitemap in Google Search Console**
  - URL: `https://insurancesupport.online/sitemap.xml`
  - Go to: GSC → Sitemaps → Enter sitemap URL → Submit
  - Expected: "Success" status

- [ ] **Request indexing on key pages via URL Inspection**
  - Homepage: `https://insurancesupport.online/`
  - Top 5-10 blog posts (claim recovery guides, LIC guides, IRDAI guides)
  - Method: GSC → URL Inspection → Paste URL → "Request Indexing"

- [ ] **Verify Bing Webmaster Tools**
  - Check if `msvalidate.01` meta tag is verified
  - Submit sitemap in Bing WMT
  - Verify IndexNow is working (script runs on build)

- [ ] **Check index coverage in GSC**
  - Go to: Pages → See which of your ~200 clean URLs are indexed
  - Old spam URLs should show as "Excluded (#noindex)"

### Fix Trust-Critical Issues

- [ ] **Fix homepage trust counter values**
  - The live homepage shows `₹1 Cr` instead of expected `₹50 Cr+`
  - Animated counters start at 0 in initial HTML
  - **Fix:** Either hardcode values in SSR HTML OR ensure counters show correct values immediately
  
- [ ] **Update GST FAQ on homepage**
  - Current: Says 18% GST on health premiums
  - Correct: Individual life AND health premiums EXEMPT from GST since Sept 22, 2025
  - Add link to GST Council FAQ: https://gstcouncil.gov.in/sites/default/files/2025-09/faq_0.pdf

- [ ] **Reconcile all business metrics across pages**
  - Homepage: ₹50 Cr+ recovered, 25+ years, 1,000+ families
  - Quote page (/get-started): 15k+ clients, 98% claims settled, 50+ awards
  - Support page: Different IRDAI number?
  - **Action:** Pick ONE source of truth, use consistently everywhere

- [ ] **Fix ombudsman compensation limit**
  - Some pages say ₹30 lakh, current rules say ₹50 lakh
  - Update all pages to ₹50 lakh with source link

---

## 🟡 SHORT TERM (2-4 Weeks) — Build Trust & Quality

### Content Accuracy

- [ ] **Update cashless pre-auth timeline**
  - Current: 30 minutes (stale)
  - Correct: 1 hour pre-auth, 3 hours discharge (per IRDAI)
  - Affected: Blog posts about cashless claims
  - Add source link: https://irdai.gov.in/health-dept

- [ ] **Add primary-source citations to statistics**
  - Every stat needs: source name, link, date, methodology
  - Especially: claim rejection rates, appeal success rates, settlement ratios
  - Example: "78% appeal success rate" → link to specific IRDAI report

- [ ] **Add author bylines to blog posts**
  - Each post should show: Author name, credentials, date
  - Add Person schema with IRDAI credential on author pages

- [ ] **Add last-reviewed dates to YMYL content**
  - Regulatory/legal content should show: "Last reviewed: [date]"
  - Helps with freshness signals

### Technical Trust

- [ ] **Unmask phone number in schema**
  - File: `src/layouts/BaseLayout.astro`
  - Current: `+919****4506` (masked)
  - Fix: Use `+919986634506` (full E.164) in structured data
  - Keep display format (`+91-99866 34506`) only in visible text

- [ ] **Consolidate organization schema**
  - Single `InsuranceAgency` entity with stable `@id`
  - Consistent name, URL, logo, NAP across all pages
  - Fix `sameAs` — use full Google Maps URL, not short link

- [ ] **Publish updated llms.txt to live site**
  - Current live: Generic one-paragraph description
  - Workspace has complete version — upload it
  - Should list: services, guides, author, contact, sitemap

### Sitemap Health

- [ ] **Audit location pages for stale content**
  - 46 location pages in sitemap — verify each has real content
  - Check for `{{city}}` placeholders in indexed pages
  - Fix/replace/redirect any with unresolved templates
  - Example: `https://insurancesupport.online/locations/kharagpur/life-insurance` (shows placeholder in search results)

- [ ] **Verify all sitemaps have URLs**
  - Check: locations-sitemap.xml, services-sitemap.xml
  - Ensure no empty sitemaps in sitemap index

---

## 🟢 MEDIUM TERM (1-3 Months) — Build Authority

### Google Business Profile (HIGH PRIORITY)

- [ ] **Claim and verify GBP if not done**
- [ ] **Complete all profile sections**
  - Services list with descriptions
  - Service areas (Bengaluru neighborhoods)
  - Photos (office, team, documents — whatever appropriate)
  - Business hours (match what site says)
- [ ] **Post regularly** — weekly updates about insurance topics
- [ ] **Respond to all reviews** — especially the 23 existing ones
- [ ] **Add GBP link to website** (already done — verify it works)

### Local Citations & Directories

- [ ] **List on Indian business directories**
  - Justdial
  - IndiaMART
  - Sulekha
  - AskLaila
  - Local Bengaluru directories

- [ ] **Use data aggregators for wider reach**
  - Birdeye, Yext, or similar
  - One submission → many directories

### Earned Links & Mentions

- [ ] **Create linkable asset**
  - Claim recovery toolkit PDF (you have checklists — package them)
  - Insurance claim process flowchart
  - IRDAI grievance process guide with timeline

- [ ] **Guest contributions**
  - Insurance/finance blogs (Policybazaar blog, MoneyControl, etc.)
  - Local Bengaluru business publications
  - Focus on: claim recovery tips, IRDAI rights, policy review advice

- [ ] **Community participation**
  - Reddit r/IndiaInvestments, r/IndiaPersonalFinance
  - Quora insurance questions
  - Indian personal finance forums
  - Rule: Be helpful first, link second

- [ ] **HARO/Connectively**
  - Sign up as source for finance/insurance journalists
  - Respond to relevant queries

---

## 🔵 LONG TERM (3-6 Months) — Sustainable Growth

### Content Strategy

- [ ] **Publish consistently** — at least 2-4 new/updated posts per month
- [ ] **Cover more topics** — identify gaps via keyword research
- [ ] **Update existing content** — refresh stats, links, regulatory info quarterly
- [ ] **Create pillar pages** — comprehensive guides that link to related posts

### Link Building

- [ ] **Target insurance/finance sites for backlinks**
  - Resource page links
  - Expert roundups
  - Data-driven content that earns citations

- [ ] **Local link opportunities**
  - Bengaluru business associations
  - Local news/features
  - Partnership links (office neighbors, professional networks)

### Monitoring & Optimization

- [ ] **Check GSC weekly**
  - Indexing status
  - Search queries (what are you showing up for?)
  - Click-through rate
  - Any new warnings/errors

- [ ] **Track rankings for target keywords**
  - Claim recovery related terms
  - LIC policy terms
  - IRDAI grievance process
  - Bengaluru insurance advisor
  - Health insurance claim help

- [ ] **Monitor competitor activity**
  - What are other insurance advisors/sites doing?
  - New content, features, offerings

---

## ❌ DO NOT DO (Will Harm Recovery)

- [ ] Do NOT re-enable machine translations
- [ ] Do NOT create more satellite sites
- [ ] Do NOT buy links or join link networks
- [ ] Do NOT use automated link building
- [ ] Do NOT respond to "no traffic" with aggressive SEO tactics
- [ ] Do NOT delete disavow file or re-add here.now domains
- [ ] Do NOT make contradictory claims across pages

---

## 📊 SUCCESS METRICS (How to Know It's Working)

| Metric | Target Timeline | How to Check |
|--------|----------------|--------------|
| Clean URLs indexed | 1-4 weeks | GSC → Pages → Indexed |
| Old spam URLs deindexed | 2-6 weeks | GSC → Pages → Excluded |
| First organic impressions | 4-8 weeks | GSC → Search Results |
| First organic clicks | 8-16 weeks | GSC → Search Results |
| GBP views/calls | Ongoing | GBP dashboard |
| Keyword rankings (long-tail) | 3-6 months | Rank tracking tool |

---

## 🆘 IF STUCK

**Problem: Still no indexing after 4 weeks**
- Double-check sitemap submitted correctly in GSC
- Request indexing on individual URLs
- Check for accidental noindex tags
- Verify robots.txt allows crawling

**Problem: Indexed but no traffic**
- Check what queries you're showing up for (GSC)
- May need better content targeting or more authority
- Focus on GBP and local citations

**Problem: Rankings drop**
- Check for algorithm updates (SEO news)
- Audit recent content changes
- Competition may have improved

---

## QUICK REFERENCE: Key Links

| Resource | URL |
|----------|-----|
| Google Search Console | https://search.google.com/search-console |
| Bing Webmaster Tools | https://www.bing.com/webmasters |
| Google Business Profile | https://business.google.com |
| IRDAI Official Site | https://irdai.gov.in |
| GST Council | https://gstcouncil.gov.in |
| Insurance Ombudsman | https://www.cioins.co.in |
| Your Sitemap | https://insurancesupport.online/sitemap.xml |
| Your robots.txt | https://insurancesupport.online/robots.txt |
| Your llms.txt | https://insurancesupport.online/llms.txt |

---

*Last updated: October 11, 2026*
