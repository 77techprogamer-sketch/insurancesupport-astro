const https = require('https');
const fs = require('fs');

async function fetch(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
        }).on('error', reject);
    });
}

async function diagnostic() {
    console.log('=== LIVE SEO DIAGNOSTIC FOR insurancesupport.online ===\n');

    // 1. Check robots.txt
    console.log('1. ROBOTS.TXT');
    try {
        const res = await fetch('https://insurancesupport.online/robots.txt');
        const lines = res.body.split('\n');
        lines.forEach(l => console.log('   ' + l.trim()));
        const hasSitemap = lines.some(l => l.toLowerCase().includes('sitemap'));
        console.log('   Has sitemap reference: ' + (hasSitemap ? 'YES' : 'NO'));
    } catch(e) { console.log('   Error: ' + e.message); }

    // 2. Check sitemap.xml count
    console.log('\n2. SITEMAP.XML');
    try {
        const res = await fetch('https://insurancesupport.online/sitemap.xml');
        const urlCount = (res.body.match(/<url><loc>/g) || []).length;
        const locs = res.body.match(/<loc>([^<]+)<\/loc>/g) || [];
        const types = {};
        locs.forEach(l => {
            const clean = l.replace(/[<>]\/loc>/g, '').replace('https://insurancesupport.online', '');
            const type = clean.split('/')[1] || 'root';
            types[type] = (types[type] || 0) + 1;
        });
        console.log('   Total URLs in sitemap: ' + urlCount);
        console.log('   URL types:', JSON.stringify(types));
    } catch(e) { console.log('   Error: ' + e.message); }

    // 3. IndexNow key check
    console.log('\n3. INDEXNOW KEY VERIFICATION');
    try {
        const res = await fetch('https://insurancesupport.online/71a80a3568ae5d1d945fda3ef57fe18e.txt');
        console.log('   Status: ' + res.statusCode);
        console.log('   Content: ' + res.body.trim().substring(0, 100));
    } catch(e) { console.log('   Error: ' + e.message); }

    // 4. Homepage checks
    console.log('\n4. HOMEPAGE VERIFICATION');
    try {
        const res = await fetch('https://insurancesupport.online/');
        const html = res.body;
        const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
        console.log('   Canonical: ' + (canon ? canon[1] : 'NOT FOUND'));
        const ms = html.match(/name="msvalidate\.01" content="([^"]+)"/);
        console.log('   Bing WMT meta: ' + (ms ? ms[1] : 'NOT FOUND'));
        const gsc = html.match(/name="google-site-verification" content="([^"]+)"/);
        console.log('   GSC meta: ' + (gsc ? gsc[1] : 'NOT FOUND'));
        const ldjsonMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
        console.log('   JSON-LD blocks: ' + ldjsonMatches.length);
        ldjsonMatches.forEach((block, i) => {
            const match = block.match(/"@type"\s*:\s*"([^"]+)"/);
            console.log('   - Schema type: ' + (match ? match[1] : 'unknown'));
        });
    } catch(e) { console.log('   Error: ' + e.message); }

    // 5. Blog post checks
    console.log('\n5. BLOG POST VERIFICATION (sample)');
    try {
        const urls = [
            'https://insurancesupport.online/blog/how-to-revive-a-lapsed-lic-policy-in-india-2026-complete-step-by-step-guide',
            'https://insurancesupport.online/blog/health-insurance-claim-rejection-15-real-reasons-how-to-prevent-appeal-each-one-2026',
            'https://insurancesupport.online/locations/bangalore-koramangala',
            'https://insurancesupport.online/services/health-insurance'
        ];
        
        for (const url of urls) {
            const res = await fetch(url);
            const html = res.body;
            const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
            const ldjsonMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
            console.log('   URL: ' + url.replace('https://insurancesupport.online', ''));
            console.log('   Canonical: ' + (canon ? canon[1] : 'NOT FOUND'));
            const schemaTypes = [];
            ldjsonMatches.forEach(block => {
                const m = block.match(/"@type"\s*:\s*"([^"]+)"/);
                if (m) schemaTypes.push(m[1]);
            });
            console.log('   Schema types: ' + schemaTypes.join(', '));
            
            const articleBlock = ldjsonMatches.find(b => b.includes('"Article"'));
            if (articleBlock) {
                try {
                    const jsonStr = articleBlock.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
                    const parsed = JSON.parse(jsonStr);
                    console.log('   datePublished: ' + (parsed.datePublished || 'MISSING'));
                    console.log('   dateModified: ' + (parsed.dateModified || 'MISSING'));
                    console.log('   mainEntityOfPage @id: ' + (parsed.mainEntityOfPage && parsed.mainEntityOfPage['@id'] ? parsed.mainEntityOfPage['@id'] : 'MISSING'));
                } catch(e) {
                    console.log('   Parse error: ' + e.message);
                }
            }
            console.log('');
        }
    } catch(e) { console.log('   Error: ' + e.message); }

    // 6. Check for 404s on critical URLs
    console.log('\n6. CRITICAL URL STATUS CHECKS');
    try {
        const criticalUrls = [
            'https://insurancesupport.online/',
            'https://insurancesupport.online/about',
            'https://insurancesupport.online/blog',
            'https://insurancesupport.online/contact',
            'https://insurancesupport.online/disclaimer',
            'https://insurancesupport.online/terms',
            'https://insurancesupport.online/privacy-policy',
            'https://insurancesupport.online/lead-magnets/claim-checklist'
        ];
        for (const url of criticalUrls) {
            const res = await fetch(url);
            console.log('   ' + res.statusCode + ' ' + url.replace('https://insurancesupport.online', ''));
        }
    } catch(e) { console.log('   Error: ' + e.message); }

    console.log('\n=== DIAGNOSTIC COMPLETE ===');
}

diagnostic().catch(console.error);
