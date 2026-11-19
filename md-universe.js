/* MD PHONE UNIVERSE — uma implementação própria de experiência premium (site estático).
 * Todos os preços e estoques não confirmados permanecem sob consulta.
 * Nenhum depoimento, contador de clientes ou pedido automático é inventado.
 */
(()=>{'use strict';
const D=window.MD_UNIVERSE;if(!D||!D.categories||!D.products)return;
const WA='5533987044866';
const PHOTO={
 iphone:'https://www.apple.com/v/homepage/images/iphone-18-pro/a/promo_iphone_18_pro__9nn5m4mt2bmy_large.jpg',
 mac:'https://www.apple.com/v/homepage/images/macbook-pro-proled-xdr/a/hero_macbook_pro_proled_xdr_preorder__df38n593sxg2_large.jpg',
 ipad:'https://www.apple.com/v/homepage/images/ipad-mini/a/promo_ipad_mini_a20_announce__efc6vmmxg58i_large.jpg',
 watch:'https://www.apple.com/br/homepage/built/promos/26_apple-watch-series-12_10/images/promo_apple_watch_series_12__gnlprtt8526a_large.jpg',
 airpods:'https://www.apple.com/v/homepage/images/airpods-pro-3/a/promo_airpods_pro_3__e4755qofhnyq_large.jpg',
 casa:'https://bfasset.costco-static.com/U447IH35/as/r5k55cb7n2g5ps96f2kmpfg/8897200-847__1?auto=webp&canvas=1024%2C1024&fit=bounds&format=jpg&height=1024&width=1024',
 acessorios:'https://www.celudmovil.com.co/cdn/shop/files/MAGSAFEDUO_1024x1024.png?v=1697827277'
};
const COLORS={iphone:'#2c6b4c',mac:'#315776',ipad:'#51427b',watch:'#564d43',airpods:'#365c62',casa:'#2b704a',acessorios:'#6b5337'};
const ICONS={iphone:'⌁',mac:'▱',ipad:'▣',watch:'◉',airpods:'♫',casa:'⌂',acessorios:'✦'};
const $=(q,root=document)=>root.querySelector(q),$$=(q,root=document)=>Array.from(root.querySelectorAll(q));
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const srcOf=p=>p?.image||PHOTO[p?.category]||'';
const priceBRL=n=>Number.isFinite(n)?new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(n):'Sob consulta';
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
const state={category:'iphone',index:0,variant:0,cart:null};
let heroTimer=null,observer=null;
function imageEl(src,alt='',cls='',picture=''){if(!src)return '<div class="tile-fallback">'+esc(picture||'MD PHONE')+'</div>';return '<img class="'+esc(cls)+'" loading="lazy" decoding="async" src="'+esc(src)+'" alt="'+esc(alt)+'" onerror="this.hidden=true;this.parentElement.classList.add(\'image-error\')">'}
function header(){
return '<a class="skip" href="#principal">Ir ao conteúdo</a><header class="site-head"><div class="head-inner">'+
'<a class="brand" href="index.html" aria-label="MD PHONE — início"><img src="assets/md-phone-brand-mark.svg" alt="" width="42" height="42"> <b>MD</b> PHONE</a>'+
'<nav class="site-nav" aria-label="Categorias">'+D.categories.map(c=>'<a href="'+linkCat(c.id)+'">'+esc(c.label)+'</a>').join('')+'</nav>'+
'<div class="head-actions"><a href="index.html?comparar=1" class="head-cta" title="Comparar modelos">Comparar ↗</a><a href="'+wa('Olá, MD PHONE! Gostaria de atendimento.')+'" class="head-cta" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><button type="button" class="hamburger" id="hamburger" aria-label="Abrir menu" aria-expanded="false">☰</button></div></div>'+
'<nav class="mobile-menu" id="mobileMenu" hidden aria-label="Menu móvel">'+
'<a href="index.html">Início</a>'+D.categories.map(c=>'<a href="'+linkCat(c.id)+'">'+esc(c.label)+'</a>').join('')+
'<a href="index.html?comparar=1">Comparar produtos</a></nav></header>';
}
function footer(){return '<footer class="footer"><div class="footer-inner"><div><a class="brand" href="index.html"><img src="assets/md-phone-brand-mark.svg" alt="" width="42" height="42"><b>MD</b> PHONE</a><p>Uma experiência premium para descobrir, escolher e consultar produtos Apple. Loja independente.</p></div><div class="footer-links"><strong>Produtos</strong>'+D.categories.slice(0,4).map(c=>'<a href="'+linkCat(c.id)+'">'+esc(c.label)+'</a>').join('')+'</div><div class="footer-links"><strong>Explore</strong>'+D.categories.slice(4).map(c=>'<a href="'+linkCat(c.id)+'">'+esc(c.label)+'</a>').join('')+'<a href="index.html?comparar=1">Comparar</a></div><div class="footer-links"><strong>Atendimento</strong><a href="'+wa('Olá! Quero conhecer a MD PHONE.')+'" target="_blank" rel="noopener noreferrer">WhatsApp: (33) 98704-4866 ↗</a><small>Preços e disponibilidade sempre sob confirmação. A MD PHONE não é a Apple.</small></div></div><div class="footer-base"><span>© 2026 MD PHONE · Nova identidade MD Use Imports.</span><span>Apple e nomes de produtos pertencem a seus titulares. Imagens promocionais meramente ilustrativas.</span></div></footer>';}
function button(text,href,kind='primary'){return '<a class="btn '+kind+'" href="'+href+'">'+text+' <span aria-hidden="true">↗</span></a>'}
function home(){
return '<section class="hero" aria-label="Apresentação MD PHONE">'+heroTitles.map((h,i)=>'<div class="hero-slide '+(i===0?'active':'')+'" data-slide="'+i+'" style="--glow:'+h.glow+'"><div class="hero-media '+(h.category==='iphone'?'photo-dark':'photo-light')+'">'+imageEl(h.image,'','')+'</div><div class="hero-inner"><div class="hero-content"><div class="kicker">'+h.tag+'</div><h1>'+h.title+'</h1><p class="hero-desc">'+h.desc+'</p><div class="action-row">'+button(h.label,linkCat(h.category))+button('Falar com a loja',wa('Olá, MD PHONE! Quero escolher meu próximo produto Apple.'),'secondary')+'</div><div class="hero-foot"><span>DESIGN · TECNOLOGIA · CONFIANÇA</span><span>MD PHONE / 2026</span></div></div></div></div>').join('')+'<div class="hero-timeline" aria-hidden="true">'+heroTitles.map((_,i)=>'<span class="timeline-item '+(i===0?'active':'')+'"></span>').join('')+'</div></section>'+
'<section class="marquee" aria-label="Linhas Apple"><div class="marquee-track">'+[...D.categories,...D.categories,...D.categories,...D.categories].map(c=>'<span><b>✦</b> '+esc(c.label.toUpperCase())+'</span>').join('')+'</div></section>'+
'<section class="section universe" id="colecoes"><div class="section-inner"><div class="section-top"><div><div class="kicker">MD PHONE / UNIVERSO APPLE</div><h2 class="section-heading">Tudo o que você ama.<br><em>Em um só lugar.</em></h2></div><p class="section-sub">Explore cada família com apresentação dedicada, fotos amplas e a liberdade de escolher o modelo ideal.</p></div><div class="category-grid">'+D.categories.map((c,i)=>'<a href="'+linkCat(c.id)+'" class="category-tile reveal image-'+esc(c.id)+'" style="--tile-glow:'+COLORS[c.id]+'"><div class="tile-visual">'+imageEl(PHOTO[c.id]||PHOTO.iphone,'Foto ilustrativa de '+c.label,'',c.label)+'</div><div class="tile-content"><span class="tile-eyebrow">MD PHONE · '+String(i+1).padStart(2,'0')+'</span><h3>'+esc(c.label)+'</h3><p>'+esc(c.sub)+'</p><span class="tile-arrow">Explorar coleção ↗</span></div></a>').join('')+'</div></div></section>'+
'<section class="immersive-strip"><div class="strip-copy"><span class="kicker">MD PHONE / FILME CONCEITUAL</span><h2>O detalhe<br>faz a diferença.</h2><p>Fotografia de produto em primeiro plano, transições naturais e um catálogo que valoriza cada escolha.</p>'+button('Conhecer iPhone 18 Pro Max',linkProd('iphone-18-pro-max'))+'</div><div class="strip-photo">'+imageEl(PHOTO.iphone,'Imagem promocional do iPhone Pro')+'<video class="brand-film" autoplay muted loop playsinline preload="metadata" disablepictureinpicture aria-hidden="true"><source src="https://resource2.heygen.ai/videos/ee161397c93a4dbda4b7e524885f995f/ee161397c93a4dbda4b7e524885f995f/01a1f13d-3fdc-7e47-ac0b-58b2c3d50310.mp4" type="video/mp4"></video></div></section>'+
'<section class="trust-strip"><div class="trust-items"><div class="trust-item"><strong>01 / ESCOLHA</strong><p>Conheça a linha Apple em páginas individuais, sem repetir os mesmos modelos por toda a loja.</p></div><div class="trust-item"><strong>02 / INFORMAÇÃO</strong><p>Consulte configuração, memória, bateria e histórico conhecido dos seminovos.</p></div><div class="trust-item"><strong>03 / ATENDIMENTO</strong><p>Escolha o produto e envie a solicitação por WhatsApp, com seus dados prontos.</p></div></div></section>'+
'<section class="story"><div><div class="kicker">A NOSSA HISTÓRIA</div><h2>Nova identidade.<br>Mais possibilidades.</h2><p>MD PHONE é a nova identidade da MD Use Imports. Reunimos a linha Apple em uma experiência de escolha dedicada e atendimento personalizado, com informações transparentes sobre cada aparelho.</p>'+button('Conversar com a equipe',wa('Olá, MD PHONE! Quero informações sobre os produtos.'),'secondary')+'</div><div class="story-logo"><img src="assets/md-phone-brand-mark.svg" alt="Marca MD PHONE"></div></section>';
}
function categoryPage(c){
const items=D.products.filter(p=>p.category===c.id);state.category=c.id;state.index=0;
const featured=items.find(p=>p.featured)||items[0];
return '<section class="category-hero" style="--hero-glow:'+COLORS[c.id]+'"><div class="category-photo '+(c.id==='iphone'?'photo-dark':'photo-light')+'">'+imageEl(srcOf(featured),'Imagem promocional ilustrativa '+c.label,'')+'</div><div class="category-copy"><span class="kicker">MD PHONE / '+esc(c.label.toUpperCase())+'</span><h1>'+esc(c.label)+'</h1><p>'+esc(c.line)+'</p><div class="action-row">'+button('Explorar modelos','#modelos')+button('Ver todas as famílias','index.html#colecoes','secondary')+'</div></div></section>'+
'<section class="section model-section" id="modelos"><div class="section-inner"><div class="model-intro"><div class="kicker">COLEÇÃO / '+esc(c.label.toUpperCase())+'</div><h2 class="section-heading">Escolha seu<br><em>próximo favorito.</em></h2><p class="section-sub">'+esc(c.sub)+'</p></div><div class="model-rail" role="tablist" aria-label="Modelos '+esc(c.label)+'">'+items.map((p,i)=>'<button class="model-tab '+(i===0?'active':'')+'" data-model-index="'+i+'" role="tab" aria-selected="'+(i===0)+'">'+esc(p.name)+'</button>').join('')+'</div><div id="modelStage" aria-live="polite">'+modelStage(items[0])+'</div><p class="small-note">A presença no catálogo não representa disponibilidade imediata. Fotos promocionais ilustram os modelos, não o estado dos seminovos.</p></div></section>'+
'<section class="immersive-strip"><div class="strip-copy"><div class="kicker">MD PHONE / ESPECIAL '+esc(c.label.toUpperCase())+'</div><h2>Mais que<br>um produto.</h2><p>Uma apresentação para descobrir o que diferencia cada modelo — com o espaço e a atenção que ele merece.</p>'+button('Solicitar recomendações',wa('Olá, MD PHONE! Quero ajuda para escolher um produto da categoria '+c.label+'.'))+'</div><div class="strip-photo">'+imageEl(srcOf(featured),'Linha '+c.label+' em destaque')+'</div></section>'+
'<section class="section universe"><div class="section-inner"><div class="section-top"><h2 class="section-heading">Outras linhas.<br><em>Novas possibilidades.</em></h2></div><div class="category-grid">'+D.categories.filter(x=>x.id!==c.id).slice(0,3).map((x,i)=>'<a href="'+linkCat(x.id)+'" class="category-tile" style="--tile-glow:'+COLORS[x.id]+'"><div class="tile-visual">'+imageEl(PHOTO[x.id]||PHOTO.iphone,'Linha '+x.label)+'</div><div class="tile-content"><span class="tile-eyebrow">EXPLORE</span><h3>'+esc(x.label)+'</h3><p>'+esc(x.sub)+'</p><span class="tile-arrow">Descobrir ↗</span></div></a>').join('')+'</div></div></section>';
}
function modelStage(p){
 if(!p)return '<div>Modelos sob consulta.</div>';
 const stock=p.availability==='estoque_informado';
 const heroPhoto=p.category==='iphone'?' md-iphone-motion':'';
 return '<div class="model-stage" style="--model-glow:'+esc(p.accent||COLORS[p.category])+'">'+
 '<div class="model-art'+heroPhoto+'">'+imageEl(srcOf(p),'Foto de referência do '+p.name)+
 '<span class="model-art-label">FOTO ILUSTRATIVA · CONSULTE A UNIDADE REAL</span></div>'+
 '<div class="model-info"><div class="kicker">'+esc(condition(p).toUpperCase())+' · '+(stock?'UNIDADE INFORMADA':'CONFIRME DISPONIBILIDADE')+'</div>'+
 '<h3>'+esc(p.name)+'</h3><p>'+esc(p.desc)+'</p>'+priceHtml(p)+
 '<div class="model-specs">'+(p.specs||[]).slice(0,3).map(x=>'<span class="spec-pill">'+esc(x)+'</span>').join('')+'</div>'+
 '<div class="model-actions">'+button('Escolher configuração',linkProd(p.id))+
 '<button type="button" class="btn secondary" data-buy="'+esc(p.id)+'">Solicitar ↗</button></div></div></div>';
}
function productPage(p){
 const c=catOf(p.category),stock=p.availability==='estoque_informado';
 return '<section class="product-hero" style="--prod-glow:'+esc(p.accent||COLORS[p.category])+'">'+
 '<div class="product-photo '+(p.category==='iphone'?'photo-dark md-iphone-motion':'photo-light')+'">'+imageEl(srcOf(p),'Imagem promocional do modelo '+p.name)+'</div>'+
 '<div class="product-copy"><span class="kicker">MD PHONE / '+esc(c.label.toUpperCase())+'</span>'+
 '<h1>'+esc(p.name)+'</h1><p>'+esc(p.desc)+'</p><div class="stock-label">'+
 (stock?'Unidade informada · confirme disponibilidade':p.variants?.length?'Preço informado · estoque sob confirmação':'Modelo sob consulta')+
 '</div><div id="productOffer">'+priceHtml(p,0)+'</div>'+variantButtons(p)+
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
const list=D.products.filter(p=>p.category==='iphone').slice(0,12);
return '<section class="section compare"><div class="section-inner"><div class="kicker">MD PHONE / COMPARAÇÃO</div><h1 class="section-heading">Dois modelos.<br><em>Uma escolha.</em></h1><p class="section-sub">Compare os modelos cadastrados. Valores e disponibilidade sempre sob confirmação.</p><div class="compare-toolbar"><select id="compA" aria-label="Primeiro modelo">'+list.map((p,i)=>'<option value="'+esc(p.id)+'">'+esc(p.name)+'</option>').join('')+'</select><select id="compB" aria-label="Segundo modelo">'+list.map((p,i)=>'<option value="'+esc(p.id)+'" '+(i===1?'selected':'')+'>'+esc(p.name)+'</option>').join('')+'</select></div><div class="compare-table" id="compareContent"></div></div></section>';
}
function compareDetails(p){return '<div class="compare-col"><div class="kicker">COMPARANDO</div><h3>'+esc(p.name)+'</h3><p>'+esc(p.desc)+'</p><div class="compare-row">Categoria: '+esc(catOf(p.category).label)+'</div>'+(p.specs||[]).map(x=>'<div class="compare-row">'+esc(x)+'</div>').join('')+'<div class="compare-row">'+(p.availability==='estoque_informado'?'Unidade cadastrada':'Sob consulta')+'</div>'+button('Ver produto',linkProd(p.id))+'</div>'}
function renderCompare(){const a=prodOf($('#compA')?.value),b=prodOf($('#compB')?.value),box=$('#compareContent');if(a&&b&&box)box.innerHTML=compareDetails(a)+compareDetails(b)}
function dialogMarkup(){return '<button class="concierge" id="concierge" type="button" aria-label="Abrir assistente MD PHONE"><span class="concierge-orb">✦</span> Assistente MD <span aria-hidden="true">↗</span></button>'+
'<dialog id="buyDialog" class="dialog" aria-labelledby="buyTitle"><button type="button" class="dialog-close" data-close="buyDialog" aria-label="Fechar">×</button><div class="kicker">MD PHONE / SOLICITAÇÃO</div><h2 id="buyTitle">Sua escolha começa aqui.</h2><p>Preencha seus dados para preparar uma solicitação ao WhatsApp. Não realizamos pagamento ou reserva pelo site.</p><div class="dialog-choice" id="buyChoice"></div><form id="buyForm"><label>Nome completo *<input id="buyerName" autocomplete="name" minlength="2" maxlength="90" required placeholder="Seu nome"></label><label>WhatsApp para retorno *<input id="buyerPhone" type="tel" autocomplete="tel" minlength="10" maxlength="20" required placeholder="(33) 99999-9999"></label><label>Como deseja receber?<select id="shipping"><option value="Consultar entrega">Consultar entrega</option><option value="Retirada com a loja">Retirada com a loja</option></select></label><label>Cidade / UF<input id="buyerCity" autocomplete="address-level2" maxlength="100" placeholder="Governador Valadares / MG"></label><label class="full" id="addressLabel">Endereço para consulta de entrega<input id="buyerAddress" autocomplete="street-address" maxlength="180" placeholder="Rua, número, bairro e complemento"></label><label>CEP (opcional)<input id="buyerCep" autocomplete="postal-code" maxlength="9" placeholder="00000-000"></label><label class="full">Detalhes (opcional)<textarea id="buyerNotes" rows="2" maxlength="240" placeholder="Cor, memória, troca de aparelho..."></textarea></label><label class="consent"><input id="buyerConsent" type="checkbox" required>Autorizo compartilhar meus dados com a MD PHONE pelo WhatsApp para receber atendimento.</label><button class="btn primary dialog-submit" type="submit">Abrir WhatsApp com pedido ↗</button><small>Os dados não são guardados neste site. O WhatsApp será aberto com mensagem pronta, para você confirmar o envio.</small></form></dialog>'+
'<dialog id="helpDialog" class="dialog" aria-labelledby="helpTitle"><button type="button" class="dialog-close" data-close="helpDialog" aria-label="Fechar">×</button><div class="concierge-orb" style="margin-bottom:16px">✦</div><div class="kicker">MD PHONE / CONCIERGE</div><h2 id="helpTitle">Qual produto combina com você?</h2><p>Escolha uma linha e conte o que procura. Nossa equipe responde no WhatsApp.</p><form id="helpForm"><label class="full">O que procura?<select id="helpCategory">'+D.categories.map(c=>'<option value="'+esc(c.label)+'">'+esc(c.label)+'</option>').join('')+'</select></label><label class="full">Sua preferência<textarea id="helpNote" rows="3" maxlength="250" placeholder="Modelo, faixa de preço, cor..."></textarea></label><button class="btn primary dialog-submit" type="submit">Conversar no WhatsApp ↗</button></form></dialog>';
}
function init(){
const url=new URL(location.href),prod=prodOf(url.searchParams.get('produto')),cat=catOf(url.searchParams.get('categoria')),compare=url.searchParams.has('comparar');
const content=prod?productPage(prod):cat?categoryPage(cat):compare?comparePage():home();
const root=$('#root');if(!root)return;root.innerHTML=header()+'<main id="principal">'+content+'</main>'+footer()+dialogMarkup();
document.title=(prod?prod.name+' | ':cat?cat.label+' | ':compare?'Comparar produtos | ':'')+'MD PHONE — Universo Apple';
$$('.site-nav a').forEach(a=>{if(cat&&a.getAttribute('href')===linkCat(cat.id))a.classList.add('active')});
$('#hamburger')?.addEventListener('click',()=>{const m=$('#mobileMenu'),b=$('#hamburger');m.hidden=!m.hidden;b.setAttribute('aria-expanded',String(!m.hidden))});
if(!prod&&!cat&&!compare)startHero();
if(cat)setupCategory(cat);
if(compare){$('#compA')?.addEventListener('change',renderCompare);$('#compB')?.addEventListener('change',renderCompare);renderCompare();}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-buy]');if(b){openBuy(b.dataset.buy);return;}
 const v=e.target.closest('[data-variant]');if(v&&prod){state.variant=Number(v.dataset.variant);$$('[data-variant]').forEach(x=>{const active=x===v;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});const det=$('.product-details');if(det)det.innerHTML=detailSpecs(prod,state.variant);const offer=$('#productOffer');if(offer)offer.innerHTML=priceHtml(prod,state.variant);return;}
 const c=e.target.closest('[data-close]');if(c){const d=document.getElementById(c.dataset.close);if(d.open)d.close();return;}
});
for(const id of ['buyDialog','helpDialog']){const d=document.getElementById(id);d?.addEventListener('click',e=>{if(e.target===d)d.close()})}
$('#concierge')?.addEventListener('click',()=>$('#helpDialog').showModal());
$('#shipping')?.addEventListener('change',e=>{$('#addressLabel').hidden=e.target.value==='Retirada com a loja'});
$('#buyForm')?.addEventListener('submit',submitBuy);
$('#helpForm')?.addEventListener('submit',e=>{e.preventDefault();const msg='Olá, MD PHONE! Quero ajuda para escolher um produto Apple.\nCategoria: '+$('#helpCategory').value+'\nDetalhes: '+$('#helpNote').value.trim()+'\nPode me orientar sobre modelos e preços?';openWhatsapp(msg)});
if('IntersectionObserver'in window){observer=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');observer.unobserve(en.target)}}),{threshold:.08});$$('.reveal').forEach(e=>observer.observe(e));}
}
function startHero(){const slides=$$('.hero-slide');if(slides.length<2)return;let i=0;heroTimer=setInterval(()=>{if(document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return;slides[i].classList.remove('active');$$('.timeline-item')[i]?.classList.remove('active');i=(i+1)%slides.length;slides[i].classList.add('active');$$('.timeline-item')[i]?.classList.add('active')},6500)}
function setupCategory(cat){const items=D.products.filter(p=>p.category===cat.id);$$('[data-model-index]').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.modelIndex);if(!items[i])return;$$('[data-model-index]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',String(x===b))});$('#modelStage').innerHTML=modelStage(items[i]);}));}
function openBuy(id){const p=prodOf(id);if(!p)return;state.cart=p;if(new URLSearchParams(location.search).get('produto')!==id)state.variant=0;const selection=p.variants?.[state.variant]||p.variants?.[0];$('#buyChoice').textContent=p.name+(selection?' · '+selection.label:'')+' · '+priceBRL(selection?.price);$('#buyForm').reset();$('#addressLabel').hidden=false;$('#buyDialog').showModal();$('#buyerName').focus({preventScroll:true})}
function openWhatsapp(msg){const href=wa(msg);const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();a.remove()}
function submitBuy(e){e.preventDefault();if(!e.currentTarget.reportValidity()||!state.cart)return;const p=state.cart,v=p.variants?.[state.variant]||p.variants?.[0],nm=$('#buyerName').value.trim(),tel=$('#buyerPhone').value.trim();if(nm.length<2||tel.replace(/\D/g,'').length<10){$('#buyerPhone').setCustomValidity('Informe um telefone válido com DDD.');$('#buyerPhone').reportValidity();$('#buyerPhone').setCustomValidity('');return;}const parts=['Olá, MD PHONE! Vim pelo site e quero consultar um produto.','Nome: '+nm,'WhatsApp: '+tel,'Produto: '+p.name,'Linha: '+catOf(p.category).label];if(v){parts.push('Opção: '+v.label);parts.push('Condição: '+condition(p,state.variant));if(Number.isFinite(v.price))parts.push('Valor anunciado: '+priceBRL(v.price));if(v.battery!=null)parts.push('Bateria informada: '+v.battery+'%');if(v.repairs)parts.push('Histórico: '+v.repairs);if(v.needsVerification)parts.push('Atenção: confirmar a capacidade real do aparelho antes da compra.')}parts.push('Modalidade: '+$('#shipping').value);if($('#buyerCity').value.trim())parts.push('Cidade: '+$('#buyerCity').value.trim());if($('#shipping').value!=='Retirada com a loja'&&$('#buyerAddress').value.trim())parts.push('Endereço para consulta: '+$('#buyerAddress').value.trim());if($('#buyerCep').value.trim())parts.push('CEP: '+$('#buyerCep').value.trim());if($('#buyerNotes').value.trim())parts.push('Detalhes: '+$('#buyerNotes').value.trim());parts.push('Pode confirmar preço, disponibilidade, fotos reais e condições?');openWhatsapp(parts.join('\n'));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();