# Search-visibility cleanup — applied & verified

**Date:** 12 November 2026
**Branch:** `arena/45928666-insurancesupport-astro`
**Scope chosen:** both halves — re-apply the documented cleanup *and* fix the rendering/quality defects it was masking.

---

## 1. Before / after

| Signal | Before | After |
|---|---:|---:|
| Indexable pages (`index, follow`) | **830** | **222** |
| Pages `noindex` | 6 | **617** |
| URLs in sitemap | **824** | **214** |
| Machine-translated pages indexable | 536 | **0** |
| Language hub pages indexable | 8 | **0** |
| `/cities/*` pages indexable | 84 | **10** (9 real + hub) |
| Pages rendering literal `**` / `###` | 596 | **0** |
| Pages exposing the rejected Google Maps key | 57 | **0** |
| hreflang tags pointing at missing URLs | 0 (1,866 earlier) | **0** of 594 |
| Broken internal links | 693* | **44** |
| Pages built / indexed by pagefind | 836 / 838 | 836 / 838 |

\* The 693 figure is what a link crawler would have seen *after* markdown started rendering correctly — the translated posts contained machine-translated URLs such as `/संपर्क` and `/சேவைகள்`. Before the renderer fix those were plain text, not links. 649 of them are now resolved or de-linked.

The sitemap target in `RECOVERY_PLAN.md` was "~200 real URLs". **214** is that number: 58 core pages, 91 English blog pages, 57 location pages, 9 Bangalore localities, and the `/cities/` hub.

---

## 2. What changed

### De-indexing (the cleanup that had been reverted)

| File | Change |
|---|---|
| `src/pages/blog/[lang]/[slug].astro` | 536 translated posts now emit `noindex, nofollow`; their hreflang cluster was deleted (a noindex page must not be an hreflang target). |
| `src/pages/blog/[lang]/index.astro` | 8 language hubs noindexed; their 8-way hreflang cluster removed. |
| `src/pages/blog/[slug].astro` | English posts keep a self-referencing `en-IN` + `x-default` only — no more alternates pointing at de-indexed translations. |
| `src/pages/blog/index.astro` | Same: self + `x-default`, no links into noindexed hubs. |
| `src/pages/cities/[area].astro` | `noIndex={false}` → `noIndex={!detail}`. The 9 localities with hand-written content (Koramangala, Indiranagar, Jayanagar, Whitefield, HSR Layout, Marathahalli, JP Nagar, Bellandur, Yelahanka) stay indexable; the other 74 cloned templates stay reachable for users but are out of the index. |

`scripts/generate-sitemap.js` already drops `noindex` URLs and non-self-canonical URLs, so the sitemap fell from 824 → 214 with no extra code.

### Rendering (the reason those pages looked broken to a visitor)

New `src/utils/markdown.ts` replaces three near-duplicate `marked` setups. The old renderers read `token.text` — the **raw** markdown source — instead of re-parsing inline tokens, so `**bold**` printed as asterisks on 596 pages, and `/services/*` injected markdown straight into the DOM with `set:html={service.content.replace(...)}`, so `###` headings and `|` tables rendered as text.

The new renderer:

- parses inline tokens (`this.parser.parseInline`) so bold/italic/code/links survive in headings, paragraphs, list items and table cells;
- handles table cells, nested lists, blockquotes, fenced code and images with the site's Tailwind classes;
- strips stray unmatched `**` (machine translations leave unbalanced markers);
- **resolves machine-translated link paths** — `/संपर्क` → `/contact/`, `/சேவைகள்` → `/services/`, `/ब्लॉग` → `/blog/` — and renders anything unresolvable as plain text instead of a 404 link.

Applied to: `blog/[slug].astro`, `blog/[lang]/[slug].astro`, `lead-magnets/[slug].astro`, `services/[slug].astro`.

### Google Maps key

`src/pages/locations/[slug].astro` built its iframe with a hardcoded Embed API key (`AIzaSyB41DRUb…`) that Google rejects, so every one of the 57 location pages displayed *"Google Maps Platform rejected your request. The provided API key is invalid."* to visitors. Replaced with the keyless `https://www.google.com/maps?q=…&output=embed` form. Zero API keys remain in `dist/`.

### Housekeeping

- Removed the retired Google sitemap-ping step (`scripts/ping_google.js`) from `npm run build` — that endpoint was shut down in 2023 and the step only added build noise.
- Deleted the now-unused translation maps from both blog templates.

---

## 3. Verification log (all green)

```
astro build .................. 836 pages, 0 errors
pagefind ..................... 838 pages / 101,756 words / 9 languages
inject-csp-hashes ........... 839 files, 16 script hashes
generate-sitemap ............ 214 URLs in 9 sitemaps
generate_all_urls ........... 214 URLs
verify-no-templates ......... OK across 839 HTML files

re-audit of dist/:
  indexable 222 / noindex 617
  literal ** pages ......... 0
  pages with API key ....... 0
  hreflang tags ............ 594, 0 broken
  broken internal links .... 44 across 24 targets (all /downloads/*.pdf templates
                             that were never produced, plus 3 mangled translated slugs)
  pages missing <title> .... 0 content pages (only api-docs.html + a Google
                             verification file, neither is content)
```

---

## 4. What still needs doing — outside this change

1. **Resubmit `sitemap-index.xml` in Search Console.** Expect the 619 noindexed URLs to leave the index over 2–8 weeks. Do **not** use "Remove URLs" — that is temporary and hides the cause.
2. **`/downloads/*` dead links.** Nine pages (the appeal guide and ombudsman guides) link to `appeal-templates.pdf`, `claim-organizer.xlsx`, `ombudsman-affidavit-template.docx` and friends that were never produced. Either generate the files or delete the list items.
3. **Duplicate canonicals.** `/about-hari-kotian/` → `/about/`, and `/blog/irdai-policyholders-guide-india-2026/` → the 2026 IRDAI guide, are still two pairs; harmless but worth collapsing.
4. **Backlinks + Google Business Profile.** The technical block is now removed, but 222 pages do not rank on their own. The plan's 2–6 month outlook depends on citations, GBP, and the local pages actually being linked.

---

## 5. Files touched

```
new:      src/utils/markdown.ts
modified: src/pages/blog/[slug].astro
          src/pages/blog/[lang]/[slug].astro
          src/pages/blog/[lang]/index.astro
          src/pages/blog/index.astro
          src/pages/cities/[area].astro
          src/pages/locations/[slug].astro
          src/pages/services/[slug].astro
          src/pages/lead-magnets/[slug].astro
          package.json
```

---

# Round 2 — titles and internal linking

Applied after the first pass went green, on the same branch.

## Titles

New `src/utils/seoTitle.ts`, wired into `BaseLayout.astro`, so **no page can ship a
title longer than 60 characters** — now or in future templates.

It shortens in this order: brand/boilerplate suffix (`| Insurance Support`,
`| Hari Kotian`, `| Claim Case Study`, …) → trailing parenthetical → clause after a
colon → trailing comma-separated region → word-boundary trim. It keeps the year
when the source had one, budgets for `&` → `&amp;` expansion, and never cuts mid-word.
A `TITLE_OVERRIDES` map carries ~35 hand-written titles where a mechanical cut read badly.

| | Before | After |
|---|---:|---:|
| Titles over 60 characters | 193 of 220 | **0** |
| Titles in the 30–60 sweet spot | 20 | **210** |

Template-level fixes: the 57 location pages rendered
*"Insurance Advisor in Bannerghatta Road, Bangalore, Karnataka – Plans, Claims & Free Review | Hari Kotian"* (110 chars);
they now render *"Insurance Advisor in Bannerghatta Road, Bangalore"*. The 9 city pages
lost *"— Block-Level Guidance | Insurance Support"* the same way.

## Orphan pages

| | Before | After |
|---|---:|---:|
| Indexable pages with zero internal links | 16 | **1** |

- `/services/ulip-plans/` — was missing from the services index entirely; card added.
- `/expert-insights/` — now linked from the blog hero.
- `/resources/how-it-works/` — now linked from `/resources/`.
- Four `/brand/*` pages — now listed on `/about/` under "Brand and reference pages".
- `/blog/lic-jeevan-anand-vs-jeevan-labh-comparison/` and
  `/blog/lic-jeevan-labh-maturity-calculator-guide/` — added to the LIC pillar's
  service-guide list.
- `/downloads/policy-review-checklist.html` — linked from the checklist page.
- `/search/`, `/api-docs.html`, the Google and Bing verification files and the
  printable HTML are now `noindex` instead of being counted as thin indexable pages.

The one remaining orphan, `/blog/irdai-policyholders-guide-india-2026/`, is a
canonical duplicate of the 2026 IRDAI guide — it is intentionally left for Google to
consolidate rather than linked.

## Round-2 verification

```
astro build ............... 836 pages, 0 errors
pagefind .................. 838 pages / 101,757 words
sitemap ................... 214 URLs
indexable 216 / noindex 623
literal ** pages .......... 0
hreflang .................. 594 tags, 0 broken
broken internal links ..... 44 (unchanged — the /downloads/*.pdf content gap)
titles > 60 chars ......... 0
orphan indexable pages .... 1
```
