// functions/lead-capture.ts
// Cloudflare Pages Function for lead magnet form submission
// Deploy to Cloudflare Pages - this runs at /functions/lead-capture

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
  { slug: 'irdai-complaint', title: 'IRDAI IGMS Complaint Filing Walkthrough (Video + Checklist)' }
];

export async function onRequestPost(context: any) {
  const { request, env } = context;

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
    if (!data[field]) {
      return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Find magnet
  const magnet = magnets.find(m => m.slug === data.magnetSlug);
  if (!magnet) {
    return new Response(JSON.stringify({ error: 'Invalid lead magnet' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Log lead (in production, integrate with your email/CRM/WhatsApp services)
  console.log('New lead captured:', {
    magnet: magnet.title,
    name: data.name,
    email: data.email,
    phone: data.phone,
    timestamp: new Date().toISOString()
  });

  // TODO: Add your integrations here using env variables:
  // - Send email via SendGrid/MailerSend/Resend
  // - Send WhatsApp via WhatsApp Business API
  // - Save to CRM (HubSpot, Airtable, Google Sheets)
  // - Add to email nurture sequence

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