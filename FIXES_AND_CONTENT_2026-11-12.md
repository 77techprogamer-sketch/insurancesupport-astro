# What was broken, what was fixed, and the six new articles

Date: 12 November 2026 · Branch: `arena/45928666-insurancesupport-astro`
Commits: `fcf70f1` (fixes + content), `d6f4dec` (link repair + tools hub)

---

## 1. The things that were actually broken

### 1.1 Contact form was losing every enquiry — and saying it was sent

`functions/contact-submit.ts` inserted into `type`, `category`, `message`, `timestamp`. The real `leads` table has `lead_type`, `source`, `created_at` and no `message`/`category` columns at all. Every insert threw, the error was swallowed in a `catch`, and the visitor still saw *"Your message has been sent successfully."*

So: **if `LEADS_KV` was not bound, the enquiry vanished.** If it was bound, the message existed only in a KV blob nobody reads.

Fixed: the function now self-heals the schema (CREATE TABLE IF NOT EXISTS + ALTER for the new columns), writes to the same `leads` table `lead-capture.ts` uses, fires the webhook/Resend alert, and returns `success: false` with the WhatsApp fallback if *nothing* was stored. It no longer claims success it cannot verify.

`db/schema.sql` now carries `category`, `message` and `notified`.

> **Action for you:** bind `LEADS_DB` (D1) and, if you want an instant alert, set `LEAD_WEBHOOK_URL` or `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL`. Without either, the form will now honestly tell the visitor to WhatsApp.

### 1.2 The Ombudsman limit was wrong across the site and in the PDFs

We had **₹30 lakh** everywhere. The Insurance Ombudsman (Amendment) Rules, 2023 raised it to **₹50 lakh** (G.S.R. 828(E), in force since 9 November 2023). Corrected in:

- 8 places across 7 blog posts
- 3 lines in `scripts/generate_downloads.py` → regenerated `appeal-templates.pdf`, `irdai-regulations-summary.pdf`, `bangalore-ombudsman-checklist.pdf`

This one mattered: a policyholder with a ₹42 lakh dispute was being told to go to a consumer commission instead of the free Ombudsman.

### 1.3 2,695 broken internal links

Not a handful — a systemic problem from an earlier bulk-linking pass:

| What | Count | Example |
|---|---|---|
| Unbuilt absolute self-links | 186 distinct targets | `/locations/kerala/thrissur/life-insurance/`, `/resources/guides/*` |
| Nested markdown baked into URLs | widespread | `/blog/[insurance](/blog/x)-claim-rejection-rate-india-2026-data/` |
| Anchors cut at the domain | 347 | `<a href="https://insurancesupport.onlinea>` |

`scripts/fix_broken_internal_links.py` resolves every absolute self-link against the pages actually built: unwraps nested artifacts, walks up to the nearest existing ancestor (`/locations/kerala/thrissur/life-insurance/` → `/locations/`), maps `/resources/guides|faq/` to their hubs, and repairs the truncated anchors.

**Result: 186 → 16.** The residue is malformed HTML inside machine-translated duplicates (the `href` attribute itself swallows body text like `>50+ cities</li>`); repairing those means rewriting the corrupted translation, so they are left documented rather than butchered.

### 1.4 Smaller fixes

- **robots.txt** had two contradictory `Content-Signal` lines (`ai-input=no` at line 4, `ai-input=yes` at line 77). Now one line: `ai-train=no, search=yes, ai-input=yes`.
- **GST strip** removed from above the logo; the notice moved to the footer (it was the first thing on every page, and it linked off-site to the GST Council).
- **Zero images on the site.** The hero now carries an advisor card. Drop `public/images/hari-kotian.jpg` (or `.png`/`.webp`) and it renders the photo automatically; until then it falls back to an `HK` monogram so the layout never breaks.
- **Chat widget + Microsoft Clarity** now load on first interaction (or 10s idle) instead of competing with first paint.
- **Orphan pages: 5 → 0.** New footer links to `/compare/`, `/tools/`, `/search/`, `/get-started/`, `/loans/`; homepage CTA links `/get-started/`; the orphaned IRDAI guide is linked from the new award-enforcement article.
- **`/tools/` had no hub page.** Created `src/pages/tools/index.astro`.
- 4 missing `)`, `[` and typos fixed in article copy (`Askfor` → `Ask for`).

---

## 2. The six articles, and the competitor cue behind each

The competitors winning this space (Insurance Samadhan and the claim-guide cluster around righttoinformation.wiki, jurigram, vakilsearch) rank with a recognisable shape: **answer in the first paragraph, a table with the rule and the source, day-by-day steps, a copy-ready letter, FAQ at the end.** None of that is copyrightable; all of it is what the snippet picks.

Each article below takes a cue from them and adds the thing they mostly lack — the specific rule, quoted, with the date it was amended.

| Article | Competitor cue | Our angle |
|---|---|---|
| [`ombudsman-award-not-insurer-delay-2026`](https://insurancesupport.online/blog/ombudsman-award-not-paid-insurer-delay-2026/) | Ombudsman guides stop at "the award is binding" | **Rule 17(6): ₹5,000/day for every day the insurer sits on an award.** Nobody covers enforcement; this is the only page with the demand letter |
| [`repudiation-letter-phrases-decoded-2026`](https://insurancesupport.online/blog/repudiation-letter-phrases-decoded-2026/) | Competitors list "reasons for rejection" | **Decode the letter instead**: 10 standard phrases → what it alleges → what the insurer must prove → what answers it |
| [`section-45-insurance-act-three-year-rule-2026`](https://insurancesupport.online/blog/section-45-insurance-act-three-year-rule-2026/) | Everyone cites Section 45; most parrot the insurer's "fraud continues after 3 years" line | **The statute, the 2015 amendment, the revival clock**, and how to answer the three arguments insurers still make |
| [`interest-on-delayed-insurance-claim-settlement-2026`](https://insurancesupport.online/blog/interest-on-delayed-insurance-claim-settlement-2026/) | Guides say "claim within 30 days" and stop | **2% above bank rate, running from the last document — not from day 31.** Nobody computes it; we show the arithmetic |
| [`claim-recovery-agency-fees-india-2026`](https://insurancesupport.online/blog/claim-recovery-agency-fees-india-2026/) | Insurance Samadhan's model (₹500 + 12–15% + GST) is a top query; competitors never discuss their own fee | **All four fee models, the free statutory routes side by side, 10 questions before signing, red flags.** Catches the "claim agent fees / insurance samadhan charges" queries honestly |
| [`nri-insurance-claim-india-documents-payout-2026`](https://insurancesupport.online/blog/nri-insurance-claim-india-documents-payout-2026/) | Samadhan runs an NRI vertical; the site had none | **Apostille vs consulate attestation, NRO vs NRE payout, POA, filing from abroad** |

Each is 1,350–1,700 words, has a `## FAQ` block that renders as FAQPage schema (6 questions each), a source table, and internal links to the Ombudsman, Bima Bharosa and claim-recovery hubs. No invented statistics, no outcome promises, and the agency-fees piece says plainly when the honest answer is "do it yourself for free".

---

## 3. Numbers after the build

| Metric | Before | After |
|---|---|---|
| Blog posts | 603 | **609** |
| HTML pages | 843 | **850** |
| Sitemap URLs | 218 | **225** |
| Broken relative internal links | 0 | **0** |
| Broken absolute internal links | 186 | **16** (translated duplicates, documented) |
| Orphan pages | 5 | **0** |
| Titles over 60 chars | 0 | **0** |
| Pagefind words indexed | 102,060 | **101,882** |

---

## 4. Still needs you

1. **A photo of Hari.** `public/images/hari-kotian.jpg`. Highest-return single change on a page that currently has no face.
2. **Cloudflare bindings** — `LEADS_DB` (D1) and one alert channel, or enquiries will hit the honest-failure path.
3. **The fee statement.** The agency-fees article deliberately does not state what Insurance Support charges. Once you decide the model (flat fee vs percentage), one paragraph needs adding there — and the percentage-of-recovery question should be checked against IRDAI's remuneration rules before it is published anywhere.
4. **16 mangled links** inside machine-translated duplicates — worth a manual pass if those language variants matter to you.
5. **`/loans/`** is still an insurance-adjacent page with no topical support. It is linked now, but it is the weakest page on the site.
