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
  // Session recording is heavy and nobody needs it before they have interacted,
  // so it is deferred to first interaction, or 8s of idle after load, whichever
  // comes first. Queries are queued by the stub and replayed by clarity.js.
  window.clarity = window.clarity || function () {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };
  (function () {
    var loaded = false;
    function start() {
      if (loaded) return;
      loaded = true;
      loadScript('https://www.clarity.ms/tag/' + 'v9dto5m10l');
      removeListeners();
    }
    function removeListeners() {
      ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (evt) {
        window.removeEventListener(evt, start, { passive: true });
      });
    }
    ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (evt) {
      window.addEventListener(evt, start, { passive: true, once: true });
    });
    if (document.readyState === 'complete') { setTimeout(start, 8000); }
    else { window.addEventListener('load', function () { setTimeout(start, 8000); }); }
  })();

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

  // ---- Contact intent events ---------------------------------------------
  // Until now the site counted form conversions only. A phone call or a
  // WhatsApp message — which is how most of these enquiries actually arrive —
  // left no trace in GA4 at all, so "how many people called" could not be
  // answered even in principle. One delegated listener covers every page.
  //
  // Events: call_click, whatsapp_click. The page path is attached by GA4
  // automatically; the link's visible text is sent as the label so it is clear
  // which button on which part of the page produced the call.
  (function () {
    if (!document.addEventListener) return;

    function label(el) {
      var text = (el.textContent || '').replace(/\s+/g, ' ').trim();
      return text.slice(0, 80) || el.getAttribute('aria-label') || 'unknown';
    }

    document.addEventListener('click', function (event) {
      var el = event.target;
      while (el && el.tagName !== 'A') el = el.parentElement;
      if (!el || !el.getAttribute) return;

      var href = el.getAttribute('href') || '';
      var name = null;

      if (href.indexOf('tel:') === 0) name = 'call_click';
      else if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1) name = 'whatsapp_click';
      else if (href.indexOf('mailto:') === 0) name = 'email_click';

      if (!name || typeof window.gtag !== 'function') return;

      window.gtag('event', name, {
        event_category: 'contact',
        event_label: label(el),
        link_url: href
      });
    }, { passive: true });
  })();
})();
