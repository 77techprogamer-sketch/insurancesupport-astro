// functions/geo.ts
// Cloudflare Pages Function — lightweight IP-based geo endpoint
// Returns the matched regional location slug + page URL for the visitor's detected city
// Cloudflare exposes request.cf with city-level geolocation on EVERY request (free, no API key)

interface GeoMatch {
  slug: string;        // e.g. "pune"
  name: string;        // e.g. "Pune"
  state: string;       // e.g. "Maharashtra"
  url: string;         // e.g. "/locations/pune"
  whatsappText: string; // pre-filled WhatsApp message
}

// Map Cloudflare city names → location page slugs
// Cloudflare uses official/local names: "Bengaluru" not "Bangalore", "Mysuru" not "Mysore"
// Case-insensitive match
const CITY_MAP: Record<string, GeoMatch> = {
  // Karnataka — Bangalore neighborhoods
  'bangalore':       { slug: 'bangalore-koramangala', name: 'Koramangala, Bangalore', state: 'Karnataka', url: '/locations/bangalore-koramangala', whatsappText: 'Hi Hari Kotian, I need insurance advice in Bangalore.' },
  'bengaluru':       { slug: 'bangalore-koramangala', name: 'Koramangala, Bangalore', state: 'Karnataka', url: '/locations/bangalore-koramangala', whatsappText: 'Hi Hari Kotian, I need insurance advice in Bangalore.' },
  // Major metros + regional cities
  'pune':            { slug: 'pune',   name: 'Pune',   state: 'Maharashtra', url: '/locations/pune',   whatsappText: 'Hi Hari Kotian, I need insurance advice in Pune.' },
  'mumbai':          { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', url: '/locations/mumbai', whatsappText: 'Hi Hari Kotian, I need insurance advice in Mumbai.' },
  'bombay':          { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', url: '/locations/mumbai', whatsappText: 'Hi Hari Kotian, I need insurance advice in Mumbai.' },
  'indore':          { slug: 'indore', name: 'Indore', state: 'Madhya Pradesh', url: '/locations/indore', whatsappText: 'Hi Hari Kotian, I need insurance advice in Indore.' },
  'kochi':           { slug: 'kochi',  name: 'Kochi',  state: 'Kerala',      url: '/locations/kochi',  whatsappText: 'Hi Hari Kotian, I need insurance advice in Kochi.' },
  'cochin':          { slug: 'kochi',  name: 'Kochi',  state: 'Kerala',      url: '/locations/kochi',  whatsappText: 'Hi Hari Kotian, I need insurance advice in Kochi.' },
  'ernakulam':       { slug: 'kochi',  name: 'Kochi',  state: 'Kerala',      url: '/locations/kochi',  whatsappText: 'Hi Hari Kotian, I need insurance advice in Kochi.' },
  'chandigarh':      { slug: 'chandigarh', name: 'Chandigarh', state: 'Chandigarh', url: '/locations/chandigarh', whatsappText: 'Hi Hari Kotian, I need insurance advice in Chandigarh.' },
  'nagpur':          { slug: 'nagpur', name: 'Nagpur', state: 'Maharashtra', url: '/locations/nagpur', whatsappText: 'Hi Hari Kotian, I need insurance advice in Nagpur.' },
  'bhubaneswar':     { slug: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', url: '/locations/bhubaneswar', whatsappText: 'Hi Hari Kotian, I need insurance advice in Bhubaneswar.' },
  'surat':           { slug: 'surat',  name: 'Surat',  state: 'Gujarat',     url: '/locations/surat',  whatsappText: 'Hi Hari Kotian, I need insurance advice in Surat.' },
  'mysore':          { slug: 'mysore', name: 'Mysore', state: 'Karnataka',   url: '/locations/mysore', whatsappText: 'Hi Hari Kotian, I need insurance advice in Mysore.' },
  'mysuru':          { slug: 'mysore', name: 'Mysore', state: 'Karnataka',   url: '/locations/mysore', whatsappText: 'Hi Hari Kotian, I need insurance advice in Mysore.' },
  'hosur':           { slug: 'hosur',  name: 'Hosur',  state: 'Tamil Nadu',  url: '/locations/hosur',  whatsappText: 'Hi Hari Kotian, I need insurance advice in Hosur.' },
  // Bangalore neighborhoods — hyperlocal
  'indiranagar':     { slug: 'bangalore-indiranagar',    name: 'Indiranagar, Bangalore',    state: 'Karnataka', url: '/locations/bangalore-indiranagar',    whatsappText: 'Hi Hari Kotian, I need insurance advice in Indiranagar.' },
  'koramangala':     { slug: 'bangalore-koramangala',    name: 'Koramangala, Bangalore',    state: 'Karnataka', url: '/locations/bangalore-koramangala',    whatsappText: 'Hi Hari Kotian, I need insurance advice in Koramangala.' },
  'whitefield':      { slug: 'bangalore-whitefield',     name: 'Whitefield, Bangalore',     state: 'Karnataka', url: '/locations/bangalore-whitefield',     whatsappText: 'Hi Hari Kotian, I need insurance advice in Whitefield.' },
  'electronic city': { slug: 'bangalore-electronic-city',name: 'Electronic City, Bangalore',state: 'Karnataka', url: '/locations/bangalore-electronic-city',whatsappText: 'Hi Hari Kotian, I need insurance advice in Electronic City.' },
  'hsr layout':      { slug: 'bangalore-hsr-layout',     name: 'HSR Layout, Bangalore',     state: 'Karnataka', url: '/locations/bangalore-hsr-layout',     whatsappText: 'Hi Hari Kotian, I need insurance advice in HSR Layout.' },
  'marathahalli':    { slug: 'bangalore-marathahalli',   name: 'Marathahalli, Bangalore',   state: 'Karnataka', url: '/locations/bangalore-marathahalli',   whatsappText: 'Hi Hari Kotian, I need insurance advice in Marathahalli.' },
  'jp nagar':        { slug: 'bangalore-jp-nagar',       name: 'JP Nagar, Bangalore',       state: 'Karnataka', url: '/locations/bangalore-jp-nagar',       whatsappText: 'Hi Hari Kotian, I need insurance advice in JP Nagar.' },
  'j. p. nagar':     { slug: 'bangalore-jp-nagar',       name: 'JP Nagar, Bangalore',       state: 'Karnataka', url: '/locations/bangalore-jp-nagar',       whatsappText: 'Hi Hari Kotian, I need insurance advice in JP Nagar.' },
  'bellandur':       { slug: 'bangalore-bellandur',      name: 'Bellandur, Bangalore',      state: 'Karnataka', url: '/locations/bangalore-bellandur',      whatsappText: 'Hi Hari Kotian, I need insurance advice in Bellandur.' },
  'sarjapur':        { slug: 'bangalore-sarjapur',       name: 'Sarjapur, Bangalore',       state: 'Karnataka', url: '/locations/bangalore-sarjapur',       whatsappText: 'Hi Hari Kotian, I need insurance advice in Sarjapur.' },
  'yelahanka':       { slug: 'bangalore-yelahanka',      name: 'Yelahanka, Bangalore',      state: 'Karnataka', url: '/locations/bangalore-yelahanka',      whatsappText: 'Hi Hari Kotian, I need insurance advice in Yelahanka.' },
};

export async function onRequestGet(context: any) {
  const { request } = context;
  const cf: any = request.cf || {};

  // Cloudflare provides cf.city as a plain string
  const rawCity: string = (cf.city || '').trim().toLowerCase();

  // Try exact match first, then partial match
  let match: GeoMatch | undefined = CITY_MAP[rawCity];

  // Fallback: partial match (e.g. "Pune Division" → "pune")
  if (!match && rawCity) {
    for (const [key, val] of Object.entries(CITY_MAP)) {
      if (rawCity.includes(key) || key.includes(rawCity)) {
        match = val;
        break;
      }
    }
  }

  const body = match
    ? { ...match, matched: true }
    : { matched: false, city: cf.city || null, region: cf.region || null };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Edge-cached for 15 min — geolocation doesn't change fast
      'Cache-Control': 'public, max-age=900, s-maxage=900, stale-while-revalidate=3600',
      // Don't leak geo data in browser devtools/CDN logs
      'Vary': 'Accept-Encoding',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
