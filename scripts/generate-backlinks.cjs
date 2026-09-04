// Generate hyper-local backlink HTML files for all 14 Bangalore locations x 13 services
const fs = require('fs');
const path = require('path');

const services = [
  { slug: 'life-insurance', title: 'Life Insurance', blurb: 'Comprehensive life cover that protects your family\u2019s financial future in {loc}.' },
  { slug: 'health-insurance', title: 'Health Insurance', blurb: 'Cashless hospitalisation and mediclaim plans matched to {loc} hospitals and your budget.' },
  { slug: 'motor-insurance', title: 'Motor Insurance', blurb: 'Zero-hassle car and two-wheeler insurance, claims and renewals for {loc} drivers.' },
  { slug: 'pension-plans', title: 'Pension Plans', blurb: 'Build a retirement corpus with pension plans designed for {loc} residents.' },
  { slug: 'claim-support', title: 'Claim Support', blurb: 'End-to-end claim filing, tracking and recovery assistance across all insurers for {loc}.' },
  { slug: 'policy-review', title: 'Policy Review', blurb: 'Free annual policy audit to close coverage gaps in your {loc} portfolio.' },
  { slug: 'child-education-plan', title: 'Child Education Plans', blurb: 'Guaranteed education funds to secure your child\u2019s future in {loc}.' },
  { slug: 'investment-plans', title: 'Investment Plans', blurb: 'Balanced investment-cum-insurance plans with tax benefits for {loc} families.' },
  { slug: 'travel-insurance', title: 'Travel Insurance', blurb: 'International and domestic trip coverage before you fly from {loc}.' },
  { slug: 'professional-indemnity', title: 'Professional Indemnity', blurb: 'PI cover for consultants, freelancers and firms based in {loc}.' },
  { slug: 'term-insurance', title: 'Term Insurance', blurb: 'Pure protection at low premiums \u2014 term plans compared for {loc} residents.' },
  { slug: 'sme-insurance', title: 'SME Insurance', blurb: 'Business insurance for SMEs and startups headquartered in {loc}.' },
  { slug: 'ulip-plans', title: 'ULIP Plans', blurb: 'Market-linked wealth creation with life cover for {loc} investors.' },
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

const TEMPLATE = (loc, svc) => `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${svc.title} in ${loc.name} – TRUSTED Local Advisor</title>
  <meta name="description" content="${svc.title} in ${loc.name}, Bangalore: compare plans, get free quotes, and file claims with IRDAI-certified advisor Hari Kotian (Reg 0149161D). Doorstep service. No spam." />
  <link rel="canonical" href="https://here.now/insurance-support/${loc.slug}/${svc.slug}/" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://here.now/insurance-support/${loc.slug}/${svc.slug}/" />
  <meta property="og:title" content="${svc.title} in ${loc.name} | Insurance Support" />
  <meta property="og:description" content="Free ${svc.title.toLowerCase()} quotes and claim help in ${loc.name}. IRDAI-certified, 25+ years, doorstep service." />
  <meta property="og:image" content="https://insurancesupport.online/og-image.png" />
</head>
<body style="font-family:system-ui,sans-serif;max-width:760px;margin:0 auto;padding:2rem 1rem;line-height:1.65;color:#1e293b;">
  <h1 style="font-size:1.8rem;line-height:1.2;">${svc.title} in ${loc.name}, Bangalore</h1>
  <p style="font-size:1.05rem;color:#475569;">${svc.blurb.replace('{loc}', loc.name)}</p>

  <h2>What you get</h2>
  <ul style="padding-left:1.2rem;">
    <li>Free comparison of top insurers (HDFC, ICICI, Max, Tata AIA, LIC)</li>
    <li>Transparent quotes – no hidden charges, no spam calls</li>
    <li>Doorstep support across ${loc.name} and nearby areas</li>
    <li>Claim filing &amp; recovery assistance with 25+ years of experience</li>
  </ul>

  <p>Advised by <strong>Hari Kotian</strong> – IRDAI Reg No: 0149161D, serving Bangalore families since 1998.</p>

  <p>
    <a href="https://wa.me/919986634506?text=Hi%20Hari%2C%20I%20need%20help%20with%20${encodeURIComponent(svc.title)}%20in%20${encodeURIComponent(loc.name)}" style="display:inline-block;background:#22c55e;color:#fff;padding:.7rem 1.3rem;border-radius:.5rem;text-decoration:none;font-weight:600;">WhatsApp Hari Kotian</a>
    &nbsp;
    <a href="tel:+919986634506" style="display:inline-block;background:#1d4ed8;color:#fff;padding:.7rem 1.3rem;border-radius:.5rem;text-decoration:none;font-weight:600;">Call +91-99866 34506</a>
  </p>

  <p><a href="https://insurancesupport.online/services/${loc.slug}/${svc.slug}/" style="color:#1d4ed8;">View full ${svc.title.toLowerCase()} guide for ${loc.name} &rarr;</a></p>

  <p style="font-size:.85rem;color:#64748b;border-top:1px solid #e2e8f0;padding-top:1rem;margin-top:2rem;">
    © 2026 Insurance Support – IRDAI Reg No: 0149161D | Hari Kotian, Koramangala, Bangalore<br/>
    <small>These are indicative quotes. Actual premiums depend on medical underwriting and insurer terms.</small>
  </p>
</body>
</html>`;

let count = 0;
for (const loc of locations) {
  const dir = path.join(__dirname, '..', 'backlinks', 'bangalore', loc.slug);
  fs.mkdirSync(dir, { recursive: true });
  for (const svc of services) {
    const file = path.join(dir, `${svc.slug}.html`);
    fs.writeFileSync(file, TEMPLATE(loc, svc), 'utf-8');
    count++;
  }
}
console.log(`Generated ${count} backlink HTML files (${locations.length} locations x ${services.length} services)`);
console.log('Sample:', path.join('backlinks', 'bangalore', 'koramangala', 'health-insurance.html'));