const https = require('https');
const http = require('http');

function fetch(url, maxRedirects = 5) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        protocol.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && maxRedirects > 0) {
                let redirectUrl = res.headers.location;
                if (redirectUrl.startsWith('/')) {
                    const u = new URL(url);
                    redirectUrl = u.origin + redirectUrl;
                }
                return fetch(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ url, finalUrl: url, statusCode: res.statusCode, headers: res.headers, body: data }));
        }).on('error', reject);
    });
}

function extractSchemas(html) {
    const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
    return blocks.map(block => {
        try {
            const jsonStr = block.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
            return JSON.parse(jsonStr);
        } catch(e) { return null; }
    }).filter(Boolean);
}

function extractMeta(html) {
    const result = {};
    const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
    result.canonical = canon ? canon[1] : null;
    const ms = html.match(/name="msvalidate\.01" content="([^"]+)"/);
    result.bingWMT = ms ? ms[1] : null;
    const gsc = html.match(/name="google-site-verification" content="([^"]+)"/);
    result.gscVerification = gsc ? gsc[1] : null;
    const title = html.match(/<title>([^<]+)<\/title>/);
    result.title = title ? title[1] : null;
    const desc = html.match(/<meta name="description" content="([^"]+)"/);
    result.description = desc ? desc[1] : null;
    const hreflang = html.match(/hreflang="([^"]+)"/g);
    result.hreflang = hreflang ? hreflang.map(h => h.replace(/hreflang="([^"]+)"/, '$1')) : [];
    const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/);
    result.ogTitle = ogTitle ? ogTitle[1] : null;
    const ogDesc = html.match(/<meta property="og:description" content="([^"]+)"/);
    result.ogDescription = ogDesc ? ogDesc[1] : null;
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/);
    result.ogImage = ogImage ? ogImage[1] : null;
    const robots = html.match(/<meta name="robots" content="([^"]+)"/);
    result.robots = robots ? robots[1] : null;
    return result;
}

async function diagnostic() {
    console.log('=== COMPREHENSIVE LIVE SEO DIAGNOSTIC ===\n');

    // 1. Sitemap index check
    console.log('=== 1. SITEMAP INDEX CHECK ===');
    try {
        const res = await fetch('https://insurancesupport.online/sitemap-index.xml');
        console.log('sitemap-index.xml status: ' + res.statusCode);
        if (res.body.includes('<sitemapindex')) {
            const sitemaps = res.body.match(/<loc>([^<]+)<\/loc>/g) || [];
            console.log('Sitemaps in index: ' + sitemaps.length);
            sitemaps.forEach(s => console.log('  - ' + s.replace(/<\/?loc>/g, '')));
        } else {
            console.log('NOT a valid sitemap index');
        }
    } catch(e) { console.log('Error: ' + e.message); }

    // 2. Robots.txt check
    console.log('\n=== 2. ROBOTS.TXT ===');
    try {
        const res = await fetch('https://insurancesupport.online/robots.txt');
        const lines = res.body.split('\n');
        const sitemapLine = lines.find(l => l.toLowerCase().startsWith('sitemap'));
        console.log('Sitemap directive: ' + (sitemapLine || 'MISSING'));
        const disallowAll = lines.some(l => l.toLowerCase().includes('disallow: /'));
        console.log('Disallow / found: ' + (disallowAll ? 'PROBLEM!' : 'NO (OK)'));
        const aiBots = lines.filter(l => l.includes('User-agent:')).length;
        console.log('User-agent rules: ' + aiBots);
    } catch(e) { console.log('Error: ' + e.message); }

    // 3. Homepage deep check
    console.log('\n=== 3. HOMEPAGE DEEP CHECK ===');
    try {
        const res = await fetch('https://insurancesupport.online/');
        const meta = extractMeta(res.body);
        const schemas = extractSchemas(res.body);
        console.log('Canonical: ' + (meta.canonical || 'NOT FOUND'));
        console.log('Title: ' + (meta.title || 'NOT FOUND'));
        console.log('Description: ' + (meta.description || 'MISSING'));
        console.log('OG Title: ' + (meta.ogTitle || 'MISSING'));
        console.log('OG Description: ' + (meta.ogDescription || 'MISSING'));
        console.log('OG Image: ' + (meta.ogImage || 'MISSING'));
        console.log('Hreflang: ' + (meta.hreflang.length ? meta.hreflang.join(', ') : 'MISSING'));
        console.log('Robots meta: ' + (meta.robots || 'none set'));
        console.log('Bing WMT: ' + (meta.bingWMT || 'MISSING'));
        console.log('GSC: ' + (meta.gscVerification || 'MISSING'));
        console.log('Schema types: ' + schemas.map(s => s['@type']).join(', '));
        
        schemas.forEach(s => {
            if (s['@type'] === 'LocalBusiness') {
                console.log('  LocalBusiness name: ' + (s.name || 'MISSING'));
                console.log('  LocalBusiness address: ' + (s.address ? s.address.addressLocality + ', ' + s.address.addressRegion : 'MISSING'));
                console.log('  LocalBusiness geo: ' + (s.geo ? s.geo.latitude + ',' + s.geo.longitude : 'MISSING'));
                console.log('  LocalBusiness rating: ' + (s.aggregateRating ? s.aggregateRating.ratingValue + '/5 (' + s.aggregateRating.reviewCount + ' reviews)' : 'MISSING'));
                console.log('  LocalBusiness phone: ' + (s.telephone || 'MISSING'));
                console.log('  LocalBusiness openingHours: ' + (s.openingHoursSpecification ? 'SET' : 'MISSING'));
                console.log('  LocalBusiness sameAs: ' + (s.sameAs ? s.sameAs.join(', ') : 'MISSING'));
                console.log('  LocalBusiness reviews count: ' + (s.review ? s.review.length : 0));
            }
            if (s['@type'] === 'Organization') {
                console.log('  Organization name: ' + (s.name || 'MISSING'));
                console.log('  Organization url: ' + (s.url || 'MISSING'));
                console.log('  Organization logo: ' + (s.logo ? 'SET' : 'MISSING'));
                console.log('  Organization contactPoint: ' + (s.contactPoint ? 'SET' : 'MISSING'));
            }
        });
    } catch(e) { console.log('Error: ' + e.message); }

    // 4. Blog post deep check (with trailing slash)
    console.log('\n=== 4. BLOG POSTS DEEP CHECK (sample) ===');
    const blogSlugs = [
        'how-to-revive-a-lapsed-lic-policy-in-india-2026-complete-step-by-step-guide',
        'health-insurance-claim-rejection-15-real-reasons-how-to-prevent-appeal-each-one-2026',
        'how-to-appeal-rejected-insurance-claim-india-2026'
    ];
    for (const slug of blogSlugs) {
        try {
            const url = 'https://insurancesupport.online/blog/' + slug + '/';
            const res = await fetch(url);
            const meta = extractMeta(res.body);
            const schemas = extractSchemas(res.body);
            console.log('\n--- Blog: /blog/' + slug + ' ---');
            console.log('  Status: ' + res.statusCode);
            console.log('  Canonical: ' + (meta.canonical || 'NOT FOUND'));
            console.log('  Title: ' + (meta.title || 'NOT FOUND'));
            console.log('  Robots: ' + (meta.robots || 'none set'));
            console.log('  Schema types: ' + schemas.map(s => s['@type']).join(', '));
            
            const article = schemas.find(s => s['@type'] === 'Article');
            if (article) {
                console.log('  Article datePublished: ' + (article.datePublished || 'MISSING'));
                console.log('  Article dateModified: ' + (article.dateModified || 'MISSING'));
                console.log('  Article author: ' + (article.author ? (article.author.name || article.author) : 'MISSING'));
                console.log('  Article mainEntityOfPage: ' + (article.mainEntityOfPage ? article.mainEntityOfPage['@id'] : 'MISSING'));
                console.log('  Article publisher: ' + (article.publisher ? article.publisher.name : 'MISSING'));
            }
        } catch(e) { console.log('  Error: ' + e.message); }
    }

    // 5. Location page deep check
    console.log('\n=== 5. LOCATION PAGE DEEP CHECK ===');
    try {
        const url = 'https://insurancesupport.online/locations/bangalore-koramangala/';
        const res = await fetch(url);
        const meta = extractMeta(res.body);
        const schemas = extractSchemas(res.body);
        console.log('Status: ' + res.statusCode);
        console.log('Canonical: ' + (meta.canonical || 'NOT FOUND'));
        console.log('Title: ' + (meta.title || 'NOT FOUND'));
        console.log('Schema types: ' + schemas.map(s => s['@type']).join(', '));
        
        const localBiz = schemas.find(s => s['@type'] === 'LocalBusiness');
        if (localBiz) {
            console.log('  LocalBusiness name: ' + (localBiz.name || 'MISSING'));
            console.log('  LocalBusiness geo: ' + (localBiz.geo ? localBiz.geo.latitude + ',' + localBiz.geo.longitude : 'MISSING'));
            console.log('  LocalBusiness rating: ' + (localBiz.aggregateRating ? 'SET' : 'MISSING'));
            console.log('  LocalBusiness parentOrg: ' + (localBiz.parentOrganization ? 'SET' : 'MISSING'));
        }
        const place = schemas.find(s => s['@type'] === 'Place');
        if (place) {
            console.log('  Place name: ' + (place.name || 'MISSING'));
            console.log('  Place containedInPlace: ' + (place.containedInPlace ? place.containedInPlace.name : 'MISSING'));
        }
    } catch(e) { console.log('Error: ' + e.message); }

    // 6. Service page deep check
    console.log('\n=== 6. SERVICE PAGE DEEP CHECK ===');
    try {
        const url = 'https://insurancesupport.online/services/health-insurance/';
        const res = await fetch(url);
        const meta = extractMeta(res.body);
        const schemas = extractSchemas(res.body);
        console.log('Status: ' + res.statusCode);
        console.log('Canonical: ' + (meta.canonical || 'NOT FOUND'));
        console.log('Title: ' + (meta.title || 'NOT FOUND'));
        console.log('Schema types: ' + schemas.map(s => s['@type']).join(', '));
    } catch(e) { console.log('Error: ' + e.message); }

    // 7. Check for 404 pages
    console.log('\n=== 7. HTTP STATUS CHECK FOR CRITICAL PAGES ===');
    const criticalUrls = [
        '/',
        '/about/',
        '/blog/',
        '/contact/',
        '/disclaimer/',
        '/terms/',
        '/privacy-policy/',
        '/lead-magnets/claim-checklist/',
        '/locations/',
        '/services/',
        '/cities/',
        '/resources/',
        '/expert-insights/'
    ];
    for (const path of criticalUrls) {
        try {
            const res = await fetch('https://insurancesupport.online' + path);
            console.log('  ' + res.statusCode + ' ' + path);
        } catch(e) { console.log('  ERROR ' + path + ': ' + e.message); }
    }

    // 8. Check llms.txt
    console.log('\n=== 8. LLMs.txt CHECK ===');
    try {
        const res = await fetch('https://insurancesupport.online/llms.txt');
        console.log('Status: ' + res.statusCode);
        if (res.statusCode === 200) {
            console.log('First 500 chars:\n' + res.body.substring(0, 500));
        }
    } catch(e) { console.log('Error: ' + e.message); }

    // 9. Check OG images
    console.log('\n=== 9. OG IMAGE CHECK ===');
    try {
        const res = await fetch('https://insurancesupport.online/og-image.png');
        console.log('og-image.png status: ' + res.statusCode);
        console.log('Content-Type: ' + (res.headers['content-type'] || 'unknown'));
    } catch(e) { console.log('Error: ' + e.message); }

    // 10. Sitemap-index vs sitemap.xml consistency
    console.log('\n=== 10. SITEMAP CONSISTENCY CHECK ===');
    try {
        const sitemapRes = await fetch('https://insurancesupport.online/sitemap.xml');
        const sitemapIdxRes = await fetch('https://insurancesupport.online/sitemap-index.xml');
        const sitemapUrls = (sitemapRes.body.match(/<url><loc>/g) || []).length;
        const idxSitemaps = (sitemapIdxRes.body.match(/<sitemap>/g) || []).length;
        console.log('sitemap.xml URLs: ' + sitemapUrls);
        console.log('sitemap-index.xml sitemaps: ' + idxSitemaps);
        console.log('robots.txt points to: sitemap-index.xml');
        console.log('Serving sitemap.xml as: ' + sitemapUrls + ' URLs');
    } catch(e) { console.log('Error: ' + e.message); }

    console.log('\n=== DIAGNOSTIC COMPLETE ===');
}

diagnostic().catch(console.error);
