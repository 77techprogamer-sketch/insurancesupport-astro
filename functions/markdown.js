
export async function onRequest(context) {
  const { request } = context;
  const accept = request.headers.get('Accept') || '';
  // Only negotiate when markdown is explicitly requested
  if (!accept.includes('text/markdown')) {
    // Let the static asset be served normally
    return fetch(request);
  }
  // Determine the path of the requested HTML file
  const url = new URL(request.url);
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
