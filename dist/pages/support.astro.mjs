/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D4avlH1o.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CVtSTiKM.mjs';
export { renderers } from '../renderers.mjs';

const $$Support = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Client Support Services", "description": "Insurance support services: claims, policy revival, ombudsman." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-4xl mx-auto px-4 py-16"> <h1 class="text-4xl font-bold text-slate-900 mb-8">Client Support Services</h1> <p>Rejected Claims, Stuck Claims, Policy Revival, Lost Documents, Ombudsman, Renewal.</p> </main> ` })}`;
}, "D:/insurancesupport-astro/src/pages/support.astro", void 0);

const $$file = "D:/insurancesupport-astro/src/pages/support.astro";
const $$url = "/support";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Support,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
