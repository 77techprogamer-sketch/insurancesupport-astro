// src/utils/seoTitle.ts
// Google truncates <title> in the SERP at roughly 580px / ~60 characters.
// Titles longer than that lose their differentiator, so every page goes through
// clampTitle() in BaseLayout — templates stay readable, output stays short.

export const META_TITLE_MAX = 60;

/** Suffixes that are useful branding but useless when the title is already long. */
const BRAND_TAILS: RegExp[] = [
  /\s*[|–—-]\s*Insurance Support[^|]*$/i,
  /\s*[|–—-]\s*Hari Kotian[^|]*$/i,
  /\s*[|–—-]\s*InsuranceSupport\.Online[^|]*$/i,
  /\s*[|–—-]\s*Claim Case Study[^|]*$/i,
  /\s*[|–—-]\s*Free Insurance Resource[^|]*$/i,
  /\s*[|–—-]\s*Expert Insurance (?:Guides?|Tips|Blog)[^|]*$/i,
];

const TRAILING_STOPWORDS = new Set([
  'a', 'an', 'and', 'as', 'at', 'by', 'for', 'from', 'in', 'into', 'of', 'on',
  'or', 'the', 'to', 'with', 'vs', 'your', 'their', 'its', 'after', 'before',
  'explained', 'guide', 'choosing', 'managing', 'claiming', 'buying', 'filing',
  'getting', 'using', 'saving', 'understanding', 'complete', 'that', 'you',
]);

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&#x27;/gi, "'")
    .replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '–').replace(/&#8212;/g, '—');
}

function tidy(value: string): string {
  return decodeEntities(value)
    .replace(/\s+/g, ' ')
    .replace(/[\s,;:&|–—-]+$/g, '')
    .replace(/\s+(and|or|the|a|an|of|for|to|with)$/i, '')
    .replace(/[\s,;:&|–—-]+$/g, '')
    .trim();
}

/** Cut at the last word boundary at or before `max`, then drop dangling connectives. */
function trimAtWord(value: string, max: number): string {
  if (value.length <= max) return tidy(value);
  const space = value.lastIndexOf(' ', max);
  const firstBreak = value.search(/\s/);
  let out = tidy(value.slice(0, space > 15 ? space : (firstBreak > 0 ? firstBreak : value.length)));
  let words = out.split(' ');
  while (words.length > 3 && TRAILING_STOPWORDS.has(words[words.length - 1].toLowerCase().replace(/[^\w']/g, ''))) {
    words = words.slice(0, -1);
  }
  return tidy(words.join(' '));
}

/**
 * Shorten a page title to `max` characters without cutting mid-word.
 *
 * Order of sacrifices: brand suffix → parenthetical → sub-clause after a colon →
 * trailing comma-separated region → trailing words.
 */
export /** Index of the last " | ", " – " or " — " separator at or before `max`. */
function lastBoundary(title: string, max: number): number {
  let best = -1;
  for (let i = 0; i < title.length - 2 && i <= max; i++) {
    if ((title[i] === '|' || title[i] === '–' || title[i] === '—') && /\s/.test(title[i - 1] || '') && /\s/.test(title[i + 1] || '')) {
      best = i;
    }
  }
  return best;
}

/** Append whole words from `rest` while the result stays within `max`. */
function extendWithWords(head: string, rest: string, max: number, sep = '|'): string {
  const words = rest.split(' ').filter(Boolean);
  let out = head;
  let used = false;
  for (const word of words) {
    const next = used ? `${out} ${word}` : `${out} ${sep} ${word}`;
    if (tidy(next).length > max) break;
    out = next;
    used = true;
  }
  return tidy(out);
}

function clampTitleInner(raw: string | undefined | null, max: number): string {
  let title = tidy(String(raw ?? ''));
  if (!title || title.length <= max) return title;

  // 1. Brand / boilerplate suffix — the biggest and cheapest win.
  for (const pattern of BRAND_TAILS) {
    const shorter = tidy(title.replace(pattern, ''));
    if (shorter.length >= 25) title = shorter;
    if (title.length <= max) return title;
  }

  // 2. Trailing parenthetical such as "(2026 Complete Guide)".
  const withoutParens = tidy(title.replace(/\s*\([^()]*\)\s*$/, ''));
  if (withoutParens.length >= 25) title = withoutParens;
  if (title.length <= max) return title;

  // 3. Cut at a structural boundary ( | or em/en dash), then extend with whole
  //    words when the head is short — these tails are usually keyword lists.
  const boundary = lastBoundary(title, max);
  if (boundary >= 28) {
    const head = tidy(title.slice(0, boundary));
    const sep = title[boundary];
    const rest = title.slice(boundary + 1).replace(/^[|–—\s]+/, '');
    return head.length < 45 ? extendWithWords(head, rest, max, sep) : head;
  }

  // 4. "Topic 2026: long descriptive subtitle" — the topic stands on its own.
  const colonHead = tidy(title.split(/\s*:\s+/)[0]);
  if (colonHead.length >= 28 && colonHead.length <= max) return colonHead;

  // 5. Drop trailing comma-separated regions: "…, Karnataka" then "…, Bangalore".
  while (title.length > max) {
    const next = tidy(title.replace(/,\s*[^,]+$/, ''));
    if (next.length < 30 || next === title) break;
    title = next;
  }
  if (title.length <= max) return title;

  // 5. Last resort: word-boundary trim.
  return trimAtWord(title, max);
}

/** Keep the year in the title when the source had one — it signals freshness. */
function keepYear(original: string, clamped: string, max: number): string {
  const year = original.match(/\b(20\d\d)\b/);
  if (!year || new RegExp(`\\b${year[1]}\\b`).test(clamped)) return clamped;
  const withYear = `${clamped} ${year[1]}`;
  return withYear.length <= max ? withYear : clamped;
}

export function clampTitle(raw: string | undefined | null, max: number = META_TITLE_MAX): string {
  const original = tidy(String(raw ?? ''));
  // Ampersands and quotes grow when Astro escapes them (& -> &amp;), so budget for it.
  const escaped = original.replace(/&/g, '&amp;').replace(/"/g, '&quot;').length - original.length;
  const budget = Math.max(30, max - escaped);
  const clamped = clampTitleInner(original, budget);
  return clamped && clamped.length <= max ? keepYear(original, clamped, max) : clamped;
}

// Hand-written titles for pages where a mechanical clamp reads badly.
// Keyed by pathname so the template keeps its full, descriptive title.
export const TITLE_OVERRIDES: Record<string, string> = {
  '/': 'Insurance Claim Rejected? Free Review by an IRDAI Advisor',
  '/insurance-support/': 'Insurance Support | IRDAI Claim Advisory',
  '/claim-recovery/': 'Insurance Claim Recovery Hub: 2026 Guides',
  '/tools/human-life-value-calculator/': 'Human Life Value (HLV) Calculator | Free Tool',
  '/tools/policy-recovery/': 'LIC Policy Recovery | Find Lost & Lapsed Policies',

  '/blog/health-insurance-hub-complete-2026-guide/': "Health Insurance in India: 2026 Buyer's Guide",
  '/blog/lic-policy-hub-complete-guide-2026/': 'LIC Policies in India: 2026 Practical Guide',
  '/blog/claim-recovery-hub-complete-2026-guide/': 'Insurance Claim Recovery: 2026 Complete Guide',
  '/blog/term-insurance-comparison-hub-2026/': 'Term Insurance Comparison Hub: 30+ Plans',
  '/blog/child-education-planning-hub-2026/': 'Child Education Planning: 2026 Corpus Guide',
  '/blog/retirement-pension-planning-hub-2026/': 'Retirement & Pension Planning: NPS, Annuities 2026',
  '/blog/nps-section-80ccd1b-extra-50000-tax-deduction-india-2026/': 'NPS Section 80CCD(1B): Extra ₹50,000 Deduction',
  '/blog/irdai-complaint-toolkit-2026/': 'IRDAI Complaint Toolkit: Bima Bharosa & Ombudsman',
  '/blog/how-to-file-complaint-irdai-igms-portal-2026/': 'How to File a Complaint on the IRDAI IGMS Portal',
  '/blog/lic-maturity-claim-process-2026/': 'LIC Maturity Claim: Process, Documents & Timelines',
  '/blog/sme-insurance-in-india-2026-complete-guide-for-small-and-medium-businesses/': 'SME Insurance in India 2026: Complete Business Guide',
  '/blog/lic-latest-plans-2026-jeevan-utsav-amritbaal-index-plus/': 'LIC New Plans 2026: Jeevan Utsav, Amritbaal & Index Plus',
  '/blog/insurance-claim-rejection-15-reasons/': '15 Real Reasons Health Insurance Claims Get Rejected',
  '/blog/health-insurance-claim-rejection-15-real-reasons-how-to-prevent-appeal-each-one-2026/': 'Health Insurance Claim Rejection: 15 Real Reasons',
  '/blog/travel-insurance-claim-denied-2026/': 'Travel Insurance Claim Denied? NRI & Traveller Guide',
  '/blog/lic-death-claim-rejected-nominee-guide-2026/': 'LIC Death Claim Rejected or Delayed? 2026 Guide',
  '/blog/lic-policy-revival-complete-guide-2026/': 'LIC Policy Revival in 2026: Step-by-Step Guide',

  '/case-studies/icici-lombard-motor-theft-recovery/': 'Motor Theft Claim: ₹12 Lakh Recovered After Denial',
  '/case-studies/group-health-corporate-claim-recovery/': 'Corporate Health Claim: ₹15 Lakh Won After TPA Denial',
  '/case-studies/travel-insurance-medical-emergency-abroad/': 'Dubai Medical Emergency: ₹8.5 Lakh Claim Settled',
  '/case-studies/care-health-cashless-denial/': 'Cashless Denial: ₹6.2 Lakh Reimbursed by Insurer',
  '/case-studies/lic-claim-recovery-bangalore-retired-couple/': '₹42 Lakh LIC Claim Recovered for Retired Teacher',
  '/blog/lic-claim-rejection-appeal-process-2026/': 'LIC Claim Rejection Appeal: 2026 Step-by-Step',
  '/blog/icici-lombard-cashless-denied-hospital-guide-2026/': 'ICICI Lombard Cashless Denied: Hospital Guide',
  '/blog/insurance-claim-rejected-here-s-your-complete-legal-practical-fight-back-guide-2026/': 'Insurance Claim Rejected? Your 2026 Fight-Back Guide',
  '/blog/wedding-insurance-india-2026-protect-your-big-day-from-unexpected-disruptions/': 'Wedding Insurance India 2026: Is It Worth It?',
  '/blog/motor-insurance-in-india-2026-car-and-two-wheeler-insurance-complete-guide/': 'Motor Insurance in India 2026: Complete Guide',
  '/blog/life-insurance-in-india-2026-complete-guide-to-choosing-the-right-policy/': 'Life Insurance in India 2026: How to Choose',
  '/blog/term-life-insurance-complete-guide/': 'Term Life Insurance: The Complete Family Guide',
};
