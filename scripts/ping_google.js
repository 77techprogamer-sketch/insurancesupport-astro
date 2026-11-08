#!/usr/bin/env node
import https from 'https';
const sitemapUrl = encodeURIComponent('https://insurancesupport.online/sitemap.xml');
https.get(`https://www.google.com/ping?sitemap=${sitemapUrl}`, (res) => {
  console.log(`Google ping response: ${res.statusCode}`);
}).on('error', (e) => {
  console.error('Google ping error:', e);
});
