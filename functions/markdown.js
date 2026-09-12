
export async function onRequest(context) {
  const { request, next } = context;
  // Never intercept well-known discovery documents or static assets —
  // let Cloudflare serve them natively (correct Content-Type, no loop).
  const url = new URL(request.url);
  const isWellKnown = url.pathname.startsWith('/.well-known/');
  const isStatic = /\.(json|css|js|png|jpg|jpeg|webp|avif|svg|ico|woff2?|txt|xml|md)$/i.test(url.pathname) ||
                   url.pathname.startsWith('/assets/') || url.pathname.startsWith('/pagefind/');
  if (isWellKnown || isStatic) {
    return context.next();
  }
  const accept = request.headers.get('Accept') || '';
  // Only negotiate when markdown is explicitly requested
  if (!accept.includes('text/markdown')) {
    // Let the static asset be served normally
    return context.next();
  }
  // Determine the path of the requested HTML file
  const pathname = url.pathname.endsWith('/') ? `${url.pathname}index.html` : `${url.pathname}.html`;
  const htmlResponse = await fetch(`${url.origin}${pathname}`);
  if (!htmlResponse.ok) {
    return new Response('Not found', { status: 404 });
  }
  const html = await htmlResponse.text();
  // Lazy-load Turndown to avoid overhead on normal requests
  const { default: TurndownService } = await import('turndown');
  const turndownService = new TurndownService({ headingStyle: 'atx' });
  const markdown = turndownService.turndown(html);
  return new Response(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
