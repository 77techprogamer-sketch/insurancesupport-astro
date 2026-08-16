// functions/newsletter-signup.ts
// Cloudflare Pages Function — newsletter subscription

interface NewsletterData {
  email: string;
}

// Simple rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 3;
  const record = rateLimit.get(ip);
  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) return false;
  record.count++;
  return true;
}

function getClientIP(request: Request): string {
  return request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() || 'unknown';
}

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const ip = getClientIP(request);

  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ success: false, error: 'Too many requests. Please try again later.' }), {
      status: 429, headers: { 'Content-Type': 'application/json' },
    });
  }

  let data: NewsletterData;
  try { data = await request.json(); }
  catch { return new Response(JSON.stringify({ success: false, error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } }); }

  if (!data.email || !data.email.trim()) {
    return new Response(JSON.stringify({ success: false, error: 'Email is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid email format' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const record = {
    id: crypto.randomUUID(),
    type: 'newsletter',
    email: data.email.trim().toLowerCase(),
    ip,
    userAgent: request.headers.get('User-Agent') || 'unknown',
    timestamp: new Date().toISOString(),
  };

  console.log('NEWSLETTER SIGNUP:', JSON.stringify(record, null, 2));

  // Store in KV if available
  if (env?.LEADS_KV) {
    try {
      const key = `newsletter:${record.email}:${record.timestamp}`;
      await env.LEADS_KV.put(key, JSON.stringify(record), { expirationTtl: 60 * 60 * 24 * 90 });
    } catch (e) { console.error('KV storage failed (non-blocking):', e); }
  }

  // Store in D1 if available
  if (env?.LEADS_DB) {
    try {
      await env.LEADS_DB.prepare(`INSERT INTO leads (id, type, name, email, phone, ip, user_agent, data, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(record.id, record.type, null, record.email, null, record.ip, record.userAgent, JSON.stringify(record), record.timestamp)
        .run();
    } catch (e) { console.error('D1 storage failed (non-blocking):', e); }
  }

  return new Response(JSON.stringify({ success: true, message: 'Successfully subscribed to newsletter.' }), {
    status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' },
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' } });
}
