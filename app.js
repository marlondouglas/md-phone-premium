'use strict';

const MD = {
  whatsapp: '5533987044866',
  images: {
    18: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-18-pro-max-finish-select-silver-202609?wid=900&hei=1112&fmt=png-alpha',
    17: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-max-finish-select-silver-202509?wid=900&hei=1112&fmt=png-alpha',
    16: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-max-deserttitanium-select?wid=900&hei=1112&fmt=png-alpha',
    15: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-pro-naturaltitanium-select?wid=900&hei=1112&fmt=png-alpha',
    14: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=900&hei=900&fmt=png-alpha',
    13: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-blue-select?wid=900&hei=1112&fmt=png-alpha',
    12: 'https://ifdalivestorage.blob.core.windows.net/user-uploads/7469/316353/00000000-0000-0000-0000-000000000000/01_iphone_12_pro_combo_2.jpg',
    11: 'https://product.hstatic.net/1000329106/product/iphone-11-pro-max-didongviet_1_1_75778d5e4b5345abbc5a42af0b269e03_master.png',
    10: 'https://www.apple.com/newsroom/images/product/iphone/standard/iPhone_XR_white-back_09122018_carousel.jpg.large_2x.jpg'
  },
  // Fotografias de catalogo individualizadas por variante. Nao sao fotos da unidade usada.
  // Se uma imagem individual externa falhar, usa a foto oficial da geracao como referencia.
  productPhotos: {
    '18pro': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-18-pro-max-finish-select-silver-202609?wid=900&hei=1112&fmt=png-alpha',
    '14pm-purple': 'https://www.apple.com/newsroom/images/product/availability/geo/Apple-iPhone-14-Pro-Max-deep-purple-geo_inline.jpg.large_2x.jpg',
    '14p-purple': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=900&hei=900&fmt=png-alpha',
    '13-white': 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-starlight-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629907845000',
    '13p-blue': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-blue-select?wid=900&hei=1112&fmt=png-alpha',
    '13p-gold': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-gold-select?wid=900&hei=1112&fmt=png-alpha',
    '13p-gray': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=900&hei=1112&fmt=png-alpha'
  },
  // Reservas de fotos de produtos isolados em fundo branco, do MESMO modelo e cor.
  // Fontes externas: verificar direitos comerciais antes de uso definitivo.
  photoFallbacks: {
    '14pm-purple': 'https://www.apple.com/newsroom/images/product/availability/geo/Apple-iPhone-14-Pro-Max-deep-purple-geo_inline.jpg.large_2x.jpg',
    '14p-purple': 'https://t-mobile.scene7.com/is/image/Tmusprod/Apple-iPhone-14-Pro-Deep-Purple-backimage?fmt=png-alpha',
    '13-white': 'https://bf1af2.akinoncloudcdn.com/products/2024/09/20/108347/ad2de56c-ccda-4ea0-b542-e606f564354c_size3840_cropCenter.jpg',
    '13p-blue': 'https://bf1af2.akinoncloudcdn.com/products/2024/09/20/108314/35347a4f-3d77-4325-a74c-5af0e6354078.jpg',
    '13p-gold': 'https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/243514_0_fmzh1i.png',
    '13p-gray': 'https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/243511_0_o8kuhr.png'
  },
  inventory: [
    {id:'18pro',model:'iPhone 18 Pro Max',generation:18,type:'lacrado',capacity:null,color:null,battery:null,repairs:[],grade:null,notes:'Informado pela loja como lacrado. Confirme modelo, cor, memória e disponibilidade.'},
    {id:'17pro-new',model:'iPhone 17 Pro Max',generation:17,type:'lacrado',capacity:null,color:null,battery:null,repairs:[],grade:null,notes:'Informado pela loja como lacrado. Confirme cor, capacidade e disponibilidade.'},
    {id:'17pro-used',model:'iPhone 17 Pro Max',generation:17,type:'seminovo',capacity:null,color:null,battery:null,repairs:[],grade:null,notes:'Bateria e estado estético a confirmar após conferência.'},
    {id:'14pm-purple',model:'iPhone 14 Pro Max',generation:14,type:'seminovo',capacity:'128 GB',color:'Roxo profundo',battery:86,repairs:[],grade:null,notes:'Detalhes estéticos e histórico de peças a confirmar.'},
    {id:'14p-purple',model:'iPhone 14 Pro',generation:14,type:'seminovo',capacity:'128 GB',color:'Roxo',battery:85,repairs:[],grade:null,notes:'Detalhes estéticos e histórico de peças a confirmar.'},
    {id:'13-white',model:'iPhone 13',generation:13,type:'seminovo',capacity:'128 GB',color:'Branco',battery:92,repairs:[],grade:null,notes:'Conservação estética e histórico de peças a confirmar.'},
    {id:'13p-blue',model:'iPhone 13 Pro',generation:13,type:'seminovo',capacity:'1 TB',color:'Azul',battery:77,repairs:[],grade:null,notes:'Marcas de uso e histórico de peças a confirmar.'},
    {id:'13p-gold',model:'iPhone 13 Pro',generation:13,type:'seminovo',capacity:'1 TB',color:'Dourado',battery:74,repairs:['Tela substituída'],grade:'Razoável',notes:'Tela substituída informada. Confirme estado e funcionamento atual.'},
    {id:'13p-gray',model:'iPhone 13 Pro',generation:13,type:'seminovo',capacity:'1 TB',color:'Cinza',battery:null,repairs:['Tela substituída','Bateria substituída'],grade:'Razoável',notes:'Tela e bateria substituídas, conforme informado pela loja. Saúde atual da bateria a confirmar.'}
  ],
  models: {
    18:['iPhone 18','iPhone 18 Pro','iPhone 18 Pro Max'],
    17:['iPhone 17e','iPhone 17','iPhone 17 Pro','iPhone 17 Pro Max','iPhone Air'],
    16:['iPhone 16e','iPhone 16','iPhone 16 Plus','iPhone 16 Pro','iPhone 16 Pro Max'],
    15:['iPhone 15','iPhone 15 Plus','iPhone 15 Pro','iPhone 15 Pro Max'],
    14:['iPhone 14','iPhone 14 Plus','iPhone 14 Pro','iPhone 14 Pro Max'],
    13:['iPhone 13 mini','iPhone 13','iPhone 13 Pro','iPhone 13 Pro Max'],
    12:['iPhone 12 mini','iPhone 12','iPhone 12 Pro','iPhone 12 Pro Max'],
    11:['iPhone 11','iPhone 11 Pro','iPhone 11 Pro Max'],
    10:['iPhone XR','iPhone XS','iPhone XS Max']
  }
};
let selectedFilter = 'todos';
const favorites = new Set(loadFavorites());
let compared = [];
function loadFavorites() {
  try {
    const v=JSON.parse(localStorage.getItem('md-phone-favorites') || '[]');
    return Array.isArray(v) ? v.filter(x=>typeof x==='string') : [];
  } catch {return [];}
}
function normalizeSearch(text) {
  return String(text||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}
function updateSelections() {
  const n=$('#favoriteTotal');if(n)n.textContent=String(favorites.size);
  const cmp=$('#compareTotal');if(cmp)cmp.textContent=String(compared.length);
  const open=$('#compareOpen');if(open)open.disabled=compared.length<2;
  const dock=$('#compareDock');if(dock)dock.hidden=compared.length<2;
  if(compared.length>1)$('#compareDockText').textContent=compared.length+' aparelhos selecionados';
}
function toggleFavorite(id) {
  if(!MD.inventory.some(p=>p.id===id))return;
  favorites.has(id)?favorites.delete(id):favorites.add(id);
  try {localStorage.setItem('md-phone-favorites',JSON.stringify([...favorites]));}catch{}
  renderProducts();
  notify(favorites.has(id)?'Adicionado aos favoritos':'Removido dos favoritos');
}
function toggleCompare(id) {
  if(!MD.inventory.some(p=>p.id===id))return;
  if(compared.includes(id))compared=compared.filter(x=>x!==id);
  else if(compared.length<3)compared.push(id);
  else {notify('Compare até três aparelhos de cada vez.');return;}
  renderProducts();
  notify(compared.length<2?'Selecione mais um aparelho para comparar':'Seleção pronta para comparar');
}
function openCompare() {
  if(compared.length<2)return;
  const products=compared.map(id=>MD.inventory.find(p=>p.id===id)).filter(Boolean);
  const rows=[
    ['Condição',p=>cond(p)],
    ['Tipo',p=>p.type==='lacrado'?'Lacrado (informado)':'Seminovo'],
    ['Geração',p=>'iPhone '+p.generation],
    ['Memória',p=>p.capacity||'A confirmar'],
    ['Cor',p=>p.color||'A confirmar'],
    ['Bateria',p=>p.type==='lacrado'?'Não se aplica':p.battery===null?'A confirmar':p.battery+'% informado'],
    ['Peças',p=>p.repairs.length?p.repairs.join(', '):'Sem troca confirmada'],
    ['Tela',p=>MD_TECH[p.id]?.display||'A confirmar'],
    ['Chip',p=>MD_TECH[p.id]?.chip||'A confirmar'],
    ['Câmeras',p=>MD_TECH[p.id]?.camera||'A confirmar']
  ];
  $('#compareBody').innerHTML='<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>Detalhes</th>'+products.map(p=>
   '<th><span class="compare-head-kicker">'+escapeHtml(p.type)+'</span><strong>'+escapeHtml(p.model)+'</strong><small>'+escapeHtml(p.color||'Cor a confirmar')+'</small></th>'
  ).join('')+'</tr></thead><tbody>'+rows.map(([name,read])=>
   '<tr><th scope="row">'+escapeHtml(name)+'</th>'+products.map(p=>'<td>'+escapeHtml(read(p))+'</td>').join('')+'</tr>'
  ).join('')+'</tbody></table></div>';
  $('#compareModal').showModal();
}

let selectedGeneration = 18;
let modelSearch = '';
const modelCount = Object.values(MD.models).reduce((n,items)=>n+items.length,0);
function modelPhoto(model,generation){const p=MD.inventory.find(item=>item.model===model&&MD.productPhotos[item.id]);return p?MD.productPhotos[p.id]:(MD.images[generation]||MD.images[11]);}
function modelCard(model,generation){
 const registered=MD.inventory.filter(item=>item.model===model).length;
 const q='Olá! Gostaria de consultar '+model+' na MD PHONE. Pode informar cor, memória, preço e disponibilidade?';
 return '<article class="model-result">'+
 '<small>IPHONE / '+escapeHtml(generation===10?'XR · XS':String(generation))+'</small>'+
 '<h3>'+escapeHtml(model)+'</h3>'+
 '<span>'+(registered?'Há unidade(s) cadastrada(s) · confirmar estoque':'Modelo sob consulta')+'</span>'+
 '<button type="button" data-query="'+escapeHtml(q)+'">Consultar modelo ↗</button></article>';
}
function modelAtlas(generation){
 const models=MD.models[generation]||[];
 const count=MD.inventory.filter(item=>item.generation===generation).length;
 const title=generation===10?'iPhone XR e XS':'iPhone '+generation;
 const img=MD.images[generation]||'';
 const buttons=models.map(model=>{
  const registered=MD.inventory.filter(item=>item.model===model).length;
  const q='Olá! Gostaria de consultar '+model+' na MD PHONE. Pode informar cor, memória, preço e disponibilidade?';
  return '<button type="button" data-query="'+escapeHtml(q)+'" title="'+(registered?'Modelo com unidade cadastrada':'Modelo sob consulta')+'">'+escapeHtml(model)+(registered?' ·':'')+'</button>';
 }).join('');
 return '<div class="model-atlas">'+
  '<div class="model-atlas-media"><span class="model-atlas-label">IMAGEM DE CAMPANHA DA GERAÇÃO</span>'+
    '<img src="'+escapeHtml(img)+'" alt="Imagem promocional ilustrativa da geração '+escapeHtml(String(generation))+', podendo mostrar variantes diferentes" loading="lazy" decoding="async" onerror="this.hidden=true">'+
  '</div><div class="model-atlas-copy">'+
   '<span class="model-atlas-kicker">MD PHONE / GUIA DE MODELOS</span>'+
   '<h3>'+escapeHtml(title)+'</h3>'+
   '<p>Explore cada versão da linha e consulte opções de cor, memória e disponibilidade diretamente com a loja.</p>'+
   '<div class="model-atlas-models">'+buttons+'</div>'+
   '<div class="model-atlas-stock '+(count?'':'muted')+'">'+(count?count+' unidade(s) cadastrada(s) nesta geração · sujeito a confirmação':'Geração disponível somente para consulta')+'</div>'+
  '</div></div>';
}

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

function escapeHtml(value) {
  return String(value === undefined || value === null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function describe(p) {
  return p.type==='lacrado'?'Lacrado — informe da loja':'Seminovo — unidade informada';
}
function cond(p) {
  if (p.type==='lacrado') return 'Lacrado';
  return p.grade || 'Estado a confirmar';
}
function tagClass(p) {
  if(p.type==='lacrado')return 'sealed';
  if(p.grade==='Razoável')return 'repaired';
  return p.grade ? '' : 'unknown';
}
// Especificacoes de fabrica dos modelos, separadas das condicoes do estoque.
const MD_TECH = {
  '18pro': {display:'6,9″ OLED · ProMotion 120 Hz',chip:'A20 Pro',camera:'Sistema Pro Fusion · 48 MP',connect:'5G · USB-C',source:'https://www.apple.com/br/iphone-18-pro/specs/'},
  '17pro-new': {display:'6,9″ OLED · ProMotion 120 Hz',chip:'A19 Pro',camera:'Sistema de cameras Pro Fusion',connect:'5G · USB-C',source:'https://support.apple.com/pt-br/125091'},
  '17pro-used': {display:'6,9″ OLED · ProMotion 120 Hz',chip:'A19 Pro',camera:'Sistema de cameras Pro Fusion',connect:'5G · USB-C',source:'https://support.apple.com/pt-br/125091'},
  '14pm-purple': {display:'6,7″ OLED · ProMotion 120 Hz',chip:'A16 Bionic',camera:'Principal de 48 MP · sistema Pro',connect:'5G · Lightning',source:'https://support.apple.com/pt-br/111846'},
  '14p-purple': {display:'6,1″ OLED · ProMotion 120 Hz',chip:'A16 Bionic',camera:'Principal de 48 MP · sistema Pro',connect:'5G · Lightning',source:'https://support.apple.com/pt-br/111849'},
  '13-white': {display:'6,1″ OLED · Super Retina XDR',chip:'A15 Bionic',camera:'Dupla de 12 MP',connect:'5G · Lightning',source:'https://support.apple.com/pt-br/111872'},
  '13p-blue': {display:'6,1″ OLED · ProMotion 120 Hz',chip:'A15 Bionic',camera:'Tripla de 12 MP · sistema Pro',connect:'5G · Lightning',source:'https://support.apple.com/pt-br/111871'},
  '13p-gold': {display:'6,1″ OLED · ProMotion 120 Hz',chip:'A15 Bionic',camera:'Tripla de 12 MP · sistema Pro',connect:'5G · Lightning',source:'https://support.apple.com/pt-br/111871'},
  '13p-gray': {display:'6,1″ OLED · ProMotion 120 Hz',chip:'A15 Bionic',camera:'Tripla de 12 MP · sistema Pro',connect:'5G · Lightning',source:'https://support.apple.com/pt-br/111871'}
};
function technicalRows(p){const t=MD_TECH[p.id];return t?[['Tela',t.display],['Processador',t.chip],['Câmeras',t.camera],['Conexões',t.connect]]:[];}
function fact(label, value) {
  return '<span>'+escapeHtml(label)+': <b>'+escapeHtml(value)+'</b></span>';
}
function catalogPhoto(p) {
  // Nunca mostrar foto de outra cor nos anuncios de estoque com cor confirmada.
  const fallback = MD.photoFallbacks[p.id] || (p.color ? '' : MD.images[p.generation]) || '';
  return {
    src: MD.productPhotos[p.id] || fallback,
    fallback: fallback
  };
}
function photoErrorFallback() {
  // The failing <img> is passed as 'this' by the inline onerror handler.
  const image = this;
  const fallback = image.dataset.fallback;
  if (fallback && !image.dataset.triedFallback && image.src !== fallback) {
    image.dataset.triedFallback = '1';
    image.src = fallback;
  } else {
    image.hidden = true;
  }
}
// Um único anúncio por modelo. Cada cor e condição aponta para a unidade real do estoque.
const MD_SELECTED_VARIANTS=Object.create(null);
function familyKey(p){return p.model;}
function groupedInventory(items){
 const map=new Map();
 items.forEach(p=>{if(!map.has(familyKey(p)))map.set(familyKey(p),[]);map.get(familyKey(p)).push(p);});
 return [...map.entries()].map(([model,variants])=>({model,variants}));
}
function activeUnit(family){
 const chosen=family.variants.find(p=>p.id===MD_SELECTED_VARIANTS[family.model]);
 const selected=chosen||family.variants[0];
 MD_SELECTED_VARIANTS[family.model]=selected.id;
 return selected;
}
function swatchColor(name){
 const color=normalizeSearch(name);
 if(color.includes('azul'))return '#86abc5';
 if(color.includes('dourad'))return '#d1b184';
 if(color.includes('cinza')||color.includes('grafite'))return '#55575c';
 if(color.includes('roxo'))return '#6f5b82';
 if(color.includes('branco'))return '#e6e5e1';
 return '#6f9b78';
}
function unitLabel(p,needsCondition){
 if(needsCondition)return (p.type==='lacrado'?'Lacrado':'Seminovo')+(p.color?' · '+p.color:'');
 return p.color||'Cor sob consulta';
}
function variantMarkup(p,active,needsCondition){
 const label=unitLabel(p,needsCondition);
 return '<button class="md-variant-choice'+(p.id===active.id?' selected':'')+'" type="button" data-variant-card="'+escapeHtml(p.id)+'" aria-pressed="'+String(p.id===active.id)+'" title="'+escapeHtml(label)+'" aria-label="Selecionar '+escapeHtml(label)+'">'+
   (p.color?'<span class="md-color-dot" style="--unit-color:'+swatchColor(p.color)+'"></span>':'<span class="md-condition-dot"></span>')+
   '<span>'+escapeHtml(label)+'</span></button>';
}
function productMarkup(family) {
 const p=activeUnit(family),photo=catalogPhoto(p),multiple=family.variants.length>1;
 const hasConditions=new Set(family.variants.map(v=>v.type)).size>1;
 const fav=favorites.has(p.id),cmp=compared.includes(p.id);
 const color=escapeHtml(p.color||'Cor sob consulta'),capacity=escapeHtml(p.capacity||'Capacidade sob consulta');
 const battery=p.type==='lacrado'?'Lacrado · informação da loja':p.battery===null?'Bateria a confirmar':'Bateria '+p.battery+'%';
 const repairs=p.repairs.length?p.repairs.join(' · '):'Peças: confirmar histórico';
 return '<article class="product-card md-family-card reveal show" data-family="'+escapeHtml(family.model)+'" aria-label="'+escapeHtml(p.model)+'">'+
 '<div class="product-art md-family-art"><span class="art-label">IMAGEM ILUSTRATIVA · '+escapeHtml(p.model.toUpperCase())+'</span>'+
 '<img class="catalog-device-photo" src="'+escapeHtml(photo.src)+'" data-fallback="'+escapeHtml(photo.fallback)+'" alt="Foto ilustrativa do '+escapeHtml(p.model)+(p.color?' '+color:'')+'" loading="lazy" decoding="async" width="380" height="380" onerror="photoErrorFallback.call(this)">'+
 '<div class="image-unavailable" aria-hidden="true"><strong>MD PHONE</strong><span>Foto sob atualização</span></div></div>'+
 '<div class="product-body">'+
 '<div class="md-card-topline"><span>IPHONE / '+p.generation+'</span><span>'+(family.variants.length>1?family.variants.length+' opções':'Sob consulta')+'</span></div>'+
 '<h3 class="product-name">'+escapeHtml(family.model)+'</h3>'+
 '<p class="md-card-model-details">'+escapeHtml(MD_TECH[p.id]?.display||'Tela a confirmar')+' · '+escapeHtml(MD_TECH[p.id]?.chip||'Chip a confirmar')+'</p>'+
 '<div class="md-variant-area"><span class="md-selector-title">'+(multiple?'Escolha a opção':'Modelo selecionado')+'</span>'+
 '<div class="md-variant-choices" role="group" aria-label="Opções de '+escapeHtml(family.model)+'">'+family.variants.map(v=>variantMarkup(v,p,hasConditions)).join('')+'</div></div>'+
 '<div class="md-unit-summary" aria-live="polite">'+
 '<span>'+color+' · '+capacity+'</span>'+
 '<span>'+escapeHtml(battery)+'</span>'+
 (p.repairs.length?'<span class="md-unit-warning">Atenção: '+escapeHtml(repairs)+'</span>':'')+
 '</div>'+
 '<p class="md-price-request">Preço e disponibilidade <strong>sob consulta</strong></p>'+
 '<div class="product-actions">'+
 '<button type="button" class="product-button" data-product="'+escapeHtml(p.id)+'">Ver ficha</button>'+
 '<button type="button" class="md-buy-button" data-order="'+escapeHtml(p.id)+'">Consultar no WhatsApp <span aria-hidden="true">↗</span></button></div>'+
 '<div class="md-secondary-actions"><button type="button" class="favorite-button'+(fav?' is-active':'')+'" data-favorite="'+escapeHtml(p.id)+'" aria-pressed="'+String(fav)+'" aria-label="Favorito '+escapeHtml(family.model)+'">♡ Favoritar</button>'+
 '<button type="button" class="compare-item'+(cmp?' is-active':'')+'" data-compare="'+escapeHtml(p.id)+'" aria-pressed="'+String(cmp)+'">Comparar</button></div>'+
 '</div></article>';
}
function renderProducts() {
 const q=normalizeSearch($('#search').value.trim()),sort=$('#sortBy')?.value||'destaques';
 const records=MD.inventory.filter(p=>{
  const match=selectedFilter==='todos'||(selectedFilter==='favoritos'?favorites.has(p.id):p.type===selectedFilter);
  const index=normalizeSearch([p.model,p.color,p.capacity,p.type,p.notes,p.grade,p.battery,p.repairs.join(' ')].filter(Boolean).join(' '));
  return match&&(!q||index.includes(q));
 });
 const families=groupedInventory(records);
 if(sort==='recentes')families.sort((a,b)=>Math.max(...b.variants.map(p=>p.generation))-Math.max(...a.variants.map(p=>p.generation)));
 if(sort==='bateria')families.sort((a,b)=>Math.max(...b.variants.map(p=>p.battery??-1))-Math.max(...a.variants.map(p=>p.battery??-1)));
 if(sort==='modelo')families.sort((a,b)=>a.model.localeCompare(b.model,'pt-BR'));
 $('#products').innerHTML=families.length?families.map(productMarkup).join(''):
 '<div class="empty-products"><h3>Nenhum modelo encontrado.</h3><p>Experimente outra busca ou solicite orientação à MD PHONE.</p><button class="button lime" data-query="Olá! Quero consultar outros modelos de iPhone." type="button">Consultar no WhatsApp</button></div>';
 $('#resultCount').textContent=families.length+(families.length===1?' modelo':' modelos')+' · '+records.length+(records.length===1?' opção':' opções')+' cadastradas';
 updateSelections();
}

function setFilter(kind) {
  selectedFilter=kind;
  $$('.tab').forEach(b=>{const active=b.dataset.filter===kind;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  renderProducts();
}
function showProduct(id) {
  const p=MD.inventory.find(item=>item.id===id);
  if(!p)return;
  const photo=catalogPhoto(p);
  const image=photo.src;
  const imageAlt='Foto ilustrativa de catálogo de '+p.model+(p.color?' na cor '+p.color:'')+'. Não é a unidade usada à venda.';
  const data=[
    ['Categoria',describe(p)],
    ['Conservação',cond(p)],
    ['Cor',p.color||'A confirmar'],
    ['Armazenamento',p.capacity||'A confirmar'],
    ['Saúde da bateria',p.type==='lacrado'?'Embalagem lacrada (informada)':(p.battery===null?'A confirmar':p.battery+'% informado')],
    ['Histórico de peças',p.repairs.length?p.repairs.join(', '):'Sem informação de troca confirmada']
  ];
  const el=$('#productModalBody');
  el.innerHTML='<div class="modal-product-layout">'+
    '<div class="modal-real-gallery"><div class="modal-product-picture"><img class="catalog-device-photo" src="'+escapeHtml(image)+'" data-fallback="'+escapeHtml(photo.fallback)+'" onerror="photoErrorFallback.call(this)" alt="'+escapeHtml(imageAlt)+'"></div>'+
    '<small class="real-photo-note">Imagem de divulgação do modelo. Não representa a conservação da unidade à venda.</small></div>'+
    '<div><span class="eyebrow">FICHA INDIVIDUAL / MD PHONE</span><h2>'+escapeHtml(p.model)+'</h2><p>'+escapeHtml(p.notes)+'</p>'+
    '<h3 class="md-spec-title">Condição da unidade</h3><ul>'+data.map(([a,b])=>'<li><span>'+escapeHtml(a)+'</span><b>'+escapeHtml(b)+'</b></li>').join('')+'</ul>'+ 
    '<h3 class="md-spec-title">Especificações do modelo</h3><ul class="md-tech-table">'+technicalRows(p).map(([a,b])=>'<li><span>'+escapeHtml(a)+'</span><b>'+escapeHtml(b)+'</b></li>').join('')+'</ul>'+ 
    (MD_TECH[p.id]?'<a class="md-spec-source" href="'+escapeHtml(MD_TECH[p.id].source)+'" target="_blank" rel="noopener noreferrer">Conferir especificações oficiais na Apple ↗</a>':'')+
    '<p class="modal-warning">Solicite fotos atuais da unidade e confirme bateria, marcas, peças, preço, garantia e disponibilidade antes da compra.</p>'+
    '<div class="modal-actions"><button class="button lime" id="modalConsult" type="button">Solicitar compra / valor ↗</button>'+
    '<button class="button modal-share" id="modalShare" type="button">Compartilhar ficha ↗</button></div></div></div>';
  $('#productModal').showModal();
  $('#modalShare').addEventListener('click',async()=>{
    const link=new URL(window.location.href);
    link.searchParams.set('produto',p.id);
    link.hash='';
    const shareData={title:p.model+' · MD PHONE',text:'Confira a ficha do '+p.model+' na MD PHONE.',url:link.toString()};
    if(typeof navigator.share==='function'){
      try{await navigator.share(shareData);return;}catch(err){if(err&&err.name==='AbortError')return;}
    }
    try{await navigator.clipboard.writeText(link.toString());notify('Link do aparelho copiado');}
    catch{notify('Não foi possível copiar o link neste navegador.');}
  });
  $('#modalConsult').addEventListener('click',()=>{
    $('#productModal').close();
    if(window.MD_ORDER_OPEN)window.MD_ORDER_OPEN(p.id);
    else contact('Olá! Quero consultar o '+p.model+' da MD PHONE.');
  });
}
function renderGenerations() {
 const gens=Object.keys(MD.models).map(Number).sort((a,b)=>b-a);
 $('#generationTabs').innerHTML=gens.map(year=>
   '<button type="button" role="button" aria-pressed="'+String(year===selectedGeneration)+'" class="gen-tab '+(year===selectedGeneration?'active':'')+'" data-gen="'+year+'">'+(year===10?'XR / XS':'iPhone '+year)+'</button>').join('');
 const all=gens.flatMap(g=>MD.models[g].map(model=>({model,generation:g})));
 const chosen=modelSearch?all.filter(item=>normalizeSearch(item.model).includes(normalizeSearch(modelSearch))):null;
 $('#generationList').innerHTML=chosen
  ?(chosen.length?'<div class="model-search-results">'+chosen.map(item=>modelCard(item.model,item.generation)).join('')+'</div>':'<div class="empty-models">Não encontramos esse nome no guia. Tente outra busca.</div>')
  :modelAtlas(selectedGeneration);
 const counter=$('#modelCount');
 if(counter)counter.textContent=(chosen?chosen.length+' modelos encontrados':(MD.models[selectedGeneration]||[]).length+' versões nesta geração')+' · '+modelCount+' no guia';
}

let toastTimer;
function notify(text) {
  const t=$('#toast');t.textContent=text;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),2500);
}
function contact(text) {
  $('#contactText').value=text||'Olá! Quero consultar smartphones, valores e condições na MD PHONE.';
  const link=$('#whatsapp');
  if(MD.whatsapp) {
    link.hidden=false;
    link.href='https://wa.me/'+encodeURIComponent(MD.whatsapp)+'?text='+encodeURIComponent($('#contactText').value);
  } else link.hidden=true;
  $('#contactModal').showModal();
}
function copyText() {
  const text=$('#contactText').value;
  if(navigator.clipboard&&window.isSecureContext) {
    navigator.clipboard.writeText(text).then(()=>notify('Mensagem copiada!')).catch(fallbackCopy);
  } else fallbackCopy();
  function fallbackCopy(){
    const field=$('#contactText');field.focus();field.select();
    try{document.execCommand('copy');notify('Mensagem copiada!');}catch{notify('Selecione e copie a mensagem.');}
  }
}
function playVideo() { notify('Vídeos originais da loja serão disponibilizados após revisão.'); }
function closeVideo(){const video=$('#videoMount video');if(video)video.pause();$('#videoModal').close();$('#videoMount').innerHTML='';}
function init(){
  $('#year').textContent=new Date().getFullYear();
  renderProducts();renderGenerations();
  const initialProduct=new URLSearchParams(window.location.search).get('produto');
  if(initialProduct&&MD.inventory.some(item=>item.id===initialProduct))showProduct(initialProduct);
  const modelSearchInput=$('#modelSearch');if(modelSearchInput)modelSearchInput.addEventListener('input',e=>{modelSearch=e.target.value;renderGenerations();});
  $$('.tab').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
  $('#search').addEventListener('input',renderProducts);
  $('#sortBy').addEventListener('change',renderProducts);
  $('#compareOpen').addEventListener('click',openCompare);
  $('#compareGo').addEventListener('click',openCompare);
  $('#compareClear').addEventListener('click',()=>{compared=[];renderProducts();notify('Comparação limpa');});
  $('#compareClose').addEventListener('click',()=>$('#compareModal').close());
  $('#headerContact').addEventListener('click',()=>contact());
  $('#copyText').addEventListener('click',copyText);
  $('#contactText').addEventListener('input',()=>{if(MD.whatsapp)$('#whatsapp').href='https://wa.me/'+encodeURIComponent(MD.whatsapp)+'?text='+encodeURIComponent($('#contactText').value);});
  $('#contactClose').addEventListener('click',()=>$('#contactModal').close());
  $('#productClose').addEventListener('click',()=>$('#productModal').close());
  $('#videoClose').addEventListener('click',closeVideo);
  $('#mobileTrigger').addEventListener('click',()=>{
    const open=!$('#mobileNav').classList.contains('open');
    $('#mobileNav').classList.toggle('open',open);
    $('#mobileTrigger').setAttribute('aria-expanded',String(open));
  });
  $$('#mobileNav a').forEach(a=>a.addEventListener('click',()=>{
    $('#mobileNav').classList.remove('open');$('#mobileTrigger').setAttribute('aria-expanded','false');
  }));
  document.addEventListener('click',e=>{
    const variant=e.target.closest('[data-variant-card]');if(variant){const found=MD.inventory.find(p=>p.id===variant.dataset.variantCard);if(found){MD_SELECTED_VARIANTS[found.model]=found.id;renderProducts();const b=[...document.querySelectorAll('[data-variant-card]')].find(el=>el.dataset.variantCard===found.id);if(b)b.focus({preventScroll:true});}return;}
   const fav=e.target.closest('[data-favorite]');if(fav){toggleFavorite(fav.dataset.favorite);return;}
    const cmp=e.target.closest('[data-compare]');if(cmp){toggleCompare(cmp.dataset.compare);return;}
    const product=e.target.closest('[data-product]');if(product)showProduct(product.dataset.product);
    const query=e.target.closest('[data-query]');if(query)contact(query.dataset.query);
    const gen=e.target.closest('[data-gen]');if(gen){selectedGeneration=Number(gen.dataset.gen);renderGenerations();}
    const film=e.target.closest('[data-video]');if(film)playVideo(film.dataset.video);
    const show=e.target.closest('[data-show]');if(show)setFilter(show.dataset.show);
  });
  $$('dialog').forEach(d=>d.addEventListener('click',e=>{
    if(e.target===d)d.close();
  }));
  $('#videoModal').addEventListener('close',()=>$('#videoMount').innerHTML='');
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target);}});
    },{rootMargin:'0px 0px -35px 0px',threshold:.06});
    $$('.reveal').forEach(x=>obs.observe(x));
  }else $$('.reveal').forEach(x=>x.classList.add('show'));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
