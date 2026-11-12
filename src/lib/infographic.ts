/**
 * src/lib/infographic.ts
 * -----------------------------------------------------------------------------
 * Article infographic engine.
 *
 * Renders data-dense, brand-consistent, accessible SVG infographics that are
 * built from the *actual* numbers, deadlines and steps published in each
 * article. Everything is inline SVG (no <style> blocks, no raster assets) so it
 * stays crisp, tiny, CSP-safe and readable by crawlers / LLM answer engines.
 *
 * The specs live in src/data/infographics.ts — one entry per article slug.
 */

/* -------------------------------------------------------------------------- */
/* Design tokens (mirrors src/styles/globals.css — Insurance Support v2)        */
/* -------------------------------------------------------------------------- */

const LATIN_DISPLAY = "'Plus Jakarta Sans','Inter',system-ui,-apple-system,sans-serif";
const LATIN_BODY = "'Inter','Plus Jakarta Sans',system-ui,-apple-system,sans-serif";

/* -------------------------------------------------------------------------- */
/* Script support for translated infographics                                  */
/* -------------------------------------------------------------------------- */

export type LangCode = 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'ml';

type Script = {
  /** Web font family prepended to the stack, and loaded by BaseLayout. */
  family: string;
  /** Average advance width of this script relative to Latin, used for wrapping. */
  width: number;
};

/**
 * Indic scripts are wider per character than Latin and use combining marks, so
 * the Latin wrap heuristic would overflow. The width factors below are
 * deliberately conservative — over-wrapping costs a line, under-wrapping clips
 * the text.
 */
const SCRIPTS: Record<LangCode, Script> = {
  en: { family: '', width: 1 },
  hi: { family: 'Noto Sans Devanagari', width: 1.24 },
  mr: { family: 'Noto Sans Devanagari', width: 1.24 },
  bn: { family: 'Noto Sans Bengali', width: 1.2 },
  ta: { family: 'Noto Sans Tamil', width: 1.18 },
  te: { family: 'Noto Sans Telugu', width: 1.2 },
  gu: { family: 'Noto Sans Gujarati', width: 1.2 },
  kn: { family: 'Noto Sans Kannada', width: 1.28 },
  ml: { family: 'Noto Sans Malayalam', width: 1.3 },
};

export const LANG_CODES = Object.keys(SCRIPTS) as LangCode[];

/**
 * Font family to request for a language. Empty for Latin, which is already
 * covered by the site's default stack.
 */
export const scriptFontFamily = (lang: string): string =>
  (SCRIPTS[lang as LangCode] ?? SCRIPTS.en).family;

/** Chrome strings that appear around the graphic rather than inside it. */
const UI_STRINGS: Record<LangCode, { viewAsData: string }> = {
  en: { viewAsData: 'View this infographic as data' },
  hi: { viewAsData: 'इस इन्फोग्राफ़िक को डेटा के रूप में देखें' },
  mr: { viewAsData: 'हा इन्फोग्राफिक डेटा म्हणून पहा' },
  bn: { viewAsData: 'এই ইনফোগ্রাফিকটি ডেটা হিসেবে দেখুন' },
  ta: { viewAsData: 'இந்த இன்ஃபோகிராஃபிக்கை தரவாகக் காண' },
  te: { viewAsData: 'ఈ ఇన్ఫోగ్రాఫిక్‌ను డేటాగా చూడండి' },
  gu: { viewAsData: 'આ ઇન્ફોગ્રાફિકને ડેટા તરીકે જુઓ' },
  kn: { viewAsData: 'ಈ ಇನ್ಫೋಗ್ರಾಫಿಕ್ ಅನ್ನು ಡೇಟಾವಾಗಿ ನೋಡಿ' },
  ml: { viewAsData: 'ഈ ഇൻഫോഗ്രാഫിക് ഡാറ്റയായി കാണുക' },
};

export const uiString = (lang: string, key: keyof typeof UI_STRINGS.en): string =>
  (UI_STRINGS[lang as LangCode] ?? UI_STRINGS.en)[key];

/**
 * Set for the duration of one render. Rendering is synchronous, so a module
 * scoped value stays correct and keeps the helper signatures simple.
 */
let SCRIPT: Script = SCRIPTS.en;

const FONT_DISPLAY = () =>
  SCRIPT.family ? `'${SCRIPT.family}','Plus Jakarta Sans',system-ui,sans-serif` : LATIN_DISPLAY;
const FONT_BODY = () =>
  SCRIPT.family ? `'${SCRIPT.family}','Inter',system-ui,sans-serif` : LATIN_BODY;

const C = {
  ink: '#0f172a',
  body: '#475569',
  muted: '#94a3b8',
  faint: '#cbd5e1',
  line: '#e2e8f0',
  lineSoft: '#f1f5f9',
  white: '#ffffff',

  blue: '#1e40af',
  blueMid: '#3b82f6',
  blueSoft: '#eff6ff',
  blueLine: '#bfdbfe',

  emerald: '#047857',
  emeraldMid: '#10b981',
  emeraldSoft: '#ecfdf5',
  emeraldLine: '#a7f3d0',

  amber: '#b45309',
  amberMid: '#f59e0b',
  amberSoft: '#fffbeb',
  amberLine: '#fde68a',

  red: '#b91c1c',
  redMid: '#ef4444',
  redSoft: '#fef2f2',
  redLine: '#fecaca',

  violet: '#5b21b6',
  violetSoft: '#f5f3ff',
  violetLine: '#ddd6fe',
} as const;

export type Tone = 'primary' | 'accent' | 'warn' | 'danger' | 'neutral' | 'violet';

type TonePalette = { fill: string; stroke: string; text: string; dot: string };

const TONES: Record<Tone, TonePalette> = {
  primary: { fill: C.blueSoft, stroke: C.blueLine, text: C.blue, dot: C.blueMid },
  accent: { fill: C.emeraldSoft, stroke: C.emeraldLine, text: C.emerald, dot: C.emeraldMid },
  warn: { fill: C.amberSoft, stroke: C.amberLine, text: C.amber, dot: C.amberMid },
  danger: { fill: C.redSoft, stroke: C.redLine, text: C.red, dot: C.redMid },
  violet: { fill: C.violetSoft, stroke: C.violetLine, text: C.violet, dot: '#8b5cf6' },
  neutral: { fill: '#f8fafc', stroke: C.line, text: C.body, dot: C.muted },
};

const tone = (t?: Tone): TonePalette => TONES[t ?? 'primary'];

/* -------------------------------------------------------------------------- */
/* Primitives                                                                  */
/* -------------------------------------------------------------------------- */

const W = 800;
const PAD = 30;
const CW = W - PAD * 2; // 740 content width

const esc = (s: string): string =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Approximate glyph width factor per font-size for the two brand faces. */
const charW = (size: number, bold = false) => size * (bold ? 0.575 : 0.535) * SCRIPT.width;

/**
 * Greedy word wrap. Returns lines that fit within `maxW` px at `size`px.
 * Handles the ₹ / Rs. tokens and hyphenated insurance jargon sensibly.
 */
function wrap(text: string, maxW: number, size: number, bold = false): string[] {
  const cw = charW(size, bold);
  const maxChars = Math.max(4, Math.floor(maxW / cw));
  const words = String(text).replace(/\s+/g, ' ').trim().split(' ');
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    // A single very long token gets hard-split rather than overflowing.
    if (word.length > maxChars) {
      let rest = word;
      while (rest.length > maxChars) {
        lines.push(rest.slice(0, maxChars - 1) + '-');
        rest = rest.slice(maxChars - 1);
      }
      line = rest;
    } else {
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

/** Multi-line text with tspan-based line breaks. `lh` = line height. */
function textBlock(
  x: number,
  y: number,
  lines: string[],
  opts: {
    size?: number;
    fill?: string;
    lh?: number;
    bold?: boolean;
    anchor?: 'start' | 'middle' | 'end';
    family?: string;
    opacity?: number;
  } = {},
): string {
  const size = opts.size ?? 13;
  const lh = opts.lh ?? size * 1.35;
  const anchor = opts.anchor ?? 'start';
  const ts = lines
    .map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lh}">${esc(l)}</tspan>`)
    .join('');
  return (
    `<text x="${x}" y="${y}" font-family="${opts.family ?? FONT_BODY()}" font-size="${size}"` +
    ` fill="${opts.fill ?? C.body}" font-weight="${opts.bold ? 700 : 400}"` +
    ` text-anchor="${anchor}"${opts.opacity != null ? ` opacity="${opts.opacity}"` : ''}>${ts}</text>`
  );
}

function roundRect(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string,
  stroke?: string,
  strokeW = 1,
  opacity = 1,
): string {
  const rr = Math.min(r, Math.min(w, h) / 2);
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rr}" ry="${rr}" fill="${fill}"` +
    (stroke ? ` stroke="${stroke}" stroke-width="${strokeW}"` : '') +
    (opacity !== 1 ? ` opacity="${opacity}"` : '') +
    `/>`
  );
}

/** Small filled circle + vertical connector, used by steps/ladder/timeline. */
function arrowDown(x: number, y: number, len: number, color = C.faint): string {
  return (
    `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + len - 5}" stroke="${color}" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M${x - 4} ${y + len - 6} L${x} ${y + len} L${x + 4} ${y + len - 6}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
  );
}

/* -------------------------------------------------------------------------- */
/* Spec types                                                                  */
/* -------------------------------------------------------------------------- */

export type Stat = {
  value: string;
  label: string;
  note?: string;
  tone?: Tone;
};

export type Bar = {
  label: string;
  /** Numeric magnitude used for bar length. */
  value: number;
  /** Optional override for the printed value (e.g. "10.8%"). */
  display?: string;
  note?: string;
  tone?: Tone;
};

export type TimelineItem = {
  marker: string;
  title: string;
  detail: string;
  tone?: Tone;
};

export type StepItem = {
  title: string;
  detail: string;
  tone?: Tone;
};

export type LadderItem = {
  tier: string;
  title: string;
  detail: string;
  meta?: string;
  tone?: Tone;
};

export type CompareRow = { label: string; left: string; right: string };

export type DonutItem = { label: string; value: number; tone?: Tone };

export type DecisionBranch = { condition: string; outcome: string; detail: string; tone?: Tone };

export type InfographicBlock =
  | { kind: 'stats'; heading?: string; items: Stat[]; columns?: 2 | 3 }
  | { kind: 'bars'; heading?: string; items: Bar[]; note?: string; max?: number }
  | { kind: 'timeline'; heading?: string; items: TimelineItem[]; note?: string }
  | { kind: 'steps'; heading?: string; items: StepItem[]; note?: string }
  | { kind: 'ladder'; heading?: string; items: LadderItem[]; note?: string }
  | {
      kind: 'compare';
      heading?: string;
      leftTitle: string;
      rightTitle: string;
      rows: CompareRow[];
      note?: string;
    }
  | {
      kind: 'donut';
      heading?: string;
      items: DonutItem[];
      centerValue?: string;
      centerLabel?: string;
      note?: string;
    }
  | { kind: 'decision'; heading?: string; question: string; branches: DecisionBranch[]; note?: string };

export type ArticleInfographic = {
  /** Blog post slug (blogs.json) or the slug of a standalone .astro page. */
  slug: string;
  /** Language of this spec. Defaults to 'en'. */
  lang?: LangCode;
  /** Small uppercase kicker, e.g. "Claim data". */
  eyebrow: string;
  title: string;
  /** Source / freshness line rendered under the title and repeated in the caption. */
  source?: string;
  /** Short plain-language summary — printed as figcaption (helps SEO + GEO). */
  summary?: string;
  blocks: InfographicBlock[];
  /**
   * Heading text (or substring) to insert the infographic before.
   * Falls back to inserting after the intro, before the first <h2>.
   */
  anchor?: string;
};

/* -------------------------------------------------------------------------- */
/* Block renderers                                                             */
/* -------------------------------------------------------------------------- */

function sectionHeading(x: number, y: number, heading: string): { svg: string; h: number } {
  return {
    svg: textBlock(x, y, wrap(heading, CW - 8, 15.5, true), {
      size: 15.5,
      bold: true,
      fill: C.ink,
      family: FONT_DISPLAY(),
      lh: 20,
    }),
    h: wrap(heading, CW - 8, 15.5, true).length * 20 + 14,
  };
}

/* ------------------------------- stats ------------------------------------ */

function statsBlock(x: number, y: number, b: Extract<InfographicBlock, { kind: 'stats' }>): { svg: string; h: number } {
  const cols = b.columns ?? (b.items.length % 3 === 0 && b.items.length > 3 ? 3 : 2);
  const gap = 12;
  const cardW = (CW - gap * (cols - 1)) / cols;
  const rows = Math.ceil(b.items.length / cols);
  const pad = 14;
  const TOP = 16;
  const VALUE_H = 30;
  const out: string[] = [];

  // Measure first so every card in a row can share one height — labels wrap
  // unpredictably, so a fixed card height would let long ones spill out.
  const m = b.items.map((item) => {
    const labelLines = wrap(item.label, cardW - pad * 2, 12.5);
    const noteLines = item.note ? wrap(item.note, cardW - pad * 2, 11) : [];
    const noteH = noteLines.length ? noteLines.length * 14 + 4 : 0;
    return { labelLines, noteLines, h: TOP + VALUE_H + 6 + labelLines.length * 16 + noteH + 16 };
  });

  const rowH: number[] = [];
  const rowY: number[] = [];
  let acc = y;
  for (let r = 0; r < rows; r++) {
    const h = Math.max(...m.slice(r * cols, r * cols + cols).map((v) => v.h));
    rowH.push(h);
    rowY.push(acc);
    acc += h + gap;
  }

  b.items.forEach((item, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const cx = x + c * (cardW + gap);
    const cy = rowY[r];
    const cardH = rowH[r];
    const p = tone(item.tone);
    const { labelLines, noteLines } = m[i];

    out.push(roundRect(cx, cy, cardW, cardH, 12, p.fill, p.stroke));
    out.push(
      textBlock(cx + pad, cy + TOP + 23, [item.value], {
        size: 27,
        bold: true,
        fill: p.text,
        family: FONT_DISPLAY(),
      }),
    );
    out.push(
      textBlock(cx + pad, cy + TOP + VALUE_H + 18, labelLines, {
        size: 12.5,
        fill: C.ink,
        bold: true,
        lh: 16,
      }),
    );
    if (item.note) {
      out.push(
        textBlock(cx + pad, cy + TOP + VALUE_H + 6 + labelLines.length * 16 + 15, noteLines, {
          size: 11,
          fill: C.muted,
          lh: 14,
        }),
      );
    }
  });

  return { svg: out.join(''), h: acc - gap - y };
}

/* -------------------------------- bars ------------------------------------ */

function barsBlock(x: number, y: number, b: Extract<InfographicBlock, { kind: 'bars' }>): { svg: string; h: number } {
  const rowH = 34;
  const barH = 17;
  const labelW = 196;
  const valueW = 66;
  const trackW = CW - labelW - valueW - 14;
  const max = b.max ?? Math.max(...b.items.map((i) => i.value), 1);
  const out: string[] = [];

  b.items.forEach((item, i) => {
    const ry = y + i * rowH;
    const p = tone(item.tone);
    const barW = Math.max(3, (item.value / max) * trackW);
    const labelLines = wrap(item.label, labelW - 10, 12);

    out.push(
      textBlock(x, ry + (labelLines.length > 1 ? 12 : 19), labelLines, {
        size: 12,
        bold: true,
        fill: C.ink,
        lh: 14,
      }),
    );
    out.push(roundRect(x + labelW, ry + 6, trackW, barH, 5, C.lineSoft));
    // Bar with a soft "shadow" tail for depth.
    out.push(roundRect(x + labelW, ry + 6, barW, barH, 5, p.dot));
    out.push(
      textBlock(x + labelW + trackW + 10, ry + 19, [item.display ?? `${item.value}`], {
        size: 12.5,
        bold: true,
        fill: p.text,
        family: FONT_DISPLAY(),
      }),
    );
  });

  const h = b.items.length * rowH;
  let extra = 0;
  if (b.note) {
    out.push(
      textBlock(x, y + h + 6, wrap(b.note, CW, 11), { size: 11, fill: C.muted, lh: 14 }),
    );
    extra = wrap(b.note, CW, 11).length * 14 + 6;
  }
  return { svg: out.join(''), h: h + extra };
}

/* ------------------------------ timeline ---------------------------------- */

function timelineBlock(
  x: number,
  y: number,
  b: Extract<InfographicBlock, { kind: 'timeline' }>,
): { svg: string; h: number } {
  const n = b.items.length;
  const slot = CW / n;
  const axisY = y + 46;
  const out: string[] = [];

  // Axis
  out.push(
    `<line x1="${x + slot / 2}" y1="${axisY}" x2="${x + CW - slot / 2}" y2="${axisY}" stroke="${C.line}" stroke-width="3" stroke-linecap="round"/>`,
  );

  // Detail lines drive the total height.
  const detailLines = b.items.map((i) => wrap(i.detail, slot - 18, 11.5));
  const maxDetail = Math.max(...detailLines.map((l) => l.length));

  b.items.forEach((item, i) => {
    const cx = x + slot / 2 + i * slot;
    const p = tone(item.tone);

    out.push(`<circle cx="${cx}" cy="${axisY}" r="9" fill="${C.white}" stroke="${p.dot}" stroke-width="4"/>`);
    // Marker above the axis
    out.push(
      textBlock(cx, y + 12, wrap(item.marker, slot - 16, 12, true), {
        size: 12,
        bold: true,
        fill: p.text,
        anchor: 'middle',
        family: FONT_DISPLAY(),
        lh: 15,
      }),
    );
    // Title below
    const titleLines = wrap(item.title, slot - 16, 12.5, true);
    out.push(
      textBlock(cx, axisY + 30, titleLines, {
        size: 12.5,
        bold: true,
        fill: C.ink,
        anchor: 'middle',
        lh: 16,
      }),
    );
    // Detail
    out.push(
      textBlock(cx, axisY + 32 + titleLines.length * 16, detailLines[i], {
        size: 11.5,
        fill: C.body,
        anchor: 'middle',
        lh: 14.5,
      }),
    );
  });

  const h = 46 + 30 + Math.max(...b.items.map((i) => wrap(i.title, slot - 16, 12.5, true).length)) * 16 + maxDetail * 14.5 + 10;
  let extra = 0;
  if (b.note) {
    out.push(textBlock(x, y + h, wrap(b.note, CW, 11), { size: 11, fill: C.muted, lh: 14 }));
    extra = wrap(b.note, CW, 11).length * 14 + 6;
  }
  return { svg: out.join(''), h: h + extra };
}

/* -------------------------------- steps ----------------------------------- */

function stepsBlock(x: number, y: number, b: Extract<InfographicBlock, { kind: 'steps' }>): { svg: string; h: number } {
  const out: string[] = [];
  const badge = 30;
  const gapY = 12;
  let cy = y;

  b.items.forEach((item, i) => {
    const p = tone(item.tone);
    // Card starts at x + badge + 14 and has 14px padding on each side.
    const detailMax = CW - badge - 14 - 28;
    const detailLines = wrap(item.detail, detailMax, 12.5);
    const titleLines = wrap(item.title, detailMax, 13.5, true);
    const bodyH = titleLines.length * 18 + detailLines.length * 16;
    const cardH = Math.max(badge + 20, bodyH + 24);

    // Numbered badge
    out.push(`<circle cx="${x + badge / 2}" cy="${cy + badge / 2}" r="${badge / 2}" fill="${p.dot}"/>`);
    out.push(
      `<text x="${x + badge / 2}" y="${cy + badge / 2 + 5}" font-family="${FONT_DISPLAY()}" font-size="14" font-weight="700" fill="${C.white}" text-anchor="middle">${i + 1}</text>`,
    );

    // Connector to the next step
    if (i < b.items.length - 1) {
      out.push(
        `<line x1="${x + badge / 2}" y1="${cy + badge + 4}" x2="${x + badge / 2}" y2="${cy + cardH + 2}" stroke="${C.line}" stroke-width="2" stroke-dasharray="3 3"/>`,
      );
    }

    out.push(roundRect(x + badge + 14, cy, CW - badge - 14, cardH, 11, p.fill, p.stroke));
    out.push(
      textBlock(x + badge + 28, cy + 24, titleLines, {
        size: 13.5,
        bold: true,
        fill: C.ink,
        family: FONT_DISPLAY(),
        lh: 18,
      }),
    );
    out.push(
      textBlock(x + badge + 28, cy + 26 + titleLines.length * 18, detailLines, {
        size: 12.5,
        fill: C.body,
        lh: 16,
      }),
    );

    cy += cardH + gapY;
  });

  let extra = 0;
  if (b.note) {
    out.push(textBlock(x, cy + 4, wrap(b.note, CW, 11), { size: 11, fill: C.muted, lh: 14 }));
    extra = wrap(b.note, CW, 11).length * 14 + 8;
  }
  return { svg: out.join(''), h: cy - y + extra };
}

/* -------------------------------- ladder ---------------------------------- */

function ladderBlock(x: number, y: number, b: Extract<InfographicBlock, { kind: 'ladder' }>): { svg: string; h: number } {
  const out: string[] = [];
  const gapY = 30;
  let cy = y;

  b.items.forEach((item, i) => {
    const p = tone(item.tone);
    const inset = (b.items.length - 1 - i) * 18; // bottom rung widest → escalation feel
    const cardX = x + inset / 2;
    const cardW = CW - inset;
    const metaW = item.meta ? 150 : 0;
    const detailMax = cardW - 96 - metaW - 24;

    const titleLines = wrap(item.title, detailMax, 13.5, true);
    const detailLines = wrap(item.detail, detailMax, 12);
    const cardH = Math.max(70, titleLines.length * 18 + detailLines.length * 15 + 30);

    if (i > 0) out.push(arrowDown(x + CW / 2, cy - gapY + 6, gapY - 6, C.faint));

    out.push(roundRect(cardX, cy, cardW, cardH, 12, p.fill, p.stroke));

    // Tier badge
    out.push(roundRect(cardX + 14, cy + 16, 62, 24, 7, C.white, p.stroke));
    out.push(
      `<text x="${cardX + 45}" y="${cy + 32}" font-family="${FONT_DISPLAY()}" font-size="11" font-weight="700" fill="${p.text}" text-anchor="middle">${esc(item.tier)}</text>`,
    );

    out.push(
      textBlock(cardX + 88, cy + 26, titleLines, {
        size: 13.5,
        bold: true,
        fill: C.ink,
        family: FONT_DISPLAY(),
        lh: 18,
      }),
    );
    out.push(
      textBlock(cardX + 88, cy + 28 + titleLines.length * 18, detailLines, {
        size: 12,
        fill: C.body,
        lh: 15,
      }),
    );

    if (item.meta) {
      out.push(
        `<line x1="${cardX + cardW - metaW - 12}" y1="${cy + 12}" x2="${cardX + cardW - metaW - 12}" y2="${cy + cardH - 12}" stroke="${p.stroke}" stroke-width="1"/>`,
      );
      const metaLines = wrap(item.meta, metaW - 22, 11.5, true);
      out.push(
        textBlock(cardX + cardW - metaW, cy + cardH / 2 - (metaLines.length - 1) * 7 + 4, metaLines, {
          size: 11.5,
          bold: true,
          fill: p.text,
          lh: 15,
        }),
      );
    }

    cy += cardH + gapY;
  });

  let extra = 0;
  if (b.note) {
    out.push(textBlock(x, cy - gapY + 12, wrap(b.note, CW, 11), { size: 11, fill: C.muted, lh: 14 }));
    extra = wrap(b.note, CW, 11).length * 14 + 8;
  }
  return { svg: out.join(''), h: cy - y - gapY + extra + 6 };
}

/* -------------------------------- compare ---------------------------------- */

function compareBlock(
  x: number,
  y: number,
  b: Extract<InfographicBlock, { kind: 'compare' }>,
): { svg: string; h: number } {
  const out: string[] = [];
  const labelW = 214;
  const colW = (CW - labelW) / 2;
  const headLines = Math.max(
    wrap(b.leftTitle, colW - 28, 13, true).length,
    wrap(b.rightTitle, colW - 32, 13, true).length,
  );
  const headH = Math.max(42, headLines * 16 + 22);
  const rowPad = 10;

  const CELL = colW - 32; // 16px padding each side of a data cell
  const rowHeights = b.rows.map((r) => {
    const l = wrap(r.left, CELL, 12).length;
    const rr = wrap(r.right, CELL, 12).length;
    return Math.max(l, rr) * 15 + rowPad * 2;
  });

  // Head
  out.push(roundRect(x, y, labelW, headH, 10, '#f8fafc', C.line));
  out.push(roundRect(x + labelW + 4, y, colW - 4, headH, 10, C.blueSoft, C.blueLine));
  out.push(roundRect(x + labelW + colW + 4, y, colW - 4, headH, 10, C.emeraldSoft, C.emeraldLine));
  out.push(
    `<text x="${x + labelW / 2}" y="${y + headH / 2 + 4}" font-family="${FONT_DISPLAY()}" font-size="11" font-weight="700" fill="${C.muted}" text-anchor="middle" letter-spacing="0.6">FACTOR</text>`,
  );
  out.push(
    textBlock(x + labelW + 4 + (colW - 4) / 2, y + headH / 2 + 5, wrap(b.leftTitle, colW - 28, 13, true), {
      size: 13,
      bold: true,
      fill: C.blue,
      anchor: 'middle',
      family: FONT_DISPLAY(),
      lh: 16,
    }),
  );
  out.push(
    textBlock(x + labelW + colW + 4 + (colW - 4) / 2, y + headH / 2 + 5, wrap(b.rightTitle, colW - 32, 13, true), {
      size: 13,
      bold: true,
      fill: C.emerald,
      anchor: 'middle',
      family: FONT_DISPLAY(),
      lh: 16,
    }),
  );

  let ry = y + headH + 6;
  b.rows.forEach((row, i) => {
    const rh = rowHeights[i];
    if (i % 2 === 0) out.push(roundRect(x, ry, CW, rh, 8, '#fbfcfe'));
    out.push(
      textBlock(x + 14, ry + 20, wrap(row.label, labelW - 28, 12.5, true), {
        size: 12.5,
        bold: true,
        fill: C.ink,
        lh: 15,
      }),
    );
    out.push(
      textBlock(x + labelW + 16, ry + 20, wrap(row.left, CELL, 12), {
        size: 12,
        fill: C.body,
        lh: 15,
      }),
    );
    out.push(
      `<line x1="${x + labelW + colW}" y1="${ry + 4}" x2="${x + labelW + colW}" y2="${ry + rh - 4}" stroke="${C.lineSoft}" stroke-width="1"/>`,
    );
    out.push(
      textBlock(x + labelW + colW + 16, ry + 20, wrap(row.right, CELL, 12), {
        size: 12,
        fill: C.body,
        lh: 15,
      }),
    );
    ry += rh;
  });

  let extra = 0;
  if (b.note) {
    out.push(textBlock(x, ry + 14, wrap(b.note, CW, 11), { size: 11, fill: C.muted, lh: 14 }));
    extra = wrap(b.note, CW, 11).length * 14 + 10;
  }
  return { svg: out.join(''), h: ry - y + extra };
}

/* --------------------------------- donut ----------------------------------- */

function donutBlock(x: number, y: number, b: Extract<InfographicBlock, { kind: 'donut' }>): { svg: string; h: number } {
  const out: string[] = [];
  const total = b.items.reduce((s, i) => s + i.value, 0) || 1;
  const R = 88;
  const r = 54;
  const cx = x + R + 6;
  const cy = y + R + 6;
  const legendX = x + R * 2 + 40;
  const legendW = CW - (legendX - x);

  let angle = -Math.PI / 2;
  b.items.forEach((item) => {
    const p = tone(item.tone);
    const sweep = (item.value / total) * Math.PI * 2;
    const end = angle + sweep;
    const large = sweep > Math.PI ? 1 : 0;
    const x1 = cx + R * Math.cos(angle);
    const y1 = cy + R * Math.sin(angle);
    const x2 = cx + R * Math.cos(end);
    const y2 = cy + R * Math.sin(end);
    const x3 = cx + r * Math.cos(end);
    const y3 = cy + r * Math.sin(end);
    const x4 = cx + r * Math.cos(angle);
    const y4 = cy + r * Math.sin(angle);
    // Guard the degenerate full-circle case (single slice).
    if (b.items.length === 1) {
      out.push(`<circle cx="${cx}" cy="${cy}" r="${(R + r) / 2}" fill="none" stroke="${p.dot}" stroke-width="${R - r}"/>`);
    } else {
      out.push(
        `<path d="M${x1} ${y1} A${R} ${R} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${r} ${r} 0 ${large} 0 ${x4} ${y4} Z" fill="${p.dot}" stroke="${C.white}" stroke-width="2"/>`,
      );
    }
    angle = end;
  });

  if (b.centerValue) {
    out.push(
      `<text x="${cx}" y="${cy + 2}" font-family="${FONT_DISPLAY()}" font-size="24" font-weight="700" fill="${C.ink}" text-anchor="middle">${esc(b.centerValue)}</text>`,
    );
  }
  if (b.centerLabel) {
    out.push(
      textBlock(cx, cy + 22, wrap(b.centerLabel, (R - r) * 2 + 40, 10.5), {
        size: 10.5,
        fill: C.muted,
        anchor: 'middle',
        lh: 13,
      }),
    );
  }

  // Legend
  let ly = y + 12;
  b.items.forEach((item) => {
    const p = tone(item.tone);
    const pct = `${Math.round((item.value / total) * 100)}%`;
    out.push(`<rect x="${legendX}" y="${ly - 8}" width="11" height="11" rx="3" fill="${p.dot}"/>`);
    out.push(
      `<text x="${legendX + 20}" y="${ly + 1}" font-family="${FONT_BODY()}" font-size="12" font-weight="600" fill="${C.ink}">${esc(item.label)}</text>`,
    );
    out.push(
      `<text x="${legendX + legendW}" y="${ly + 1}" font-family="${FONT_DISPLAY()}" font-size="12.5" font-weight="700" fill="${p.text}" text-anchor="end">${pct}</text>`,
    );
    ly += 30;
  });

  const h = Math.max(R * 2 + 12, (b.items.length - 1) * 30 + 22);
  let extra = 0;
  if (b.note) {
    out.push(textBlock(x, y + h + 4, wrap(b.note, CW, 11), { size: 11, fill: C.muted, lh: 14 }));
    extra = wrap(b.note, CW, 11).length * 14 + 8;
  }
  return { svg: out.join(''), h: h + extra };
}

/* -------------------------------- decision --------------------------------- */

function decisionBlock(
  x: number,
  y: number,
  b: Extract<InfographicBlock, { kind: 'decision' }>,
): { svg: string; h: number } {
  const out: string[] = [];
  const qLines = wrap(b.question, CW - 40, 13.5, true);
  const qH = qLines.length * 18 + 26;

  out.push(roundRect(x, y, CW, qH, 12, C.blueSoft, C.blueLine));
  out.push(
    textBlock(x + 20, y + 26, qLines, { size: 13.5, bold: true, fill: C.blue, lh: 18, family: FONT_DISPLAY() }),
  );

  let cy = y + qH + 24;
  const n = b.branches.length;
  const gap = 14;
  const cardW = (CW - gap * (n - 1)) / n;

  // Connector rail from the question box down to the branches.
  const railY = y + qH;
  out.push(
    `<line x1="${x + CW / 2}" y1="${railY}" x2="${x + CW / 2}" y2="${cy - 8}" stroke="${C.faint}" stroke-width="2"/>`,
    `<line x1="${x + cardW / 2}" y1="${cy - 8}" x2="${x + CW - cardW / 2}" y2="${cy - 8}" stroke="${C.faint}" stroke-width="2"/>`,
  );

  let maxH = 0;
  b.branches.forEach((br, i) => {
    const p = tone(br.tone);
    const bx = x + i * (cardW + gap);
    const condLines = wrap(br.condition, cardW - 28, 11.5, true);
    const outLines = wrap(br.outcome, cardW - 28, 13, true);
    const detLines = wrap(br.detail, cardW - 28, 11.5);
    const cardH = Math.max(96, condLines.length * 15 + outLines.length * 17 + detLines.length * 14 + 44);
    maxH = Math.max(maxH, cardH);

    out.push(`<line x1="${bx + cardW / 2}" y1="${cy - 8}" x2="${bx + cardW / 2}" y2="${cy}" stroke="${C.faint}" stroke-width="2"/>`);
    out.push(roundRect(bx, cy, cardW, cardH, 12, p.fill, p.stroke));
    out.push(
      textBlock(bx + 14, cy + 22, condLines, { size: 11.5, bold: true, fill: p.text, lh: 15 }),
    );
    out.push(
      `<line x1="${bx + 14}" y1="${cy + 24 + condLines.length * 15}" x2="${bx + cardW - 14}" y2="${cy + 24 + condLines.length * 15}" stroke="${p.stroke}" stroke-width="1"/>`,
    );
    out.push(
      textBlock(bx + 14, cy + 42 + condLines.length * 15, outLines, {
        size: 13,
        bold: true,
        fill: C.ink,
        lh: 17,
        family: FONT_DISPLAY(),
      }),
    );
    out.push(
      textBlock(bx + 14, cy + 46 + condLines.length * 15 + outLines.length * 17, detLines, {
        size: 11.5,
        fill: C.body,
        lh: 14,
      }),
    );
  });

  cy += maxH;
  let extra = 0;
  if (b.note) {
    out.push(textBlock(x, cy + 14, wrap(b.note, CW, 11), { size: 11, fill: C.muted, lh: 14 }));
    extra = wrap(b.note, CW, 11).length * 14 + 10;
  }
  return { svg: out.join(''), h: cy - y + extra };
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                  */
/* -------------------------------------------------------------------------- */

export type { ArticleInfographic as Spec };

/**
 * Render an article infographic spec into a self-contained, responsive inline
 * <svg> string (plus nothing else — the caller wraps it in a <figure>).
 */
export function renderInfographicSvg(
  spec: ArticleInfographic,
  lang: string = spec.lang ?? 'en',
): { svg: string; height: number } {
  SCRIPT = SCRIPTS[lang as LangCode] ?? SCRIPTS.en;

  const out: string[] = [];
  let y = PAD;

  // ---- Card frame -----------------------------------------------------------
  // Height is unknown until blocks are laid out, so we render the body first and
  // paint the frame behind it at the end.
  const body: string[] = [];
  let by = PAD + 22;

  // Eyebrow + title
  body.push(
    `<text x="${PAD}" y="${by}" font-family="${FONT_DISPLAY()}" font-size="10.5" font-weight="700" fill="${C.blueMid}" letter-spacing="1.4">${esc(spec.eyebrow.toUpperCase())}</text>`,
  );
  by += 24;
  const titleLines = wrap(spec.title, CW - 30, 19.5, true);
  body.push(
    textBlock(PAD, by, titleLines, { size: 19.5, bold: true, fill: C.ink, family: FONT_DISPLAY(), lh: 25 }),
  );
  by += titleLines.length * 25 - 4;

  if (spec.source) {
    body.push(
      textBlock(PAD, by + 10, wrap(spec.source, CW - 30, 11), { size: 11, fill: C.muted, lh: 14 }),
    );
    by += wrap(spec.source, CW - 30, 11).length * 14 + 6;
  }
  by += 16;

  // ---- Blocks ---------------------------------------------------------------
  spec.blocks.forEach((block, idx) => {
    if (idx > 0) by += 26;

    if (block.heading) {
      const head = sectionHeading(PAD, by + 4, block.heading);
      body.push(head.svg);
      by += head.h;
    }

    let res: { svg: string; h: number };
    switch (block.kind) {
      case 'stats':
        res = statsBlock(PAD, by, block);
        break;
      case 'bars':
        res = barsBlock(PAD, by, block);
        break;
      case 'timeline':
        res = timelineBlock(PAD, by, block);
        break;
      case 'steps':
        res = stepsBlock(PAD, by, block);
        break;
      case 'ladder':
        res = ladderBlock(PAD, by, block);
        break;
      case 'compare':
        res = compareBlock(PAD, by, block);
        break;
      case 'donut':
        res = donutBlock(PAD, by, block);
        break;
      case 'decision':
        res = decisionBlock(PAD, by, block);
        break;
      default:
        res = { svg: '', h: 0 };
    }
    body.push(res.svg);
    by += res.h;
  });

  const height = Math.ceil(by + PAD);

  // ---- Frame (painted first) ------------------------------------------------
  const key = `${slugKey(spec.slug)}-${lang}`;
  out.push(
    `<defs><linearGradient id="ig-${key}-g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#f8fafc"/></linearGradient></defs>`,
  );
  out.push(roundRect(1, 1, W - 2, height - 2, 16, `url(#ig-${key}-g)`, C.line, 1));
  // Accent bar on the left edge
  out.push(
    `<path d="M1 17 L1 ${height - 17} A16 16 0 0 1 17 1 L17 1 L17 ${height - 1} L17 1 Z" fill="none"/>`,
  );
  out.push(roundRect(1, 1, 5, height - 2, 4, C.blueMid, undefined, 0, 0.9));

  out.push(body.join(''));

  const label = `${spec.title}${spec.source ? `. Source: ${spec.source}` : ''}`;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}" width="100%" height="auto"` +
    ` lang="${lang}" role="img" aria-labelledby="ig-t-${key}" preserveAspectRatio="xMidYMid meet"` +
    ` style="display:block;width:100%;height:auto;font-synthesis:none">` +
    `<title id="ig-t-${key}">${esc(label)}</title>` +
    out.join('') +
    `</svg>`;

  return { svg, height };
}

function slugKey(slug: string): string {
  return slug.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 48);
}

/* -------------------------------------------------------------------------- */
/* Article injection helpers                                                   */
/* -------------------------------------------------------------------------- */

type Heading = { level: number; text: string; index: number; end: number };

const stripTags = (s: string) => s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

/** Every <h1>–<h6> in the rendered article HTML, in document order. */
function findHeadings(html: string): Heading[] {
  const re = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const out: Heading[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    out.push({ level: Number(m[1]), text: stripTags(m[2]), index: m.index, end: m.index + m[0].length });
  }
  return out;
}

/**
 * Choose the split point for the infographic and cut the article HTML there.
 *
 * Priority:
 *  1. The first heading whose text contains `anchor` (case-insensitive).
 *  2. The first h2 that appears after at least 250 characters of prose — most
 *     posts open with an <h2> restating the title, which we want to skip.
 *  3. The second heading, if there is one.
 *  4. The very top of the article.
 *
 * Only ever cuts at a top-level heading boundary, so it can never land inside a
 * table, list or code block.
 */
export function splitAtHeading(html: string, anchor?: string): { before: string; after: string } {
  const headings = findHeadings(html);
  if (headings.length === 0) return { before: html, after: '' };

  let cut = -1;

  if (anchor) {
    const needle = anchor.toLowerCase();
    const hit = headings.find((h) => h.text.toLowerCase().includes(needle));
    if (hit) cut = hit.index;
  }

  if (cut < 0) {
    const late = headings.find((h) => h.level <= 3 && h.index >= 250);
    if (late) cut = late.index;
  }

  if (cut < 0 && headings.length > 1) cut = headings[1].index;
  if (cut < 0) cut = headings[0].index;

  return { before: html.slice(0, cut), after: html.slice(cut) };
}
