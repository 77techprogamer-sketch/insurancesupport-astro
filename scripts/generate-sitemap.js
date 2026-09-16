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

                const stat = await fs.stat(res);
                const lastmod = stat.mtime.toISOString();

                allLinks.push({ url: `/${urlPath}`, lastmod });
            }
        }
    }

    await getHtmlFiles(distPath);

    // Deduplicate by URL while keeping lastmod from the most recent file
    const linkMap = new Map();
    for (const link of allLinks) {
        if (linkMap.has(link.url)) {
            const existing = linkMap.get(link.url);
            if (link.lastmod > existing.lastmod) linkMap.set(link.url, link);
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
            .filter(link => !/^\/blog\/[a-z]{2}-/.test(link.url)) // Exclude old dash-prefixed blog URLs (e.g. /blog/bn-foo)
            // Keep all other blog URLs (including /blog/hi/slug/ syntax)


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
    };

    uniqueLinks.forEach(linkObj => {
            const url = linkObj.url;
            const finalUrl = url.endsWith('/') ? url : url + '/';
        const sitemapEntry = { url: finalUrl, changefreq: 'weekly', priority: 0.7, lastmod: linkObj.lastmod };

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
        } else {
            // Fallback for uncategorized, add to core if it's likely a page
            // Or create a 'misc' category if many exist
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
    });
            sitemapIndexLinks.push({ url: `${siteUrl}/sitemaps/${category}-sitemap.xml`, lastmod: new Date().toISOString() });
        }
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
