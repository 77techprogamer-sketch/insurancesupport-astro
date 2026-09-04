// Generate ONE hyper-local backlink page per Bangalore location (14 pages total)
// Each page lists ALL 13 services with deep links to insurancesupport.online
// Usage: node scripts/generate-location-backlinks.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'backlinks', 'locations');

const services = [
  { slug: 'life-insurance', title: 'Life Insurance', desc: 'Family protection & wealth creation' },
  { slug: 'health-insurance', title: 'Health Insurance', desc: 'Cashless hospitalisation & mediclaim' },
  { slug: 'motor-insurance', title: 'Motor Insurance', desc: 'Car & two-wheeler cover, claims' },
  { slug: 'pension-plans', title: 'Pension Plans', desc: 'Retirement corpus building' },
  { slug: 'claim-support', title: 'Claim Support', desc: 'End-to-end claim filing & recovery' },
  { slug: 'policy-review', title: 'Policy Review', desc: 'Annual portfolio audit, gap analysis' },
  { slug: 'child-education-plan', title: 'Child Education Plans', desc: 'Guaranteed education funds' },
  { slug: 'investment-plans', title: 'Investment Plans', desc: 'Investment-cum-insurance with tax benefits' },
  { slug: 'travel-insurance', title: 'Travel Insurance', desc: 'Domestic & international trip cover' },
  { slug: 'professional-indemnity', title: 'Professional Indemnity', desc: 'Cover for consultants & firms' },
  { slug: 'term-insurance', title: 'Term Insurance', desc: 'Pure protection at low premiums' },
  { slug: 'sme-insurance', title: 'SME Insurance', desc: 'Business insurance for SMEs & startups' },
  { slug: 'ulip-plans', title: 'ULIP Plans', desc: 'Market-linked wealth creation with cover' },
];

const locations = [
  { slug: 'bannerghatta', name: 'Bannerghatta Road', lat: 12.894, lng: 77.5708 },
  { slug: 'bellandur', name: 'Bellandur', lat: 12.9328, lng: 77.6768 },
  { slug: 'devanahalli', name: 'Devanahalli', lat: 13.248, lng: 77.7056 },
  { slug: 'electronic-city', name: 'Electronic City', lat: 12.8456, lng: 77.6603 },
  { slug: 'hebbal', name: 'Hebbal', lat: 13.0355, lng: 77.597 },
  { slug: 'hsr-layout', name: 'HSR Layout', lat: 12.9082, lng: 77.6476 },
  { slug: 'indiranagar', name: 'Indiranagar', lat: 12.9784, lng: 77.6408 },
  { slug: 'jayanagar', name: 'Jayanagar', lat: 12.9193, lng: 77.5862 },
  { slug: 'jp-nagar', name: 'JP Nagar', lat: 12.9029, lng: 77.5856 },
  { slug: 'koramangala', name: 'Koramangala', lat: 12.9355, lng: 77.6245 },
  { slug: 'marathahalli', name: 'Marathahalli', lat: 12.9592, lng: 77.6974 },
  { slug: 'sarjapur', name: 'Sarjapur', lat: 12.8556, lng: 77.7256 },
  { slug: 'whitefield', name: 'Whitefield', lat: 12.9698, lng: 77.7499 },
  { slug: 'yelahanka', name: 'Yelahanka', lat: 13.101, lng: 77.5962 },
];

function serviceLinks(loc) {
  return services.map(s => `
    <li style="margin-bottom:.6rem;">
      <a href="https://insurancesupport.online/services/${loc.slug}/${s.slug}/" style="color:#1d4ed8;font-weight:600;text-decoration:none;">${s.title}</a>
      <span style="color:#64748b;font-size:.9rem;"> — ${s.desc}</span>
    </li>`).join('');
}

function pageHtml(loc) {
  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Insurance Advisor in ${loc.name} – All Services | Hari Kotian</title>
  <meta name="description" content="IRDAI-certified insurance advisor (Hari Kotian, Reg 0149161D) serving ${loc.name}, Bangalore. All insurance services: life, health, motor, term, pension, claims & more. Doorstep service, 25+ years." />
  <link rel="canonical" href="https://here.now/insurance-support/${loc.slug}/" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://here.now/insurance-support/${loc.slug}/" />
  <meta property="og:title" content="Insurance Advisor in ${loc.name} – All Services" />
  <meta property="og:description" content="All insurance services in ${loc.name}: life, health, motor, term, claims & more. IRDAI-certified Hari Kotian. Free consultation." />
  <meta property="og:image" content="https://insurancesupport.online/og-image.png" />
  <meta name="geo.region" content="IN-KA" />
  <meta name="geo.placename" content="${loc.name}, Bangalore" />
  <meta name="geo.position" content="${loc.lat};${loc.lng}" />
  <meta name="ICBM" content="${loc.lat}, ${loc.lng}" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Insurance Support - ${loc.name}",
    "description": "IRDAI-certified insurance advisor serving ${loc.name}, Bangalore with all insurance services.",
    "url": "https://here.now/insurance-support/${loc.slug}/",
    "telephone": "+919986634506",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "${loc.name}",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": ${loc.lat},
      "longitude": ${loc.lng}
    },
    "areaServed": { "@type": "City", "name": "${loc.name}" },
    "founder": {
      "@type": "Person",
      "name": "Hari Kotian",
      "jobTitle": "IRDAI Certified Insurance Advisor",
      "telephone": "+919986634506"
    }
  }
  </script>
</head>
<body style="font-family:system-ui,sans-serif;max-width:820px;margin:0 auto;padding:2rem 1rem;line-height:1.65;color:#1e293b;">
  <h1 style="font-size:1.9rem;line-height:1.25;">Insurance Advisor in ${loc.name}, Bangalore</h1>
  <p style="font-size:1.05rem;color:#475569;">All insurance services under one roof for ${loc.name} residents. Compare plans, get transparent quotes, and file claims with <strong>Hari Kotian</strong> — IRDAI-certified advisor (Reg No: 0149161D) with 25+ years of experience serving Bangalore families since 1998.</p>

  <h2 style="margin-top:2rem;">Services offered in ${loc.name}</h2>
  <ul style="list-style:none;padding-left:0;margin-top:1rem;">
    ${serviceLinks(loc)}
  </ul>

  <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:.6rem;padding:1rem 1.25rem;margin-top:2rem;">
    <strong>Free consultation — no obligation:</strong>
    <p style="margin:.6rem 0 0;">
      <a href="https://wa.me/919986634506?text=Hi%20Hari%2C%20I%20need%20insurance%20help%20in%20${encodeURIComponent(loc.name)}" style="display:inline-block;background:#22c55e;color:#fff;padding:.65rem 1.2rem;border-radius:.5rem;text-decoration:none;font-weight:600;">WhatsApp Hari Kotian</a>
      &nbsp;
      <a href="tel:+919986634506" style="display:inline-block;background:#1d4ed8;color:#fff;padding:.65rem 1.2rem;border-radius:.5rem;text-decoration:none;font-weight:600;">Call +91-99866 34506</a>
    </p>
  </div>

  <h3 style="margin-top:2rem;">Why ${loc.name} residents choose us</h3>
  <ul style="padding-left:1.2rem;">
    <li>Doorstep service across ${loc.name} and nearby areas</li>
    <li>Transparent quotes — no hidden charges, no spam</li>
    <li>Claim filing &amp; recovery assistance with 25+ years of experience</li>
    <li>Compare 20+ insurers (HDFC, ICICI, Max, Tata AIA, LIC)</li>
  </ul>

  <p style="font-size:.85rem;color:#64748b;border-top:1px solid #e2e8f0;padding-top:1rem;margin-top:2.5rem;">
    © 2026 Insurance Support — IRDAI Reg No: 0149161D | Hari Kotian, Koramangala, Bangalore<br/>
    <small>Indicative information only. Actual premiums depend on medical underwriting and insurer terms.</small>
  </p>
</body>
</html>`;
}

fs.mkdirSync(OUT, { recursive: true });
let count = 0;
for (const loc of locations) {
  const file = path.join(OUT, `${loc.slug}.html`);
  fs.writeFileSync(file, pageHtml(loc), 'utf-8');
  count++;
}
console.log(`Generated ${count} location backlink pages (one per location, listing all ${services.length} services)`);