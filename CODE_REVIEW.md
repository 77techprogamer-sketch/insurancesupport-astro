# Code Review — insurancesupport-astro

Reviewed on branch `arena/45928666-insurancesupport-astro` (base `71a98c7`).
Scope: full source tree, build pipeline, Cloudflare Pages Functions, SEO output in `dist/`.

## TL;DR

The codebase was **not building at all** before this review, and several production
features were silently broken (site search, phone links, analytics, hreflang, two
interactive tools). Everything listed under "Fixed" is now verified against a fresh
`astro build` (836 pages) plus a link/metadata audit of the generated HTML.

---

## 1. Fixed — build & runtime blockers

| # | Issue | Where | Status |
|---|-------|-------|--------|
| 1 | **Production build failed**: stray `"` inside a JS object (`avg_approval_time": "55 min"`) → esbuild `Expected "}"`. No page could be generated from this file. | `src/pages/blog/cashless-health-insurance-claim-denied-hospital-2026.astro:98` | Fixed |
| 2 | `package-lock.json` pinned `pagefind` to `registry.npmmirror.com`, so `npm ci` failed with `ECONNRESET` outside China (reproduced here). | `package-lock.json:5486` | Fixed, `npm ci` verified |
| 3 | `@/lib/utils` imported by `LeadMagnetQuiz.tsx` but `src/lib/` did not exist → Vite dev server emitted "imported but could not be resolved" and the page errored. Only an ambient type shim declared it. | new `src/lib/utils.ts`, `src/types/i18next.d.ts` | Fixed |
| 4 | Dev server rejected proxied preview hosts (`403 Blocked request`). | `astro.config.mjs` | Fixed (`server.allowedHosts`) |

## 2. Fixed — silently broken features

| # | Issue | Evidence | Fix |
|---|-------|----------|-----|
| 5 | **Phone link on every page was `tel:+919****4506`** — a redaction placeholder shipped to production, so the header "call" button dialled an invalid number. Same placeholder in JSON-LD `telephone`. | 4 occurrences in 3 files | Real number restored (`tel:+919986634506`) |
| 6 | **Site search never worked.** `/search/` dynamically imports `/pagefind/pagefind.js`, but Pagefind was never run in the build → no `dist/pagefind/`. | no `pagefind` in `package.json` build; no `dist/pagefind/` | Pagefind added to the build (+ CSP `'wasm-unsafe-eval'`), now indexes 838 pages |
| 7 | **`/search/` page had malformed frontmatter** (`---<BaseLayout` on one line), so it rendered the layout tag as literal text: no `<title>`, no meta, no header/footer. | `dist/search/index.html` started with `BaseLayout pageType="search"` | Frontmatter closed properly; page now uses the layout |
| 8 | **Neighbourhood search on `/locations/` did nothing**: `onkeyup="filterCities()"` calls a function that Astro hoists into *module* scope, so it was never on `window`. | `filterCities` reported unused by `astro check` | Published on `window`, typed the DOM casts |
| 9 | **Risk scorecard quiz was dead**: `onclick="answer(...)"` on 10 buttons → `answer` was module-scoped, not global. | `answer` flagged unused | Exposed on `window` |
| 10 | **Google Tag Manager never loaded**: container ID was the literal placeholder `GTM-XXXXXXX`. | `src/layouts/BaseLayout.astro:363` | Real ID `GTM-P8DZ6MRQ` (as documented in the privacy policy) |
| 11 | `GeoBanner` fetched `/api/geo`, but the Pages Function is `/geo`. | `functions/geo.ts` vs `GeoBanner.tsx` | Path corrected (component is currently unused) |

## 3. Fixed — SEO output (measured on generated HTML)

| Metric | Before | After |
|--------|-------:|------:|
| Broken internal links (distinct targets) | 19 | **0** |
| `hreflang` tags pointing at a URL that 404s | 1,866 | **0** |
| Pages with an `og:image` that does not exist | 552 / 833 | **0** |
| `<base href>`-less hreflang to `/blog/<lang>/` (never built) | 1,600+ | 0 |

Details:

- **hreflang was structurally wrong.** `BaseLayout` built alternates as
  `/blog/${lang}/${pageCanonical.split('/').pop()}`; because canonical URLs end in `/`,
  `pop()` returned `''` → every page linked to `/blog/hi/`, `/blog/en/`, `/blog/pa/`… on
  ~833 pages. It was also emitted unconditionally (even when the page passed
  `skipDefaultHreflang`), duplicated `en-IN`/`x-default`, and blog posts advertised all 8
  translations even though only 66 of 537 English posts are translated.
  Now: layout emits one self-referential `en-IN` + `x-default`; blog templates emit only
  translations that actually exist (built from `blogs.json`).
- **OG images**: templates hard-coded `/images/og/<slug>.png`, but only 103 PNGs exist.
  Added `src/utils/ogImage.ts`, which verifies the file on disk at build time and falls
  back to the English card / site default. Also fixed `hi-blog.jpg`, `get-started.png`,
  `services.png`, which never existed.
- **Broken internal links** came from dynamically-built hrefs that don't map to routes:
  neighbourhood chips on `/brand/insurance-support-bangalore/` (`/cities/jp-nagar`,
  `/cities/malleshwaram`…), LIC service cards (`/services/policy-revival`,
  `/services/death--maturity-claims`…), two service cards on `/insurance-support/`, and
  four `_redirects` rules pointing at `/services/{btm-layout,indiranagar,whitefield,investment-plans}/`.
- **Stale `public/sitemaps/images-sitemap.xml`**: 103 `<loc>` entries all resolving to
  `/images/og/` (invalid image sitemap, no generator behind it) → removed.
- **Junk page `/test-build/`**: scratch page with `canonical=/support` and an empty FAQ
  array → removed.
- **404 page** now `noindex`, no hreflang, excluded from the search index.

## 4. Not fixed — recommended (needs a decision, not just a patch)

### Repository hygiene (highest impact)
`git` currently tracks **10,246 files / ~156 MB**, of which:

- `node_modules/` — **9,162 tracked files** (`.gitignore` lists it, but it was committed
  before/anyway, so the ignore rule has no effect).
- `dist.zip` — 21 MB build artifact.
- `src/data/blogs.json` + `.bak`, `.bak2`, `.bak3`, `.bak4` — **104 MB** of duplicated
  JSON; the four backups are byte-identical in size.
- `public/hero.mp4` and `aurora/public/hero.mp4` — 14 MB each (identical?).
- 5 `screenshot_*.png` (~4.7 MB), `lh-audit.json`, `broken-links-audit.json`,
  `all_cities.json`, `sitemap_results.pkl`, `src/pages/blog/*.astro.bak`, `public/_redirects.bak`,
  `src/data/*.json.bak*` — 12 tracked `*.bak` files in total.
- `aurora/` is a separate Vite + React 19 prototype inside the repo (own `package.json`,
  `hero.mp4`, `tsconfig.tsbuildinfo`), not referenced by the Astro app. It is dead weight
  and is the source of the remaining `astro check` error in `aurora/vite.config.ts`.

Suggested: `git rm -r --cached node_modules dist.zip '**/*.bak*' aurora` after adding the
right ignore rules, and move large media to external storage. This is a large destructive
change, so it is left for you to approve.

### Correctness / robustness
- `wrangler.toml` declares the D1 binding `LEADS_DB` but **no `LEADS_KV` binding**, while
  all three Functions do `env.LEADS_KV.put(...)`. It is guarded by `if (env?.LEADS_KV)`,
  so leads are still written to D1 — the KV copy is simply always skipped.
- Function rate limiting uses an in-memory `Map`. Cloudflare isolates are short-lived and
  sharded, so this limits little; use Durable Objects / KV / D1 if it matters.
- Form endpoints return `Access-Control-Allow-Origin: *`; nothing needs cross-origin POSTs,
  so restricting this reduces spam surface.
- `README`-level docs claim `security.csp` in `astro.config.mjs` protects the site. For
  `output: 'static'` that block is a no-op — the real policy is `public/_headers` +
  `scripts/inject-csp-hashes.cjs` (which works: 16 hashes injected).
- `scripts/ping_google.js` uses the sitemap ping endpoint Google retired in 2023; the
  step is a permanent no-op. `indexnow-notify.js` pings on every build.
- `public/_redirects` has ~1,437 rules (Cloudflare limit 2,000 static / 100 dynamic) and
  contains `/contact-submit → /contact/ 301`, which is dead config: per Cloudflare docs,
  `_redirects` rules are **not** applied to requests served by Pages Functions, so the
  form endpoint keeps working — but the rule is misleading and should be deleted.
- Two duplicate-canonical pairs: `/about/` vs `/about-hari-kotian/`, and
  `/blog/irdai-complete-guide-policyholders-india-2026/` vs
  `/blog/irdai-policyholders-guide-india-2026/`. Both pairs render different HTML with the
  same canonical; a 301 or distinct canonicals would be cleaner.
- `tailwind.config.mjs` is an unused duplicate of `tailwind.config.cjs` (PostCSS loads the
  `.cjs`).
- `robots.txt` sets `Content-Signal: ai-train=no, search=yes, ai-input=no` at the top and
  `ai-input=yes` at the bottom — contradictory.
- `astro check`: **83 remaining type errors** (was 120), all cosmetic: `Icon` `name` is a
  string union while callers pass `string`, `key=` used on `<a>` in Astro templates,
  `HTMLInputTypeAttribute` used as a value type, implicit `any` in a couple of maps,
  unused imports. None affect the build, but they hide real errors.
- Static files in `public/` (`api-docs.html`, `google-site-verification.html`, etc.) have
  no `<title>`/`<meta description>` — acceptable for verification files, worth a look for
  `downloads/policy-review-checklist.html`.

## 5. Verification performed

```
npm ci                     → 492 packages, exit 0
npx astro check            → 83 errors / 0 warnings / 138 hints (was 120 errors)
astro build                → 836 pages, exit 0
pagefind --site dist       → 838 pages / 102,880 words indexed
inject-csp-hashes.cjs      → 839 files scanned, 16 hashes injected
generate-sitemap.js        → 9 sitemaps, 824 URLs, all resolving
verify-no-templates.js     → OK (839 files)
```

Custom audit of `dist/` (all 839 HTML documents):

```
broken internal hrefs ......... 0
broken hreflang targets ....... 0   (6,482 tags)
missing og:image targets ...... 0
sitemap URLs that are non-canonical ... 0
dev server (/ /search/ /locations/ /tools/risk-scorecard/ /blog/ /services/ /cities/) → 200
```

## 6. Files changed

```
astro.config.mjs, package.json, package-lock.json, public/_headers, public/_redirects
src/layouts/BaseLayout.astro
src/components/{Header,TrustBadges,LocalBusinessJsonLd,GeoBanner}.{astro,tsx}
src/pages/search.astro, locations/index.astro, test-build.astro (deleted)
src/pages/blog/[slug].astro, blog/[lang]/[slug].astro, blog/[lang]/index.astro,
  blog/index.astro, blog/page/[page].astro, blog/cashless-…-2026.astro
src/pages/brand/{insurance-support-bangalore,insurance-support-lic-expert}.astro
src/pages/{insurance-support,get-started,404}.astro, services/index.astro,
  tools/risk-scorecard.astro
src/types/i18next.d.ts
src/lib/utils.ts, src/utils/ogImage.ts            (new)
public/sitemaps/images-sitemap.xml                 (deleted)
```
