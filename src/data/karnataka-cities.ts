/**
 * The Karnataka cities this site will actually compete for.
 *
 * Chosen for size and for distinct claim patterns, not for completeness: the
 * twelve here plus Bengaluru are where the queries are. Everything asserted is
 * either a public rule (Ombudsman jurisdiction, consumer-commission limits) or
 * a plain description of the district — no volumes, no win rates, no invented
 * office addresses.
 *
 * `licDo` is set only where LIC's own published divisional-office list names one
 * in that city. Where it is null the page says servicing runs through the
 * divisional office that holds the policy, without naming an office we cannot
 * verify.
 *
 * `slug` also matches the old /locations/<slug>/ page, which is now
 * canonicalised here — see src/pages/locations/[slug].astro.
 */

export interface KarnatakaCity {
  slug: string;
  /** Current official English name. */
  name: string;
  /** Older spelling still used in searches and in many policy documents. */
  former: string | null;
  district: string;
  /** Divisional office LIC itself lists for the district, if any. */
  licDo: string | null;
  /** What the district's economy and policy base look like — descriptive only. */
  context: string;
  /** The dispute pattern that actually turns up here. */
  angle: string;
  /** Two questions specific to this city; the shared ones are added by the page. */
  faqs: { q: string; a: string }[];
}

export const KARNATAKA_CITIES: KarnatakaCity[] = [
  {
    slug: 'mysore',
    name: 'Mysuru',
    former: 'Mysore',
    district: 'Mysuru',
    licDo: 'Mysuru',
    context:
      'Mysuru carries one of the oldest policy bases in the state: LIC endowment and money-back policies bought through its divisional and branch offices decades ago, alongside a newer workforce in the Hebbal and Hootagalli industrial belts.',
    angle:
      'The disputes that come up most are maturity and money-back claims on 1990s policies — where the original agent has retired and the file has to be traced — and health claims from older policyholders whose conditions were declared late or not at all.',
    faqs: [
      {
        q: 'Do I have to come to Bengaluru to file with the Ombudsman?',
        a: 'No. The Insurance Ombudsman for Karnataka sits in Bengaluru but hears the whole state, and filing is by post, email or the online form. A complainant from Mysuru does not travel unless they choose to attend a hearing.',
      },
      {
        q: 'My LIC policy was bought in Mysuru in the 1990s. Can the maturity claim still be traced?',
        a: 'Usually yes. What is needed is the policy number or the old agent or branch details, plus proof of address and identity; LIC can search the divisional records at Mysuru. Unclaimed amounts are also published on LIC’s unclaimed-amount search.',
      },
    ],
  },
  {
    slug: 'mangalore',
    name: 'Mangaluru',
    former: 'Mangalore',
    district: 'Dakshina Kannada',
    licDo: 'Mangaluru',
    context:
      'Dakshina Kannada sends a large share of its working population to the Gulf, so policies here are often bought years ago, renewed intermittently from abroad, and serviced in town by a relative or the original agent.',
    angle:
      'The recurring problem is lapse and revival. A policy stops while the policyholder is abroad, is revived years later, and the insurer then counts the section 45 three-year clock from the revival date rather than the original issue date.',
    faqs: [
      {
        q: 'I live in Mangaluru but the insurer’s office is in another state. Where do I complain?',
        a: 'Jurisdiction follows you, not the branch: the Ombudsman for Karnataka covers complaints from Karnataka residents, and Bima Bharosa is filed online regardless of where the insurer sits. The insurer’s own grievance officer is always the first step, and that is by email or post.',
      },
      {
        q: 'Can a policy lapsed while I was in the Gulf be revived without losing the original terms?',
        a: 'Revival restores the policy but restarts the waiting periods and the section 45 clock, and arrears with interest are payable. Whether that is worth it depends on how far the policy had run — past five continuous years the moratorium rules change the picture, so it is worth checking before paying.',
      },
    ],
  },
  {
    slug: 'hubli',
    name: 'Hubballi-Dharwad',
    former: 'Hubli',
    district: 'Dharwad',
    licDo: 'Dharwad',
    context:
      'The twin cities are the commercial centre of north Karnataka, with a LIC divisional office serving Dharwad district and a dense base of small-business, trading and agricultural policies.',
    angle:
      'Shop owners commonly insure stock, premises and family together, then discover on claim that the commercial stock was covered under a personal policy or that the shop cover excluded the very use they insured.',
    faqs: [
      {
        q: 'My shop and my family are insured under separate policies. Which one pays?',
        a: 'The one whose terms actually cover the loss. A personal accident or family health policy does not respond to stock loss, and a shop package policy usually excludes the owner’s medical treatment. Reading both schedules side by side is the first step, and it is where most of these disputes are settled or lost.',
      },
      {
        q: 'Is the district consumer commission in Hubballi or Dharwad?',
        a: 'Dharwad district has one District Consumer Disputes Redressal Commission, and it hears claims up to ₹50 lakh from anywhere in the district, including both cities.',
      },
    ],
  },
  {
    slug: 'belgaum',
    name: 'Belagavi',
    former: 'Belgaum',
    district: 'Belagavi',
    licDo: 'Belagavi',
    context:
      'Belagavi sits where Karnataka meets Maharashtra and Goa, and its working population moves across both. Policies are frequently written, renewed or serviced through branches outside Karnataka.',
    angle:
      'Cross-border servicing creates two practical problems: the insurer’s grievance office that holds the file may be in another state, and the branch that sold the policy may no longer exist as a physical office.',
    faqs: [
      {
        q: 'I bought the policy in Maharashtra but live in Belagavi. Which Ombudsman hears it?',
        a: 'The Karnataka Ombudsman in Bengaluru, because jurisdiction follows the complainant’s address as well as the insurer’s office. Filing there does not require travelling to Maharashtra.',
      },
      {
        q: 'The agent and the branch have both gone. Can the claim still be filed?',
        a: 'Yes — a claim is against the insurer, not the agent. The policy number on the schedule is enough to establish the contract, and the insurer must produce the file it holds.',
      },
    ],
  },
  {
    slug: 'gulbarga',
    name: 'Kalaburagi',
    former: 'Gulbarga',
    district: 'Kalaburagi',
    licDo: 'Kalaburagi',
    context:
      'Kalaburagi is the centre of the Hyderabad-Karnataka region, around 600 km from Bengaluru. Almost everything here runs on phone, WhatsApp and post rather than in person.',
    angle:
      'The common rejections are health claims marked "documents incomplete" or "non-medical", and LIC maturity claims where the policy is still registered at an address the family left years ago.',
    faqs: [
      {
        q: 'Can this be done entirely from Kalaburagi without visiting Bengaluru?',
        a: 'Yes. Documents go by WhatsApp scan, email or speed post, the grievance is written and emailed, and the Ombudsman filing is by post or online. The only reason to travel is if you choose to attend a hearing in person.',
      },
      {
        q: 'The insurer keeps asking for more documents. Is there a limit?',
        a: 'A request for documents must be specific, and the insurer should raise it once rather than in rounds. Ask in writing which document is missing and what clause requires it; keep the reply — a shifting list is itself useful evidence at the grievance stage.',
      },
    ],
  },
  {
    slug: 'bellary',
    name: 'Ballari',
    former: 'Bellary',
    district: 'Ballari',
    licDo: null,
    context:
      'Ballari’s economy runs on iron ore, steel and the trades built around them. Motor, group and workmen covers are common, and the district court and consumer commission see the disputes that follow.',
    angle:
      'Motor claims dominate: total-loss valuations set well below market, surveyor deductions taken without explanation, and commercial-vehicle claims refused because a permit or fitness certificate had lapsed by a few days.',
    faqs: [
      {
        q: 'The surveyor valued my truck far below market. Can that be challenged?',
        a: 'Yes. IDV is fixed at policy inception and cannot be reopened at claim time for a total loss; for partial loss, deductions must be itemised against the policy wording. Ask for the survey report and the deduction basis in writing before accepting anything.',
      },
      {
        q: 'The claim was refused because my fitness certificate had expired. Is that final?',
        a: 'A lapsed document is a real defence for the insurer, but the refusal still has to cite the clause it relies on, and a delay of days is often argued as not causative. That argument belongs in the grievance, not the first phone call.',
      },
    ],
  },
  {
    slug: 'davangere',
    name: 'Davanagere',
    former: null,
    district: 'Davanagere',
    licDo: null,
    context:
      'Davanagere is a district trading town with a textile base and a long-standing LIC footprint, serviced through branch agents and the divisional office that holds the file.',
    angle:
      'Health claims from district hospitals run into cashless paperwork — pre-authorisation refused, then a reimbursement claim refused for the very documents the hospital never issued — and LIC servicing often stalls because the original agent has stopped working.',
    faqs: [
      {
        q: 'Pre-authorisation was refused and I paid cash. Is the claim dead?',
        a: 'No. A refused cashless request is not a claim rejection; you can still file for reimbursement with the discharge summary, bills and the pre-authorisation refusal in writing. That refusal is often the insurer’s own document and helps.',
      },
      {
        q: 'My agent stopped working years ago. Who services the policy?',
        a: 'The branch that holds the policy, not the agent. Servicing, nomination changes and maturity claims can all be filed at the branch or through LIC’s online services with the policy number.',
      },
    ],
  },
  {
    slug: 'tumkur',
    name: 'Tumakuru',
    former: 'Tumkur',
    district: 'Tumakuru',
    licDo: null,
    context:
      'Tumakuru sits on the Bengaluru–Mumbai corridor and a good part of its working population commutes to or has moved to Bengaluru, so policies are often bought in one place and claimed in another.',
    angle:
      'Contact and address details on the policy are frequently years out of date after a move, which is where rejection letters and Ombudsman notices get lost — and where the one-year filing window quietly runs out.',
    faqs: [
      {
        q: 'The rejection letter went to my old Tumakuru address. Have I lost the right to appeal?',
        a: 'Not necessarily. The one-year Ombudsman window runs from the rejection or from the insurer’s final reply, and if the letter never reached you that date is arguable. Update the address with the insurer in writing first, so the record shows it.',
      },
      {
        q: 'Can a Tumakuru resident file in Bengaluru?',
        a: 'Yes for the Ombudsman, which sits in Bengaluru and covers the whole state; the district commission for Tumakuru sits in Tumakuru itself, and the state commission is in Bengaluru.',
      },
    ],
  },
  {
    slug: 'shimoga',
    name: 'Shivamogga',
    former: 'Shimoga',
    district: 'Shivamogga',
    licDo: 'Shivamogga',
    context:
      'Shivamogga is the gateway to Malnad, with a LIC divisional office and a policy base built through branch agents across Shivamogga, Bhadravati and Sagar.',
    angle:
      'Delays in intimation are the recurring issue in Malnad. Roads, distance and hospital transfers make the "immediate notice" condition hard to meet, and insurers use the delay to raise a defence that is usually weaker than it sounds.',
    faqs: [
      {
        q: 'I informed the insurer three days after admission. Can they refuse for delay?',
        a: 'Delay in intimation is a condition, not an automatic bar. The insurer must show the delay caused it prejudice — for example that treatment could have been different. A short delay after an emergency admission is rarely enough on its own.',
      },
      {
        q: 'Which consumer commission hears a Shivamogga case?',
        a: 'The District Consumer Disputes Redressal Commission at Shivamogga for claims up to ₹50 lakh; above that, the State Commission at Bengaluru, up to ₹2 crore.',
      },
    ],
  },
  {
    slug: 'bijapur',
    name: 'Vijayapura',
    former: 'Bijapur',
    district: 'Vijayapura',
    licDo: null,
    context:
      'Vijayapura is an agricultural district in the north of the state, where cover is mostly health, accident and long-held LIC policies bought through village-level agents.',
    angle:
      'Premium payments routed through a bank mandate that went dormant, and nominee details never updated after a death in the family, are the two failures that turn a valid policy into a disputed claim.',
    faqs: [
      {
        q: 'My premium stopped because the bank account went dormant. Is the policy still alive?',
        a: 'A policy is in force only while premiums are paid within the grace period — usually 30 days for yearly mode. After that it lapses. Revival is possible, with arrears and interest, but the waiting periods restart.',
      },
      {
        q: 'The nominee is no longer alive. Who receives the claim?',
        a: 'The legal heirs, through succession documents. Nomination can be changed during the policy term in writing or online, and updating it is the single cheapest thing a policyholder can do.',
      },
    ],
  },
  {
    slug: 'bidar',
    name: 'Bidar',
    former: null,
    district: 'Bidar',
    licDo: null,
    context:
      'Bidar is the northernmost district, close to Maharashtra and Telangana, and many families hold policies written across those borders.',
    angle:
      'Documents here are often in Kannada or Marathi rather than English, and nominees are frequently not updated — which is where a straightforward death claim turns into a succession problem.',
    faqs: [
      {
        q: 'Can I submit documents in Kannada?',
        a: 'Yes. Kannada is an official language of the state and an insurer operating in Karnataka cannot insist on English alone. If a translation is demanded, ask for that requirement in writing and cite the clause.',
      },
      {
        q: 'Which forum do I approach from Bidar?',
        a: 'The insurer’s grievance officer first, then IRDAI’s Bima Bharosa portal, then the Ombudsman at Bengaluru, which covers every district of Karnataka. The district commission for Bidar sits in Bidar.',
      },
    ],
  },
  {
    slug: 'raichur',
    name: 'Raichur',
    former: null,
    district: 'Raichur',
    licDo: 'Raichur',
    context:
      'Raichur has its own LIC divisional office, and a policy base that is largely agricultural and small-town, mostly sold through branch agents.',
    angle:
      'Accident and health covers sold alongside crop and equipment loans are the common cases, and the paperwork is usually thin — no copy of the proposal, no receipt, sometimes no policy document.',
    faqs: [
      {
        q: 'I do not have a copy of the policy document. Can a claim still be filed?',
        a: 'Yes. The insurer holds the contract and must give you a copy on request; the policy number or the proposal details from the bank or agent are enough to start. A missing copy is the insurer’s record problem, not a bar to claiming.',
      },
      {
        q: 'The loan was repaid but the insurance premium was charged. What is that cover?',
        a: 'Loan-linked covers are usually group policies where the bank is the master policyholder and the borrower is the insured. The claim route runs through the bank, so get the certificate of insurance and the group policy terms before assuming you are not covered.',
      },
    ],
  },
];

export const KARNATAKA_SLUGS = KARNATAKA_CITIES.map((c) => c.slug);

/** Bengaluru is not in the list — it has its own hub. */
export const KARNATAKA_BY_SLUG = Object.fromEntries(
  KARNATAKA_CITIES.map((c) => [c.slug, c]),
) as Record<string, KarnatakaCity>;
