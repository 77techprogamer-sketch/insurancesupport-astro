import { promises as fs } from 'node:fs';
import path from 'node:path';
import { SitemapStream, streamToPromise, SitemapIndexStream } from 'sitemap';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemaps() {
    const siteUrl = 'https://insurancesupport.online';
    const distPath = path.join(__dirname, '../dist');
    const sitemapsDir = path.join(distPath, 'sitemaps');
    await fs.mkdir(sitemapsDir, { recursive: true });

    const allLinks = [];

    // Each page's own og:image, collected during the walk below. The image
    // sitemap is built from these rather than maintained by hand, so it always
    // matches what the pages actually declare. Google requires <loc> to be the
    // URL of the PAGE the image appears on — not the image, and not a
    // directory — which the previous hand-written file got wrong.
    const imageLinks = [];

    // Sitemaps should contain only pages that identify themselves as
    // indexable and canonical. This also catches future noindex pages without
    // needing to maintain a separate URL-pattern exclusion for each one.
    function isIndexableCanonical(html, urlPath) {
        const robotsMeta = html.match(/<meta\b[^>]*\bname=["'](?:robots|googlebot)["'][^>]*\bcontent=["']([^"']*)["'][^>]*>/i);
        if (robotsMeta && /\bnoindex\b/i.test(robotsMeta[1])) return false;

        const canonicalMeta = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["'][^>]*>/i);
        if (!canonicalMeta) return false;

        try {
            const canonical = new URL(canonicalMeta[1], siteUrl);
            const candidate = new URL(urlPath, siteUrl);
            const normalizePath = (pathname) => pathname.endsWith('/') ? pathname : `${pathname}/`;
            return canonical.origin === siteUrl &&
                !canonical.search &&
                !canonical.hash &&
                normalizePath(canonical.pathname) === normalizePath(candidate.pathname);
        } catch {
            return false;
        }
    }

    // Recursively find all HTML files in the dist directory
    async function getHtmlFiles(dir) {
        const dirents = await fs.readdir(dir, { withFileTypes: true });
        for (const dirent of dirents) {
            const res = path.resolve(dir, dirent.name);
            if (dirent.isDirectory()) {
                await getHtmlFiles(res);
            } else if (dirent.isFile() && dirent.name.endsWith('.html')) {
                let urlPath = path.relative(distPath, res).replace(/\\/g, '/');
                urlPath = urlPath.replace(/\/?index\.html$/, '');
                urlPath = urlPath.replace(/\.html$/, '');

                const html = await fs.readFile(res, 'utf8');
                // Build output mtimes reflect build time, not editorial changes.
                // Only publish lastmod when the page provides an honest content date.
                const modifiedMeta = html.match(/<meta\b[^>]*\bproperty=["']article:modified_time["'][^>]*\bcontent=["']([^"']+)["'][^>]*>/i);
                const modifiedSchema = html.match(/"dateModified"\s*:\s*"([^"']+)"/i);
                const lastmodCandidate = modifiedMeta?.[1] || modifiedSchema?.[1];
                const parsedLastmod = lastmodCandidate ? new Date(lastmodCandidate) : null;
                const lastmod = parsedLastmod && !Number.isNaN(parsedLastmod.getTime())
                    ? parsedLastmod.toISOString()
                    : undefined;

                const url = `/${urlPath}`;
                if (isIndexableCanonical(html, url)) {
                    allLinks.push({ url, lastmod });

                    const ogImage = html.match(/<meta\b[^>]*\bproperty=["']og:image["'][^>]*\bcontent=["']([^"']+)["'][^>]*>/i);
                    if (ogImage?.[1]) {
                        const ogTitleMeta = html.match(/<meta\b[^>]*\bproperty=["']og:title["'][^>]*\bcontent=["']([^"']+)["'][^>]*>/i);
                        imageLinks.push({
                            url,
                            image: new URL(ogImage[1], siteUrl).href,
                            title: ogTitleMeta?.[1] || '',
                        });
                    }
                }
            }
        }
    }

    await getHtmlFiles(distPath);

    // Deduplicate by URL while keeping lastmod from the most recent file
    const linkMap = new Map();
    for (const link of allLinks) {
        if (linkMap.has(link.url)) {
            const existing = linkMap.get(link.url);
            if (link.lastmod && (!existing.lastmod || link.lastmod > existing.lastmod)) linkMap.set(link.url, link);
        } else {
            linkMap.set(link.url, link);
        }
    }

    const uniqueLinks = Array.from(linkMap.values())
        .filter(link => !link.url.includes('/test'))
        .filter(link => !link.url.includes('/404'))
        .filter(link => !link.url.includes('fbed68329c17dcd9'))
        .filter(link => !link.url.includes('/robots.txt'))
        .filter(link => !link.url.includes('/_headers'))
        .filter(link => !link.url.includes('/_redirects'))
        .filter(link => link.url !== '/index')
        .filter(link => !link.url.includes('/api-docs'))
        .filter(link => !link.url.includes('/openapi.json'))
        .filter(link => !link.url.includes('/health.json'))
        .filter(link => !link.url.includes('/auth.md'))
        .filter(link => !link.url.includes('/search'))
        .filter(link => !/^\/blog\/[a-z]{2}-/.test(link.url)) // Exclude old dash-prefixed blog URLs (e.g. /blog/bn-foo)
        .filter(link => !link.url.includes('/lead-magnets/insurance-ombudsman-complaint/')) // 404 - wrong slug
        .filter(link => !link.url.includes('/blog/insurance-claim-rejected-here-s-your-complete-legal-practical-fight-back-guide-2026/')) // wrong slug (apostrophe encoded as here-s)
        .filter(link => !link.url.includes('/bn/insurance-claim-rejected-here-s-your-complete-legal-practical-fight-back-guide-2026/')); // 404 - bn prefix with wrong slug

    // Categorize links for individual sitemaps
    const categories = {
        core: [],
        blog: [],
        locations: [],
        services: [],
        cities: [],
        leadMagnets: [],
        caseStudies: [],
        compare: [],
        brand: [],
    };

    uniqueLinks.forEach(linkObj => {
        const url = linkObj.url;
        const finalUrl = url.endsWith('/') ? url : url + '/';
        const sitemapEntry = { url: finalUrl, changefreq: 'weekly', priority: 0.7, ...(linkObj.lastmod ? { lastmod: linkObj.lastmod } : {}) };

        if (url === '/' || url === '/about' || url === '/contact' || url === '/faq' ||
            url === '/resources' || url === '/expert-insights' || url === '/support' ||
            url === '/policy-review-checklist' || url === '/terms' || url === '/privacy-policy' ||
            url === '/disclaimer') {
            categories.core.push({ ...sitemapEntry, changefreq: url === '/' ? 'daily' : 'weekly', priority: url === '/' ? 1.0 : 0.7 });
        } else if (url.startsWith('/blog/')) {
            categories.blog.push({ ...sitemapEntry, priority: 0.8 });
        } else if (url.startsWith('/locations/')) {
            categories.locations.push(sitemapEntry);
        } else if (url.startsWith('/services/')) {
            categories.services.push(sitemapEntry);
        } else if (url.startsWith('/cities/')) {
            categories.cities.push(sitemapEntry);
        } else if (url.startsWith('/lead-magnets/')) {
            categories.leadMagnets.push(sitemapEntry);
        } else if (url.startsWith('/case-studies/')) {
            categories.caseStudies.push(sitemapEntry);
        } else if (url.startsWith('/compare/')) {
            categories.compare.push(sitemapEntry);
} else if (url.startsWith('/brand/')) {
            categories.brand.push({ ...sitemapEntry, priority: 0.8 });
        } else {
            // Fallback for uncategorized, add to core if it's likely a page
            // Or create a "misc" category if many exist
            if (!path.extname(url)) { // If it doesn't have an extension, assume it's a page
                categories.core.push(sitemapEntry);
            }
        }
    });

    const sitemapIndexLinks = [];

    for (const category in categories) {
        if (categories[category].length > 0) {
            const sitemapCategoryPath = path.join(sitemapsDir, `${category}-sitemap.xml`);
            const sitemapStream = new SitemapStream({ hostname: siteUrl });
            categories[category].forEach(link => sitemapStream.write(link));
            sitemapStream.end();
            const sitemapBuffer = await streamToPromise(sitemapStream);
            await fs.writeFile(sitemapCategoryPath, sitemapBuffer.toString());
            console.log('Category counts:', {
      core: categories.core.length,
      blog: categories.blog.length,
      locations: categories.locations.length,
      services: categories.services.length,
      cities: categories.cities.length,
      leadMagnets: categories.leadMagnets.length,
      caseStudies: categories.caseStudies.length,
      compare: categories.compare.length,
      brand: categories.brand.length,
    });

    // Only warn if a strong intent category is unexpectedly empty after final dedup.
    const expectedRichCategories = ['leadMagnets', 'caseStudies', 'compare', 'brand'];
    const richCategoryOk = expectedRichCategories.some(cat => categories[cat] && categories[cat].length > 0);
    if (!richCategoryOk) {
      console.warn('WARN: no intent-rich pages landed in lead magnets / case studies / compare / brand sitemaps after dedup.');
    }
            sitemapIndexLinks.push({ url: `${siteUrl}/sitemaps/${category}-sitemap.xml`, lastmod: new Date().toISOString() });
        }
    }

    // Image sitemap — one <url> per page, listing that page's og:image.
    // Restricted to pages that survived the indexable/canonical filters above,
    // so we never point Google at an image on a page we told it not to index.
    const indexablePages = new Set(uniqueLinks.map(l => (l.url.endsWith('/') ? l.url : `${l.url}/`)));
    const imagesByPage = new Map();
    // Only advertise images the build actually emitted. Many translated pages
    // declare an og:image that was never generated; listing those would point
    // Google at 404s and waste the crawl budget it gives the file.
    const imageFileExists = async (href) => {
        if (!href.startsWith(siteUrl)) return false;
        const rel = href.slice(siteUrl.length).split('?')[0].split('#')[0];
        try {
            const stat = await fs.stat(path.join(distPath, rel));
            return stat.isFile();
        } catch {
            return false;
        }
    };

    let skippedImages = 0;
    for (const entry of imageLinks) {
        const page = entry.url.endsWith('/') ? entry.url : `${entry.url}/`;
        if (!indexablePages.has(page)) continue;
        if (!(await imageFileExists(entry.image))) {
            skippedImages += 1;
            continue;
        }
        if (!imagesByPage.has(page)) imagesByPage.set(page, []);
        imagesByPage.get(page).push(entry);
    }

    if (imagesByPage.size > 0) {
        const esc = (s) => String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
        xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
        for (const [page, images] of imagesByPage) {
            xml += '  <url>\n';
            xml += `    <loc>${esc(siteUrl + page)}</loc>\n`;
            for (const img of images) {
                xml += '    <image:image>\n';
                xml += `      <image:loc>${esc(img.image)}</image:loc>\n`;
                if (img.title) xml += `      <image:title>${esc(img.title)}</image:title>\n`;
                xml += '    </image:image>\n';
            }
            xml += '  </url>\n';
        }
        xml += '</urlset>\n';

        const imagesPath = path.join(sitemapsDir, 'images-sitemap.xml');
        await fs.writeFile(imagesPath, xml);
        const imageCount = Array.from(imagesByPage.values()).reduce((n, list) => n + list.length, 0);
        console.log(`Images sitemap generated at ${imagesPath} with ${imagesByPage.size} pages and ${imageCount} images (${skippedImages} og:image references had no file and were skipped).`);
        sitemapIndexLinks.push({ url: `${siteUrl}/sitemaps/images-sitemap.xml`, lastmod: new Date().toISOString() });
    }

    // Generate sitemap-index.xml
    const sitemapIndexStream = new SitemapIndexStream({ hostname: siteUrl });
    sitemapIndexLinks.forEach(link => sitemapIndexStream.write(link));
    sitemapIndexStream.end();

    const sitemapIndexBuffer = await streamToPromise(sitemapIndexStream);
    await fs.writeFile(path.join(distPath, 'sitemap-index.xml'), sitemapIndexBuffer.toString());
    console.log(`Sitemap index generated at ${path.join(distPath, 'sitemap-index.xml')} with ${sitemapIndexLinks.length} sitemaps.`);

    // Generate root sitemap.xml as a sitemap index pointing to segmented sitemaps
    // This replaces the old approach of deleting sitemap.xml, ensuring /sitemap.xml always works
    const rootSitemapStream = new SitemapIndexStream({ hostname: siteUrl });
    sitemapIndexLinks.forEach(link => rootSitemapStream.write(link));
    rootSitemapStream.end();
    const rootSitemapBuffer = await streamToPromise(rootSitemapStream);
    await fs.writeFile(path.join(distPath, 'sitemap.xml'), rootSitemapBuffer.toString());
    console.log(`Root sitemap.xml generated at ${path.join(distPath, 'sitemap.xml')} with ${sitemapIndexLinks.length} sitemaps.`);
}

generateSitemaps().catch(console.error);