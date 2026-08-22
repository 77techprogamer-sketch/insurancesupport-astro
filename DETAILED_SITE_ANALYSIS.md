# Detailed Site Analysis: insurancesupport.online

## Executive Summary

**Site:** insurancesupport.online
**Technology:** Astro 4 + TypeScript + Tailwind + React
**Hosting:** Cloudflare Pages
**Purpose:** Insurance advisory services, claim recovery, policy review
**Author:** Hari Kotian (IRDAI Reg: 0149161D), 25+ years experience, Bangalore/Koramangala

---

## 1. Technical SEO & Indexability Analysis

### Current Status: ✅ GOOD

| Item | Status | Details |
|------|--------|---------|
| HTTPS/HTTPS | ✅ Configured | HSTS preload ready, www→non-www canonical redirects |
| robots.txt | ✅ Optimized | AI bots welcome (GPTBot, ClaudeBot, PerplexityBot, etc.) |
| IndexNow | ✅ Active | Key: 71a80a3568ae5d1d945fda3ef57fe18e (needs Bing verification) |
| CSP Headers | ✅ Hardened | `upgrade-insecure-requests` removed, script-src whitelisted |
| Core Headers | ✅ Security | HSTS, nosniff, XSS Protection, Referrer-Policy configured |
| Sitemap | ✅ Structured | 15 service-specific sitemaps + blog + locations + core |

**Issues Identified:**
- `msvalidate.01` meta tag is commented out in BaseLayout (needs Bing Webmaster verification)
- CSP still has `'unsafe-inline'` for styles (could be optimized with nonces)

---

## 2. Content Quality Analysis

### Page Counts (as of analysis)
- **Total Pages Built:** 47 location pages + 71 blog posts + 14 service pages = **132+** pages
- **Homepage:** Rich with trust indicators (4.2★ Google rating, 23 reviews, ₹50Cr+ recovered)
- **Service Pages:** Comprehensive with FAQs, benefits, CTA sections

### Content Depth Assessment

| Content Type | Count | Avg Length | Quality Score (1-10) | Notes |
|--------------|-------|------------|---------------------|-------|
| Blog Posts | 71 | 1,200-2,500 words | 9/10 | Data-rich, IRDAI-cited, FAQ sections |
| Service Pages | 14 | 1,500-3,000 words | 9/10 | Comprehensive guides with tables, CTAs |
| Location Pages | 47 | 800-1,200 words | 7/10 | Good but could be more unique per city |
| Homepage | 1 | ~500 words displayed | 8/10 | Strong CTA focus, could expand hero section |

### E-E-A-T Signals

| Element | Status | Assessment |
|---------|--------|------------|
| Expertise | ✅ Visible | 25+ years, IRDAI certified, visible in content |
| Experience | ✅ Strong | ₹50Cr+ claim recovery, 1000+ families served |
| Authoritativeness | ✅ Good | IRDAI Reg No, Google reviews, Trust Badges |
| Trustworthiness | ✅ Excellent | Clear contact, WhatsApp integration, CTAs |

**Missing:**
- Author byline with credentials on individual blog posts
- About page needs more personal story/details

---

## 3. Technical Performance Analysis

### Core Web Vitals (Estimated based on Astro + Cloudflare)

| Metric | Target | Expected | Notes |
|--------|--------|----------|-------|
| LCP | <2.5s | ~1.8s | Astro static + Cloudflare CDN |
| CLS | <0.1 | ~0.02 | Minimal layout shift |
| FID | <100ms | ~20ms | Static HTML delivery |

### Optimization Status: ✅ EXCELLENT

- Images: Optimized with lazy loading (`loading="lazy"`)
- CSS: Tailwind, purge configured
- JS: Client:visible only where needed
- Fonts: Preconnect + preload configured
- Assets: Hashed, immutable caching (1 year)

**Missing:**
- Image optimization for large hero images
- Critical CSS inlining for above-fold content

---

## 4. Site Architecture & Internal Linking

### URL Structure
```
/
/blog/[slug]           - 71 posts
/services/[slug]       - 14 services
/locations/[slug]      - 47 cities
/case-studies/[slug]   - Case studies
/about
/contact
/faq
```

### Internal Linking Analysis

| Section | Internal Links | Quality |
|---------|---------------|---------|
| Service Pages | 8-12 per page | ✅ Strong |
| Blog Posts | 3-5 per post | ✅ Good |
| Location Pages | 4-6 per page | ⚠️ Could improve cross-linking |
| Homepage | 15+ CTAs | ✅ Excellent |

**Opportunities:**
- Add "Related Locations" linking to nearby cities
- Cross-link similar service pages (e.g., Term Insurance ↔ Life Insurance)

---

## 5. Conversion Rate Optimization

### Current CTR Elements: ✅ Strong

| Element | Status | Notes |
|---------|--------|-------|
| Floating CTA | ✅ Active | Bottom-right, intent-based timing |
| WhatsApp Widget | ✅ Active | Click-to-chat for immediate contact |
| Phone Number | ✅ Visible | E.164 format, clearly displayed |
| Trust Counter | ✅ Active | "₹50 Cr+ Recovered" social proof |
| IRDAI Badge | ✅ Visible | Regulatory compliance shown |

### Lead Magnets Analysis

| Asset | Type | Status |
|-------|------|--------|
| Insurance Calculator | Tool | ✅ Active (client:visible) |
| Claim Rejection Quiz | Interactive | ✅ Active |
| Newsletter | Form | ✅ Active |
| Free Consultation | Primary CTA | ✅ Consistent |

---

## 6. Content Strategy & Differentiation

### Content Themes Identified

**Primary Categories (from blogs.json):**
1. IRDAI Regulatory Guidance
2. Claim Rejection & Recovery
3. Policy Comparison Guides
4. Tax & Investment Planning
5. Health Insurance Deep Dives

### Keyword Opportunities

| Keyword Cluster | Competition | Opportunity |
|-----------------|-------------|-------------|
| "insurance claim rejection" | Medium | ✅ High intent |
| "LIC vs Private" | High | ⚠️ Competitive |
| "IRDAI grievance" | Low | ✅ Niche authority |
| "term insurance Bangalore" | Medium | ✅ Local opportunity |

---

## 7. Schema & Structured Data

### Current Schema Implementation: ✅ GOOD

| Schema Type | Status | Notes |
|-------------|--------|-------|
| LocalBusiness | ✅ Active | Added to all pages |
| Article | ✅ Active | Blog posts |
| FAQPage | ✅ Active | FAQ sections |
| Breadcrumb | ✅ Active | Navigation breadcrumbs |
| Organization | ✅ Active | BaseLayout |
| WebSite | ✅ Active | BaseLayout |

**Missing:**
- Review schema (Google Reviews)
- Person schema for Hari Kotian
- Product schema for calculators

---

## 8. Backlink Profile Concerns

### Existing Issues (from audit):

| Issue | Resolution | Status |
|-------|------------|--------|
| Spam directories | disavow.txt created | ✅ Fixed |
| Keyword cannibalization | 42 thin posts pruned | ✅ Fixed |
| Low backlink diversity | Need outreach | ⚠️ Pending |

---

## Recommendations

### Priority 1: Quick Wins (1-2 weeks)

1. **Bing Verification**
   - Get msvalidate.01 verified in Bing Webmaster Tools
   - Add the meta tag to BaseLayout

2. **Author Schema**
   - Add Person schema for Hari Kotian with IRDAI credentials
   - Include on About page and author bylines

3. **Review Schema**
   - Add aggregateRating schema from Google reviews
   - Use reviewCount: 23, ratingValue: 4.2

### Priority 2: Medium-term (1-2 months)

4. **Location Page Enhancement**
   - Make each location page more unique with local landmarks
   - Add "nearby locations" linking

5. **Image Optimization**
   - Convert hero images to WebP
   - Add lazy loading to gallery images

6. **Content Gap: Insurance Calculators**
   - Add interactive calculators that generate content
   - LIC premium calculator, health insurance need calculator

### Priority 3: Long-term Strategy (3-6 months)

7. **Schema Expansion**
   - Product schema for insurance calculators
   - Course schema if adding educational content

8. **Video Content**
   - Add video testimonials
   - Record quick explainer videos for popular topics

---

## Integration with wshobson/agents Plugins

We've prepared 3 plugins from wshobson/agents (39K stars) for your workflow:

### Installed Plugins in ~/.hermes/skills/

| Plugin | Use Case | Recommendation |
|--------|----------|----------------|
| `seo-content-creation` | Content planning & auditing | ✅ Use for new blog posts |
| `debugging-toolkit` | Site debugging & optimization | ✅ Use for performance issues |
| `web-scripting` | Web automation | ⚠️ Limited agent content here |

### Other Relevant wshobson Plugins (not installed)

For your insurance site work:
- `content-marketing` - Content strategy and planning
- `seo-analysis-monitoring` - Ongoing SEO monitoring
- `seo-technical-optimization` - Technical SEO audits
- `social-publishing` - Social media for lead gen (manual only per your requirements)

---

## Files Analyzed

- `/src/pages/index.astro` - Homepage
- `/src/pages/services/[slug].astro` - Service pages
- `/src/pages/blog/[slug].astro` - Blog posts
- `/src/data/services.json` - 14 services with content
- `/src/data/blogs.json` - 71 blog posts with metadata
- `/src/data/areas.ts` - 47 location areas
- `/public/_headers` - Security headers
- `/public/robots.txt` - AI bot configuration
- `/public/sitemap-index.xml` - 15 sitemaps

---

*Analysis performed using installed wshobson/agents SEO plugins. Content quality assessed against E-E-A-T best practices for insurance advisory services.*