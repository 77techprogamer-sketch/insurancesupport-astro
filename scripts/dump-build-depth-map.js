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
const byDepth={};
for (const file of files){
  let rel=file.slice(dist.length+1).replace(/\\/g,'/');
  if(rel.endsWith('/index.html')) rel=rel.slice(0,-10);
  const parts=rel.split('/');
  const depth=parts.length-1;
  if(!byDepth[depth]) byDepth[depth]=[];
  byDepth[depth].push(rel);
}
console.log('Page depth distribution in this build (depth = path segments after dist/):');
const depths=Object.keys(byDepth).map(x=>+x).sort((a,b)=>a-b);
for (const d of depths){
  const list=byDepth[d];
  console.log(' depth '+d+' (path segment count '+(d+1)+'): '+list.length+' pages');
}
console.log('');
console.log('Sample deeper paths (depth >= 3):');
const deeper=depths.filter(d=>d>=3).flatMap(d=>byDepth[d].map(r=>({r,d})));
deeper.slice(0,40).forEach(x=>console.log('  '+x.r.padStart(50,' ')+'  depth='+x.d));
if(deeper.length===0) console.log('  (none deeper than depth 2)');
