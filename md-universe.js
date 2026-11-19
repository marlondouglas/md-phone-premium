/* MD PHONE UNIVERSE — uma implementação própria de experiência premium (site estático).
 * Todos os preços e estoques não confirmados permanecem sob consulta.
 * Nenhum depoimento, contador de clientes ou pedido automático é inventado.
 */
(()=>{'use strict';
const D=window.MD_UNIVERSE;if(!D||!D.categories||!D.products)return;
const WA='5533987044866';
const PHOTO={
 iphone:window.MD_PHOTOS?.['hero::iphone']||'https://www.apple.com/v/homepage/images/iphone-18-pro/a/promo_iphone_18_pro__9nn5m4mt2bmy_large.jpg',
 mac:window.MD_PHOTOS?.['hero::mac']||'https://www.apple.com/v/homepage/images/macbook-pro-proled-xdr/a/hero_macbook_pro_proled_xdr_preorder__df38n593sxg2_large.jpg',
 ipad:window.MD_PHOTOS?.['hero::ipad']||'https://www.apple.com/v/homepage/images/ipad-mini/a/promo_ipad_mini_a20_announce__efc6vmmxg58i_large.jpg',
 watch:window.MD_PHOTOS?.['hero::watch']||'https://www.apple.com/br/homepage/built/promos/26_apple-watch-series-12_10/images/promo_apple_watch_series_12__gnlprtt8526a_large.jpg',
 airpods:window.MD_PHOTOS?.['hero::airpods']||'https://www.apple.com/v/homepage/images/airpods-pro-3/a/promo_airpods_pro_3__e4755qofhnyq_large.jpg',
 casa:'https://bfasset.costco-static.com/U447IH35/as/r5k55cb7n2g5ps96f2kmpfg/8897200-847__1?auto=webp&canvas=1024%2C1024&fit=bounds&format=jpg&height=1024&width=1024',
 acessorios:'https://www.celudmovil.com.co/cdn/shop/files/MAGSAFEDUO_1024x1024.png?v=1697827277'
};
const COLORS={iphone:'#2c6b4c',mac:'#315776',ipad:'#51427b',watch:'#564d43',airpods:'#365c62',casa:'#2b704a',acessorios:'#6b5337'};
const ICONS={iphone:'⌁',mac:'▱',ipad:'▣',watch:'◉',airpods:'♫',casa:'⌂',acessorios:'✦'};
const $=(q,root=document)=>root.querySelector(q),$$=(q,root=document)=>Array.from(root.querySelectorAll(q));
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LOCAL_PHOTOS=window.MD_PHOTOS||{};
const srcOf=p=>LOCAL_PHOTOS[p?.id]||p?.image||(p?.category==='iphone'?'':PHOTO[p?.category]||'');
const variantPhoto=(p,i)=>LOCAL_PHOTOS[p?.id+'::variant::'+i]||picked(p,i)?.image||null;
const pictureFormat=p=>p?.image&&/(?:color-lineup|family-lineup|segment|promo_|hero_)/i.test(p.image)?' md-photo-landscape':' md-photo-portrait';
const priceBRL=n=>Number.isFinite(n)?new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(n):'Sob consulta';
const phoneGroup=p=>/^iphone-(?:xr|11|12)(?:-|$)/.test(p.id)?'classicos':/^iphone-(?:13|14|15)(?:-|$)/.test(p.id)?'intermediarios':'recentes';
function phoneFilterUI(items){if(items[0]?.category!=='iphone')return '';
return '<div class="phone-eras" role="group" aria-label="Filtrar geração">'+[['todos','Todos'],['classicos','XR ao 12'],['intermediarios','13 ao 15'],['recentes','16 ao 18']].map(([id,label],i)=>'<button type="button" class="phone-era '+(i===0?'active':'')+'" data-phone-era="'+id+'" aria-pressed="'+(i===0)+'">'+label+'</button>').join('')+'</div>'}
function priceTable(items){if(items[0]?.category!=='iphone')return '';
const rows=items.flatMap(p=>(p.variants||[]).filter(v=>Number.isFinite(v.price)).map(v=>'<tr><td>'+esc(p.name)+'</td><td>'+esc(v.label)+'</td><td>'+esc(v.condition||'Confirmar')+'</td><td>'+priceBRL(v.price)+(v.needsVerification?' *':'')+'</td></tr>'));
return '<details class="price-list"><summary>Tabela completa de preços <span>+</span></summary><div class="price-list-scroll"><table><thead><tr><th>Modelo</th><th>Capacidade / opção</th><th>Condição</th><th>Valor</th></tr></thead><tbody>'+rows.join('')+'</tbody></table></div><p>* Verificar capacidade do iPhone 16 Pro Max antes da compra. Preços fornecidos pela loja e sujeitos a confirmação.</p></details>'}

const picked=(p,i=0)=>p?.variants?.[i]||null;
const condition=(p,i=0)=>picked(p,i)?.condition||(p?.availability==='estoque_informado'?'Seminovo':p?.availability==='sob_consulta'?'Sob consulta':'Condição a confirmar');
function priceHtml(p,i=0){
 const v=picked(p,i),pr=v?.price??p.priceFrom;
 const price=Number.isFinite(pr)?priceBRL(pr):'Sob consulta';
 return '<div class="md-offer" aria-live="polite"><span class="md-offer-caption">'+(Number.isFinite(pr)?'PREÇO INFORMADO · CONFIRMAR DISPONIBILIDADE':'CONSULTE PREÇO E DISPONIBILIDADE')+'</span><strong class="md-offer-price">'+price+'</strong>'+(v?.needsVerification?'<span class="md-offer-warning">Capacidade do aparelho precisa ser conferida</span>':'')+'</div>';
}
const catOf=id=>D.categories.find(c=>c.id===id);
const prodOf=id=>D.products.find(p=>p.id===id);
const linkCat=id=>'index.html?categoria='+encodeURIComponent(id);
const linkProd=id=>'index.html?produto='+encodeURIComponent(id);
const wa=text=>'https://wa.me/'+WA+'?text='+encodeURIComponent(text);
const heroTitles=[
 {tag:'MD PHONE / NOVA GERAÇÃO',title:'Seu próximo.<br><em>Extraordinário.</em>',desc:'Uma nova maneira de descobrir os produtos Apple. Imagens gigantes, design envolvente e atendimento que valoriza cada escolha.',image:PHOTO.iphone,category:'iphone',glow:'#376c49',label:'Descobrir iPhones'},
 {tag:'MD PHONE / MAC',title:'Potência que<br><em>inspira.</em>',desc:'Do primeiro projeto à ideia mais ambiciosa. Um universo de possibilidades para criar, estudar e trabalhar.',image:PHOTO.mac,category:'mac',glow:'#345a71',label:'Explorar Mac'},
 {tag:'MD PHONE / IPAD',title:'Mais tela.<br><em>Mais liberdade.</em>',desc:'Criatividade, mobilidade e ferramentas que acompanham o seu ritmo.',image:PHOTO.ipad,category:'ipad',glow:'#61487b',label:'Explorar iPad'}
];
const state={category:'iphone',index:0,variant:0,cart:null,colorModel:null,colorName:null};
let heroTimer=null,observer=null;
window.mdPhotoFallback=function(img){
 if(!img||!img.parentElement)return;
 if(img.dataset.fallback&&img.src!==img.dataset.fallback&&!img.dataset.triedFallback){
  img.dataset.triedFallback='1';img.src=img.dataset.fallback;return;
 }
 const parent=img.parentElement;
 img.hidden=true;
 parent.classList.add('image-error');
 if(!parent.querySelector('.md-missing-photo')){
  const note=document.createElement('span');
  note.className='md-missing-photo';
  note.setAttribute('role','status');
  note.textContent='Foto deste modelo em atualização. Solicite uma imagem real à MD PHONE.';
  parent.appendChild(note);
 }
};
function imageEl(src,alt='',cls='',picture='',fallback=''){
 if(!src)return '<div class="md-missing-photo">Foto deste modelo em atualização. Solicite imagens reais à loja.</div>';
 return '<img class="'+esc(cls)+'" loading="lazy" decoding="async" src="'+esc(src)+'"'+(fallback&&fallback!==src?' data-fallback="'+esc(fallback)+'"':'')+' alt="'+esc(alt)+'" onerror="window.mdPhotoFallback(this)">';
}
function header(){
return '<a class="skip" href="#principal">Ir ao conteúdo</a><header class="site-head"><div class="head-inner">'+
'<a class="brand" href="index.html" aria-label="MD PHONE — início"><img src="assets/md-phone-brand-mark.svg" alt="" width="42" height="42"> <b>MD</b> PHONE</a>'+
'<nav class="site-nav" aria-label="Categorias">'+D.categories.map(c=>'<a href="'+linkCat(c.id)+'">'+esc(c.label)+'</a>').join('')+'</nav>'+
'<div class="head-actions"><button type="button" id="headerAssistant" class="head-cta md-assistant-top-link">Assistente MD ↗</button><a href="index.html?comparar=1" class="head-cta" title="Comparar modelos">Comparar ↗</a><a href="'+wa('Olá, MD PHONE! Gostaria de atendimento.')+'" class="head-cta" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><button type="button" class="hamburger" id="hamburger" aria-label="Abrir menu" aria-expanded="false">☰</button></div></div>'+
'<nav class="mobile-menu" id="mobileMenu" hidden aria-label="Menu móvel">'+
'<a href="index.html">Início</a>'+D.categories.map(c=>'<a href="'+linkCat(c.id)+'">'+esc(c.label)+'</a>').join('')+
'<button type="button" id="mobileAssistant" class="md-mobile-assistant">Assistente MD ↗</button><a href="index.html?comparar=1">Comparar produtos</a></nav></header>';
}
function footer(){return '<footer class="footer"><div class="footer-inner"><div><a class="brand" href="index.html"><img src="assets/md-phone-brand-mark.svg" alt="" width="42" height="42"><b>MD</b> PHONE</a><p>Uma experiência premium para descobrir, escolher e consultar produtos Apple. Loja independente.</p></div><div class="footer-links"><strong>Produtos</strong>'+D.categories.slice(0,4).map(c=>'<a href="'+linkCat(c.id)+'">'+esc(c.label)+'</a>').join('')+'</div><div class="footer-links"><strong>Explore</strong>'+D.categories.slice(4).map(c=>'<a href="'+linkCat(c.id)+'">'+esc(c.label)+'</a>').join('')+'<a href="index.html?comparar=1">Comparar</a></div><div class="footer-links"><strong>Atendimento</strong><a href="'+wa('Olá! Quero conhecer a MD PHONE.')+'" target="_blank" rel="noopener noreferrer">WhatsApp: (33) 98704-4866 ↗</a><small>Preços e disponibilidade sempre sob confirmação. A MD PHONE não é a Apple.</small></div></div><div class="footer-base"><span>© 2026 MD PHONE · Nova identidade MD Use Imports.</span><span>Apple e nomes de produtos pertencem a seus titulares. Imagens promocionais meramente ilustrativas.</span></div></footer>';}
function button(text,href,kind='primary'){return '<a class="btn '+kind+'" href="'+href+'">'+text+' <span aria-hidden="true">↗</span></a>'}
function cinemaSection(){
 return '<section class="md-cinema-premium" id="cinema" aria-labelledby="mdFilmTitle">'+
 '<div class="md-cinema-heading"><span class="kicker">MD PHONE / FILME ORIGINAL</span>'+
 '<h2 id="mdFilmTitle">A tecnologia.<br><em>Em movimento.</em></h2>'+
 '<p>Uma apresentação original MD PHONE. Vídeo automático, sem YouTube, sem anúncios ou controles visíveis.</p></div>'+
 '<div class="md-cinema-frame" id="mdCinemaFrame">'+
 '<video id="mdCinemaVideo" autoplay muted loop playsinline preload="metadata" disablepictureinpicture aria-label="Filme de produto MD PHONE">'+
 '<source src="assets/mdphone-cinematic.mp4" type="video/mp4"></video>'+
 '<div class="md-cinema-fallback" aria-hidden="true"><img src="'+esc(srcOf(prodOf('iphone-18-pro-max')))+'" alt=""></div>'+
 '<div class="md-cinema-watermark"><img src="assets/md-phone-brand-mark.svg" alt="">MD PHONE <span>ORIGINAL FILM</span></div>'+
 '</div><div class="md-cinema-caption">Produção visual MD PHONE · aparelho ilustrativo · reprodução silenciosa em loop</div></section>';
}
function home(){
return '<section class="hero" aria-label="Apresentação MD PHONE">'+heroTitles.map((h,i)=>'<div class="hero-slide '+(i===0?'active':'')+'" data-slide="'+i+'" style="--glow:'+h.glow+'"><div class="hero-media '+(h.category==='iphone'?'photo-dark':'photo-light')+'">'+imageEl(h.image,'','')+'</div><div class="hero-inner"><div class="hero-content"><div class="kicker">'+h.tag+'</div><h1>'+h.title+'</h1><p class="hero-desc">'+h.desc+'</p><div class="action-row">'+button(h.label,linkCat(h.category))+button('Falar com a loja',wa('Olá, MD PHONE! Quero escolher meu próximo produto Apple.'),'secondary')+'</div><div class="hero-foot"><span>DESIGN · TECNOLOGIA · CONFIANÇA</span><span>MD PHONE / 2026</span></div></div></div></div>').join('')+'<div class="hero-timeline" aria-hidden="true">'+heroTitles.map((_,i)=>'<span class="timeline-item '+(i===0?'active':'')+'"></span>').join('')+'</div></section>'+
cinemaSection()+
'<section class="marquee" aria-label="Linhas Apple"><div class="marquee-track">'+[...D.categories,...D.categories,...D.categories,...D.categories].map(c=>'<span><b>✦</b> '+esc(c.label.toUpperCase())+'</span>').join('')+'</div></section>'+
'<section class="section universe" id="colecoes"><div class="section-inner"><div class="section-top"><div><div class="kicker">MD PHONE / UNIVERSO APPLE</div><h2 class="section-heading">Tudo o que você ama.<br><em>Em um só lugar.</em></h2></div><p class="section-sub">Explore cada família com apresentação dedicada, fotos amplas e a liberdade de escolher o modelo ideal.</p></div><div class="category-grid">'+D.categories.map((c,i)=>'<a href="'+linkCat(c.id)+'" class="category-tile reveal image-'+esc(c.id)+'" style="--tile-glow:'+COLORS[c.id]+'"><div class="tile-visual">'+imageEl(PHOTO[c.id]||PHOTO.iphone,'Foto ilustrativa de '+c.label,'',c.label)+'</div><div class="tile-content"><span class="tile-eyebrow">MD PHONE · '+String(i+1).padStart(2,'0')+'</span><h3>'+esc(c.label)+'</h3><p>'+esc(c.sub)+'</p><span class="tile-arrow">Explorar coleção ↗</span></div></a>').join('')+'</div></div></section>'+
'<section class="immersive-strip"><div class="strip-copy"><span class="kicker">MD PHONE / FILME CONCEITUAL</span><h2>O detalhe<br>faz a diferença.</h2><p>Fotografia de produto em primeiro plano, transições naturais e um catálogo que valoriza cada escolha.</p>'+button('Conhecer iPhone 18 Pro Max',linkProd('iphone-18-pro-max'))+'</div><div class="strip-photo">'+imageEl(PHOTO.iphone,'Imagem promocional do iPhone Pro')+'<video class="brand-film" autoplay muted loop playsinline preload="metadata" disablepictureinpicture aria-hidden="true"><source src="https://resource2.heygen.ai/videos/ee161397c93a4dbda4b7e524885f995f/ee161397c93a4dbda4b7e524885f995f/01a1f13d-3fdc-7e47-ac0b-58b2c3d50310.mp4" type="video/mp4"></video></div></section>'+
'<section class="trust-strip"><div class="trust-items"><div class="trust-item"><strong>01 / ESCOLHA</strong><p>Conheça a linha Apple em páginas individuais, sem repetir os mesmos modelos por toda a loja.</p></div><div class="trust-item"><strong>02 / INFORMAÇÃO</strong><p>Consulte configuração, memória, bateria e histórico conhecido dos seminovos.</p></div><div class="trust-item"><strong>03 / ATENDIMENTO</strong><p>Escolha o produto e envie a solicitação por WhatsApp, com seus dados prontos.</p></div></div></section>'+
'<section class="story"><div><div class="kicker">A NOSSA HISTÓRIA</div><h2>Nova identidade.<br>Mais possibilidades.</h2><p>MD PHONE é a nova identidade da MD Use Imports. Reunimos a linha Apple em uma experiência de escolha dedicada e atendimento personalizado, com informações transparentes sobre cada aparelho.</p>'+button('Conversar com a equipe',wa('Olá, MD PHONE! Quero informações sobre os produtos.'),'secondary')+'</div><div class="story-logo"><img src="assets/md-phone-brand-mark.svg" alt="Marca MD PHONE"></div></section>';
}

function phoneCatalog(items,activeId){
 if(items[0]?.category!=='iphone')return '';
 return '<section class="md-phone-catalog" id="catalogo-completo" aria-labelledby="mdAllPhonesTitle">'+
 '<div class="md-catalog-head"><div><div class="kicker">MD PHONE / CATÁLOGO COMPLETO</div>'+
 '<h2 id="mdAllPhonesTitle">A seleção <em>MD PHONE.</em></h2><p>Somente os 14 modelos informados pela loja, com fotos amplas e os preços de cada versão.</p></div>'+
 '<span class="md-catalog-counter" id="mdCatalogCounter">'+items.length+' modelos</span></div>'+
 '<div class="md-catalog-grid" id="mdPhoneCatalog">'+items.map(p=>{
  const src=srcOf(p),fallback=p.photoFallback||((p.image&&src!==p.image)?p.image:'');
  const photo=src?'<img src="'+esc(src)+'"'+(fallback?' data-fallback="'+esc(fallback)+'"':'')+' loading="lazy" decoding="async" alt="Foto ilustrativa do '+esc(p.name)+'" onerror="window.mdTileFallback(this)">':'';
  return '<button type="button" class="md-phone-tile'+(p.id===activeId?' active':'')+'" data-show-iphone="'+esc(p.id)+'" data-phone-period="'+phoneGroup(p)+'" aria-pressed="'+(p.id===activeId)+'" aria-label="Ver '+esc(p.name)+(Number.isFinite(p.priceFrom)?', a partir de '+priceBRL(p.priceFrom):', preço sob consulta')+'">'+
  '<span class="md-tile-visual">'+photo+'<span class="md-tile-symbol" aria-hidden="true">✦</span></span>'+
  '<span class="md-tile-name">'+esc(p.name)+'</span>'+
  '<span class="md-tile-price">'+(Number.isFinite(p.priceFrom)?'A partir de '+priceBRL(p.priceFrom):'Sob consulta')+'</span>'+
  '</button>';
 }).join('')+'</div>'+
 '<p class="md-catalog-note">Fotos promocionais de referência. As cores, condições, valores e disponibilidade das unidades devem ser confirmados com a loja.</p></section>';
}
window.mdTileFallback=function(img){
 if(!img)return;
 if(img.dataset.fallback&&!img.dataset.retried){
  img.dataset.retried='1';
  img.src=img.dataset.fallback;
 }else{
  img.remove();
 }
};
function categoryPage(c){
 const items=D.products.filter(p=>p.category===c.id);
 state.category=c.id;state.index=0;
 const featured=c.id==='iphone'?(items.find(p=>p.id==='iphone-18-pro-max')||items[0]):(items.find(p=>p.featured)||items[0]);
 const isPhone=c.id==='iphone';
 const hero='<section class="category-hero '+(isPhone?'md-iphone-banner':'')+'" style="--hero-glow:'+COLORS[c.id]+'">'+
 (isPhone?'':'<div class="category-photo '+(c.id==='iphone'?'photo-dark':'photo-light')+'">'+imageEl(srcOf(featured),'Imagem ilustrativa da linha '+c.label)+'</div>')+
 '<div class="category-copy"><span class="kicker">MD PHONE / '+esc(c.label.toUpperCase())+'</span>'+
 '<h1>'+esc(c.label)+'</h1><p>'+esc(isPhone?'Do XR ao 18 Pro Max. Aparelhos anunciados pela MD PHONE, com fotos grandes, cores, capacidades e preços bem apresentados.':c.line)+'</p>'+
 '<div class="action-row">'+button('Escolher modelo','#modelos')+button(isPhone?'Ver os 14 modelos à venda':'Falar com a loja',isPhone?'#catalogo-completo':wa('Olá, MD PHONE! Quero informações sobre a linha '+c.label+'.'),'secondary')+'</div></div></section>';
 const picker=isPhone?
 '<div class="md-model-picker"><label for="mdPhoneModel"><span>ESCOLHA SEU IPHONE</span><select id="mdPhoneModel" aria-label="Escolher modelo do iPhone">'+
 items.map(p=>'<option value="'+esc(p.id)+'" '+(p.id===featured.id?'selected':'')+'>'+esc(p.name)+(p.priceFrom!=null?' · a partir de '+priceBRL(p.priceFrom):'')+'</option>').join('')+
 '</select></label><span class="md-model-count">'+items.length+' modelos · exibindo apenas o escolhido</span></div>':
 '<div class="model-rail" role="tablist" aria-label="Modelos '+esc(c.label)+'">'+items.map((p,i)=>'<button class="model-tab '+(i===0?'active':'')+'" data-model-index="'+i+'" role="tab" aria-selected="'+(i===0)+'">'+esc(p.name)+'</button>').join('')+'</div>';
 const showcase='<section class="section model-section" id="modelos"><div class="section-inner">'+
 '<div class="model-intro"><div class="kicker">COLEÇÃO / '+esc(c.label.toUpperCase())+'</div>'+
 '<h2 class="section-heading">'+(isPhone?'Seu iPhone. <em>Sua escolha.</em>':'Escolha seu <em>favorito.</em>')+'</h2>'+
 '<p class="section-sub">'+esc(isPhone?'Selecione uma geração e um modelo. O produto aparece sozinho, sem dezenas de imagens ou textos disputando espaço.':c.sub)+'</p></div>'+
 (isPhone?phoneFilterUI(items):'')+picker+
 '<div id="modelStage" aria-live="polite">'+modelStage(featured)+'</div>'+
 (isPhone?phoneCatalog(items,featured.id):'')+
 (isPhone?priceTable(items):'')+
 '<p class="small-note">As imagens são ilustrativas. Preços informados pela loja; cores, condição, peças, estoque e garantia precisam de confirmação.</p></div></section>';
 const other=isPhone?'':'<section class="section universe"><div class="section-inner"><div class="section-top"><h2 class="section-heading">Explore outras <em>linhas.</em></h2></div><div class="category-grid">'+
 D.categories.filter(x=>x.id!==c.id).slice(0,3).map(x=>'<a href="'+linkCat(x.id)+'" class="category-tile" style="--tile-glow:'+COLORS[x.id]+'"><div class="tile-visual">'+imageEl(PHOTO[x.id],'Foto da linha '+x.label)+'</div><div class="tile-content"><h3>'+esc(x.label)+'</h3><span class="tile-arrow">Descobrir ↗</span></div></a>').join('')+'</div></div></section>';
 return hero+showcase+(isPhone?cinemaSection():'')+other;
}
function selectedColor(p){
 if(!p?.colors?.length)return '';
 const saved=state.colorModel===p.id?state.colorName:null;
 return p.colors.some(c=>c.name===saved)?saved:(p.defaultColor||p.colors[0].name);
}
function variantColor(p,v){
 if(!v||!p?.colors?.length)return '';
 const hint=(v.color||v.label||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 if(!v.color&&!/[·]\s*(azul|dourado|grafite|roxo|branco|preto|prateado|verde|rosa|amarelo)/i.test(v.label||''))return '';
 const aliases=[['azul','azul'],['dourado','dourado'],['grafite','grafite'],['roxo','roxo'],['branco','estelar'],['preto','preto'],['prateado','prateado'],['verde','verde'],['rosa','rosa'],['amarelo','amarelo']];
 const key=(aliases.find(([a])=>hint.includes(a))||[])[1];
 if(!key)return '';
 return p.colors.find(c=>c.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().startsWith(key))?.name||'';
}
function colorPhoto(p,color){
 return LOCAL_PHOTOS[p?.id+'::color::'+color]||p?.colorPhotos?.[color]||null;
}
function colorSelector(p){
 if(p.category!=='iphone'||!p.colors?.length)return '';
 const selected=selectedColor(p);
 return '<div class="md-colors" aria-label="Cores oficiais do '+esc(p.name)+'">'+
  '<div class="md-colors-title"><strong>Cores do modelo</strong><span class="md-color-current">'+esc(selected)+'</span></div>'+
  '<div class="md-color-swatch-list" role="group" aria-label="Escolher cor desejada">'+p.colors.map(c=>
   '<button class="md-color-swatch'+(c.name===selected?' active':'')+'" type="button" data-color-model="'+esc(p.id)+'" data-color-name="'+esc(c.name)+'" title="'+esc(c.name)+'" aria-label="Cor '+esc(c.name)+'" aria-pressed="'+(c.name===selected)+'" style="--swatch:'+esc(c.hex)+'"><span class="md-color-dot"></span></button>'
  ).join('')+'</div>'+
  '<p class="md-color-disclaimer">Cores disponíveis de fábrica, não necessariamente em estoque. Fotos ilustrativas; nem todas as cores têm fotografia individual.</p></div>';
}
function applyColorChoice(p,color){
 if(!p||!p.colors?.some(c=>c.name===color))return;
 state.colorModel=p.id;state.colorName=color;
 $$('[data-color-model]').filter(btn=>btn.dataset.colorModel===p.id).forEach(btn=>{
  const active=btn.dataset.colorName===color;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));
 });
 $$('.md-color-current').forEach(el=>{el.textContent=color});
 const art=$('.model-art')||$('.product-photo');
 if(art){
  art.style.setProperty('--selected-color',p.colors.find(c=>c.name===color).hex);
  const img=art.querySelector('img');
  const src=colorPhoto(p,color)||variantPhoto(p,state.variant)||srcOf(p);
  const fallback=p.colorPhotos?.[color]||picked(p,state.variant)?.image||p.image||'';
  if(img&&src){
   if(img.getAttribute('src')!==src){
    img.hidden=false;art.classList.remove('image-error');art.querySelector('.md-missing-photo')?.remove();
    img.dataset.triedFallback='';img.dataset.fallback=fallback;img.src=src;
   }
   img.alt='Imagem ilustrativa '+p.name+' · cor desejada: '+color;
  }
 }
}
function initColorPreference(p){
 state.colorModel=p?.id||null;state.colorName=p?.defaultColor||p?.colors?.[0]?.name||null;
}

function modelStage(p){
 if(!p)return '<div class="md-no-photo">Modelo em atualização. Consulte a loja.</div>';
 const iphone=p.category==='iphone',stock=p.availability==='estoque_informado';
 const info=iphone?'Selecione a cor e veja as configurações. Consulte o estoque da unidade desejada.':p.desc;
 const conditionText=stock?'UNIDADE INFORMADA':'DISPONIBILIDADE SOB CONFIRMAÇÃO';
 return '<div class="model-stage" style="--model-glow:'+esc(p.accent||COLORS[p.category])+'">'+
 '<div class="model-art'+(iphone?' md-iphone-motion':'')+pictureFormat(p)+'">'+imageEl(srcOf(p),'Imagem ilustrativa do '+p.name,'','',p.photoFallback||p.image)+
 '<span class="model-art-label">'+(p.imageFamilyReference?'FOTO DE REFERÊNCIA DA LINHA '+esc(p.imageFamilyReference.toUpperCase()):'FOTO DE REFERÊNCIA · CONFIRME O APARELHO REAL')+'</span></div>'+
 '<div class="model-info"><div class="kicker">MD PHONE / '+esc(conditionText)+'</div>'+
 '<h3>'+esc(p.name)+'</h3><p class="md-model-summary">'+esc(info)+'</p>'+
 priceHtml(p)+colorSelector(p)+
 '<div class="model-actions">'+button(iphone?'Ver capacidades e detalhes':'Ver detalhes',linkProd(p.id))+
 '<button type="button" class="btn secondary" data-buy="'+esc(p.id)+'">Consultar pelo WhatsApp ↗</button></div></div></div>';
}
function productPage(p){
 const c=catOf(p.category),stock=p.availability==='estoque_informado';
 return '<section class="product-hero" style="--prod-glow:'+esc(p.accent||COLORS[p.category])+'">'+
 '<div class="product-photo '+(p.category==='iphone'?'photo-dark md-iphone-motion':'photo-light')+pictureFormat(p)+'">'+imageEl(srcOf(p),'Imagem promocional do modelo '+p.name,'','',p.photoFallback||p.image)+'</div>'+
 '<div class="product-copy"><span class="kicker">MD PHONE / '+esc(c.label.toUpperCase())+'</span>'+
 '<h1>'+esc(p.name)+'</h1><p>'+esc(p.desc)+'</p><div class="stock-label">'+
 (stock?'Unidade informada · confirme disponibilidade':p.variants?.length?'Preço informado · estoque sob confirmação':'Modelo sob consulta')+
 '</div><div id="productOffer">'+priceHtml(p,0)+'</div>'+colorSelector(p)+variantButtons(p)+
 '<div class="product-details" id="productDetails">'+detailSpecs(p,0)+'</div>'+
 '<div class="action-row"><button type="button" class="btn primary" data-buy="'+esc(p.id)+'">Solicitar este produto ↗</button>'+
 button('Ver outros '+c.label,linkCat(c.id),'secondary')+'</div>'+
 '<p class="small-note">Valores informados pela MD PHONE. Condição, preço final e disponibilidade precisam de confirmação. Fotos ilustrativas, não representam o estado físico dos seminovos.</p></div></section>';
}
function variantButtons(p){
 if(!p.variants?.length)return '';
 return '<div class="variant-list" role="group" aria-label="Escolha a capacidade e condição">'+p.variants.map((v,i)=>
  '<button type="button" data-variant="'+i+'" class="'+(i===0?'active':'')+'" aria-pressed="'+(i===0)+'">'+
  esc(v.label)+(Number.isFinite(v.price)?' · '+priceBRL(v.price):'')+'</button>').join('')+'</div>';
}
function detailSpecs(p,i){
 const v=picked(p,i);
 if(!v)return (p.specs||[]).map(x=>'<div><b>Característica:</b> '+esc(x)+'</div>').join('')||'<div>Configurações sob consulta</div>';
 const items=['<div><b>Configuração:</b> '+esc(v.label)+'</div>',
 '<div><b>Condição:</b> '+esc(condition(p,i))+'</div>',
 '<div><b>Preço anunciado:</b> '+priceBRL(v.price)+'</div>'];
 if(v.battery!=null)items.push('<div><b>Bateria:</b> '+esc(v.battery)+'% informado</div>');
 if(v.repairs)items.push('<div><b>Histórico de peças:</b> '+esc(v.repairs)+'</div>');
 if(v.needsVerification)items.push('<div class="md-offer-warning"><b>Verificação necessária:</b> '+esc(v.verificationNote||'Verificar a configuração do aparelho.')+'</div>');
 return items.join('');
}
function comparePage(){
const list=D.products.filter(p=>p.category==='iphone');
return '<section class="section compare"><div class="section-inner"><div class="kicker">MD PHONE / COMPARAÇÃO</div><h1 class="section-heading">Dois modelos.<br><em>Uma escolha.</em></h1><p class="section-sub">Compare os modelos cadastrados. Valores e disponibilidade sempre sob confirmação.</p><div class="compare-toolbar"><select id="compA" aria-label="Primeiro modelo">'+list.map((p,i)=>'<option value="'+esc(p.id)+'">'+esc(p.name)+'</option>').join('')+'</select><select id="compB" aria-label="Segundo modelo">'+list.map((p,i)=>'<option value="'+esc(p.id)+'" '+(i===1?'selected':'')+'>'+esc(p.name)+'</option>').join('')+'</select></div><div class="compare-table" id="compareContent"></div></div></section>';
}
function compareDetails(p){return '<div class="compare-col"><div class="kicker">COMPARANDO</div><h3>'+esc(p.name)+'</h3><p>'+esc(p.desc)+'</p><div class="compare-row">Categoria: '+esc(catOf(p.category).label)+'</div>'+(p.specs||[]).map(x=>'<div class="compare-row">'+esc(x)+'</div>').join('')+'<div class="compare-row">'+(p.availability==='estoque_informado'?'Unidade cadastrada':p.priceFrom!=null?'Preço informado · confira disponibilidade':'Sob consulta')+'</div>'+priceHtml(p)+button('Ver produto',linkProd(p.id))+'</div>'}
function renderCompare(){const a=prodOf($('#compA')?.value),b=prodOf($('#compB')?.value),box=$('#compareContent');if(a&&b&&box)box.innerHTML=compareDetails(a)+compareDetails(b)}
function assistantDialogMarkup(){
 const phoneOptions=D.products.filter(p=>p.category==='iphone').map(p=>'<option value="'+esc(p.name)+'">'+esc(p.name)+'</option>').join('');
 return '<dialog id="helpDialog" class="dialog md-assistant-dialog" aria-labelledby="helpTitle">'+
 '<button type="button" class="dialog-close" data-close="helpDialog" aria-label="Fechar assistente">×</button>'+
 '<div class="md-assistant-hero"><img src="assets/md-assistant-avatar.svg" width="90" height="98" alt="Personagem do Assistente MD">'+
 '<div><div class="kicker">MD PHONE / ATENDIMENTO PERSONALIZADO</div><h2 id="helpTitle">Encontre o iPhone certo.</h2></div></div>'+
 '<p>Escolha suas preferências. O assistente prepara a consulta e você confirma o envio pelo WhatsApp.</p>'+
 '<form id="helpForm" class="md-assistant-form">'+
 '<label class="full">Qual iPhone você procura?<select id="helpModel"><option value="Quero uma recomendação">Ainda não sei — quero orientação</option>'+phoneOptions+'</select></label>'+
 '<label>Qual faixa de valor?<select id="helpBudget"><option>Quero consultar preços</option><option>Até R$ 2.000</option><option>R$ 2.000 a R$ 3.000</option><option>R$ 3.000 a R$ 4.500</option><option>Acima de R$ 4.500</option></select></label>'+
 '<label>Preferência de aparelho<select id="helpCondition"><option>Sem preferência</option><option>Seminovo</option><option>Novo lacrado</option></select></label>'+
 '<label>O que deseja?<select id="helpPurchase"><option>Apenas comprar</option><option>Tenho aparelho na troca</option></select></label>'+
 '<label>Quando pretende comprar?<select id="helpTiming"><option>Estou pesquisando</option><option>Quero comprar agora</option><option>Nos próximos dias</option></select></label>'+
 '<label class="full">Detalhes da sua preferência<textarea id="helpNote" rows="3" maxlength="360" placeholder="Cor, memória, bateria, aparelho na troca ou detalhes importantes..."></textarea></label>'+
 '<button class="btn primary dialog-submit" type="submit">Continuar pelo WhatsApp ↗</button>'+
 '<small>A loja confirma fotos reais, valor, disponibilidade, estado e garantia. O WhatsApp abre com a mensagem pronta, sem enviar automaticamente.</small>'+
 '</form></dialog>';
}
function dialogMarkup(){return '<button class="concierge md-mascot-trigger" id="concierge" type="button" aria-label="Abrir assistente de compra MD PHONE"><img class="md-mascot-avatar" src="assets/md-assistant-avatar.svg" width="65" height="69" alt="" decoding="async"> <span>Assistente MD</span> <span aria-hidden="true">↗</span></button>'+
'<dialog id="buyDialog" class="dialog" aria-labelledby="buyTitle"><button type="button" class="dialog-close" data-close="buyDialog" aria-label="Fechar">×</button><div class="kicker">MD PHONE / SOLICITAÇÃO</div><h2 id="buyTitle">Sua escolha começa aqui.</h2><p>Preencha seus dados para preparar uma solicitação ao WhatsApp. Não realizamos pagamento ou reserva pelo site.</p><div class="dialog-choice" id="buyChoice"></div><form id="buyForm"><label>Nome completo *<input id="buyerName" autocomplete="name" minlength="2" maxlength="90" required placeholder="Seu nome"></label><label>WhatsApp para retorno *<input id="buyerPhone" type="tel" autocomplete="tel" minlength="10" maxlength="20" required placeholder="(33) 99999-9999"></label><label>Como deseja receber?<select id="shipping"><option value="Consultar entrega">Consultar entrega</option><option value="Retirada com a loja">Retirada com a loja</option></select></label><label>Cidade / UF<input id="buyerCity" autocomplete="address-level2" maxlength="100" placeholder="Governador Valadares / MG"></label><label class="full" id="addressLabel">Endereço para consulta de entrega<input id="buyerAddress" autocomplete="street-address" maxlength="180" placeholder="Rua, número, bairro e complemento"></label><label>CEP (opcional)<input id="buyerCep" autocomplete="postal-code" maxlength="9" placeholder="00000-000"></label><label class="full">Detalhes (opcional)<textarea id="buyerNotes" rows="2" maxlength="240" placeholder="Cor, memória, troca de aparelho..."></textarea></label><label class="consent"><input id="buyerConsent" type="checkbox" required>Autorizo compartilhar meus dados com a MD PHONE pelo WhatsApp para receber atendimento.</label><button class="btn primary dialog-submit" type="submit">Abrir WhatsApp com pedido ↗</button><small>Os dados não são guardados neste site. O WhatsApp será aberto com mensagem pronta, para você confirmar o envio.</small></form></dialog>'+
assistantDialogMarkup();
}
function init(){
const url=new URL(location.href),prod=prodOf(url.searchParams.get('produto')),cat=catOf(url.searchParams.get('categoria')),compare=url.searchParams.has('comparar');
if(prod)initColorPreference(prod);else if(cat){const first=D.products.find(p=>p.category===cat.id);if(first)initColorPreference(first)}
const content=prod?productPage(prod):cat?categoryPage(cat):compare?comparePage():home();
const root=$('#root');if(!root)return;root.innerHTML=header()+'<main id="principal">'+content+'</main>'+footer()+dialogMarkup();
document.title=(prod?prod.name+' | ':cat?cat.label+' | ':compare?'Comparar produtos | ':'')+'MD PHONE — Universo Apple';
$$('.site-nav a').forEach(a=>{if(cat&&a.getAttribute('href')===linkCat(cat.id))a.classList.add('active')});
$('#hamburger')?.addEventListener('click',()=>{const m=$('#mobileMenu'),b=$('#hamburger');m.hidden=!m.hidden;b.setAttribute('aria-expanded',String(!m.hidden))});
const cinemaVideo=$('#mdCinemaVideo'),cinemaFrame=$('#mdCinemaFrame');
if(cinemaVideo&&cinemaFrame){
 const showFilm=()=>cinemaFrame.classList.add('is-playing');
 const showPoster=()=>cinemaFrame.classList.remove('is-playing');
 cinemaVideo.muted=true;
 cinemaVideo.addEventListener('playing',showFilm);
 cinemaVideo.addEventListener('canplay',()=>{if(!document.hidden&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)cinemaVideo.play().catch(showPoster);});
 cinemaVideo.addEventListener('error',showPoster);
 cinemaVideo.addEventListener('stalled',()=>{if(cinemaVideo.readyState<2)showPoster()});
 if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)cinemaVideo.play().catch(showPoster);
}
if(!prod&&!cat&&!compare)startHero();
if(cat)setupCategory(cat);
if(compare){$('#compA')?.addEventListener('change',renderCompare);$('#compB')?.addEventListener('change',renderCompare);renderCompare();}
document.addEventListener('click',e=>{
 const color=e.target.closest('[data-color-model]');if(color){applyColorChoice(prodOf(color.dataset.colorModel),color.dataset.colorName);return;}
 const b=e.target.closest('[data-buy]');if(b){openBuy(b.dataset.buy);return;}
 const v=e.target.closest('[data-variant]');if(v&&prod){state.variant=Number(v.dataset.variant);$$('[data-variant]').forEach(x=>{const active=x===v;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});const det=$('.product-details');if(det)det.innerHTML=detailSpecs(prod,state.variant);const offer=$('#productOffer');if(offer)offer.innerHTML=priceHtml(prod,state.variant);
 const item=picked(prod,state.variant);const matchedColor=variantColor(prod,item);if(matchedColor)applyColorChoice(prod,matchedColor);const selected=selectedColor(prod);
 const img=$('.product-photo img');if(img){const src=colorPhoto(prod,selected)||variantPhoto(prod,state.variant)||srcOf(prod);if(src){img.hidden=false;img.parentElement.classList.remove('image-error');img.parentElement.querySelector('.md-missing-photo')?.remove();img.dataset.triedFallback='';img.dataset.fallback=prod.colorPhotos?.[selected]||item?.image||prod.image||'';img.src=src;}
 img.alt='Imagem promocional ilustrativa de '+prod.name+' '+(item?.label||'');}
 return;}
 const c=e.target.closest('[data-close]');if(c){const d=document.getElementById(c.dataset.close);if(d.open)d.close();return;}
});
for(const id of ['buyDialog','helpDialog']){const d=document.getElementById(id);d?.addEventListener('click',e=>{if(e.target===d)d.close()})}
const openAssistant=()=>$('#helpDialog')?.showModal();
$('#concierge')?.addEventListener('click',openAssistant);
$('#headerAssistant')?.addEventListener('click',openAssistant);
$('#mobileAssistant')?.addEventListener('click',openAssistant);
$('#shipping')?.addEventListener('change',e=>{$('#addressLabel').hidden=e.target.value==='Retirada com a loja'});
$('#buyForm')?.addEventListener('submit',submitBuy);
$('#helpForm')?.addEventListener('submit',e=>{
 e.preventDefault();
 const msg=[
  'Olá, MD PHONE! Vim pelo Assistente MD do site.',
  'iPhone desejado: '+$('#helpModel').value,
  'Faixa de valor: '+$('#helpBudget').value,
  'Condição: '+$('#helpCondition').value,
  'Objetivo: '+$('#helpPurchase').value,
  'Quando comprar: '+$('#helpTiming').value
 ];
 const notes=$('#helpNote').value.trim();
 if(notes)msg.push('Outros detalhes: '+notes);
 msg.push('Pode confirmar preços, fotos reais, disponibilidade e opções de compra?');
 openWhatsapp(msg.join('\n'));
});
if('IntersectionObserver'in window){observer=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');observer.unobserve(en.target)}}),{threshold:.08});$$('.reveal').forEach(e=>observer.observe(e));}
}
function startHero(){const slides=$$('.hero-slide');if(slides.length<2)return;let i=0;heroTimer=setInterval(()=>{if(document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return;slides[i].classList.remove('active');$$('.timeline-item')[i]?.classList.remove('active');i=(i+1)%slides.length;slides[i].classList.add('active');$$('.timeline-item')[i]?.classList.add('active')},6500)}
function setupCategory(cat){
 const items=D.products.filter(p=>p.category===cat.id);
 const render=p=>{
  if(!p)return;
  state.variant=0;initColorPreference(p);
  const stage=$('#modelStage');if(stage)stage.innerHTML=modelStage(p);
 };
 if(cat.id==='iphone'){
  const select=$('#mdPhoneModel');
  if(!select)return;
  const syncTiles=id=>$$('[data-show-iphone]').forEach(b=>{
   const on=b.dataset.showIphone===id;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));
  });
  const choose=(id,scroll)=>{
   const p=prodOf(id);if(!p||p.category!=='iphone')return;
   if(![...select.options].some(x=>x.value===id)){
    const era=phoneGroup(p);
    const filter=$$('[data-phone-era]').find(b=>b.dataset.phoneEra===era);
    if(filter)filter.click();
   }
   select.value=id;render(p);syncTiles(id);
   if(scroll){
    const stage=$('#modelStage');
    stage?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
   }
  };
  select.addEventListener('change',()=>choose(select.value,false));
  $$('[data-show-iphone]').forEach(tile=>tile.addEventListener('click',()=>choose(tile.dataset.showIphone,true)));
  $$('[data-phone-era]').forEach(button=>button.addEventListener('click',()=>{
   const era=button.dataset.phoneEra;
   $$('[data-phone-era]').forEach(x=>{
    const on=x===button;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on));
   });
   const options=items.filter(p=>era==='todos'||phoneGroup(p)===era);
   select.innerHTML=options.map(p=>'<option value="'+esc(p.id)+'">'+esc(p.name)+(Number.isFinite(p.priceFrom)?' · a partir de '+priceBRL(p.priceFrom):'')+'</option>').join('');
   $$('[data-show-iphone]').forEach(tile=>{tile.hidden=era!=='todos'&&tile.dataset.phonePeriod!==era});
   const counter=$('#mdCatalogCounter');if(counter)counter.textContent=options.length+' modelos';
   const chosen=options.find(p=>p.id==='iphone-18-pro-max')||options.find(p=>p.priceFrom!=null)||options[0];
   if(chosen)choose(chosen.id,false);
  }));
  choose(select.value,false);
  return;
 }
 $$('[data-model-index]').forEach(button=>button.addEventListener('click',()=>{
  const p=items[Number(button.dataset.modelIndex)];if(!p)return;
  $$('[data-model-index]').forEach(x=>{const on=x===button;x.classList.toggle('active',on);x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1});
  render(p);
 }));
}
function openBuy(id){const p=prodOf(id);if(!p)return;state.cart=p;if(new URLSearchParams(location.search).get('produto')!==id)state.variant=0;const selection=p.variants?.[state.variant]||p.variants?.[0];$('#buyChoice').textContent=p.name+(selection?' · '+selection.label:'')+' · '+priceBRL(selection?.price)+(p.colors?.length?' · Cor desejada: '+selectedColor(p):'');$('#buyForm').reset();$('#addressLabel').hidden=false;$('#buyDialog').showModal();$('#buyerName').focus({preventScroll:true})}
function openWhatsapp(msg){const href=wa(msg);const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();a.remove()}
function submitBuy(e){e.preventDefault();if(!e.currentTarget.reportValidity()||!state.cart)return;const p=state.cart,v=p.variants?.[state.variant]||p.variants?.[0],nm=$('#buyerName').value.trim(),tel=$('#buyerPhone').value.trim();if(nm.length<2||tel.replace(/\D/g,'').length<10){$('#buyerPhone').setCustomValidity('Informe um telefone válido com DDD.');$('#buyerPhone').reportValidity();$('#buyerPhone').setCustomValidity('');return;}const parts=['Olá, MD PHONE! Vim pelo site e quero consultar um produto.','Nome: '+nm,'WhatsApp: '+tel,'Produto: '+p.name,'Linha: '+catOf(p.category).label];if(p.colors?.length)parts.push('Cor desejada (sujeita à confirmação): '+selectedColor(p));if(v){parts.push('Opção: '+v.label);parts.push('Condição: '+condition(p,state.variant));if(Number.isFinite(v.price))parts.push('Valor anunciado: '+priceBRL(v.price));if(v.battery!=null)parts.push('Bateria informada: '+v.battery+'%');if(v.repairs)parts.push('Histórico: '+v.repairs);if(v.needsVerification)parts.push('Atenção: confirmar a capacidade real do aparelho antes da compra.')}parts.push('Modalidade: '+$('#shipping').value);if($('#buyerCity').value.trim())parts.push('Cidade: '+$('#buyerCity').value.trim());if($('#shipping').value!=='Retirada com a loja'&&$('#buyerAddress').value.trim())parts.push('Endereço para consulta: '+$('#buyerAddress').value.trim());if($('#buyerCep').value.trim())parts.push('CEP: '+$('#buyerCep').value.trim());if($('#buyerNotes').value.trim())parts.push('Detalhes: '+$('#buyerNotes').value.trim());parts.push('Pode confirmar preço, disponibilidade, fotos reais e condições?');openWhatsapp(parts.join('\n'));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();