# Security & Infrastructure Audit — insurancesupport.online

**Audit Date:** August 26, 2026  
**Project:** insurancesupport-astro (Astro + Cloudflare Pages)  
**Auditor:** Hermes Agent

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 HIGH | 2 |
| 🟠 MEDIUM | 5 |
| 🟡 LOW | 5 |
| **Total** | **12** |

---

## 🔴 HIGH SEVERITY

### H-01: CSP `script-src` uses `'unsafe-inline'`
- **Files:** `public/_headers` (line 45), `astro.config.mjs` (line 25)
- **Issue:** The Content Security Policy allows `'unsafe-inline'` for `script-src`, which **completely negates XSS protection**. Any injected `<script>` tag will execute freely.
- **Compounding factor:** The project includes inline scripts with `data-csp-hash` attributes (GA4, GTM, Clarity in `src/layouts/BaseLayout.astro` lines 128–153), suggesting Astro's built-in CSP nonce/hash system was intended but bypassed by `'unsafe-inline'`.
- **Fix:** Replace `'unsafe-inline'` with nonces or hashes. Astro can auto-generate `nonce` attributes for `<script>` tags. Alternatively, refactor inline scripts to external files loaded from a CDN-allowlisted origin.

### H-02: Critical vulnerabilities in `astro` and transitive dependencies
- **File:** `package.json`
- **Issue:** `npm audit` reports **9 vulnerabilities (4 moderate, 5 high)**. The most critical are in the `astro` package (`<=7.0.9`) itself:
  - Multiple XSS vectors (spread props, `define:vars`, slot names, View Transition directives, Server Islands)
  - Authentication bypass via double URL encoding (CVE-2025-64765)
  - Full-Read SSRF via `Host:` header injection
  - URL manipulation via headers bypassing middleware and CVE-2025-61925
  - Remote allowlist bypass via unanchored wildcard
  - Local File Read in dev server
- **Transitive vulnerabilities:** `esbuild <=0.24.2`, `js-yaml` (CVE-2026-59870), `nanoid <3.3.18`, `postcss <=8.5.22`, `sharp <0.35.0` (libvips CVEs)
- **Fix:** Run `npm audit fix --force` to upgrade to `astro@7.2.7` and all patched dependencies. This is a **breaking change** — test thoroughly before deploying.

---

## 🟠 MEDIUM SEVERITY

### M-01: Wildcard CORS on all form submission endpoints
- **Files:** `public/_headers` (lines 53–56), `functions/lead-capture.ts` (lines 194, 206), `functions/contact-submit.ts` (lines 132, 143), `functions/newsletter-signup.ts` (lines 82, 87), `functions/geo.ts` (line 82)
- **Issue:** `Access-Control-Allow-Origin: *` on POST endpoints that collect PII (name, email, phone). Any origin can make cross-origin requests to these endpoints.
- **Fix:** Restrict to `https://insurancesupport.online` only, or use a specific allowlist. The geo endpoint (GET-only) is lower risk but should also be restricted.

### M-02: In-memory rate limiting is ineffective at the edge
- **Files:** `functions/lead-capture.ts` (line 28), `functions/contact-submit.ts` (line 12), `functions/newsletter-signup.ts` (line 9)
- **Issue:** Rate limiting uses a `Map()` that lives in a single function instance's memory. Cloudflare Pages creates multiple instances, so an attacker can bypass limits by hitting different instances. Also resets on every deploy.
- **Fix:** Use Cloudflare's built-in [Rate Limiting Rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) or D1/KV-backed state for cross-instance rate tracking.

### M-03: robots.txt explicitly invites AI content scraping
- **File:** `public/robots.txt` (lines 4–42)
- **Issue:** Explicitly allows GPTBot, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, CCBot, Applebot-Extended, Amazonbot, meta-externalagent, cohere-ai, Gemini-Deep-Research, and YouBot to crawl the full site. This exposes all insurance advisory content to AI training datasets and competitor intelligence.
- **Fix:** Remove the explicit AI bot allowances, or add `X-Robots-Tag: noai` / `noimageai` headers for sensitive content pages. Consider whether AI visibility is intentional for SEO purposes.

### M-04: CSP duplicated and misaligned between `_headers` and `astro.config.mjs`
- **Files:** `public/_headers` (line 45), `astro.config.mjs` (lines 23–35)
- **Issue:** Two CSP definitions exist with different values:
  - `astro.config.mjs` includes `form-action 'self'` and `frame-ancestors 'none'` — **not present** in `_headers`
  - On Cloudflare Pages, the `_headers` file wins for HTML responses, meaning `form-action` and `frame-ancestors` protections are **silently dropped** in production.
- **Fix:** Consolidate to a single CSP definition. Prefer `astro.config.mjs` (includes stronger directives) and remove the duplicate from `_headers`, or ensure both are identical.

### M-05: PII logged to Cloudflare Workers Logs
- **Files:** `functions/lead-capture.ts` (line 137), `functions/contact-submit.ts` (line 93)
- **Issue:** `console.log()` dumps full lead records including name, email, phone, IP, and User-Agent to Cloudflare Workers Logs. This creates a PII data exposure in logging infrastructure.
- **Fix:** Remove or truncate PII from log statements. Log only the lead ID and type. If audit logging is needed, use structured logs with explicit PII redaction.

---

## 🟡 LOW SEVERITY

### L-01: IndexNow key hardcoded in source and public directory
- **Files:** `public/71a80a3568ae5d1d945fda3ef57fe18e.txt`, `scripts/indexnow-notify.js` (line 10), `public/robots.txt` (line 44)
- **Issue:** The IndexNow API key `71a80a3568ae5d1d945fda3ef57fe18e` is committed in plaintext in three locations. While IndexNow keys are meant to be public (for verification), the duplication increases the surface area for confusion.
- **Status:** This is by design for IndexNow, but should be documented.

### L-02: D1 database ID exposed in `wrangler.toml`
- **File:** `wrangler.toml` (line 9)
- **Issue:** The D1 database UUID `3c0e7605-0a8d-4bdb-a5db-be5da55d62cb` and binding name `LEADS_DB` are hardcoded in the repo. While not a secret, it reveals infrastructure details.
- **Status:** Acceptable for public repos if the DB has proper access controls. Ensure no read/write access is granted to the D1 API without authentication.

### L-03: Deprecated `X-XSS-Protection` header
- **File:** `public/_headers` (line 41)
- **Issue:** `X-XSS-Protection: 1; mode=block` is deprecated by modern browsers and can introduce vulnerabilities in older browsers (e.g., content injection via the XSS auditor itself).
- **Fix:** Remove this header. The CSP policy (if properly implemented) is the correct XSS defense.

### L-04: Search engine verification tokens in public files
- **Files:** `public/551FF3A8CD7B8225D53FAB718B3051E2.txt`, `public/f0095d07c9b09f609c31b09eaa495920.txt`, `src/layouts/BaseLayout.astro` (lines 114–115)
- **Issue:** Google Search Console (`V1MQKb60VcWmP7f4u2x7yN1zR5aJ9bL0kD`) and Bing Webmaster (`551FF3A8CD7B8225D53FAB718B3051E2`) verification tokens are exposed. These are inherently public (verification requires putting them in public files), but should be documented.
- **Status:** Expected behavior, not a vulnerability.

### L-05: No `Permissions-Policy` restrictions on interest-cohort (FLoC)
- **File:** `public/_headers` (line 43), `astro.config.mjs` (line 39)
- **Issue:** While camera/microphone/geolocation are blocked, `interest-cohort=()` is not explicitly blocked. Google's Topics API may still track users.
- **Fix:** Add `interest-cohort=()` to the Permissions-Policy header.

---

## ✅ Positive Findings

1. **No hardcoded secrets/API keys** found in source files (`.env` is properly gitignored)
2. **HSTS is correctly configured** with `max-age=63072000; includeSubDomains; preload` (2 years, preloaded)
3. **`X-Frame-Options: DENY`** prevents clickjacking
4. **`X-Content-Type-Options: nosniff`** prevents MIME-type confusion
5. **`Referrer-Policy: strict-origin-when-cross-origin`** limits referrer leakage
6. **Immutable caching** for static assets is correctly configured
7. **Input validation** exists in all Cloudflare Pages Functions (email, phone, required fields)
8. **D1 uses parameterized queries** — no SQL injection risk

---

## Recommendations (Priority Order)

1. **IMMEDIATE:** Upgrade `astro` and dependencies (`npm audit fix --force`) — 5 HIGH vulnerabilities in the framework itself
2. **IMMEDIATE:** Remove `'unsafe-inline'` from CSP `script-src` — use nonces/hashes instead
3. **SHORT-TERM:** Restrict CORS to same-origin on form endpoints
4. **SHORT-TERM:** Move rate limiting to Cloudflare WAF rules or D1/KV
5. **SHORT-TERM:** Align CSP between `_headers` and `astro.config.mjs`
6. **MEDIUM-TERM:** Review AI bot crawl policy — is full AI scraping intentional?
7. **MEDIUM-TERM:** Add `interest-cohort=()` to Permissions-Policy
8. **LOW:** Remove deprecated `X-XSS-Protection` header
9. **LOW:** Redact PII from function console.log statements
