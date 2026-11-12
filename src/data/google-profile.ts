/**
 * Facts read from the live Google Business Profile, not typed from memory.
 *
 * Source: https://g.page/r/CRDgJanrKjRhEBM (redirects to the Maps place with
 * CID 0x61342aeba925e010), checked 12 November 2026. Everything here is
 * verifiable at that URL, which is the point: the site previously carried
 * testimonials with no source at all.
 *
 * When the profile changes — a new review count, different hours — update this
 * file and nothing else. Visible copy and structured data both read from here.
 *
 * Deliberately absent: an aggregateRating block. Google's review-snippet rules
 * disallow self-serving reviews for LocalBusiness and Organization, so marking
 * up the business's own Google rating on the business's own site earns nothing
 * and risks a structured-data penalty. The rating is shown as text with a link
 * so a reader can check it, which is honest and is what actually convinces.
 */

export const GBP = {
  /** Exactly as the profile reads, including the LIC prefix. */
  name: 'LIC - Hari Kotian',
  category: 'Insurance agency',
  /** Maps place identity — stable, and what sameAs should point at. */
  cid: '0x3bae3d5028b4c20b:0x61342aeba925e010',
  mapsUrl:
    'https://www.google.com/maps/place/LIC+-+Hari+Kotian/@13.0464375,77.5508125,17z/data=!4m6!3m5!1s0x3bae3d5028b4c20b:0x61342aeba925e010!8m2!3d13.0464375!4d77.5508125!16s%2Fg%2F1pv16s2jp',
  shortUrl: 'https://g.page/r/CRDgJanrKjRhEBM',
  reviewUrl: 'https://g.page/r/CRDgJanrKjRhEBM/review',
  rating: 4.3,
  reviewCount: 24,
  checkedOn: '2026-11-12',
  address: {
    street: 'Bahubali Nagar, Jalahalli Village, Jalahalli',
    locality: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560013',
    country: 'IN',
  },
  plusCode: '2HW2+H8 Bengaluru',
  geo: { lat: 13.0464375, lng: 77.5508125 },
  /** Monday to Saturday; Sunday closed on the profile. */
  opens: '09:30',
  closes: '18:00',
  phoneDisplay: '+91 99866 34506',
  photoCount: 5,
} as const;

/**
 * Reviews quoted verbatim from the profile, trimmed where Google shows "…More".
 *
 * No star values per quote: the profile renders stars as icons and the text we
 * can read does not expose a per-review count, so claiming "5 stars" for an
 * individual review would be inventing detail. The 4.3 average and the 24-count
 * come from the profile header and are exact.
 */
export const GOOGLE_REVIEW_QUOTES = [
  {
    text: 'Very good LIC agent. He explains the policy based on the benefits and needs. He explains in detailed way and listens more first and suggests a good policy.',
    name: 'John',
    meta: 'Google review · a month ago',
  },
  {
    text: 'Best LIC consultant. Highly recommended person. Has indepth knowledge and suggests best required for individual as per your capacity.',
    name: 'Prashanth S',
    meta: 'Google review · 3 years ago',
  },
  {
    text: 'Genuine and kind hearted person.',
    name: 'Ayush Kandoi',
    meta: 'Google review · 4 years ago',
  },
] as const;
