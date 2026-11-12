# Capturing competitor demand — what is now live, and what to run next

**Date:** 12 November 2026 · branch `arena/45928666-insurancesupport-astro`

The premise: you do not win a lead because your page is better. You win it because
someone typed a query that reveals intent, landed on your page, and found a reason to
give you a phone number before they went back to the tab they came from. Everything
below is either shipped in this branch or is an off-site action only you can take.

---

## 1. Shipped in this branch

### Comparison pages — the direct competitor-capture surface

Three new pages target the moment a buyer is deciding *between models*, which is where
an independent advisor wins:

| URL | Query it is built for |
|---|---|
| `/compare/aggregator-vs-advisor/` | "aggregator vs advisor", "is buying insurance online better", "should I use an agent" |
| `/compare/lic-online-vs-agent/` | "LIC agent vs online", "buy LIC policy online" |
| `/compare/claim-lawyer-vs-advisor/` | "do I need a lawyer for a rejected claim", "insurance claim lawyer" |
| `/compare/` (new hub) | "insurance comparison India" — and it links every comparison, fixing an empty directory |

Each one is written to be *fair*: the aggregator is described as legitimate and often
the right choice for a commodity purchase. That is deliberate. Comparative pages that
sneer get bounced; pages that concede the other side's strength get read, and the
reader believes the part that matters — that you answer the phone at claim time.

The `/compare/` template now carries a two-field callback form above the closing CTA,
so a comparison reader who is halfway convinced can convert without leaving the page.

### A two-field callback form, everywhere it matters

`src/components/CallbackForm.astro` asks for a name and a mobile number, with an
optional preferred time. No email required, because a phone number is the conversion
currency for this business.

The same form is used in three places:

1. inline on every comparison page (`compare:<slug>` attribution)
2. inside the claim-rejection quiz result, where it silently attaches the five quiz
   answers to the lead (`leadType: "quiz"`)
3. inside the exit-intent prompt

### Exit-intent / deep-scroll capture

`LeadCaptureModal.astro` is mounted on blog posts, service pages, location pages, city
pages, comparison pages and FAQ pages. It fires on exit intent (desktop), 60% scroll,
or 45 seconds, whichever comes first. Then:

- it never shows twice in 14 days (localStorage)
- it retires permanently for that visitor the moment any form on the page converts
- it is suppressed entirely on contact, lead-form, search and homepage
- Esc closes it, focus moves into the first field, and it fires
  `lead_modal_shown` / `lead_modal_dismissed` / `generate_lead` to the dataLayer

### The lead pipeline no longer drops leads

This was the most expensive bug in the funnel. `functions/lead-capture.ts` used to:

- reject any slug outside a hardcoded list of five magnets — so every new offer,
  including the callback form, would have returned 400
- accept only `name + email`, with no phone-first path
- return `success: true` even when D1 and KV had both failed, so the lead vanished
  into Workers Logs while the visitor saw "thank you"

It now:

- handles `leadType: magnet | callback | quiz | contact` with per-type validation
  (callback needs name + phone; magnet needs name + email + a known slug)
- writes to D1 with a **self-healing schema** — if the table or a column is missing,
  it creates the table and retries once instead of losing the row
- keeps a 90-day KV buffer when that binding exists
- notifies you through `LEAD_WEBHOOK_URL` (any JSON webhook, e.g. a WhatsApp or
  Telegram relay) or Resend email when `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` are set
- returns `stored` and `notified` flags, and logs a loud `LEAD NOT PERSISTED` error if
  no destination accepted the record

Schema: `db/schema.sql` (run once with
`wrangler d1 execute insurance_leads_db --remote --file=db/schema.sql`).

### Measurement hooks

Already wired into the data layer: `callback_form_submit`, `callback_form_error`,
`generate_lead`, `lead_modal_shown`, `lead_modal_dismissed`. In GA4 mark
`generate_lead` as a key event; in Google Ads import it as a conversion. Without that,
nothing below is optimisable.

---

## 2. What only you can do — in order of return

### This month

1. **Deploy, then turn on lead storage.** Set `LEAD_WEBHOOK_URL` (or Resend) in
   Cloudflare → Settings → Environment variables, and run the D1 schema. Until a
   destination exists, leads land only in logs.
2. **Google Business Profile.** For "insurance advisor near me", the map pack is worth
   more than every page here. Category: *Insurance agency*; service area Bengaluru;
   complete hours; add the real address and 10+ photos; post weekly.
3. **Ask for reviews the day after a claim is settled.** Twenty genuine Google reviews
   with the word "claim" in them will outrank most on-page work. Never buy them — the
   risk is a suspended profile, which is a far bigger loss than the reviews are a gain.
4. **Call every lead within 15 minutes.** Response speed beats every conversion tweak
   on this list; after an hour the contact rate roughly halves.

### Next month

5. **Answer the competitor-brand queries — with your sign-off.** A page titled
   *"PolicyBazaar alternative"* will capture that query, and comparative advertising is
   lawful in India when it is truthful and not disparaging. I have not shipped it
   because using a competitor's brand in your title is a business decision, not a
   technical one. Say the word and it is a half-day of work.
6. **WhatsApp as the primary channel.** Most Indian policyholders will message before
   they will call. Put a click-to-WhatsApp with a pre-filled message on every claim
   page (the quiz already does this with the answers included), and use WhatsApp
   Business with an opt-in list for renewal reminders — that list is your cheapest
   repeat lead source.
7. **Renewal and lapse campaigns.** You already know which LIC policies lapse. A
   reminder sequence at 45, 15 and 3 days before premium due is the single highest
   converting email most advisors ever send.

### Quarter

8. **Referral loop with the people who already send you claims** — hospital TPA desks,
   surveyors, motor garages, chartered accountants. One page per partner with a QR
   code beats any ad.
9. **Local service pages that are not clones.** The 9 Bangalore localities with real
   content are the model; extend that pattern to the 5 cities where you actually get
   claims, not to 80 where you do not.
10. **Paid search, narrowly.** Only on claim-intent terms ("claim rejected", "ombudsman
    complaint", "LIC maturity not received") with a call-only campaign in Bengaluru.
    Broad insurance keywords will burn the budget against aggregator bids.

---

## 3. What this plan deliberately does not do

- **No scraping competitor reviews, directories or lead lists.** Buying or harvesting
  personal data without consent breaches the DPDP Act 2023 and gets numbers blocked.
- **No fake reviews, no invented settlement statistics, no "98% success rate"** unless
  you can evidence it.
- **No cold-calling purchased numbers** — TRAI's DND rules make that a penalty risk and
  a brand risk in equal measure.
- **No misleading comparative claims about named competitors.** Every row in the new
  comparison tables describes a business model, not an accusation.

---

## 4. What to watch

| Metric | Where | Target |
|---|---|---|
| `generate_lead` events per week | GA4 | baseline in week 1, +30% by week 6 |
| Modal show → submit rate | GA4 funnel | 3–8% is healthy for exit intent |
| Callback form → answered call | your phone | >70% if you call within 15 min |
| Comparison page → lead rate | GA4 | highest of any template; if not, the pages are mis-targeted |
| Cost per lead (paid) | Google Ads | set after 30 days of data |

The honest summary: the funnel now captures what it already attracts, and the new
comparison pages give it something new to attract. Neither replaces the two things that
actually move a local advisory practice — a complete Google Business Profile and a phone
that gets answered.
