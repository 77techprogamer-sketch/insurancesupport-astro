import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
// @astrojs/sitemap removed — using custom generate-sitemap.js in postbuild instead

export default defineConfig({
  site: 'https://insurancesupport.online',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    react(),
    tailwind(),
  ],
  vite: {
    build: {
      cssCodeSplit: false,
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  security: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://clarity.ms https://www.google.com https://app.artibot.ai https://*.artibot.ai",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://app.artibot.ai https://*.artibot.ai",
        "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.artibot.ai",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://www.clarity.ms https://*.artibot.ai",
        "frame-src 'self' https://www.youtube.com https://www.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
      ].join('; '),
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    },
  },
});
