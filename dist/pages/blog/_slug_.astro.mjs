/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_D4avlH1o.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CVtSTiKM.mjs';
import { p as posts } from '../../chunks/blogs_BevL2iSn.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://insurancesupport.online");
function getStaticPaths() {
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { post } = Astro2.props;
  function parseContent(content) {
    if (!content) return "";
    return content.replace(/^## (.*)$/gm, '<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">$1</h2>').replace(/^### (.*)$/gm, '<h3 class="text-xl font-bold text-slate-900 mt-8 mb-3">$1</h3>').replace(/^\*\*([^*]+)\*\*/gm, '<p class="text-slate-600 leading-relaxed mb-4 font-bold">$1</p>').replace(/^(?!<)(.*)$/gm, '<p class="text-slate-600 leading-relaxed mb-4">$1</p>');
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": post.title, "description": post.summary }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-3xl mx-auto px-4 py-12"> <article class="prose max-w-none"> <h1 class="text-4xl font-bold text-slate-900 mb-4">${post.title}</h1> <div class="flex items-center gap-4 text-slate-500 mb-8"> <span>${post.date}</span> <span>By ${post.author || "Hari Kotian"}</span> </div> <div>${unescapeHTML(parseContent(post.content))}</div> </article> <div class="mt-16 bg-blue-50 p-8 rounded-2xl text-center"> <h3 class="text-xl font-bold text-slate-900 mb-4">Need personalized insurance advice?</h3> <a href="/contact" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">Book Free Consultation</a> </div> </main> ` })}`;
}, "D:/insurancesupport-astro/src/pages/blog/[slug].astro", void 0);

const $$file = "D:/insurancesupport-astro/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
