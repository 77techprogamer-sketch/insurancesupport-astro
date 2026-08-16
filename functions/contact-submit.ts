// functions/contact-submit.ts
// Cloudflare Pages Function — accepts generic contact-form submissions
// (contact page message form). Logs lead data to Workers Logs / KV / D1
// (if bindings configured) and returns a JSON status payload.

interface ContactData {
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message: string;
}

// Simple in-memory rate limiting (resets on each deploy / cold start)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10; // 10 submissions per hour per IP
  const record = rateLimit.get(ip);
  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) {
    return false;
  }
  record.count++;
  return true;
}

function getClientIP(request: Request): string {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const ip = getClientIP(request);

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Too many requests. Please try again later.',
    }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Parse body
  let data: ContactData;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid JSON body',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate required fields
  const requiredFields = ['name', 'phone', 'message'];
  for (const field of requiredFields) {
    if (!data[field] || !data[field].toString().trim()) {
      return new Response(JSON.stringify({
        success: false,
        error: `Missing required field: ${field}`,
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Phone validation (Indian)
  const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  const cleanedPhone = (data.phone || '').replace(/[^0-9]/g, '');
  if (!phoneRegex.test(cleanedPhone)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid Indian phone number',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Build record
  const record: any = {
    id: crypto.randomUUID(),
    type: 'contact_form',
    name: (data.name || '').trim(),
    email: data.email ? data.email.trim().toLowerCase() : null,
    phone: cleanedPhone,
    category: data.category || null,
    message: (data.message || '').trim(),
    ip,
    userAgent: request.headers.get('User-Agent') || 'unknown',
    referer: request.headers.get('Referer') || 'direct',
    timestamp: new Date().toISOString(),
  };

  // Log to Cloudflare dashboard (Workers Logs)
  console.log('NEW CONTACT SUBMISSION:', JSON.stringify(record, null, 2));

  // Store in KV if binding exists
  if (env?.LEADS_KV) {
    try {
      const key = `contact:${record.timestamp}:${record.id}`;
      await env.LEADS_KV.put(key, JSON.stringify(record), {
        expirationTtl: 60 * 60 * 24 * 30, // 30 days
      });
      console.log('Contact lead stored in KV:', key);
    } catch (kvError) {
      console.error('KV storage failed (non-blocking):', kvError);
    }
  }

  // Store in D1 (SQLite) if binding exists
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
        JSON.stringify({ ...record, type: 'contact_form', magnetSlug: 'contact' }),
        record.timestamp
      ).run();
      console.log('Contact lead stored in D1');
    } catch (dbError) {
      console.error('D1 storage failed (non-blocking):', dbError);
    }
  }

  // Send WhatsApp notification if token/binding provided (bonus)
  if (env?.WHATSAPP_TOKEN && env?.WHATSAPP_PHONE_ID) {
    try {
      const summary = `New contact form submission from ${record.name} (${record.phone})${record.email ? ' ' + record.email : ''}. Category: ${record.category || 'N/A'}. Message: ${record.message.substring(0, 100)}`;
      await fetch(`https://graph.facebook.com/v19.0/${env.WHATSAPP_PHONE_ID}/messages`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: '919986634506',
          type: 'text',
          text: { preview_url: false, body: summary },
        }),
      });
    } catch (waError) {
      console.error('WhatsApp notification failed (non-blocking):', waError);
    }
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
