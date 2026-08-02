import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const rootAbs = 'D:/insurancesupport-astro';
const blogsPath = path.join(rootAbs, 'src', 'data', 'blogs.json');
const outputDir = path.join(rootAbs, 'public', 'images', 'og');

// Ensure output directory exists
fs.mkdirSync(outputDir, { recursive: true });

// Read blog posts
const posts = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));

console.log(`Generating OG images for ${posts.length} blog posts...\n`);

// Helper: wrap text into multiple lines that fit within a width
function wrapText(text, maxCharsPerLine) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Pick a gradient based on category
function pickGradient(categories) {
  const cat = (categories && categories.length > 0 ? categories[0] : '').toLowerCase();
  if (cat.includes('health')) return ['#0f766e', '#134e4a']; // teal
  if (cat.includes('motor') || cat.includes('car') || cat.includes('bike')) return ['#1e40af', '#1e3a5f']; // blue
  if (cat.includes('lic') || cat.includes('life')) return ['#854d0e', '#451a03']; // amber/brown
  if (cat.includes('irdai') || cat.includes('regulatory') || cat.includes('claim')) return ['#6d28d9', '#2e1065']; // purple
  if (cat.includes('tax') || cat.includes('financial') || cat.includes('investment')) return ['#047857', '#064e3b']; // green
  if (cat.includes('travel')) return ['#0369a1', '#082f49']; // sky blue
  if (cat.includes('critical')) return ['#be123c', '#4c0519']; // rose
  if (cat.includes('senior') || cat.includes('parent')) return ['#9d174d', '#4a0424']; // pink
  // default — professional navy gradient
  return ['#1e293b', '#0f172a'];
}

function generateSvg(title, categories) {
  const [color1, color2] = pickGradient(categories);
  const maxChars = 42;
  const lines = wrapText(title, maxChars);
  const lineCount = Math.min(lines.length, 6);
  const baseY = 200;
  const lineHeight = 70;
  const fontSize = 48;
  const smallFontSize = 24;

  let textElements = '';
  let yPos = baseY;
  lines.slice(0, 6).forEach((line, i) => {
    textElements += `<text x="60" y="${yPos}" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="800" fill="#ffffff">${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\x22/g, '&quot;')}</text>\n`;
    yPos += lineHeight;
  });

  const badge = categories && categories.length > 0 ? categories[0] : 'Insurance';
  const badgeSvg = `
    <rect x="60" y="80" rx="6" ry="6" width="${badge.length * 11 + 24}" height="32" fill="rgba(255,255,255,0.15)" />
    <text x="${60 + 12}" y="${101}" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#fbbf24" text-anchor="start">${badge}</text>
  `;

  const siteText = 'InsuranceSupport.Online';
  const siteX = 60;
  const siteY = 560;

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1}" />
      <stop offset="100%" style="stop-color:${color2}" />
    </linearGradient>
    <radialGradient id="glow1" cx="0%" cy="0%" r="70%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.08)" />
      <stop offset="100%" style="stop-color:transparent" />
    </radialGradient>
    <radialGradient id="glow2" cx="100%" cy="100%" r="60%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.05)" />
      <stop offset="100%" style="stop-color:transparent" />
    </radialGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f59e0b" />
      <stop offset="100%" style="stop-color:#f97316" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />

  <!-- Decorative orbs -->
  <rect width="1200" height="630" fill="url(#glow1)" />
  <rect width="1200" height="630" fill="url(#glow2)" />

  <!-- Accent bar at top -->
  <rect x="0" y="0" width="1200" height="6" fill="url(#accent)" />

  <!-- Category badge -->
  ${badgeSvg}

  <!-- Title -->
  ${textElements}

  <!-- Bottom bar with site info -->
  <line x1="60" y1="520" x2="1140" y2="520" stroke="rgba(255,255,255,0.1)" stroke-width="1" />

  <!-- Site name -->
  <text x="60" y="${siteY}" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${smallFontSize}" font-weight="700" fill="#fbbf24">${siteText}</text>
  <text x="${60 + siteText.length * 14 + 40}" y="${siteY}" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${smallFontSize - 4}" fill="rgba(255,255,255,0.4)">IRDAI Reg: 0149161D</text>
</svg>`;

  return svg;
}

// Track stats
let generated = 0;
let errors = 0;

// Generate images
for (const post of posts) {
  const slug = post.slug;
  const title = post.title;
  const categories = post.categories || [];

  const safeSlug = slug.replace(/[/\\?%*:|"<>]/g, '-');
  const outputPath = path.join(outputDir, `${safeSlug}.png`);

  if (fs.existsSync(outputPath)) {
    console.log(`SKIP  ${slug} (already exists)`);
    continue;
  }

  try {
    const svg = generateSvg(title, categories);
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);
    console.log(`OK    ${slug} → images/og/${safeSlug}.png`);
    generated++;
  } catch (err) {
    console.error(`FAIL  ${slug} — ${err.message}`);
    errors++;
  }
}

console.log(`\n=== Done! Generated: ${generated}, Skipped: ${posts.length - generated - errors}, Errors: ${errors} ===`);