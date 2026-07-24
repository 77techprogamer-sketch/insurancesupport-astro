/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D4avlH1o.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CVtSTiKM.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "About Hari Kotian", "description": "Meet Hari Kotian, IRDAI certified insurance advisor with 25+ years experience." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-4xl mx-auto px-4 py-16"> <h1 class="text-4xl font-bold text-slate-900 mb-8">About Hari Kotian</h1> <p class="text-lg text-slate-600">IRDAI Certified Insurance Advisor (Reg: 0149161D). 25+ years of experience, 1000+ clients, INR 50 Cr+ claims recovered.</p> </main> ` })}`;
}, "D:/insurancesupport-astro/src/pages/about.astro", void 0);

const $$file = "D:/insurancesupport-astro/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
