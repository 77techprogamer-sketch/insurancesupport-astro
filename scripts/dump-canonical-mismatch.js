import fs from 'fs';
function page(p){return fs.readFileSync(p,'utf8');}
function canonical(html){const m=/<link[^>]*\brel=["\']canonical["\'][^>]*\bhref=["\']([^"\']+)["\'][^>]*>/i.exec(html);return m?m[1]:null;}
const dist='dist';
function walk(dir, acc){
  const entries=fs.readdirSync(dir,{withFileTypes:true});
  for (const e of entries){
    const p=dir+'/'+e.name;
    if(e.isDirectory()) walk(p,acc);
    else if(e.name.endsWith('.html')) acc.push(p);
  }
}
const files=[]; walk(dist,files);
const target={translatedBlog:[],langIndex:[],serviceCombo:[],cityArea:[]};
for (const file of files){
  let rel=file.slice(dist.length+1).replace(/\\/g,'/');
  if(rel.endsWith('/index.html')) rel=rel.slice(0,-10);
  const url='https://insurancesupport.online/'+rel;
  const html=page(file);
  const can=canonical(html);
  if(can && can!==url){
    if(/^\/blog\/(hi|bn|ta|te|mr|gu|kn|ml)\/[^/]+\/$/.test(rel)) target.translatedBlog.push({rel,url,canonical:can});
    else if(/^\/blog\/(hi|bn|ta|te|mr|gu|kn|ml)\/$/.test(rel)) target.langIndex.push({rel,url,canonical:can});
    else if(/^\/services\/[^/]+\/[^/]+\/$/.test(rel)) target.serviceCombo.push({rel,url,canonical:can});
    else if(/^\/cities\/[^/]+\/$/.test(rel)) target.cityArea.push({rel,url,canonical:can});
  }
}
console.log('Canonical mismatches by group:');
console.log(' translatedBlog:',target.translatedBlog.length);
console.log(' langIndex:',target.langIndex.length);
console.log(' serviceCombo:',target.serviceCombo.length);
console.log(' cityArea:',target.cityArea.length);
console.log('');
console.log('Sample mismatches (first 8 per group):');
[['translatedBlog',target.translatedBlog],['langIndex',target.langIndex],['serviceCombo',target.serviceCombo],['cityArea',target.cityArea]].forEach(([name,list])=>{
  console.log('== '+name+' ==');
  list.slice(0,8).forEach(x=>console.log('  '+x.rel+' canonical='+x.canonical));
});
