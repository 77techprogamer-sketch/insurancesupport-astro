// functions/lead-capture.ts
// Single entry point for every lead the site captures: lead-magnet downloads,
// callback requests, quiz completions and contact-form fallbacks.
//
// Storage strategy (in order, all optional):
//   1. Cloudflare D1  (env.LEADS_DB)   — durable, queryable, self-healing schema
//   2. Cloudflare KV  (env.LEADS_KV)   — cheap 30-day buffer
//   3. Outbound notification (env.LEAD_WEBHOOK_URL, or Resend email)
//
// A lead is never silently dropped: if no store accepts it, the response says
// stored:false and the record is still written to Workers Logs.

interface LeadPayload {
  leadType?: 'magnet' | 'callback' | 'quiz' | 'contact';
  magnetSlug?: string;
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  timeSlot?: string;
  page?: string;
  [key: string]: unknown;
}

const MAGNETS: Record<string, string> = {
  'claim-checklist': 'Insurance Claim Rejection Checklist and Timeline Tracker',
  'term-comparison': 'Term Insurance Claim-Proof Checklist',
  'health-claim-denial': 'Health Insurance Claim Denial: Document and Response Checklist',
  'irdai-complaint': 'Insurance Ombudsman Complaint Preparation Toolkit',
  'policy-review-checklist': 'Printable Insurance Policy Review Checklist',
};

const SCHEMA = `
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
)`;

// In-memory rate limiting (per isolate; resets on deploy).
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, max = 8): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (record.count >= max) return false;
  record.count += 1;
  return true;
}

function getClientIP(request: Request): string {
  return request.headers.get('CF-Connecting-IP')
    || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim()
    || 'unknown';
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+91|91|0)?[6-9]\d{9}$/;

/** Fire-and-forget alert so a lead never sits unseen in logs. */
async function notify(env: any, lead: Record<string, unknown>): Promise<boolean> {
  const summary = [
    `New ${lead.leadType} lead`,
    `Name: ${lead.name || '—'}`,
    `Phone: ${lead.phone || '—'}`,
    `Email: ${lead.email || '—'}`,
    `Source: ${lead.source || lead.magnetSlug || '—'}`,
    `Page: ${lead.page || lead.referer || '—'}`,
    `Time: ${lead.timestamp}`,
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
          subject: `New ${lead.leadType} lead: ${lead.name || lead.phone || lead.email}`,
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

async function storeD1(env: any, lead: Record<string, any>): Promise<boolean> {
  if (!env?.LEADS_DB) return false;

  const insert = () => env.LEADS_DB.prepare(`
    INSERT INTO leads (id, lead_type, magnet_slug, name, email, phone, source, ip, user_agent, referer, data, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    lead.id, lead.leadType, lead.magnetSlug || null, lead.name || null, lead.email || null,
    lead.phone || null, lead.source || null, lead.ip, lead.userAgent, lead.referer,
    JSON.stringify(lead), lead.timestamp,
  ).run();

  try {
    await insert();
    return true;
  } catch (firstError) {
    // Table or column missing — create it once and retry.
    try {
      await env.LEADS_DB.exec(SCHEMA.replace(/\n/g, ' '));
      await insert();
      return true;
    } catch (secondError) {
      console.error('D1 storage failed:', firstError, secondError);
      return false;
    }
  }
}

async function storeKV(env: any, lead: Record<string, any>): Promise<boolean> {
  if (!env?.LEADS_KV) return false;
  try {
    await env.LEADS_KV.put(`lead:${lead.timestamp}:${lead.id}`, JSON.stringify(lead), {
      expirationTtl: 60 * 60 * 24 * 90,
    });
    return true;
  } catch (err) {
    console.error('KV storage failed:', err);
    return false;
  }
}

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const ip = getClientIP(request);

  if (!checkRateLimit(ip)) {
    return json({ error: 'Too many requests. Please try again in an hour.' }, 429);
  }

  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const leadType = (data.leadType
    || (data.magnetSlug ? 'magnet' : 'callback')) as NonNullable<LeadPayload['leadType']>;

  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim().toLowerCase();
  const phone = String(data.phone ?? '').replace(/[\s-]+/g, '');

  if (!name) return json({ error: 'Please provide your name.' }, 400);

  if (leadType === 'callback') {
    if (!phone) return json({ error: 'A mobile number is required for a callback.' }, 400);
    if (!PHONE_RE.test(phone)) return json({ error: 'Invalid Indian mobile number.' }, 400);
  } else {
    if (!email) return json({ error: 'An email address is required.' }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: 'Invalid email format.' }, 400);
    if (data.phone && !PHONE_RE.test(phone)) {
      return json({ error: 'Invalid Indian mobile number.' }, 400);
    }
  }

  const magnetSlug = data.magnetSlug ? String(data.magnetSlug) : '';
  if (leadType === 'magnet') {
    if (!magnetSlug || !MAGNETS[magnetSlug]) {
      return json({ error: 'Unknown lead magnet.' }, 400);
    }
  }

  const lead: Record<string, any> = {
    id: crypto.randomUUID(),
    leadType,
    magnetSlug: magnetSlug || null,
    magnet: magnetSlug ? MAGNETS[magnetSlug] : null,
    name,
    email: email || null,
    phone: phone || null,
    timeSlot: data.timeSlot ? String(data.timeSlot) : null,
    source: data.source ? String(data.source).slice(0, 120) : null,
    page: data.page ? String(data.page).slice(0, 200) : null,
    ip,
    userAgent: request.headers.get('User-Agent') || 'unknown',
    referer: request.headers.get('Referer') || 'direct',
    timestamp: new Date().toISOString(),
    // Keep any extra form fields (quiz answers, UTMs) without letting them
    // overwrite the canonical keys above.
    extra: Object.fromEntries(
      Object.entries(data).filter(([k]) => ![
        'leadType', 'magnetSlug', 'name', 'email', 'phone', 'source',
        'page', 'timeSlot',
      ].includes(k)),
    ),
  };

  const [storedD1, storedKV] = [await storeD1(env, lead), await storeKV(env, lead)];
  const notified = await notify(env, lead);

  if (!storedD1 && !storedKV && !notified) {
    console.error('LEAD NOT PERSISTED — no storage or notification configured:', JSON.stringify(lead));
  } else {
    console.log('LEAD CAPTURED:', JSON.stringify({ id: lead.id, leadType, storedD1, storedKV, notified }));
  }

  return json({
    success: true,
    stored: storedD1 || storedKV,
    notified,
    leadType,
    magnetTitle: lead.magnet,
    message: leadType === 'callback'
      ? 'Callback requested'
      : 'Lead captured successfully',
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
