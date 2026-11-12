/**
 * Verbatim provisions, quoted rather than paraphrased.
 *
 * Why this file exists: every competitor summarises these rules, and summaries
 * drift — one says 30 days, another 45, another a month. A quoted sentence with
 * an instrument and a date cannot drift, and it is the thing a reader can take
 * to an insurer. It is also the only part of this site that is genuinely hard to
 * copy: a competitor would have to read the circular to reproduce it.
 *
 * Every quote below was read off the regulator's own text on 12 November 2026.
 * The instruments:
 *
 *  - IRDAI/PP&GR/CIR/MISC/117/9/2024, Master Circular on Protection of
 *    Policyholders' Interests, 2024 — dated 5 September 2024.
 *  - Master Circular on Health Insurance Business, 29 May 2024 (the circular that
 *    repealed 55 earlier ones). Reference numbers differ between published copies,
 *    so none is asserted here.
 *
 * Do not add a quote to this file without reading it in the source. A paraphrase
 * dressed as a quotation would undo the only advantage the file has.
 */

export interface Rule {
  id: string;
  /** The sentence as the regulator wrote it. Punctuation is not tidied. */
  quote: string;
  instrument: string;
  date: string;
  /** What it means for someone whose claim has been refused. */
  plain: string;
  /** Where the reader can find the text. */
  url: string;
}

const PPI =
  'Master Circular on Protection of Policyholders’ Interests, 2024 (IRDAI/PP&GR/CIR/MISC/117/9/2024)';
const HEALTH = 'Master Circular on Health Insurance Business, 29 May 2024';

const IRDAI_HOME = 'https://irdai.gov.in/';

export const RULES: Record<string, Rule> = {
  noRejectionForDocuments: {
    id: 'noRejectionForDocuments',
    quote:
      'No claim shall be rejected or closed for want of documents or for delayed intimation of claim.',
    instrument: PPI,
    date: '5 September 2024',
    plain:
      'A missing paper or a late phone call is not, by itself, a reason to refuse a claim. If that is the stated ground for a rejection, the rejection contradicts the regulator’s own instruction.',
    url: IRDAI_HOME,
  },
  tenableEvidence: {
    id: 'tenableEvidence',
    quote:
      'No claim shall be repudiated by the insurer without obtaining legally tenable evidence to substantiate such repudiation.',
    instrument: PPI,
    date: '5 September 2024',
    plain:
      'A refusal has to rest on evidence the insurer can defend, not on a suspicion. Ask for it. If there is none, the letter you were sent is not a decision, it is an assertion.',
    url: IRDAI_HOME,
  },
  tpaCollectsDocuments: {
    id: 'tpaCollectsDocuments',
    quote:
      'Pursuant to intimation of the claim, Insurers and Third-Party Administrators (TPAs), shall collect the required documents from the Hospitals. Policyholder shall not be required to submit the documents.',
    instrument: PPI,
    date: '5 September 2024',
    plain:
      'Once the claim is intimated, gathering hospital records is the insurer’s and TPA’s job, not yours. Being asked to run around for records is the insurer shifting its own obligation onto you.',
    url: IRDAI_HOME,
  },
  interestForDelay: {
    id: 'interestForDelay',
    quote:
      'In case the claim is not settled within the specified timelines, then the claimant is entitled for interest at bank rate plus 2 percent from the date of receipt of intimation till the date of payment. Such interest shall be paid by the insurers suo-moto along with the claim amount.',
    instrument: PPI,
    date: '5 September 2024',
    plain:
      'If the claim runs past the deadline, interest is owed at 2% above the bank rate, from intimation to payment, and the insurer is supposed to pay it without being asked. Most policyholders never claim it.',
    url: IRDAI_HOME,
  },
  deathClaimFifteenDays: {
    id: 'deathClaimFifteenDays',
    quote:
      'Death claim, except in cases warranting investigation — within 15 days from the date of intimation of claim. Death claim warranting investigation — within 45 days from the date of intimation of claim.',
    instrument: PPI,
    date: '5 September 2024',
    plain:
      'Two clocks, not one. A death claim is due in 15 days; a death claim under investigation gets 45. If neither has happened, the interest provision above applies.',
    url: IRDAI_HOME,
  },
  cashlessOneHour: {
    id: 'cashlessOneHour',
    quote:
      'Insurer shall decide on the request for cashless authorization immediately but not more than one hour of receipt of request.',
    instrument: HEALTH,
    date: '29 May 2024',
    plain:
      'One hour from the hospital’s request, not from your phone call. Get the timestamp from the insurance desk — that timestamp is the whole argument.',
    url: IRDAI_HOME,
  },
  dischargeThreeHours: {
    id: 'dischargeThreeHours',
    quote:
      'Insurer shall grant final authorization within three hours of the receipt of discharge authorization request from the hospital. In no case, the policyholder shall be made to wait to be discharged from the Hospital.',
    instrument: HEALTH,
    date: '29 May 2024',
    plain:
      'Three hours at discharge, and the rule says in terms that you are not to be held in a bed waiting for an approval. Being told to wait is itself the breach.',
    url: IRDAI_HOME,
  },
  insurerPaysDelayCost: {
    id: 'insurerPaysDelayCost',
    quote:
      'If there is any delay beyond three hours, the additional amount if any charged by the hospital shall be borne by the insurer from shareholder’s fund.',
    instrument: HEALTH,
    date: '29 May 2024',
    plain:
      'The bill that grows because an approval took five hours is the insurer’s, not yours. This is the sentence to quote when the hospital asks you to pay for the wait.',
    url: IRDAI_HOME,
  },
  awardPenalty: {
    id: 'awardPenalty',
    quote:
      '30 days, a penalty of Rs. 5000/- per day shall be payable to the complainant for each day of delay.',
    instrument: PPI,
    date: '5 September 2024',
    plain:
      'If an Ombudsman award is not paid within 30 days, ₹5,000 a day accrues to the complainant — over and above the penal interest the Ombudsman Rules already provide.',
    url: IRDAI_HOME,
  },
};

/** Phrases that should appear with a quote on a page, keyed by rule id. */
export const RULE_ORDER = [
  'noRejectionForDocuments',
  'tenableEvidence',
  'tpaCollectsDocuments',
  'cashlessOneHour',
  'dischargeThreeHours',
  'interestForDelay',
];
