/**
 * Contextual internal links for articles.
 *
 * Two problems this solves. First, a handful of indexable pages had almost no
 * links pointing at them from anywhere except the nav — /tools/, /compare/,
 * /loans/ and /faq/ were effectively orphaned, and Google treats an unlinked
 * page as unimportant. Second, the "related articles" block was chosen by
 * category, so anchors were either the article title or "Read more"; neither
 * tells Google anything about the destination.
 *
 * Each bucket maps a topic to two or three destinations **with the anchor text
 * that should be used**, written as a phrase someone would actually search. The
 * classifier below scores a post's title, summary and opening text against the
 * keywords; the highest score wins, and ties fall back to the claim-recovery
 * pillar, which is the site's central topic.
 *
 * Every destination here must resolve — scripts/link_check.py verifies it after
 * every build, and a broken target fails the check rather than shipping quietly.
 */

export interface ContextLink {
  href: string;
  /** Written as a search phrase, not as a call to action. */
  anchor: string;
  note: string;
}

export interface TopicBucket {
  id: string;
  keywords: string[];
  links: ContextLink[];
}

export const TOPIC_BUCKETS: TopicBucket[] = [
  {
    id: 'ombudsman',
    keywords: [
      'ombudsman', 'bima bharosa', 'grievance', 'grievance redressal', 'gro',
      'escalat', 'complaint', 'bima lokpal',
    ],
    links: [
      {
        href: '/claim-recovery/',
        anchor: 'the full escalation route, from grievance officer to Ombudsman',
        note: 'Every forum, the deadlines, and which one to use when.',
      },
      {
        href: '/blog/insurance-ombudsman-india-guide',
        anchor: 'how an Insurance Ombudsman complaint works',
        note: 'Jurisdiction, the ₹50 lakh limit and what a hearing looks like.',
      },
      {
        href: '/faq/',
        anchor: 'short answers to the questions people ask first',
        note: 'One page, no scrolling through guides.',
      },
    ],
  },
  {
    id: 'health',
    keywords: [
      'cashless', 'hospital', 'tpa', 'pre-authorization', 'pre authorisation',
      'health insurance', 'mediclaim', 'room rent', 'waiting period', 'sum insured',
    ],
    links: [
      {
        href: '/blog/irdai-cashless-claim-pre-authorization-approval-rejection-rules-2026',
        anchor: 'the IRDAI rules on cashless authorisation',
        note: 'What the insurer must decide, and how quickly.',
      },
      {
        href: '/tools/risk-scorecard/',
        anchor: 'check whether your cover is actually enough',
        note: 'Ten questions, no sign-up, an honest score.',
      },
      {
        href: '/compare/',
        anchor: 'compare health cover on claim record, not premium alone',
        note: 'How the same cover behaves across insurers.',
      },
    ],
  },
  {
    id: 'motor',
    keywords: [
      'motor', 'vehicle', 'idv', 'surveyor', 'garage', 'total loss', 'accident claim',
      'own damage', 'third party', 'policybazaar car', 'car insurance', 'bike insurance',
    ],
    links: [
      {
        href: '/blog/motor-insurance-claim-process-guide-2026',
        anchor: 'the motor claim process step by step',
        note: 'Intimation, survey, repair authorisation, payment.',
      },
      {
        href: '/blog/how-to-calculate-idv-insured-declared-value-vehicle-2026',
        anchor: 'how IDV is calculated and why it decides a total loss',
        note: 'The number the settlement is capped at.',
      },
      {
        href: '/compare/',
        anchor: 'compare motor cover and claim settlement records',
        note: 'Before renewal, not after a loss.',
      },
    ],
  },
  {
    id: 'life',
    keywords: [
      'lic', 'jeevan', 'endowment', 'money back', 'maturity', 'surrender', 'revival',
      'lapsed', 'policy loan', 'bonus', 'term plan', 'life insurance', 'nominee',
    ],
    links: [
      {
        href: '/tools/policy-recovery/',
        anchor: 'trace a lost or lapsed LIC policy',
        note: 'What to search, and what LIC already publishes.',
      },
      {
        href: '/blog/lic-claim-rejection-appeal-process-2026',
        anchor: 'what to do when LIC rejects a claim',
        note: 'The grounds LIC actually uses, and the answers to them.',
      },
      {
        href: '/blog/lic-policy-revival-complete-guide-2026',
        anchor: 'how LIC revival is calculated',
        note: 'Arrears, interest and what restarts when you revive.',
      },
    ],
  },
  {
    id: 'nondisclosure',
    keywords: [
      'section 45', 'non-disclosure', 'non disclosure', 'pre-existing', 'pre existing',
      'concealment', 'material fact', 'fraud', 'repidiat', 'repudiat',
    ],
    links: [
      {
        href: '/blog/section-45-insurance-act-three-year-rule-2026',
        anchor: 'Section 45 of the Insurance Act and the three-year rule',
        note: 'After three years, only proven fraud voids a policy.',
      },
      {
        href: '/blog/health-insurance-pre-existing-disease-waiting-period-guide-2026',
        anchor: 'how pre-existing disease waiting periods are counted',
        note: 'The dates that decide whether a rejection stands.',
      },
      {
        href: '/claim-recovery/',
        anchor: 'what a non-disclosure rejection can be answered with',
        note: 'Evidence, not argument.',
      },
    ],
  },
  {
    id: 'documents',
    keywords: [
      'document', 'paperwork', 'rejection letter', 'checklist', 'claim form',
      'discharge summary', 'fir', 'survey report', 'intimation',
    ],
    links: [
      {
        href: '/policy-review-checklist/',
        anchor: 'the policy review checklist',
        note: 'What to check before a claim, not after.',
      },
      {
        href: '/resources/how-it-works/',
        anchor: 'how a claim file is read, start to finish',
        note: 'What an insurer looks for, and in what order.',
      },
      {
        href: '/faq/',
        anchor: 'common questions about claim paperwork',
        note: 'Short, specific answers.',
      },
    ],
  },
  {
    id: 'loans',
    keywords: [
      'loan against policy', 'policy loan', 'home loan insurance', 'credit life',
      'loan protection', 'emi', 'mortgage', 'loans',
    ],
    links: [
      {
        href: '/loans/',
        anchor: 'loans and the insurance attached to them',
        note: 'Group cover, credit life, and who actually holds the policy.',
      },
      {
        href: '/tools/',
        anchor: 'the calculators, including cover and premium estimates',
        note: 'No sign-up, no email asked for.',
      },
      {
        href: '/claim-recovery/',
        anchor: 'when a loan-linked cover is refused',
        note: 'The bank is usually the master policyholder.',
      },
    ],
  },
  {
    id: 'buying',
    keywords: [
      'premium', 'compare', 'best plan', 'buy', 'savings plan', 'ulip', 'pension',
      'annuity', 'rider', 'tax', '80c', 'guaranteed',
    ],
    links: [
      {
        href: '/compare/',
        anchor: 'compare plans on what they pay, not what they promise',
        note: 'Side by side, with the clauses that differ.',
      },
      {
        href: '/tools/',
        anchor: 'free insurance calculators',
        note: 'Human life value, risk score, policy recovery.',
      },
      {
        href: '/services/',
        anchor: 'what an advisor actually does before you buy',
        note: 'The work that happens before a policy is issued.',
      },
    ],
  },
];

/** Fallback when nothing scores: the site's central topic. */
export const DEFAULT_BUCKET: TopicBucket = {
  id: 'claim',
  keywords: [],
  links: [
    {
      href: '/claim-recovery/',
      anchor: 'the claim recovery route, start to finish',
      note: 'From the rejection letter to the Ombudsman.',
    },
    {
      href: '/tools/',
      anchor: 'the calculators and checklists',
      note: 'Free, and no email required.',
    },
    {
      href: '/faq/',
      anchor: 'the questions people ask before they call',
      note: 'Short answers, plainly written.',
    },
  ],
};

/**
 * Score a post against each bucket. Title matches count double because a post
 * titled "IDV" is about IDV; a passing mention in the body is weaker evidence.
 */
export function bucketFor(title: string, summary: string, body: string): TopicBucket {
  const t = title.toLowerCase();
  const s = summary.toLowerCase();
  // Only the opening of the body: the tail often name-drops everything.
  const b = body.slice(0, 2000).toLowerCase();

  let best: TopicBucket | null = null;
  let bestScore = 0;

  for (const bucket of TOPIC_BUCKETS) {
    let score = 0;
    for (const kw of bucket.keywords) {
      if (t.includes(kw)) score += 3;
      if (s.includes(kw)) score += 2;
      if (b.includes(kw)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = bucket;
    }
  }

  return bestScore >= 3 && best ? best : DEFAULT_BUCKET;
}
