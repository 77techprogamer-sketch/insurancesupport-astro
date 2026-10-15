import fs from 'fs';
const dist='dist';
const site='https://insurancesupport.online';
function page(p){return fs.readFileSync(p,'utf8');}
function canonical(html){
  const m=/<link[^>]*\brel=["\']canonical["\'][^>]*\bhref=["\']([^"\']+)["\'][^>]*>/i.exec(html);
  return m?m[1]:null;
}
function loadSitemapUrls(){
  const urls=new Set();
  const files={
    'core':'dist/sitemaps/core-sitemap.xml',
    'blog':'dist/sitemaps/blog-sitemap.xml',
    'locations':'dist/sitemaps/locations-sitemap.xml',
    'services':'dist/sitemaps/services-sitemap.xml',
    'cities':'dist/sitemaps/cities-sitemap.xml',
    'leadMagnets':'dist/sitemaps/leadMagnets-sitemap.xml',
    'caseStudies':'dist/sitemaps/caseStudies-sitemap.xml',
    'compare':'dist/sitemaps/compare-sitemap.xml'
  };
  for (const p of Object.values(files)){
    const s=fs.readFileSync(p,'utf8');
    const r=/<loc>([^<]+)<\/loc>/g; let m;
    while((m=r.exec(s))) urls.add(m[1]);
  }
  return urls;
}
function walk(dir, acc){
  const entries=fs.readdirSync(dir,{withFileTypes:true});
  for (const e of entries){
    const p=dir+'/'+e.name;
    if(e.isDirectory()) walk(p,acc);
    else if(e.name.endsWith('.html')) acc.push(p);
  }
}
const files=[]; walk(dist,files);
const sitemapUrls=loadSitemapUrls();
const groups={
  translatedBlog:{pages:[],canonicalMismatch:0,included:0,excludedOther:0,noCanonical:0},
  langIndex:{pages:[],canonicalMismatch:0,included:0,excludedOther:0,noCanonical:0},
  serviceCombo:{pages:[],canonicalMismatch:0,included:0,excludedOther:0,noCanonical:0},
  cityArea:{pages:[],canonicalMismatch:0,included:0,excludedOther:0,noCanonical:0}
};
for (const file of files){
  let rel=file.slice(dist.length+1).replace(/\\/g,'/');
  if(rel.endsWith('/index.html')) rel=rel.slice(0,-10);
  const url=site+'/'+rel;
  const html=page(file);
  const can=canonical(html);
  if(!can) continue;
  let g=null;
  if(/^\/blog\/(hi|bn|ta|te|mr|gu|kn|ml)\/[^/]+\/$/.test(rel)) g='translatedBlog';
  else if(/^\/blog\/(hi|bn|ta|te|mr|gu|kn|ml)\/$/.test(rel)) g='langIndex';
  else if(/^\/services\/[^/]+\/[^/]+\/$/.test(rel)) g='serviceCombo';
  else if(/^\/cities\/[^/]+\/$/.test(rel)) g='cityArea';
  if(!g) continue;
  groups[g].pages.push({rel,url,canonical:can,included:sitemapUrls.has(url)});
  if(can!==url) groups[g].canonicalMismatch++;
  else if(sitemapUrls.has(url)) groups[g].included++;
  else groups[g].excludedOther++;
}
console.log('Current sitemap + canonical status for the now-indexable groups:');
console.log('(sitemaps are assumed freshly regenerated from the current build)');
console.log('');
const order=['translatedBlog','langIndex','serviceCombo','cityArea'];
order.forEach(g=>{
  const d=groups[g];
  console.log('== '+g.toUpperCase()+' ==');
  console.log(' pages found in build:',d.pages.length);
  console.log(' canonical mismatch (canonical!=self):',d.canonicalMismatch);
  console.log(' self-canonical AND included in sitemap:',d.included);
  console.log(' self-canonical AND NOT in sitemap:',d.excludedOther);
  console.log(' sample pages (up to 8):');
  d.pages.slice(0,8).forEach(x=>console.log('   '+x.rel+' canonical='+x.canonical+' inSitemap='+x.included));
  console.log('');
});
