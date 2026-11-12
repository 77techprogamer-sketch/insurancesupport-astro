# How good is this site, compared with the people it competes with

Assessment date: 12 November 2026 · Branch `arena/45928666-insurancesupport-astro`
Method: measured what is actually in `dist/` and `src/data/` (844 built pages, 609 posts), then ran four live searches for the terms this site is built to win and recorded who appeared.

---

## The verdict in one paragraph

**The content and the technical build are in the top tenth of Indian insurance sites. The visibility and the trust signals are in the bottom tenth.** This is not a site that needs better articles — it already has the most rule-accurate content in this niche, and demonstrably more precise than competitors who outrank it. It is a site that nobody has been given a reason to believe yet: no face, no reviews, no third-party mention, no links, and 81 English posts competing against publishers with hundreds of thousands of pages.

Put crudely: **if a policyholder found this site, they would trust it more than Insurance Samadhan. They cannot find it.**

---

## 1. The evidence that matters most

I searched the four things this site is written to answer. Our URL appeared in **none** of them.

| Query | Who ranks | Us |
|---|---|---|
| "insurance claim rejected" what to do India step by step | righttoinformation.wiki (1), legalsetu.co.in, indiapolicyhub.in, rudracodeshere.github.io | absent |
| LIC death claim rejected what to do nominee appeal | licpolicyadvisor.in, policybazaar.com, outlookmoney.com | absent |
| cashless claim denied at hospital what to do India | righttoinformation.wiki (1), smcinsurance.com, yourpolicyguide.in | absent |
| insurance claim rejected — health, escalation | indiapolicyhub.in, policyjack.com, nyvo.in | absent |

Meanwhile the same searches surfaced competitors reproducing **₹30 lakh** as the Ombudsman limit — a limit raised to ₹50 lakh in November 2023. `smcinsurance.com` still says ₹30 lakh in its answer block. We had that wrong too until this week; we are now correct, and they are not.

Accuracy is not the ranking factor we wish it were. That is the whole story of this site in one line.

## 2. Scorecard

Scored against the best competitor I could observe on each dimension (Insurance Samadhan for business proof, righttoinformation.wiki for search visibility, Policybazaar for domain strength).

| # | Dimension | Us | Best competitor | Why |
|---|---|---|---|---|
| 1 | Depth on a single topic | **4.5** | 4 | 1,553-word median post; six posts over 3,000 words; 45 of 81 English posts quote a specific Rule, Regulation, Section or circular |
| 2 | Breadth of scenarios covered | **3** | 5 | They cover fire, theft, home, travel, mis-selling, fraud, B2B, NRI. We have 81 English posts, heavily weighted to LIC and generic IRDAI topics |
| 3 | Factual accuracy and citation | **5** | 3 | We cite rule numbers and amendment dates. They quote SLAs loosely (15-day GRO vs IRDAI's 14) and stale limits |
| 4 | Answer-first structure / snippet readiness | **4.5** | 5 | Our posts open with "The short answer" and a source table; the best competitor opens with a two-line direct answer, which is what Google lifts |
| 5 | Structured data | **5** | 4 | 7 JSON-LD blocks per page median: Organization, Person, LocalBusiness, FAQPage, Article, Breadcrumb, plus per-page entities |
| 6 | Page weight and markup discipline | **3** | 4 | 74 KB HTML / ~20 KB gzip — genuinely light. But 17 `<script>` tags per page (GTM, GA4, Ads, Clarity, Artibot) undo much of it |
| 7 | Visual trust — faces, photos, proof | **1** | 5 | **Two `<img>` tags on the entire site.** Samadhan runs founder photos, an app store listing, media logos, thousands of case files |
| 8 | Third-party proof | **2** | 5 | 11 case studies at ~580 words each (good) but no named reviews, no press, no rating you can click through to |
| 9 | Discoverability and authority | **1** | 5 | 0 of 4 target queries; no backlink profile to speak of; domain is months old with 540 posts dated in two months |
| 10 | Conversion paths | **4.5** | 4 | WhatsApp deep links, call, callback form, quiz, 5 downloadable magnets, sticky mobile bar. Better instrumented than any competitor I looked at |
| 11 | Brand entity signals | **2** | 5 | Correct NAP, IRDAI reg no., local schema. But no Google Business Profile depth, no press, no verifiable trail beyond the reg number |
| 12 | Publishing consistency | **2** | 4 | 198 posts in April, 342 in June, then 7 in August, 8 in October. That pattern reads as machine-generated to both readers and Google |

**Weighted:** content and craft ≈ 4.3/5. Distribution and trust ≈ 1.6/5.

## 3. Where we genuinely beat every competitor

These are not small things, and they are worth protecting:

1. **Rule-level precision.** "Rule 17(6) — ₹5,000 per day", "Regulation 10 — 2% above bank rate from the date of the last document". Competition stops at "you can complain to the Ombudsman". This is the one durable moat.
2. **We tell people when to pay nobody.** The new fees article says plainly that the Ombudsman route is free and sometimes the honest answer is "do it yourself". Every funded competitor's business model depends on the opposite advice.
3. **Downloads that are actually documents.** Nine real PDFs/XLSX (appeal templates, affidavit, claim organiser, regulation summary). Competitors publish blog posts and phone numbers.
4. **Tools.** Risk scorecard, HLV calculator, policy recovery planner, plus the claim-rejection quiz. Nobody in this niche has this.
5. **No invented statistics.** The rest of the niche is full of "95% success rate, ₹50 Cr recovered". We have a real, checkable IRDAI registration number instead.
6. **Schema and internal linking.** 62 internal links per page median, 227 indexable pages, zero orphans, zero broken relative links. That is better technical discipline than most agency-built sites.

## 4. Where we lose, and by how much

- **Authority.** Policybazaar and Outlook Money are in the results because of domain strength, not content quality. We cannot out-publish them; we can only out-specialise them.
- **Proof.** A single advisor with no photograph, no visible reviews and no press is indistinguishable from a lead-generation shell. This is the cheapest gap to close and currently the most damaging.
- **Brand.** Insurance Samadhan has $4.16M raised, a Series B, a mobile app, and roughly 14,000 grievances resolved. We have a phone number. That asymmetry does not need to be beaten on size — it needs to be beaten on transparency and specificity — but right now we show neither.

## 5. Three things that are actively dangerous

1. **Fabricated review markup.** 67 location and service pages carry hard-coded `AggregateRating` — 4.8 stars, 127 reviews — and service pages carry an invented reviewer ("Rajesh Kumar, 15 Nov 2025"). There are no corresponding reviews on the page. This breaks Google's structured-data policy on self-serving reviews and is exactly the kind of thing that produces a manual action, on a site whose whole pitch is "we don't invent things". Either wire it to a real Google Business Profile with real reviews, or remove it.
2. **540 posts published in two batches** with 586 unique tags, including `insurance 2025` (12 posts) on a site dated 2026. It reads as programme-generated. Either spread and prune, or consolidate.
3. **617 of 844 pages are `noindex`** — that is correct handling of the translated duplicates, but it means the "609 posts" figure is really **81 English posts**. Treat 81 as the working number when planning, not 609.

## 6. If I had one month and one budget

Ordered by impact per rupee, assuming no paid links:

1. **Remove or legitimise the fake review markup** (today, free). Risk removal.
2. **A real photo of Hari, and five real reviews with permission to publish name + city + claim type** (this week, free). This is the single largest trust delta available and the competitor's main advantage over us.
3. **Consolidate 81 posts into 6 pillar clusters** — rejection, Ombudsman/escalation, Section 45 & life claims, health/cashless, motor, NRI — with a hub page each and every child linking up and across. We already have most of the pieces; the structure is the multiplier.
4. **Answer-first rewrite of the top 20 pages**: first 60 words = the answer with the number in it, then the table. Righttoinformation.wiki wins because it does exactly this and nothing else.
5. **Ten real backlinks**: one guest piece in an Indian personal-finance publication, a quoted comment for a journalist, a listing in IRDAI-adjacent directories, a Wikipedia-adjacent citation, a tie-up with a hospital's insurance desk. Ten good links would do more than 50 more articles.
6. **Cut scripts from 17 to under 10** and drop the second ad tag. Speed is a tie-breaker, not a moat.
7. **Only then, more content** — and at 4–6 a month, dated honestly, not 300 at once.

## 7. Honest summary table

| Question | Answer |
|---|---|
| Is the content better than competitors'? | Yes — measurably. More specific, better sourced, less promotional |
| Is the site better built than competitors'? | Yes. Faster, cleaner schema, better internal linking, no broken pages |
| Would a visitor trust it as much? | No. No face, no reviews, no press, no app — and it shows |
| Can it be found? | Almost not at all. 0 of 4 target queries today |
| Is it a good business asset as it stands? | It is a good library with no door on it. The content will keep compounding if the trust and link gaps are closed within the next three months |

The uncomfortable summary: **we have built the best reference work in this niche and given nobody a reason to open it.** The next 90 days should be about faces, proof and links — not more articles.

---

## 8. Follow-up: what changed the same day

**Review markup removed.** 57 location pages and 12 service pages carried a hard-coded 4.8 rating with 127 reviews, plus invented reviews attributed to named people and to "Google Reviews". All of it is gone — 0 pages now carry `AggregateRating`. The trade-off is real: no star ratings in search results until there are genuine reviews to mark up. That is the correct order of events, not a loss.

**Pillars built.** Six clusters now exist as real pages, with deterministic assignment so new posts file themselves:

| Pillar | Hub | Guides |
|---|---|---|
| Claim rejection and appeals | `/guides/claim-rejection/` | 11 |
| Escalation: Ombudsman, IRDAI, consumer forums | `/guides/escalation/` | 10 |
| Life insurance, LIC and Section 45 | `/guides/life-lic/` | 32 |
| Health and cashless claims | `/guides/health-cashless/` | 14 |
| Motor and travel claims | `/guides/motor-travel/` | 7 |
| NRI, business and specialist cover | `/guides/nri-business/` | 4 |

Every blog post now links up to its hub and across to four siblings. 78 of 81 English posts are filed; the three site-navigation pages are excluded deliberately.

Site after the change: **857 HTML files, 234 indexable pages, 0 orphan pages, 0 titles over 60 characters, 0 broken relative links.**

What has *not* changed — and will decide whether any of this works — is the list in section 6: a photograph, five real reviews, ten real links, and an answer-first rewrite of the twenty pages that matter most. The structure is now in place to carry that work; it cannot substitute for it.

---

## 9. Follow-up: the answer-first pass, and what it uncovered

The plan for this pass was cosmetic — put a direct answer in the first sixty words of the twenty highest-intent pages, the way the pages that currently own the featured snippet do. Two things surfaced on the way in, and both mattered more than the rewrite.

**Six pages had no body at all.** Five English posts rendered a hero, a byline, a pillar card and a call to action around *nothing* — roughly 600 words of chrome and no content. A sixth was an 85-word stub. Their slugs are the highest-intent on the site: LIC claim rejection, ICICI Lombard cashless denial, Care Health settlement ratio, the Bangalore Ombudsman, Bima Bharosa filing, the complaint toolkit. These were live, indexed, internally linked pages competing for exactly the queries we want. All six are now written in full (950–1,250 words each), with the answer in the first sentence, a source table, the steps, and an FAQ. A seventh page, the claim rejection *data* page, was rebuilt as a methodology piece, because its original content was a table of rates attributed to IRDAI that IRDAI does not publish.

**The site was carrying invented social proof.** Not a stray line — a pattern, across English posts, translated duplicates, blog summaries, the lead-magnet page, and author bylines:

| Claim found on site | Where | Status |
|---|---|---|
| "78% overturn rate since 2018" | 11 posts, summaries, bylines, lead magnet | Removed |
| "Rs 50Cr+ recovered for clients" | 13 posts, bylines, translated duplicates | Removed |
| "95% success rate on health appeals", "98% approval" | hub translations | Removed |
| "100+ Ombudsman filings assisted" | bylines | Removed |
| "IRDAI data: 15–20% of claims rejected" | 43 pages including translations | Replaced with a sourced statement that no such figure is published |
| Named client case studies with amounts and durations | 16 posts | Relabelled as composite examples |

This is the same error as the fabricated reviews removed earlier in section 8, and the same reason to remove it: unverifiable numbers are not an asset that survives contact with a regulator, a journalist or a competitor's complaint. The stories that remain are now labelled as illustrative, and the facts that do the persuading are sourced instead — G.S.R. 828(E) for the ₹50 lakh limit, Rule 17(6) for ₹5,000 a day on a delayed award, 30 days and 45 days under the 2017 regulations, 14 days for a grievance under the September 2024 Master Circular.

**Answer-first coverage after the pass:** 35 of 105 top-level blog pages now open with an explicit answer block, up from 6. That is every page in the top twenty by intent, the six previously empty ones, and the three pillar hubs. The remaining 70 are mid-tail and can follow the same pattern as they are reviewed.

**Site after the change:** 857 HTML files, 234 indexable pages, 232 sitemap URLs, 0 orphan pages, 0 titles over 60 characters, 0 broken internal links, 0 pages carrying invented performance claims.

**What this does not change.** Section 6 stands. A page that answers the question in sixty words still needs a face, five real reviews and a handful of links before it outranks a content farm. The difference is that the content is now fit to be ranked — the sentences a stranger would check are the ones we can now defend.

---

## 10. The Google review link

Hari supplied the link he sends to clients by message: `https://g.page/r/CRDgJanrKjRhEBM/review`. It is now wired in properly rather than pasted in one place:

- **One constant.** `src/data/site.ts` holds `GOOGLE_REVIEW_URL` and `GOOGLE_PROFILE_URL`. If the listing is ever re-created, one line changes.
- **Footer, every page** — a single inline line: "Worked with us? Leave a Google review." 852 pages carry it.
- **`/contact` and `/about`** — a card in the amber palette, addressed to people who have already been served, not to a first-time enquirer.
- **`/review`** — a 302 in `public/_redirects` to the same review box, so the link can be given as `insurancesupport.online/review` in a message or a WhatsApp reply. Cloudflare Pages reads `_redirects` at deploy time.

**What this does and does not fix.** It makes it easy for a satisfied client to leave a review, which is the cheapest trust signal available and the one section 6 identified as missing. It does **not** put stars in search results: that needs real reviews plus `AggregateRating` markup, and the markup stays off until the reviews exist. The earlier fabricated 4.8/127 is still gone, and it stays gone.

**One cleanup this forced.** The organisation schema's `sameAs` array contained four URLs that resolved to nothing real — a Google Maps place link with a duplicated hex identifier, a YouTube channel ID of repeating characters, and three brand handles that appear nowhere on the site. They are replaced with the real listing plus the two handles the footer actually displays. Structured data that describes imaginary profiles is the same error as the fake reviews, in a less visible place.

---

## 11. India-only traffic

The request: traffic from search engines outside India should not land here.

**The honest part first.** No search engine offers a switch that says "rank me in India only." Google retired country targeting in Search Console; there is no equivalent to a geo-restriction you can declare. A site written in English about insurance can surface in Manchester as easily as in Mangalore, and Googlebot's crawler has no country. Three things actually move the needle, and only the first one changes today's numbers:

**1. Stop serving human visitors outside India.** Done, in `functions/_middleware.ts`. A non-India visitor asking for an HTML page is sent to `/outside-india/`, a one-screen notice explaining that the site covers Indian insurance, with two exits: continue (sets a 30-day cookie) or the NRI section, which is written for Indians abroad. Built and rendering; 858 pages, 234 indexable, 0 broken links.

The exemptions matter more than the rule:

| Exempt | Why |
|---|---|
| Crawlers (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot…) | They fetch from US IPs. Gating them hides the whole site from search. |
| Link previews (WhatsApp, Slack, LinkedIn, Facebook) | Otherwise every shared link shows no title or image. |
| Assets, sitemaps, robots.txt, `/api` | Not pages; gating them breaks rendering or discovery. |
| The NRI and business cluster — hub plus its four posts (NRI payout, SME, cyber, wedding) | That audience is outside India on purpose. |
| Requests with no country code | Serve normally rather than guess. |

Emergency switch: set `GEO_GATE=off` in Cloudflare Pages → Settings → Environment variables and redeploy. The gate then does nothing.

**2. Tell the engines the audience is Indian.** Most of this was already in place and is now reinforced: `<html lang="en-IN">`, self-referential `hreflang="en-IN"` plus `x-default`, geo meta tags (`IN-KA`, Bengaluru, coordinates), a postal address in Karnataka, `+91` phone, ₹ amounts, and organisation schema with `areaServed` now naming **India** (Karnataka as a sub-area) and `currenciesAccepted: INR`. Content does the rest — IRDAI, the Ombudsman, Bima Bharosa and Section 45 are Indian by definition, which no generic international insurance site can imitate.

**3. Measure India separately.** In Search Console, filter Performance by country = India before drawing conclusions; the worldwide average hides the number that matters. In analytics, exclude the noise bots. If a large share of the "outside India" traffic turns out to be scrapers and AI crawlers, the gate will not change it — but nothing that matters is lost either.

**What not to do.** Do not serve `noindex` based on country: Googlebot is American, so that would de-index the site. Do not block by IP range in robots.txt: robots.txt has no geography. Do not remove the English content or the translated pages believing that causes foreign impressions; it does not.

**Expectation.** The gate removes foreign *sessions*, not foreign *impressions*. Impressions in Google's worldwide report may barely move. The metric that should improve is the ratio of India to non-India sessions in analytics, and the quality of the leads that arrive.

**NRI exemption, widened.** The first cut exempted only paths containing "nri", which covered the hub and one post. The cluster is actually five pages — the hub plus NRI claim payout, SME, cyber and wedding cover — so the exemption is now that list rather than a substring match, with `nri`, `non-resident` and `overseas` in any path still caught.

The button on the notice page now passes `?stay=1`, so an NRI who chooses it gets the 30-day cookie and can then read any page. Without that, the exemption let them read the hub and then put them back in front of the notice on the first ordinary article — a worse experience than gating the hub itself.

When the pillar gains or loses a post, its slug goes in `NRI_PREFIXES` in `functions/_middleware.ts`. That is a two-line edit and the only maintenance the gate needs.

---

## 12. Bengaluru first, India second

The instruction: Bengaluru is priority one, the rest of India is priority two. The site had 83 locality pages, 14 Bengaluru area pages and two Bengaluru blog posts — and **no single page that a search for "insurance claim help Bangalore" could sensibly land on.** Everything local was one click deep and nothing tied it together. That page now exists at `/bangalore/`.

**What is on it.** 1,300 words, answer-first, built on the four things that are genuinely different here: the Karnataka Ombudsman sits in JP Nagar; LIC files live with a divisional office, not the branch that sold the policy; cashless is refused at the hospital desk before a planned procedure; and motor claims fail on renewal gaps and surveyor estimates. Then the document route, the area grid, six local guides and five Bengaluru FAQs.

**How it is wired.** Priority is a plumbing problem before it is a copy problem:

| Placement | Reach |
|---|---|
| Header navigation | Every page |
| Footer quick links ("Bengaluru (HQ)") | 854 pages |
| Strip under the homepage hero | Homepage |
| Priority banner | `/locations/` |
| Breadcrumb (Bengaluru → Locality) | 83 locality pages |
| Breadcrumb (Bengaluru → Location) | 56 location pages |

**One compromise.** Seven items do not fit a 64px bar at 900px wide, so "Insurance Support Hub" became "Support Hub" and the nav tightens below 1120px. If the row looks wrong on your laptop, say so and the item moves to the footer only.

**Schema.** Bengaluru now leads `areaServed` (city, country, state). The page-level duplicate business node was dropped — one address, one entity, no conflicting NAP for Google to choose between.

**Build:** 859 HTML files, 235 indexable (+1), 0 broken links.

**What this does not do.** A hub page does not by itself rank a local query. `insurance advisor bangalore` is won with the Google Business Profile, reviews in Bengaluru, citations in local directories, and links from Bengaluru sites. The first of those exists and is now linked from every page; the second is the five reviews still outstanding; the third and fourth are the next piece of work, and neither can be faked.

---

## 13. Making /contact a page that can rank

The instruction: `/contact` should be a top-priority page in Google, not an afterthought.

**The honest limit first.** A contact page will not outrank a 2,000-word guide for "how to appeal a rejected claim" — nobody searching that wants a phone number. Where a contact page *can* and should win is contact intent: "insurance advisor Bangalore contact", "insurance agent phone number Bengaluru", "claim help Bangalore phone", and the brand query. It was losing those to its own thinness: 376 words, a generic title, no address, no hours, no schema beyond a generic WebPage.

**What changed**

| Lever | Before | After |
|---|---|---|
| Title | Contact Us \| Insurance Support by Hari Kotian | Contact an Insurance Advisor in Bengaluru \| 99866 34506 (55 chars) |
| H1 | "Let's Discuss Your Insurance Needs" | "Contact an insurance advisor in Bengaluru" |
| Words | 376 | 785 |
| Schema | WebPage | ContactPage + InsuranceAgency + FAQPage |
| In the header nav | No | Yes (8 items; compact-nav breakpoint moved to 1280px) |
| Sitemap priority | 0.7 | 0.9, behind only the homepage |
| Pages linking to it | — | 854 |

**Added to the page:** what to send for a rejection, a LIC policy or a planning question; what happens after contact; a visible NAP block (address, phone, email, hours, languages, IRDAI number, Google listing); and four FAQs that answer the questions people actually ring up with — is it free, do I have to come to Bengaluru, what if the policy is from another state, can you guarantee the claim.

**NAPs must match.** The address, phone and hours on this page now match the organisation schema and the Google Business Profile. If those three drift apart, Google trusts all of them less — that is the one thing to keep in step manually.

**What is still missing for contact-intent ranking:** the Google Business Profile needs its own posts and photos, the site needs a handful of Bengaluru citations, and the reviews have to be real. A page cannot signal local trust on its own.

---

## 14. Keywords: what was asked for, and what actually helps

The request was "strong keywords on all pages". The honest version of that sentence matters, so here it is first.

**Meta keywords do nothing on Google.** The `<meta name="keywords">` tag has been ignored since 2009 and stuffing it would be a waste of a day. Bing reads it faintly; that is the whole of its value. It is still emitted, because it costs nothing and the file is already there.

**What does move traffic, in order of effect:**

1. **The title tag.** It is the single strongest on-page signal and the only one a searcher sees before deciding to click.
2. **The H1.** Google treats it as the page's own statement of its subject.
3. **The first hundred words.** Whether the page answers the query or merely mentions it.
4. **Internal anchor text.** What other pages call this one.
5. **Content that is better than the result above it.** Nothing on this list substitutes for that.

So the work went there.

**Rewritten keyword sets** (`src/data/page-keywords.ts`) now describe intent rather than products — "claim rejected what to do India", "insurance ombudsman complaint", "cashless claim rejected hospital", "section 45 insurance act" — instead of "life insurance premium 2026". A keyword list that could belong to any insurance site is not a brief.

**H1s now name the query** on the pages where they named nothing searchable: the tools index ("tools that answer a question"), policy recovery ("Find Your Lost Wealth"), the risk scorecard ("Is Your Family Truly Protected?"), the comparison index ("Compare the choices"), the guides index, the services index, the claim-recovery hub, the brand hub and the FAQ.

**Titles rebuilt where they were weak or stale:**

| Page | Before | After |
|---|---|---|
| Service pages | Health Insurance in Bengaluru - Compare Plans | Health Insurance in Bengaluru \| Advisor, Claims & Renewal |
| 10 case studies | "Total Loss Motor Claim: 9.5 Lakh Settled After IDV Dispute" | "Bajaj Allianz Total Loss: ₹9.5 Lakh IDV Dispute Settled" |
| Comparison | Best Insurance Plans 2025 | Best Insurance Plans 2026 |
| IRDAI post | How to File an IRDAI Grievance Against Your Insurance 2026 | IRDAI Grievance Complaint: How to File in 2026 |
| About pages | both "About Hari Kotian \| Insurance Support" | two distinct titles, both keyword-bearing |

**One remove, not an add:** the services index claimed "12+ years of experience, 2,800+ families served, ₹500+ Cr of coverage managed". Those numbers contradicted the 25-year byline and nothing supports them. Replaced with the IRDAI registration number and the years stated everywhere else.

**The map.** `seo/keyword-map.csv` assigns every indexable page a primary query, an intent and a check: does the title contain it, does the H1 contain it. 235 pages mapped, 28 flagged at the start, 24 now — and roughly twenty of the remaining flags are artefacts of the script deriving a query from a hub URL ("blog", "case studies"), not real gaps.

**What this is worth.** Titles and H1s decide whether a page can rank; they do not decide whether it will. That still comes down to links, reviews and being the best answer — sections 6, 10 and 13.

## 15. The visual pass — and what it is actually worth

The ask was to make the site look better than the competitors so it ranks above them. Worth stating plainly before the numbers: **appearance alone does not move rankings.** What it does move is Core Web Vitals, how long someone stays on the page, and whether they call. Those are real, and they are what this pass targeted. Links and reviews are still the ranking lever.

### The big one: 270 KB of JavaScript to fade in three buttons

Every page on the site loaded React, Framer Motion and an icon library so that a floating "call / WhatsApp / get a quote" bar could slide in after 300 pixels of scroll. Measured from the built output: `FloatingCTA.*.js` 132 KB plus the shared `client.*.js` 136 KB — about 270 KB of JavaScript, parsed and executed on a phone, to animate a div.

It is now an `.astro` component: static markup, a CSS transition and fourteen lines of inline script that toggles one class. Same appearance, same behaviour.

| Per page, measured from `dist/` | Before | After |
|---|---|---|
| JavaScript on the homepage | ~270 KB | **2.2 KB** |
| JavaScript on a blog article | ~270 KB | **2.2 KB** |
| JavaScript on `/contact/` | ~270 KB | **2.2 KB** |
| Pages still loading React | 859 | **2** (trust strip and calculator) |

This is the single largest performance change made to the site so far, and it costs nothing visually.

### Articles that read like articles

The blog template styled tables, images, links and code — but not `h2`, `h3`, `p`, `ul` or `ol`. Tailwind's reset had removed the browser defaults and nothing put the rhythm back, so 105 posts rendered as a wall of paragraphs with headings floating above them. Now: 17px at 1.75 line height, real space above each heading, list spacing, and wide tables that scroll sideways on a phone instead of shrinking to eight-point type.

Two additions on top of that:

- **The answer box.** 35 posts open with "The short answer" as a heading, which visually disappears. It is now a tinted panel with a blue rule and a small label — the reading aid it was meant to be, and the shape an extractor prefers to quote.
- **On this page.** 73 posts have three or more sections and now carry a two-column contents card. Every `h2` gets a slugified, de-duplicated id, so each section is directly linkable and Google has jump targets to show as sitelinks.

### What was deliberately not done

- **No stock photography.** The pages are thin on imagery — the homepage has no `<img>` at all — but pasting generic stock of shaking hands over a caption is the visual equivalent of the invented statistics already removed from this site. Real photographs of Hari, or none.
- **No new fonts or animation libraries.** Two families and seven weights already load; adding a third for visual effect would undo the 270 KB win above.
- **No carousel, parallax, scroll-jacking or gradient text.** All three cost LCP or accessibility, and class-A competitors win on plain, fast pages — being calmer and better set than them is the advantage, not out-animating them.

### Honest expectations

This pass improves three measurable things: the JavaScript a phone must download and execute (a real LCP and INP win), whether a long article can be read and scanned at all, and how easy it is to call from a phone. None of those is a ranking factor in themselves. If the goal is to outrank `insurancesamadhan.com`, the work is still what sections 6, 10 and 13 describe: reviews, links, and answers that are better than theirs.

Blocked on the same input as before: photographs of Hari would fill the visual gap that CSS cannot.

## 16. The Google Business Profile, read and wired in

The profile is **LIC - Hari Kotian**, Bahubali Nagar, Jalahalli, Bengaluru 560013 — 4.3 from **24 reviews**, "Insurance agency", open Monday to Saturday 9:30 am–6 pm, closed Sunday, five photos. Verified on 12 November 2026 at `g.page/r/CRDgJanrKjRhEBM`, which resolves to the Maps place with CID `0x61342aeba925e010`.

### What the profile exposed

Reading it against the site turned up a set of mismatches that no amount of copywriting fixes, because they tell Google the site and the listing are two different businesses:

| Field | Site said | Profile says | Now |
|---|---|---|---|
| Coordinates | 13.0159, 77.5522 (central Bengaluru) | 13.0464, 77.5508 (Jalahalli) | profile |
| Hours | 9:00 am–6:00 pm, and 9:00 am–9:00 pm on `/contact` | 9:30 am–6:00 pm, Sunday closed | profile |
| Street address | Bahubali Nagar, Jalahalli | Bahubali Nagar, Jalahalli **Village**, Jalahalli | profile |
| `sameAs` | g.page + LinkedIn + Twitter | — | Maps place URL + g.page |
| `servesCuisine` | "Insurance Services" | — | removed (restaurant property) |
| 57 location pages | `maps/place/Insurance+Support+Bangalore` — a listing that does not exist | — | real profile |

### What replaced the testimonials

The homepage, `/insurance-support/` and `/bangalore/` carried three testimonials about an angioplasty called pre-existing, a repudiated term claim, and an IDV revised in six weeks, credited to "R. Sharma", "M. Patel" and "A. Reddy". There was no source for any of them — the same problem as the invented statistics removed in §7, in a more persuasive form.

They are now the three reviews that actually exist, quoted verbatim: John, Prashanth S, Ayush Kandoi. They are narrower — "explains the policy", "answers for all the policies made with him", "genuine and kind hearted person" — and that is the point. Every one is clickable through to the profile, so a reader can check instead of believing.

Placed at: homepage (§ "On Google"), `/about/`, `/contact/` (rating plus a Directions link), `/bangalore/`, `/insurance-support/`, and a compact version in the footer with the hours.

### Why there is no star rating in the search result

`aggregateRating` was deliberately not added. Google's review-snippet rules disallow self-serving reviews for `LocalBusiness` and `Organization` — a business marking up its own rating on its own site is exactly that, so it earns no stars and risks a structured-data penalty. The rating is visible text with a link, which is what a cautious buyer actually wants anyway.

### Three things on the profile that need the owner, not the site

1. **The "Learn more" link points off-site.** The profile's owner description ends with a bracketed keyword dump — `[insurance, financial advisory, health insurance, wealth protection, …]` — and a "Learn more" button to `chattybao.com/Insurance-Support`, a domain that is not yours. That is sending profile visitors to someone else. Check business.google.com → Edit profile → description and links.
2. **Every review is about LIC policy advice.** Not one mentions a rejected claim, which is what this site sells. The reviews are real and now displayed, but they prove a different competence than the one being ranked for. Two or three reviews from claim clients would change what the page can honestly say.
3. **Five photos, mostly street view.** Real interior and portrait photos would fill the visual gap noted in §15; Google-hosted images cannot be reused on the site.

One file holds all of this — `src/data/google-profile.ts`. When the review count changes, that line changes and every page follows.
