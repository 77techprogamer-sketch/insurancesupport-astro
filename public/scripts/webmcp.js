export function registerWebMcpTools() {
  if (!('modelContext' in navigator) || typeof navigator.modelContext.registerTool !== 'function') {
    console.warn('WebMCP not supported in this browser');
    return;
  }

  const abortControllers = [];
  const register = (tool) => {
    const ac = new AbortController();
    abortControllers.push(ac);
    navigator.modelContext.registerTool({ ...tool, signal: ac.signal });
  };

  // Tool: site search – returns a URL for the query on the site
  register({
    name: 'siteSearch',
    description: 'Search the Insurance Support site',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Search terms' } },
      required: ['query']
    },
    execute: async ({ query }) => {
      const url = `${window.location.origin}/search?q=${encodeURIComponent(query)}`;
      return { url };
    }
  });

  // Tool: navigate – navigate the browser to a given URL on the same origin
  register({
    name: 'navigate',
    description: 'Navigate to a page on the site',
    inputSchema: {
      type: 'object',
      properties: { path: { type: 'string', description: 'Path relative to site origin, e.g. "/about"' } },
      required: ['path']
    },
    execute: async ({ path }) => {
      const target = new URL(path, window.location.origin);
      window.location.href = target.toString();
      return { navigated: true };
    }
  });

  // Cleanup: abort all tools when the page unloads (or when called explicitly)
  const cleanup = () => {
    abortControllers.forEach(ac => ac.abort());
    abortControllers.length = 0;
  };
  window.addEventListener('pagehide', cleanup);
  // expose for manual abort if needed
  window.__webMcpCleanup = cleanup;
}

if (typeof window !== 'undefined') {
  // Register on page load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    registerWebMcpTools();
  } else {
    window.addEventListener('DOMContentLoaded', registerWebMcpTools);
  }
}
