import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://insurancesupport.online',
  output: 'static',
  // adapter: node({ mode: 'standalone' }), // not needed for static
  integrations: [
    react(),
    // sitemap(),
    tailwind(),
  ],
  vite: {
    build: {
      cssCodeSplit: false,
    },
  },
  security: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://www.googleadservices.com https://syndicatedsearch.goog",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.googleadservices.com https://www.google.com https://www.gstatic.com",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
        "frame-src 'self' https://www.youtube.com https://www.google.com https://pagead2.googlesyndication.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
      ].join('; '),
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  },
});
