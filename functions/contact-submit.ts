// functions/contact-submit.ts
// Cloudflare Pages Function — accepts generic contact-form submissions

interface ContactData {
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message: string;
}

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 10;
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

  let data: ContactData;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid JSON body' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate required fields
  if (!data.name || !data.name.toString().trim()) {
    return new Response(JSON.stringify({ success: false, error: 'Missing required field: name' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!data.phone || !data.phone.toString().trim()) {
    return new Response(JSON.stringify({ success: false, error: 'Missing required field: phone' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!data.message || !data.message.toString().trim()) {
    return new Response(JSON.stringify({ success: false, error: 'Missing required field: message' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  // Extract last 10 digits for clean Indian phone storage
  const digitsOnly = (data.phone || '').replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return new Response(JSON.stringify({ success: false, error: 'Please enter a valid 10-digit phone number' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }
  const cleanedPhone = digitsOnly.slice(-10);

  const record: any = {
    id: crypto.randomUUID(),
    type: 'contact_form',
    name: data.name.trim(),
    email: data.email ? data.email.trim().toLowerCase() : null,
    phone: cleanedPhone,
    raw_phone: data.phone.trim(),
    category: data.category || null,
    message: data.message.trim(),
    ip,
    userAgent: request.headers.get('User-Agent') || 'unknown',
    referer: request.headers.get('Referer') || 'direct',
    timestamp: new Date().toISOString(),
  };

  console.log('NEW CONTACT SUBMISSION:', JSON.stringify(record, null, 2));

  if (env?.LEADS_KV) {
    try {
      const key = `contact:${record.timestamp}:${record.id}`;
      await env.LEADS_KV.put(key, JSON.stringify(record), { expirationTtl: 60 * 60 * 24 * 30 });
    } catch (e) { console.error('KV failed:', e); }
  }

  if (env?.LEADS_DB) {
    try {
      await env.LEADS_DB.prepare(`
        INSERT INTO leads (id, type, name, email, phone, category, message, ip, user_agent, referer, data, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        record.id,
        record.type,
        record.name,
        record.email,
        record.phone,
        record.category,
        record.message,
        record.ip,
        record.userAgent,
        record.referer,
        JSON.stringify(record),
        record.timestamp
      ).run();
      console.log('Contact lead stored in D1');
    } catch (e) { console.error('D1 failed:', e); }
  }

  return new Response(JSON.stringify({
    success: true,
    message: 'Your message has been sent successfully. Hari Kotian will contact you shortly.',
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
}
