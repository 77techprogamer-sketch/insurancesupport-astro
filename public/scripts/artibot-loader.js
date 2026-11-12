/*
 * ArtiBot chatbot loader (CSP-safe).
 * Replaces the inline <script> that used to live in Chatbot.astro; the
 * production CSP (public/_headers) blocks inline scripts, and script-src
 * already whitelists https://app.artibot.ai for the loader itself.
 */
/*
 * The widget is deferred until the visitor shows intent (first scroll, tap,
 * key press) or 10 seconds after load, so the third-party bundle never competes
 * with first paint. The API stub is installed immediately, so any page code
 * that calls window.artibotApi.trigger() before load is still queued.
 */
(function () {
  'use strict';

  window.artibotApi = window.artibotApi || {
    l: [], t: [],
    on: function () { this.l.push(arguments); },
    trigger: function () { this.t.push(arguments); }
  };

  var started = false;

  function boot() {
    if (started) return;
    started = true;
    ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (evt) {
      window.removeEventListener(evt, boot, { passive: true });
    });
!function (t, e) {
  t.artibotApi = t.artibotApi || {
    l: [],
    t: [],
    on: function () { this.l.push(arguments) },
    trigger: function () { this.t.push(arguments) }
  };
  var a = !1,
    i = e.createElement("script");
  i.async = !0,
    i.type = "text/javascript",
    i.src = "https://app.artibot.ai/loader.js",
    e.getElementsByTagName("head").item(0).appendChild(i),
    i.onreadystatechange = i.onload = function () {
      if (!(a || this.readyState && "loaded" != this.readyState && "complete" != this.readyState)) {
        new window.ArtiBot({ i: "9d77f751-1588-46f7-880e-3e5efd64f48e" });
        a = !0
      }
    }
}(window, document);
  }

  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (evt) {
    window.addEventListener(evt, boot, { passive: true, once: true });
  });
  if (document.readyState === 'complete') { setTimeout(boot, 10000); }
  else { window.addEventListener('load', function () { setTimeout(boot, 10000); }); }
})();
