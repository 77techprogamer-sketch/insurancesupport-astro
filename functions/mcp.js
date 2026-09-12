export async function onRequest(context) {
  const { request } = context;
  // MCP Streamable HTTP endpoint — responds to JSON-RPC initialize
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      if (body.method === 'initialize') {
        return new Response(JSON.stringify({
          jsonrpc: '2.0',
          id: body.id ?? null,
          result: {
            protocolVersion: '2025-03-26',
            capabilities: {
              tools: { listChanged: false },
              resources: { subscribe: false, listChanged: false },
              prompts: { listChanged: false }
            },
            serverInfo: { name: 'insurancesupport-mcp', version: '1.0.0' }
          }
        }), {
          headers: {
            'Content-Type': 'application/json',
            'MCP-Protocol-Version': '2025-03-26'
          }
        });
      }
    } catch (e) {
      return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' }, id: null }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  // GET — return server info
  return new Response(JSON.stringify({
    serverInfo: { name: 'insurancesupport-mcp', version: '1.0.0' },
    protocolVersion: '2025-03-26',
    capabilities: {
      tools: { listChanged: false },
      resources: { subscribe: false, listChanged: false },
      prompts: { listChanged: false }
    }
  }), {
    headers: {
      'Content-Type': 'application/json',
      'MCP-Protocol-Version': '2025-03-26'
    }
  });
}