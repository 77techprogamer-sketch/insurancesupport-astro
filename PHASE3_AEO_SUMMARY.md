# Phase 3: AEO/GEO AI-Citation Optimization — COMPLETE

## Deliverables Created

### 1. AEO Templates
**File:** `phase3_aeo_templates.json`
- FAQPage schema template with 5 high-value claim questions
- Speakable schema for voice/AI answer extraction
- AI citation patterns checklist

### 2. FAQ Schema Component (Already Exists)
**File:** `src/components/FAQPageJsonLd.astro`
- Already implemented, used in blog posts
- Parses `## FAQ` sections from markdown

### 3. HowTo Schema Component (Already Exists)
**File:** `src/components/HowToJsonLd.astro`
- For step-by-step claim procedures

### 4. Blog Post Integration (Already Working)
**File:** `src/pages/blog/[slug].astro` (lines 141-152, 219, 377-396)
- Auto-parses FAQ from markdown `## FAQ` sections
- Injects FAQPageJsonLd component
- Renders collapsible FAQ UI with schema

---

## Phase 3 Action Items

### A. Add FAQ Content to All Claim Guides
Each claim guide needs a `## FAQ` section in its markdown content:

```markdown
## FAQ

**Q: How do I file a cashless health insurance claim in India?**
To file a cashless health insurance claim: 1) Get admitted to a network hospital...

**Q: What is the IRDAI 30-day claim settlement rule?**
IRDAI mandates insurers must settle or reject claims within 30 days...
```

### B. Add Speakable Markup to Key Answers
Add CSS classes to answer paragraphs for AI extraction:

```astro
<div class="speakable key-takeaway">
  <p class="claim-answer">Direct answer in first paragraph (40-60 words)</p>
</div>
```

### C. Create `llms.txt` for AI Crawlers
**File to create:** `public/llms.txt`

```
# Insurance Support — Insurance Claim Guides India
> Authoritative insurance claim guidance for Indian policyholders by Hari Kotian (IRDAI Reg. 0149161D)

## Core Claim Guides
- [How to File a Health Insurance Claim](/blog/how-to-file-health-insurance-claim-india-2026/)
- [IRDAI 30-Day Claim Settlement Rule](/blog/irdai-complete-guide-policyholders-india-2026/)
- [Appeal a Rejected Insurance Claim](/blog/how-to-appeal-rejected-insurance-claim-india-2026/)
- [Insurance Ombudsman Filing Guide](/blog/insurance-ombudsman-india-guide/)

## Insurer-Specific Guides
- [LIC Claim Rejection Appeal](/blog/lic-claim-rejection-appeal-process-2026/)
- [ICICI Lombard Cashless Denied](/blog/icici-lombard-cashless-denied-hospital-guide-2026/)
- [Care Health Claim Settlement Ratio](/blog/care-health-claim-settlement-ratio-2026/)

## By Topic
- Cashless Claims: [Pre-auth Rules](/blog/irdai-cashless-claim-pre-authorization-approval-rejection-rules-2026/), [Cashless Denied at Hospital](/blog/cashless-health-insurance-claim-denied-hospital-2026/)
- Claim Rejection: [15 Real Reasons](/blog/health-insurance-claim-rejection-15-real-reasons-how-to-prevent-appeal-each-one-2026/), [Rejection Rights](/blog/health-insurance-claim-rejection-rights-2026/)
- Grievances: [IRDAI Grievance Process](/blog/irdai-grievance-process-complaint-guide-2026/), [Bima Bharosa vs IGMS](/blog/irdai-bima-bharosa-complaint-filing-2026/)
- Regional: [Ombudsman Bangalore](/blog/insurance-ombudsman-bangalore-guide-2026/)

## Author
Hari Kotian — Insurance Advisor (LIC, ICICI Lombard, Care Health) | Bengaluru | IRDAI 0149161D
```

### D. Add Speakable CSS Classes to BaseLayout
```css
/* Add to global styles */
.speakable .claim-answer,
.speakable .key-takeaway,
.speakable .quick-answer {
  /* These sections marked for AI/voice extraction */
}
```

---

## Verification Checklist

- [ ] FAQ sections added to all 9 priority claim guides
- [ ] FAQPage schema renders on each (verify with schema.org validator)
- [ ] Speakable CSS classes on direct answers
- [ ] `llms.txt` deployed at `/llms.txt`
- [ ] HowTo schema on procedural guides (claim filing, appeal, complaint)
- [ ] Article schema `dateModified` updated on all posts
- [ ] Author Person schema with IRDAI credentials on all posts

---

## Next Phase: Phase 4 (Authority Building + Growth Experiments)

Ready to proceed with:
1. Digital PR pitch templates for insurance topics
2. Local citation building (Justdial, Sulekha, Insurance directories)
3. Expert roundups with other advisors
4. HARO/SourceBottle monitoring for insurance queries
5. Partnership content with hospitals/TPAs