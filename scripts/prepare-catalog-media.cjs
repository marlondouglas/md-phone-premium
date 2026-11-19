/* MD PHONE — prepara fotos locais no deploy. Usa apenas imagens públicas de referência;
 * não altera fotos, não inventa cores, não cria imagens sintéticas. */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const https=require('node:https');
const http=require('node:http');
const vm=require('node:vm');
const OUT=path.join(process.cwd(),'_site');
const dir=path.join(OUT,'assets','catalog');
fs.mkdirSync(dir,{recursive:true});
const context={window:{}};
vm.runInNewContext(fs.readFileSync('md-universe-data.js','utf8'),context,{timeout:3000});
const data=context.window.MD_UNIVERSE;
const heroSources={
 iphone:'https://www.apple.com/v/homepage/images/iphone-18-pro/a/promo_iphone_18_pro__9nn5m4mt2bmy_large.jpg',
 mac:'https://www.apple.com/v/homepage/images/macbook-pro-proled-xdr/a/hero_macbook_pro_proled_xdr_preorder__df38n593sxg2_large.jpg',
 ipad:'https://www.apple.com/v/homepage/images/ipad-mini/a/promo_ipad_mini_a20_announce__efc6vmmxg58i_large.jpg',
 watch:'https://www.apple.com/br/homepage/built/promos/26_apple-watch-series-12_10/images/promo_apple_watch_series_12__gnlprtt8526a_large.jpg',
 airpods:'https://www.apple.com/v/homepage/images/airpods-pro-3/a/promo_airpods_pro_3__e4755qofhnyq_large.jpg'
};
const tasks=[];
tasks.push({
 key:'media::airpods-pro-3',
 filename:'airpods-pro-3-launch',
 url:'https://www.apple.com/newsroom/images/2025/09/introducing-airpods-pro-3-the-ultimate-audio-experience/article/Apple-AirPods-Pro-3-hero-250909_inline.jpg.large.jpg'
});
for(const [id,url] of Object.entries(heroSources))tasks.push({key:'hero::'+id,url,filename:'hero-'+id});
for(const p of data.products||[]){
 if(p.image)tasks.push({key:p.id,url:p.image,filename:p.id});
 if(p.category==='iphone'){
  for(const [color,url] of Object.entries(p.colorPhotos||{})){
   if(url)tasks.push({key:p.id+'::color::'+color,url,filename:p.id+'-color-'+color});
  }
  for(const [i,v] of (p.variants||[]).entries()){
   if(v.image)tasks.push({key:p.id+'::variant::'+i,url:v.image,filename:p.id+'-variant-'+i});
  }
 }
}
const unique=[...new Map(tasks.map(x=>[x.key,x])).values()];
const manifest={};
function fetchImage(url,redirects=0){
 return new Promise((resolve,reject)=>{
  if(redirects>5)return reject(new Error('redirect limit'));
  const u=new URL(url);if(u.protocol!=='https:'&&u.protocol!=='http:')return reject(new Error('invalid protocol'));
  const req=(u.protocol==='https:'?https:http).get(u,{headers:{'User-Agent':'Mozilla/5.0 (compatible; MDPhoneCatalog/1.0)','Accept':'image/avif,image/webp,image/png,image/jpeg,image/*;q=0.9,*/*;q=0.2'}},res=>{
   if([301,302,303,307,308].includes(res.statusCode)&&res.headers.location){
    res.resume();fetchImage(new URL(res.headers.location,u).toString(),redirects+1).then(resolve,reject);return;
   }
   const mime=(res.headers['content-type']||'').split(';')[0].toLowerCase();
   if(res.statusCode!==200||!mime.startsWith('image/')){res.resume();reject(new Error('status '+res.statusCode+' / '+mime));return;}
   const chunks=[];let total=0;res.on('data',b=>{total+=b.length;if(total>9000000){req.destroy(new Error('too large'));return;}chunks.push(b)});
   res.on('end',()=>resolve({bytes:Buffer.concat(chunks),mime}));res.on('error',reject);
  });
  req.setTimeout(15000,()=>req.destroy(new Error('timeout')));req.on('error',reject);
 });
}
let cursor=0,success=0,failed=0;
async function worker(){
 while(cursor<unique.length){
  const t=unique[cursor++];
  try{
   const {bytes,mime}=await fetchImage(t.url);
   if(bytes.length<1800)throw new Error('suspiciously small image');
   const ext=mime.includes('png')?'png':mime.includes('webp')?'webp':mime.includes('avif')?'avif':'jpg';
   const filename=t.filename.replace(/[^a-zA-Z0-9-]/g,'-')+'.'+ext;
   fs.writeFileSync(path.join(dir,filename),bytes);
   manifest[t.key]='assets/catalog/'+filename;success++;
  }catch(err){failed++;console.log('Photo unavailable:',t.key,String(err.message).slice(0,120))}
 }
}
(async()=>{
 await Promise.all(Array.from({length:7},worker));
 fs.writeFileSync(path.join(OUT,'md-photo-manifest.js'),'window.MD_PHOTOS = '+JSON.stringify(manifest)+';\n');
 console.log('MD PHONE photos:',success,'downloaded;',failed,'remote fallback;',unique.length,'attempted');
 if(!fs.existsSync(path.join(OUT,'md-photo-manifest.js')))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
