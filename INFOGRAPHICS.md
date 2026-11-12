# Article Infographics

Every article on insurancesupport.online can carry a purpose-built infographic. The
graphics are **inline SVG** generated at build time from a per-article spec — no raster
assets, no image requests, no layout shift, and the facts stay readable by crawlers and
LLM answer engines.

## Files

| File | Purpose |
| --- | --- |
| `src/lib/infographic.ts` | SVG rendering engine + `splitAtHeading()` injection helper |
| `src/data/infographics.ts` | One spec per article (the only file you edit to add content) |
| `src/components/Infographic.astro` | `<figure>` wrapper: SVG + caption + accessible data table |
| `src/pages/blog/[slug].astro` | Injects the figure into every `blogs.json` post |
| `src/pages/blog/[lang]/[slug].astro` | Translated posts (not yet wired — see below) |

## Adding an infographic to an article

1. Open `src/data/infographics.ts`.
2. Copy an existing entry and change `slug` to the article's slug.
3. Set `anchor` to a heading that already exists in the article. The figure is inserted
   immediately before it. If the anchor is missing or not found, it falls back to the
   first heading that appears after ~250 characters of prose (this skips the `<h2>` that
   just restates the article title), then to the second heading.
4. Fill `blocks` with the article's own numbers, deadlines and steps.

```ts
{
  slug: 'my-article-slug',
  eyebrow: 'Claim data · 2026',
  title: 'Three Numbers That Decide This Claim',
  source: 'Where the data comes from (shown under the title and in the caption).',
  summary: 'One-sentence plain-language takeaway — printed as the figcaption.',
  anchor: 'The Heading To Insert Before',
  blocks: [ /* see block types below */ ],
}
```

## Block types

| `kind` | Use for | Required fields |
| --- | --- | --- |
| `stats` | Big-number cards (deadlines, limits, caps) | `items: { value, label, note?, tone? }` |
| `bars` | Ranked comparisons (rates by insurer, win rates) | `items: { label, value, display?, tone? }` |
| `timeline` | Deadlines and sequential windows | `items: { marker, title, detail, tone? }` |
| `steps` | Numbered processes and checklists | `items: { title, detail, tone? }` |
| `ladder` | Escalation tiers, widening as they climb | `items: { tier, title, detail, meta?, tone? }` |
| `compare` | Head-to-head tables (X vs Y) | `leftTitle`, `rightTitle`, `rows: { label, left, right }` |
| `donut` | Share-of-total breakdowns | `items: { label, value, tone? }` |
| `decision` | Branch outcomes from one question | `question`, `branches: { condition, outcome, detail, tone? }` |

Tones: `primary` (blue) · `accent` (green) · `warn` (amber) · `danger` (red) ·
`violet` · `neutral`.

## Rules that keep the graphics honest

- **Every figure is built only from facts stated in its own article.** No outside
  numbers, no invented percentages.
- Anything that is an estimate is labelled as such in `source`.
- Case-outcome figures (win rates, overturn rates) carry a
  "indicative, not a guarantee" note.
- Each figure ships a **data table** in a `<details>` block, so the same facts are
  available as text for accessibility and AI extraction.

## Standalone `.astro` articles

Posts with their own `src/pages/blog/<slug>.astro` file bypass `[slug].astro`, so they
need the component placed by hand:

```astro
import Infographic from '../../components/Infographic.astro';
...
<Infographic slug="<slug>" class="not-prose my-10" />
```

Currently hand-placed: `motor-insurance-claim-process-guide-2026`,
`nominee-vs-legal-heirs-claim-dispute-2026`.

## Not yet done

- **Translated posts** (`/blog/<lang>/<slug>/`) do not render infographics yet. The
  specs are English; wiring them up needs translated spec variants.
- Coverage is 19 of ~75 English articles. Priority so far: claim rejection and appeal,
  IRDAI grievance and Ombudsman, health insurance mechanics, LIC policy servicing,
  motor claims, and tax benefits.

## Verifying changes

```bash
npm ci                        # the committed node_modules/ is incomplete
node node_modules/astro/astro.js build
```

Three checks are worth running after any spec change:

1. **Placement** — the figure sits before the intended heading (not at the top).
2. **No text overflows the 800px canvas.**
3. **No two text boxes overlap.**

Heights are computed from measured line counts, so a card grows with its content and
long labels should not spill.
