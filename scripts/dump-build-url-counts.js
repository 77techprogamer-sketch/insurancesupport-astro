import fs from 'fs';
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
const groups={translatedBlog:[],langIndex:[],serviceCombo:[],cityArea:[]};
for (const file of files){
  let rel=file.slice(dist.length+1).replace(/\\/g,'/');
  if(rel.endsWith('/index.html')) rel=rel.slice(0,-10);
  if(/^\/blog\/(hi|bn|ta|te|mr|gu|kn|ml)\/[^/]+\/$/.test(rel)) groups.translatedBlog.push(rel);
  else if(/^\/blog\/(hi|bn|ta|te|mr|gu|kn|ml)\/$/.test(rel)) groups.langIndex.push(rel);
  else if(/^\/services\/[^/]+\/[^/]+\/$/.test(rel)) groups.serviceCombo.push(rel);
  else if(/^\/cities\/[^/]+\/$/.test(rel)) groups.cityArea.push(rel);
}
console.log('Actual generated URL counts in this build:');
console.log(' translatedBlog:',groups.translatedBlog.length);
console.log(' langIndex:',groups.langIndex.length);
console.log(' serviceCombo:',groups.serviceCombo.length);
console.log(' cityArea:',groups.cityArea.length);
console.log(' potentialTotalAdded:',groups.translatedBlog.length+groups.langIndex.length+groups.serviceCombo.length+groups.cityArea.length);
console.log('');
console.log('Sample URLs in each group:');
['translatedBlog','langIndex','serviceCombo','cityArea'].forEach(g=>{
  console.log('== '+g+' (first 10) ==');
  groups[g].slice(0,10).forEach(u=>console.log('  '+u));
});
if(groups.serviceCombo.length===0 && groups.cityArea.length===0){
  console.log('');
  console.log('NOTE: this build has 0 serviceCombo and 0 cityArea pages.');
}
