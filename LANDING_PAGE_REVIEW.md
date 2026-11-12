# Landing page review — insurancesupport.online

**Reviewed:** 12 November 2026 · homepage (`/`), plus the lead-magnet pages it feeds
**Build reviewed:** current branch (not yet deployed — live site still serves the older build)

---

## Verdict

The message is strong and the structure is right: a specific promise in the H1
(*"Your claim was rejected. That is not the final word."*), one dominant action
(WhatsApp), a five-step process, an insurer list with a fair disclaimer, and honest
FAQ answers. Most advisor sites in this market are worse.

But one of its four conversion features was **completely broken**, one had been
degraded by my own earlier fixes, and the page asks for a phone call or a WhatsApp
message in 11 places while offering **no form at all**. All three are now fixed.

| | Before | After |
|---|---|---|
| Quiz questions rendered | **0** | 5 |
| Quiz answer options rendered | **0** (5 empty dropdowns) | 25 |
| Lead forms on the page | 0 | 2 (quiz + callback) |
| Title length / quality | 55, brand-first and generic | 56, claim-intent first |
| Score could exceed | 100% | capped at 100 |
| Outcome claims | "chances of appeal are promising" | grounds described, explicit disclaimer |

---

## 1. The quiz was empty — the biggest defect on the page

The homepage and `/support/` both feature *"Quick quiz: How strong is your claim
appeal?"* with five numbered cards. In the shipped HTML:

```html
<span class="text-secondary"><!-- question text injected via JS --></span>
<select id="q1" name="q1" required><option value="">Select...</option></select>
```

No question text. No options. Five empty dropdowns under five empty boxes — and the
"inject via JS" that the comment promises does not exist anywhere in the codebase.
Anyone who reached it saw a broken widget, on the page's most interactive element,
mid-scroll on mobile.

It also would never have produced a score: the script reads `insurer`, `policyType`,
`rejectionReason`, `claimAmount`, `rejectionDate`, and the form had none of them.

**Fixed.** The questions and all 25 options now render server-side (listed in
`src/components/ClaimRejectionQuiz.astro`), so the quiz works without JavaScript for
display, is indexable, and is screen-reader friendly.

## 2. The score over-promised

The old scoring could reach 110%, and told people *"High potential for successful
appeal! Your case has strong grounds"* — a performance claim an IRDAI-regulated
intermediary should not make to a stranger who answered five dropdowns.

**Fixed.** Capped at 100, wording moved from *outcome* to *grounds* ("Strong grounds to
review: the rejection reason, the policy type and the timing all work in your favour"),
plus a line under the result: *"This is an indication based on your answers, not a
prediction or a guarantee."*

## 3. The page had no form

The homepage offers WhatsApp (6 links) and `tel:` (5 links). Both are right for this
market — but a desktop visitor without WhatsApp Web, or anyone who will not call a
stranger, had no lower-commitment option. The exit-intent modal I added last round is
deliberately suppressed on the homepage, which left the highest-traffic page with the
fewest capture paths.

**Fixed.** A two-field callback form now sits under the final CTA
(`source="homepage:cta"`), alongside the existing buttons rather than replacing them.

## 4. My title clamp had made the homepage worse

The original title was 82 characters — too long, correctly trimmed. But the automatic
clamp left `Insurance Support | Insurance Claim Help & Advisory`: brand-first, and
missing both the emotional hook and "IRDAI". For a homepage that is a downgrade.

**Fixed** with a written override: **"Insurance Claim Rejected? Free Review by an IRDAI
Advisor"** (56). The query is a person's problem, not your company name.

## 5. A contradiction I introduced

The homepage FAQ says fees are *"typically a percentage of recovered amount or a fixed
fee agreed upfront."* My new comparison page said fees are *"never as a percentage of
the claim."* Two pages, opposite claims.

I aligned **my** page to neutral wording (*"agreed in writing before work starts"*).
Your homepage line is a business and compliance decision, not mine to make — see below.

---

## What I did not change, and why you should look at it

### A. The GST strip is the first thing on the page
`src/components/Header.astro` opens with *"GST treatment depends on the insurance product
and policy type. Check current GST Council guidance"* — linking **off-site to
gstcouncil.gov.in** as the first link on your site, above your logo and your promise.

It is a compliance hedge that costs you the first second of attention. Move it into the
footer or into the relevant policy pages, and keep the hero for the claim.

### B. There is no photograph of Hari — anywhere
Zero `<img>` tags on the homepage; 44 icons. For a practice sold on one person's
25 years of experience, a face is worth more than any headline on the page. A single
real photo (and one of the Bengaluru desk) would do more for trust than everything I
changed today. This needs an asset only you can supply.

### C. "We" and "our team" for a one-advisor practice
The copy alternates between "Hari Kotian", "we", and "our team". Pick one voice. If it
is Hari plus support staff, say that once, plainly — it reads as more credible than a
vague "team".

### D. The fee model needs a compliance check
Percentage-of-recovery fees on insurance claims sit in a grey area under IRDAI
remuneration rules, and several consumer forums treat them as undesirable. Whatever the
model, the site should state it in one sentence, consistently, on the page where the fee
is first mentioned. Worth a 20-minute call with your compliance contact before this
question is asked by a client instead.

### E. 50 links on the landing page
8 nav items, 6 utility links, 35 internal links, 5 `tel:` and 6 WhatsApp links. Every
one is an exit. If conversion matters more than browsing, the hero should carry two
actions and the nav should carry four.

### F. Script weight
14 scripts: GTM, GA4, Google Ads, Clarity, the Artibot chat widget, plus your own
bundles. On a mid-range Android over 4G this is the main threat to Core Web Vitals.
Consider loading the chat widget on first interaction rather than on load.

---

## Small things that are right, and worth keeping

- One `<h1>`, eight `<h2>`s — clean outline.
- Title 56 characters, description 147 — both inside SERP limits.
- No invented statistics: no "98% settlement rate", no "5,000 families". The
  testimonials are labelled *"Names changed on request"* with an explicit caveat.
- The insurer list carries *"No affiliation, partnership, or endorsement implied."*
- FAQ answers give real timelines (GRO 15–30 days, Bharosa 30–45, Ombudsman 3–6 months).
- 70 KB of HTML, no images, no render-blocking fonts in the critical path.
- Structured data: Organization, WebSite, Person, LocalBusiness, FAQPage, BreadcrumbList.

---

## What to do next, in order

1. **Deploy** — none of this is live; the live homepage still has the 82-character title
   and the empty quiz.
2. **Add the photo.** Highest-return single change on the page.
3. **Move the GST strip** to the footer.
4. **Test the quiz on your phone** after deploying — answer all five questions and check
   that the score, the callback form and the WhatsApp button all behave.
5. **Decide the fee sentence** with compliance, and use it verbatim everywhere.
