/* MD PHONE — Elevate Studio. Single application / zero legacy CSS dependency. */
(function(){
'use strict';
var D=window.MD_UNIVERSE||{products:[]}, M=window.MD_PHOTOS||{};
var phones=(D.products||[]).filter(function(p){return p.category==='iphone'&&p.variants&&p.variants.some(function(v){return Number.isFinite(v.price)})});
var phone=phones.find(function(p){return p.id==='iphone-17-pro-max'})||phones[0];
var feature=['iphone-18-pro-max','iphone-14-pro-max'].map(function(id){return phones.find(function(p){return p.id===id})}).filter(Boolean);
var selection={group:'all',query:'',p:null,v:0,color:''};
var $=function(s,base){return (base||document).querySelector(s)};
var $$=function(s,base){return Array.from((base||document).querySelectorAll(s))};
function safe(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function price(n){return Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0})}
function firstPrice(p){return Math.min.apply(null,p.variants.map(function(v){return v.price}))}
function group(p){return /^iphone-(xr|11|12)(-|$)/.test(p.id)?'old':/^iphone-(13|14|15)(-|$)/.test(p.id)?'middle':'new'}
function preferred(p){return p.defaultColor||(p.colors||[])[0]?.name||''}
function imageSrc(p){return M[p.id]||M[p.id+'::color::'+preferred(p)]||p.image||''}
function whatsapp(message){return 'https://wa.me/5533987044866?text='+encodeURIComponent(message)}
function img(p,cl,alt){
 var src=imageSrc(p),fallback=p.photoFallback||p.image||'';
 if(!src)return '<div class="image-unavailable">Imagem em atualização. Consulte a loja.</div>';
 return '<img loading="lazy" decoding="async" class="'+safe(cl||'')+'" src="'+safe(src)+'" data-fallback="'+safe(fallback)+'" alt="'+safe(alt||('Foto ilustrativa do '+p.name))+'">';
}
var arrow='<span aria-hidden="true">↗</span>';
function header(){
return '<a class="skip" href="#conteudo">Ir para conteúdo</a>'+
'<header class="site-header" id="inicio"><div class="shell nav-inner">'+
'<a class="brand" href="#inicio"><img src="assets/md-phone-brand-mark.svg" alt=""><span><b>MD</b> PHONE</span></a>'+
'<nav class="desktop-nav" aria-label="Menu principal"><a href="#destaques">Destaques</a><a href="#catalogo">iPhones</a><a href="#filme">Apresentações</a><a href="#porque">Nossa proposta</a><button type="button" data-help>Assistente MD</button></nav>'+
'<div class="nav-actions"><a class="nav-whatsapp" href="'+whatsapp('Olá, MD PHONE! Quero saber os modelos disponíveis.')+'" target="_blank" rel="noopener noreferrer">Falar com a loja ↗</a>'+
'<button class="menu-button" id="menuButton" type="button" aria-controls="mobileNav" aria-expanded="false" aria-label="Abrir menu"><span></span></button></div></div>'+
'<nav class="mobile-nav" id="mobileNav" aria-label="Menu no celular"><a href="#destaques">Destaques</a><a href="#catalogo">iPhones disponíveis</a><a href="#filme">Apresentações</a><a href="#porque">Nossa proposta</a><button type="button" data-help>Assistente MD ↗</button></nav></header>';
}
function hero(){
 var first=phone.variants[0];
 return '<section class="hero"><div class="shell hero-inner"><div class="hero-copy">'+
 '<span class="eyebrow">MD PHONE / SELEÇÃO PREMIUM</span>'+
 '<h1>Seu próximo iPhone.<br><em>Em outro nível.</em></h1>'+
 '<p class="hero-desc">Tecnologia, design e uma seleção que combina com você. Explore os modelos, escolha sua configuração e encontre seu próximo iPhone.</p>'+
 '<div class="button-row"><a class="button primary" href="#catalogo">Explorar iPhones '+arrow+'</a>'+
 '<button class="button ghost" type="button" data-help>Encontrar meu iPhone '+arrow+'</button></div>'+
 '<p class="hero-submeta">DO IPHONE XR AO 18 PRO MAX · ESCOLHA COM CONFIANÇA</p></div>'+
 '<div class="hero-visual">'+img(phone,'hero-phone','Foto profissional ilustrativa do '+phone.name)+
 '<div class="hero-flag"><span><strong>'+safe(phone.name)+'</strong><small>'+safe(first.label)+' · disponibilidade sob confirmação</small></span><b>'+price(first.price)+'</b></div></div></div></section>'+
 '<div class="hero-feature-line"><div class="shell"><span>✦ DESIGN E PERFORMANCE</span><span>✦ UMA EXPERIÊNCIA PREMIUM</span><span>✦ ATENDIMENTO PERSONALIZADO</span></div></div>';
}
function spotlight(p,i){
 return '<button type="button" class="spotlight" data-product="'+safe(p.id)+'" aria-label="Conhecer '+safe(p.name)+'">'+
 '<div class="spot-text"><small>'+(i===0?'TECNOLOGIA EM PRIMEIRO PLANO':'ESCOLHA DA MD PHONE')+'</small>'+
 '<h3>'+safe(p.name)+'</h3><strong>A partir de '+price(firstPrice(p))+'</strong></div>'+
 '<div class="spotlight-visual">'+img(p,'','Foto de referência do '+p.name)+'</div>'+
 '<div class="spot-footer"><span>'+safe(p.variants[0].label)+'</span><span>Conhecer ↗</span></div></button>';
}
function highlights(){
 return '<section class="section highlights" id="destaques"><div class="shell"><div class="chapter-head">'+
 '<div><span class="eyebrow">SELEÇÃO EM DESTAQUE</span><h2>Mais que um celular.<br><em>Sua próxima escolha.</em></h2></div>'+
 '<p>Explore a coleção e descubra os detalhes que tornam cada iPhone especial.</p></div>'+
 '<div class="spotlight-grid">'+feature.map(spotlight).join('')+'</div></div></section>';
}
function productCard(p){
 var first=p.variants[0],sealed=p.variants.some(function(v){return /lacrado/i.test(v.condition||v.label||'')});
 var config=p.variants.length>1?p.variants.length+' configurações disponíveis':first.label;
 var quickMsg=['Olá! Tenho interesse no '+p.name+'.','Configuração: '+first.label,'Valor: '+price(first.price),'Gostaria de confirmar a disponibilidade e concluir a compra.'].join('\n');
 return '<article class="product-card" data-group="'+group(p)+'" aria-label="'+safe(p.name)+'">'+
 '<div class="product-visual"><span class="product-tag">'+safe(sealed?'Opção lacrada':first.condition||'Confira os detalhes')+'</span>'+img(p,'','Foto de produto '+p.name)+'</div>'+
 '<div class="product-copy"><h3>'+safe(p.name)+'</h3><p class="product-config">'+safe(config)+'</p>'+
 '<div class="price-line"><span><small>A partir de</small><strong>'+price(firstPrice(p))+'</strong></span></div>'+
 '<div class="product-actions">'+
 '<button type="button" class="button ghost" data-product="'+safe(p.id)+'">Ver cores e detalhes</button>'+
 '<a class="button primary" href="'+whatsapp(quickMsg)+'" target="_blank" rel="noopener noreferrer">Comprar <span aria-hidden="true">↗</span></a>'+
 '</div></div></article>';
}
function catalog(){
 return '<section class="section catalog-section" id="catalogo"><div class="shell"><div class="chapter-head">'+
 '<div><span class="eyebrow">COLEÇÃO IPHONE</span><h2>Encontre o seu<br><em>próximo iPhone.</em></h2></div>'+
 '<p>Evolua com seu iPhone. Compare gerações, memórias e acabamentos para encontrar sua próxima escolha.</p></div>'+
 '<div class="catalog-toolbar"><div class="filter-chips" role="group" aria-label="Filtrar geração">'+
 '<button class="filter-chip active" type="button" data-filter="all" aria-pressed="true">Todos</button>'+
 '<button class="filter-chip" type="button" data-filter="old" aria-pressed="false">XR ao 12</button>'+
 '<button class="filter-chip" type="button" data-filter="middle" aria-pressed="false">13 ao 15</button>'+
 '<button class="filter-chip" type="button" data-filter="new" aria-pressed="false">16 ao 18</button></div>'+
 '<label class="catalog-search"><span aria-hidden="true">⌕</span><input type="search" id="catalogSearch" autocomplete="off" placeholder="Buscar iPhone..." aria-label="Buscar modelo"></label></div>'+
 '<p class="catalog-counter" id="catalogCounter" role="status"></p>'+
 '<div class="product-grid" id="productGrid">'+phones.map(productCard).join('')+'</div>'+
 '<p class="catalog-note">Fotografias de referência, não das unidades seminovas. Cores de fábrica não representam disponibilidade na loja. Preço, configuração, estado de bateria, histórico de peças e garantia são confirmados antes da compra.</p></div></section>';
}
function studioStories(){
 var presentations=[
  {key:'iphone-18',title:'iPhone 18 Pro Max',lead:'Design de outra geração.',kind:'iphone-18-pro-max',link:'https://www.apple.com/br/apple-events/',label:'Ver lançamento oficial'},
  {key:'iphone-17',title:'iPhone 17 Pro Max',lead:'Cada detalhe impressiona.',kind:'iphone-17-pro-max',link:'https://www.apple.com/br/apple-events/',label:'Ver lançamento oficial'},
  {key:'airpods-pro',title:'AirPods Pro 3',lead:'Uma experiência sonora envolvente.',kind:'airpods-pro',link:'https://www.apple.com/br/airpods-pro/',label:'Conhecer na Apple'}
 ];
 return '<section class="section studio-section" id="filme"><div class="shell">'+
 '<div class="chapter-head"><div><span class="eyebrow">MD PHONE / EXPERIÊNCIAS</span><h2>Descubra. Explore.<br><em>Surpreenda-se.</em></h2></div>'+
 '<p>Uma coleção de apresentações em movimento. Explore o design do iPhone e conheça outras experiências Apple.</p></div>'+
 '<div class="studio-shell" id="studioStories">'+
 '<div class="studio-story-list">'+presentations.map(function(c,i){
   var p=phones.find(function(x){return x.id===c.kind});
   var photo=c.key==='airpods-pro'?(M['media::airpods-pro-3']||'https://www.apple.com/newsroom/images/2025/09/introducing-airpods-pro-3-the-ultimate-audio-experience/article/Apple-AirPods-Pro-3-hero-250909_inline.jpg.large.jpg'):(p?imageSrc(p):'');
   var hasVideo=false; // Suspender vídeos editoriais com movimento rejeitado; manter apenas fotos e links oficiais.
   var asset='assets/md-story-'+c.key+'.mp4';
   var image='<img loading="lazy" src="'+safe(photo)+'" alt="Imagem oficial de referência de '+safe(c.title)+'">';
   return '<article class="studio-story '+(i===0?'active':'')+'" data-story-index="'+i+'" aria-hidden="'+(i!==0)+'">'+
     '<div class="studio-screen">'+image+
     (hasVideo?'<video muted loop playsinline preload="'+(i===0?'metadata':'none')+'" aria-label="Apresentação editorial de '+safe(c.title)+'"><source src="'+asset+'" type="video/mp4"></video>':'')+
     '<span class="studio-mark">MD PHONE</span></div>'+
     '<div class="studio-story-info"><div><span class="studio-ordinal">0'+(i+1)+' / 03</span><h3>'+safe(c.title)+'</h3><p>'+safe(c.lead)+'</p></div>'+
     '<div class="studio-story-links"><a href="'+safe(c.link)+'" target="_blank" rel="noopener noreferrer" class="button dark">'+safe(c.label)+' ↗</a>'+
     (p?'<button class="button ghost" type="button" data-product="'+safe(p.id)+'">Ver na loja</button>':'')+
     '</div></div></article>';
 }).join('')+'</div>'+
 '<div class="studio-controls" aria-label="Navegar pelas apresentações"><button type="button" id="studioPrev" aria-label="Vídeo anterior">←</button>'+
 '<div id="studioDots" class="studio-dots">'+presentations.map(function(c,i){return '<button type="button" aria-label="Exibir '+safe(c.title)+'" aria-pressed="'+(i===0)+'" data-story-dot="'+i+'" class="'+(i===0?'active':'')+'"></button>'}).join('')+'</div>'+
 '<button type="button" id="studioNext" aria-label="Próximo vídeo">→</button></div>'+
 '</div><p class="studio-legal">Conheça os produtos e acesse os conteúdos oficiais da Apple pelos links acima.</p></div></section>';
}
function promises(){
return '<section class="section promise-section" id="porque"><div class="shell"><div class="chapter-head">'+
'<div><span class="eyebrow">A EXPERIÊNCIA MD PHONE</span><h2>Escolher bem.<br><em>Sem complicar.</em></h2></div>'+
'<p>Do catálogo ao atendimento, você pode confirmar os detalhes do aparelho antes de tomar sua decisão.</p></div>'+
'<div class="promise-grid">'+
'<div class="promise"><div class="promise-number">01 / TRANSPARÊNCIA</div><h3>Informação que importa.</h3><p>Compare modelos e configurações com clareza. Nossa equipe ajuda a confirmar os detalhes da sua escolha.</p></div>'+
'<div class="promise"><div class="promise-number">02 / ESCOLHA</div><h3>Evolua com seu iPhone.</h3><p>Dos clássicos às gerações recentes, encontre um iPhone para o seu estilo.</p></div>'+
'<div class="promise"><div class="promise-number">03 / ATENDIMENTO</div><h3>Escolha com alguém por perto.</h3><p>Seu modelo e suas preferências viram uma mensagem organizada para o WhatsApp da MD PHONE.</p></div>'+
'</div></div></section>';
}
function footer(){
return '<footer class="footer"><div class="shell"><div class="footer-inner">'+
'<div><a class="brand" href="#inicio"><img src="assets/md-phone-brand-mark.svg" alt=""><span><b>MD</b> PHONE</span></a>'+
'<p>Tecnologia, design e atendimento personalizado para a sua próxima escolha.</p></div>'+
'<div><h4>Explorar</h4><a href="#destaques">Destaques</a><a href="#catalogo">Modelos e preços</a><a href="#filme">Apresentações</a></div>'+
'<div><h4>Atendimento</h4><a href="'+whatsapp('Olá, MD PHONE! Quero atendimento.')+'" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a href="#porque">Como comprar</a><a href="#inicio">Voltar ao início ↑</a></div>'+
'<section class="shipping-global" aria-labelledby="shippingTitle"><div class="shipping-top"><div><span class="shipping-kicker">MD PHONE / ALCANCE INTERNACIONAL</span><h2 id="shippingTitle">O seu próximo iPhone. <em>Onde você estiver.</em></h2><p>Consulte a possibilidade de envio, frete e prazos para os destinos abaixo. A disponibilidade e as condições são confirmadas pela loja antes de qualquer compra.</p></div><div class="shipping-icon" aria-hidden="true">✦</div></div><div class="shipping-countries">'+
'<a class="shipping-country" href="'+whatsapp('Olá, MD PHONE! Gostaria de consultar se vocês realizam entregas para o Brasil, além do frete, prazos e condições.')+'" target="_blank" rel="noopener noreferrer" aria-label="Consultar envio para Brasil pelo WhatsApp"><span class="shipping-flag" aria-hidden="true">🇧🇷</span><span class="shipping-country-name">Brasil</span><span class="shipping-arrow" aria-hidden="true">↗</span></a>'+
'<a class="shipping-country" href="'+whatsapp('Olá, MD PHONE! Gostaria de consultar se vocês realizam entregas para Portugal, além do frete, prazos e condições.')+'" target="_blank" rel="noopener noreferrer" aria-label="Consultar envio para Portugal pelo WhatsApp"><span class="shipping-flag" aria-hidden="true">🇵🇹</span><span class="shipping-country-name">Portugal</span><span class="shipping-arrow" aria-hidden="true">↗</span></a>'+
'<a class="shipping-country" href="'+whatsapp('Olá, MD PHONE! Gostaria de consultar se vocês realizam entregas para os Estados Unidos, além do frete, prazos e condições.')+'" target="_blank" rel="noopener noreferrer" aria-label="Consultar envio para Estados Unidos pelo WhatsApp"><span class="shipping-flag" aria-hidden="true">🇺🇸</span><span class="shipping-country-name">Estados Unidos</span><span class="shipping-arrow" aria-hidden="true">↗</span></a>'+
'<a class="shipping-country" href="'+whatsapp('Olá, MD PHONE! Gostaria de consultar se vocês realizam entregas para a China, além do frete, prazos e condições.')+'" target="_blank" rel="noopener noreferrer" aria-label="Consultar envio para China pelo WhatsApp"><span class="shipping-flag" aria-hidden="true">🇨🇳</span><span class="shipping-country-name">China</span><span class="shipping-arrow" aria-hidden="true">↗</span></a>'+
'<a class="shipping-country" href="'+whatsapp('Olá, MD PHONE! Gostaria de consultar se vocês realizam entregas para Angola, além do frete, prazos e condições.')+'" target="_blank" rel="noopener noreferrer" aria-label="Consultar envio para Angola pelo WhatsApp"><span class="shipping-flag" aria-hidden="true">🇦🇴</span><span class="shipping-country-name">Angola</span><span class="shipping-arrow" aria-hidden="true">↗</span></a>'+
'</div><p class="shipping-disclaimer">Selecione um país para consultar as opções de entrega pelo WhatsApp. A presença de um destino nesta lista não significa que o envio esteja disponível ou confirmado.</p></section>'+
'</div><div class="footer-bottom">© '+new Date().getFullYear()+' MD PHONE. Loja independente. Fotos ilustrativas de produto. Apple e iPhone são marcas de seus titulares.</div></div></footer>';
}
function dialogs(){
return '<button type="button" class="assistant-launcher" id="assistantLauncher" data-help aria-label="Abrir Assistente MD"><img src="assets/md-assistant-avatar.svg" alt=""></button>'+
'<dialog class="dialog" id="productDialog" aria-labelledby="productTitle">'+
'<div class="dialog-top"><div><span class="eyebrow">MD PHONE / DETALHES</span><h2 id="productTitle">iPhone</h2></div><button type="button" class="dialog-close" data-close="productDialog" aria-label="Fechar">×</button></div>'+
'<div class="dialog-content dialog-product"><div class="dialog-product-visual" id="detailVisual"></div>'+
'<div class="dialog-product-summary"><p class="dialog-price-label">Preço</p><p class="dialog-price" id="detailPrice"></p>'+
'<p class="choice-label">Capacidade e condição</p><div class="variants" id="detailVariants"></div>'+
'<p class="choice-label">Cor de preferência: <span id="selectedColor"></span></p><div class="swatches" id="detailColors"></div>'+
'<p class="selection-info" id="colorPreviewInfo">Escolha uma cor para visualizar o acabamento.</p>'+
'<div class="detail-list" id="detailNotes"></div>'+
'<a id="productWhatsapp" class="button primary form-submit" target="_blank" rel="noopener noreferrer" href="#">Comprar este iPhone ↗</a>'+
'<p class="detail-disclaimer">Foto ilustrativa do modelo, não da unidade seminova. Finalize seu pedido diretamente com nossa equipe no WhatsApp.</p></div></div></dialog>'+
'<dialog class="dialog" id="assistantDialog" aria-labelledby="assistantTitle">'+
'<div class="dialog-top"><span class="eyebrow">MD PHONE / ASSISTENTE</span><button type="button" class="dialog-close" data-close="assistantDialog" aria-label="Fechar">×</button></div>'+
'<div class="help-intro"><img src="assets/md-assistant-avatar.svg" alt="Personagem do Assistente MD"><div>'+
'<h2 id="assistantTitle">Vamos encontrar seu iPhone?</h2><p>Escolha suas preferências e consulte a equipe.</p></div></div>'+
'<div class="dialog-content"><form id="assistantForm"><div class="form-grid">'+
'<label class="wide">Qual modelo você procura?<select id="helpModel"><option>Quero uma recomendação</option>'+
phones.map(function(p){return '<option>'+safe(p.name)+'</option>'}).join('')+'</select></label>'+
'<label>Faixa de valor<select id="helpBudget"><option>Quero consultar preços</option><option>Até R$ 2.000</option><option>R$ 2.000 a R$ 3.000</option><option>R$ 3.000 a R$ 4.500</option><option>Acima de R$ 4.500</option></select></label>'+
'<label>Condição<select id="helpCondition"><option>Sem preferência</option><option>Seminovo</option><option>Novo lacrado</option></select></label>'+
'<label>O que deseja?<select id="helpPurchase"><option>Apenas comprar</option><option>Tenho aparelho para troca</option></select></label>'+
'<label>Quando pretende comprar?<select id="helpTiming"><option>Estou pesquisando</option><option>Quero comprar agora</option><option>Nos próximos dias</option></select></label>'+
'<label class="wide">Detalhes da sua preferência<textarea id="helpNotes" maxlength="400" rows="3" placeholder="Cor, memória, bateria, reparos, aparelho na troca..."></textarea></label></div>'+
'<button type="submit" class="button dark form-submit">Continuar pelo WhatsApp ↗</button>'+
'<p class="form-privacy">Sua mensagem será preparada e aberta no WhatsApp; nada é enviado automaticamente. Este site não realiza pagamento.</p></form></div></dialog>';
}
function applyFilter(){
var count=0,q=selection.query.toLowerCase().trim();
$$('.product-card').forEach(function(el){
var show=(selection.group==='all'||selection.group===el.dataset.group)&&(!q||el.textContent.toLowerCase().includes(q));
el.hidden=!show;if(show)count++;
});
$('#catalogCounter').textContent=count+' '+(count===1?'modelo':'modelos')+' da lista MD PHONE';
var empty=$('.empty-products');if(empty)empty.remove();
if(!count)$('#productGrid').insertAdjacentHTML('beforeend','<div class="empty-products">Nenhum modelo encontrado. Tente outra busca ou geração.</div>');
}
function curr(){return selection.p?.variants[selection.v]}
function matchColor(p,variant){
var label=(variant.label||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
for(var name of ['azul','dourado','grafite','roxo','preto','prateado']){
 if(label.includes('·')&&label.includes(name)){
 var found=(p.colors||[]).find(function(c){return c.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(name)});
 if(found)return found.name;
 }
}
return selection.color||preferred(p);
}
function updateProduct(){
var p=selection.p,v=curr();if(!p||!v)return;
$('#productTitle').textContent=p.name;
$('#detailPrice').textContent=price(v.price);
$('#detailVariants').innerHTML=p.variants.map(function(x,i){
return '<button type="button" class="variant '+(i===selection.v?'active':'')+'" aria-pressed="'+(i===selection.v)+'" data-variant="'+i+'">'+safe(x.label)+' · '+price(x.price)+'</button>';
}).join('');
$('#selectedColor').textContent=selection.color;
$('#detailColors').innerHTML=(p.colors||[]).map(function(c){
return '<button class="swatch '+(selection.color===c.name?'active':'')+'" type="button" data-color="'+safe(c.name)+'" aria-pressed="'+(selection.color===c.name)+'" aria-label="Selecionar cor '+safe(c.name)+'" title="'+safe(c.name)+'" style="--tone:'+safe(c.hex)+'"><i aria-hidden="true"></i></button>';
}).join('');
var notes='<div class="detail-row"><b>Condição</b><span>'+safe(v.condition||'Consultar com a loja')+'</span></div>';
if(v.battery!=null)notes+='<div class="detail-row"><b>Bateria</b><span>'+safe(v.battery)+'% informado</span></div>';
if(v.repairs)notes+='<div class="detail-row"><b>Histórico de peças</b><span>'+safe(v.repairs)+'</span></div>';
if(v.needsVerification)notes+='<div class="detail-row"><b>A confirmar</b><span>'+safe(v.verificationNote||'Capacidade da unidade')+'</span></div>';
$('#detailNotes').innerHTML=notes;
var imageKey=p.id+'::color::'+selection.color;
var nativeColorPhoto=M[imageKey]||null;
var hasColorPhoto=Boolean(nativeColorPhoto)||(selection.color===preferred(p)&&Boolean(M[p.id]));
var photo=nativeColorPhoto||M[p.id+'::variant::'+selection.v]||v.image||imageSrc(p);
var colored=(p.colors||[]).find(function(c){return c.name===selection.color});
var surface=$('#detailVisual');
surface.style.setProperty('--selected-finish',colored?.hex||'#deeee3');
surface.dataset.selectedColor=selection.color;
surface.innerHTML='<img src="'+safe(photo)+'" data-fallback="'+safe(p.photoFallback||p.image||'')+'" alt="Foto de referência do '+safe(p.name)+' na cor '+safe(selection.color)+'">';
$('#colorPreviewInfo').textContent=hasColorPhoto
 ? 'Visualização da cor '+selection.color+'. Consulte a disponibilidade desta configuração.'
 : 'Cor selecionada: '+selection.color+'. Foto específica desta cor sob consulta; o produto exibido é uma referência do modelo.';
var lines=['Olá, MD PHONE! Quero consultar este aparelho:','Modelo: '+p.name,'Configuração: '+v.label,'Valor: '+price(v.price),'Condição: '+(v.condition||'A confirmar'),'Cor desejada: '+selection.color,'Podem confirmar a cor disponível, bateria, reparos, capacidade e enviar fotos reais da unidade?'];
if(v.needsVerification)lines.push('Observação: confirmar a capacidade exata do aparelho.');
var cta=$('#productWhatsapp');cta.setAttribute('aria-label','Comprar '+p.name+' na configuração '+v.label+' pelo WhatsApp');
$('#productWhatsapp').href=whatsapp(lines.join('\n'));
}
function openProduct(id){
var p=phones.find(function(x){return x.id===id});if(!p)return;
selection.p=p;selection.v=0;selection.color=preferred(p);
updateProduct();$('#productDialog').showModal();
}
function events(){
$('#menuButton').addEventListener('click',function(){
var m=$('#mobileNav'),open=m.classList.toggle('open');
$('#menuButton').setAttribute('aria-expanded',String(open));
});
$$('#mobileNav a').forEach(function(a){a.addEventListener('click',function(){$('#mobileNav').classList.remove('open');$('#menuButton').setAttribute('aria-expanded','false')})});
document.addEventListener('click',function(e){
 var p=e.target.closest('[data-product]');
 if(p){openProduct(p.dataset.product);return}
 var help=e.target.closest('[data-help]');if(help){$('#assistantDialog').showModal();return}
 var close=e.target.closest('[data-close]');if(close){document.getElementById(close.dataset.close)?.close();return}
 var filt=e.target.closest('[data-filter]');if(filt){
 selection.group=filt.dataset.filter;
 $$('[data-filter]').forEach(function(b){b.classList.toggle('active',b===filt);b.setAttribute('aria-pressed',String(b===filt))});
 applyFilter();return}
 var variant=e.target.closest('[data-variant]');
 if(variant&&selection.p){selection.v=Number(variant.dataset.variant);selection.color=matchColor(selection.p,curr());updateProduct();return}
 var color=e.target.closest('[data-color]');
 if(color&&selection.p){selection.color=color.dataset.color;updateProduct();return}
});
$('#catalogSearch').addEventListener('input',function(e){selection.query=e.target.value;applyFilter()});
$$('dialog').forEach(function(d){d.addEventListener('click',function(e){if(e.target===d)d.close()})});
$('#assistantForm').addEventListener('submit',function(e){
e.preventDefault();
var lines=['Olá, MD PHONE! Vim pelo Assistente MD do site.','Modelo: '+$('#helpModel').value,'Faixa de valor: '+$('#helpBudget').value,'Condição: '+$('#helpCondition').value,'Objetivo: '+$('#helpPurchase').value,'Prazo: '+$('#helpTiming').value];
var note=$('#helpNotes').value.trim();if(note)lines.push('Detalhes: '+note);
lines.push('Podem confirmar o estoque e me orientar?');
var a=document.createElement('a');a.href=whatsapp(lines.join('\n'));a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();a.remove();
});
document.addEventListener('error',function(e){
var el=e.target;if(!(el instanceof HTMLImageElement))return;
if(el.dataset.fallback&&!el.dataset.tried){el.dataset.tried='1';el.src=el.dataset.fallback;return}
var wrap=el.parentElement;if(!wrap)return;
el.style.visibility='hidden';
if(!$('.image-unavailable',wrap))wrap.insertAdjacentHTML('beforeend','<div class="image-unavailable">Imagem em atualização. Solicite fotos reais pelo WhatsApp.</div>');
},true);
}
function startStories(){
 var slides=$$('.studio-story');
 var dots=$$('[data-story-dot]');
 if(!slides.length)return;
 var current=0,interval=null;
 var enabled=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function activate(index){
  current=(index+slides.length)%slides.length;
  slides.forEach(function(el,i){
    var active=i===current;
    el.classList.toggle('active',active);
    el.setAttribute('aria-hidden',String(!active));
    el.querySelectorAll('a,button').forEach(function(link){link.tabIndex=active?0:-1});
    var video=$('video',el);
    if(video){if(active&&enabled){video.play().catch(function(){})}else video.pause()}
  });
  dots.forEach(function(b,i){var active=i===current;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
 }
 function stop(){if(interval){clearInterval(interval);interval=null}}
 function begin(){stop();if(enabled&&!document.hidden)interval=setInterval(function(){activate(current+1)},8500)}
 $('#studioPrev').addEventListener('click',function(){activate(current-1);begin()});
 $('#studioNext').addEventListener('click',function(){activate(current+1);begin()});
 dots.forEach(function(dot){dot.addEventListener('click',function(){activate(Number(dot.dataset.storyDot));begin()})});
 var shell=$('#studioStories');
 shell.addEventListener('mouseenter',stop);
 shell.addEventListener('mouseleave',begin);
 shell.addEventListener('focusin',stop);
 shell.addEventListener('focusout',begin);
 document.addEventListener('visibilitychange',function(){if(document.hidden){stop();slides.forEach(function(el){$('video',el)?.pause()})}else{activate(current);begin()}});
 activate(0);begin();
}
function init(){
if(!phones.length){document.getElementById('app').innerHTML='<p>Catálogo em atualização.</p>';return}
$('#app').innerHTML=header()+'<main id="conteudo">'+hero()+highlights()+catalog()+studioStories()+promises()+'</main>'+footer()+dialogs();
events();applyFilter();startStories();
var previousLink=new URLSearchParams(location.search);
var requested=previousLink.get('produto');
if(requested&&phones.some(function(p){return p.id===requested})){
 setTimeout(function(){openProduct(requested)},120);
}else if(previousLink.get('categoria')==='iphone'||previousLink.has('comparar')){
 setTimeout(function(){$('#catalogo')?.scrollIntoView({behavior:'auto',block:'start'})},120);
}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();