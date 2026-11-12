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
];

/* -------------------------------------------------------------------------- */

const MAP = new Map<string, ArticleInfographic>(INFOGRAPHICS.map((i) => [i.slug, i]));

export const getInfographic = (slug: string): ArticleInfographic | undefined => MAP.get(slug);

export const infographicSlugs = (): string[] => INFOGRAPHICS.map((i) => i.slug);
