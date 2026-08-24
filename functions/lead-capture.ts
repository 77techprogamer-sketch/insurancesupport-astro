// functions/lead-capture.ts
// Cloudflare Pages Function for lead magnet form submission
// ZERO external API dependencies - works out of the box
// Leads are logged to Cloudflare dashboard (Workers Logs) and optionally stored in KV

interface LeadData {
  magnetSlug: string;
  name: string;
  email: string;
  phone: string;
  [key: string]: any;
}

interface Magnet {
  slug: string;
  title: string;
}

const magnets: Magnet[] = [
  { slug: 'claim-checklist', title: 'LIC Claim Rejection Checklist & Appeal Template' },
  { slug: 'term-comparison', title: 'Term Insurance Comparison Sheet — Top 10 Insurers 2024' },
  { slug: 'health-claim-denial', title: 'Health Claim Denial Response Letter Generator' },
  { slug: 'irdai-complaint', title: 'IRDAI IGMS Complaint Filing Walkthrough (Video + Checklist)' },
  { slug: 'policy-review-checklist', title: 'Policy Review Checklist — Comprehensive 12-Point Audit' }
];

// Simple in-memory rate limiting (resets on deploy)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5; // 5 submissions per hour per IP

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
  // Cloudflare sets these headers
  return request.headers.get('CF-Connecting-IP') ||
         request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
         'unknown';
}

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const ip = getClientIP(request);

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({
      error: 'Too many requests. Please try again later.'
    }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Parse body
  let data: LeadData;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Validate required fields
  const requiredFields = ['magnetSlug', 'name', 'email', 'phone'];
  for (const field of requiredFields) {
    if (!data[field] || !data[field].toString().trim()) {
      return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return new Response(JSON.stringify({ error: 'Invalid email format' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Basic phone validation (Indian numbers)
  const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  if (!phoneRegex.test(data.phone.replace(/\s+/g, ''))) {
    return new Response(JSON.stringify({ error: 'Invalid Indian phone number' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Find magnet
  const magnet = magnets.find(m => m.slug === data.magnetSlug);
  if (!magnet) {
    return new Response(JSON.stringify({ error: 'Invalid lead magnet' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Prepare lead record
  const leadRecord = {
    id: crypto.randomUUID(),
    magnet: magnet.title,
    magnetSlug: data.magnetSlug,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    ip,
    userAgent: request.headers.get('User-Agent') || 'unknown',
    referer: request.headers.get('Referer') || 'direct',
    timestamp: new Date().toISOString(),
    // Include any additional fields
    ...Object.fromEntries(
      Object.entries(data).filter(([k]) => !requiredFields.includes(k))
    )
  };

  // LOG TO CLOUDFLARE DASHBOARD (viewable in Workers Logs)
  // In Cloudflare Pages: Go to your project > Functions > lead-capture > Logs
  console.log('NEW LEAD CAPTURED:', JSON.stringify(leadRecord, null, 2));

  // OPTIONAL: Store in Cloudflare KV if binding exists
  // Add this to wrangler.toml:
  // [kv_namespaces]
  // binding = "LEADS_KV"
  // id = "your-kv-namespace-id"
  if (env?.LEADS_KV) {
    try {
      const key = `lead:${leadRecord.timestamp}:${leadRecord.id}`;
      await env.LEADS_KV.put(key, JSON.stringify(leadRecord), {
        expirationTtl: 60 * 60 * 24 * 30 // 30 days
      });
      console.log('Lead stored in KV:', key);
    } catch (kvError) {
      console.error('KV storage failed (non-blocking):', kvError);
    }
  }

  // OPTIONAL: Store in Cloudflare D1 (SQLite) if binding exists
  // Add to wrangler.toml:
  // [[d1_databases]]
  // binding = "LEADS_DB"
  // database_name = "leads"
  // database_id = "your-database-id"
  if (env?.LEADS_DB) {
    try {
      await env.LEADS_DB.prepare(`
        INSERT INTO leads (id, magnet_slug, name, email, phone, ip, user_agent, referer, data, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        leadRecord.id,
        leadRecord.magnetSlug,
        leadRecord.name,
        leadRecord.email,
        leadRecord.phone,
        leadRecord.ip,
        leadRecord.userAgent,
        leadRecord.referer,
        JSON.stringify(leadRecord),
        leadRecord.timestamp
      ).run();
      console.log('Lead stored in D1');
    } catch (dbError) {
      console.error('D1 storage failed (non-blocking):', dbError);
    }
  }

  // SUCCESS - Return magnet title for confirmation page
  return new Response(JSON.stringify({
    success: true,
    magnetTitle: magnet.title,
    message: 'Lead captured successfully'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
  });
}

// Handle preflight OPTIONS
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
  });
}