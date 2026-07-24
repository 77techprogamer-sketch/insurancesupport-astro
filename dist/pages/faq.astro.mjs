/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D4avlH1o.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CVtSTiKM.mjs';
export { renderers } from '../renderers.mjs';

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Insurance FAQ | Hari Kotian", "description": "50+ frequently asked insurance questions answered by Hari Kotian." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-4xl mx-auto px-4 py-16"> <h1 class="text-4xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h1> <p class="text-slate-600 mb-12">Get answers to the most common questions about insurance planning, claims, and policy management.</p> <!-- Content would be mapped from faqData.ts --> <p class="text-center p-12 border-2 border-dashed border-slate-200 rounded-xl">FAQ content mapping in progress.</p> </main> ` })}`;
}, "D:/insurancesupport-astro/src/pages/faq.astro", void 0);

const $$file = "D:/insurancesupport-astro/src/pages/faq.astro";
const $$url = "/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Faq,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
