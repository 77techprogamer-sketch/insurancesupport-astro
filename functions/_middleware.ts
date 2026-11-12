// functions/_middleware.ts
//
// Country gate for insurancesupport.online.
//
// The service is for policyholders in India: the claim forums (Insurance
// Ombudsman, Bima Bharosa, consumer commissions), the policy wordings and the
// deadlines discussed on this site are Indian. Visitors arriving from search
// results in other countries are, with a few exceptions, not the audience.
//
// What this does: hands human visitors outside India a short notice page with
// one button to continue. That is the whole of it — no IP is stored, no
// fingerprint is taken, and the decision uses only Cloudflare's country code
// on the request.
//
// What this deliberately does NOT do, because doing it would be a disaster:
//
//   * Crawlers are never gated. Googlebot, Bingbot and the AI crawlers fetch
//     from United States IP addresses. A country gate that applied to them
//     would hide the entire site from every search engine.
//   * Link-preview fetchers are never gated. WhatsApp, Slack, LinkedIn and
//     Facebook previews come from outside India; gating them would break every
//     shared link.
//   * Assets, sitemaps, robots.txt, RSS and the API are never gated.
//   * NRI content is never gated. Those pages exist for Indians abroad.
//
// Emergency switch: set GEO_GATE=off in Cloudflare Pages → Settings →
// Environment variables and redeploy. The gate then does nothing at all.

const NOTICE_PATH = '/outside-india/';
const OVERRIDE_COOKIE = 'geo_continue';
const OVERRIDE_DAYS = 30;

// Anything that identifies itself as an automated fetcher. Deliberately broad:
// a false positive costs one uncounted visit, a false negative costs a crawl.
const AUTOMATED = /(bot|crawler|spider|crawl|slurp|preview|fetcher|validator|monitor|uptime|pingdom|lighthouse|headless|python-requests|python-urllib|curl|wget|go-http-client|java\/|okhttp|axios|node-fetch|facebookexternalhit|whatsapp|telegram|slack|discord|linkedin|twitter|pinterest|embedly|quora|outbrain|vkshare|redditbot|applebot|googleother|google-inspectiontool|storebot|petalbot|yandex|baidu|seznam|ahrefs|semrush|mj12|dotbot|screaming|sitebulb|serpstat|cognitiveseo|dataforseo|gptbot|oai-searchbot|chatgpt-user|claudebot|perplexity|ccbot|anthropic|bytespider)/i;

const ASSET = /\.(?:css|js|mjs|json|map|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|mp4|webm|pdf|xlsx|docx|txt|xml|zip|gz|webmanifest)$/i;

// Pages written for Indians living abroad. Gating these would close the one
// audience that is outside India on purpose.
const NRI_PATH = /(?:^|\/)(?:nri|guides\/nri-business|blog\/nri)/i;

function hasCookie(header: string | null, name: string, value: string): boolean {
  if (!header) return false;
  return header.split(';').some((part) => {
    const [k, v] = part.trim().split('=');
    return k === name && v === value;
  });
}

export const onRequest = async (context: any) => {
  const { request, env, next } = context;

  // Escape hatch: turn the gate off without a code change.
  if (env && (env.GEO_GATE === 'off' || env.GEO_GATE === 'OFF')) return next();

  if (request.method !== 'GET' && request.method !== 'HEAD') return next();

  const url = new URL(request.url);
  const path = url.pathname;

  if (ASSET.test(path) || path.startsWith('/api/') || path === '/robots.txt') return next();
  if (path === NOTICE_PATH || path === NOTICE_PATH.slice(0, -1)) return next();
  if (NRI_PATH.test(path)) return next();

  // Human page navigation only.
  const accept = request.headers.get('Accept') || '';
  if (!accept.includes('text/html')) return next();

  const userAgent = request.headers.get('User-Agent') || '';
  if (!userAgent || AUTOMATED.test(userAgent)) return next();

  // "Continue anyway" from the notice page: remember the choice for 30 days.
  if (url.searchParams.get('stay') === '1') {
    const target = new URL(url.toString());
    target.searchParams.delete('stay');
    return new Response(null, {
      status: 302,
      headers: {
        Location: target.toString(),
        'Set-Cookie': `${OVERRIDE_COOKIE}=1; Path=/; Max-Age=${OVERRIDE_DAYS * 86400}; SameSite=Lax; Secure`,
        'Cache-Control': 'no-store',
        Vary: 'CF-IPCountry',
      },
    });
  }

  if (hasCookie(request.headers.get('Cookie'), OVERRIDE_COOKIE, '1')) return next();

  const country: string | undefined = request.cf && (request.cf as any).country;
  // No country code (local development, or a Cloudflare plan without geo) →
  // serve the page normally rather than guess.
  if (!country || country === 'IN') return next();

  const notice = new URL(NOTICE_PATH, url.origin);
  return new Response(null, {
    status: 302,
    headers: {
      Location: notice.toString(),
      'Cache-Control': 'no-store',
      Vary: 'CF-IPCountry',
    },
  });
};
