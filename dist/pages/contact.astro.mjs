/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D4avlH1o.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CVtSTiKM.mjs';
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Contact Insurance Support", "description": "Contact Hari Kotian for insurance consultation." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-3xl mx-auto px-4 py-16"> <h1 class="text-4xl font-bold text-slate-900 mb-8">Contact Us</h1> <div class="grid md:grid-cols-2 gap-8"> <div class="space-y-4"> <p><strong>Phone:</strong> +91-99866 34506</p> <p><strong>Email:</strong> contact@insurancesupport.online</p> <p><strong>Office:</strong> Bahubali Nagar, Jalahalli, Bengaluru, KA 560013</p> <p><strong>Hours:</strong> 09:00 - 21:00</p> </div> <div class="bg-slate-100 p-8 rounded-xl">Contact Form Placeholder</div> </div> </main> ` })}`;
}, "D:/insurancesupport-astro/src/pages/contact.astro", void 0);

const $$file = "D:/insurancesupport-astro/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
