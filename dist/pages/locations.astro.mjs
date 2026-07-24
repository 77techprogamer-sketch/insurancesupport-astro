/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_D4avlH1o.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CVtSTiKM.mjs';
import { c as cities } from '../chunks/cities_B8diWPOA.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const states = {};
  for (const city of cities) {
    const st = city.state || "Other";
    if (!states[st]) states[st] = [];
    states[st].push(city);
  }
  const sortedStates = Object.keys(states).sort();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Service Locations | Insurance Support Bengaluru & Pan India", "description": "Find Insurance Support in your city. 240+ locations across India with doorstep service. IRDAI certified advisor." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-7xl mx-auto px-4 py-12"> <div class="text-center mb-12"> <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Service Locations</h1> <p class="text-lg text-slate-600 max-w-2xl mx-auto">Serving <strong class="text-blue-600">${cities.length}</strong> locations across India with personalized doorstep insurance advisory.</p> <p class="text-sm text-slate-500 mt-2">IRDAI Certified | 25+ Years Experience | Free Consultation</p> </div> <div class="mb-8"> <input type="text" id="citySearch" placeholder="Search your city..." class="w-full max-w-md px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onkeyup="filterCities()"> </div> ${sortedStates.map((state) => renderTemplate`<section class="mb-12"${addAttribute(state, "data-state")}> <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">${state} <span class="text-sm font-normal text-slate-500">(${states[state].length} locations)</span></h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 city-grid"> ${states[state].map((city) => renderTemplate`<a${addAttribute(`/locations/${city.slug}`, "href")} class="city-card block p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"> <h3 class="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">${city.name}</h3> <p class="text-xs text-slate-400 mt-1">${city.areas.length} areas served</p> </a>`)} </div> </section>`)} <div class="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center mt-8"> <h2 class="text-2xl md:text-3xl font-bold mb-4">Don't See Your City?</h2> <p class="text-lg text-blue-100 mb-6 max-w-xl mx-auto">We offer pan-India online consultations. Contact us for personalized insurance guidance anywhere in India.</p> <a href="/contact" class="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">Contact Us</a> </div> </main> ` })}`;
}, "D:/insurancesupport-astro/src/pages/locations/index.astro", void 0);

const $$file = "D:/insurancesupport-astro/src/pages/locations/index.astro";
const $$url = "/locations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
