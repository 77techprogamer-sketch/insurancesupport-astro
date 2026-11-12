// Content pillars.
//
// Six clusters that every English post is filed into. Each pillar has a hub
// page at /guides/<slug>/ that lists its members, and every member links back
// up to the hub and sideways to its nearest siblings (see PillarNav.astro).
//
// Assignment is deterministic: cues are weighted keyword phrases matched
// against title + summary + categories + tags. Specific phrases carry more
// weight than broad ones, so "bima bharosa" beats "claim", and "lic" beats
// "life insurance". Nothing here needs maintaining when a post is added —
// a new post lands in the right cluster on its own.

export interface PillarHub {
  title: string;
  url: string;
}

export interface Pillar {
  slug: string;
  title: string;
  /** <title> for the hub page, kept under the 60-character SERP clamp. */
  seoTitle: string;
  navLabel: string;
  /** One sentence shown on the guides index. */
  description: string;
  /** Two or three short paragraphs of orientation for the hub page. */
  intro: string[];
  /** The best single page to start with, where one exists. */
  startHere?: PillarHub;
  /** Other hubs and tools worth surfacing on the pillar page. */
  related?: PillarHub[];
  cues: Record<string, number>;
}

export const PILLARS: Pillar[] = [
  {
    slug: 'claim-rejection',
    title: 'Insurance Claim Rejection and Appeals',
    seoTitle: 'Claim Rejection & Appeal Guides | Insurance Support',
    navLabel: 'Claim rejection',
    description:
      'Why claims get refused, what the rejection letter actually alleges, and the appeal that answers it.',
    intro: [
      'A rejection is a claim decision, not a court order. Insurers repudiate on a small number of grounds — non-disclosure, exclusion clauses, waiting periods, late intimation, "not medically necessary" — and each ground has a test the insurer has to satisfy with documents.',
      'These guides decode the letter, map the documents that decide the file, and take you from the first written appeal to the point where the insurer has to give reasons. Start with the rejection itself; escalation has its own cluster.',
    ],
    startHere: {
      title: 'Insurance Claim Recovery: the complete guide',
      url: '/blog/claim-recovery-hub-complete-2026-guide/',
    },
    related: [
      { title: 'Claim Recovery Hub', url: '/claim-recovery/' },
      { title: 'Rejection appeal templates (PDF)', url: '/downloads/appeal-templates.pdf' },
    ],
  },
  {
    slug: 'escalation',
    title: 'Escalation: Ombudsman, IRDAI and Consumer Forums',
    seoTitle: 'Ombudsman & IRDAI Complaint Guides | Insurance Support',
    navLabel: 'Ombudsman and IRDAI',
    description:
      'The four statutory routes when the insurer will not move — and the deadlines, money limits and penalties attached to each.',
    intro: [
      'Every escalation route in Indian insurance runs on a clock and a money limit. The grievance cell has 14 days. The Ombudsman decides within three months, for free, up to ₹50 lakh, and the insurer must pay within 30 days or ₹5,000 a day after that. Bima Bharosa does not decide anything, but it puts the delay on the insurer\'s record.',
      'Knowing which route applies — and which two cannot be run at the same time — is most of the work. These guides are written to be quoted back at an insurer.',
    ],
    startHere: {
      title: 'Insurance Ombudsman: complete filing guide',
      url: '/blog/insurance-ombudsman-india-guide/',
    },
    related: [
      { title: 'Bima Bharosa filing guide', url: '/blog/irdai-bima-bharosa-complaint-filing-2026/' },
      { title: 'Ombudsman complaint toolkit (PDF)', url: '/downloads/ombudsman-complaint-toolkit.pdf' },
    ],
  },
  {
    slug: 'life-lic',
    title: 'Life Insurance, LIC and Section 45',
    seoTitle: 'LIC & Section 45 Claim Guides | Insurance Support',
    navLabel: 'Life and LIC',
    description:
      'Death claims, nominees, the three-year rule, revivals, maturity and the maths of cover that actually pays.',
    intro: [
      'Life insurance is where the largest disputes live, because the sums are large and the person who could explain the proposal form is gone. Section 45 of the Insurance Act is the provision that decides most of them: after three years, the policy cannot be called into question on any ground.',
      'This cluster covers death claims, nominee and succession problems, LIC revival and maturity mechanics, and the cover-sizing questions that decide whether a payout is enough when it arrives.',
    ],
    startHere: {
      title: 'LIC policies: choosing, managing and claiming',
      url: '/blog/lic-policy-hub-complete-guide-2026/',
    },
    related: [
      { title: 'Section 45: the three-year rule', url: '/blog/section-45-insurance-act-three-year-rule-2026/' },
      { title: 'Human life value calculator', url: '/tools/human-life-value-calculator/' },
    ],
  },
  {
    slug: 'health-cashless',
    title: 'Health Insurance and Cashless Claims',
    seoTitle: 'Health & Cashless Claim Guides | Insurance Support',
    navLabel: 'Health and cashless',
    description:
      'Pre-authorisation, TPA denials, room-rent caps, waiting periods, portability and the wording IRDAI standardised.',
    intro: [
      'Health claims are decided at three points: the pre-authorisation desk, the discharge, and the insurer\'s claims team after the file is submitted. A cashless denial is not a claim denial — but it becomes one if the paperwork is not handled in the first 24 hours.',
      'These guides cover the one-hour and three-hour authorisation clocks, what a TPA can and cannot ask for, room-rent capping arithmetic, the moratorium, and how portability interacts with a claim in progress.',
    ],
    startHere: {
      title: 'Health insurance: choosing cover and using it',
      url: '/blog/health-insurance-hub-complete-2026-guide/',
    },
    related: [
      { title: 'Health claim rejection rights', url: '/blog/health-insurance-claim-rejection-rights-2026/' },
      { title: 'Claim checklist (PDF)', url: '/lead-magnets/claim-checklist/' },
    ],
  },
  {
    slug: 'motor-travel',
    title: 'Motor and Travel Claims',
    seoTitle: 'Motor & Travel Claim Guides | Insurance Support',
    navLabel: 'Motor and travel',
    description:
      'Surveyor reports, IDV, total loss, zero depreciation and what to do when a trip goes wrong abroad.',
    intro: [
      'Motor claims are decided by a surveyor\'s report you never see until it is final. The deductions that hurt — depreciation, salvage, "not a total loss" — come from that report, and it can be contested.',
      'These guides cover IDV and total-loss arithmetic, the add-ons that change a payout, renewal and no-claim bonus mechanics, and travel claims where the treatment happened outside India.',
    ],
    startHere: {
      title: 'Motor insurance claim process: step by step',
      url: '/blog/motor-insurance-claim-process-guide-2026/',
    },
    related: [
      { title: 'Motor claim denied? Dispute the surveyor', url: '/blog/motor-insurance-claim-denied-surveyor-dispute-2026/' },
      { title: 'Claim recovery hub', url: '/claim-recovery/' },
    ],
  },
  {
    slug: 'nri-business',
    title: 'NRI, Business and Specialist Cover',
    seoTitle: 'NRI & Business Insurance Guides | Insurance Support',
    navLabel: 'NRI and business',
    description:
      'Claims from abroad, SME and cyber cover, group policies and the non-standard lines that still get refused.',
    intro: [
      'A claimant in Toronto and a claimant in Bengaluru have identical rights and very different paperwork. Attestation, the account the money lands in, and who is authorised to sign in India decide how long the file takes.',
      'This cluster also covers the commercial side: SME and cyber policies, group employer cover where the TPA answers to someone else, weddings, and loans against a policy.',
    ],
    related: [
      { title: 'NRI insurance guide (PDF)', url: '/downloads/nri-insurance-guide.pdf' },
      { title: 'Business insurance guide (PDF)', url: '/downloads/business-insurance-sme-guide.pdf' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------
// Tiers, in order. The subject of the *title* beats everything, because a post
// titled "LIC Claim Rejection" belongs with rejections even though it says LIC.
// A post is an escalation guide only when the forum itself is the subject.

const REJECTION = /claim reject|rejection|rejected|repudiat|appeal|underpaid|short settle/;
const ESCALATION = /ombudsman|bima bharosa|igms|consumer commission|consumer court|e-daakhil|grievance|complaint/;
const BUSINESS = /\bnri\b|non-resident|apostille|\bsme\b|cyber insurance|wedding insurance|group health|group policy|business insurance/;
const MOTOR = /motor insurance|car insurance|bike insurance|two-wheeler|\bidv\b|zero depreciation|surveyor|travel insurance/;
const HEALTH = /health insurance|mediclaim|cashless|\btpa\b|pre-auth|preauth|maternity|senior citizen|critical illness|room rent|portability|restoration|80d|family floater|hospital/;
const LIFE = /\blic\b|life insurance|term insurance|death claim|nominee|section 45|endowment|money-back|\bulip\b|maturity|surrender|revival|lapse|annuity|pension|\bnps\b|retirement|child education/;
/** Site-navigation pages rather than cluster members. */
const NOT_CLUSTER_CONTENT = /complete insurance guide india|services across india|tier-2 cities/;

const lower = (v: unknown) => String(v || '').toLowerCase();

function fields(post: any) {
  const categories = (post.categories || []).join(' ');
  return {
    title: lower(post.title),
    topic: `${lower(post.title)} ${lower(categories)}`,
    body: `${lower(post.title)} ${lower(categories)} ${(post.tags || []).join(' ')} ${lower(post.summary)}`,
  };
}

export function pillarFor(post: any): Pillar | null {
  const { title, topic, body } = fields(post);
  if (NOT_CLUSTER_CONTENT.test(topic)) return null;

  const at = (slug: string) => PILLARS.find((p) => p.slug === slug) || null;

  if (ESCALATION.test(title)) return at('escalation');
  if (REJECTION.test(title)) return at('claim-rejection');
  if (BUSINESS.test(topic)) return at('nri-business');
  if (MOTOR.test(topic)) return at('motor-travel');
  if (HEALTH.test(topic)) return at('health-cashless');
  if (LIFE.test(topic)) return at('life-lic');

  // Nothing decisive in the title — fall back to the fuller text.
  if (REJECTION.test(body)) return at('claim-rejection');
  if (ESCALATION.test(body)) return at('escalation');
  if (HEALTH.test(body)) return at('health-cashless');
  if (MOTOR.test(body)) return at('motor-travel');
  if (LIFE.test(body)) return at('life-lic');
  if (BUSINESS.test(body)) return at('nri-business');

  // Regulatory and claim-recovery posts with no other signal.
  if (/irdai|regulatory|claim recovery|claim settlement/.test(topic)) return at('claim-rejection');
  return null;
}

export function pillarBySlug(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}

/** Members of a pillar, newest first. English posts only. */
export function postsInPillar(pillar: Pillar, posts: any[]): any[] {
  return posts
    .filter((p) => (!p.lang || p.lang === 'en') && pillarFor(p)?.slug === pillar.slug)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
