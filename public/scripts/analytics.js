/*
 * Central analytics loader (CSP-safe).
 * Replaces the inline GA4 / Google Ads / GTM / Microsoft Clarity snippets that
 * used to live in BaseLayout.astro. The production Content-Security-Policy
 * (public/_headers) sets script-src without 'unsafe-inline', which blocks
 * inline <script> blocks and inline event handlers — so all analytics boot
 * logic lives here as an external file ('self' is allowed by the CSP).
 *
 * Everything below is a faithful port of the previous inline snippets.
 */
(function () {
  'use strict';

  var GTAG_JS = 'https://www.googletagmanager.com/gtag/js?id=';
  var HEAD = document.head || document.getElementsByTagName('head')[0];

  // ---- GA4 + Google Ads: dataLayer + gtag stub --------------------------
  // The stub must exist before gtag.js loads, and must stay on window so
  // components (contact.astro, LeadMagnetForm, LeadMagnetQuiz) can emit
  // gtag('event', ...) conversions later.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  window.gtag('js', new Date());
  window.gtag('config', 'G-JP67H399V2');

  // Google Ads Conversion Tracking
  window.gtag('js', new Date());
  window.gtag('config', 'AW-18269976114');

  // GA4 Conversion Event Configuration (ported verbatim)
  window.gtag('config', 'C_VUjrXbcHzNo', {
    'on': 'visible',
    'vars': {
      'event_name': 'conversion',
      'send_to': ['AW-18269976114/6yFgCKyx8uQcELLs5odE']
    }
  });

  function loadScript(src) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    HEAD.appendChild(s);
  }

  // gtag.js for GA4 and Google Ads (was two async <script src> tags)
  loadScript(GTAG_JS + 'G-JP67H399V2');
  loadScript(GTAG_JS + 'AW-18269976114');

  // ---- Google Tag Manager -------------------------------------------------
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  loadScript('https://www.googletagmanager.com/gtm.js?id=' + 'GTM-P8DZ6MRQ');

  // ---- Microsoft Clarity ---------------------------------------------------
  window.clarity = window.clarity || function () {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };
  loadScript('https://www.clarity.ms/tag/' + 'v9dto5m10l');

  // ---- Google Fonts stylesheet flip ---------------------------------------
  // BaseLayout loads the fonts stylesheet with media="print" for non-blocking
  // load; the inline onload= handler it used previously is blocked by the
  // CSP, so the swap to media="all" happens here once the sheet is loaded.
  var fontsCss = document.getElementById('google-fonts-css');
  if (fontsCss) {
    if (fontsCss.media !== 'all') {
      fontsCss.addEventListener('load', function () { fontsCss.media = 'all'; });
      // Safety net in case load fired before we attached the listener.
      fontsCss.media = 'all';
    }
  }
})();
