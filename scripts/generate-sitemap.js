import { promises as fs } from 'node:fs';
import path from 'node:path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
    const siteUrl = 'https://insurancesupport.online';
    const distPath = path.join(__dirname, '../dist');
    const sitemapPath = path.join(distPath, 'sitemap.xml');

    const links = [];

    // Recursively find all HTML files in the dist directory
    async function getHtmlFiles(dir) {
        const dirents = await fs.readdir(dir, { withFileTypes: true });
        for (const dirent of dirents) {
            const res = path.resolve(dir, dirent.name);
            if (dirent.isDirectory()) {
                await getHtmlFiles(res);
            } else if (dirent.isFile() && dirent.name.endsWith('.html')) {
                let urlPath = path.relative(distPath, res).replace(/\\/g, '/');
                // Remove /index.html and .html extension
                urlPath = urlPath.replace(/\/?index\.html$/, '');
                urlPath = urlPath.replace(/\.html$/, '');

                // Get file modification time for lastmod
                const stat = await fs.stat(res);
                const lastmod = stat.mtime.toISOString();

                links.push({ url: `/${urlPath}`, changefreq: 'weekly', priority: 0.7, lastmod });
            }
        }
    }

    await getHtmlFiles(distPath);

    // Filter out duplicate and unwanted URLs (e.g., test pages, non-content files)
    const uniqueLinks = Array.from(new Set(links.map(link => link.url)))
    .filter(url => !url.includes('/test'))
    .filter(url => !url.includes('/404'))
    .filter(url => !url.includes('fbed68329c17dcd9'))  // IndexNow verification file
    .filter(url => !url.includes('/robots.txt'))
    .filter(url => !url.includes('/_headers'))
    .filter(url => !url.includes('/_redirects'))
    .filter(url => url !== '/index');  // remove broken /index artifact

    // Convert to sitemap format with lastmod
    const sitemapLinks = uniqueLinks.map(url => ({
        url,
        changefreq: url === '/' ? 'daily' : 'weekly',
        priority: url === '/' ? 1.0 : (url.startsWith('/blog/') ? 0.8 : 0.7),
        lastmod: links.find(l => l.url === url)?.lastmod || new Date().toISOString()
    }));

    const stream = new SitemapStream({ hostname: siteUrl });

    sitemapLinks.forEach(link => stream.write(link));
    stream.end();

    const sitemapBuffer = await streamToPromise(stream);
    await fs.writeFile(sitemapPath, sitemapBuffer.toString());

    console.log(`Sitemap generated at ${sitemapPath}`);
}

generateSitemap().catch(console.error);
