# Phase 2: Multilingual Content & Keywords — COMPLETE

## Deliverables Created

### 1. Keyword Maps
**File:** `phase2_claim_keywords_multilingual.json`
- 28 high-intent claim terms mapped to 9 Indian languages
- Ready for title tags, H1/H2, meta descriptions, FAQ schema, internal links

### 2. Execution Plan
**File:** `PHASE2_EXECUTION_PLAN.md`
- Priority 1: 9 posts with zero translations → create all 9 languages
- Priority 2: 66 posts missing Punjabi → create pa versions
- Content gaps: 5 categories (IRDAI 30-day rules, cashless appeals, ombudsman cities, CSR tables, product guides)
- Internal linking structure for claim topic clusters

### 3. Translation Task List
**File:** `phase2_translation_tasks.json`
- Detailed list of 75 Punjabi translations needed
- 9 posts needing full 9-language sets

### 4. Robust Translation Script
**File:** `scripts/generate-translations-v2.py`
Supports multiple backends:
- `googletrans` — free, but broken on Python 3.14 (cgi module removed)
- `deep_translator_google` — Google Cloud Translation API (requires API key)
- `deep_translator_deepl` — DeepL API (requires API key)
- `libretranslate` — LibreTranslate (public instance unreliable)

## How to Run Translations

### Option A: Google Cloud Translation (Recommended)
```bash
# 1. Enable Cloud Translation API in Google Cloud Console
# 2. Create API key (or use service account)
# 3. Run with your API key:
python scripts/generate-translations-v2.py \
  --backend deep_translator_google \
  --api-key "YOUR_GOOGLE_CLOUD_API_KEY" \
  --resume
```

### Option B: DeepL API
```bash
# 1. Get DeepL API key (free tier: 500k chars/month)
# 2. Run:
python scripts/generate-translations-v2.py \
  --backend deep_translator_deepl \
  --api-key "YOUR_DEEPL_API_KEY" \
  --resume
```

### Option C: Run in Batches (for rate limits)
```bash
# Priority 1: 9 zero-translation posts, all 9 languages
python scripts/generate-translations-v2.py \
  --backend deep_translator_google \
  --api-key "YOUR_KEY" \
  --post-slugs "irdai-complete-guide-policyholders-india-2026,best-health-insurance-for-parents-above-60-india-2026,insurance-ombudsman-india-guide,irdai-complaint-toolkit-2026,lic-claim-rejection-appeal-process-2026,icici-lombard-cashless-denied-hospital-guide-2026,care-health-claim-settlement-ratio-2026,insurance-ombudsman-bangalore-guide-2026,irdai-bima-bharosa-complaint-filing-2026"

# Priority 2: Top 10 claim-intent posts, Punjabi only
python scripts/generate-translations-v2.py \
  --backend deep_translator_google \
  --api-key "YOUR_KEY" \
  --languages pa \
  --post-slugs "lic-policy-hub-complete-guide-2026,health-insurance-hub-complete-2026-guide,claim-recovery-hub-complete-2026-guide,term-insurance-comparison-hub-2026,insurance-claim-rejection-rate-india-2026-data,motor-insurance-claim-process-guide-2026,irdai-grievance-process-complaint-guide-2026,health-insurance-claim-rejection-rights-2026,lic-policy-revival-complete-guide-2026,how-to-appeal-rejected-insurance-claim-india-2026"

# Remaining 56 Punjabi posts
python scripts/generate-translations-v2.py \
  --backend deep_translator_google \
  --api-key "YOUR_KEY" \
  --languages pa \
  --resume
```

## After Translations

1. **Regenerate sitemap:**
   ```bash
   node scripts/generate-sitemap.js
   ```

2. **Build & deploy:**
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name=insurancesupport-online
   ```

3. **Verify live:**
   ```bash
   curl -s "https://insurancesupport.online/blog/pa/bike-insurance-engine-protection-cover-guide-2026/" | grep -E 'lang="pa-IN"|hreflang.*pa-IN|inLanguage.*pa-IN'
   ```

## Content Gaps to Create Next (Phase 2 Continuation)

| Gap | Pages | Template |
|-----|-------|----------|
| IRDAI 30-day rule per insurer | 5 | Compare template |
| Cashless denial appeals per insurer+city | 5×5=25 | Appeal template |
| Ombudsman jurisdiction per city | 15 | Location template |
| Claim settlement ratio tables | 10 | Data template |
| Product-specific claim guides | 6 | Product template |

**Total new pages to create: ~51**

Each should:
- Use claim keyword maps for local-language SEO
- Include FAQPage schema with local-language questions
- Cross-link to claim hub and related guides
- Add to sitemap and language switchers

## Next Phase (Phase 3): AEO/GEO AI-Citation Optimization
- Add FAQPage schema to all claim guides
- Implement speakable markup for key answers
- Create llms.txt for AI crawlers
- Optimize for AI Overview / Perplexity citations
- Structured data for "How to file claim" procedures