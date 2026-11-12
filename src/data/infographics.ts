/**
 * src/data/infographics.ts
 * -----------------------------------------------------------------------------
 * One infographic spec per article. Every number, deadline and step below is
 * taken from the article it belongs to — nothing is invented.
 *
 * `anchor` is a heading (or unique substring of one) from the article. The
 * infographic is injected immediately before that heading. If the anchor is
 * missing or not found, it falls back to just before the first <h2>.
 *
 * Adding a new article: copy an existing entry, change `slug` + `blocks`.
 */

import type { ArticleInfographic } from '../lib/infographic';

export const INFOGRAPHICS: ArticleInfographic[] = [
  /* ---------------------------------------------------------------------- */
  /* 1. Insurance Claim Rejection Rates in India 2026 — data article          */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'insurance-claim-rejection-rate-india-2026-data',
    eyebrow: 'Claim data · 2026',
    title: 'How Often Indian Insurers Reject Claims',
    source:
      'Compiled from IRDAI Annual Report 2024-25, insurer public disclosures, IRDAI IGMS data and Insurance Ombudsman annual reports. Indicative estimates, not official filings.',
    summary:
      'Health insurance rejects the most claims (16.8%), followed by life (14.2%) and motor (8.8%). Non-disclosure of pre-existing conditions alone drives 42% of all rejections.',
    anchor: 'Why Claims Get Rejected',
    blocks: [
      {
        kind: 'stats',
        heading: 'Industry average rejection rate, by line of business',
        columns: 3,
        items: [
          { value: '16.8%', label: 'Health insurance', note: 'Highest rejection rate', tone: 'danger' },
          { value: '14.2%', label: 'Life insurance', note: 'Lowest: LIC at 10.8%', tone: 'warn' },
          { value: '8.8%', label: 'Motor insurance', note: 'PSU insurers lowest', tone: 'accent' },
        ],
      },
      {
        kind: 'bars',
        heading: 'Top 8 reasons claims get rejected',
        max: 45,
        items: [
          { label: 'Non-disclosure of pre-existing conditions', value: 42, display: '42%', tone: 'danger' },
          { label: 'Documentation gaps', value: 18, display: '18%', tone: 'warn' },
          { label: 'Pre-existing condition in waiting period', value: 12, display: '12%', tone: 'warn' },
          { label: 'Room rent limit exceeded', value: 8, display: '8%', tone: 'primary' },
          { label: 'Invalid or expired licence', value: 6, display: '6%', tone: 'primary' },
          { label: 'Treatment not covered', value: 5, display: '5%', tone: 'primary' },
          { label: 'Waiting period not completed', value: 4, display: '4%', tone: 'primary' },
          { label: 'Intoxication or fraud', value: 4, display: '4%', tone: 'neutral' },
        ],
        note: 'Percentages are the share of all rejections, not of all claims.',
      },
      {
        kind: 'steps',
        heading: 'Your five rights after a rejection',
        items: [
          { title: 'Written reasons', detail: 'IRDAI requires the insurer to cite the specific policy clause relied on.', tone: 'primary' },
          { title: 'Appeal to the Grievance Officer', detail: 'Insurer must respond within 15 days.', tone: 'primary' },
          { title: 'Escalate to IRDAI', detail: 'File free at igms.irdai.gov.in.', tone: 'warn' },
          { title: 'Approach the Ombudsman', detail: 'Free, binding decisions for claims up to ₹50 lakh.', tone: 'accent' },
          { title: 'Consumer Court', detail: 'The route for claims above ₹50 lakh.', tone: 'neutral' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 2. How to Appeal a Rejected Insurance Claim                             */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'how-to-appeal-rejected-insurance-claim-india-2026',
    eyebrow: 'Appeal playbook',
    title: 'The 30-Day Appeal Clock After a Claim Rejection',
    source:
      'Framework used by Insurance Support since 2018. Timelines follow IRDAI (Protection of Policyholders’ Interests) Regulations, 2017.',
    summary:
      'You have 30 days from receiving the rejection letter. Day 7: insurer owes you Regulation 8 details. Day 15: internal grievance must be filed. Day 30: Bima Bharosa, Ombudsman or Consumer Commission.',
    anchor: 'Phase 2',
    blocks: [
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '30', label: 'Days to act from the rejection letter', note: 'Clock starts on receipt', tone: 'danger' },
          { value: '78%', label: 'Appealed claims overturned since 2018', note: 'Insurance Support case data', tone: 'accent' },
          { value: '22%', label: 'Cases lost — almost all to missed deadlines', note: 'Not to weak merits', tone: 'warn' },
        ],
      },
      {
        kind: 'timeline',
        heading: 'Non-negotiable deadlines',
        items: [
          { marker: 'Day 0', title: 'Secure the letter', detail: 'Save email with headers, photograph the envelope, screenshot the portal.', tone: 'danger' },
          { marker: 'Day 7', title: 'Regulation 8 details', detail: 'Insurer must share claim file notes, clause cited and medical opinion.', tone: 'warn' },
          { marker: 'Day 15', title: 'Internal grievance', detail: 'File on all three channels; secure the Grievance Registration Number.', tone: 'primary' },
          { marker: 'Day 30', title: 'Escalate outside', detail: 'Bima Bharosa, Ombudsman or Consumer Commission.', tone: 'accent' },
        ],
        note: 'Set phone reminders for Day 6, Day 14 and Day 29.',
      },
      {
        kind: 'compare',
        heading: 'Choosing your forum: Ombudsman or Consumer Commission',
        leftTitle: 'Insurance Ombudsman',
        rightTitle: 'Consumer Commission',
        rows: [
          { label: 'Claim amount', left: 'Up to ₹50 lakh', right: 'Any amount' },
          { label: 'Cost', left: 'Free', right: 'Nominal fee, 1–2% of claim' },
          { label: 'Timeline', left: '6–12 months', right: '12–24 months' },
          { label: 'Lawyer', left: 'Not allowed — you argue it', right: 'Allowed' },
          { label: 'Appeal', left: 'To Consumer Commission', right: 'To State / National Commission' },
          { label: 'Best for', left: 'Clear-cut cases under ₹50 lakh', right: 'Complex, high-value, fraud allegations' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 3. Health Insurance Claim Settlement Ratio 2026                         */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'health-insurance-claim-settlement-ratio-2026',
    eyebrow: 'Insurer scorecard',
    title: 'Claim Settlement Ratio Tells Only Half the Story',
    source:
      'Latest IRDAI disclosures and insurer annual report filings, 2025-26. Ratios move year-on-year with seasonal claims.',
    summary:
      'CSR counts claims; ASR counts rupees. An insurer can post a 98% CSR while settling only 75% of the value claimed — always read the two together.',
    anchor: 'Claim Settlement Performance of Major Indian Insurers',
    blocks: [
      {
        kind: 'bars',
        heading: 'Claim Settlement Ratio — leading health and general insurers',
        max: 100,
        items: [
          { label: 'ICICI Lombard', value: 94.2, display: '94.2%', tone: 'accent' },
          { label: 'HDFC ERGO', value: 93.8, display: '93.8%', tone: 'accent' },
          { label: 'Star Health', value: 92.5, display: '92.5%', tone: 'primary' },
          { label: 'Care Health', value: 91.4, display: '91.4%', tone: 'primary' },
          { label: 'Niva Bupa', value: 90.1, display: '90.1%', tone: 'primary' },
          { label: 'New India Assurance', value: 89.5, display: '89.5%', tone: 'warn' },
        ],
        note: 'Cashless settlement time ranges from 1–2 hours (ICICI Lombard, HDFC ERGO) to 4–6 hours (New India Assurance).',
      },
      {
        kind: 'compare',
        heading: 'CSR vs ASR — the two numbers that matter',
        leftTitle: 'CSR — Claim Settlement Ratio',
        rightTitle: 'ASR — Amount Settlement Ratio',
        rows: [
          { label: 'What it counts', left: 'Number of claims paid ÷ claims received', right: 'Rupees paid ÷ rupees claimed' },
          { label: 'What it rewards', left: 'Settling many small claims', right: 'Paying large claims in full' },
          { label: 'How it gets gamed', left: 'Approve OPD and minor claims, reject major surgery', right: 'Harder to game — exposes heavy deductions' },
          { label: 'Healthy range', left: 'Read together, not alone', right: 'Above 85–90%' },
        ],
      },
      {
        kind: 'stats',
        heading: 'Where settled claims still lose money',
        columns: 3,
        items: [
          { value: '1%', label: 'Typical room rent cap', note: 'Of sum insured, per day', tone: 'warn' },
          { value: '10%', label: 'Common mandatory co-pay', note: 'On budget plans', tone: 'warn' },
          { value: '₹5,000', label: 'Room rent cap that triggered a deduction', note: 'Case study: ₹4.2 lakh bill', tone: 'danger' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 4. Health Insurance Claim Rejection — 15 Real Reasons                   */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'health-insurance-claim-rejection-15-real-reasons-how-to-prevent-appeal-each-one-2026',
    eyebrow: 'Rejection anatomy',
    title: 'The 15 Rejection Reasons, Grouped Into 5 Buckets',
    source: 'Based on the 15 reasons documented in this guide and IRDAI standardised health policy wordings 2024-26.',
    summary:
      'Waiting periods, non-disclosure, policy exclusions, billing mismatches and timing errors account for every one of the 15 rejection reasons. Each bucket has a different fix.',
    anchor: 'How to Prevent Health Insurance Claim Rejections',
    blocks: [
      {
        kind: 'stats',
        heading: 'The deadlines and limits that trip people up',
        columns: 3,
        items: [
          { value: '30', label: 'Days initial waiting period', note: 'Accidents exempt', tone: 'danger' },
          { value: '2–4', label: 'Years PED waiting period', note: 'Capped at 48 months by IRDAI', tone: 'warn' },
          { value: '24', label: 'Hours minimum hospitalisation', note: 'Day-care list excepted', tone: 'primary' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Five buckets, five fixes',
        items: [
          {
            title: 'Waiting periods — reasons 1, 2, 3',
            detail: 'Initial 30-day, PED, and specific-disease (cataract, hernia, joint replacement) waits. Fix: never let cover lapse, and disclose conditions at purchase.',
            tone: 'danger',
          },
          {
            title: 'Non-disclosure — reason 4',
            detail: 'A condition found during claim investigation can void the policy. Fix: full transparency at proposal stage.',
            tone: 'warn',
          },
          {
            title: 'Exclusions — reasons 5, 15',
            detail: 'Cosmetic, dental, vision correction, adventure sports, self-harm, treatment outside India. Fix: read the exclusion list before you buy.',
            tone: 'primary',
          },
          {
            title: 'Billing mismatch — reasons 6, 8, 9, 10, 13, 14',
            detail: 'Sub-24-hour stays, missing bills, non-medical consumables, diagnosis/treatment mismatch, room-rent proportionate deduction, treatment sub-limits. Fix: itemised bills and verified discharge summary.',
            tone: 'violet',
          },
          {
            title: 'Policy status and timing — reasons 7, 11, 12',
            detail: 'Non-network hospital, lapsed policy, intimation or filing after deadline. Fix: auto-renew, network hospitals, intimate within 24–48 hours.',
            tone: 'accent',
          },
        ],
        note: 'Claim filing window is typically 30–90 days from discharge.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 5. IRDAI Grievance Process — three-tier system                          */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'irdai-grievance-process-complaint-guide-2026',
    eyebrow: 'Escalation route',
    title: 'India’s Three-Tier Grievance System',
    source: 'IRDAI (Protection of Policyholders’ Interests) Regulations, 2017 and Redressal of Public Grievances Rules, 1998 (updated 2017).',
    summary:
      'Start with the insurer’s Grievance Officer (15 days). If that fails, file free on IRDAI IGMS (15 days). If that fails, take it to the Insurance Ombudsman (binding up to ₹50 lakh).',
    anchor: 'IRDAI Grievance Redressal',
    blocks: [
      {
        kind: 'ladder',
        heading: 'Escalation ladder',
        items: [
          {
            tier: 'Tier 1',
            title: 'Insurer’s Grievance Officer',
            detail: 'Email, online portal, toll-free helpline or registered post. Every IRDAI-licensed insurer must appoint one and respond within 15 days.',
            meta: '15 days to respond',
            tone: 'primary',
          },
          {
            tier: 'Tier 2',
            title: 'IRDAI IGMS — igms.irdai.gov.in',
            detail: 'Register, pick complaint type and insurer, enter the policy number, upload documents, note the complaint number. Toll-free 14555, Mon–Fri 9:00–17:30.',
            meta: '15 days · Free',
            tone: 'warn',
          },
          {
            tier: 'Tier 3',
            title: 'Insurance Ombudsman',
            detail: 'For claims up to ₹50 lakh, or complaints unresolved after 30 days. Free, quasi-judicial, award binding on the insurer.',
            meta: 'Up to ₹50 lakh',
            tone: 'accent',
          },
        ],
        note: 'Always complain in writing — email or registered post — so you hold proof of every communication.',
      },
      {
        kind: 'stats',
        heading: 'What IRDAI will take up',
        columns: 3,
        items: [
          { value: '15', label: 'Days for the insurer to respond', tone: 'primary' },
          { value: '14555', label: 'IRDAI toll-free grievance helpline', note: '9 AM – 5:30 PM, Mon–Fri', tone: 'warn' },
          { value: '₹50L', label: 'Ombudsman pecuniary limit', note: 'Above this, go to Consumer Commission', tone: 'accent' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 6. How to File a Complaint on the IRDAI IGMS Portal                     */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'how-to-file-complaint-irdai-igms-portal-2026',
    eyebrow: 'Filing walkthrough',
    title: 'Filing on the IRDAI IGMS Portal, Step by Step',
    source: 'IRDAI Integrated Grievance Management System, created under the Protection of Policyholders’ Interests Regulations, 2017.',
    summary:
      'Exhaust the insurer’s internal grievance cell first (15 days), then register on igms.irdai.gov.in, file your complaint, and keep the reference number as your escalation proof.',
    anchor: 'Step-by-Step: How to File a',
    blocks: [
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '3', label: 'Days for the insurer to acknowledge', tone: 'primary' },
          { value: '15', label: 'Days for the insurer to resolve', note: 'Then you may file on IGMS', tone: 'warn' },
          { value: '5 MB', label: 'Maximum size per uploaded file', note: 'PDF, JPG, PNG', tone: 'neutral' },
        ],
      },
      {
        kind: 'steps',
        heading: 'The seven steps',
        items: [
          { title: 'Write to the Grievance Redressal Officer first', detail: 'Email plus registered post. IRDAI requires you to exhaust the internal grievance cell before IGMS.', tone: 'danger' },
          { title: 'Go to igms.irdai.gov.in', detail: 'The only official domain. Beware lookalike sites.', tone: 'primary' },
          { title: 'Register and verify by OTP', detail: 'Email, mobile, then complete your profile with name, address and contact details.', tone: 'primary' },
          { title: 'Open a new complaint', detail: 'Choose the insurer, then the category: claim, policy servicing, premium, refund or mis-selling.', tone: 'primary' },
          { title: 'Enter the policy number', detail: 'Mandatory for every claim-related complaint.', tone: 'primary' },
          { title: 'Write a factual description', detail: 'Incident date, claim number, amount involved, what happened, and the resolution you want.', tone: 'primary' },
          { title: 'Upload documents and save the reference number', detail: 'Policy copy, claim form, rejection letter, correspondence, medical records. The reference number is your audit trail.', tone: 'accent' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 7. Insurance Ombudsman — complete filing guide                          */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'insurance-ombudsman-india-guide',
    eyebrow: 'Ombudsman guide',
    title: 'What Happens After You File With the Ombudsman',
    source: 'Redressal of Public Grievances Rules, 1998 (updated 2017). Office details: Office of the Insurance Ombudsman, Bengaluru.',
    summary:
      'From filing to a binding award takes roughly 3–6 months: acknowledgment in 7–10 days, insurer response in 21 days, hearing at 30–60 days, award 30–45 days after that.',
    anchor: 'Eligibility',
    blocks: [
      {
        kind: 'stats',
        heading: 'Before you file — eligibility at a glance',
        columns: 3,
        items: [
          { value: '₹50L', label: 'Maximum claim value heard', note: 'Above this: Consumer Commission', tone: 'accent' },
          { value: '30', label: 'Days after insurer grievance before filing', tone: 'warn' },
          { value: '1', label: 'Year from the insurer’s final rejection', tone: 'danger' },
          { value: '17', label: 'Ombudsman offices across India', tone: 'primary' },
          { value: '0', label: 'Court fees — filing is free', note: 'No lawyer required', tone: 'accent' },
          { value: '3–6', label: 'Months to resolution vs 2–5 years in court', tone: 'accent' },
        ],
      },
      {
        kind: 'timeline',
        heading: 'Filing-to-award timeline',
        items: [
          { marker: '7–10 days', title: 'Acknowledgment', detail: 'You receive your complaint number.', tone: 'primary' },
          { marker: '7 days', title: 'Notice to insurer', detail: 'Ombudsman notifies the insurer, which gets 21 days to respond.', tone: 'primary' },
          { marker: '21 days', title: 'Insurer response', detail: 'Written reply; you receive a copy.', tone: 'warn' },
          { marker: '7 days', title: 'Your rejoinder', detail: 'Optional, but recommended.', tone: 'primary' },
          { marker: '30–60 days', title: 'Hearing', detail: 'One day, in person, at the Ombudsman office.', tone: 'accent' },
          { marker: '30–45 days', title: 'Award', detail: 'Written order, binding on the insurer.', tone: 'accent' },
        ],
        note: 'Bengaluru office: 2nd Floor, Jeevan Soudha, JP Nagar 1st Phase, Bengaluru 560078 · 080-26652048 · Jurisdiction: Karnataka and Goa.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 8. Pre-Existing Disease waiting periods                                 */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'health-insurance-pre-existing-disease-waiting-period-guide-2026',
    eyebrow: 'Waiting periods',
    title: 'From Day 30 to the 8-Year Moratorium',
    source: 'IRDAI standardised health insurance wordings, 2024–2026, and IRDAI/HLT/REG/CIR/126/07/2016.',
    summary:
      'Every policy starts with a 30-day wait. Declared pre-existing diseases carry a 3–4 year wait, capped at 48 months. After 8 continuous years, the moratorium bars any PED-based denial — even for undeclared conditions.',
    anchor: 'How Does the PED Waiting Period Work',
    blocks: [
      {
        kind: 'timeline',
        items: [
          { marker: 'Day 0–30', title: 'Initial waiting period', detail: 'New illnesses not covered. Accidents are exempt.', tone: 'danger' },
          { marker: '24–48 months', title: 'PED look-back window', detail: 'Symptoms, diagnosis, treatment or medication in this window before inception counts as pre-existing.', tone: 'warn' },
          { marker: '3–4 years', title: 'PED waiting period', detail: 'Declared PED not payable. Unrelated new illnesses are covered after day 30.', tone: 'warn' },
          { marker: '48 months', title: 'IRDAI cap', detail: 'No insurer may impose a longer PED wait. Many offer 2–3 years.', tone: 'primary' },
          { marker: 'Year 8', title: 'Moratorium', detail: 'No claim can be denied on PED grounds — even an undeclared one.', tone: 'accent' },
        ],
        note: 'Portability credits waiting time already served to your new insurer.',
      },
      {
        kind: 'stats',
        heading: 'Conditions most often flagged as pre-existing',
        columns: 3,
        items: [
          { value: '1', label: 'Diabetes — Type 1 and Type 2', tone: 'primary' },
          { value: '2', label: 'Hypertension', tone: 'primary' },
          { value: '3', label: 'Thyroid disorders', tone: 'primary' },
          { value: '4', label: 'Asthma and respiratory conditions', tone: 'primary' },
          { value: '5', label: 'Heart conditions, stents, prior CABG', tone: 'primary' },
          { value: '6', label: 'Kidney disease, arthritis, any cancer history', tone: 'primary' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 9. Family Floater vs Individual Health Insurance                        */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'family-floater-vs-individual-health-insurance-comparison-2026',
    eyebrow: 'Head-to-head',
    title: 'Family Floater or Individual Policies?',
    source: '2026 premium illustrations for a family of four (adults 32 and 30, children 5 and 2) at ₹10 lakh cover. Section 80D limits per the Income Tax Act.',
    summary:
      'A floater saves ₹17,000–₹27,000 a year for a family of four, but one large claim drains the shared sum assured for everyone else. Individual policies cost more and protect each member separately.',
    anchor: 'Head-to-Head Comparison',
    blocks: [
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '₹18–28k', label: 'Family floater, ₹10L total', note: 'Annual premium, family of four', tone: 'accent' },
          { value: '₹35–55k', label: 'Individual, ₹10L each', note: 'Annual premium, four members', tone: 'warn' },
          { value: '₹17–27k', label: 'Saved per year with a floater', note: 'Roughly 40–50%', tone: 'accent' },
        ],
      },
      {
        kind: 'compare',
        leftTitle: 'Family Floater',
        rightTitle: 'Individual Policies',
        rows: [
          { label: 'Sum assured', left: 'One shared pool for the whole family', right: 'Separate, dedicated cover per person' },
          { label: 'Premium basis', left: 'Age of the oldest member', right: 'Each member’s own age and history' },
          { label: 'Big-claim risk', left: 'One member’s claim shrinks cover for all', right: 'Others keep their full cover' },
          { label: 'No-claim bonus', left: 'Any member claiming costs the family the NCB', right: 'Each member earns their own NCB' },
          { label: 'Flexibility', left: 'One plan, one insurer, one renewal', right: 'Vary cover, insurer and porting per member' },
          { label: 'Best for', left: 'Young families, tight budgets', right: 'Families with senior members or high claim risk' },
        ],
        note: 'Section 80D: up to ₹25,000 for self, spouse and children (₹50,000 if any member is a senior citizen), plus ₹25,000–₹50,000 for parents.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 10. LIC Policy Revival                                                  */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'lic-policy-revival-complete-guide-2026',
    eyebrow: 'LIC revival',
    title: 'The LIC Revival Window: Grace Period to Day 1,825',
    source: 'LIC revival rules as published on licindia.in and branch practice, 2026. Interest and medical requirements vary by plan.',
    summary:
      'After a 15–30 day grace period the policy lapses. You then have up to 5 years from the first unpaid premium to revive it — paying arrears plus around 10% p.a. interest. After 5 years the policy is permanently dead.',
    anchor: 'LIC Policy Revival Rules 2026',
    blocks: [
      {
        kind: 'timeline',
        items: [
          { marker: '15–30 days', title: 'Grace period', detail: '30 days for annual premiums, 15 for half-yearly or quarterly. Cover continues.', tone: 'accent' },
          { marker: 'Lapse', title: 'Policy lapses', detail: 'No cover, surrender value frozen, no policy loan, accumulated bonus forfeited.', tone: 'danger' },
          { marker: 'Year 0–5', title: 'Revival window', detail: 'Pay all arrears with interest. No fresh medical below ₹25 lakh sum assured.', tone: 'warn' },
          { marker: 'Year 5+', title: 'Permanently dead', detail: 'The policy can no longer be revived and all benefits are lost.', tone: 'danger' },
        ],
      },
      {
        kind: 'stats',
        heading: 'What revival costs and how long it takes',
        columns: 3,
        items: [
          { value: '10%', label: 'Approximate interest on arrears, p.a.', note: 'Check your policy document', tone: 'warn' },
          { value: '₹25L', label: 'Sum assured below which no fresh medical is usually needed', tone: 'accent' },
          { value: '7–15', label: 'Working days to process after payment', tone: 'primary' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Six steps to revive',
        items: [
          { title: 'Check policy status', detail: 'licindia.in, the LIC app, or customer care on 022-6789 7777.', tone: 'primary' },
          { title: 'Calculate the outstanding amount', detail: 'Unpaid premiums, accrued interest and applicable taxes.', tone: 'primary' },
          { title: 'Gather documents', detail: 'Original policy bond, latest premium receipt, ID and address proof, bank details for ECS.', tone: 'primary' },
          { title: 'Apply online or at the branch', detail: 'Customer portal → Policy Services → Revival Request, or file the revival form at your branch.', tone: 'primary' },
          { title: 'Pay the revival amount', detail: 'LIC online payment, demand draft, or NEFT/RTGS.', tone: 'warn' },
          { title: 'Collect the revival confirmation', detail: 'Issued in 7–15 working days. Update your nominee at the same time.', tone: 'accent' },
        ],
        note: 'Compare revival cost against a fresh policy before paying — sometimes starting over is cheaper.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 11. LIC Maturity Claim Process                                          */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'lic-maturity-claim-process-2026',
    eyebrow: 'Maturity claim',
    title: 'Turning a Matured LIC Policy Into Money in Your Bank',
    source: 'LIC maturity claim process and service standards, 2025-26. TDS rules per the Income Tax Act.',
    summary:
      'LIC sends an intimation letter 1–2 months before the maturity date, but you can start 30 days early. Online or offline, the original policy bond must reach the branch; most claims settle in 8–15 working days.',
    anchor: 'When Should You File Your Maturity Claim',
    blocks: [
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '1–2', label: 'Months before maturity that LIC sends the intimation letter', tone: 'primary' },
          { value: '8–15', label: 'Working days to settle once documents are in order', tone: 'accent' },
          { value: '₹1L', label: 'Maturity value above which PAN is mandatory for TDS', tone: 'warn' },
        ],
      },
      {
        kind: 'steps',
        heading: 'What you actually receive, then how to claim it',
        items: [
          { title: 'Sum assured', detail: 'The base cover you chose at purchase.', tone: 'primary' },
          { title: 'Simple reversionary bonuses', detail: 'Declared by LIC every year across the policy term.', tone: 'primary' },
          { title: 'Final Additional Bonus', detail: 'A one-time bonus at maturity, where applicable to the plan.', tone: 'primary' },
          { title: 'Loyalty additions', detail: 'Paid by certain plans to long-term policyholders.', tone: 'primary' },
          { title: 'Register on the LIC customer portal and link the policy', detail: 'licindia.in → Customer Portal → register with policy number, date of birth and mobile.', tone: 'primary' },
          { title: 'Complete the online maturity intimation', detail: 'Service Requests → Maturity Claim Intimation → fill the discharge form, bank details and PAN, upload proofs.', tone: 'primary' },
          { title: 'Send the original policy bond to the branch', detail: 'Even after online filing, the signed discharge form and original bond must reach your servicing branch. Collect the acknowledgment.', tone: 'accent' },
        ],
        note: 'File Form 15G/15H to avoid TDS where eligible. Offline route: collect Claim Discharge Form (Annexure A) at any branch.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 12. Motor Insurance Claim Process                                       */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'motor-insurance-claim-process-guide-2026',
    eyebrow: 'Motor claims',
    title: 'The Motor Claim Journey, From Crash to Settlement',
    source: 'IRDAI claim settlement guidelines and standard motor policy conditions, 2026.',
    summary:
      'Intimate the insurer within 24–72 hours, document the scene, file an FIR where required, get a survey, submit documents — and the insurer must settle within 30 days of receiving all documents.',
    anchor: 'Step 1: Ensure safety first',
    blocks: [
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '24–72', label: 'Hours to intimate the insurer after an accident', tone: 'danger' },
          { value: '30', label: 'Days for the insurer to settle once documents are complete', tone: 'accent' },
          { value: '90', label: 'Days before a stolen vehicle becomes a total-loss theft claim', tone: 'warn' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Seven steps to an approved claim',
        items: [
          { title: 'Ensure safety first', detail: 'Move to a safe spot, call emergency services for injuries, and never admit fault at the scene.', tone: 'danger' },
          { title: 'Document the scene', detail: 'Photos and video of all vehicles, time, location, road conditions, witness contacts, the other driver’s policy details.', tone: 'primary' },
          { title: 'File an FIR where required', detail: 'Injuries or death, third-party damage above ₹5,000, government vehicles, and hit-and-run.', tone: 'primary' },
          { title: 'Inform your insurer immediately', detail: 'Helpline, app, email or branch — within 24–72 hours. Keep policy number, registration, licence and FIR number ready.', tone: 'warn' },
          { title: 'Get a survey done', detail: 'The insurer’s surveyor inspects the vehicle, may ask for documents, and issues an estimated repair cost.', tone: 'primary' },
          { title: 'Submit documents', detail: 'Claim form, RC, valid licence, policy copy, FIR and repair estimate. Theft claims also need all keys and a police non-traceable certificate.', tone: 'primary' },
          { title: 'Settlement', detail: 'Cashless: the insurer pays the network garage and you pay only the deductible. Reimbursement: you pay, submit bills, get repaid.', tone: 'accent' },
        ],
        note: 'Top rejection reasons: invalid licence, intoxication, commercial use of a private vehicle, wear and tear, and non-disclosure at inception.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 13. Insurance Claim Rejected — legal & practical fight-back guide       */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'insurance-claim-rejected-here-s-your-complete-legal-practical-fight-back-guide-2026',
    eyebrow: 'Fight-back guide',
    title: 'Which Rejections Can Actually Be Beaten',
    source: 'Insurance Support case outcomes since 2018 — Rs 50+ crore recovered, 78% of appealed claims overturned. Win rates are indicative, not a guarantee.',
    summary:
      'Lapse and cashless-denial rejections are the most beatable at 80–90%. Fraud allegations are the hardest at 40%+, because the insurer must prove intent to deceive.',
    anchor: 'The 8 Most Common Rejection Reasons',
    blocks: [
      {
        kind: 'bars',
        heading: 'Observed overturn rate, by rejection ground',
        max: 100,
        items: [
          { label: 'Policy lapse / premium unpaid', value: 90, display: '90%+', tone: 'accent' },
          { label: 'Cashless pre-authorisation denied', value: 80, display: '80%+', tone: 'accent' },
          { label: 'Pre-existing disease exclusion', value: 70, display: '70%+', tone: 'primary' },
          { label: 'Delay in intimation or documents', value: 75, display: '75%+', tone: 'primary' },
          { label: 'Non-disclosure / Section 45', value: 65, display: '65%+', tone: 'warn' },
          { label: 'Exclusion clause misapplied', value: 60, display: '60%+', tone: 'warn' },
          { label: 'Treatment not covered / experimental', value: 55, display: '55%+', tone: 'warn' },
          { label: 'Fraud or misrepresentation alleged', value: 40, display: '40%+', tone: 'danger' },
        ],
        note: 'Non-disclosure win rate approaches 100% once the policy is more than 3 years old.',
      },
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '3–12%', label: 'Claim rejection rate in India, by insurer and product', note: 'Per IRDAI data', tone: 'danger' },
          { value: '3 yrs', label: 'After this, Section 45 allows challenge only for proven fraud', tone: 'accent' },
          { value: '48 mths', label: 'Condition controlled on medication without hospitalisation is not a PED', note: 'IRDAI/HLT/REG/CIR/126/07/2016', tone: 'primary' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Do these in the first four hours',
        items: [
          { title: 'Secure every version of the rejection letter', detail: 'Email with full headers, photograph of the envelope and postmark, portal screenshot with timestamp.', tone: 'danger' },
          { title: 'Send the Regulation 8 demand immediately', detail: 'Claim file notes, exact clause cited, medical opinion obtained, pre-auth outcome, admissible-amount calculation.', tone: 'warn' },
          { title: 'Insurer must reply within 7 working days', detail: 'Regulation 8(6). Their silence becomes part of your paper trail.', tone: 'accent' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 14. Nominee vs Legal Heirs (standalone .astro page)                     */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'nominee-vs-legal-heirs-claim-dispute-2026',
    eyebrow: 'Nomination law',
    title: 'Nominee or Legal Heir — Who Actually Gets the Money',
    source: 'Insurance Act, 1938 as amended with effect from 1 October 2022; Redressal of Public Grievances Rules, 1998.',
    summary:
      'The date of the nomination decides everything. Policies nominated on or after 1 October 2022 can name a beneficial nominee who owns the money outright. Older nominations usually make the nominee a custodian for all legal heirs.',
    anchor: 'The two regimes that decide your money',
    blocks: [
      {
        kind: 'decision',
        question: 'When was the nomination made on the policy?',
        branches: [
          {
            condition: 'On or after 1 October 2022',
            outcome: 'Beneficial nominee',
            detail: 'Can receive the money for their own benefit, with explicit shares, outside succession law.',
            tone: 'accent',
          },
          {
            condition: 'Before 1 October 2022',
            outcome: 'Custodian nominee',
            detail: 'Receives the money as trustee for all legal heirs, who keep their succession shares.',
            tone: 'warn',
          },
          {
            condition: 'No valid nomination',
            outcome: 'Title documents decide',
            detail: 'Legal heirship certificate, succession certificate, or a notarised family settlement deed, often with an indemnity bond.',
            tone: 'primary',
          },
        ],
      },
      {
        kind: 'compare',
        heading: 'Two roles people confuse',
        leftTitle: 'Nominee',
        rightTitle: 'Legal Heir',
        rows: [
          { label: 'How they are created', left: 'Named in the proposal form or a nomination endorsement', right: 'By succession law or a will' },
          { label: 'What they hold', left: 'Receives the claim money from the insurer', right: 'Owns a share of the estate' },
          { label: 'Post-2022 policies', left: 'May own it outright as beneficial nominee', right: 'Rights depend on the nomination made' },
          { label: 'Pre-2022 policies', left: 'Usually a custodian for all heirs', right: 'Retains the succession share' },
          { label: 'Practical test', left: 'What the nomination form says, and its date', right: 'What succession law and the will say' },
        ],
        note: 'Review your nomination after marriage, children, divorce or a death in the family — and match it with a will for everything outside insurance.',
      },
      {
        kind: 'steps',
        heading: 'If the family is already fighting',
        items: [
          { title: 'Complete the claim — do not withdraw it', detail: 'Withdrawing “to let the family decide” stalls settlement indefinitely.', tone: 'danger' },
          { title: 'Keep every record', detail: 'Documents submitted, amounts received, and all correspondence.', tone: 'primary' },
          { title: 'Treat the family split as a separate matter', detail: 'The insurer pays the validly nominated person or whoever produces title documents; the internal division is a family-law issue.', tone: 'accent' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 15. IRDAI Cashless Pre-Authorization Rules                              */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'irdai-cashless-claim-pre-authorization-approval-rejection-rules-2026',
    eyebrow: 'Cashless claims',
    title: 'How Fast Must a Cashless Pre-Auth Be Decided?',
    source: 'IRDAI Health Insurance Regulations 2026 and IRDAI turnaround-time circulars on pre-authorisation.',
    summary:
      'Planned admissions: request 48–72 hours ahead, insurer must respond within 24 hours. Emergencies: the insurer must respond within 4 hours, and cannot deny pre-auth where the ailment is covered.',
    anchor: 'IRDAI Guidelines on Pre-Authorization Timeline',
    blocks: [
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '4 hrs', label: 'Insurer response window in an emergency', note: 'From receipt of the request', tone: 'danger' },
          { value: '24 hrs', label: 'Insurer response window for planned care', note: 'From complete documentation', tone: 'warn' },
          { value: '48–72', label: 'Hours before admission to file a planned request', tone: 'primary' },
        ],
      },
      {
        kind: 'compare',
        heading: 'Planned vs emergency pre-authorisation',
        leftTitle: 'Planned admission',
        rightTitle: 'Emergency admission',
        rows: [
          { label: 'When to request', left: '48–72 hours before admission', right: 'Immediately, through the 24x7 helpline or portal' },
          { label: 'Insurer must respond in', left: '24 hours of complete documents', right: '4 hours of the request' },
          { label: 'Can it be taken after admission?', left: 'No — approval precedes admission', right: 'Yes, if the patient’s condition was critical' },
          { label: 'Denial allowed?', left: 'Yes, on policy grounds', right: 'Not where the ailment is covered under the policy' },
        ],
      },
      {
        kind: 'steps',
        heading: 'What pre-authorisation actually confirms',
        items: [
          { title: 'The treatment is covered', detail: 'Under your policy terms and not on the exclusion list.', tone: 'primary' },
          { title: 'The hospital is in the network', detail: 'Cashless only works at empanelled hospitals.', tone: 'primary' },
          { title: 'The estimate fits the sum insured', detail: 'Estimated expenses must fall within your available cover.', tone: 'primary' },
          { title: 'The ailment is not excluded', detail: 'Waiting periods and specific exclusions are checked here.', tone: 'accent' },
        ],
        note: 'Without a valid pre-authorisation, a cashless claim can be denied even when the policy is active and the cover is adequate.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 16. Health Insurance Tax Benefits — Section 80D                         */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'health-insurance-tax-benefits-india-2026-save-tax-under-section-80d',
    eyebrow: 'Tax planning',
    title: 'Section 80D: What You Can Actually Deduct',
    source: 'Section 80D of the Income Tax Act, deduction limits for FY 2025-26. Preventive health check-up limit is inside the 80D cap.',
    summary:
      'The 80D deduction can reach ₹1,00,000 when both you and your parents are senior citizens — ₹50,000 for your family plus ₹50,000 for your parents.',
    anchor: 'Deduction Limits Under Section 80D',
    blocks: [
      {
        kind: 'compare',
        heading: 'Your total 80D limit depends on who is a senior citizen',
        leftTitle: 'Your family',
        rightTitle: 'Your parents',
        rows: [
          { label: 'Everyone below 60', left: 'Up to ₹25,000', right: 'Up to ₹25,000 — total ₹50,000' },
          { label: 'Parents are 60+', left: 'Up to ₹25,000', right: 'Up to ₹50,000 — total ₹75,000' },
          { label: 'You and parents are 60+', left: 'Up to ₹50,000', right: 'Up to ₹50,000 — total ₹1,00,000' },
        ],
        note: 'Preventive health check-ups: up to ₹5,000 a year, inside the 80D limit, and allowed in cash.',
      },
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '₹25,000', label: 'Self, spouse and children below 60', tone: 'primary' },
          { value: '₹50,000', label: 'Self, spouse and children when you are 60+', tone: 'accent' },
          { value: '₹5,000', label: 'Preventive health check-up, within the cap', note: 'Cash payment allowed', tone: 'warn' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Who can claim, and what does not qualify',
        items: [
          { title: 'You can cover parents even if they have no income', detail: 'A working child may pay the premium and claim the deduction.', tone: 'accent' },
          { title: 'Employer-paid group cover does not qualify', detail: 'Premium paid by your employer is not eligible for an 80D deduction.', tone: 'danger' },
          { title: 'Payment mode matters outside check-ups', detail: 'Health insurance premium must be paid by a non-cash mode to qualify.', tone: 'warn' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 17. How to File a Death Claim on a Life Insurance Policy                */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'how-to-file-a-death-claim-on-life-insurance-in-india-2026-complete-guide',
    eyebrow: 'Death claims',
    title: 'Filing a Life Insurance Death Claim',
    source: 'IRDAI claim settlement guidance and standard life insurer claim requirements, 2026.',
    summary:
      'A nominee, legal heir, assignee or guardian can file. The insurer must settle within 30 days of receiving all documents; disputed claims can take up to 6 months to investigate.',
    anchor: 'Death Claim Process',
    blocks: [
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '30', label: 'Days for the insurer to settle once documents are complete', tone: 'accent' },
          { value: '6', label: 'Months allowed for investigation in disputed claims', tone: 'warn' },
          { value: '3', label: 'Years — early claims get the closest scrutiny', note: 'Full proposal and medical records', tone: 'danger' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Seven steps from intimation to payout',
        items: [
          { title: 'Intimate the insurer immediately', detail: 'Phone, email, online portal or branch — do not wait for the paperwork.', tone: 'danger' },
          { title: 'Collect the claim forms', detail: 'From the insurer’s website or any branch.', tone: 'primary' },
          { title: 'Gather the mandatory documents', detail: 'Original policy bond, death certificate, claimant’s statement, nominee ID, bank details and a cancelled cheque.', tone: 'primary' },
          { title: 'Add case-specific documents', detail: 'Natural death: medical records and attending physician’s certificate. Accidental death: FIR, panchnama, post-mortem and final police report.', tone: 'primary' },
          { title: 'Submit at the nearest branch', detail: 'The insurer acknowledges receipt and issues a reference number.', tone: 'primary' },
          { title: 'Insurer verifies the claim', detail: 'Documents are checked and an investigator may be appointed.', tone: 'warn' },
          { title: 'Payout to the nominee’s account', detail: 'On approval, the sum assured is transferred by NEFT.', tone: 'accent' },
        ],
        note: 'There is no strict statutory filing deadline — late claims are generally accepted, though they invite extra questions.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 18. IRDAI Claim Settlement Regulations — 30-day rule                    */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'irdai-claim-settlement-regulations-2026-30-day-rule-standardized-forms',
    eyebrow: 'Your rights',
    title: 'The 30-Day Rule, and the Two Forms That Police It',
    source: 'IRDAI (Protection of Policyholders’ Interests) Regulations, 2017 as amended through 2024-25, and IRDAI turnaround-time circulars.',
    summary:
      'Day 1 is the date the insurer receives all required documents — not the date you filed. ACK-1 must be issued within 24 hours; ACK-2 within 5 days. Miss ACK-2 and the insurer cannot later reject the claim for missing documents.',
    anchor: 'The 30-Day Claim Settlement Rule',
    blocks: [
      {
        kind: 'timeline',
        items: [
          { marker: 'Day 0', title: 'You file the claim', detail: 'Online, by post or in person at the insurer’s office.', tone: 'primary' },
          { marker: '24 hrs', title: 'ACK-1 must be issued', detail: 'Reference number, receipt date, documents received, missing list, officer’s name, expected timeline.', tone: 'warn' },
          { marker: '5 days', title: 'ACK-2 deadline', detail: 'Deficiency notice, normally 15 days to comply. No ACK-2 means the claim is treated as complete.', tone: 'danger' },
          { marker: 'Day 30', title: 'Settlement deadline', detail: 'From receipt of all documents. Delay carries interest, typically 2% above bank rate.', tone: 'accent' },
        ],
        note: 'If you file on 1 June but hand over a missing document on 10 June, the clock starts on 10 June.',
      },
      {
        kind: 'compare',
        heading: 'What the insurer may and may not do during the 30 days',
        leftTitle: 'Allowed',
        rightTitle: 'Not allowed',
        rows: [
          { label: 'Documents', left: 'Ask for extra documents once, within 5 days', right: 'Repeatedly asking for the same documents' },
          { label: 'Investigation', left: 'Investigate on suspicion of fraud or misrepresentation', right: 'Open-ended investigation to stall payment' },
          { label: 'Verification', left: 'Verify the claim amount against policy terms', right: 'Citing “internal processing” once documents are complete' },
          { label: 'In person', left: 'Reasonable verification requests', right: 'Forcing an office visit without a valid reason' },
        ],
      },
      {
        kind: 'steps',
        heading: 'When is a claim “settled”?',
        items: [
          { title: 'Amount credited to your bank account', detail: 'The most common test of settlement.', tone: 'accent' },
          { title: 'Formal settlement communication', detail: 'A letter or email confirming settlement also counts.', tone: 'primary' },
          { title: 'Cashless paid to the hospital', detail: 'Payment reaching the hospital directly from the insurer or TPA.', tone: 'primary' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 19. Health Insurance Portability                                        */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'health-insurance-portability-guide-2026',
    eyebrow: 'Portability',
    title: 'Porting Your Health Policy Without Losing Credit',
    source: 'IRDAI health insurance portability guidelines, 2026, and standard insurer portability practice.',
    summary:
      'Apply at least 45 days before renewal. Waiting-period credit and cumulative bonus carry over, and your current insurer must release your claims data to the new one within 3 working days.',
    anchor: 'Step-by-Step Procedure to Port Your Health Insurance Policy',
    blocks: [
      {
        kind: 'timeline',
        items: [
          { marker: 'Day −45', title: 'Start the port', detail: 'Apply at least 45 days before renewal. An expired policy cannot be ported.', tone: 'danger' },
          { marker: 'Day −45', title: 'Submit the IRDAI portability form', detail: 'New proposal form plus the last 4 years of policy documents and claim history.', tone: 'warn' },
          { marker: '3 days', title: 'Data exchange', detail: 'Your current insurer must share health records, claim history and underwriting data.', tone: 'primary' },
          { marker: 'Renewal', title: 'Underwriting and issuance', detail: 'If underwriting overruns renewal, the old insurer grants a 30-day grace on pro-rata premium.', tone: 'accent' },
        ],
      },
      {
        kind: 'stats',
        heading: 'What travels with you',
        columns: 2,
        items: [
          { value: '2 of 4', label: 'Years of a PED waiting period already served are credited', note: 'Only the balance is re-served', tone: 'accent' },
          { value: '100%', label: 'Cumulative bonus carried to the new policy', note: 'Subject to the new insurer’s rules', tone: 'accent' },
        ],
        note: 'Waiting-period credit applies only up to your existing sum insured — an increase attracts a fresh wait on the incremental amount.',
      },
      {
        kind: 'compare',
        heading: 'Stay or port?',
        leftTitle: 'Renew with the same insurer',
        rightTitle: 'Port to a new insurer',
        rows: [
          { label: 'Waiting periods', left: 'Already completed or running', right: 'Credited and carried forward' },
          { label: 'Cumulative bonus', left: 'Retained', right: 'Retained, subject to insurer rules' },
          { label: 'Pricing', left: 'Age-bracket hikes apply', right: 'Competitive first-year pricing and new slabs' },
          { label: 'Service', left: 'Known baseline', right: 'Potential upgrade in hospital network and TPA' },
          { label: 'Effort', left: 'None — auto-renewal', right: '45 days of advance paperwork' },
        ],
        note: 'Insurers cannot reject a port arbitrarily — only for fraud, extreme adverse underwriting risk, or a late application.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 20. Mis-Sold a Policy? Complaint & Refund Guide (static page)           */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'insurance-mis-selling-complaint-refund-2026',
    eyebrow: 'Mis-selling',
    title: 'Two Routes Back to Your Money After a Mis-Sale',
    source: 'IRDAI free-look rules and the Protection of Policyholders’ Interests Regulations, 2017. Escalation eligibility follows each forum’s current rules.',
    summary:
      'Inside the free-look window, cancel and take the refund — no reason needed. Outside it, build the complaint on documents: the gap between what was promised and what was signed.',
    anchor: 'Remedy 1: the free-look window',
    blocks: [
      {
        kind: 'timeline',
        heading: 'The free-look clock',
        items: [
          { marker: 'Day 0', title: 'You receive the policy document', detail: 'The clock starts on receipt — not on issuance. Say so in writing if the agent delayed handing it over.', tone: 'primary' },
          { marker: 'Day 15', title: 'Standard free-look closes', detail: 'Cancel for any reason. Refund = premium less stamp duty, proportionate risk premium and medical-test fee.', tone: 'warn' },
          { marker: 'Day 30', title: 'Many digital sales', detail: 'IRDAI has clarified longer windows for several distribution channels — check your policy document.', tone: 'warn' },
          { marker: 'After that', title: 'Mis-selling complaint', detail: 'Refund is no longer automatic. The case rests on documentary contrast.', tone: 'danger' },
        ],
      },
      {
        kind: 'compare',
        heading: 'The pitch vs the policy document',
        leftTitle: 'What you were told',
        rightTitle: 'What the contract says',
        rows: [
          { label: 'Guaranteed returns', left: '“Guaranteed 8% returns, tax-free”', right: 'Unit-linked plan — returns track the markets' },
          { label: 'Full cover', left: '“This health plan covers everything”', right: 'Sub-limits, room caps, disease-wise exclusions' },
          { label: 'Early exit', left: '“Single premium, money back in 3 years”', right: 'Lock-in of 5–15 years with surrender losses' },
          { label: 'Form filling', left: '“Just sign, I will fill the form”', right: 'Fabricated health and income declarations' },
          { label: 'Product choice', left: '“Endowment is better than term”', right: 'Agent commission is 10–20x higher on endowment' },
        ],
        note: 'For each row above, the evidence is different: the chat promising the figure, the brochure against the policy wording, and the proposal form copy for handwriting mismatches.',
      },
      {
        kind: 'steps',
        heading: 'Building a complaint that survives the first “regret to inform”',
        items: [
          { title: 'Preserve everything before confronting anyone', detail: 'WhatsApp chats, call recordings, emails, brochures — save originals with metadata. Confrontation is when they get deleted.', tone: 'danger' },
          { title: 'Request the proposal form copy', detail: 'If answers on income, existing cover or health are not in your handwriting or style, name exactly which entries are fabricated.', tone: 'primary' },
          { title: 'Complain in one shot, with a specific ask', detail: 'Insurer GRO email with all evidence attached, asking for a refund or reissue of a suitable policy. A specific ask gets a file number.', tone: 'primary' },
          { title: 'Escalate on the reply', detail: 'Bima Bharosa and the Insurance Ombudsman, subject to each forum’s eligibility rules. If the insurer does not reply, the Ombudsman route generally opens after one month.', tone: 'accent' },
        ],
        note: 'Complaints anchored in documents succeed; complaints anchored in memory rarely do. With only your word against the agent’s, the realistic best case is often a conversion, not a refund.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 21. LIC Death Claim Rejected or Delayed — Nominee's Guide (static page)  */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'lic-death-claim-rejected-nominee-guide-2026',
    eyebrow: 'LIC death claims',
    title: 'The Death Claim File: Forms, Deadlines, Grounds',
    source: 'LIC claim practice as handled at branch level, 2026. Award limits follow the amended Redressal of Public Grievances Rules.',
    summary:
      'Use the right form — 3783 for routine claims, 3801 for deaths within three years of commencement. A complete submission with a dated acknowledgment beats five follow-ups.',
    anchor: 'The claim forms, decoded',
    blocks: [
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '3783', label: 'Standard claim form — death after the first 3 years', note: 'The routine path for most families', tone: 'accent' },
          { value: '3801', label: 'Early claim form — death within 3 years', note: 'Triggers verification of proposal details', tone: 'danger' },
          { value: '~30', label: 'Days for a non-early claim from complete documents', tone: 'primary' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Documents that actually decide the claim',
        items: [
          { title: 'Original policy document (bond)', detail: 'Without it the branch cannot open the file cleanly.', tone: 'primary' },
          { title: 'Death certificate', detail: 'Certified copy from the municipal authority.', tone: 'primary' },
          { title: 'Claim form signed by the nominee', detail: '3783 or 3801 as applicable — the wrong form is the #1 cause of returned files.', tone: 'warn' },
          { title: 'Nominee’s photo ID and address proof', detail: 'Aadhaar or PAN, plus address proof.', tone: 'primary' },
          { title: 'NEFT mandate + cancelled cheque or passbook copy', detail: 'Get the account title exactly right — ideally the nominee’s own account.', tone: 'primary' },
          { title: 'Early-claim extras', detail: 'Hospital treatment records, discharge or death summary, and employer certificate — LIC verifies health declarations in this window.', tone: 'danger' },
        ],
        note: 'Carry two photocopy sets and get every page date-stamped with a receipt. Files that vanish for weeks are almost always files without a dated acknowledgment.',
      },
      {
        kind: 'compare',
        heading: 'Reading a repudiation letter',
        leftTitle: 'The ground cited',
        rightTitle: 'How to test it',
        rows: [
          { label: 'Non-disclosure', left: '“Non-disclosure of material facts”', right: 'Insurer must show the fact was material and would have changed underwriting' },
          { label: 'Lapse', left: '“Policy was lapsed”', right: 'Check premium receipts and grace-period rules — factually challengeable if premiums were current' },
          { label: 'Suicide clause', left: 'Plan-specific exclusion window', right: 'Read the exact policy condition; 12–13 months for most plans' },
          { label: 'Title defect', left: 'No valid nomination', right: 'Not a rejection of the claim — complete heirship or succession papers and re-submit' },
        ],
        note: 'Escalation: Branch Manager → Senior Divisional Office → LIC central grievance → Bima Bharosa → Ombudsman. Awards up to ₹50 lakh, subject to eligibility.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 22. Term Insurance Claim Settlement Ratio (static page)                 */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'term-insurance-claim-settlement-ratio-2026',
    eyebrow: 'Term insurance',
    title: 'Claim Settlement Ratio: Top Term Insurers',
    source: 'Insurer disclosures for 2026 as compiled in this guide. Verify the latest CSR with the insurer directly before you buy.',
    summary:
      'Every insurer on this list settles above 99%, and the private-industry average is around 99%. At that level the gap between first and fifth is under one percentage point — so read the ratio as a hygiene check, not a tie-breaker.',
    anchor: 'Claim Settlement Ratio (2026)',
    blocks: [
      {
        kind: 'stats',
        heading: 'CSR by insurer, 2026',
        columns: 3,
        items: [
          { value: '99.72%', label: 'HDFC Life', note: 'Highest CSR in this comparison', tone: 'accent' },
          { value: '99.71%', label: 'Axis Max Life', note: 'Claim resolution and service', tone: 'accent' },
          { value: '99.45%', label: 'Tata AIA', note: 'Digital-first settlement', tone: 'primary' },
          { value: '99.34%', label: 'Max Life', note: 'Financial stability, claim handling', tone: 'primary' },
          { value: '99.09%', label: 'Bajaj Allianz', note: 'Customer support', tone: 'primary' },
          { value: '~99%', label: 'Private-industry average, 2026', note: 'The spread is narrow — see below', tone: 'warn' },
        ],
        note: 'Ranked by CSR. Differences of a fraction of a percent are well inside year-on-year movement.',
      },
      {
        kind: 'steps',
        heading: 'What a 99% CSR does and does not tell you',
        items: [
          { title: 'It counts claims, not rupees', detail: 'Read it alongside the amount settlement ratio, which exposes heavy deductions on large claims.', tone: 'warn' },
          { title: 'It lags the present', detail: 'A published CSR describes a past year. Underwriting, TPA panels and product mix all move.', tone: 'warn' },
          { title: 'It says nothing about your disclosure', detail: 'Most term repudiations trace back to the proposal form, not to the insurer’s Settlement philosophy.', tone: 'danger' },
          { title: 'Use it as a floor, then look at process', detail: 'Digital intimation, document upload and how quickly the insurer asks for what it needs matter more in practice.', tone: 'accent' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 23. Motor Claim Denied? Dispute the Surveyor Report (static page)       */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'motor-insurance-claim-denied-surveyor-dispute-2026',
    eyebrow: 'Motor disputes',
    title: 'Where Your Motor Claim Money Actually Goes',
    source: 'Standard motor policy depreciation schedules and add-on wordings, 2026. Award limit follows the amended Ombudsman Rules.',
    summary:
      'Most motor disputes are not about whether damage happened — they are about which deduction head the surveyor applied. Almost every head has an add-on that neutralises it.',
    anchor: 'Why motor claims actually get denied',
    blocks: [
      {
        kind: 'compare',
        heading: 'Deduction heads decoded',
        leftTitle: 'How it is calculated',
        rightTitle: 'Neutralised by',
        rows: [
          { label: 'Metal parts', left: 'Age-linked percentage — a 5-year-old car often 40–50%', right: 'Zero-depreciation add-on' },
          { label: 'Plastic, rubber, glass', left: 'Fixed percentage by part type', right: 'Zero-depreciation add-on' },
          { label: 'Consumables', left: 'Lubricants, bolts, coolants excluded from the base policy', right: 'Consumables cover' },
          { label: 'Engine hydrostatic lock', left: 'Argued as “consequential” in the base policy', right: 'Engine-protect add-on' },
          { label: 'Salvage', left: 'Value assigned to replaced damaged parts', right: 'Negotiable — challenge the valuation' },
          { label: 'Compulsory excess', left: 'Fixed per policy schedule', right: 'Non-negotiable, but small' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Why motor claims get denied in the first place',
        items: [
          { title: 'Intimation delay', detail: 'Reporting days later with no written reason. Even a same-day WhatsApp message with photos creates a timestamp.', tone: 'danger' },
          { title: 'Repair before inspection', detail: 'The classic self-inflicted denial. Never repair before the surveyor sees the vehicle.', tone: 'danger' },
          { title: 'Driver issues', detail: 'Invalid or expired licence for the vehicle class, drink driving, or the name not being on record where required.', tone: 'danger' },
          { title: 'Consequential damage', detail: 'Engine hydrostatic lock after driving through water, unless you carry engine-protect.', tone: 'warn' },
          { title: 'Geographical limits', detail: 'Accident outside the policy’s coverage territory.', tone: 'warn' },
          { title: 'Commercial use', detail: 'A private car used for hire or cab aggregation without the right cover.', tone: 'warn' },
        ],
        note: 'Some of these are fatal to a claim. Many are not — the difference is usually documentation plus a written challenge.',
      },
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '~75%', label: 'Repair cost, as a share of IDV, that makes it a total loss', tone: 'warn' },
          { value: '30', label: 'Days to demand a reasoned response before escalating', note: 'Put the Ombudsman trigger in writing', tone: 'primary' },
          { value: '₹50L', label: 'Ombudsman award ceiling, subject to eligibility', tone: 'accent' },
        ],
        note: 'Demand a copy of the surveyor’s report in writing, then rebut it line by line with timestamped photos and a workshop assessment.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 24. Cashless Health Insurance Claim Denied at Hospital (static page)     */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'cashless-health-insurance-claim-denied-hospital-2026',
    eyebrow: 'Cashless denials',
    title: 'Why the Cashless Desk Says No',
    source: 'Denial reasons and TPA turnaround data compiled on this page, plus settled cases from advisory practice.',
    summary:
      'Most “rejections” at the hospital desk are actually queries — a missing document the TPA is waiting on. Getting the TPA reference number and pushing the hospital to upload closes many of them in under an hour.',
    anchor: 'Top 15 Cashless Denial Reasons',
    blocks: [
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '6 hrs', label: 'Auto-rejection window when a query goes unanswered', note: 'From the case studies on this page', tone: 'danger' },
          { value: '45 min', label: 'Re-approval time once the missing document was uploaded', tone: 'accent' },
          { value: '₹4.2L', label: 'Cardiac procedure approved after re-submission', tone: 'accent' },
        ],
      },
      {
        kind: 'steps',
        heading: 'The ten denial reasons you will actually meet',
        items: [
          { title: 'Pre-existing disease not declared', detail: 'The first thing the TPA checks against the proposal form.', tone: 'danger' },
          { title: 'Waiting period not completed', detail: 'Initial 30-day, PED, or specific-disease waits still running.', tone: 'warn' },
          { title: 'Room rent or category violation', detail: 'A higher-category room triggers proportionate deduction across the whole bill.', tone: 'warn' },
          { title: 'Insufficient clinical justification for admission', detail: 'The TPA disputes whether hospitalisation was medically necessary.', tone: 'primary' },
          { title: 'Incomplete pre-authorisation documentation', detail: 'The most common cause — and the easiest to fix.', tone: 'primary' },
          { title: 'Treatment at a non-network hospital', detail: 'Cashless needs an empanelled hospital; reimbursement may still be available.', tone: 'primary' },
          { title: 'Sum insured exhausted, no restoration benefit', detail: 'The cover is genuinely used up for the policy year.', tone: 'danger' },
          { title: 'Procedure sub-limit exceeded', detail: 'Cataract, maternity and ICU charges often carry their own caps.', tone: 'warn' },
          { title: 'Policy lapsed or premium overdue', detail: 'No live cover at the time of admission.', tone: 'danger' },
          { title: 'Excluded treatment category', detail: 'Read the exclusion list before admission, not after.', tone: 'warn' },
        ],
      },
      {
        kind: 'compare',
        heading: 'TPA comparison — who processes your cashless',
        leftTitle: 'Network and settlement',
        rightTitle: 'Speed and strength',
        rows: [
          { label: 'Medi Assist', left: '7,000+ hospitals · 94% settlement', right: '~45 min approval — largest network, good app' },
          { label: 'Paramount', left: '5,500+ hospitals · 92% settlement', right: '~60 min — strong in South and West, senior-friendly' },
          { label: 'MDIndia', left: '6,000+ hospitals · 91% settlement', right: '~55 min — government schemes, PSU insurer partner' },
          { label: 'Vidal / Raksha', left: '4,500+ hospitals · 90% settlement', right: '~70 min — in-house TPA for HDFC and ICICI' },
          { label: 'Family Health Plan', left: '5,000+ hospitals · 93% settlement', right: '~50 min — Star Health in-house, high approval rate' },
          { label: 'Heritage / Good Health', left: '3,500+ hospitals · 88% settlement', right: '~80 min — regional strength, personalised service' },
        ],
        note: 'Ask for the TPA reference number on every query. Without one, there is nothing to chase.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 25. Group (Employer) Policy Claim Problems (static page)                */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'group-health-policy-claim-issues-2026',
    eyebrow: 'Group cover',
    title: 'Why Group Health Claims Fail — and the Exit Trap',
    source: 'Group health policy practice as handled through TPAs and HR brokers, 2026.',
    summary:
      'A group policy is a contract between your employer and the insurer; you are not a party to it. That single fact explains almost every group-claim surprise — and why cover ends the day employment does.',
    anchor: 'Why group claims actually get denied',
    blocks: [
      {
        kind: 'steps',
        heading: 'Five reasons group claims get denied',
        items: [
          { title: 'Dependant not on the roster', detail: 'You added your parents in the HR portal, but the enrolment window closed or the addition starts next policy year. Claims are judged against the insurer’s member file.', tone: 'danger' },
          { title: 'The annual reset', detail: 'Group terms are renegotiated every year. Waiting periods, room caps, co-pays and exclusions can change silently at renewal.', tone: 'warn' },
          { title: 'Insurer switched mid-treatment', detail: 'Treatment spanning a change of group insurer lands in a jurisdiction war between two TPAs.', tone: 'warn' },
          { title: 'Corporate buffer confusion', detail: 'When the employer-funded buffer is exhausted the claim bounces instead of moving to the base policy.', tone: 'primary' },
          { title: 'PED exclusions in group underwriting', detail: 'Employees assume group means no PED exclusions. True in generous policies, false in most mid-market ones.', tone: 'warn' },
        ],
      },
      {
        kind: 'compare',
        heading: 'The structural fix: own your foundation cover',
        leftTitle: 'Group policy',
        rightTitle: 'Individual policy',
        rows: [
          { label: 'Who holds the contract', left: 'Your employer and the insurer — you are a beneficiary', right: 'You and the insurer' },
          { label: 'Terms', left: 'Renegotiated every renewal', right: 'Fixed at purchase, renewable for life' },
          { label: 'Continuity', left: 'Ends the day employment does', right: 'Continues through job changes and retirement' },
          { label: 'Waiting periods', left: 'Reset if you buy fresh later', right: 'Expire once and stay expired' },
          { label: 'Best role', left: 'Top-up cover', right: 'The foundation' },
        ],
        note: 'On exit, in order of preference: port to an individual policy, use the group-exit conversion window (usually 30–60 days), then a fresh purchase as the last resort.',
      },
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '30–60', label: 'Days in the group-exit conversion window', note: 'Ask the broker before you lose HR access', tone: 'warn' },
          { value: '4', label: 'Grievance route: GRO, Bima Bharosa, Ombudsman — and HR', note: 'Route it to the insurer, not just HR', tone: 'accent' },
          { value: '1', label: 'Fact that explains nearly every surprise', note: 'You are not party to the contract', tone: 'danger' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 26. Health Portability Rejected or Delayed (static page)                */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'health-insurance-portability-rejected-2026',
    eyebrow: 'Portability',
    title: 'The Porting Clock — and What Kills a Port',
    source: 'IRDAI health insurance portability norms, 2026, including the data-exchange and decision timelines.',
    summary:
      'Apply 45–60 days before renewal. The new insurer has 15 days from receiving your data to decide — and no decision in time means the port is treated as accepted.',
    anchor: 'The porting clock',
    blocks: [
      {
        kind: 'timeline',
        items: [
          { marker: '45–60 days', title: 'Apply to the new insurer', detail: 'On the portability form. Late applications are the number one self-inflicted failure.', tone: 'danger' },
          { marker: '7 days', title: 'Data request', detail: 'The new insurer pulls your claims and underwriting data from the old one via IIB.', tone: 'primary' },
          { marker: '15 days', title: 'Decision deadline', detail: 'From data receipt. No decision in time = the port is treated as accepted under IRDAI norms.', tone: 'accent' },
          { marker: 'Renewal date', title: 'Do not let the old policy lapse', detail: 'Pay the renewal if needed — a lapsed policy kills the credit you are porting.', tone: 'danger' },
        ],
      },
      {
        kind: 'compare',
        heading: 'Why a port gets rejected or loaded — and the counter',
        leftTitle: 'What the insurer sees',
        rightTitle: 'What you can do',
        rows: [
          { label: 'Claims-heavy history', left: 'Premium loaded 15–50%, or the condition excluded', right: 'Negotiate the loading with current normal reports or a higher voluntary deductible' },
          { label: 'Chronic condition declared', left: 'Diabetes or hypertension surfaces in underwriting', right: 'Documented remission history — loadings are offers, not laws' },
          { label: 'Data gaps', left: 'Incomplete transmission priced conservatively', right: 'File a data-correction request through the old insurer and re-apply' },
          { label: 'Low to high sum insured', left: '₹5 lakh porting to ₹50 lakh triggers full fresh underwriting', right: 'Port the base first, raise the sum insured in later renewals' },
          { label: 'Missed deadlines', left: 'No room for the data round-trip', right: 'Apply at 45–60 days; parallel-apply to two insurers' },
        ],
        note: '“Underwriting decline” is not a reason. Ask in writing which factor drove it, then attack the data rather than the decision.',
      },
      {
        kind: 'steps',
        heading: 'If the port stalls',
        items: [
          { title: 'Grievance to both insurers’ GROs', detail: 'Cite the IRDAI portability timelines and attach every acknowledgement.', tone: 'primary' },
          { title: 'Bima Bharosa, then the Ombudsman', detail: 'Escalate if unresolved in 30 days.', tone: 'warn' },
          { title: 'Never let the old policy lapse while negotiating', detail: 'If the port fails this year, renewal preserves continuity for next year’s attempt.', tone: 'accent' },
        ],
        note: 'Portability complaints are among the few categories where the paper trail alone often settles the matter.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 27. Best Health Insurance for Parents Above 60 (static page)            */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'best-health-insurance-for-parents-above-60-india-2026',
    eyebrow: 'Senior cover',
    title: 'Senior Health Plans Compared — Premium and Payout Track Record',
    source: 'Plan comparison as published on this page for 2026. Premiums are indicative for a 65-year-old male, ₹10 lakh cover, metro. CSR is 2024-25.',
    summary:
      'Premiums for a 65-year-old at ₹10 lakh span ₹19,500 to ₹31,200 a year, and claim settlement ratios span 94.5% to 98.5%. The tie-breaker is usually the PED waiting period and the co-pay, not the price.',
    anchor: 'Quick Comparison: Top 6 Senior Health Plans',
    blocks: [
      {
        kind: 'bars',
        heading: 'Indicative annual premium — 65-year-old male, ₹10 lakh, metro',
        max: 32000,
        items: [
          { label: 'Niva Bupa Senior First', value: 31200, display: '₹31,200', tone: 'warn' },
          { label: 'HDFC ERGO Optima Secure', value: 28500, display: '₹28,500', tone: 'primary' },
          { label: 'Care Senior Health Advantage', value: 26800, display: '₹26,800', tone: 'primary' },
          { label: 'Aditya Birla Activ Health Senior', value: 25600, display: '₹25,600', tone: 'primary' },
          { label: 'Star Senior Care', value: 24200, display: '₹24,200', tone: 'primary' },
          { label: 'Acko Senior Care', value: 19500, display: '₹19,500', tone: 'accent' },
        ],
        note: 'Acko is the cheapest here but carries a 20% mandatory co-pay for 60+ and the smallest network (6,500+ hospitals).',
      },
      {
        kind: 'stats',
        heading: 'The two clauses that decide a senior claim',
        columns: 3,
        items: [
          { value: '30 days', label: 'PED wait on HDFC ERGO Optima Secure', note: 'With the Secure benefit, ~15–20% loading', tone: 'accent' },
          { value: '48 mths', label: 'PED wait on every other plan compared here', note: 'The IRDAI cap', tone: 'danger' },
          { value: '₹1,00,000', label: 'Maximum Section 80D deduction when you and both parents are 60+', tone: 'accent' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Which plan fits which situation',
        items: [
          { title: 'Parents have diabetes, BP or cardiac history', detail: 'HDFC ERGO Optima Secure with the Secure benefit — the 30-day PED wait is unmatched. One cardiac hospitalisation can cost ₹5–15 lakh.', tone: 'accent' },
          { title: 'Budget is the binding constraint', detail: 'Star Senior Care or Acko. Star has the better network and claim record; Acko is cheaper but has a 20% co-pay and a smaller network.', tone: 'warn' },
          { title: 'You want zero out-of-pocket at claim time', detail: 'Care Senior Health Advantage — no co-payment at any age, but you accept the 48-month PED wait.', tone: 'primary' },
          { title: 'You want cover that grows and includes OPD', detail: 'Niva Bupa Senior First with the OPD add-on — 20% no-claim bonus a year means ₹10 lakh becomes ₹20 lakh in five claim-free years.', tone: 'primary' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 28. LIC Policy Revival After 5 Years (static page)                      */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'lic-policy-revival-after-5-years-guide-2026',
    eyebrow: 'Lapsed beyond 5 years',
    title: 'Five Routes Back From a Lapsed LIC Policy',
    source: 'LIC revival rules, Special Revival Scheme campaign terms and loan-cum-revival practice as published on this page, 2026.',
    summary:
      'Standard revival closes five years from the first unpaid premium. Beyond that, the Special Revival Scheme is the only revival route — discretionary, campaign-only, with mandatory medicals and Central Office approval.',
    anchor: 'LIC Revival Rules at a Glance',
    blocks: [
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '5 yrs', label: 'Standard revival window from first unpaid premium', note: 'After this it closes', tone: 'danger' },
          { value: '9%', label: 'Interest charged on arrears, p.a.', note: 'Loan interest currently 9–10%', tone: 'warn' },
          { value: '2–3', label: 'Years of premiums before a paid-up value accrues', tone: 'primary' },
        ],
      },
      {
        kind: 'compare',
        heading: 'Revival routes compared',
        leftTitle: 'Window, cost and medicals',
        rightTitle: 'Approval',
        rows: [
          { label: 'Standard, within 3 years', left: 'Up to 3 years · 9% p.a. · medical may be waived for small premiums', right: 'Branch level, usually 7–15 days' },
          { label: 'Standard, 3–5 years', left: '3–5 years · 9% p.a. · medical mandatory', right: 'Branch plus Divisional Office, 15–30 days' },
          { label: 'Special Revival Scheme', left: 'Campaign periods only · 9% p.a., sometimes reduced · mandatory plus extra tests', right: 'Central Office, 60–90 days, discretionary' },
          { label: 'Loan-cum-revival', left: 'Policy must have surrender value · loan interest 9–10% · no medical', right: 'Quick, 3–7 days — the loan clears the arrears' },
          { label: 'Installment revival', left: 'Within 5 years, branch discretion · 9% p.a. on each instalment', right: 'Branch level, arrears cleared over 6–12 months' },
        ],
      },
      {
        kind: 'decision',
        question: 'Revive, surrender, or make it paid-up?',
        branches: [
          {
            condition: 'Revive if',
            outcome: 'Keep the original contract',
            detail: 'High reversionary bonuses, close to maturity, revival cost is manageable, or you can no longer get equivalent term cover on health grounds.',
            tone: 'accent',
          },
          {
            condition: 'Surrender if',
            outcome: 'Take the special surrender value',
            detail: 'Revival cost is high against the surrender value plus a new term premium; early in the term with low bonuses; or money-back survival benefits were missed and will not be restored.',
            tone: 'danger',
          },
          {
            condition: 'Paid-up if',
            outcome: 'Reduced cover, no more premiums',
            detail: 'You cannot afford revival but do not want to lose everything. Bonuses earned up to the lapse date stay attached.',
            tone: 'warn',
          },
        ],
        note: 'Surrender plus a pure term plan is the usual alternative: a healthy buyer can get ₹1 crore of term cover for roughly ₹15,000–25,000 a year.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 29. Health Insurance Claim Rejection: Your Legal Rights                 */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'health-insurance-claim-rejection-rights-2026',
    eyebrow: 'Your rights',
    title: 'What the Law Gives You When a Health Claim Is Rejected',
    source: 'IRDAI (Protection of Policyholders’ Interests) Regulations, 2017 and the Insurance Act, 1938.',
    summary:
      'Roughly 15–20% of health claims are denied at first instance, and most are reversible. The insurer must give written reasons citing the specific clause, and must settle within 30 days or pay interest at 2% above bank rate.',
    anchor: 'Why Health Insurance Claims Get Rejected',
    blocks: [
      {
        kind: 'stats',
        columns: 3,
        items: [
          { value: '15–20%', label: 'Health claims denied at first instance', note: 'IRDAI data, as cited here', tone: 'danger' },
          { value: '30', label: 'Days to settle once all documents are in', note: 'Regulation 36', tone: 'warn' },
          { value: '2%', label: 'Interest above bank rate payable on delayed settlement', tone: 'accent' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Your rights, in the order you use them',
        items: [
          { title: 'Written reasons citing the clause', detail: 'The insurer cannot simply say “claim denied” — it must point to the specific policy provision relied on.', tone: 'primary' },
          { title: 'Settlement within 30 days', detail: 'From receipt of all documents. Miss it and interest at 2% above bank rate becomes payable.', tone: 'accent' },
          { title: 'The moratorium on pre-existing disease', detail: 'After continuous coverage — 2 to 4 years depending on the policy — a PED denial is no longer open to the insurer.', tone: 'accent' },
          { title: 'Protection from rescission after 2 years', detail: 'Under the Insurance Act, a policy cannot be voided for non-disclosure after two years unless it was fraudulent.', tone: 'primary' },
          { title: 'Escalation to IRDAI and the Ombudsman', detail: 'Free, and no lawyer is required at the Ombudsman.', tone: 'primary' },
        ],
      },
      {
        kind: 'stats',
        heading: 'The waiting periods behind most denials',
        columns: 3,
        items: [
          { value: '30', label: 'Days initial waiting period', note: 'Accidents covered immediately', tone: 'warn' },
          { value: '2–4', label: 'Years for pre-existing conditions', tone: 'warn' },
          { value: '2', label: 'Years for specific diseases such as cataract and hernia', tone: 'warn' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 30. Health Insurance Restoration Benefit                                */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'health-insurance-restoration-benefit-reclaim-sum-insured-2026',
    eyebrow: 'Restoration benefit',
    title: 'How Restoration Refills an Exhausted Sum Insured',
    source: 'Standard restoration benefit wordings across Indian health policies, 2026.',
    summary:
      'Restoration only triggers after the base sum insured is fully used, covers future claims in the same policy year, and any unused restored amount expires at renewal.',
    anchor: 'How Does Restoration Benefit Actually Work',
    blocks: [
      {
        kind: 'timeline',
        heading: 'A ₹10 lakh family floater with restoration',
        items: [
          { marker: 'March', title: '₹9.5 lakh cardiac claim paid', detail: 'The base sum insured is nearly exhausted.', tone: 'warn' },
          { marker: 'April', title: 'Restoration activates', detail: 'A ₹4 lakh accident claim is paid from the restored cover, not from your pocket.', tone: 'accent' },
          { marker: 'Renewal', title: 'Unused restored cover expires', detail: 'It does not carry forward into the next policy year.', tone: 'danger' },
        ],
      },
      {
        kind: 'steps',
        heading: 'The four rules that govern it',
        items: [
          { title: 'The base cover must be exhausted first', detail: 'You cannot claim restoration while you still have balance cover.', tone: 'primary' },
          { title: 'It happens automatically', detail: 'Once claims equal the sum insured, the insurer restores — usually 100% of the base sum insured.', tone: 'accent' },
          { title: 'It does not carry forward', detail: 'Any unused restored amount expires at the end of the policy year.', tone: 'warn' },
          { title: 'It applies to future claims only', detail: 'Restoration covers claims arising after exhaustion — it does not reimburse claims already paid.', tone: 'warn' },
        ],
        note: 'Not every policy offers restoration, and those that do differ on how many times it can be triggered in a year. Check the wording before you rely on it.',
      },
      {
        kind: 'compare',
        heading: 'Who should prioritise it',
        leftTitle: 'Restoration matters most',
        rightTitle: 'Restoration matters less',
        rows: [
          { label: 'Household', left: 'Family floater covering several generations', right: 'Single member, low claim likelihood' },
          { label: 'Cover size', left: 'Modest sum insured against high treatment costs', right: 'Sum insured already well above likely claims' },
          { label: 'Health profile', left: 'Multiple members with ongoing conditions', right: 'Young, healthy, no chronic conditions' },
          { label: 'Alternative', left: 'No top-up or super top-up in place', right: 'A super top-up already covers the same gap' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 31. How to Calculate IDV for Your Vehicle                               */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'how-to-calculate-idv-insured-declared-value-vehicle-2026',
    eyebrow: 'Motor cover',
    title: 'IDV: What Your Insurer Will Actually Pay on a Total Loss',
    source: 'IRDAI standardised depreciation rates for IDV, and the negotiated basis used for vehicles older than five years.',
    summary:
      'IDV is the current market value after depreciation — the ceiling on any theft or total-loss payout. Set it too low and you are under-insured; too high and you pay premium you cannot claim.',
    anchor: 'How Is IDV Calculated',
    blocks: [
      {
        kind: 'bars',
        heading: 'IRDAI standard depreciation by vehicle age',
        max: 55,
        items: [
          { label: 'Not exceeding 6 months', value: 5, display: '5%', tone: 'accent' },
          { label: '6 months – 1 year', value: 15, display: '15%', tone: 'primary' },
          { label: '1 – 2 years', value: 20, display: '20%', tone: 'primary' },
          { label: '2 – 3 years', value: 30, display: '30%', tone: 'warn' },
          { label: '3 – 4 years', value: 40, display: '40%', tone: 'warn' },
          { label: '4 – 5 years', value: 50, display: '50%', tone: 'danger' },
        ],
        note: 'Beyond 5 years there is no fixed rate — IDV is agreed between you and the insurer, guided by a surveyor and local market value, typically 40–60% of ex-showroom.',
      },
      {
        kind: 'stats',
        heading: 'The formula, worked on a ₹10 lakh ex-showroom car',
        columns: 3,
        items: [
          { value: '₹9.5L', label: '3 months old — 5% depreciation', tone: 'accent' },
          { value: '₹7.0L', label: '2.5 years old — 30% depreciation', tone: 'primary' },
          { value: '₹6.0L', label: '4 years old — 40% depreciation', tone: 'warn' },
        ],
        note: 'IDV = (ex-showroom price − depreciation) + (accessories value − depreciation on accessories).',
      },
      {
        kind: 'compare',
        heading: 'Getting the number right',
        leftTitle: 'Setting IDV too low',
        rightTitle: 'Setting IDV too high',
        rows: [
          { label: 'Premium', left: 'Cheaper every renewal', right: 'Higher premium for cover you cannot claim' },
          { label: 'At total loss', left: 'Payout falls short of replacement cost', right: 'Payout is still capped at the real market value' },
          { label: 'Who it suits', left: 'Nobody — it is a silent under-insurance', right: 'Nobody — you overpay for years' },
        ],
        note: 'Factory-fitted accessories depreciate at the vehicle rate; after-market accessories are depreciated at a flat 50% regardless of age.',
      },
    ],
  },
  {
    slug: 'lic-accidental-death-disability-rider-guide-2026',
    eyebrow: 'LIC riders',
    title: 'What ₹2,500 a Year Buys: The ADB and PD Rider Math',
    source:
      'LIC rider costs for a 35-year-old non-smoker on a ₹50 lakh base sum assured with a 25-year term, as published in this guide, 2026.',
    summary:
      'Accidents cause only 5–8% of deaths in India, which is why LIC prices accidental death and permanent disability cover so cheaply. Around ₹1,800–3,500 a year adds ₹1 crore of extra protection on top of a ₹50 lakh base policy.',
    anchor: 'How Much Do ADB and PD Riders Cost?',
    blocks: [
      {
        kind: 'stats',
        heading: 'The cost of doubling your cover',
        columns: 3,
        items: [
          { value: '₹800–1,500', label: 'ADB rider, ₹50 lakh accidental death cover, per year', tone: 'accent' },
          { value: '₹1,000–2,000', label: 'PD rider, ₹50 lakh permanent disability cover, per year', tone: 'accent' },
          { value: '₹1,800–3,500', label: 'Both riders together — ₹1 crore of extra cover', tone: 'primary' },
        ],
      },
      {
        kind: 'stats',
        heading: 'Why the riders are this cheap',
        columns: 3,
        items: [
          { value: '5–8%', label: 'Share of all deaths in India that are accidental', note: 'Low probability keeps the premium low', tone: 'warn' },
          { value: '₹6,000–8,000', label: 'Base LIC term premium for ₹50 lakh, 35-year-old', tone: 'neutral' },
          { value: '₹8,500–10,500', label: 'All-in annual premium once both riders are added', tone: 'primary' },
        ],
      },
      {
        kind: 'ladder',
        heading: 'What the permanent disability rider actually pays',
        items: [
          { tier: '100%', title: 'Total permanent disability', detail: 'Loss of both hands or both feet, loss of one hand and one foot, loss of sight in both eyes, or paralysis.', tone: 'accent' },
          { tier: '50%', title: 'Partial permanent disability', detail: 'Loss of one hand or one foot, loss of sight in one eye, or loss of hearing in both ears.', tone: 'warn' },
          { tier: '0%', title: 'Not covered', detail: 'Death or disability from illness, suicide in the first year, self-inflicted injury, crime, substance abuse, hazardous sports, war or terrorism.', tone: 'danger' },
        ],
        note: 'Exact percentages vary by plan. LIC assesses the degree of disability through a medical board or panel doctor.',
      },
      {
        kind: 'steps',
        heading: 'Filing an ADB or PD rider claim',
        items: [
          { title: 'Intimate LIC immediately', detail: 'Call the toll-free number 1800-258-5577, visit your branch, or file online.', tone: 'primary' },
          { title: 'Submit the documents', detail: 'Claim form 3783, death certificate, the FIR, post-mortem and hospital records, nominee ID and the original policy bond.', tone: 'primary' },
          { title: 'LIC investigates', detail: 'A surveyor may verify police and hospital records to confirm the death was accidental.', tone: 'warn' },
          { title: 'Settlement', detail: 'Base sum assured plus the rider amount, paid to the nominee — typically within 30 days of receiving all documents.', tone: 'accent' },
        ],
        note: 'Riders must be bought with the policy. You cannot add ADB or PD to an existing LIC policy later.',
      },
    ],
  },
  {
    slug: 'money-back-policy-vs-term-insurance-sip-which-better-returns-2026',
    eyebrow: 'Returns compared',
    title: 'Money-Back Policy vs Term + SIP: 25 Years, ₹5 Lakh of Premium',
    source:
      'Worked example from this article: a 30-year-old investing ₹20,000 a year for 25 years. SIP returns assumed at a conservative 12% CAGR.',
    summary:
      'Both routes cost the same ₹5 lakh over 25 years. The money-back policy returns ₹11.25 lakh and covers ₹5 lakh of life risk. Term insurance plus a SIP returns ₹13.27 lakh and covers ₹1 crore — 20 times the life cover and nearly double the return.',
    anchor: 'Head-to-Head Comparison',
    blocks: [
      {
        kind: 'bars',
        heading: 'Total money received after 25 years on ₹5 lakh of premium',
        items: [
          { label: 'Money-back: survival + maturity', value: 1125000, display: '₹11,25,000', note: '₹75,000 every 5 years plus ₹7.5 lakh at maturity', tone: 'warn' },
          { label: 'Term + SIP: corpus at 12% CAGR', value: 1327000, display: '₹13,27,000', note: '₹8,000 a year invested, ₹12,000 a year for cover', tone: 'accent' },
          { label: 'Premiums paid (identical in both)', value: 500000, display: '₹5,00,000', tone: 'neutral' },
        ],
        note: 'Net gain: ₹6,25,000 on the money-back policy against ₹8,27,000 from the SIP.',
      },
      {
        kind: 'compare',
        heading: 'The verdict, line by line',
        leftTitle: 'Money-back policy',
        rightTitle: 'Term insurance + SIP',
        rows: [
          { label: 'Life cover', left: '₹5,00,000', right: '₹1,00,00,000' },
          { label: 'Effective annual return', left: '~4.5–5.0%', right: '~8.5–9.0%' },
          { label: 'Liquidity if you need money early', left: 'Low — surrender penalty', right: 'High — partial withdrawal possible' },
          { label: 'Tax on the maturity proceeds', left: 'Exempt under Sec 10(10D)', right: 'LTCG above ₹1.25 lakh taxed at 12.5%' },
          { label: 'Transparency', left: 'Low — bonuses are not guaranteed', right: 'High — NAV is visible daily' },
        ],
        note: 'Twenty times the life cover and nearly twice the return for the same outlay.',
      },
      {
        kind: 'stats',
        heading: 'When the money-back policy still wins',
        columns: 3,
        items: [
          { value: '20x', label: 'More life cover from the term + SIP route', tone: 'accent' },
          { value: '₹667', label: 'Monthly SIP in the comparison, after paying for term cover', tone: 'primary' },
          { value: '5', label: 'Situations where money-back still makes sense, including forced discipline and age above 55', note: 'See the article for the full list', tone: 'warn' },
        ],
      },
    ],
  },
  {
    slug: 'lic-premium-payment-modes-2026',
    eyebrow: 'LIC premiums',
    title: 'The LIC Payment Clock: Grace Period, Interest, Lapse',
    source:
      'LIC grace period, late-fee interest and payment-mode rules as published in this 2026 guide. Interest is charged at 10% p.a. simple on the overdue premium.',
    summary:
      'You get 30 days of grace after the due date on annual, half-yearly and quarterly premiums — 15 days if you pay monthly — with the policy still fully active. Miss it and LIC charges 10% a year on the overdue premium, backdated to the due date.',
    anchor: 'LIC Premium Payment Grace Period',
    blocks: [
      {
        kind: 'stats',
        heading: 'Grace, interest and the minimum charge',
        columns: 3,
        items: [
          { value: '30 days', label: 'Grace on yearly, half-yearly and quarterly premiums', note: 'Policy stays active, no late fee', tone: 'accent' },
          { value: '15 days', label: 'Grace if you pay monthly', tone: 'warn' },
          { value: '10% p.a.', label: 'Simple interest on overdue premium after grace', note: 'Charged from the due date, minimum ₹5 a month', tone: 'danger' },
        ],
      },
      {
        kind: 'timeline',
        heading: 'What happens after your due date',
        items: [
          { marker: 'Due date', title: 'Premium falls due', detail: 'Interest on any late payment is calculated from this date, not from the end of the grace period.', tone: 'neutral' },
          { marker: '+15 / 30 days', title: 'Grace period ends', detail: 'Cover continues and a claim is still payable, minus the unpaid premium. No penalty yet.', tone: 'accent' },
          { marker: 'After grace', title: 'Interest starts', detail: '10% a year simple on the overdue amount. A ₹50,000 premium paid 30 days late costs ₹411 extra.', tone: 'warn' },
          { marker: 'Lapse', title: 'Policy lapses', detail: 'To revive you must clear every overdue premium with interest, plus a Good Health Certificate above ₹5 lakh.', tone: 'danger' },
        ],
      },
      {
        kind: 'compare',
        heading: 'Setting it and forgetting it: ECS vs Auto-Pay',
        leftTitle: 'ECS (bank mandate)',
        rightTitle: 'Auto-Pay (LIC portal)',
        rows: [
          { label: 'Works for monthly premiums?', left: 'Yes', right: 'No — yearly, half-yearly and quarterly only' },
          { label: 'Where you set it up', left: 'LIC branch or your bank branch', right: 'Online through the LIC customer portal' },
          { label: 'How long until it goes live', left: '15–30 days', right: 'Immediately after OTP authentication' },
          { label: 'How you cancel it', left: 'Branch visit', right: 'Online, any time' },
          { label: 'If the debit fails', left: 'The bank returns the debit', right: 'LIC may cancel the mandate after two consecutive failures' },
        ],
        note: 'Whichever you choose, keep the due date funded — a failed mandate still needs a manual payment inside the grace period.',
      },
    ],
  },
  {
    slug: 'zero-depreciation-car-insurance-add-on-cover-guide-2026',
    eyebrow: 'Motor add-ons',
    title: 'Zero Depreciation: What the Standard Policy Deducts',
    source:
      'Depreciation schedules and 2026 add-on premium ranges as published in this guide. Rates are indicative and vary by insurer.',
    summary:
      'A standard comprehensive policy applies 10–50% depreciation to the parts replaced in a claim, so a ₹15,000 bumper can leave you ₹4,500–6,000 out of pocket. The zero depreciation add-on removes that deduction and typically costs ₹1,500–7,000 a year.',
    anchor: 'How Does Zero Depreciation Cover Work?',
    blocks: [
      {
        kind: 'compare',
        heading: 'The same ₹15,000 bumper claim, two years into the policy',
        leftTitle: 'Standard comprehensive',
        rightTitle: 'With zero depreciation',
        rows: [
          { label: 'Depreciation applied to the plastic part', left: '30–40%', right: 'None' },
          { label: 'Insurer pays', left: '₹9,000 – ₹10,500', right: '₹15,000' },
          { label: 'Shortfall you bear', left: '₹4,500 – ₹6,000', right: 'Nil' },
          { label: 'Add-on premium for a 0–3 year sedan', left: '—', right: '₹2,000 – ₹3,500 a year' },
        ],
        note: 'One mid-range sedan bumper claim saves ₹4,000–8,000 — more than a year of add-on premium.',
      },
      {
        kind: 'bars',
        heading: 'Depreciation the standard policy applies, by component',
        max: 50,
        items: [
          { label: 'Engine & transmission, after 3 years', value: 50, display: '50%', tone: 'danger' },
          { label: 'Rubber & nylon parts', value: 50, display: 'up to 50%', tone: 'danger' },
          { label: 'Batteries & tyres', value: 40, display: '30–50%', tone: 'warn' },
          { label: 'Fibre & plastic, per year', value: 30, display: '15–30%', tone: 'warn' },
          { label: 'Paint & upholstery, per year', value: 15, display: '15%', tone: 'neutral' },
          { label: 'Metal body panels, per year', value: 15, display: '10–15%', tone: 'neutral' },
          { label: 'Glass & headlights', value: 0, display: 'nil*', tone: 'accent' },
        ],
        note: '*No depreciation on glass, but a standard policy covers only 50% of the cost. Zero depreciation lifts this too.',
      },
      {
        kind: 'stats',
        heading: 'What the add-on costs for a 0–3 year car',
        items: [
          { value: '₹1,500–3,500', label: 'Hatchback, per year', tone: 'accent' },
          { value: '₹2,500–5,000', label: 'Sedan, per year', tone: 'accent' },
          { value: '₹3,500–7,000', label: 'SUV, per year', tone: 'primary' },
          { value: '₹5,000–15,000', label: 'Luxury car, per year', note: 'Premiums vary 15–30% between insurers for identical cover', tone: 'warn' },
        ],
      },
    ],
  },
  {
    slug: 'section-80c-insurance-premium-deduction-2026-save-tax-life-insurance',
    eyebrow: 'Tax planning',
    title: 'The 10% Cap That Silently Shrinks Your 80C Claim',
    source:
      'Section 80C rules, the 10%/20% sum-assured caps and the regime comparison as published in this 2026 guide.',
    summary:
      'For policies issued on or after 1 April 2012, only premium up to 10% of the sum assured qualifies for 80C. A typical endowment with ₹8 lakh of cover and a ₹1.4 lakh premium qualifies for just ₹80,000 — ₹60,000 of the premium earns no deduction at all.',
    anchor: 'The 10% Sum Assured Cap',
    blocks: [
      {
        kind: 'ladder',
        heading: 'How the cap bites, three worked cases',
        items: [
          { tier: 'Under cap', title: '₹50 lakh cover, ₹4.5 lakh premium', detail: 'The 10% cap is ₹5,00,000, so the full ₹4,50,000 qualifies for deduction.', meta: 'Full claim', tone: 'accent' },
          { tier: 'Over cap', title: '₹50 lakh cover, ₹6 lakh premium', detail: 'Only ₹5,00,000 qualifies. The remaining ₹1,00,000 earns no deduction.', meta: '₹1L wasted', tone: 'warn' },
          { tier: 'The endowment trap', title: '₹8 lakh cover, ₹1.4 lakh premium', detail: 'The 10% cap is just ₹80,000, so ₹60,000 of what you pay is outside 80C entirely.', meta: '₹60,000 wasted', tone: 'danger' },
        ],
        note: 'Policies issued before 1 April 2012 get the older, more generous 20% of sum assured cap.',
      },
      {
        kind: 'stats',
        heading: 'The deductions that share the ₹1.5 lakh bucket',
        columns: 3,
        items: [
          { value: '₹1,50,000', label: 'Section 80C ceiling — LIC, PPF, ELSS, NSC, tuition fees, home loan principal', tone: 'primary' },
          { value: 'Shared', label: '80CCC pension premiums and 80CCD(1) NPS contributions come out of the same ₹1.5 lakh', tone: 'warn' },
          { value: '₹50,000', label: 'Section 80CCD(1B) — the one NPS deduction that sits outside the bucket', tone: 'accent' },
        ],
      },
      {
        kind: 'compare',
        heading: 'Old vs new regime on ₹15 lakh of income',
        leftTitle: 'Old tax regime',
        rightTitle: 'New tax regime',
        rows: [
          { label: '80C deduction', left: '₹1,50,000 allowed', right: 'Not allowed' },
          { label: 'Standard deduction', left: '₹50,000', right: '₹50,000' },
          { label: 'Taxable income', left: '₹13,00,000', right: '₹14,50,000' },
          { label: 'Tax payable (approx)', left: '₹1,72,500', right: '₹2,02,500' },
        ],
        note: 'Staying on the old regime saves about ₹30,000 at this income level — and more as income rises.',
      },
    ],
  },
  {
    slug: 'life-insurance-in-india-2026-complete-guide-to-choosing-the-right-policy',
    eyebrow: 'Buying guide',
    title: 'How Much Cover You Need, and What to Check Before You Buy',
    source:
      'Cover-sizing rules, IRDAI solvency requirements and 2026 claim settlement ratios as published in this guide.',
    summary:
      'Target 15–20 times your annual income, or liabilities plus 20 years of expenses plus future goals, less liquid assets. Then check the insurer on claim settlement ratio, amount settlement ratio and a solvency ratio comfortably above the IRDAI minimum of 1.5.',
    anchor: 'Key Metrics to Evaluate Life Insurers in 2026',
    blocks: [
      {
        kind: 'steps',
        heading: 'Sizing your cover in five moves',
        items: [
          { title: 'Start with the income multiplier', detail: 'Aim for 15–20 times your annual income, especially while you carry loans.', tone: 'primary' },
          { title: 'Add every outstanding liability', detail: 'Home loan, car loan and personal loan balances.', tone: 'primary' },
          { title: 'Add 20 years of household expenses', detail: 'Current annual expense multiplied by 20.', tone: 'primary' },
          { title: 'Add future goals', detail: "Children's education and marriage funds.", tone: 'primary' },
          { title: 'Subtract what you already have', detail: 'Existing liquid assets your family could draw on immediately.', tone: 'accent' },
        ],
        note: 'The guide’s worked case: ₹15 lakh income, a ₹50 lakh home loan and two children points to ₹2–2.5 crore of term cover.',
      },
      {
        kind: 'ladder',
        heading: 'Term, ULIP or endowment',
        items: [
          { tier: 'Term', title: 'Pure risk protection', detail: '₹1 crore to ₹5 crore+ of cover for a small premium, with no maturity value. Extremely cost-efficient.', meta: '80C + 10(10D)', tone: 'accent' },
          { tier: 'ULIP', title: 'Wealth creation plus cover', detail: 'Market-linked returns with cover around 10x the annual premium. Charges are high, so cost efficiency is only moderate.', meta: '80C + 10(10D)', tone: 'primary' },
          { tier: 'Endowment', title: 'Guaranteed savings plus cover', detail: 'Fixed but low-IRR returns, cover around 10x premium, and heavy agent commission. The least cost-efficient of the three.', meta: '80C + 10(10D)', tone: 'warn' },
        ],
      },
      {
        kind: 'stats',
        heading: 'What to check on the insurer',
        columns: 3,
        items: [
          { value: '99.72%', label: 'LIC claim settlement ratio — HDFC Life 99.7%, ICICI Prudential 97.9%', note: 'Top Indian insurers sit above 97%', tone: 'accent' },
          { value: '1.5', label: 'IRDAI minimum solvency ratio — top-tier insurers run 1.8 to 2.1', tone: 'primary' },
          { value: '₹18,000', label: 'Annual premium in the case study for ₹2 crore of term cover to age 65', tone: 'accent' },
        ],
      },
    ],
  },
  {
    slug: 'lic-lapsed-policy-revival-loan-interest-rate-2026',
    eyebrow: 'LIC revival',
    title: 'What a Lapsed LIC Policy Costs to Bring Back',
    source:
      'LIC revival routes and the 10.50% p.a. interest rate compounded half-yearly, as published in this 2026 guide.',
    summary:
      'LIC charges 10.50% a year, compounded half-yearly, on overdue premiums. ₹50,000 of arrears left for three years costs ₹17,834 in interest — and there are four different revival routes depending on how long the policy has been lapsed.',
    anchor: 'Interest Rate on Lapsed LIC Policy Premiums (2026)',
    blocks: [
      {
        kind: 'bars',
        heading: 'What the arrears grow to at 10.50% p.a., compounded half-yearly',
        items: [
          { label: '₹50,000 arrears, lapsed 1 year', value: 55378, display: '₹55,378', note: '₹5,378 interest', tone: 'warn' },
          { label: '₹50,000 arrears, lapsed 2 years', value: 61313, display: '₹61,313', note: '₹11,313 interest', tone: 'warn' },
          { label: '₹50,000 arrears, lapsed 3 years', value: 67834, display: '₹67,834', note: '₹17,834 interest', tone: 'danger' },
          { label: '₹1,00,000 arrears, lapsed 1 year', value: 110756, display: '₹1,10,756', note: '₹10,756 interest', tone: 'warn' },
          { label: '₹1,00,000 arrears, lapsed 2 years', value: 122625, display: '₹1,22,625', note: '₹22,625 interest', tone: 'danger' },
        ],
        note: 'Actual amounts vary slightly with the exact date of payment. Get the figure confirmed by the branch or the online revival calculator.',
      },
      {
        kind: 'ladder',
        heading: 'Four ways back from a lapse',
        items: [
          { tier: 'Route 1', title: 'Ordinary revival', detail: 'Pay every overdue premium with interest. No fresh medical if the revival amount is under ₹2 lakh and the policy was issued within the last 5 years.', meta: 'Within 5 years', tone: 'accent' },
          { tier: 'Route 2', title: 'Loan-cum-revival', detail: 'Use the surrender value your policy has built up as a loan to clear the arrears, when you have no liquid cash.', tone: 'primary' },
          { tier: 'Route 3', title: 'Instalment revival', detail: 'Pay part of the arrears upfront and the rest in monthly instalments spread over the remaining premium-paying term.', tone: 'primary' },
          { tier: 'Route 4', title: 'Revival by fresh medical', detail: 'Required once the policy has been lapsed for more than 2 years or the sum assured crosses LIC thresholds.', meta: 'Lapsed 2+ years', tone: 'warn' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Six steps to reinstate the policy',
        items: [
          { title: 'Check the policy status', detail: 'licindia.in or the LIC app — confirm the lapse and note the first unpaid premium date.', tone: 'primary' },
          { title: 'Calculate the outstanding amount', detail: 'Use the online revival calculator or ask the branch for the exact figure including interest.', tone: 'primary' },
          { title: 'Gather the documents', detail: 'Original policy bond, ID and address proof, a recent photograph, medical reports if required, and the loan form if you are using loan-cum-revival.', tone: 'primary' },
          { title: 'Pay the revival amount', detail: 'LIC e-Services with net banking, card, or a demand draft at any branch.', tone: 'warn' },
          { title: 'Submit the revival application', detail: 'File it with the branch along with the payment receipt.', tone: 'primary' },
          { title: 'Collect the revival confirmation', detail: 'The policy is reinstated once LIC accepts the application.', tone: 'accent' },
        ],
      },
    ],
  },
  {
    slug: 'nps-section-80ccd1b-extra-50000-tax-deduction-india-2026',
    eyebrow: 'NPS tax break',
    title: 'The ₹50,000 Deduction That Sits Outside Your 80C Limit',
    source:
      'Section 80CCD(1B) rules, NPS tax treatment and return data as published in this 2026 guide. Sources: PFRDA annual reports, NPS Trust data.',
    summary:
      'Section 80CCD(1B) gives NPS investors an extra ₹50,000 deduction on top of the ₹1.5 lakh 80C ceiling — worth about ₹15,000 of tax, an instant 30% return. At 60 you can take 60% of the corpus completely tax-free.',
    anchor: 'NPS vs Other 80C Investments',
    blocks: [
      {
        kind: 'ladder',
        heading: 'Three retirement buckets, not one',
        items: [
          { tier: 'Bucket 1', title: 'Section 80C', detail: 'PPF, ELSS, life insurance premiums, EPF and home loan principal all compete for the same ceiling.', meta: 'Up to ₹1,50,000', tone: 'primary' },
          { tier: 'Bucket 2', title: 'Section 80CCD(1B)', detail: 'Your own NPS contribution, entirely separate from 80C. Locked till 60, with partial withdrawal allowed.', meta: 'Up to ₹50,000', tone: 'accent' },
          { tier: 'Bucket 3', title: 'Section 80CCD(2)', detail: "Your employer's NPS contribution — never counted against your own ₹1.5 lakh limit.", meta: '10–14% of basic', tone: 'accent' },
        ],
        note: 'The three buckets alone can cross ₹2,00,000 of annual deductions before 80D, HRA, LTA or home loan interest.',
      },
      {
        kind: 'ladder',
        heading: 'NPS against the usual alternatives',
        items: [
          { tier: 'NPS', title: 'Tier-I retirement account', detail: 'Up to 75% equity, locked till age 60, partially taxable on withdrawal. Carries the extra ₹50,000 deduction.', meta: '9–12% expected', tone: 'accent' },
          { tier: 'ELSS', title: 'Equity mutual fund', detail: '100% equity with a 3-year lock-in. Long-term gains above ₹1.25 lakh are taxed at 12.5%.', meta: '12–15% expected', tone: 'primary' },
          { tier: 'PPF', title: 'Government-backed savings', detail: 'No equity exposure and a 15-year lock-in, but the proceeds are fully tax-free.', meta: '7.1%', tone: 'neutral' },
        ],
        note: 'NPS is not the highest-returning option — the deduction is what makes it competitive.',
      },
      {
        kind: 'stats',
        heading: 'Tax treatment at each stage',
        columns: 3,
        items: [
          { value: '₹50,000', label: 'Deducted at contribution — worth about ₹15,000 of tax saved', note: 'A 30% instant return', tone: 'accent' },
          { value: '60%', label: 'Lump sum at 60 that is entirely tax-free', note: 'Raised from 40% by Budget 2024', tone: 'accent' },
          { value: '25%', label: 'Of your own contributions, withdrawable tax-free after 3 years for specified goals', tone: 'primary' },
        ],
        note: 'The remaining 40% must go into an annuity, and that annuity income is taxed at your slab rate.',
      },
    ],
  },
  {
    slug: 'deferred-vs-immediate-annuity-tax-section-80ccc-10-10a-2026',
    eyebrow: 'Annuity taxation',
    title: 'How Much of Your Annuity Is Actually Taxed',
    source:
      'Section 80CCC deduction rules and the Section 10(10A) exemption formula, with the worked example from this 2026 guide.',
    summary:
      'Section 80CCC lets you deduct up to ₹1.5 lakh of annuity premium, shared with 80C and only under the old regime. When the income starts, Section 10(10A) exempts the purchase-price proportion of each payment — in the guide’s example just ₹12,000 of ₹72,000 a year is taxable.',
    anchor: 'How Annuity Income Is Taxed Under Section 10(10A)',
    blocks: [
      {
        kind: 'stats',
        heading: 'The numbers that matter',
        columns: 3,
        items: [
          { value: '₹1,50,000', label: 'Maximum 80CCC deduction, shared with 80C and 80CCD(1)', note: 'Old tax regime only', tone: 'primary' },
          { value: '₹60,000', label: 'Exempt share of ₹72,000 annual annuity in the guide’s example', tone: 'accent' },
          { value: '₹12,000', label: 'Left to add to your taxable income for the year', tone: 'warn' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Working out your taxable portion',
        items: [
          { title: 'Find the purchase price', detail: 'What you paid for the annuity contract — ₹10,00,000 in the guide’s example.', tone: 'primary' },
          { title: 'Find the total expected return', detail: 'The actuarial total you are projected to receive, stated in the contract — ₹12,00,000 here.', tone: 'primary' },
          { title: 'Apply the exemption formula', detail: 'Exempt = (purchase price ÷ total expected return) × annuity received = ₹60,000.', tone: 'accent' },
          { title: 'Subtract to get taxable income', detail: 'Annuity received minus the exempt portion leaves ₹12,000 to declare.', tone: 'warn' },
        ],
        note: 'An annuity received without consideration — by inheritance or gift — is taxable in full, with no exempt portion.',
      },
      {
        kind: 'compare',
        heading: 'Deferred or immediate',
        leftTitle: 'Deferred annuity',
        rightTitle: 'Immediate annuity',
        rows: [
          { label: 'How you pay', left: 'Premiums over several years', right: 'One lump sum' },
          { label: 'When the 80CCC deduction lands', left: 'Claimed annually through the accumulation phase', right: 'Claimed once, in the year you pay' },
          { label: 'Accumulation phase', left: 'Fund grows tax-deferred', right: 'None — income starts at once' },
          { label: 'Commutation on payout', left: 'Exempt under 10(10A) up to one-third, one-half in some cases', right: 'Exempt under 10(10A) up to one-third' },
          { label: 'Best suited to', left: 'Someone still working, with years to retirement', right: 'Someone already retired who needs income now' },
        ],
        note: 'Either way the annuity income is taxed under Section 10(10A), not exempt.',
      },
    ],
  },
  {
    slug: 'lic-maturity-amount-calculator-bonus-rates-2026',
    eyebrow: 'LIC maturity',
    title: 'Inside Your LIC Maturity Payout: SA, Bonus, FAB and LA',
    source:
      'LIC bonus rates declared for 2025-26 and the worked Jeevan Anand example, as published in this 2026 guide. Rates are indicative — confirm on licindia.in.',
    summary:
      'A maturity payout is not just the sum assured. In the guide’s 20-year Jeevan Anand example, ₹10 lakh of sum assured becomes ₹24.5 lakh once ₹10 lakh of vested bonuses and ₹4.5 lakh of Final Addition Bonus are added.',
    anchor: 'LIC Bonus Rates 2025-26',
    blocks: [
      {
        kind: 'bars',
        heading: 'Bonus declared for 2025-26, per ₹1,000 of sum assured',
        max: 60,
        items: [
          { label: 'Jeevan Anand (915)', value: 52, display: '₹52', note: 'FAB ₹36–60 per ₹1,000', tone: 'accent' },
          { label: 'Jeevan Lakshya (870)', value: 50, display: '₹50', note: 'FAB ₹30–55 per ₹1,000', tone: 'primary' },
          { label: 'New Endowment (914)', value: 50, display: '₹50', note: 'FAB ₹28–52 per ₹1,000', tone: 'primary' },
          { label: 'Jeevan Utsav (871)', value: 50, display: '₹50', note: 'FAB ₹40–65 per ₹1,000', tone: 'primary' },
          { label: 'Amritbaal (873)', value: 48, display: '₹48', note: 'No Final Addition Bonus', tone: 'neutral' },
        ],
        note: 'Index Plus (950) is a ULIP — no reversionary bonus, the payout is market-linked. LIC revises rates every year.',
      },
      {
        kind: 'steps',
        heading: 'The four components of the payout',
        items: [
          { title: 'Basic sum assured', detail: 'The guaranteed floor printed on your policy bond — you never receive less than this at maturity.', tone: 'accent' },
          { title: 'Reversionary bonuses', detail: 'Declared each year as a rate per ₹1,000 of sum assured. They accrue annually, pay out at maturity, and are guaranteed once vested.', tone: 'primary' },
          { title: 'Final Addition Bonus', detail: 'A one-time bonus on policies completing 15+ years, higher for longer terms. Not guaranteed — it depends on LIC’s performance in your maturity year.', tone: 'warn' },
          { title: 'Loyalty Addition', detail: 'Plan-specific and newer, generally seen on plans launched after 2015.', tone: 'neutral' },
        ],
      },
      {
        kind: 'stats',
        heading: 'The guide’s worked example: Jeevan Anand, ₹10 lakh, 20 years',
        columns: 3,
        items: [
          { value: '₹10,00,000', label: 'Basic sum assured', tone: 'accent' },
          { value: '₹10,00,000', label: 'Vested bonus — ₹50 per ₹1,000 a year, over 20 years', tone: 'primary' },
          { value: '₹24,50,000', label: 'Total payout once ₹4,50,000 of Final Addition Bonus is added', note: 'Before any outstanding loan or advance is deducted', tone: 'accent' },
        ],
      },
    ],
  },
  {
    slug: 'health-insurance-portability-india-2026-switch-insurer-without-losing-benefits',
    eyebrow: 'Portability',
    title: 'The 60-Day Porting Clock, and What Follows You to the New Insurer',
    source:
      'IRDAI health insurance portability timelines, transfer rules and rejection grounds as published in this 2026 guide.',
    summary:
      'Start researching 60 days before renewal, apply to the new insurer by 45 days, and they must decide within 15 days. Waiting-period credit, accumulated no-claim bonus and covered pre-existing conditions all follow you across.',
    anchor: 'Health Insurance Portability Process',
    blocks: [
      {
        kind: 'timeline',
        heading: 'The porting countdown',
        items: [
          { marker: '60 days', title: 'Research and compare', detail: 'Coverage, network hospitals in your city, claim settlement ratio, exclusions and waiting periods.', tone: 'primary' },
          { marker: '45 days', title: 'Apply to the new insurer', detail: 'Portability form, proposal form, previous policy copy, renewal notice, claim history and ID proof.', tone: 'warn' },
          { marker: '15 days', title: 'The new insurer must decide', detail: 'They pull your claims data through the IRDAI Health Insurance Portability Portal and must reply in writing if rejecting.', tone: 'primary' },
          { marker: 'Renewal', title: 'The switch completes', detail: 'The new policy takes effect and the old one is deemed ported.', tone: 'accent' },
        ],
        note: 'An insurer cannot reject you only because of your claims history or pre-existing conditions — only for a policy-type mismatch, incomplete documents, or underwriting on a sum-insured increase.',
      },
      {
        kind: 'compare',
        heading: 'What crosses over and what does not',
        leftTitle: 'Transfers',
        rightTitle: 'Does not transfer',
        rows: [
          { label: 'Waiting-period credit', left: 'Years already served count — 2 of 3 leaves 1', right: 'Extra waits can be imposed for conditions your old plan never covered' },
          { label: 'No-claim bonus', left: 'The full accumulated NCB carries over', right: 'Nothing — a brand new policy starts at zero' },
          { label: 'Pre-existing disease cover', left: 'Conditions already covered stay covered', right: 'Anything not previously covered resets' },
          { label: 'Sum insured', left: 'Carries over and can be increased', right: 'Sub-limits and room rent caps are set afresh' },
          { label: 'Premium and riders', left: '—', right: 'New rates by age and city; old benefits like maternity or OPD may not exist' },
          { label: 'Free-look period', left: '—', right: 'The old window is gone; a fresh 15-day one applies' },
        ],
      },
      {
        kind: 'stats',
        heading: 'The deadlines people miss',
        columns: 3,
        items: [
          { value: '45 days', label: 'Apply by this point before your renewal date', note: 'Applying too late is the most common mistake', tone: 'warn' },
          { value: '15 days', label: 'The insurer’s deadline to accept or reject, with reasons in writing', tone: 'primary' },
          { value: '3–4 years', label: 'Claim history the new insurer pulls through the IRDAI portal', tone: 'neutral' },
        ],
      },
    ],
  },
  {
    slug: 'pension-plans-india-2026-nps-annuity-pension-insurance-complete-guide',
    eyebrow: 'Retirement',
    title: 'What It Costs to Retire on ₹3 Crore, by the Age You Start',
    source:
      'Corpus and contribution examples from this 2026 guide. Assumes a ₹3 crore target at age 60 with market-linked returns.',
    summary:
      'Delay is expensive. Reaching the same ₹3 crore corpus takes roughly ₹5,000 a month from age 25, ₹15,000 from age 35, and ₹45,000 from age 45. The guide recommends splitting the corpus across NPS for growth and pension insurance for guaranteed income.',
    anchor: 'How Much Pension Do You Need?',
    blocks: [
      {
        kind: 'bars',
        heading: 'Monthly investment needed for a ₹3 crore corpus at 60',
        items: [
          { label: 'Starting at 25', value: 5000, display: '₹5,000/mo', note: 'Builds ₹3+ crore', tone: 'accent' },
          { label: 'Starting at 35', value: 15000, display: '₹15,000/mo', note: 'Three times the monthly outlay', tone: 'warn' },
          { label: 'Starting at 45', value: 45000, display: '₹45,000/mo', note: 'Almost unaffordable for the same corpus', tone: 'danger' },
        ],
        note: 'Rule of thumb: plan for a monthly pension of 70–80% of your last drawn salary. At ₹50,000 of monthly expenses today, 6% inflation and retirement at 60, the guide puts the corpus at roughly ₹3–4 crore.',
      },
      {
        kind: 'ladder',
        heading: 'The three pension vehicles',
        items: [
          { tier: 'NPS', title: 'National Pension System', detail: 'A 0.01% fund management fee, market-linked returns, government backing and flexible investment choice.', meta: 'Growth engine', tone: 'accent' },
          { tier: 'Pension insurance', title: 'Traditional pension plan', detail: 'Guaranteed returns with no market risk, life cover included, and no investment decisions to make.', meta: 'Guaranteed floor', tone: 'primary' },
          { tier: 'Annuity', title: 'Annuity plan', detail: 'Converts the corpus you have built into an income stream that lasts as long as you do.', meta: 'Income for life', tone: 'neutral' },
        ],
        note: 'The guide’s recommendation: combine them — NPS for growth, pension insurance for guaranteed income.',
      },
      {
        kind: 'stats',
        heading: 'The tax treatment',
        columns: 3,
        items: [
          { value: '₹1.5L', label: 'Section 80C deduction on the premium paid', tone: 'primary' },
          { value: '₹50,000', label: 'Extra Section 80CCD(1B) deduction for NPS contributions', tone: 'accent' },
          { value: '1/3', label: 'Of the maturity amount is tax-free under Section 10(10A)', note: 'Annuity income is taxable as regular income', tone: 'warn' },
        ],
      },
    ],
  },
  {
    slug: 'gst-on-life-insurance-premium-2026-input-tax-cost-explained',
    eyebrow: 'GST on premiums',
    title: 'One Question Decides Your GST Rate: Individual or Group?',
    source:
      '56th GST Council decision effective 22 September 2025, per the Ministry of Finance statement: individual life and individual health premiums, and reinsurance thereof, are exempt. Group policies are not.',
    summary:
      'Since 22 September 2025 individual life and health premiums carry 0% GST, while group cover stays at 18%. New policies are GST-free from the first payment; existing ones shed the tax at the next renewal falling on or after that date.',
    anchor: 'GST Rates for Different Types of Life Insurance',
    blocks: [
      {
        kind: 'compare',
        heading: 'The Individual / Group Split',
        leftTitle: 'Individual policy',
        rightTitle: 'Group policy',
        rows: [
          { label: 'GST since 22 Sep 2025', left: '0% — fully exempt', right: '18% — not exempt' },
          { label: 'What falls under it', left: 'Term, whole life, endowment, ULIP, family floater, senior citizen', right: 'Employer or association group life and group health cover' },
          { label: 'Reinsurance of those policies', left: 'Also exempt', right: 'Not exempt' },
          { label: 'Input tax credit', left: 'Nothing to claim — no GST is charged', right: 'Employer can claim ITC if GST-registered' },
          { label: 'Section 80C deduction', left: 'The full premium qualifies, within the ₹1.5 lakh cap', right: 'Only the net premium, excluding GST' },
        ],
        note: 'Individual annuity and pension plans are not named separately in the Council’s list — check the GST line on your invoice.',
      },
      {
        kind: 'timeline',
        heading: 'When the exemption reaches you',
        items: [
          { marker: '3 Sep 2025', title: 'Council recommends it', detail: 'The 56th GST Council recommends exempting individual life and individual health insurance premiums.', tone: 'primary' },
          { marker: '22 Sep 2025', title: 'Exemption takes effect', detail: '0% GST on individual life and health cover, including the reinsurance services thereof.', tone: 'accent' },
          { marker: 'Next renewal', title: 'Existing policies catch up', detail: 'On a policy you already hold, the GST component drops off at the renewal falling on or after 22 Sep 2025.', tone: 'accent' },
          { marker: '2026', title: 'Still in force', detail: 'The exemption stands. Group cover — the main place 18% GST still bites — has not been brought into it.', tone: 'warn' },
        ],
        note: 'Buy a fresh policy on or after 22 Sep 2025 and it is GST-free from your first payment. GST already charged before that date is not refunded.',
      },
      {
        kind: 'stats',
        heading: 'What the exemption takes off your premium',
        columns: 3,
        items: [
          { value: '18% → 0%', label: 'GST on individual life and health premiums', note: 'Group cover unchanged at 18%', tone: 'accent' },
          { value: '₹2,288', label: 'A year removed from a ₹15,000 term premium', note: 'About ₹68,800 across a 30-year term', tone: 'primary' },
          { value: '₹7,627', label: 'A year removed from a ₹50,000 endowment premium', note: 'Now stays in the policy instead of going out as tax', tone: 'primary' },
        ],
      },
    ],
  },
  {
    slug: 'whole-life-vs-term-vs-endowment-insurance-comparison-2026',
    eyebrow: 'Choosing cover',
    title: 'Term, Whole Life or Endowment: What ₹1 Crore Costs',
    source:
      'Premium bands, returns and the "buy term and invest the rest" math as published in this 2026 guide. Premiums are for a 30-year-old.',
    summary:
      'For ₹1 crore of cover at age 30, term insurance costs ₹800–1,200 a month against ₹8,000–15,000 for whole life and ₹6,000–12,000 for endowment. The gap is the argument for buying term and investing the difference.',
    anchor: 'Head-to-Head Comparison Table',
    blocks: [
      {
        kind: 'bars',
        heading: 'Monthly premium for ₹1 crore of cover, age 30 (upper end of each band)',
        items: [
          { label: 'Term insurance', value: 1200, display: '₹800–1,200', note: '10–40 years of cover, no maturity value', tone: 'accent' },
          { label: 'Endowment plan', value: 12000, display: '₹6,000–12,000', note: 'Sum assured plus bonuses at maturity', tone: 'warn' },
          { label: 'Whole life insurance', value: 15000, display: '₹8,000–15,000', note: 'Cover to age 99–100 with a cash value', tone: 'danger' },
        ],
        note: 'Both whole life and endowment give you the cover and a 4–6% return on the savings built up inside the policy.',
      },
      {
        kind: 'ladder',
        heading: 'What each one is actually for',
        items: [
          { tier: 'Term', title: 'Pure protection', detail: '10–40 years of cover, no maturity benefit and no cash value, but high flexibility through riders. Best for income replacement.', meta: 'Section 80C', tone: 'accent' },
          { tier: 'Whole life', title: 'Lifetime protection plus savings', detail: 'Cover runs to age 99–100. A cash value builds at roughly 4–6% and can be tapped in an emergency. Best for estate planning and legacy.', meta: 'Section 80C', tone: 'primary' },
          { tier: 'Endowment', title: 'Goal-based savings plus cover', detail: 'A 10–30 year term paying sum assured plus bonuses at maturity, with a surrender value if you exit early. Roughly 4–6% and the least flexible of the three.', meta: 'Section 80C', tone: 'warn' },
        ],
      },
      {
        kind: 'stats',
        heading: 'Buy term and invest the rest',
        columns: 3,
        items: [
          { value: '₹7,000/mo', label: 'The gap between a ₹1 crore term plan and a ₹10 lakh endowment, at age 30', tone: 'accent' },
          { value: '₹1.15 crore', label: 'What that gap becomes over 25 years at an assumed 12%', tone: 'accent' },
          { value: '₹10–15 lakh', label: 'What the endowment plan itself would have paid at maturity', note: 'And you keep the ₹1 crore of term cover either way', tone: 'warn' },
        ],
      },
    ],
  },
  {
    slug: 'lic-joint-life-policy-benefits-eligibility-2026',
    eyebrow: 'LIC joint life',
    title: 'One Policy for Two Lives: What LIC Joint Life Costs and Saves',
    source:
      'LIC joint life eligibility rules and the premium comparison as published in this 2026 guide. Figures are the guide’s worked example over a 25-year term.',
    summary:
      'A joint life policy covers two lives on one contract. In the guide’s example it costs ₹1,85,000 a year against ₹4,40,000 for two separate policies — but pays once on first death, and only a handful of LIC plans offer it.',
    anchor: 'Eligibility Criteria for LIC Joint Life Policies',
    blocks: [
      {
        kind: 'stats',
        heading: 'Who qualifies',
        items: [
          { value: '18–50', label: 'Entry age for both lives', note: 'Neither life may be above 70 at maturity', tone: 'primary' },
          { value: '20 years', label: 'Maximum age difference between the two lives', tone: 'primary' },
          { value: '₹5 lakh', label: 'Sum assured above which both lives must be medically examined', tone: 'warn' },
          { value: '₹2 lakh', label: 'Minimum combined sum assured', note: 'Typically up to ₹50 lakh for non-medical cases', tone: 'neutral' },
        ],
      },
      {
        kind: 'compare',
        heading: 'Joint life against two individual policies',
        leftTitle: 'Joint life policy',
        rightTitle: 'Two individual policies',
        rows: [
          { label: 'Annual premium', left: '₹1,85,000 combined', right: '₹2,20,000 each — ₹4,40,000' },
          { label: 'Total over 25 years', left: '₹46.25 lakh', right: '₹1.10 crore' },
          { label: 'Payout on first death', left: '₹50 lakh, one single payout', right: '₹50 lakh, and the other policy carries on' },
          { label: 'Cover for the survivor', left: 'Continues free', right: 'Must keep paying premiums' },
          { label: 'Section 80C', left: 'One claim between you', right: 'Two separate claims' },
          { label: 'Choice of plan', left: 'Only a few LIC plans offer it', right: 'Any plan you like' },
          { label: 'If both survive to maturity', left: 'One joint payout', right: 'Two separate payouts' },
        ],
        note: 'Drawbacks the guide flags: a single point of failure, limited plan selection, a more complicated claim for the survivor, and no separate bonus accumulation.',
      },
      {
        kind: 'ladder',
        heading: 'LIC plans that offer the joint life option',
        items: [
          { tier: '915', title: 'Jeevan Anand', detail: 'Endowment with a whole-life extension. Sum assured plus bonuses pay out on first death and cover continues for the survivor.', meta: 'From inception', tone: 'accent' },
          { tier: '870', title: 'Jeevan Lakshya', detail: 'Endowment with an income benefit — an annual payout after maturity, with joint life lowering the premium burden.', meta: 'Available as an option', tone: 'primary' },
          { tier: '914', title: 'New Endowment Plan', detail: 'A simple pure endowment with guaranteed additions and the lowest premium of the three.', meta: 'Available on request', tone: 'primary' },
          { tier: '873', title: 'Amritbaal', detail: 'A non-linked child endowment, letting a parent cover themselves with the child as secondary life.', meta: 'Limited — check the branch', tone: 'neutral' },
        ],
        note: 'LIC accepts spouses, business partners with insurable-interest documentation, and in some variants a parent and adult child. One of the two lives must be the proposer.',
      },
    ],
  },
  {
    slug: 'motor-insurance-in-india-2026-car-and-two-wheeler-insurance-complete-guide',
    eyebrow: 'Motor insurance',
    title: 'The No-Claim Bonus Ladder and What Add-Ons Really Cost',
    source:
      'NCB discount slabs and 2026 add-on pricing as published in this guide. Costs are indicative and vary by insurer, IDV and city.',
    summary:
      'Every claim-free year moves you up the no-claim bonus ladder, from 20% after one year to a 50% discount on your own-damage premium after five. The right add-ons cost a few hundred rupees; NCB protection costs ₹300–800.',
    anchor: 'No Claim Bonus (NCB) Explained',
    blocks: [
      {
        kind: 'bars',
        heading: 'Discount on your own-damage premium, by claim-free years',
        max: 50,
        items: [
          { label: 'After 1 claim-free year', value: 20, display: '20%', tone: 'primary' },
          { label: 'After 2 claim-free years', value: 25, display: '25%', tone: 'primary' },
          { label: 'After 3 claim-free years', value: 35, display: '35%', tone: 'accent' },
          { label: 'After 4 claim-free years', value: 45, display: '45%', tone: 'accent' },
          { label: 'After 5 claim-free years', value: 50, display: '50%', tone: 'accent' },
        ],
        note: 'NCB belongs to you, not the insurer — it transfers when you change insurer or buy a new vehicle.',
      },
      {
        kind: 'ladder',
        heading: 'The add-ons worth knowing, and what they add to the premium',
        items: [
          { tier: '+15–20%', title: 'Zero Depreciation', detail: 'Full replacement cost of parts with no depreciation deducted. Best for new cars.', meta: 'Up to 5–7 years', tone: 'accent' },
          { tier: '+₹500–1,500', title: 'Engine Protection', detail: 'Water ingression and oil-leakage damage. Best for flood-prone areas.', meta: 'Up to 7–10 years', tone: 'primary' },
          { tier: '+10–15%', title: 'Return to Invoice', detail: 'Bridges the gap between the IDV and what you actually paid. Best for new cars.', meta: 'Up to 3 years', tone: 'primary' },
          { tier: '+₹300–800', title: 'NCB Protection', detail: 'Keeps your accumulated no-claim bonus intact after one claim.', meta: 'Any age', tone: 'primary' },
          { tier: '+₹200–500', title: 'Roadside Assistance', detail: 'Towing, tyre change, battery jump and fuel delivery. Best for highway travellers.', meta: 'Any age', tone: 'neutral' },
        ],
        note: 'Percentage add-ons are charged on the own-damage premium; the rest are flat fees. A ₹15 lakh personal accident cover for the owner-driver is mandatory, not optional.',
      },
      {
        kind: 'compare',
        heading: 'Comprehensive, or third-party plus pick-and-choose?',
        leftTitle: 'Comprehensive policy',
        rightTitle: 'Third-party + selective add-ons',
        rows: [
          { label: 'Vehicle age', left: 'New to 5–7 years old', right: 'Older than 7–8 years' },
          { label: 'Vehicle value', left: 'High value — premium cars and SUVs', right: 'Low market value' },
          { label: 'Usage', left: 'Daily commute, long drives', right: 'Occasional use, city only' },
          { label: 'Risk profile', left: 'Flood-prone or high-theft area', right: 'Secure parking, low-risk area' },
          { label: 'Budget', left: 'Can afford 1.5–2x the third-party premium', right: 'Tight budget, minimum compliance' },
          { label: 'Add-ons that fit', left: 'Zero dep, engine protect, RTI, NCB protect', right: 'Engine protect if flood-prone, roadside assistance' },
        ],
        note: 'The guide’s recommendation: for most private cars under 7 years, comprehensive with zero depreciation and engine protection is the sweet spot.',
      },
    ],
  },
  {
    slug: 'sme-insurance-in-india-2026-complete-guide-for-small-and-medium-businesses',
    eyebrow: 'Business cover',
    title: 'Building an SME Insurance Portfolio by Business Type',
    source:
      'SME insurance products, IRDAI standardised Bharat packages and portfolio design steps as published in this 2026 guide.',
    summary:
      'The right portfolio depends on what the business does: a factory needs fire, machinery and Workmen’s Compensation, a services firm needs professional indemnity and cyber, a retailer needs burglary and goods in transit. Underinsurance triggers the average clause.',
    anchor: 'Decision Framework',
    blocks: [
      {
        kind: 'ladder',
        heading: 'Highest-priority covers, by what you do',
        items: [
          { tier: 'Manufacturing', title: 'Fire, machinery, people', detail: 'Fire and allied perils, machinery breakdown, burglary, Workmen’s Compensation and business interruption.', meta: 'Highest priority', tone: 'danger' },
          { tier: 'IT / services', title: 'Advice, data, decisions', detail: 'Professional indemnity, cyber liability, Directors & Officers cover and an office package.', meta: 'Highest priority', tone: 'primary' },
          { tier: 'Retail / wholesale', title: 'Stock, on site and in transit', detail: 'Burglary, fire, goods in transit (marine) and public liability.', meta: 'Highest priority', tone: 'warn' },
        ],
        note: 'Workmen’s Compensation is mandatory under the Factories Act and labour law; public liability is mandatory for hazardous industries under the Public Liability Insurance Act.',
      },
      {
        kind: 'compare',
        heading: 'A packaged policy or covers bought one at a time',
        leftTitle: 'Bharat package policy',
        rightTitle: 'Standalone covers',
        rows: [
          { label: 'What it is', left: 'One bundled policy — Bharat Sookshma or Laghu Udyam Suraksha', right: 'Individual policies bought one at a time' },
          { label: 'Sum insured ceiling', left: '₹5 crore (Sookshma) or ₹50 crore (Laghu)', right: 'No statutory ceiling' },
          { label: 'Administration', left: 'One policy, one renewal date', right: 'Several policies and renewal dates' },
          { label: 'Cover design', left: 'Standardised wordings set by IRDAI', right: 'Tailored to your specific risk' },
          { label: 'Best for', left: 'Micro and small enterprises wanting breadth cheaply', right: 'Larger businesses or unusual risks' },
        ],
        note: 'The guide’s rule: value assets at current replacement cost, not book value. Underinsurance triggers the average clause, which cuts every claim in proportion to what you under-declared.',
      },
      {
        kind: 'stats',
        heading: 'The numbers behind the advice',
        columns: 3,
        items: [
          { value: '30%+', label: 'Of India’s GDP comes from SMEs', tone: 'primary' },
          { value: '₹50 crore', label: 'Sum insured ceiling under Bharat Laghu Udyam Suraksha', note: '₹5 crore under Bharat Sookshma', tone: 'accent' },
          { value: '18%', label: 'GST on commercial insurance premiums', note: 'Reclaimable as ITC if you are GST-registered', tone: 'warn' },
        ],
      },
    ],
  },
  {
    slug: 'lic-latest-plans-2026-jeevan-utsav-amritbaal-index-plus',
    eyebrow: 'LIC plans',
    title: 'LIC’s 2026 Flagships: Income, a Child’s Corpus, or Market Growth',
    source:
      'LIC plan features, premium paying terms and the retirement case study as published in this 2026 guide.',
    summary:
      'Jeevan Utsav is a whole-life plan built for guaranteed lifetime income, Amritbaal a child endowment with guaranteed additions of about ₹80 per ₹1,000, and Index Plus a unit-linked plan for long-term market growth.',
    anchor: 'Comparison Table',
    blocks: [
      {
        kind: 'ladder',
        heading: 'The three flagship plans',
        items: [
          { tier: '871', title: 'Jeevan Utsav', detail: 'Whole life with fixed guaranteed additions, not linked to markets. Built for a lifelong regular cash flow.', meta: '5–16 year PPT', tone: 'accent' },
          { tier: '876', title: 'Amritbaal', detail: 'A child endowment with guaranteed additions of roughly ₹80 per ₹1,000 of sum assured. Built for an education corpus.', meta: '5–7 year PPT', tone: 'primary' },
          { tier: '829', title: 'Index Plus', detail: 'Unit-linked, so the value tracks the market and moves with it. Built for long-term wealth creation.', meta: '10–25 year PPT', tone: 'warn' },
        ],
        note: 'PPT is the premium paying term — the number of years you pay, which is shorter than the policy term on the traditional plans.',
      },
      {
        kind: 'compare',
        heading: 'Guaranteed or market-linked',
        leftTitle: 'Guaranteed (Utsav, Amritbaal)',
        rightTitle: 'Market-linked (Index Plus)',
        rows: [
          { label: 'How the return is set', left: 'Fixed guaranteed additions declared up front', right: 'Tracks the index and moves with the market' },
          { label: 'Premium paying term', left: '5–16 years (Utsav), 5–7 years (Amritbaal)', right: '10–25 years' },
          { label: 'Who it suits', left: 'Retirees, income seekers, parents funding a child’s education', right: 'Long-term equity investors comfortable with volatility' },
          { label: 'The trade-off', left: 'Returns may trail inflation over long periods', right: 'The value can fall as well as rise' },
        ],
      },
      {
        kind: 'stats',
        heading: 'The guide’s retirement case study',
        columns: 3,
        items: [
          { value: '15 years', label: 'Premium paying term on the Jeevan Utsav plan', tone: 'accent' },
          { value: '10%', label: 'Guaranteed annual payout from age 60, for life', tone: 'accent' },
          { value: '6 years', label: 'Premium paying term on the Amritbaal plan for his daughter', note: 'Ramesh, 45, a Nagpur contractor, combined lifelong income with his 12-year-old’s education fund', tone: 'primary' },
        ],
      },
    ],
  },
  {
    slug: 'bike-insurance-engine-protection-cover-guide-2026',
    eyebrow: 'Two-wheeler add-ons',
    title: 'Why a Comprehensive Bike Policy Still Rejects Engine Claims',
    source:
      'Standard policy exclusions, add-on coverage and 2026 pricing as published in this guide. Repair costs vary by bike model.',
    summary:
      'A standard comprehensive policy classes water-damaged engines as mechanical breakdown and excludes them. Engine protection costs ₹150–500 a year and covers what a hydrolocked engine costs to fix: ₹15,000 to over ₹1,00,000.',
    anchor: 'How Much Does Engine Protection Cover Cost?',
    blocks: [
      {
        kind: 'compare',
        heading: 'A hydrolocked engine, with and without the add-on',
        leftTitle: 'Standard comprehensive',
        rightTitle: 'With engine protection',
        rows: [
          { label: 'How it is classified', left: 'Mechanical or electrical breakdown — an exclusion', right: 'A covered peril once the add-on is attached' },
          { label: 'Water ingression', left: 'Not covered', right: 'Cylinders, pistons and crankshaft covered' },
          { label: 'Hydrostatic lock', left: 'Not covered', right: 'Covered' },
          { label: 'Oil leakage causing seizure', left: 'Not covered', right: 'Covered' },
          { label: 'Gearbox damage from water', left: 'Not covered', right: 'Covered by some insurers — check the wording' },
        ],
        note: 'Ride through a flooded underpass without the add-on and the claim is rejected outright.',
      },
      {
        kind: 'stats',
        heading: 'A few hundred rupees against a five-figure repair',
        columns: 3,
        items: [
          { value: '₹150–500', label: 'Annual cost of engine protection for a standard bike', tone: 'accent' },
          { value: '₹200–300', label: 'Typical premium on a bike with ₹1 lakh IDV', tone: 'primary' },
          { value: '₹15k–1L', label: 'Cost to repair a hydrolocked engine, by model', note: 'The guide puts the typical repair at ₹30,000–80,000', tone: 'danger' },
        ],
      },
      {
        kind: 'decision',
        heading: 'Should you add it?',
        question: 'Where do you ride, and where does the bike sit?',
        branches: [
          { condition: 'You ride in a flood-prone city', outcome: 'Yes — strongly', detail: 'Mumbai, Chennai, Kolkata, Bengaluru and Hyderabad during heavy monsoons.', tone: 'accent' },
          { condition: 'It is parked in a basement or low-lying area', outcome: 'Yes', detail: 'Standing water is the most common route to hydrostatic lock.', tone: 'accent' },
          { condition: 'You commute through the monsoon', outcome: 'Yes', detail: 'A flooded underpass is exactly the scenario the add-on exists for.', tone: 'primary' },
          { condition: 'You own a premium bike', outcome: 'Yes', detail: 'Engine repair and replacement costs scale sharply with the model.', tone: 'primary' },
          { condition: 'Arid region, dry-season riding, or a very old bike', outcome: 'You can skip it', detail: 'Low water exposure, or the engine is worth less than the claim.', tone: 'neutral' },
        ],
      },
    ],
  },
  {
    slug: 'loan-against-insurance-policy-in-india-2026-get-instant-funds-without-surrendering',
    eyebrow: 'Policy loans',
    title: 'Borrowing Against a Policy: Rates, Limits and Why Lenders Say No',
    source:
      'LIP eligibility, 2026 insurer rates and rejection reasons as published in this guide. GST treatment as of 22 September 2025.',
    summary:
      'You can borrow 15–90% of a policy’s surrender value at 9.5–12.5% a year, with approval in 24–48 hours for existing customers. Most rejections come from a lapsed policy, overdue premiums or fewer than two years left to maturity.',
    anchor: 'Loan Against Insurance Policy (LIP)',
    blocks: [
      {
        kind: 'bars',
        heading: 'Interest rates by insurer, 2026',
        max: 13,
        items: [
          { label: 'SBI Life', value: 11.5, display: '11.5%', note: '₹250–500 fee, ₹10,000 minimum', tone: 'warn' },
          { label: 'Tata AIA', value: 11.25, display: '11.25%', note: '₹300–600 fee, ₹10,000 minimum', tone: 'warn' },
          { label: 'LIC', value: 11.0, display: '11.0%', note: 'No processing fee, ₹5,000 minimum', tone: 'primary' },
          { label: 'ICICI Pru', value: 10.75, display: '10.75%', note: 'No processing fee, ₹5,000 minimum', tone: 'primary' },
          { label: 'HDFC Life', value: 10.5, display: '10.5%', note: 'No processing fee, ₹5,000 minimum', tone: 'accent' },
          { label: 'Max Life', value: 10.5, display: '10.5%', note: 'No processing fee, ₹5,000 minimum', tone: 'accent' },
        ],
        note: 'Rates across the market run from 9.5% to 12.5% a year. GST at 18% applies to the interest and any processing fee; there is no TDS on policy loans.',
      },
      {
        kind: 'stats',
        heading: 'How much you can get, and how fast',
        items: [
          { value: '3 years', label: 'Minimum completed policy term before you can borrow', tone: 'primary' },
          { value: '90%', label: 'Maximum loan, as a share of surrender value', note: 'The floor is 15%', tone: 'accent' },
          { value: '24–48 hrs', label: 'Approval time for existing customers', tone: 'accent' },
          { value: '9.5–12.5%', label: 'Interest rate range across insurers in 2026', tone: 'warn' },
        ],
      },
      {
        kind: 'steps',
        heading: 'How to apply',
        items: [
          { title: 'Request a quote', detail: 'Through the insurer’s portal or at a branch.', tone: 'primary' },
          { title: 'Submit the documents', detail: 'Application form, the policy document, your latest premium receipt, plus ID and address proof.', tone: 'primary' },
          { title: 'Valuation', detail: 'The insurer values the policy using the 2026 reversionary bonus rate.', tone: 'primary' },
          { title: 'Approval', detail: '24–48 hours if you are already a customer of that insurer.', tone: 'accent' },
          { title: 'Sign the agreement', detail: 'Executed on the insurer’s letterhead.', tone: 'primary' },
          { title: 'Disbursal', detail: 'By NEFT, cheque or demand draft.', tone: 'accent' },
        ],
        note: 'Common rejection reasons: the policy has been lapsed more than 2 years, premiums are overdue by more than 30 days, fewer than 2 years remain to maturity, the nomination is wrong, or the policy is already pledged.',
      },
    ],
  },
  {
    slug: 'term-life-insurance-complete-guide',
    eyebrow: 'Term insurance',
    title: 'How Much Cover to Buy, and What a Lakh of Premium Buys',
    source:
      'Human Life Value formula, age-based multiples and premium comparison as published in this 2026 guide.',
    summary:
      'A quick rule is 15–20 times annual income in your twenties and thirties, tapering to 5–10 times by your fifties. One lakh of annual premium buys ₹1 crore of term cover against ₹5–7 lakh in an endowment plan.',
    anchor: 'How Much Life Cover Do You Need?',
    blocks: [
      {
        kind: 'ladder',
        heading: 'The income multiple, by age',
        items: [
          { tier: '25–35', title: '15–20x annual income', detail: 'Your earning years are at their longest and dependents are youngest, so the multiple is highest.', meta: 'Highest', tone: 'accent' },
          { tier: '35–45', title: '10–15x annual income', detail: 'Fewer working years remain and there is usually some savings built up to offset the gap.', meta: 'Mid', tone: 'primary' },
          { tier: '45–55', title: '5–10x annual income', detail: 'Children are closer to independence and outstanding liabilities are smaller.', meta: 'Lowest', tone: 'warn' },
        ],
        note: 'Human Life Value = (annual income × years left) + debts + future expenses − savings. The guide’s example: ₹10 lakh income, 25 years left, ₹40 lakh home loan, ₹30 lakh education, ₹10 lakh savings — ₹3 crore of cover.',
      },
      {
        kind: 'bars',
        heading: 'Cover bought with ₹1 lakh of annual premium',
        items: [
          { label: 'Term insurance', value: 10000000, display: '₹1 crore', note: '₹10–15 of premium per ₹1 lakh of cover', tone: 'accent' },
          { label: 'ULIP', value: 2500000, display: '₹15–25 lakh', note: '₹500–800 per ₹1 lakh of cover', tone: 'primary' },
          { label: 'Endowment plan', value: 700000, display: '₹5–7 lakh', note: '₹1,500–2,000 per ₹1 lakh of cover', tone: 'warn' },
          { label: 'Money-back plan', value: 400000, display: '₹3–4 lakh', note: '₹2,000–3,000 per ₹1 lakh of cover', tone: 'danger' },
        ],
        note: 'Bar lengths use the upper end of each band. The bottom line in the guide: buy term for cover, invest the rest, and you get 3–5x the cover and better returns.',
      },
      {
        kind: 'stats',
        heading: 'The tax position',
        columns: 3,
        items: [
          { value: '₹1.5 lakh', label: 'Section 80C deduction on premiums, per year', tone: 'accent' },
          { value: '10(10D)', label: 'The death benefit your nominee receives is entirely tax-free', tone: 'accent' },
          { value: '10%', label: 'Premium must not exceed this share of sum assured for tax-free maturity', tone: 'warn' },
        ],
      },
    ],
  },
  {
    slug: 'health-insurance-in-india-2026-complete-buyer-s-guide-with-tax-benefits',
    eyebrow: 'Health cover',
    title: 'When Your Health Policy Actually Starts Paying',
    source:
      'Waiting periods, cashless process and 2025-26 claim settlement ratios as published in this 2026 guide.',
    summary:
      'Cover is not immediate: accidents are covered from day one, everything else waits 30 days, named conditions wait 1–2 years and pre-existing diseases 2–4 years. On the settlement side, HDFC Ergo leads 2025-26 at 99%.',
    anchor: 'Waiting Period in Health Insurance',
    blocks: [
      {
        kind: 'ladder',
        heading: 'The waiting periods, shortest to longest',
        items: [
          { tier: 'Day 1', title: 'Accidents', detail: 'The one thing the initial wait does not apply to — accident cover starts immediately.', meta: 'Immediate', tone: 'accent' },
          { tier: '30 days', title: 'Initial waiting period', detail: 'Nothing else is covered for the first month of the policy.', meta: 'Except accidents', tone: 'warn' },
          { tier: '1–2 years', title: 'Specific disease waiting period', detail: 'Named conditions such as cataract or hernia are excluded until this runs out.', meta: 'Varies by condition', tone: 'warn' },
          { tier: '2–4 years', title: 'Pre-existing disease', detail: 'Anything you were already living with when you proposed for the policy.', meta: 'Longest wait', tone: 'danger' },
        ],
        note: 'Top-up and super top-up plans sit above a deductible you choose; group health cover is provided by your employer and ends when you leave.',
      },
      {
        kind: 'bars',
        heading: 'Claim settlement ratios, 2025-26',
        max: 100,
        items: [
          { label: 'HDFC Ergo (Health)', value: 99, display: '99%', note: 'Fastest cashless processing', tone: 'accent' },
          { label: 'Aditya Birla Health', value: 94, display: '94%', note: 'Strong network in tier-2 cities', tone: 'primary' },
          { label: 'Star Health', value: 92, display: '92%', note: 'Widest hospital network', tone: 'primary' },
          { label: 'Niva Bupa', value: 91, display: '91%', note: 'Strong pre-existing disease cover', tone: 'primary' },
          { label: 'Care Health', value: 90, display: '90%', note: 'Best senior citizen plans', tone: 'primary' },
        ],
      },
      {
        kind: 'steps',
        heading: 'The cashless route, step by step',
        items: [
          { title: 'Go to a network hospital', detail: 'Cashless only works inside the insurer’s network.', tone: 'primary' },
          { title: 'Show your card at the TPA desk', detail: 'Your insurance card or policy number identifies the cover.', tone: 'primary' },
          { title: 'The hospital seeks pre-authorisation', detail: 'IRDAI timelines: within 1 hour for planned treatment, 2 hours in an emergency.', tone: 'warn' },
          { title: 'Get treated', detail: 'The hospital bills the insurer directly. A surveyor, if needed, is appointed within 48 hours.', tone: 'primary' },
          { title: 'Pay only what is not covered', detail: 'Final settlement must happen within 30 days of the insurer receiving documents.', tone: 'accent' },
        ],
        note: 'Intimate the insurer within 24–48 hours of hospitalisation.',
      },
    ],
  },
  {
    slug: 'critical-illness-insurance-in-india-2026-do-you-really-need-it-complete-guide',
    eyebrow: 'Critical illness',
    title: 'What a Critical Illness Payout Is Actually For',
    source:
      'CI structures, the 37 mandated illnesses and the case study as published in this 2026 guide.',
    summary:
      'Mediclaim reimburses the hospital. A critical illness policy pays the full sum insured on diagnosis, to spend on anything — lost salary, EMIs, school fees. In the guide’s case study, ₹25 lakh arrived 14 days after diagnosis.',
    anchor: 'Comparison Table',
    blocks: [
      {
        kind: 'compare',
        heading: 'Reimbursement against a lump sum',
        leftTitle: 'Indemnity (mediclaim)',
        rightTitle: 'Critical illness (benefit)',
        rows: [
          { label: 'What triggers the payout', left: 'You run up a hospital bill', right: 'You are diagnosed with a listed illness' },
          { label: 'How much you receive', left: 'The actual bill, up to your sum insured', right: 'The whole sum insured, as a lump sum' },
          { label: 'What the money is for', left: 'The hospital', right: 'Anything — treatment, lost income, EMIs' },
          { label: 'Employer overlap', left: 'Often already provided by your employer', right: 'Employer group CI is usually small or absent' },
        ],
        note: 'India mandates a standard list of 37 critical illnesses, so definitions are consistent across insurers.',
      },
      {
        kind: 'ladder',
        heading: 'Three ways to buy it',
        items: [
          { tier: 'Standalone', title: '₹10 lakh to ₹2 crore+', detail: 'Runs on its own and is renewable for life — it does not depend on any other policy.', meta: 'Moderate to high cost', tone: 'accent' },
          { tier: 'Health rider', title: '₹5 lakh to ₹25 lakh', detail: 'Cheaper, but it ends if the base health policy pays out, and renewal is tied to that policy.', meta: 'Low to moderate cost', tone: 'primary' },
          { tier: 'Term rider', title: 'Equal to term cover, or capped', detail: 'The cheapest route, but it usually terminates the base term plan on payout and only runs for the term.', meta: 'Lowest cost', tone: 'warn' },
        ],
        note: 'Check two clauses before buying: the survival period — how long you must live after diagnosis — and the waiting period for pre-existing disease.',
      },
      {
        kind: 'stats',
        heading: 'The guide’s case study',
        columns: 3,
        items: [
          { value: '₹6 lakh', label: 'Hospital bill covered by his corporate health policy', tone: 'primary' },
          { value: '14 days', label: 'From diagnosis and verification to ₹25 lakh in his bank account', tone: 'accent' },
          { value: '₹1.2 lakh', label: 'Monthly outgo — EMIs, household costs and school fees — during six months off work', note: 'Vikram, 39, was diagnosed with early-stage colon cancer in 2025', tone: 'warn' },
        ],
      },
    ],
  },
  {
    slug: 'term-insurance-vs-life-insurance-key-differences-every-indian-must-know-2026',
    eyebrow: 'Term vs traditional',
    title: 'Term vs Traditional Cover: The Same Lakh, Very Different Outcomes',
    source:
      'Premium and cover comparison as published in this 2026 guide. Premiums quoted for a 30-year-old non-smoker.',
    summary:
      'Term insurance buys up to ₹10 crore of cover; a traditional plan buys ₹10–20 lakh for a far larger premium. The difference, invested, is what makes "buy term and invest the rest" work.',
    anchor: 'Life Insurance FAQ',
    blocks: [
      {
        kind: 'compare',
        heading: 'Term against traditional life insurance',
        leftTitle: 'Term insurance',
        rightTitle: 'Traditional plans',
        rows: [
          { label: 'Cover you can buy', left: 'Up to ₹10 crore or more for a modest premium', right: 'Sum assured is limited relative to the premium' },
          { label: 'Monthly premium at 30', left: '₹500–800 for ₹1 crore of cover', right: '₹5,000–15,000 for ₹10–20 lakh of cover' },
          { label: 'Maturity benefit', left: 'None — it is pure protection', right: 'Guaranteed returns plus bonuses' },
          { label: 'Investment component', left: 'None', right: 'A significant savings component' },
          { label: 'Policy terms', left: '10–40 years, some running to age 99', right: 'Endowment, money-back or whole life' },
          { label: 'If you survive the term', left: 'Nothing is payable', right: 'Sum assured plus bonuses at maturity' },
        ],
        note: 'Both get Section 80C on premiums up to ₹1.5 lakh and Section 10(10D) on the proceeds.',
      },
      {
        kind: 'bars',
        heading: 'Monthly premium for the cover each one provides, upper end of each band',
        items: [
          { label: 'Term — ₹1 crore of cover', value: 800, display: '₹500–800', tone: 'accent' },
          { label: 'Traditional — ₹10–20 lakh of cover', value: 15000, display: '₹5,000–15,000', tone: 'danger' },
        ],
        note: 'Bar lengths use the upper end of each band. Roughly twenty times the premium for one-tenth to one-fiftieth of the cover.',
      },
      {
        kind: 'stats',
        heading: 'Buy term and invest the rest',
        columns: 3,
        items: [
          { value: '₹10,000', label: 'A year for ₹1 crore of term cover, in the guide’s example', tone: 'accent' },
          { value: '₹1,50,000', label: 'A year for a ₹20 lakh endowment plan', tone: 'warn' },
          { value: '₹3.8 crore', label: 'What the ₹1.4 lakh yearly difference builds in 20 years at 12%', tone: 'accent' },
        ],
        note: 'Traditional cover still suits four groups: people who struggle to invest on their own, conservative investors who want guaranteed returns, estate planning, and anyone who needs a forced savings mechanism.',
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Translations                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Translated specs. Keyed by language + the English slug, because a translated
 * post lives at /blog/<lang>/<english-slug>/ while its own slug is prefixed
 * (e.g. `hi-insurance-claim-rejection-rate-india-2026-data`).
 *
 * Each entry must repeat `anchor` in its own language — the translated article
 * has translated headings, so the English anchor will not be found and the
 * figure would fall back to the top of the post.
 */
export const TRANSLATED_INFOGRAPHICS: ArticleInfographic[] = [
  /* ---------------------------------------------------------------------- */
  /* Hindi — insurance claim rejection rates                                 */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'insurance-claim-rejection-rate-india-2026-data',
    lang: 'hi',
    eyebrow: 'दावा आंकड़े · 2026',
    title: 'भारतीय बीमाकर्ता कितनी बार दावे खारिज करते हैं',
    source:
      'आईआरडीएआई वार्षिक रिपोर्ट 2024-25, बीमाकर्ताओं के सार्वजनिक प्रकटीकरण, आईआरडीएआई आईजीएमएस और बीमा लोकपाल वार्षिक रिपोर्ट से संकलित। ये अनुमान हैं, आधिकारिक आंकड़े नहीं।',
    summary:
      'स्वास्थ्य बीमा में सबसे अधिक दावे खारिज होते हैं (16.8%), इसके बाद जीवन बीमा (14.2%) और मोटर बीमा (8.8%)। अकेले पहले से मौजूद बीमारियों का खुलासा न करना सभी अस्वीकृतियों का 42% है।',
    anchor: 'दावे क्यों खारिज हो जाते हैं',
    blocks: [
      {
        kind: 'stats',
        heading: 'व्यवसाय के प्रकार के अनुसार औद्योगिक औसत अस्वीकृति दर',
        columns: 3,
        items: [
          { value: '16.8%', label: 'स्वास्थ्य बीमा', note: 'सबसे अधिक अस्वीकृति दर', tone: 'danger' },
          { value: '14.2%', label: 'जीवन बीमा', note: 'सबसे कम: एलआईसी 10.8%', tone: 'warn' },
          { value: '8.8%', label: 'मोटर बीमा', note: 'सार्वजनिक बीमाकर्ता सबसे कम', tone: 'accent' },
        ],
      },
      {
        kind: 'bars',
        heading: 'दावे खारिज होने के शीर्ष 8 कारण',
        max: 45,
        items: [
          { label: 'पहले से मौजूद बीमारियों का खुलासा न करना', value: 42, display: '42%', tone: 'danger' },
          { label: 'दस्तावेज़ों की कमी', value: 18, display: '18%', tone: 'warn' },
          { label: 'प्रतीक्षा अवधि में पहले से मौजूद बीमारी', value: 12, display: '12%', tone: 'warn' },
          { label: 'कमरे के किराए की सीमा से अधिक', value: 8, display: '8%', tone: 'primary' },
          { label: 'अमान्य या समाप्त लाइसेंस', value: 6, display: '6%', tone: 'primary' },
          { label: 'उपचार कवर में नहीं', value: 5, display: '5%', tone: 'primary' },
          { label: 'प्रतीक्षा अवधि पूरी नहीं हुई', value: 4, display: '4%', tone: 'primary' },
          { label: 'नशे की हालत या धोखाधड़ी', value: 4, display: '4%', tone: 'neutral' },
        ],
        note: 'प्रतिशत सभी दावों का नहीं, सभी अस्वीकृतियों का हिस्सा है।',
      },
      {
        kind: 'steps',
        heading: 'अस्वीकृति के बाद आपके पाँच अधिकार',
        items: [
          { title: 'लिखित कारण', detail: 'आईआरडीएआई के नियमों के अनुसार बीमाकर्ता को विशिष्ट पॉलिसी धारा का हवाला देना होगा।', tone: 'primary' },
          { title: 'शिकायत अधिकारी के पास अपील', detail: 'बीमाकर्ता को 15 दिनों के भीतर जवाब देना होगा।', tone: 'primary' },
          { title: 'आईआरडीएआई तक वृद्धि', detail: 'igms.irdai.gov.in पर निःशुल्क शिकायत दर्ज करें।', tone: 'warn' },
          { title: 'बीमा लोकपाल', detail: '₹50 लाख तक के दावों के लिए निःशुल्क, बाध्यकारी निर्णय।', tone: 'accent' },
          { title: 'उपभोक्ता न्यायालय', detail: '₹50 लाख से अधिक के दावों का मार्ग।', tone: 'neutral' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* Hindi — IRDAI grievance process                                         */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'irdai-grievance-process-complaint-guide-2026',
    lang: 'hi',
    eyebrow: 'शिकायत मार्ग',
    title: 'भारत की त्रि-स्तरीय शिकायत निवारण प्रणाली',
    source:
      'आईआरडीएआई (पॉलिसीधारकों के हितों की सुरक्षा) विनियम, 2017 और लोक शिकायत निवारण नियम, 1998 (2017 में संशोधित)।',
    summary:
      'बीमाकर्ता के शिकायत अधिकारी से शुरू करें (15 दिन)। समाधान न हो तो आईआरडीएआई आईजीएमएस पर निःशुल्क शिकायत दर्ज करें (15 दिन)। फिर भी न हो तो बीमा लोकपाल (₹50 लाख तक बाध्यकारी)।',
    anchor: 'आईआरडीएआई शिकायत निवारण: त्रि-स्तरीय प्रणाली',
    blocks: [
      {
        kind: 'ladder',
        heading: 'वृद्धि सीढ़ी',
        items: [
          {
            tier: 'टियर 1',
            title: 'बीमाकर्ता का शिकायत अधिकारी',
            detail: 'ईमेल, ऑनलाइन पोर्टल, टोल-फ्री हेल्पलाइन या पंजीकृत डाक। हर आईआरडीएआई-लाइसेंसधारी बीमाकर्ता को एक अधिकारी नियुक्त करना होगा और 15 दिनों में जवाब देना होगा।',
            meta: '15 दिन में जवाब',
            tone: 'primary',
          },
          {
            tier: 'टियर 2',
            title: 'आईआरडीएआई आईजीएमएस — igms.irdai.gov.in',
            detail: 'पंजीकरण करें, शिकायत प्रकार और बीमाकर्ता चुनें, पॉलिसी नंबर दर्ज करें, दस्तावेज़ अपलोड करें और शिकायत नंबर नोट करें। टोल-फ्री 14555, सोम–शुक्र 9:00–17:30।',
            meta: '15 दिन · निःशुल्क',
            tone: 'warn',
          },
          {
            tier: 'टियर 3',
            title: 'बीमा लोकपाल',
            detail: '₹50 लाख तक के दावों के लिए, या 30 दिन बाद भी अनसुलझी शिकायतों के लिए। निःशुल्क, अर्द्ध-न्यायिक, और निर्णय बीमाकर्ता पर बाध्यकारी।',
            meta: '₹50 लाख तक',
            tone: 'accent',
          },
        ],
        note: 'हमेशा लिखित रूप में शिकायत करें — ईमेल या पंजीकृत डाक — ताकि हर पत्राचार का प्रमाण आपके पास रहे।',
      },
      {
        kind: 'stats',
        heading: 'आईआरडीएआई किन शिकायतों को स्वीकार करता है',
        columns: 3,
        items: [
          { value: '15', label: 'बीमाकर्ता को जवाब देने के दिन', tone: 'primary' },
          { value: '14555', label: 'आईआरडीएआई टोल-फ्री शिकायत हेल्पलाइन', note: 'सुबह 9 – शाम 5:30, सोम–शुक्र', tone: 'warn' },
          { value: '₹50 लाख', label: 'लोकपाल की धनराशि सीमा', note: 'इससे अधिक पर उपभोक्ता आयोग', tone: 'accent' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* Hindi — LIC policy revival                                              */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'lic-policy-revival-complete-guide-2026',
    lang: 'hi',
    eyebrow: 'एलआईसी पुनरुद्धार',
    title: 'एलआईसी पुनरुद्धार खिड़की: अनुग्रह अवधि से लेकर 5 वर्ष तक',
    source:
      'licindia.in पर प्रकाशित एलआईसी पुनरुद्धार नियम और शाखा प्रथा, 2026। ब्याज दर और चिकित्सा आवश्यकताएँ योजना के अनुसार भिन्न होती हैं।',
    summary:
      '15–30 दिन की अनुग्रह अवधि के बाद पॉलिसी बंद हो जाती है। पहले अवैतनिक प्रीमियम से 5 वर्ष तक आप इसे पुनर्जीवित कर सकते हैं — बकाया राशि के साथ लगभग 10% वार्षिक ब्याज। 5 वर्ष बाद पॉलिसी स्थायी रूप से समाप्त हो जाती है।',
    anchor: 'एलआईसी पॉलिसी पुनरुद्धार नियम 2026',
    blocks: [
      {
        kind: 'timeline',
        items: [
          { marker: '15–30 दिन', title: 'अनुग्रह अवधि', detail: 'वार्षिक प्रीमियम के लिए 30 दिन, अर्ध-वार्षिक या त्रैमासिक के लिए 15 दिन। कवर जारी रहता है।', tone: 'accent' },
          { marker: 'बंद', title: 'पॉलिसी समाप्त', detail: 'कोई कवर नहीं, समर्पण मूल्य फ्रीज़, पॉलिसी ऋण नहीं, जमा बोनस जब्त।', tone: 'danger' },
          { marker: '0–5 वर्ष', title: 'पुनरुद्धार खिड़की', detail: 'ब्याज सहित सभी बकाया प्रीमियम जमा करें। ₹25 लाख से कम बीमित राशि पर नई चिकित्सा जाँच नहीं।', tone: 'warn' },
          { marker: '5 वर्ष+', title: 'स्थायी रूप से समाप्त', detail: 'पॉलिसी अब पुनर्जीवित नहीं की जा सकती और सभी लाभ समाप्त हो जाते हैं।', tone: 'danger' },
        ],
      },
      {
        kind: 'stats',
        heading: 'पुनरुद्धार की लागत और समय',
        columns: 3,
        items: [
          { value: '10%', label: 'बकाया राशि पर अनुमानित वार्षिक ब्याज', note: 'अपना पॉलिसी दस्तावेज़ जाँचें', tone: 'warn' },
          { value: '₹25 लाख', label: 'इससे कम बीमित राशि पर नई चिकित्सा जाँच नहीं', tone: 'accent' },
          { value: '7–15', label: 'भुगतान के बाद प्रक्रिया के कार्य दिवस', tone: 'primary' },
        ],
      },
      {
        kind: 'steps',
        heading: 'पुनरुद्धार के छह चरण',
        items: [
          { title: 'पॉलिसी की स्थिति जाँचें', detail: 'licindia.in, एलआईसी मोबाइल ऐप, या कस्टमर केयर 022-6789 7777।', tone: 'primary' },
          { title: 'बकाया राशि की गणना करें', detail: 'अवैतनिक प्रीमियम, अर्जित ब्याज और लागू कर।', tone: 'primary' },
          { title: 'दस्तावेज़ इकट्ठा करें', detail: 'मूल पॉलिसी बॉन्ड, नवीनतम प्रीमियम रसीद, पहचान और पता प्रमाण, ईसीएस के लिए बैंक विवरण।', tone: 'primary' },
          { title: 'ऑनलाइन या शाखा में आवेदन करें', detail: 'कस्टमर पोर्टल → पॉलिसी सेवाएँ → पुनरुद्धार अनुरोध, या शाखा में पुनरुद्धार फ़ॉर्म।', tone: 'primary' },
          { title: 'पुनरुद्धार राशि का भुगतान करें', detail: 'एलआईसी ऑनलाइन भुगतान, डिमांड ड्राफ़्ट, या NEFT/RTGS।', tone: 'warn' },
          { title: 'पुनरुद्धार पुष्टिकरण प्राप्त करें', detail: '7–15 कार्य दिवसों में मिलता है। इसी समय नॉमिनी विवरण भी अद्यतन करें।', tone: 'accent' },
        ],
        note: 'भुगतान से पहले पुनरुद्धार लागत की तुलना नई पॉलिसी से कर लें — कभी-कभी नई पॉलिसी सस्ती पड़ती है।',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* Hindi — health insurance claim settlement ratio                         */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'health-insurance-claim-settlement-ratio-2026',
    lang: 'hi',
    eyebrow: 'बीमाकर्ता स्कोरकार्ड',
    title: 'दावा निपटान अनुपात केवल आधी कहानी बताता है',
    source:
      '2025-26 के नवीनतम आईआरडीएआई प्रकटीकरण और बीमाकर्ताओं की वार्षिक रिपोर्ट। अनुपात हर साल बदलते रहते हैं।',
    summary:
      'सीएसआर दावों की संख्या गिनता है, एएसआर रुपये। कोई बीमाकर्ता 98% सीएसआर दिखा सकता है जबकि वह दावित राशि का केवल 75% अदा करे — दोनों को साथ में पढ़ें।',
    anchor: 'प्रमुख भारतीय बीमाकर्ताओं का दावा निपटान प्रदर्शन',
    blocks: [
      {
        kind: 'bars',
        heading: 'प्रमुख स्वास्थ्य और सामान्य बीमाकर्ताओं का दावा निपटान अनुपात',
        max: 100,
        items: [
          { label: 'ICICI Lombard', value: 94.2, display: '94.2%', tone: 'accent' },
          { label: 'HDFC ERGO', value: 93.8, display: '93.8%', tone: 'accent' },
          { label: 'Star Health', value: 92.5, display: '92.5%', tone: 'primary' },
          { label: 'Care Health', value: 91.4, display: '91.4%', tone: 'primary' },
          { label: 'Niva Bupa', value: 90.1, display: '90.1%', tone: 'primary' },
          { label: 'New India Assurance', value: 89.5, display: '89.5%', tone: 'warn' },
        ],
        note: 'कैशलेस निपटान समय 1–2 घंटे (ICICI Lombard, HDFC ERGO) से लेकर 4–6 घंटे (New India Assurance) तक है।',
      },
      {
        kind: 'compare',
        heading: 'सीएसआर बनाम एएसआर — ये दोनों आंकड़े मायने रखते हैं',
        leftTitle: 'सीएसआर — दावा निपटान अनुपात',
        rightTitle: 'एएसआर — राशि निपटान अनुपात',
        rows: [
          { label: 'क्या गिनता है', left: 'स्वीकृत दावों की संख्या ÷ प्राप्त दावे', right: 'अदा किए रुपये ÷ दावित रुपये' },
          { label: 'किसे पुरस्कृत करता है', left: 'कई छोटे दावों का निपटान', right: 'बड़े दावों का पूरा भुगतान' },
          { label: 'कैसे भरमाता है', left: 'छोटे दावे मंज़ूर, बड़ी सर्जरी खारिज', right: 'गेम करना कठिन — भारी कटौती सामने आ जाती है' },
          { label: 'स्वस्थ सीमा', left: 'अकेले नहीं, साथ में पढ़ें', right: '85–90% से ऊपर' },
        ],
      },
      {
        kind: 'stats',
        heading: 'निपटान के बावजूद पैसे कहाँ कटते हैं',
        columns: 3,
        items: [
          { value: '1%', label: 'सामान्य कमरे के किराए की सीमा', note: 'बीमित राशि का, प्रति दिन', tone: 'warn' },
          { value: '10%', label: 'बजट योजनाओं में सामान्य अनिवार्य सह-भुगतान', tone: 'warn' },
          { value: '₹5,000', label: 'वह कमरे का किराया जिसने कटौती शुरू की', note: 'केस स्टडी: ₹4.2 लाख का बिल', tone: 'danger' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* Hindi — how to appeal a rejected claim                                  */
  /* NOTE: the Hindi article is not a literal translation of the English one —
     it runs a 4-step escalation (GRO → Ombudsman → Bima Bharosa → Consumer
     Court) with a ₹30 lakh Ombudsman limit. This spec follows the Hindi text. */
  /* ---------------------------------------------------------------------- */
  {
    slug: 'how-to-appeal-rejected-insurance-claim-india-2026',
    lang: 'hi',
    eyebrow: 'अपील मार्गदर्शिका',
    title: 'अस्वीकृत दावे पर अपील: 4-चरणीय वृद्धि मैट्रिक्स',
    source:
      'इस मार्गदर्शिका में दिया गया 4-चरणीय वृद्धि ढाँचा। समय-सीमाएँ आईआरडीएआई (पॉलिसीधारकों के हितों की सुरक्षा) विनियम, 2017 के अनुसार।',
    summary:
      'बीमाकर्ता के जीआरओ से शुरू करें (15 दिन), फिर बीमा लोकपाल (₹30 लाख तक, 30–90 दिन), फिर आईआरडीएआई बीमा भरोसा, और अंततः उपभोक्ता न्यायालय।',
    anchor: 'अस्वीकृत दावे पर अपील करने के लिए चरण-दर-चरण मार्गदर्शिका',
    blocks: [
      {
        kind: 'steps',
        heading: 'चार चरण',
        items: [
          { title: 'चरण 1: बीमाकर्ता के शिकायत निवारण अधिकारी (जीआरओ)', detail: 'पॉलिसी संख्या, दावा संदर्भ और अस्वीकृति तिथि के साथ औपचारिक अपील पत्र। मेडिकल रिकॉर्ड, डॉक्टर प्रमाणपत्र और डिस्चार्ज सारांश संलग्न करें। बीमाकर्ता को 15 दिनों में जवाब देना होगा।', tone: 'primary' },
          { title: 'चरण 2: बीमा लोकपाल', detail: '₹30 लाख तक के विवाद, निःशुल्क, वकील की आवश्यकता नहीं, 30–90 दिन। अंतिम अस्वीकृति पत्र मिलने के एक वर्ष के भीतर दर्ज करें।', tone: 'accent' },
          { title: 'चरण 3: आईआरडीएआई बीमा भरोसा और आईजीएमएस', detail: 'bimabharosa.irdai.gov.in या igms.irdai.gov.in पर ऑनलाइन दर्ज करें। सिस्टम शिकायत ट्रैक करता है और बीमाकर्ता को अनुपालन रिपोर्ट देने के लिए बाध्य करता है।', tone: 'warn' },
          { title: 'चरण 4: उपभोक्ता विवाद निवारण आयोग', detail: 'यदि लोकपाल पुरस्कार असंतोषजनक हो या दावा ₹30 लाख से अधिक हो। उपभोक्ता संरक्षण अधिनियम, 2019 के तहत ज़िला, राज्य या राष्ट्रीय आयोग।', tone: 'danger' },
        ],
      },
      {
        kind: 'compare',
        heading: 'शिकायत निवारण मंचों की तुलना',
        leftTitle: 'सीमा और लागत',
        rightTitle: 'समय और कानूनी सहायता',
        rows: [
          { label: 'बीमाकर्ता जीआरओ', left: 'कोई सीमा नहीं · मुफ़्त', right: '7–15 दिन · वकील आवश्यक नहीं' },
          { label: 'बीमा लोकपाल', left: '₹30 लाख तक · मुफ़्त', right: '30–90 दिन · वकील आवश्यक नहीं' },
          { label: 'आईआरडीएआई बीमा भरोसा', left: 'कोई सीमा नहीं · मुफ़्त', right: '15–30 दिन · वकील आवश्यक नहीं' },
          { label: 'उपभोक्ता न्यायालय', left: 'स्तर के अनुसार अलग · नाममात्र न्यायालय शुल्क', right: '6 महीने से 2 साल · वकील अनुशंसित' },
        ],
        note: 'हर चरण पर ट्रैकिंग नंबर के साथ पावती रसीद लें। बिना दिनांकित पावती के फ़ाइलें हफ़्तों तक गायब रहती हैं।',
      },
      {
        kind: 'stats',
        heading: 'दावा अस्वीकृति के सामान्य कारण',
        columns: 2,
        items: [
          { value: '1', label: 'पहले से मौजूद बीमारियों का खुलासा न करना (पीईडी)', tone: 'danger' },
          { value: '2', label: 'प्रतीक्षा अवधि बहिष्करण', tone: 'warn' },
          { value: '3', label: 'उपचार बहिष्करण खंड', tone: 'warn' },
          { value: '4', label: 'विलंबित सूचना और दस्तावेज़ों की कमी', tone: 'warn' },
        ],
      },
    ],
  },
];


/* -------------------------------------------------------------------------- */

const MAP = new Map<string, ArticleInfographic>();
for (const i of INFOGRAPHICS) MAP.set(`en:${i.slug}`, i);
for (const t of TRANSLATED_INFOGRAPHICS) MAP.set(`${t.lang}:${t.slug}`, t);

/**
 * Look up the infographic for an article.
 *
 * @param slug  English slug (for translated posts: `post.translatedFrom`).
 * @param lang  Language code. Defaults to 'en'. Falls back to nothing — a
 *              missing translation means no figure, rather than an English
 *              figure dropped into a translated page.
 */
export const getInfographic = (slug: string, lang: string = 'en'): ArticleInfographic | undefined =>
  MAP.get(`${lang}:${slug}`);

export const infographicSlugs = (): string[] => INFOGRAPHICS.map((i) => i.slug);

/** Slugs that have a spec in the given language. */
export const translatedSlugs = (lang: string): string[] =>
  TRANSLATED_INFOGRAPHICS.filter((t) => t.lang === lang).map((t) => t.slug);
