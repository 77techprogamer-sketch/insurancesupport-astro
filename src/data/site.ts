/**
 * Site-wide identity constants that appear in more than one place.
 *
 * GOOGLE_REVIEW_URL is the link Hari sends to clients directly. Google Business
 * Profile review links are stable per listing; if the listing is ever
 * re-created, this is the only line that changes.
 */

export const SITE_URL = 'https://insurancesupport.online';

/** Opens Google's review box for the Insurance Support listing. */
export const GOOGLE_REVIEW_URL = 'https://g.page/r/CRDgJanrKjRhEBM/review';

/** The listing itself, used for structured data rather than for asking for a review. */
export const GOOGLE_PROFILE_URL = 'https://g.page/r/CRDgJanrKjRhEBM';
