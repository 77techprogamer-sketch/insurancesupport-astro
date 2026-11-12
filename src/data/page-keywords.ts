/**
 * Keyword sets by page type.
 *
 * Reality check, because this file is easy to misread: Google has ignored the
 * meta keywords tag since 2009. It is emitted anyway — Bing and a few small
 * engines still parse it, and it costs nothing — but nothing in here will move
 * a ranking on its own. The things that do move rankings are the title tag, the
 * H1, the first hundred words, the internal anchor text pointing at the page,
 * and whether the page answers the query better than the result above it.
 *
 * So treat these lists as the editorial brief for each page type: the phrases
 * the page is *supposed* to own. `seo/keyword-map.csv` carries the same idea
 * page by page, and flags any page whose title does not contain its own phrase.
 */
export const PAGE_KEYWORDS: Record<string, string[]> = {
  homepage: [
    "insurance claim rejection",
    "claim rejected what to do India",
    "insurance ombudsman complaint",
    "IRDAI bima bharosa complaint",
    "LIC claim rejection appeal",
    "health insurance claim denied",
    "cashless claim rejected hospital",
    "insurance advisor Bengaluru",
    "policy revival after lapse",
    "section 45 insurance act",
  ],
  service: [
    "insurance advisor Bengaluru",
    "claim support services India",
    "health insurance advisor Bangalore",
    "term insurance advisor Bangalore",
    "life insurance advisor Bangalore",
    "motor insurance claim help",
    "LIC agent Bangalore",
    "policy review service India",
    "insurance claim recovery",
    "IRDAI registered advisor",
  ],
  city: [
    "insurance advisor Bangalore",
    "insurance claim help Bangalore",
    "LIC agent Bangalore",
    "health insurance consultant Bengaluru",
    "term insurance advisor Bangalore",
    "motor insurance advisor Bangalore",
    "insurance ombudsman Bangalore",
    "cashless hospital Bangalore insurance",
    "insurance advisor near me Bangalore",
    "block level insurance service Bangalore",
  ],
  location: [
    "insurance advisor near me",
    "local insurance advisor Bangalore",
    "insurance claim help near me",
    "LIC agent near me",
    "health insurance advisor near me",
    "doorstep insurance consultation",
    "insurance advisor Whitefield",
    "insurance advisor Koramangala",
    "insurance advisor Indiranagar",
    "insurance advisor HSR Layout",
  ],
  compare: [
    "health insurance comparison India",
    "term insurance comparison",
    "motor insurance comparison",
    "ICICI Lombard vs HDFC ERGO",
    "best health insurance plan 2026",
    "LIC vs private insurer",
    "claim settlement ratio comparison",
    "insurance aggregator vs advisor",
    "insurance claim support services compared",
  ],
  faq: [
    "insurance FAQ India",
    "insurance claim questions answered",
    "life insurance claim FAQ",
    "health insurance claim FAQ",
    "IRDAI rules FAQ",
    "policy lapse FAQ",
    "insurance ombudsman FAQ",
    "claim rejection FAQ",
  ],
  contact: [
    "insurance advisor contact Bangalore",
    "insurance advisor phone number Bengaluru",
    "claim help contact Bangalore",
    "free insurance consultation Bengaluru",
    "IRDAI registered advisor contact",
    "insurance grievance contact",
    "Hari Kotian contact",
    "insurance advisor near me",
  ],
  "blog-post": [
    "insurance claim guide India",
    "claim rejection appeal process",
    "IRDAI rule explained",
    "LIC claim settlement",
    "health insurance cashless rules",
    "motor claim surveyor dispute",
    "insurance ombudsman process",
    "policy wording explained",
  ],
  "blog-index": [
    "insurance guides India",
    "insurance claim guides",
    "IRDAI updates 2026",
    "LIC claim guides",
    "health insurance guides",
    "motor claim guides",
    "insurance advisor blog",
  ],
  "guide-hub": [
    "insurance guides by topic",
    "claim rejection guides",
    "insurance ombudsman guides",
    "LIC and section 45 guides",
    "health insurance claim guides",
    "motor and travel claim guides",
    "NRI insurance guides",
  ],
  "lead-form": [
    "insurance callback request",
    "free insurance consultation",
    "claim review request",
    "insurance advisor call back Bangalore",
  ],
  search: [
    "search insurance guides",
    "find insurance answer",
    "insurance help search",
  ],
};
