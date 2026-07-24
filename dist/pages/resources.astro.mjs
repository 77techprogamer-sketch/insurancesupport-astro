/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D4avlH1o.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CVtSTiKM.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Resources", "description": "Insurance guides, claim process, regulatory information." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-5xl mx-auto px-4 py-16"> <h1 class="text-4xl font-bold text-slate-900 mb-8">Resources</h1> <div class="grid md:grid-cols-3 gap-6"> <a href="/faq" class="p-6 bg-white border rounded-xl hover:shadow-md">FAQ</a> <a href="/blog" class="p-6 bg-white border rounded-xl hover:shadow-md">Blog</a> <a href="/support" class="p-6 bg-white border rounded-xl hover:shadow-md">Support</a> </div> </main> ` })}`;
}, "D:/insurancesupport-astro/src/pages/resources/index.astro", void 0);

const $$file = "D:/insurancesupport-astro/src/pages/resources/index.astro";
const $$url = "/resources";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
