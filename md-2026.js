/* MD PHONE 2026 — fluxo inteiramente novo, sem dependência do sistema legado. */
'use strict';
const MDWA='5533987044866';
const IMG={
  '18':'https://www.apple.com/newsroom/images/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/article/Apple-iPhone-18-Pro-color-lineup-260909_big.jpg.large.jpg',
  '17':'https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-color-lineup-250909_inline.jpg.large.jpg',
  '17orange':'https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-cosmic-orange-250909_inline.jpg.large.jpg',
  '14pm':'https://www.apple.com/newsroom/images/product/availability/geo/Apple-iPhone-14-Pro-Max-deep-purple-geo_inline.jpg.large_2x.jpg',
  '14p':'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=900&hei=900&fmt=png-alpha',
  '13':'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-starlight-select-2021?wid=940&hei=1112&fmt=png-alpha',
  '13blue':'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-blue-select?wid=900&hei=1112&fmt=png-alpha',
  '13gold':'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-gold-select?wid=900&hei=1112&fmt=png-alpha',
  '13gray':'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=900&hei=1112&fmt=png-alpha'
};
const PRODUCTS=[
 {id:'18pro',model:'iPhone 18 Pro Max',line:'ÚLTIMA GERAÇÃO',tone:'#276a43',img:IMG['18'],stock:false,variants:[{id:'18pro',type:'consulta',color:'A confirmar',gb:'A confirmar',battery:null,repair:[]}]},
 {id:'17pro',model:'iPhone 17 Pro Max',line:'LINHA PRO',tone:'#46465d',img:IMG['17'],stock:false,variants:[{id:'17pro-new',type:'consulta',color:'A confirmar',gb:'A confirmar',battery:null,repair:[]}]},
 {id:'14pm',model:'iPhone 14 Pro Max',line:'SEMINOVO · ESTOQUE INFORMADO',tone:'#48385b',img:IMG['14pm'],stock:true,variants:[{id:'14pm-purple',type:'seminovo',color:'Roxo profundo',gb:'128 GB',battery:86,repair:[]}]},
 {id:'14p',model:'iPhone 14 Pro',line:'SEMINOVO · ESTOQUE INFORMADO',tone:'#584569',img:IMG['14p'],stock:true,variants:[{id:'14p-purple',type:'seminovo',color:'Roxo',gb:'128 GB',battery:85,repair:[]}]},
 {id:'13p',model:'iPhone 13 Pro',line:'SEMINOVO · 1 TB',tone:'#264960',img:IMG['13blue'],stock:true,variants:[
   {id:'13p-blue',type:'seminovo',color:'Azul',gb:'1 TB',battery:77,repair:[],img:IMG['13blue']},
   {id:'13p-gold',type:'seminovo',color:'Dourado',gb:'1 TB',battery:74,repair:['Tela substituída'],img:IMG['13gold']},
   {id:'13p-gray',type:'seminovo',color:'Grafite',gb:'1 TB',battery:null,repair:['Tela substituída','Bateria substituída'],img:IMG['13gray']}
 ]},
 {id:'13',model:'iPhone 13',line:'SEMINOVO · ESTOQUE INFORMADO',tone:'#52685b',img:IMG['13'],stock:true,variants:[{id:'13-white',type:'seminovo',color:'Branco',gb:'128 GB',battery:92,repair:[]}]}
];
const state={filter:'todos',query:'',chosen:Object.create(null),current:null,activeModel:'14pm'};
const $=q=>document.querySelector(q);
const $$=q=>Array.from(document.querySelectorAll(q));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function wa(text){return 'https://wa.me/'+MDWA+'?text='+encodeURIComponent(text)}
function imageMarkup(p,v){
 const src=esc(v.img||p.img);
 return '<img src="'+src+'" alt="Imagem ilustrativa do '+esc(p.model)+' '+esc(v.color)+'; solicite foto real da unidade" loading="lazy" decoding="async" onerror="this.style.display=\'none\';this.parentElement.classList.add(\'photo-error\')">';
}
function unit(p){return p.variants.find(v=>v.id===state.chosen[p.id])||p.variants[0]}
function info(p,v){const t=v.type==='consulta'?'Modelo sob consulta':'Seminovo';
 const repair=v.repair.length?'<span class="repair-warning">Peças: <b>'+esc(v.repair.join(' · '))+'</b></span>':'<span>Histórico de peças: <b>confirmar com a loja</b></span>';
 return '<span>Condição: <b>'+t+'</b> · '+esc(v.gb)+' · '+esc(v.color)+'</span><span>Bateria: <b>'+(v.battery===null?'A confirmar':v.battery+'% informado')+'</b></span>'+repair;
}
function card(p,i){const v=unit(p);
 const buttons=p.variants.length>1?'<div class="panel-variants" role="group" aria-label="Escolha a cor de '+esc(p.model)+'">'+p.variants.map(x=>'<button type="button" class="variant-btn '+(x.id===v.id?'selected':'')+'" data-choice="'+esc(x.id)+'" data-model="'+esc(p.id)+'" aria-pressed="'+(x.id===v.id)+'">'+esc(x.color)+'</button>').join('')+'</div>':'';
 return '<article class="product-panel" data-id="'+esc(p.id)+'"><div class="panel-art" style="--art-tone:'+esc(p.tone)+'">'+
 imageMarkup(p,v)+'<div class="photo-caption">FOTO DE CATÁLOGO · CONFIRME O APARELHO REAL</div></div>'+
 '<div class="panel-copy"><span class="panel-kicker">'+esc(p.line)+'</span><h3>'+esc(p.model)+'</h3>'+
 '<div class="panel-intro">'+(p.stock?'Unidade informada pela loja. Escolha a opção e confira os detalhes antes de solicitar.':'Conheça a geração e solicite disponibilidade, cores, capacidade e valores.')+'</div>'+
 buttons+'<div class="panel-details" aria-live="polite">'+info(p,v)+'</div>'+
 '<div class="panel-actions"><button class="panel-buy" data-buy="'+esc(v.id)+'" type="button">Comprar / consultar ↗</button><button class="panel-more" data-details="'+esc(v.id)+'" type="button">Ver detalhes</button></div></div></article>';
}
function render(){
 const out=PRODUCTS.filter(p=>{
  const match=state.filter==='todos'||(state.filter==='seminovo'?p.variants.some(v=>v.type==='seminovo'):p.variants.some(v=>v.type==='consulta'));
  const s=norm([p.model,p.line,...p.variants.flatMap(v=>[v.color,v.gb,v.type,v.battery,...v.repair])].join(' '));
  return match&&(!state.query||s.includes(state.query));
 });
 const el=$('#inventory');if(!el)return;
 const count=$('#resultsCount');
 if(!out.length){
  el.innerHTML='<div class="empty-state"><strong>Nenhum iPhone encontrado.</strong><p>Experimente outra busca ou entre em contato com a MD PHONE.</p></div>';
  if(count)count.textContent='Nenhum modelo com esses filtros';
  return;
 }
 if(!out.some(p=>p.id===state.activeModel))state.activeModel=out[0].id;
 const selected=out.find(p=>p.id===state.activeModel)||out[0];
 const tabs='<div class="model-switcher" role="tablist" aria-label="Escolha o modelo do iPhone">'+out.map(p=>
  '<button type="button" role="tab" data-model-select="'+esc(p.id)+'" class="model-tab '+(p.id===selected.id?'active':'')+'" aria-selected="'+(p.id===selected.id)+'" aria-controls="showcaseStage" tabindex="'+(p.id===selected.id?'0':'-1')+'">'+esc(p.model)+'</button>'
 ).join('')+'</div>';
 el.innerHTML=tabs+'<div class="showcase-stage" id="showcaseStage" role="tabpanel" aria-label="Detalhes do '+esc(selected.model)+'">'+card(selected)+'</div>';
 if(count)count.textContent=out.length+' modelos para explorar · '+selected.model+' selecionado';
}
function findVariant(id){for(const p of PRODUCTS){const v=p.variants.find(v=>v.id===id);if(v)return {p,v}}return null}
function openDialog(d){if(!d)return;if(typeof d.showModal==='function'){if(!d.open)d.showModal()}else d.setAttribute('open','');}
function closeDialog(d){if(!d)return;if(typeof d.close==='function')d.close();else d.removeAttribute('open')}
function checkout(id){let match=findVariant(id);if(!match){const p=PRODUCTS.find(x=>x.id===id);if(p)match={p,v:unit(p)}}if(!match)return;
 state.current=match;
 const chosen=$('#selectedProduct');if(chosen)chosen.textContent=match.p.model+' · '+match.v.color+' · '+match.v.gb+(match.v.battery===null?'':' · Bateria '+match.v.battery+'%');
 const form=$('#checkoutForm');if(form)form.reset();
 openDialog($('#checkout'));$('#buyerName')?.focus({preventScroll:true});
}
function details(id){const match=findVariant(id);if(!match)return;const {p,v}=match;
 const old=$('#details');if(old)old.remove();
 const d=document.createElement('dialog');d.className='assistant-dialog';d.id='details';
 d.setAttribute('aria-labelledby','detailsTitle');
 d.innerHTML='<button class="dialog-close" type="button" id="closeDetails" aria-label="Fechar">×</button><span class="dialog-eyebrow">FICHA INDIVIDUAL MD PHONE</span><h2 id="detailsTitle">'+esc(p.model)+'</h2><p>'+esc(v.type==='consulta'?'Modelo para consulta de preço e disponibilidade.':'Unidade cadastrada. Detalhes estéticos e disponibilidade sob confirmação.')+'</p>'+
 '<div class="checkout-selected">'+info(p,v)+'</div>'+
 '<p>As fotos são promocionais, não mostram a conservação da unidade usada. Solicite fotografias atuais, informação de reparos, garantia, valor e disponibilidade.</p>'+
 '<button class="primary-btn submit" id="detailBuy" type="button">Solicitar este iPhone ↗</button>';
 document.body.appendChild(d);
 d.querySelector('#closeDetails').onclick=()=>closeDialog(d);
 d.querySelector('#detailBuy').onclick=()=>{closeDialog(d);checkout(v.id)};
 d.addEventListener('close',()=>d.remove(),{once:true});openDialog(d);
}
function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2500)}
function initHero(){
 const pics=$$('.hero-photo');if(!pics.length)return;
 let i=0;
 setInterval(()=>{
  if(document.hidden||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  for(let k=1;k<pics.length;k++){const n=(i+k)%pics.length;const pic=pics[n];if(!pic.complete||!pic.naturalWidth)continue;
   pics[i].classList.remove('current');pic.classList.add('current');i=n;break;}
 },6200);
 pics.forEach((p,j)=>p.addEventListener('error',()=>{p.style.display='none';if(j===0){const next=pics.find(x=>x!==p&&x.complete&&x.naturalWidth);if(next)next.classList.add('current')}}));
}
function init(){
 render();initHero();
 const nav=$('#mobileNav'),toggle=$('#menuToggle');
 toggle?.addEventListener('click',()=>{const showing=nav.hidden;nav.hidden=!showing;toggle.setAttribute('aria-expanded',String(showing))});
 $$('#mobileNav a').forEach(a=>a.addEventListener('click',()=>{nav.hidden=true;toggle?.setAttribute('aria-expanded','false')}));
 $('#searchJump')?.addEventListener('click',()=>{$('#estoque')?.scrollIntoView({behavior:'smooth'});setTimeout(()=>$('#search')?.focus(),260)});
 $('#search')?.addEventListener('input',e=>{state.query=norm(e.target.value.trim());render()});
 $$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{state.filter=b.dataset.filter;$$('[data-filter]').forEach(x=>x.classList.toggle('selected',x===b));render()}));
 document.addEventListener('click',e=>{
  const model=e.target.closest('[data-model-select]');if(model){state.activeModel=model.dataset.modelSelect;render();const again=$('[data-model-select]').find(x=>x.dataset.modelSelect===state.activeModel);again?.focus({preventScroll:true});return;}
  const choice=e.target.closest('[data-choice]');if(choice){state.chosen[choice.dataset.model]=choice.dataset.choice;render();const again=$$('[data-choice]').find(x=>x.dataset.choice===choice.dataset.choice);again?.focus({preventScroll:true});return;}
  const buy=e.target.closest('[data-buy]');if(buy){checkout(buy.dataset.buy);return;}
  const more=e.target.closest('[data-details]');if(more){details(more.dataset.details);return;}
  const clos=e.target.closest('[data-close]');if(clos){closeDialog(document.getElementById(clos.dataset.close));return;}
 });
 ['checkout','assistantDialog'].forEach(id=>{const d=document.getElementById(id);d?.addEventListener('click',e=>{if(e.target===d)closeDialog(d)})});
 $('#delivery')?.addEventListener('change',e=>{const addr=$('#addressWrap');if(addr)addr.hidden=e.target.value==='Retirada com a loja'});
 $('#checkoutForm')?.addEventListener('submit',e=>{
  e.preventDefault();if(!e.currentTarget.reportValidity()||!state.current)return;
  const v=state.current.v,p=state.current.p;
  const name=$('#buyerName').value.trim(),phone=$('#buyerPhone').value.trim();
  if(name.length<2||phone.replace(/\D/g,'').length<10){toast('Informe seu nome e WhatsApp válidos.');return}
  const lines=['Olá, MD PHONE! Gostaria de solicitar este iPhone.','',
   'Nome: '+name,'WhatsApp: '+phone,'Produto: '+p.model,'Condição: '+(v.type==='consulta'?'Sob consulta':'Seminovo'),
   'Cor: '+v.color,'Memória: '+v.gb];
  if(v.battery!==null)lines.push('Bateria informada: '+v.battery+'%');
  if(v.repair.length)lines.push('Peças informadas: '+v.repair.join(', '));
  lines.push('Modalidade: '+$('#delivery').value);
  if($('#buyerCity').value.trim())lines.push('Cidade: '+$('#buyerCity').value.trim());
  if($('#buyerAddress').value.trim()&&$('#delivery').value!=='Retirada com a loja')lines.push('Endereço para consulta de entrega: '+$('#buyerAddress').value.trim());
  if($('#buyerZip').value.trim())lines.push('CEP: '+$('#buyerZip').value.trim());
  if($('#buyerNotes').value.trim())lines.push('Observações: '+$('#buyerNotes').value.trim());
  lines.push('','Pode confirmar fotos atuais, preço, disponibilidade, garantia e condições de compra?');
  const url=wa(lines.join('\n'));
  const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.click();
  toast('WhatsApp aberto com a solicitação pronta.');
 });
 const assistant=$('#assistantDialog');
 const openAssistant=()=>openDialog(assistant);
 $('#assistantFab')?.addEventListener('click',openAssistant);
 $('#openAssistantCta')?.addEventListener('click',openAssistant);
 $('#assistantForm')?.addEventListener('submit',e=>{
   e.preventDefault();
   const msg=['Olá, MD PHONE! Vim pelo Assistente MD.',
    'Modelo desejado: '+$('#assistantModel').value,
    'Orçamento: '+$('#assistantBudget').value,
    'Modalidade: '+$('#assistantIntent').value,
    $('#assistantNotes').value.trim()?'Detalhes: '+$('#assistantNotes').value.trim():'',
    'Pode me informar as opções, preços e disponibilidade?'].filter(Boolean).join('\n');
   const a=document.createElement('a');a.href=wa(msg);a.target='_blank';a.rel='noopener noreferrer';a.click();
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();