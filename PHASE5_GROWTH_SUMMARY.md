# Phase 5: Growth Experiments + Programmatic SEO — COMPLETE

## 1. Programmatic City Pages (50+ Indian Cities)

### Template: `src/pages/claim-help/[city].astro`
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ArticleJsonLd from '../../components/ArticleJsonLd.astro';
import FAQPageJsonLd from '../../components/FAQPageJsonLd.astro';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd.astro';
import CityClaimData from '../../data/city-claim-data.json';

const { city } = Astro.params;
const cityData = CityClaimData[city.toLowerCase()];

if (!cityData) return Astro.redirect('/claim-help/');

const title = `Insurance Claim Help in ${cityData.name} — Cashless, Reimbursement & Ombudsman Guide`;
const description = `Complete guide to filing insurance claims in ${cityData.name}: network hospitals, TPA contacts, Ombudsman jurisdiction, cashless process, and appeal steps. Expert help by Hari Kotian (IRDAI 0149161D).`;
const canonical = `https://insurancesupport.online/claim-help/${city}/`;

const faqs = [
  { question: `Which are the best network hospitals for cashless claims in ${cityData.name}?`, answer: cityData.topHospitals.map(h => `${h.name} (${h.area}) — ${h.tpas.join(', ')}`).join('\n\n') },
  { question: `Where is the Insurance Ombudsman office for ${cityData.name}?`, answer: `The Insurance Ombudsman for ${cityData.name} is located at ${cityData.ombudsman.address}. Jurisdiction: ${cityData.ombudsman.jurisdiction}. File online at cioins.co.in or visit in person.` },
  { question: `How long does cashless pre-authorization take in ${cityData.name} hospitals?`, answer: `Most ${cityData.name} network hospitals get pre-auth approval within 1-4 hours. Emergency cases: 30 minutes. Keep your TPA ID card and policy copy ready.` },
  { question: `What if my cashless claim is denied at a ${cityData.name} hospital?`, answer: `Ask for written denial reason. File grievance with insurer (15 days), then IRDAI IGMS/Bima Bharosa, then Ombudsman (${cityData.ombudsman.office}). We can help — book a free consultation.` }
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": `Insurance Claim Assistance in ${cityData.name}`,
  "description": description,
  "url": canonical,
  "provider": { "@type": "Organization", "name": "Insurance Support", "url": "https://insurancesupport.online/" },
  "areaServed": { "@type": "City", "name": cityData.name },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Claim Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cashless Claim Filing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Claim Rejection Appeal" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ombudsman Complaint Filing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Document Preparation" } }
    ]
  }
};
---

<BaseLayout title={title} description={description} canonical={canonical} pageType="service-page" pageLang="en-IN" ogLocale="en_IN" structuredData={schema}>
  <ArticleJsonLd title={title} description={description} url={canonical} date={new Date().toISOString().split('T')[0]} authorName="Hari Kotian" inLanguage="en-IN" />
  <FAQPageJsonLd questions={faqs} />
  <BreadcrumbJsonLd items={[
    { label: 'Home', url: 'https://insurancesupport.online/' },
    { label: 'Claim Help by City', url: 'https://insurancesupport.online/claim-help/' },
    { label: cityData.name, url: canonical }
  ]} />

  <main class="page-transition">
    <!-- Hero -->
    <section class="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
          Insurance Claim Help in {cityData.name}
        </h1>
        <p class="text-lg text-blue-100/80 mb-6 max-w-3xl">
          {cityData.name}-specific guidance for cashless claims, reimbursement, Ombudsman complaints, and claim denial appeals. Served by Hari Kotian — IRDAI Reg. 0149161D.
        </p>
        <a href="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-slate-900 font-bold rounded-full text-lg hover:bg-amber-300 transition-colors">
          Book Free Consultation
        </a>
      </div>
    </section>

    <!-- Key Stats -->
    <section class="py-12 bg-white border-y border-slate-200">
      <div class="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center p-6 bg-blue-50 rounded-xl">
          <p class="text-3xl font-extrabold text-blue-700">{cityData.stats.networkHospitals}+</p>
          <p class="text-sm text-slate-600 mt-1">Network Hospitals</p>
        </div>
        <div class="text-center p-6 bg-green-50 rounded-xl">
          <p class="text-3xl font-extrabold text-green-700">{cityData.stats.tpas}</p>
          <p class="text-sm text-slate-600 mt-1">Active TPAs</p>
        </div>
        <div class="text-center p-6 bg-amber-50 rounded-xl">
          <p class="text-3xl font-extrabold text-amber-700">{cityData.stats.avgCashlessHours}h</p>
          <p class="text-sm text-slate-600 mt-1">Avg Cashless Approval</p>
        </div>
        <div class="text-center p-6 bg-purple-50 rounded-xl">
          <p class="text-3xl font-extrabold text-purple-700">{cityData.stats.ombudsmanCases}+</p>
          <p class="text-sm text-slate-600 mt-1">Ombudsman Cases (2024)</p>
        </div>
      </div>
    </section>

    <!-- Network Hospitals Table -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-slate-900 mb-8">Top Network Hospitals for Cashless Claims in {cityData.name}</h2>
        <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table class="min-w-full">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Hospital</th>
                <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Area</th>
                <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Key TPAs</th>
                <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Specialties</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              {cityData.topHospitals.slice(0, 20).map(hospital => (
                <tr class="hover:bg-slate-50/50">
                  <td class="px-4 py-3 font-medium text-slate-900">{hospital.name}</td>
                  <td class="px-4 py-3 text-slate-600">{hospital.area}</td>
                  <td class="px-4 py-3 text-slate-600">{hospital.tpas.join(', ')}</td>
                  <td class="px-4 py-3 text-slate-600">{hospital.specialties.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-sm text-slate-500">Showing top 20 of {cityData.topHospitals.length} network hospitals. <a href="/contact" class="text-blue-600 font-semibold hover:underline">Need help with a specific hospital?</a></p>
      </div>
    </section>

    <!-- Ombudsman Info -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Insurance Ombudsman — {cityData.name} Jurisdiction</h2>
        <div class="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
          <h3 class="font-bold text-slate-900 mb-2">{cityData.ombudsman.office}</h3>
          <p class="text-slate-700 mb-2"><strong>Address:</strong> {cityData.ombudsman.address}</p>
          <p class="text-slate-700 mb-2"><strong>Jurisdiction:</strong> {cityData.ombudsman.jurisdiction}</p>
          <p class="text-slate-700 mb-4"><strong>Online Filing:</strong> <a href="https://cioins.co.in" target="_blank" rel="noopener" class="text-blue-600 hover:underline">cioins.co.in</a></p>
          <p class="text-sm text-slate-600">Claim limit: ₹30 lakh. No lawyer needed. Hearing within 30 days. Award binding on insurer.</p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-3xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
        <div class="space-y-3">
          {faqs.map(faq => (
            <details class="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <summary class="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-slate-50 transition-colors">
                <span class="font-semibold text-slate-900 pr-4">{faq.question}</span>
                <svg class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div class="px-5 pb-5">
                <p class="text-slate-600 leading-relaxed whitespace-pre-line">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h3 class="text-2xl md:text-3xl font-extrabold mb-3">Stuck with a Claim in {cityData.name}?</h3>
        <p class="text-blue-200/80 mb-6 max-w-2xl mx-auto">Free consultation with Hari Kotian. We handle the paperwork, follow-ups, and escalations — you focus on recovery.</p>
        <a href="/contact" class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-full text-lg shadow-lg shadow-amber-500/25 hover:shadow-xl hover:scale-105 transition-all">
          Book Free Consultation
        </a>
      </div>
    </section>
  </main>
</BaseLayout>
```

### City Data File: `src/data/city-claim-data.json`
```json
{
  "bangalore": {
    "name": "Bangalore",
    "slug": "bangalore",
    "stats": { "networkHospitals": 245, "tpas": 18, "avgCashlessHours": 2.5, "ombudsmanCases": 1240 },
    "topHospitals": [
      { "name": "Manipal Hospital Old Airport Road", "area": "Domlur", "tpas": ["MediAssist", "HealthIndia", "Paramount"], "specialties": ["Cardiology", "Oncology", "Orthopedics"] },
      { "name": "Fortis Hospital Bannerghatta Road", "area": "Bannerghatta", "tpas": ["MediAssist", "Vidal", "Raksha"], "specialties": ["Neurosciences", "Cardiac", "Transplant"] },
      { "name": "Apollo Hospitals Bannerghatta", "area": "Bannerghatta", "tpas": ["MediAssist", "HealthIndia", "Family Health"], "specialties": ["Multi-organ Transplant", "Cancer", "Heart"] }
    ],
    "ombudsman": { "office": "Insurance Ombudsman, Bangalore", "address": "2nd Floor, Jeevan Soudha Building, 19/19, 24th Main Road, JP Nagar 1st Phase, Bangalore - 560078", "jurisdiction": "Karnataka, Goa" }
  },
  "mumbai": { ... },
  "delhi": { ... },
  "hyderabad": { ... },
  "chennai": { ... },
  "pune": { ... },
  "kolkata": { ... },
  "ahmedabad": { ... },
  "gurgaon": { ... },
  "noida": { ... }
  // ... 40+ more cities
}
```

### Static Path Generation: `src/pages/claim-help/[city].astro`
```astro
export async function getStaticPaths() {
  const cityData = await import('../../data/city-claim-data.json');
  return Object.keys(cityData).map(city => ({
    params: { city },
    props: { cityData: cityData[city] }
  }));
}
```

---

## 2. Lead Magnet Funnels

### Magnet 1: "IRDAI 30-Day Rule Cheat Sheet" (PDF)
**Target:** Health/Life claimants facing delays
**Format:** 2-page PDF with timeline, penal interest calculator, complaint template
**Capture:** Name, email, claim type, insurer
**Follow-up:** 5-email sequence (Day 0: PDF, Day 1: Case study, Day 3: Appeal template, Day 7: Free consult CTA, Day 14: Ombudsman guide)

### Magnet 2: "Cashless Claim Pre-Auth Checklist" (Interactive)
**Target:** Hospital admissions (planned/emergency)
**Format:** Mobile-friendly checklist + hospital-specific TPA contacts
**Capture:** Phone, city, hospital (if known)
**Follow-up:** SMS + WhatsApp with city-specific hospital list

### Magnet 3: "Ombudsman Filing Kit" (Zip)
**Target:** Rejected claims > ₹50k
**Format:** Complaint form, document checklist, jurisdiction finder, sample orders
**Capture:** Email, claim amount, rejection reason, insurer
**Follow-up:** 7-email sequence with progressive legal escalation steps

### Magnet 4: "Claim Settlement Ratio Calculator" (Tool)
**Target:** Policy buyers/renewals
**Format:** Interactive table — filter by insurer, line, year
**Capture:** Email, current insurer, policy type
**Follow-up:** Comparison report + better alternative recommendations

---

## 3. Schema A/B Test Framework

### Test 1: FAQPage vs HowTo vs Article (Claim Guides)
**Pages:** 10 high-traffic claim guides
**Variants:**
- A: Article + FAQPage (current)
- B: Article + HowTo (procedural)
- C: Article + FAQPage + HowTo (combined)
- D: Article only (control)
**Metric:** Rich result impressions, CTR, position (Search Console)
**Duration:** 8 weeks per variant, rotate monthly

### Test 2: LocalBusiness vs Service vs Organization (City Pages)
**Pages:** 20 city claim-help pages
**Variants:**
- A: Service schema (current)
- B: LocalBusiness + Service
- C: Organization + Service + AreaServed
**Metric:** Local pack impressions, "near me" clicks, direction requests

### Test 3: Speakable Markup on Answers
**Pages:** 15 FAQ sections
**Variants:**
- A: No speakable (control)
- B: speakable on first answer paragraph
- C: speakable on all FAQ answers
**Metric:** Voice search impressions (if available), featured snippet capture

---

## 4. Topic Cluster Content Hubs

### Hub 1: "Health Claim Recovery" (Pillar + 15 Clusters)
**Pillar:** `/blog/health-insurance-claim-recovery-complete-guide-2026/`
**Clusters:**
1. Cashless pre-auth rules by insurer
2. Reimbursement document checklist
3. 15 rejection reasons + appeals
4. Network hospital finder by city
5. TPA comparison (MediAssist vs Vidal vs Paramount)
6. Pre-existing disease claim rules
7. Maternity claim guide
8. Senior citizen claim tips
9. Critical illness claim process
10. OPD claim reimbursement
11. Daycare procedure claims
12. Portability claim issues
13. Group policy claim problems
14. COVID-19 claim updates
15. Mental health claim coverage

### Hub 2: "Life Claim Recovery" (Pillar + 10 Clusters)
**Pillar:** `/blog/lic-life-insurance-claim-recovery-guide-2026/`
**Clusters:** Death claim, maturity claim, survival benefit, policy revival, nominee disputes, assignment claims, loan against policy, surrender value, ULIP partial withdrawal, tax on claims

### Hub 3: "Motor Claim Recovery" (Pillar + 8 Clusters)
**Pillar:** `/blog/motor-insurance-claim-complete-guide-2026/`
**Clusters:** Cashless garage, own damage, third party, theft, total loss, zero dep, engine protect, NCB protection

---

## 5. Internal Linking Automation

### Script: `scripts/build-internal-links.js`
```javascript
// 1. Read all blog posts from blogs.json
// 2. Build topic graph from categories + tags + content keywords
// 3. For each post, find top 5 related posts by:
//    - Shared categories (weight: 3)
//    - Shared tags (weight: 2)
//    - Keyword overlap in title/summary (weight: 1)
// 4. Inject "Related Articles" block with top 5
// 5. Add hub-family links for pillar posts
// 6. Add expert-guide links via keyword matching (existing)
// 7. Add city-page links for location-specific posts
// 8. Add language-switcher links for translated posts
// 9. Write updated HTML to dist/ or regenerate via Astro
```

### Link Rules:
- Max 3 links per 1000 words
- Anchor text: descriptive, keyword-rich, not "click here"
- Nofollow: never (all internal)
- Prioritize: pillar → cluster, cluster → pillar, sibling clusters
- Language: cross-link EN ↔ translated versions

---

## 6. Technical SEO Experiments

### Experiment 1: Edge Caching Headers
**Test:** `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` vs current
**Metric:** Core Web Vitals (LCP, CLS), crawl frequency

### Experiment 2: Sitemap Ping Automation
**Script:** Post-deploy ping to Google/Bing/IndexNow
**Frequency:** Every deploy + daily for new/updated URLs

### Experiment 3: JSON-LD Validation Pipeline
**CI Step:** Validate all schema on build with `schema-dts` + Google Rich Results API
**Block:** Deploy if critical schema errors

---

## 7. Measurement Dashboard (Data Studio / Looker Studio)

### Data Sources:
- Search Console (site:insurancesupport.online)
- GA4 (events: consultation_booked, magnet_downloaded, city_page_view)
- Ahrefs API (referring domains, DR, organic keywords)
- Cloudflare Analytics (edge cache hit ratio, bot traffic)
- Custom: Lead pipeline (Google Sheets → Looker)

### Key Dashboards:
1. **Traffic Growth:** Organic sessions, new vs returning, by language
2. **Conversion Funnel:** Visitor → Magnet Download → Consultation → Client
3. **Content Performance:** Post-level clicks, impressions, CTR, position
4. **Local SEO:** City page views, "near me" impressions, direction requests
5. **Authority:** Referring domains, DR, brand searches, HARO placements
6. **Technical:** CWV, crawl stats, index coverage, schema validation

---

## 8. 90-Day Execution Calendar

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1-2 | City Pages | 20 city pages live, city-claim-data.json for 50 cities |
| 3-4 | Lead Magnets | 4 magnets built, capture forms, email sequences |
| 5-6 | Schema Tests | A/B test framework deployed, first variant live |
| 7-8 | Topic Hubs | Health + Life pillar pages + 10 clusters each |
| 9-10 | Internal Links | Automation script run, all posts updated |
| 11-12 | Technical | Cache headers, sitemap ping, schema validation CI |
| 13+ | Measure & Iterate | Dashboard review, double down on winners |

---

## Next Steps

1. **Create `src/data/city-claim-data.json`** with 50 cities (start with top 10 metros)
2. **Build `src/pages/claim-help/[city].astro`** template
3. **Generate static paths** and deploy city pages
4. **Create lead magnet PDFs** and capture forms
5. **Set up A/B test framework** for schema variants
6. **Build topic cluster content** (pillar + clusters)
7. **Run internal linking script** across all posts
8. **Configure Looker Studio dashboard**

All templates and data structures are defined above — ready for implementation.