/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_D4avlH1o.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CVtSTiKM.mjs';
import { p as posts } from '../chunks/blogs_BevL2iSn.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const sorted = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const allCategories = [...new Set(sorted.flatMap((p) => p.categories))].sort();
  const latestPost = sorted[0];
  const recentPosts = sorted.slice(0, 6);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Insurance Blog | Expert Guides & Tips | Hari Kotian", "description": "Expert insurance guides, claim process tips, IRDAI updates, and advisory from Hari Kotian. 25+ years of insurance experience." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-7xl mx-auto px-4 py-12"> <div class="text-center mb-12"> <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Insurance Blog</h1> <p class="text-lg text-slate-600 max-w-2xl mx-auto">Expert guides, claim tips, and insurance insights from Hari Kotian, IRDAI certified advisor with 25+ years experience.</p> </div> <!-- Featured Post --> <section class="mb-12"> <h2 class="sr-only">Latest Post</h2> <a${addAttribute(`/blog/${latestPost.slug}`, "href")} class="block bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:shadow-lg transition-shadow"> <span class="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-4">Latest</span> <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-3">${latestPost.title}</h2> <p class="text-slate-600 mb-4 line-clamp-2">${latestPost.summary}</p> <div class="flex items-center gap-4 text-sm text-slate-500"> <span>${latestPost.date}</span> <span>${latestPost.author || "Hari Kotian"}</span> </div> </a> </section> <!-- Category Filter --> <div class="flex flex-wrap gap-2 mb-8"> <a href="/blog" class="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">All Posts</a> ${allCategories.map((cat) => renderTemplate`<a${addAttribute(`/blog?category=${cat}`, "href")} class="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">${cat}</a>`)} </div> <!-- Blog Grid --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${recentPosts.map((post) => renderTemplate`<article class="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"> <div class="p-6"> <div class="flex flex-wrap gap-2 mb-3"> ${(post.categories || []).slice(0, 2).map((cat) => renderTemplate`<span class="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">${cat}</span>`)} </div> <a${addAttribute(`/blog/${post.slug}`, "href")}> <h2 class="text-lg font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">${post.title}</h2> </a> <p class="text-sm text-slate-600 mb-4 line-clamp-3">${post.summary}</p> <div class="flex items-center justify-between text-xs text-slate-500"> <span>${post.date}</span> <a${addAttribute(`/blog/${post.slug}`, "href")} class="text-blue-600 font-medium hover:underline">Read More</a> </div> </div> </article>`)} </div> <div class="text-center mt-12"> <p class="text-slate-500 mb-4">${posts.length} articles total</p> <a href="/contact" class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">Consult Hari Kotian</a> </div> </main> ` })}`;
}, "D:/insurancesupport-astro/src/pages/blog/index.astro", void 0);

const $$file = "D:/insurancesupport-astro/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
