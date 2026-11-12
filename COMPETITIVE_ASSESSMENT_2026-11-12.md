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
