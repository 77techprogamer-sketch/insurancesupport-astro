// functions/contact-submit.ts
// Cloudflare Pages Function — accepts the general contact / enquiry forms
// used on /contact, /get-started, /services and the homepage contact block.
//
// Storage order:
//   1. Cloudflare D1  (env.LEADS_DB)   — durable, same `leads` table as lead-capture
//   2. Cloudflare KV  (env.LEADS_KV)   — short-lived fallback
//   3. Nothing                        — the visitor is told honestly, with a WhatsApp link
//
// The response only reports success when the message was actually stored.

interface ContactData {
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message: string;
  page?: string;
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

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  },
});

/** Create the table if this is a fresh database, then add the enquiry columns. */
async function ensureSchema(db: any): Promise<void> {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      lead_type TEXT NOT NULL DEFAULT 'magnet',
      magnet_slug TEXT,
      name TEXT,
      email TEXT,
      phone TEXT,
      source TEXT,
      ip TEXT,
      user_agent TEXT,
      referer TEXT,
      data TEXT,
      created_at TEXT NOT NULL
    )
  `).run();

  const columns: Array<[string, string]> = [
    ['message', 'TEXT'],
    ['category', 'TEXT'],
    ['notified', 'INTEGER'],
  ];
  for (const [name, type] of columns) {
    try {
      await db.prepare(`ALTER TABLE leads ADD COLUMN ${name} ${type}`).run();
    } catch {
      // Column already exists — expected on every run after the first.
    }
  }
}

async function notify(env: any, lead: Record<string, unknown>): Promise<boolean> {
  const summary = [
    'New contact enquiry',
    `Name: ${lead.name || '—'}`,
    `Phone: ${lead.phone || '—'}`,
    `Email: ${lead.email || '—'}`,
    `Category: ${lead.category || '—'}`,
    `Message: ${lead.message || '—'}`,
    `Page: ${lead.page || lead.referer || '—'}`,
    `Time: ${lead.createdAt}`,
  ].join('\n');

  if (env?.LEAD_WEBHOOK_URL) {
    try {
      await fetch(env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: summary, lead }),
      });
      return true;
    } catch (err) {
      console.error('Webhook notify failed:', err);
    }
  }

  if (env?.RESEND_API_KEY && env?.LEAD_NOTIFY_EMAIL) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.LEAD_FROM_EMAIL || 'leads@insurancesupport.online',
          to: [env.LEAD_NOTIFY_EMAIL],
          subject: `New contact enquiry: ${lead.name || lead.phone || lead.email}`,
          text: summary,
        }),
      });
      return res.ok;
    } catch (err) {
      console.error('Email notify failed:', err);
    }
  }

  return false;
}

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const ip = getClientIP(request);

  if (!checkRateLimit(ip)) {
    return json({ success: false, error: 'Too many requests. Please try again in a little while, or WhatsApp us.' }, 429);
  }

  let data: ContactData;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON body' }, 400);
  }

  if (!data?.name || !data.name.toString().trim()) {
    return json({ success: false, error: 'Missing required field: name' }, 400);
  }
  if (!data?.phone || !data.phone.toString().trim()) {
    return json({ success: false, error: 'Missing required field: phone' }, 400);
  }

  const digitsOnly = (data.phone || '').replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return json({ success: false, error: 'Please enter a valid 10-digit phone number' }, 400);
  }
  const cleanedPhone = digitsOnly.slice(-10);

  const createdAt = new Date().toISOString();
  const record: Record<string, any> = {
    id: crypto.randomUUID(),
    leadType: 'contact',
    name: data.name.trim().slice(0, 200),
    email: data.email ? data.email.trim().toLowerCase().slice(0, 200) : null,
    phone: cleanedPhone,
    rawPhone: data.phone.trim(),
    category: data.category ? data.category.trim().slice(0, 100) : null,
    message: (data.message || '').toString().trim().slice(0, 5000) || null,
    source: data.page ? `contact:${data.page}` : 'contact:form',
    ip,
    userAgent: request.headers.get('User-Agent') || 'unknown',
    referer: request.headers.get('Referer') || 'direct',
    createdAt,
  };

  let stored = false;

  if (env?.LEADS_DB) {
    try {
      await ensureSchema(env.LEADS_DB);
      await env.LEADS_DB.prepare(`
        INSERT INTO leads (id, lead_type, name, email, phone, source, category, message, ip, user_agent, referer, data, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        record.id,
        record.leadType,
        record.name,
        record.email,
        record.phone,
        record.source,
        record.category,
        record.message,
        record.ip,
        record.userAgent,
        record.referer,
        JSON.stringify(record),
        record.createdAt,
      ).run();
      stored = true;
      console.log('Contact enquiry stored in D1');
    } catch (e) {
      console.error('D1 insert failed:', e);
    }
  }

  if (env?.LEADS_KV) {
    try {
      await env.LEADS_KV.put(
        `contact:${record.createdAt}:${record.id}`,
        JSON.stringify(record),
        { expirationTtl: 60 * 60 * 24 * 30 },
      );
      stored = true;
    } catch (e) {
      console.error('KV write failed:', e);
    }
  }

  const notified = await notify(env, record);

  if (!stored) {
    // Nothing was saved. Do not pretend otherwise — give the visitor a route that works.
    console.error('CONTACT LOST (no storage bound):', JSON.stringify(record));
    return json({
      success: false,
      stored: false,
      error: 'We could not save your message just now. Please WhatsApp +91 99866 34506 or call — it reaches the same person.',
    }, 503);
  }

  return json({
    success: true,
    stored: true,
    notified,
    id: record.id,
    message: 'Your message has been received. Hari Kotian will get back to you, usually within one working day.',
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
