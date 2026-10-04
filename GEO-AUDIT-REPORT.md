# GEO Audit Report: Insurance Support

**Audit date:** 4 October 2026
**Audited URL:** https://insurancesupport.online
**Business type:** Local insurance advisory and publisher
**Coverage:** Representative sample of 20+ public URLs, including the homepage, service, location, support, FAQ, case study, and article pages; robots.txt, sitemap.xml, and AI-discovery files were also checked. This is not a full-site crawl.

---

## Executive Summary

**Overall GEO Score: 53/100 (Poor; provisional)**

The site is technically easy to crawl: sampled pages return HTML with substantial content before JavaScript, robots.txt allows general crawlers, the sitemap is available, and JSON-LD is server-delivered. The main drag on AI citation readiness is trust: live pages expose zero-valued animated metrics, make conflicting claims about outcomes and business scale, and contain regulatory answers and precise insurance statistics that lack clear primary-source support.

The deployed site also appears behind the current workspace: the live homepage and quote page still show issues that have been corrected locally. Publishing the built changes is needed before those fixes can affect search and AI systems.

### Score Breakdown

| Category | Score | Weight | Weighted score |
|---|---:|---:|---:|
| AI Citability & Visibility | 48/100 | 25% | 12.0 |
| Brand Authority | 36/100 | 20% | 7.2 |
| Content E-E-A-T | 39/100 | 20% | 7.8 |
| Technical GEO | 92/100 | 15% | 13.8 |
| Schema & Structured Data | 65/100 | 10% | 6.5 |
| Platform Optimization | 52/100 | 10% | 5.2 |
| **Overall GEO Score** |  |  | **53/100** |

Scores are directional estimates from a sampled public-site review. Brand-platform presence, private license records, claim outcomes, and some crawler endpoints were not independently validated.

---

## Critical Issues

### 1. Reconcile regulatory guidance before promoting affected pages

The site gives inconsistent or apparently outdated answers on material insurance questions:

- The live homepage FAQ says 18% GST applies to most premiums and that health premiums include GST, while its own ticker says GST is exempt on individual life and health policies from 22 September 2025. The GST Council release confirms the exemption for individual life and health policies, including family floaters and senior-citizen policies. [Homepage](https://insurancesupport.online/) · [Government GST release](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2163555&lang=2&reg=3)
- A current cashless-denial article says pre-authorisation decisions are due within 30 minutes. IRDAI’s health guidance states one hour for pre-authorisation and three hours for final discharge authorisation. [Cashless-denial guide](https://insurancesupport.online/blog/cashless-health-insurance-claim-denied-hospital-2026/) · [IRDAI health guidance](https://irdai.gov.in/health-dept)
- Ombudsman compensation limits differ across site content: one article says ₹30 lakh, while other pages say ₹50 lakh. The published Insurance Ombudsman Rules and IRDAI guidance should be reconciled and cited directly before the site gives a single answer. [Claim-rejection data article](https://insurancesupport.online/blog/insurance-claim-rejection-rate-india-2026-data/) · [Insurance Ombudsman Rules](https://www.cioins.co.in/notification/Insurance%20Ombudsman%20Rules%2C%202017%28%20as%20amended%20till%2009.11.2023%29.pdf) · [IRDAI Ombudsman guidance](https://irdai.gov.in/en/web/policy-holder/ombudsman)

For insurance and grievance content, show the applicable scope and date, quote/link the exact current rule, and have a qualified reviewer check it before promotion.

---

## High Priority Issues

### 1. Live trust metrics are contradictory and sometimes render as zero

The homepage’s extracted HTML begins with `₹0 Cr+`, `0+ Years Experience`, and `0+ Happy Families`, then later shows `₹50 Cr+`, `25+ years`, and `1,000+ families`. The quote page separately claims `15k+ Clients`, `98% Claims Settled`, `24/7 Support`, and `50+ Awards`; its own office-hours section says Monday–Saturday 9 AM–9 PM and Sunday by appointment. Another support page reportedly displays a different registration number from the `0149161D` used across the homepage and other pages. [Homepage](https://insurancesupport.online/) · [Quote page](https://insurancesupport.online/get-started/) · [Support page](https://insurancesupport.online/support/)

Choose one verified source of truth for registration, families served, claim outcomes, recovered value, ratings, support hours, and awards. Remove figures that cannot be substantiated, and render important metrics as stable text in the initial HTML. The current workspace fixes for the homepage counters, trust figures, and GST FAQ were built but are not reflected in the live pages reviewed.

### 2. Add traceable sources to statistics and legal claims

The 2026 rejection-rate article gives insurer-level counts and percentages, rejection causes, and a claimed 78% appeal success rate. Its source note says “IRDAI Annual Reports, Public Disclosures” but does not link the underlying tables or explain calculations sufficiently for readers to reproduce them. The article also reports different LIC rejection ranges in the summary, table, and FAQ. [Rejection-rate article](https://insurancesupport.online/blog/insurance-claim-rejection-rate-india-2026-data/)

Link each statistic to a specific primary-source report/table, define the period and denominator, distinguish measured facts from estimates, and remove claims that cannot be verified. IRDAI publishes an annual statistics handbook and annual reports that can anchor this work. [IRDAI insurance statistics handbook](https://irdai.gov.in/handbook-of-indian-insurance) · [IRDAI annual reports](https://irdai.gov.in/web/policy-holder/irdai-annual-reports)

### 3. Consolidate business and author schema identities

The sampled JSON-LD parses and is present in the initial HTML, but the homepage declares both `InsuranceAgency` and `LocalBusiness` entities with differing names and map URLs. Article publisher names also vary. The About page does not provide the same complete Person entity found on the homepage; Hari’s schema includes `alumniOf: IRDAI`, which appears to confuse a regulator/credential issuer with an educational institution. One location schema uses a nonstandard `irdaiRegistrationNumber` property. [Homepage](https://insurancesupport.online/) · [About Hari Kotian](https://insurancesupport.online/about-hari-kotian/) · [Example article](https://insurancesupport.online/blog/health-insurance-claim-rejection-15-reasons/)

Use one stable Organization/InsuranceAgency identity with a canonical `@id`, consistent name, URL, logo, NAP, and verified `sameAs` links. Give the advisor one canonical Person entity, model the registration as a credential, and remove unsupported identity links. Keep visible facts and schema answers in sync.

---

## Medium Priority Issues

### 1. Improve primary-source citations and editorial accountability

Pages often present Hari Kotian’s advisor experience and first-person case knowledge, but do not consistently link regulatory/statistical statements to exact official source documents. Case studies provide useful dates, amounts, and actions, yet reviewed pages do not explain anonymization/consent or offer redacted evidence. Add a detailed author profile, registration-verification link, named reviewer for regulatory updates, source notes, and a corrections policy. Avoid promises such as “we ensure your claim is processed and approved”; explain that advisory support cannot guarantee an insurer’s decision.

### 2. Verify sitemap coverage and `lastmod` values

The live `/sitemap.xml` index is valid and references child sitemaps, but the sampled index exposed about 200 URLs while the current workspace’s static build produced 1,001 routes. This may be intentional filtering or a deployment/version gap; check which generated routes should be indexable and confirm each has an appropriate canonical/noindex policy. Sitemap `lastmod` values were clustered around the same recent date; emit them only when they represent a real content update. [Sitemap](https://insurancesupport.online/sitemap.xml)

### 3. Strengthen the AI discovery file and independent brand validation

The live `llms.txt` endpoint was reported as a generic one-paragraph description, and direct retrieval was inconsistent across audit tools. Replace it with an accurate, current index of the most important services, guides, author, contact details, and sitemap. The workspace now contains a more complete draft, but it is not yet reflected on the live site. Independent confirmation of an insurance-specific author/company profile was limited; verify and link official profiles only where they exist. [llms.txt](https://insurancesupport.online/llms.txt)

### 4. Fix stale or unresolved indexed landing pages

Search results still surface a location page containing the unresolved placeholder `{{city}}` and outdated trust metrics. Audit old and generated location URLs; replace useful pages with genuinely local content, and redirect or noindex pages that should no longer be indexed. [Example indexed location page](https://insurancesupport.online/locations/kharagpur/life-insurance)

---

## Low Priority Issues

- Add `SearchAction` to `WebSite` schema if the on-site search is intended to be discoverable as a site search feature.
- Improve article schema entity links, publisher logo (currently the favicon), and optional article metadata. Sampled Article/Breadcrumb/FAQ markup otherwise appeared in raw HTML and parsed successfully.
- The title/description are present, the HTML uses `lang="en-IN"`, canonicals are self-referencing, HTTPS redirects correctly, and core security headers were observed. The homepage title is slightly long; refine it if a clearer, shorter title is available.
- Pagefind indexed 1,004 HTML files in the local build; three static verification HTML files lacked a `lang` attribute. Add language attributes or exclude these verification files from the search index.
- Core Web Vitals, mobile tap targets, Google Business Profile completeness, Bing indexing, and platform-specific search rankings were not measured in this audit.

---

## Category Deep Dives

### AI Citability & Visibility (48/100)

The homepage and FAQ offer question-shaped headings, short answers, named services, and concrete case examples. These structures make passages easy for answer engines to extract. Citability is reduced by the homepage’s zero-value counters, the stale GST answer, contradictory scale/success claims, and statistics that lack direct sources. Robots.txt is accessible and permits general crawlers; no AI-specific disallow rules were observed. The live llms.txt was weak and could not be retrieved consistently by all audit tools. [Homepage](https://insurancesupport.online/) · [FAQ](https://insurancesupport.online/faq/) · [robots.txt](https://insurancesupport.online/robots.txt)

### Brand Authority (36/100)

The site has identifiable contact details, a physical Bengaluru address, an IRDAI registration number, a Google reviews link, and named claim examples. Search review found limited independently verifiable insurance-specific coverage for the brand/person beyond these first-party pages. Search results also contain unrelated people with the same name, so entity matching should be reinforced with verified profile links, consistent NAP, and third-party mentions in relevant insurance/local sources. The reported Google rating/review count was not independently validated.

### Content E-E-A-T (39/100)

The first-person practitioner voice and detailed claim scenarios provide experience signals; the named advisor and registration number provide an expertise starting point. Trust is undermined by discrepant registrations/metrics, uncited precise insurer statistics, conflicting regulatory rules, and overly certain outcome language. Add exact primary-source citations, dated review records, verifiable credentials, and case evidence/anonymization notes.

### Technical GEO (92/100)

Sampled pages return substantial server-rendered HTML and HTTP 200. HTTPS, self-referencing canonicals, trailing-slash redirects, robots access, a valid sitemap index, and security headers were observed. Robots.txt allows general crawlers and points to the sitemap; no AI-specific crawler blocks were seen. Limits: no field Core Web Vitals or device-level mobile audit was performed; `llms.txt` retrieval and `www` redirect behavior could not be consistently verified.

### Schema & Structured Data (65/100)

Six sampled page types exposed 23 JSON-LD blocks containing 29 schema nodes. The JSON parsed; sampled pages included InsuranceAgency, WebSite, LocalBusiness, Person, Service, Article, FAQPage, and BreadcrumbList. The main weakness is conflicting entity identity and facts across graph nodes. No Rich Results Test or dedicated Schema.org validator was run.

### Platform Optimization (52/100)

| Platform | Estimate | Main opportunity |
|---|---:|---|
| Google AI Overviews | 65/100 | Preserve answer structure; source regulatory and data claims; reconcile metrics. |
| ChatGPT Search | 53/100 | Strengthen independent entity corroboration and verify crawler access. |
| Perplexity | 53/100 | Make evidence and source links directly auditable; improve independent discussion. |
| Gemini | 44/100 | Standardize Google entity/profile signals and NAP. |
| Bing Copilot | 44/100 | Verify Bing Webmaster/sitemap/indexing signals and consistent company identity. |

These are readiness estimates, not measured rankings or observed model answers. The homepage and FAQ are indexed, but search ranking, Knowledge Panel presence, external profile completeness, and all crawler-specific fetches were not established.

---

## Quick Wins (This Week)

1. Correct the live GST FAQ/schema and the cashless pre-authorisation timeline; cite the relevant government/IRDAI source.
2. Reconcile every business metric, registration number, rating, award, and support-hours claim across homepage, quote, support, service, and location pages.
3. Keep trust metrics as stable server-rendered values so crawlers never see zero or partial content.
4. Add primary-source links and calculation methodology to claim-rate tables and regulatory guides.
5. Standardize the Organization/Person JSON-LD identity and publish the updated `llms.txt` to production.

## 30-Day Action Plan

### Week 1: Accuracy and consistency
- [ ] Verify registration and business details with the owner and regulator.
- [ ] Correct GST, grievance, Ombudsman, and cashless timeline guidance against current primary sources.
- [ ] Approve a single, substantiated set of business outcome metrics.

### Week 2: Trust and sourcing
- [ ] Add inline citations to regulations, official statistics, and insurer disclosures.
- [ ] Document the method/date behind each aggregate statistic and remove unsupported claims.
- [ ] Add author credentials, reviewer, last-reviewed date, and corrections contact to YMYL content.

### Week 3: Technical entity signals
- [ ] Consolidate Organization/InsuranceAgency and Person JSON-LD with stable `@id` references.
- [ ] Verify all `sameAs`, Maps/review, logo, and NAP fields.
- [ ] Publish the expanded `llms.txt` and check that its links resolve.

### Week 4: Index quality and monitoring
- [ ] Compare all indexable canonical routes against sitemap coverage.
- [ ] Fix, redirect, or noindex stale placeholder location pages.
- [ ] Measure mobile Core Web Vitals and verify Bing/Google indexing after the production release.

---

## Appendix: Representative Pages Analyzed

| URL | Page type | Main finding |
|---|---|---|
| [Homepage](https://insurancesupport.online/) | Home/local service | Zero hero metrics; contradictory GST answer; useful FAQ and case blocks. |
| [FAQ](https://insurancesupport.online/faq/) | FAQ | Query-shaped structure; needs current, cited regulatory answers. |
| [Get started](https://insurancesupport.online/get-started/) | Lead/quote | 15k/98%/24-7/50-award claims conflict with other pages and stated hours. |
| [Support](https://insurancesupport.online/support/) | Support | Registration/claim-success figures require reconciliation. |
| [Claim recovery hub](https://insurancesupport.online/claim-recovery/) | Service/content hub | Strong problem-oriented navigation and practitioner framing. |
| [Services overview](https://insurancesupport.online/services/) | Services | JSON-LD contains Organization/WebSite/WebPage nodes. |
| [SME insurance](https://insurancesupport.online/services/sme-insurance/) | Service | Detailed service text; tax/legal statements need citations. |
| [Term insurance](https://insurancesupport.online/services/term-insurance/) | Service | Clear service description; numeric insurer/claim assertions need sources. |
| [Case studies](https://insurancesupport.online/case-studies/) | Evidence hub | Good evidence-oriented format; substantiate and explain anonymization. |
| [Max Bupa delay case](https://insurancesupport.online/case-studies/max-bupa-claim-delayed-365-days/) | Case study | Specific timeline and amounts, but no redacted supporting record in sample. |
| [Rejection-rate data](https://insurancesupport.online/blog/insurance-claim-rejection-rate-india-2026-data/) | Data article | Precise figures lack direct source links and have internal range conflicts. |
| [Cashless denial guide](https://insurancesupport.online/blog/cashless-health-insurance-claim-denied-hospital-2026/) | Regulatory guide | Review 30-minute claim against IRDAI's one-hour pre-authorisation standard. |
| [Health rejection guide](https://insurancesupport.online/blog/health-insurance-claim-rejection-15-reasons/) | Article | Article/FAQ/Breadcrumb schema present; sourcing opportunities remain. |
| [ULIP plans](https://insurancesupport.online/services/ulip-plans/) | Service/guide | Detailed guidance; verify product/tax claims and cite sources. |
| [Indiranagar location](https://insurancesupport.online/locations/indiranagar/) | Location | LocalBusiness and Place schema observed; standardize entity fields. |
| [Stale Kharagpur page](https://insurancesupport.online/locations/kharagpur/life-insurance) | Location | Search result contains unresolved `{{city}}` placeholder and stale metrics. |

### Audit limitations

- This was a representative sample, not a 50-page exhaustive crawl.
- Direct retrieval of robots/llms endpoints varied by audit tool; technical checks confirmed robots and sitemap availability, while some AI-visibility checks could not independently fetch llms.txt.
- Search platform readiness scores do not establish actual placement in AI answers.
- No private license, client, case, analytics, Google Business Profile, or Webmaster Tools data was available.
- No Rich Results Test, CrUX, or field Core Web Vitals measurements were performed.
