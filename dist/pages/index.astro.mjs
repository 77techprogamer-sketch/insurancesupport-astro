/* empty css                                 */
import { c as createComponent, a as renderTemplate, u as unescapeHTML, r as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_D4avlH1o.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CVtSTiKM.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import 'clsx';
export { renderers } from '../renderers.mjs';

function AnimatedHero() {
  return /* @__PURE__ */ jsxs("section", { class: "hero-gradient min-h-[85vh] flex items-center relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { class: "absolute top-1/4 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" }),
    /* @__PURE__ */ jsx("div", { class: "absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] animate-pulse", style: "animation-delay: 1s" }),
    /* @__PURE__ */ jsx("div", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/5 via-transparent to-amber-500/5 rounded-full blur-[200px]" }),
    /* @__PURE__ */ jsx("div", { class: "relative z-10 w-full max-w-7xl mx-auto px-4 py-20", children: /* @__PURE__ */ jsxs("div", { class: "flex flex-col lg:flex-row items-center gap-12", children: [
      /* @__PURE__ */ jsxs("div", { class: "w-full lg:w-3/5 text-center lg:text-left", children: [
        /* @__PURE__ */ jsxs("div", { class: "flex flex-wrap justify-center lg:justify-start gap-3 mb-6 reveal", children: [
          /* @__PURE__ */ jsxs("span", { class: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-amber-300 backdrop-blur-md", children: [
            /* @__PURE__ */ jsx("svg", { class: "w-4 h-4 fill-amber-400", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }),
            "Insurance Concierge & Claim Expert"
          ] }),
          /* @__PURE__ */ jsxs("span", { class: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-300 backdrop-blur-md", children: [
            /* @__PURE__ */ jsx("svg", { class: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }),
            "IRDAI Certified | Reg: 0149161D"
          ] })
        ] }),
        /* @__PURE__ */ jsx("h1", { class: "text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-6 reveal", style: "transition-delay: 0.1s", children: /* @__PURE__ */ jsx("span", { class: "text-gradient-hero", children: "India's #1 Claim Rejection Recovery Experts — 25 Years of Trust" }) }),
        /* @__PURE__ */ jsx("p", { class: "text-lg md:text-xl text-blue-200/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed reveal", style: "transition-delay: 0.2s", children: "Has your insurance claim been rejected? We've helped thousands of families recover their rightful claims. Free consultation, no obligation." }),
        /* @__PURE__ */ jsxs("div", { class: "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start reveal", style: "transition-delay: 0.3s", children: [
          /* @__PURE__ */ jsxs("a", { href: "/contact", class: "group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-full text-lg shadow-[0_8px_30px_-8px_rgba(251,191,36,0.5)] hover:shadow-[0_12px_40px_-8px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 btn-glow", children: [
            "Request Free Case Assessment",
            /* @__PURE__ */ jsx("svg", { class: "w-5 h-5 group-hover:translate-x-1 transition-transform", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "tel:+919986634506", class: "inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 backdrop-blur-sm transition-all", children: [
            /* @__PURE__ */ jsx("svg", { class: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
            "+91-99866 34506"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { class: "flex items-center gap-3 mt-8 justify-center lg:justify-start reveal", style: "transition-delay: 0.4s", children: [
          /* @__PURE__ */ jsxs("div", { class: "relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg", children: [
            "HK",
            /* @__PURE__ */ jsx("span", { class: "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" })
          ] }),
          /* @__PURE__ */ jsxs("div", { class: "text-left", children: [
            /* @__PURE__ */ jsx("p", { class: "text-sm font-bold text-white", children: "Hari Kotian" }),
            /* @__PURE__ */ jsx("p", { class: "text-xs text-blue-200", children: "IRDAI Certified Advisor • 25+ Years" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { class: "w-full lg:w-2/5 reveal-right", style: "transition-delay: 0.3s", children: /* @__PURE__ */ jsxs("div", { class: "relative", children: [
        /* @__PURE__ */ jsxs("div", { class: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { class: "text-center mb-6", children: [
            /* @__PURE__ */ jsx("div", { class: "text-5xl font-extrabold text-amber-400", children: "₹50+ Cr" }),
            /* @__PURE__ */ jsx("div", { class: "text-sm text-blue-200", children: "Claims Successfully Recovered" })
          ] }),
          /* @__PURE__ */ jsxs("div", { class: "grid grid-cols-2 gap-6 text-center", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { class: "text-3xl font-bold text-white", children: "25+" }),
              /* @__PURE__ */ jsx("div", { class: "text-xs text-blue-300", children: "Years Experience" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { class: "text-3xl font-bold text-white", children: "1000+" }),
              /* @__PURE__ */ jsx("div", { class: "text-xs text-blue-300", children: "Families Served" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { class: "absolute -top-4 -right-4 w-20 h-20 bg-amber-500/20 rounded-full blur-xl animate-pulse" }),
        /* @__PURE__ */ jsx("div", { class: "absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse", style: "animation-delay: 1s" })
      ] }) })
    ] }) })
  ] });
}

const items = [
  { end: 25, suffix: "+", label: "Years Experience" },
  { end: 1e3, suffix: "+", label: "Happy Families" },
  { end: 50, suffix: " Cr+", label: "Claims Recovered" },
  { end: 4, suffix: ".2★", label: "Google Rating" }
];
function AnimatedNum({ end, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 2e3;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1);
          setVal(Math.floor(Math.pow(t, 0.5) * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);
  return /* @__PURE__ */ jsxs("span", { ref, children: [
    val,
    suffix
  ] });
}
function TrustCounterBar() {
  return /* @__PURE__ */ jsx("section", { class: "bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12", children: /* @__PURE__ */ jsx("div", { class: "max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsx("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-8 text-center", children: items.map((item, i) => /* @__PURE__ */ jsxs("div", { class: "reveal", style: { transitionDelay: `${i * 0.1}s` }, children: [
    /* @__PURE__ */ jsx("div", { class: "text-3xl md:text-4xl font-extrabold text-amber-400 counter-value", children: /* @__PURE__ */ jsx(AnimatedNum, { end: item.end, suffix: item.suffix }) }),
    /* @__PURE__ */ jsx("div", { class: "text-sm text-blue-200/80 mt-1 font-medium", children: item.label })
  ] }, i)) }) }) });
}

const services = [
  { title: "Life Insurance", desc: "Protect your family's future with comprehensive life plans. Term, endowment, ULIP options.", icon: "♥", color: "from-rose-500 to-pink-600", bg: "bg-rose-50", text: "text-rose-600", href: "/services/life-insurance" },
  { title: "Health Insurance", desc: "Cashless hospitalization, pre-existing coverage, senior citizen plans, family floater options.", icon: "✚", color: "from-emerald-500 to-green-600", bg: "bg-emerald-50", text: "text-emerald-600", href: "/services/health-insurance" },
  { title: "Term Insurance", desc: "Highest coverage at lowest premiums. Secure your family's future with ₹1 Cr+ cover.", icon: "🛡", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50", text: "text-blue-600", href: "/services/term-insurance" },
  { title: "Motor Insurance", desc: "Car & bike insurance — comprehensive, third-party, zero depreciation add-ons, NCB protection.", icon: "🚗", color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-600", href: "/services/motor-insurance" },
  { title: "Claim Recovery", desc: "Rejected claims overturned. 95% success rate. LIC, health, motor — we fight for your money.", icon: "✓", color: "from-purple-500 to-violet-600", bg: "bg-purple-50", text: "text-purple-600", href: "/support" },
  { title: "Policy Review", desc: "Free audit of your existing portfolio. Identify gaps, overpayment, and better options.", icon: "📋", color: "from-cyan-500 to-teal-600", bg: "bg-cyan-50", text: "text-cyan-600", href: "/contact" }
];
function ServicesGrid() {
  return /* @__PURE__ */ jsx("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children", children: services.map((s, i) => /* @__PURE__ */ jsxs("a", { href: s.href, class: "group block bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 card-tilt reveal", style: { transitionDelay: `${i * 0.08}s` }, children: [
    /* @__PURE__ */ jsx("div", { class: `w-14 h-14 ${s.bg} ${s.text} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`, children: s.icon }),
    /* @__PURE__ */ jsx("h3", { class: "text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors", children: s.title }),
    /* @__PURE__ */ jsx("p", { class: "text-sm text-slate-600 leading-relaxed", children: s.desc })
  ] }, i)) });
}

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Bengaluru",
    text: "Hari Kotian helped me recover a rejected claim of ₹8 Lakhs. His team handled everything — from documentation to follow-ups with the insurer. Absolutely professional!",
    rating: 5
  },
  {
    name: "Sumantha Malu",
    location: "Whitefield, Bengaluru",
    text: "Excellent service for our two-wheeler insurance. The claim process was quick and hassle-free. Highly recommended for anyone in need of genuine insurance advice.",
    rating: 5
  },
  {
    name: "Priya Agarwal",
    location: "Electronic City, Bengaluru",
    text: "The term insurance plan I got is perfect for my family. Premium is affordable and coverage is comprehensive. The annual review system keeps our portfolio updated.",
    rating: 5
  },
  {
    name: "Venkatesh S.",
    location: "Hyderabad",
    text: "Outstanding support for my father's LIC maturity claim. We had lost the original policy bond, but Hari helped us navigate the process smoothly.",
    rating: 5
  }
];
function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);
  const t = testimonials[current];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      class: "relative max-w-2xl mx-auto",
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      children: [
        /* @__PURE__ */ jsxs("div", { class: "bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-slate-100 card-hover", children: [
          /* @__PURE__ */ jsx("div", { class: "flex gap-1 mb-5", children: Array.from({ length: t.rating }).map((_, i) => /* @__PURE__ */ jsx("svg", { class: "w-5 h-5 text-amber-400 fill-current", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, i)) }),
          /* @__PURE__ */ jsxs("p", { class: "text-lg text-slate-700 leading-relaxed mb-8 italic", children: [
            '"',
            t.text,
            '"'
          ] }),
          /* @__PURE__ */ jsxs("div", { class: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { class: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm", children: t.name.split(" ").map((n) => n[0]).join("") }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { class: "font-semibold text-slate-900", children: t.name }),
              /* @__PURE__ */ jsx("p", { class: "text-sm text-slate-500", children: t.location })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { class: "flex justify-center gap-2 mt-6", children: testimonials.map((_, i) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrent(i),
            class: `w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-blue-600 w-8" : "bg-slate-300 hover:bg-slate-400"}`,
            "aria-label": `Go to testimonial ${i + 1}`
          },
          i
        )) })
      ]
    }
  );
}

function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsx("div", { class: `fixed bottom-6 right-6 z-50 transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`, children: /* @__PURE__ */ jsxs(
    "a",
    {
      href: "/contact",
      class: "flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 btn-glow",
      children: [
        /* @__PURE__ */ jsx("svg", { class: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
        "Book Free Consultation"
      ]
    }
  ) });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$LocalBusinessJsonLd = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Insurance Support - Hari Kotian",
    "description": "LIC Policy Advisor and Claim Recovery Expert in Bangalore. 25+ years experience, IRDAI certified.",
    "url": "https://insurancesupport.online",
    "telephone": "+91-9986634506",
    "email": "contact@insurancesupport.online",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bahubali Nagar, Jalahalli",
      "addressLocality": "Bengaluru",
      "addressRegion": "KA",
      "postalCode": "560013",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0159,
      "longitude": 77.5522
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": ["https://share.google/2Cbcq7l39kTWJl2Dm"],
    "priceRange": "\u20B9\u20B9",
    "irdaiRegistrationNumber": "0149161D"
  })));
}, "D:/insurancesupport-astro/src/components/LocalBusinessJsonLd.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "IRDAI Certified Insurance Advisor in Bengaluru | Hari Kotian", "description": "25+ years experience IRDAI certified insurance advisor. Free consultation for life, health, motor, term & all insurance types. Claim recovery expert." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LocalBusinessJsonLd", $$LocalBusinessJsonLd, {})} ${maybeRenderHead()}<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>  <div class="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-100"> <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between"> <div class="flex items-center gap-3"> <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">IS</div> <div class="font-bold text-slate-900">Insurance<span class="text-blue-600">Support</span></div> </div> <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"> <a href="/" class="hover:text-blue-600 transition-colors">Home</a> <a href="/services" class="hover:text-blue-600 transition-colors">Services</a> <a href="/locations" class="hover:text-blue-600 transition-colors">Locations</a> <a href="/blog" class="hover:text-blue-600 transition-colors">Blog</a> <a href="/faq" class="hover:text-blue-600 transition-colors">FAQ</a> <a href="/contact" class="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 rounded-full font-bold hover:shadow-lg transition-all btn-glow">Get Help</a> </nav> </div> </div> <main id="main-content" class="page-transition"> <!-- HERO --> ${renderComponent($$result2, "AnimatedHero", AnimatedHero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/insurancesupport-astro/src/components/AnimatedHero", "client:component-export": "default" })} <!-- TRUST BAR --> ${renderComponent($$result2, "TrustCounterBar", TrustCounterBar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/insurancesupport-astro/src/components/TrustCounterBar", "client:component-export": "default" })} <!-- SERVICES --> <section class="py-20 lg:py-28 bg-white" id="services"> <div class="max-w-7xl mx-auto px-4"> <div class="text-center mb-16 reveal"> <span class="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4">Our Services</span> <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Comprehensive Insurance Solutions</h2> <p class="text-lg text-slate-600 max-w-2xl mx-auto">From claim recovery to new policies — we handle every aspect of your insurance needs.</p> </div> ${renderComponent($$result2, "ServicesGrid", ServicesGrid, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/insurancesupport-astro/src/components/ServicesGrid", "client:component-export": "default" })} </div> </section> <!-- WHY US --> <section class="py-20 lg:py-28 bg-gradient-to-br from-blue-50 to-indigo-50/50"> <div class="max-w-7xl mx-auto px-4"> <div class="text-center mb-16 reveal"> <span class="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-700 text-sm font-semibold mb-4">Why Choose Us</span> <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">25+ Years of Trusted Service</h2> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children"> <div class="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 reveal card-hover"> <div class="w-16 h-16 mx-auto mb-5 bg-blue-100 rounded-full flex items-center justify-center"> <svg class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> </div> <h3 class="text-xl font-bold text-slate-900 mb-3">IRDAI Certified</h3> <p class="text-slate-600">Reg No: 0149161D — Licensed by IRDAI with 25+ years of adherence to regulatory standards.</p> </div> <div class="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 reveal card-hover" style="transition-delay:0.1s"> <div class="w-16 h-16 mx-auto mb-5 bg-green-100 rounded-full flex items-center justify-center"> <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> </div> <h3 class="text-xl font-bold text-slate-900 mb-3">95% Claim Success</h3> <p class="text-slate-600">Proven track record of overturning rejected claims. ₹50+ Crore recovered for families.</p> </div> <div class="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 reveal card-hover" style="transition-delay:0.2s"> <div class="w-16 h-16 mx-auto mb-5 bg-amber-100 rounded-full flex items-center justify-center"> <svg class="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> </div> <h3 class="text-xl font-bold text-slate-900 mb-3">Doorstep Service</h3> <p class="text-slate-600">We come to your home or office in Bengaluru & pan-India via online consultation.</p> </div> </div> </div> </section> <!-- TESTIMONIALS --> <section class="py-20 lg:py-28 bg-white"> <div class="max-w-5xl mx-auto px-4"> <div class="text-center mb-12 reveal"> <span class="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold mb-4">Testimonials</span> <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Clients Say</h2> </div> ${renderComponent($$result2, "TestimonialsCarousel", TestimonialsCarousel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/insurancesupport-astro/src/components/TestimonialsCarousel", "client:component-export": "default" })} </div> </section> <!-- PROCESS --> <section class="py-20 lg:py-28 bg-gradient-to-br from-slate-900 to-slate-800 text-white"> <div class="max-w-7xl mx-auto px-4"> <div class="text-center mb-16 reveal"> <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">How It Works</h2> <p class="text-lg text-slate-300 max-w-2xl mx-auto">Getting expert insurance support is simple and stress-free.</p> </div> <div class="grid grid-cols-1 md:grid-cols-4 gap-8 stagger-children"> <div class="text-center reveal"> <div class="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-2xl shadow-lg">1</div> <h3 class="text-lg font-bold mb-2">Free Consultation</h3> <p class="text-sm text-slate-400">Call or book online for a no-obligation discussion of your needs.</p> </div> <div class="text-center reveal" style="transition-delay:0.1s"> <div class="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-2xl shadow-lg">2</div> <h3 class="text-lg font-bold mb-2">Expert Analysis</h3> <p class="text-sm text-slate-400">We analyze your situation and find the best solution.</p> </div> <div class="text-center reveal" style="transition-delay:0.2s"> <div class="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-2xl shadow-lg">3</div> <h3 class="text-lg font-bold mb-2">Take Action</h3> <p class="text-sm text-slate-400">We handle paperwork, coordination, and follow-ups.</p> </div> <div class="text-center reveal" style="transition-delay:0.3s"> <div class="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-2xl shadow-lg">4</div> <h3 class="text-lg font-bold mb-2">Lifetime Support</h3> <p class="text-sm text-slate-400">Ongoing reviews, claim assistance, and advice.</p> </div> </div> </div> </section> <!-- CTA --> <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-600"> <div class="max-w-4xl mx-auto px-4 text-center text-white"> <h2 class="text-3xl md:text-4xl font-bold mb-4 reveal">Ready to Secure Your Family's Future?</h2> <p class="text-lg text-blue-100 mb-8 max-w-xl mx-auto reveal">Get personalized insurance guidance from an IRDAI-certified advisor with 25+ years of experience. Free consultation.</p> <div class="flex flex-wrap justify-center gap-4 reveal"> <a href="/contact" class="px-8 py-4 bg-amber-400 text-slate-900 font-bold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all btn-glow">Book Free Consultation</a> <a href="tel:+919986634506" class="px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-full hover:bg-white/20 backdrop-blur-sm transition-all">Call +91-99866 34506</a> </div> <p class="text-sm text-blue-200 mt-6 reveal">IRDAI Reg No: 0149161D | 25+ Years | 1000+ Families Served</p> </div> </section> <!-- FOOTER --> <footer class="bg-slate-900 text-slate-300 py-16"> <div class="max-w-7xl mx-auto px-4"> <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"> <div> <h3 class="text-white font-bold text-lg mb-4">Insurance Support</h3> <p class="text-sm leading-relaxed">IRDAI certified independent insurance advisor providing comprehensive solutions since 2000.</p> <p class="text-xs text-slate-500 mt-4">IRDAI Reg: 0149161D</p> </div> <div> <h4 class="text-white font-semibold mb-4">Quick Links</h4> <div class="flex flex-col gap-2 text-sm"> <a href="/services" class="hover:text-amber-400 transition-colors">Services</a> <a href="/locations" class="hover:text-amber-400 transition-colors">Locations</a> <a href="/blog" class="hover:text-amber-400 transition-colors">Blog</a> <a href="/faq" class="hover:text-amber-400 transition-colors">FAQ</a> </div> </div> <div> <h4 class="text-white font-semibold mb-4">Support</h4> <div class="flex flex-col gap-2 text-sm"> <a href="/contact" class="hover:text-amber-400 transition-colors">Contact</a> <a href="/support" class="hover:text-amber-400 transition-colors">Claim Support</a> <a href="/privacy-policy" class="hover:text-amber-400 transition-colors">Privacy Policy</a> </div> </div> <div> <h4 class="text-white font-semibold mb-4">Contact Us</h4> <div class="text-sm space-y-2"> <p>📞 <a href="tel:+919986634506" class="hover:text-amber-400 transition-colors">+91-99866 34506</a></p> <p>✉️ <a href="mailto:contact@insurancesupport.online" class="hover:text-amber-400 transition-colors">contact@insurancesupport.online</a></p> <p>📍 Bahubali Nagar, Jalahalli, Bengaluru, KA 560013</p> </div> </div> </div> <div class="border-t border-slate-800 pt-8 text-center text-sm text-slate-500"> <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} Insurance Support by Hari Kotian. All rights reserved.</p> <p class="mt-1">Legacy ❤ Trust ❤ Excellence</p> </div> </div> </footer> </main> ${renderComponent($$result2, "FloatingCTA", FloatingCTA, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/insurancesupport-astro/src/components/FloatingCTA", "client:component-export": "default" })} ` })}`;
}, "D:/insurancesupport-astro/src/pages/index.astro", void 0);

const $$file = "D:/insurancesupport-astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
