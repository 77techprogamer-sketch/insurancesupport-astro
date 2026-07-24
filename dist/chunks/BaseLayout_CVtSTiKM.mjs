import { b as createAstro, c as createComponent, a as renderTemplate, e as renderSlot, f as renderHead, d as addAttribute } from './astro/server_D4avlH1o.mjs';
import 'kleur/colors';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://insurancesupport.online");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description = "Insurance Support by Hari Kotian \u2014 IRDAI-certified insurance advisor. 25+ years of expertise in life, health, motor & all insurance types. Claim recovery experts." } = Astro2.props;
  const siteName = "Insurance Support - Hari Kotian";
  const siteUrl = "https://insurancesupport.online";
  const ogImage = `${siteUrl}/og-default.png`;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="title"', '><meta name="description"', '><meta name="keywords" content="insurance advisor Bengaluru, IRDAI certified insurance agent, life insurance India, health insurance advisor, motor insurance, claim settlement expert, Hari Kotian insurance"><meta name="author" content="Hari Kotian"><meta name="robots" content="index, follow"><link rel="canonical"', '><meta name="geo.region" content="IN-KA"><meta name="geo.placename" content="Bengaluru"><meta name="geo.position" content="13.0159;77.5522"><meta name="ICBM" content="13.0159, 77.5522"><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:site_name"', '><meta property="og:locale" content="en_IN"><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><meta name="google-site-verification" content="V1MQKb60VcWmP7f4u2x7yN1zR5aJ9bL0kD"><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"><script async src="https://www.googletagmanager.com/gtag/js?id=G-JP67H399V2"><\/script>', '</head> <body class="font-inter antialiased"> ', ' <script src="/scripts/reveal.js"><\/script> </body> </html>'])), title ? `${title} | ${siteName}` : `${siteName} \u2014 IRDAI Certified Insurance Advisor in Bengaluru`, addAttribute(title ? `${title} | ${siteName}` : `${siteName} \u2014 IRDAI Certified Insurance Advisor in Bengaluru`, "content"), addAttribute(description, "content"), addAttribute(Astro2.url.href, "href"), addAttribute(Astro2.url.href, "content"), addAttribute(title ? `${title} | ${siteName}` : siteName, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(siteName, "content"), addAttribute(Astro2.url.href, "content"), addAttribute(title ? `${title} | ${siteName}` : siteName, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "D:/insurancesupport-astro/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
