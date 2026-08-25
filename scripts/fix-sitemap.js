#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const indexNowKeyPath = path.join(distDir, '71a80a3568ae5d1d945fda3ef57fe18e.txt');
const indexNowTxtPath = path.join(distDir, '71a80a3568ae5d1d945fda3ef57fe18e.txt');

console.log('=== DEBUGGING SITEMAP ISSUE ===');

// 1. Check if sitemap.xml exists and contains URLs
try {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const urls = sitemapContent.match(/<url>.*?<\/url>/g) || [];
    console.log(`Sitemap contains ${urls.length} URLs`);
    
    // Show first 5 URLs
    if (urls.length > 0) {
        console.log('First 5 URLs:');
        urls.slice(0, 5).forEach((url, i) => {
            const clean = url.replace(/<\/?(url|loc)>/g, '').trim();
            console.log(`${i+1}. ${clean}`);
        });
    }
} catch (e) {
    console.error('Error reading sitemap.xml:', e.message);
}

// 2. Check if IndexNow key file exists
try {
    const keyExists = fs.existsSync(indexNowKeyPath);
    const txtExists = fs.existsSync(indexNowTxtPath);
    console.log(`IndexNow key file exists: ${keyExists}`);
    console.log(`IndexNow txt file exists: ${txtExists}`);
    
    if (keyExists && txtExists) {
        const keyContent = fs.readFileSync(indexNowKeyPath, 'utf-8');
        const txtContent = fs.readFileSync(indexNowTxtPath, 'utf-8');
        console.log('IndexNow key content sample:', keyContent.substring(0, 100));
        console.log('IndexNow txt content sample:', txtContent.substring(0, 100));
    }
} catch (e) {
    console.error('Error checking IndexNow files:', e.message);
}

// 3. Check if sitemap.xml is actually being used by any service
console.log('=== Checking if sitemap.xml is referenced anywhere ===');
const siteFiles = glob.sync(path.join(distDir, '**/*')).filter(f => 
    f.endsWith('.html') || f.endsWith('.php') || f.endsWith('.aspx') || 
    f.endsWith('.aspx') || f.endsWith('.aspx') || f.endsWith('.html')
);

for (const file of siteFiles) {
    try {
        const content = fs.readFileSync(file, 'utf-8');
        if (content.includes('sitemap.xml') || content.includes('sitemap_index.xml')) {
            console.log(`Found sitemap reference in: ${file}`);
        }
    } catch (e) {
        // File might not exist or be unreadable
    }
}