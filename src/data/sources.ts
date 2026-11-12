/**
 * The official documents behind the claims made on this site.
 *
 * Every competitor in this space asserts things about the Ombudsman, the 30-day
 * settlement clock and Section 45 without saying where the rule comes from. Naming
 * the instrument and linking the regulator is the cheapest honest advantage
 * available: a reader can check, and a search engine can see the entity being
 * referenced.
 *
 * Detection is by pattern, so a post only shows a source it actually discusses.
 * Nothing is listed to look thorough.
 */

export interface Source {
  /** How it is cited on the page. */
  name: string;
  /** Who issues it. */
  issuer: string;
  url: string;
  /** Regex tested against the article text. */
  test: RegExp;
}

export const SOURCES: Source[] = [
  {
    name: 'Insurance Ombudsman Rules, 2017 (as amended by G.S.R. 828(E), 9 November 2023)',
    issuer: 'Department of Financial Services',
    url: 'https://cioins.co.in/Ombudsman',
    test: /ombudsman|bima lokpal|17\(6\)|₹5,000 a day|50 lakh/i,
  },
  {
    name: 'Master Circular on Protection of Policyholders’ Interests, 5 September 2024',
    issuer: 'IRDAI',
    url: 'https://irdai.gov.in/',
    test: /master circular|5 September 2024|14 days|30 days|45 days|cashless/i,
  },
  {
    name: 'IRDAI (Protection of Policyholders’ Interests) Regulations, 2017',
    issuer: 'IRDAI',
    url: 'https://irdai.gov.in/',
    test: /regulation 8|protection of policyholders|grievance redressal officer|grievance redressal/i,
  },
  {
    name: 'Insurance Act, 1938 — section 45 (policy not voidable after three years)',
    issuer: 'India Code, Ministry of Law and Justice',
    url: 'https://www.indiacode.nic.in/',
    test: /section 45|three-year rule|three year rule|non-disclosure|non disclosure/i,
  },
  {
    name: 'Consumer Protection Act, 2019 and the 2021 pecuniary jurisdiction rules',
    issuer: 'Ministry of Consumer Affairs',
    url: 'https://consumeraffairs.nic.in/',
    test: /consumer commission|consumer forum|consumer protection|district commission|state commission/i,
  },
  {
    name: 'Bima Bharosa grievance portal',
    issuer: 'IRDAI',
    url: 'https://bimabharosa.irdai.gov.in/',
    test: /bima bharosa/i,
  },
  {
    name: 'Cashless authorisation timelines for health claims, 29 May 2024',
    issuer: 'IRDAI',
    url: 'https://irdai.gov.in/',
    test: /one hour|1 hour|three hours|3 hours|pre-authorisation|pre-authorization/i,
  },
];

/** Sources relevant to this article, in the order they are listed above. */
export function sourcesFor(body: string): Source[] {
  return SOURCES.filter((source) => source.test.test(body)).slice(0, 4);
}
