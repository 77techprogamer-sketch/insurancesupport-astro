---
version: alpha
name: Insurance Support
description: Professional insurance advisory brand for Hari Kotian (IRDAI Reg 0149161D) — trustworthy, locally-grounded, expert-driven.
colors:
  # Core brand colors (from globals.css / CSS custom properties)
  primary: "oklch(45% 0.18 250)"       # Deep blue - trust, authority
  primary-foreground: "#ffffff"
  secondary: "oklch(65% 0.08 250)"     # Muted blue-gray - supporting elements
  secondary-foreground: "#ffffff"
  accent: "oklch(55% 0.22 85)"         # Warm amber/gold - CTAs, highlights
  accent-foreground: "#000000"
  destructive: "oklch(55% 0.22 15)"    # Red for errors/alerts
  destructive-foreground: "#ffffff"
  muted: "oklch(97% 0.005 250)"
  muted-foreground: "oklch(45% 0.02 250)"
  background: "#ffffff"
  foreground: "oklch(15% 0.02 250)"
  card: "#ffffff"
  card-foreground: "oklch(15% 0.02 250)"
  popover: "#ffffff"
  popover-foreground: "oklch(15% 0.02 250)"
  border: "oklch(90% 0.01 250)"
  input: "oklch(90% 0.01 250)"
  ring: "oklch(45% 0.18 250)"
  # Sidebar (for future dashboard/admin)
  sidebar: "oklch(98% 0.005 250)"
  sidebar-foreground: "oklch(15% 0.02 250)"
  sidebar-primary: "oklch(45% 0.18 250)"
  sidebar-primary-foreground: "#ffffff"
  sidebar-accent: "oklch(92% 0.02 250)"
  sidebar-accent-foreground: "oklch(45% 0.18 250)"
  sidebar-border: "oklch(88% 0.01 250)"
  sidebar-ring: "oklch(45% 0.18 250)"

typography:
  # Google Fonts: Outfit (sans), Roboto (serif)
  # Outfit: geometric sans, excellent for UI + headlines
  # Roboto: readable serif for long-form content
  display-xl:
    fontFamily: "Outfit"
    fontSize: "4.5rem"      # 72px - Hero headlines
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  display-lg:
    fontFamily: "Outfit"
    fontSize: "3.5rem"      # 56px - Page titles
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display-md:
    fontFamily: "Outfit"
    fontSize: "2.5rem"      # 40px - Section headers
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  display-sm:
    fontFamily: "Outfit"
    fontSize: "1.875rem"    # 30px - Sub-sections
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0"
  h1:
    fontFamily: "Outfit"
    fontSize: "2.25rem"     # 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "Outfit"
    fontSize: "1.875rem"    # 30px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0"
  h3:
    fontFamily: "Outfit"
    fontSize: "1.5rem"      # 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0"
  h4:
    fontFamily: "Outfit"
    fontSize: "1.25rem"     # 20px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0"
  body-lg:
    fontFamily: "Outfit"
    fontSize: "1.125rem"    # 18px - Lead paragraphs
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  body-md:
    fontFamily: "Outfit"
    fontSize: "1rem"        # 16px - Standard body
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  body-sm:
    fontFamily: "Outfit"
    fontSize: "0.875rem"    # 14px - Meta, captions
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  body-xs:
    fontFamily: "Outfit"
    fontSize: "0.75rem"     # 12px - Fine print
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  # Serif for long-form editorial content (blog posts, guides)
  editorial-lg:
    fontFamily: "Roboto"
    fontSize: "1.25rem"     # 20px - Article body
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
  editorial-md:
    fontFamily: "Roboto"
    fontSize: "1rem"        # 16px - Standard article
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
  # UI elements
  button:
    fontFamily: "Outfit"
    fontSize: "1rem"        # 16px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0"
  label:
    fontFamily: "Outfit"
    fontSize: "0.875rem"    # 14px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"
  caption:
    fontFamily: "Outfit"
    fontSize: "0.75rem"     # 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"

spacing:
  # 4pt base unit (Tailwind default), exposed as design tokens
  xs: "4px"      # 1
  sm: "8px"      # 2
  md: "16px"     # 4
  lg: "24px"     # 6
  xl: "32px"     # 8
  "2xl": "48px"  # 12
  "3xl": "64px"  # 16
  "4xl": "96px"  # 24

rounded:
  none: "0px"
  sm: "4px"      # calc(var(--radius) - 4px)
  md: "6px"      # calc(var(--radius) - 2px)
  lg: "8px"      # var(--radius)
  xl: "12px"
  "2xl": "16px"
  full: "9999px"

elevation:
  # Subtle, layered shadows matching the site's "glow" aesthetic
  level-1: "0 1px 2px 0 rgb(0 0 0 / 0.05)"              # Subtle card hover
  level-2: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"  # Standard card
  level-3: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"  # Elevated
  level-4: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"  # Modal/dropdown
  # Brand glow (used on CTAs, hero accents)
  glow-primary: "0 0 20px oklch(45% 0.18 250 / 0.3)"
  glow-accent: "0 0 20px oklch(55% 0.22 85 / 0.3)"

components:
  # Buttons
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md} {spacing.xl}"
    fontSize: "{typography.button.fontSize}"
    fontWeight: "{typography.button.fontWeight}"
    boxShadow: "{elevation.level-2}"
    transition: "all 0.2s ease"
  button-primary-hover:
    backgroundColor: "oklch(40% 0.18 250)"
    boxShadow: "{elevation.glow-primary}"
    transform: "translateY(-1px)"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md} {spacing.xl}"
    fontSize: "{typography.button.fontSize}"
    fontWeight: "{typography.button.fontWeight}"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md} {spacing.xl}"
    fontSize: "{typography.button.fontSize}"
    fontWeight: "{typography.button.fontWeight}"
    boxShadow: "{elevation.glow-accent}"
  button-accent-hover:
    backgroundColor: "oklch(50% 0.22 85)"
    transform: "translateY(-1px)"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md} {spacing.xl}"
    fontSize: "{typography.button.fontSize}"
    fontWeight: "{typography.button.fontWeight}"
  button-ghost-hover:
    backgroundColor: "{colors.muted}"

  # Cards
  card-default:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.border}"
    boxShadow: "{elevation.level-1}"
  card-hover:
    boxShadow: "{elevation.level-3}"
    borderColor: "{colors.ring}"

  # Form inputs
  input-default:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    placeholderColor: "{colors.muted-foreground}"
    borderColor: "{colors.input}"
    borderWidth: "1px"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
    fontSize: "{typography.body-md.fontSize}"
    fontFamily: "{typography.body-md.fontFamily}"
  input-focus:
    borderColor: "{colors.ring}"
    boxShadow: "0 0 0 2px {colors.ring}"
    outline: "none"

  # Badges / Tags
  badge-default:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs} {spacing.sm}"
    fontSize: "{typography.caption.fontSize}"
    fontWeight: 500
  badge-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
  badge-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
  badge-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"

  # Section container
  section-container:
    maxWidth: "1400px"
    margin: "0 auto"
    padding: "{spacing.xl} {spacing.lg}"
  section-container-narrow:
    maxWidth: "800px"
    margin: "0 auto"
    padding: "{spacing.xl} {spacing.lg}"

  # Gradient backgrounds (used in hero sections)
  gradient-hero:
    background: "linear-gradient(to bottom right, oklch(15% 0.05 250), oklch(20% 0.08 250 / 0.8), oklch(25% 0.1 260))"
  gradient-cta:
    background: "linear-gradient(to bottom right, oklch(25% 0.15 250), oklch(30% 0.18 260), oklch(35% 0.12 240))"
  gradient-accent:
    background: "linear-gradient(to right, oklch(55% 0.22 85), oklch(50% 0.25 70))"

  # WhatsApp CTA (brand-specific)
  whatsapp-button:
    backgroundColor: "#10b981"  # Emerald-500
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "{spacing.md} {spacing.xl}"
    fontSize: "{typography.button.fontSize}"
    fontWeight: "{typography.button.fontWeight}"
    boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)"
  whatsapp-button-hover:
    backgroundColor: "#059669"
    transform: "scale(1.02)"

  # Phone CTA (brand-specific)
  phone-button:
    background: "linear-gradient(to right, oklch(55% 0.22 85), oklch(65% 0.18 75))"
    textColor: "#000000"
    rounded: "{rounded.full}"
    padding: "{spacing.md} {spacing.xl}"
    fontSize: "{typography.button.fontSize}"
    fontWeight: "{typography.button.fontWeight}"
    boxShadow: "0 4px 14px oklch(55% 0.22 85 / 0.3)"
  phone-button-hover:
    transform: "scale(1.02)"

## Overview

Insurance Support is the digital brand for **Hari Kotian**, an IRDAI-certified insurance advisor (Reg No: 0149161D) with 25+ years of experience based in Bengaluru/Koramangala. The brand's visual identity must communicate **trust, expertise, and local accessibility** — distinct from the generic, template-heavy look of aggregator sites (PolicyBazaar, Coverfox, etc.).

### Brand Principles

1. **Trust First**: Deep blue primary establishes authority. No playful gradients or "tech" purples. Insurance is a serious financial decision.
2. **Local Warmth**: Amber/gold accent represents the "doorstep service" promise — human, approachable, not corporate-cold.
3. **Editorial Clarity**: Roboto serif for long-form content (guides, case studies) signals depth and readability. Outfit sans for UI ensures modern, clean interaction.
4. **No AI Slop**: Every page must have locally-specific content (real hospital names, landmark references, area-specific FAQs). No generic "comprehensive guide" filler.
5. **Accessibility Baseline**: WCAG AA minimum. All interactive elements have visible focus states. Color contrasts verified via design-md lint.

## Colors

### Primary: Deep Trust Blue (oklch(45% 0.18 250))
Used for: Primary CTAs, headlines, navigation, trust badges, header background.
- Conveys: Stability, regulatory compliance, financial authority.
- WCAG AA on white: 7.2:1 (passes for text ≥18pt, fails for body text — use primary-foreground white on primary backgrounds).
- Do NOT use for body copy. Use `foreground` (oklch(15% 0.02 250)) instead.

### Accent: Warm Advisory Amber (oklch(55% 0.22 85))
Used for: WhatsApp CTA, phone CTA, highlight badges, gradient accents, "Instant Help" banners.
- Conveys: Human warmth, urgency without alarm, "gold standard" service.
- WCAG AA on white: 4.8:1 (passes for large text, use accent-foreground black on accent backgrounds).
- **Critical**: This is the ONLY warm color in the palette. Do not introduce oranges, reds, or yellows elsewhere.

### Secondary: Muted Blue-Gray (oklch(65% 0.08 250))
Used for: Secondary buttons, form borders, disabled states, subtle backgrounds.
- Neutral supporting role. Never competes with primary or accent.

### Semantic Colors
- **Destructive** (errors, rejections): oklch(55% 0.22 15) — red with slight warmth, not harsh.
- **Muted** (subtle backgrounds, disabled text): oklch(97% 0.005 250) / oklch(45% 0.02 250).
- **Border/Input**: oklch(90% 0.01 250) — barely visible, lets content breathe.

## Typography

### Font Stack
- **Primary Sans (UI, Headlines, CTAs)**: `Outfit` (Google Fonts) — geometric, slightly compressed tracking, excellent numeral rendering for premium amounts.
- **Serif (Editorial, Blog, Long-form)**: `Roboto` (Google Fonts) — highly readable, familiar, performs well at small sizes on mobile.
- **Fallbacks**: System UI stack (`system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`).

### Hierarchy Rules
1. **One display size per page** — typically `display-lg` for service/location pages, `display-xl` only for homepage hero.
2. **Section headers = `h2`** — consistent `display-sm` or `h2` token.
3. **Body text = `body-md` (16px/1.6)** minimum. Never go below `body-sm` (14px) for readable content.
4. **Legal/disclaimer text = `body-xs` (12px)** only in footer or terms modals.
5. **Button/label text = `button`/`label` tokens** — never raw body sizes.

### Letter Spacing
- Headlines: negative tracking (`-0.01em` to `-0.03em`) for visual weight.
- Body/UI: `0` (default).
- Captions/all-caps: `+0.02em` for legibility.

## Layout & Spacing

### Container Widths
- **Wide (marketing/hero)**: `1400px` max (`2xl` screen) — matches Tailwind `container.screens['2xl']`.
- **Narrow (editorial/blog)**: `800px` max (`65ch` approx) — optimal reading line length.
- **Form modals**: `480px` max.

### Spacing Rhythm
- Base unit: `4px` (Tailwind default).
- Section vertical padding: `spacing.2xl` (48px) mobile → `spacing.4xl` (96px) desktop.
- Component gaps: `spacing.lg` (24px) for cards, `spacing.md` (16px) for form fields.
- Inline gaps: `spacing.sm` (8px) for badge clusters, `spacing.xs` (4px) for icon+text.

### Grid System
- **12-column implicit grid** via CSS Grid (not utility classes).
- Service cards: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`.
- Location grid: `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`.
- FAQ accordions: single column, full width.

## Elevation & Depth

### Shadow Philosophy
Subtle, never heavy. The brand uses **glow shadows** (colored, brand-aware) for primary actions instead of generic gray shadows.

### Shadow Tokens
- `level-1`: Barely-there, for card hover entry.
- `level-2`: Standard card resting state.
- `level-3`: Card hover, dropdown menus.
- `level-4`: Modals, mobile drawers.
- `glow-primary`: Primary CTA hover/focus.
- `glow-accent`: WhatsApp/Phone CTA hover/focus.

### Do NOT Use
- Heavy drop shadows (`0 25px 50px`).
- Colored shadows outside the two glow tokens.
- `box-shadow` on text (use `text-shadow` only for hero headlines on gradient backgrounds).

## Shapes

### Border Radius Scale
- `none` (0): Sharp edges for badges, full-width banners.
- `sm` (4px): Input fields, small badges.
- `md` (6px): Buttons, small cards.
- `lg` (8px): Standard cards, modals.
- `xl` (12px): Hero sections, large feature cards.
- `2xl` (16px): Page-level containers (rare).
- `full` (9999px): Pills, avatar circles, CTA buttons.

### Consistency Rule
**All interactive elements sharing a visual role must share a radius token.** Do not mix `rounded-md` and `rounded-lg` on buttons in the same view.

## Components

### Button Variants (7 states each: default, hover, active, focus-visible, disabled, loading, error)
| Variant | Use Case | Background | Text | Shadow |
|---------|----------|------------|------|--------|
| `primary` | Main conversion (Get Quote, Book Consultation) | Primary | Primary-foreground | level-2 → glow-primary |
| `accent` | High-urgency (WhatsApp, Call Now) | Accent | Accent-foreground | glow-accent |
| `secondary` | Secondary actions (Learn More, View Plans) | Secondary | Secondary-foreground | level-1 |
| `ghost` | Tertiary (Terms, Privacy, Cancel) | Transparent | Foreground | none |
| `whatsapp` | WhatsApp CTA (fixed) | Emerald-500 | White | custom emerald glow |
| `phone` | Phone CTA (fixed) | Amber gradient | Black | custom amber glow |

### Card Variants
| Variant | Use Case | Border | Shadow | Hover |
|---------|----------|--------|--------|-------|
| `default` | Service cards, location cards | 1px border | level-1 | level-3 + border:ring |
| `featured` | Hero service, case study highlight | 2px primary | level-2 | level-3 |
| `testimonial` | Review cards | none | level-1 | level-2 |

### Form Elements
- **Input/Select/Textarea**: `input-default` → `input-focus` transition (150ms).
- **Labels**: Always visible, `label` token, associated via `htmlFor`/`id`.
- **Error state**: `destructive` border + `destructive` helper text below.
- **Success state**: `accent` border + check icon.
- **Required indicator**: `*` in `accent` color, announced to screen readers.

### Navigation
- **Header**: Fixed, `backdrop-blur`, `border-b border/10`, logo + 5 main links + WhatsApp/Phone CTAs.
- **Mobile**: Hamburger → full-screen drawer (same links + CTAs).
- **Breadcrumbs**: `caption` token, `>` separator, current page `foreground` weight 600.

### Trust Indicators
- **IRDAI Badge**: `badge-primary` with certificate icon, "IRDAI Reg: 0149161D".
- **Review Stars**: Gold (`accent`) SVG stars, `aggregateRating` schema.
- **Stats Bar**: 3-column grid (Years Experience, Claims Resolved, Areas Served) — `h3` numbers + `caption` labels.

## Motion

### Principles
- **Functional over decorative**: Motion clarifies state changes, reduces cognitive load.
- **Fast**: 150–250ms for UI transitions. 400–600ms for page-level (hero entrance).
- **Respects `prefers-reduced-motion`**: All non-essential animation disabled.

### Keyframe Tokens (from tailwind.config.cjs)
- `accordion-down/up`: FAQ sections, mobile nav.
- `fade-up`: Hero content, section reveals (IntersectionObserver).
- `float`: Decorative blobs in hero backgrounds.
- `glow-pulse`: Primary CTA subtle attention (low frequency, 2s).
- `gradient-shift`: Hero gradient background (slow, 4s).
- `shimmer`: Loading skeletons.
- `marquee`: Partner logos, trust badges (if used).

### Do NOT Animate
- Layout properties (width, height, top, left) — use transform/opacity.
- Color on large areas — only on borders, shadows, text.
- Infinite loops on content (only on decorative blobs).

## Do's and Don'ts

### Do
- Use `trailingSlash: 'always'` in astro.config.mjs (Cloudflare Pages requirement).
- Generate `LocalBusiness` + `Place` + `GeoCoordinates` JSON-LD on every location/service page.
- Write locally-specific FAQs per city (real hospital names, landmark references).
- Use `Outfit` for UI, `Roboto` for editorial — never swap.
- Keep line length ≤75ch for blog/article content.
- Test with `prefers-reduced-motion: reduce` enabled.
- Verify WCAG AA contrast via `npx @google/design.md lint DESIGN.md`.
- Export to Tailwind via `npx @google/design.md export --format json-tailwind DESIGN.md > tailwind.theme.json`.

### Don't
- Use masked phone numbers (`+919****4506`) in JSON-LD `telephone` or `tel:` hrefs — **must be full E.164**.
- Create template pages with identical content across locations — each page must have unique `desc`, `areas`, `local_faqs`.
- Use `unsafe-inline` in CSP `script-src` or `style-src` — use Astro's nonce system.
- Introduce new colors not in this spec — extend via `oklch()` variants of existing hues.
- Use emojis in headings, JSON-LD, or meta tags — professional context only.
- Trust `@astrojs/sitemap` — use the custom `scripts/generate-sitemap.js` postbuild.
- Commit `node_modules/` — ensure `.gitignore` excludes it.

---

## Verification Checklist

Run these after any design system change:
1. `npx @google/design.md lint DESIGN.md` → 0 errors, WCAG warnings reviewed.
2. `npm run build` → 0 TypeScript errors, all 1000+ pages generated.
3. `curl -s https://insurancesupport.online/services/koramangala/health-insurance/ | grep -c '"@type": "LocalBusiness"'` → 1.
4. `npx playwright test --project=chromium` → a11y + visual regression pass.
5. Lighthouse CI on deployed preview → Performance ≥90, Accessibility ≥95, Best Practices ≥90, SEO ≥90.