# SEO Coverage Gap List
## insurancesupport.online — Specific Items to Fix/Add

**Date:** October 11, 2026

---

## GAP 1: No HowTo Schema Anywhere (Easy Win)

**Problem:** You have step-by-step guides but zero `HowTo` schema. This is a missed rich result opportunity AND AI extraction opportunity.

**Pages that SHOULD have HowTo schema:**

| Page | Steps | Difficulty |
|------|-------|------------|
| IRDAI grievance process guide | 5-7 steps (file complaint, get acknowledgment, follow up, escalate, ombudsman) | Easy |
| LIC policy revival guide | 6-8 steps (check status, gather docs, fill form, pay fee, submit, track) | Easy |
| Cashless claim denied guide | 4-6 steps (get written reason, ask for clarification, submit missing docs, file grievance, escalate) | Easy |
| Claim appeal guide | 5-7 steps (review rejection letter, gather evidence, write appeal, submit, follow up, escalate) | Easy |
| LIC death claim guide | 5-7 steps (intimate insurer, gather documents, submit, follow up, disbursement) | Easy |
| Motor claim process guide | 6-8 steps (ensure safety, document scene, file FIR if needed, inform insurer, get survey, submit docs, settle) | Easy |

**What to do:**
1. Add `HowTo` schema to each of these pages
2. Use the `step` property with `HowToStep` → `name`, `text`, `position`
3. Add `estimatedTime` where possible
4. Add `tool` or `supply` where relevant

**Expected impact:** Rich results in SERPs for step-by-step queries + better AI extraction.

---

## GAP 2: Internal Links Are too LOW (Biggest Easy Win)

**Problem:** Every key page has only ~4 internal links. That's very low for a site trying to build topical authority.

**What to do:**

1. **Add "Related posts" section to blog post template** — 3-5 links to related content at the bottom of every post
   - Look at `src/pages/blog/[slug].astro` or whatever your blog post layout is
   - Add a component that shows 3-5 related posts by category/tag
   - This single change could 5x your internal link count

2. **Add contextual links WITHIN content** — not just at the bottom
   - In claim rejection article, link to "how to appeal" guide (anchor: "appeal a rejected claim")
   - In LIC revival guide, link to "LIC death claim" guide (anchor: "LIC death claim process for nominees")
   - In IRDAI grievance guide, link to "IGMS portal" guide (anchor: "file through IRDAI's IGMS portal")
   - In cashless denial article, link to "pre-auth rules" article (anchor: "IRDAI cashless pre-authorisation rules")

3. **Create pillar pages and link FROM them to cluster content**
   - If you create the IRDAI pillar page, it should link to all 12 IRDAI articles
   - If you create the claim recovery pillar, it should link to all 18 claim articles

4. **Link FROM homepage and popular posts TO newer content**
   - Homepage should link to top 5-10 blog posts (it probably does already — verify)
   - Popular posts should link to newer related posts

**Target:** 8-15 internal links per page (up from 4).

---

## GAP 3: Missing Content (30-50 New Articles to Reach 120-140 Blog Posts)

### Priority New Articles (ordered by traffic potential)

#### Claim Recovery gaps:
1. "travel insurance claim denied what to do" — you have travel insurance article, add the claim-denied angle
2. "bike insurance claim rejected what to do" — 2-wheeler is huge in India, you have car content, add bike
3. "how to write insurance appeal letter" — practical, high intent
4. "what to do if insurer delays claim beyond 30 days" — directly addresses the 30-day rule
5. "insurance claim settlement timeline India" — informational, broad reach
6. "group health insurance claim problems" — you have one article, expand
7. "commercial insurance claim denied" — B2B angle, underserved

#### LIC gaps:
8. "LIC policy status check online" — practical, high volume
9. "LIC maturity claim process step by step" — you have LIC content, add dedicated maturity claim guide
10. "LIC policy loan interest rate 2026" — practical, specific
11. "LIC free look period rules" — informational, easy to write
12. "LIC nominee change process" — practical, common question
13. "LIC surrendered policy reinstatement" — specific scenario

#### IRDAI gaps:
14. "IRDAI helpline number" / "IRDAI contact" — navigational intent, easy win, captures IRDAI traffic
15. "IRDAI annual report how to read" — differentiates you, citation magnet
16. "IRDAI solvency ratio list 2026" — data-driven, linkable
17. "IRDAI barcode sticker rules 2026" — practical, vehicle owners search this
18. "IRDAI microinsurance guidelines" — niche, establishes authority

#### Health insurance gaps:
19. "top-up vs super top-up health insurance" — common question, you have health expertise
20. "health insurance for diabetic patients India" — high intent, underserved
21. "health insurance for senior citizens above 75" — high intent, less competition than 60+
22. "AYUSH cover in health insurance" — niche, growing, practical
23. "room rent limit in health insurance" — common pain point
24. "OPD cover in health insurance" — common question
25. "pre-existing condition covered after waiting period" — practical, addresses common confusion

#### Other gaps:
26. "professional indemnity insurance for consultants" — you have PI content, narrow to consultants
27. "insurance for startup employees" — B2B angle, you have SME content

**That's 27 new articles.** At 1.5K-2.5K words each, that's ~40-67K words of new content. At 4 articles/week, that's ~7 weeks. At 2 articles/week, ~14 weeks.

---

## GAP 4: Pagination URLs in Sitemap (Wasted Crawl Budget)

**Problem:** Your blog sitemap includes `/blog/page/2/` through `/blog/page/6/`. These are low-value URLs that duplicate content from the main blog page.

**Fix options:**
1. **Noindex them** — add `noindex, follow` meta tag to pagination pages. They still get crawled (for link equity) but won't appear in search results.
2. **Remove from sitemap** — simply don't include them in the generated sitemap.

**Recommendation:** Noindex is better (preserves link equity while removing from index).

---

## GAP 5: No Image Sitemap (Missed Image Search)

**Problem:** You have images on the site but no image sitemap. Google Image Search is a separate search vertical you're not tapping.

**Fix:**
1. Create `public/sitemaps/images-sitemap.xml` listing all site images
2. Each image entry: `<image:image>` with `<image:loc>`, `<image:title>`, `<image:caption>`, `<image:geo_location>` (optional)
3. Add to sitemap index

**Even simpler:** If you use Astro's `<Image />` component or similar, the images are already optimized. Just add the sitemap.

---

## GAP 6: Category/Tag Pages Not Leveraged

**Problem:** You likely have category/tag pages (e.g., `/blog/category/health/`, `/blog/tag/lic/`) that could be useful landing pages but may be thin.

**Check:**
1. Do you have category/tag pages?
2. Are they in the sitemap?
3. Do they have unique content or just an auto-generated post list?
4. Are they noindexed?

**Fix:**
- If useful: Add a short description to each category page (100-200 words) explaining what the category covers
- If thin/duplicative: Noindex them
- Either way: Make sure they're intentional, not accidental

---

## GAP 7: Video Content Missing Entirely

**Problem:** No video content on the site. YouTube is the 2nd largest search engine and video results appear in Google SERPs.

**Fix (low effort):**
1. Create 2-3 minute explainer videos for your TOP 5 guides (claim rejection, IRDAI complaint, LIC revival, cashless denial, Ombudsman)
2. Upload to YouTube
3. Embed on corresponding site page with unique context (not just the embed — add a paragraph above/below)
4. Add `VideoObject` schema to the page
5. Create a `/videos/` or `/watch/` page listing all your videos

**Production:** Use your phone + free editing app. Good enough is fine. Content matters more than production quality for search.

---

## GAP 8: Missing Google Search Console Coverage Monitoring

**Problem:** We can't see what Google actually has indexed without GSC access. The `site:` search operator is unreliable.

**Fix:**
1. Ensure GSC is set up for `insurancesupport.online` (property: `https://insurancesupport.online`)
2. Check "Pages" report weekly — see which URLs are indexed vs excluded
3. Check "Links" report — see what pages have internal links and external links
4. Check "Search Results" report — see which queries you show up for (even if position is low)
5. Submit updated sitemap after any content changes

---

## SUMMARY: Priority Order for Coverage Improvements

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| 1 | Add "Related posts" to blog template (5x internal links) | High | Easy |
2 | Add HowTo schema to 5-6 step-by-step guides | Medium-High | Easy |
3 | Write 10 new articles from gap list | High | Medium |
4 | Noindex pagination URLs | Medium | Easy |
5 | Add image sitemap | Medium | Easy |
6 | Create 3 pillar pages (IRDAI, Claim Recovery, LIC) | High | Medium-Hard |
7 | Add video content (YouTube embed + schema) | Medium | Medium |
8 | Write 20-27 more articles to reach 120-140 blog posts | High | Hard (long-term) |
9 | Add QAPage schema to FAQ pages | Medium | Easy |
10 | Add Dataset schema to claim rejection statistics article | Medium | Easy |

---

## BOTTOM LINE

Your site has good foundational coverage (197 URLs, solid schema, good content depth on key pages). The gaps are:

1. **Not enough internal linking** — easiest fix, biggest impact on link equity distribution
2. **Not enough HowTo schema** — easy win for rich results
3. **Content volume could be 30-50 articles higher** — more pages = more keyword real estate
4. **No image/video search presence** — missed verticals
5. **Pagination wasting crawl budget** — easy fix

The content gap list (27 specific article ideas) gives you a clear roadmap. Start with the top 10 by traffic potential, add internal links and HowTo schema as you go, and you'll meaningfully expand coverage within 2-3 months.
