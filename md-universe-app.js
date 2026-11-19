/* MD PHONE UNIVERSE — Site original, sem scripts legados. */
'use strict';
(()=>{
const DATA=window.MD_UNIVERSE||{categories:[],products:[],whatsapp:'5533987044866'};
const cats=DATA.categories,products=DATA.products,wa=DATA.whatsapp;
const PICS={
 iphone:'https://www.apple.com/v/homepage/images/iphone-18-pro/a/promo_iphone_18_pro__9nn5m4mt2bmy_large.jpg',
 duo:'https://www.apple.com/br/homepage/built/heroes/26_iphone-duo_09/images/hero_iphone_duo_announce__fh4u8yzndpe2_large.jpg',
 mac:'https://www.apple.com/v/homepage/images/macbook-pro-proled-xdr/a/hero_macbook_pro_proled_xdr_preorder__df38n593sxg2_large.jpg',
 ipad:'https://www.apple.com/v/homepage/images/ipad-mini/a/promo_ipad_mini_a20_announce__efc6vmmxg58i_large.jpg',
 watch:'https://www.apple.com/br/homepage/built/promos/26_apple-watch-series-12_10/images/promo_apple_watch_series_12__gnlprtt8526a_large.jpg',
 airpods:'https://www.apple.com/v/homepage/images/airpods-pro-3/a/promo_airpods_pro_3__e4755qofhnyq_large.jpg',
 imac:'https://www.apple.com/v/homepage/images/imac-m6/a/promo_imac_m6_announce__fd1gdwgpg2a2_large.jpg',
 casa:'',
 acessorios:''
};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url=id=>({iphone:'iphone.html',mac:'mac.html',ipad:'ipad.html',watch:'watch.html',airpods:'airpods.html',casa:'casa.html',acessorios:'acessorios.html'})[id]||'index.html';
const prodUrl=p=>'produto.html?id='+encodeURIComponent(p.id);
const cat=id=>cats.find(c=>c.id===id);
const product=id=>products.find(p=>p.id===id);
const picture=p=>p.image||PICS[p.category]||'';
const photo=(src,alt,extra='')=>src?'<img src="'+esc(src)+'" alt="'+esc(alt)+'" '+extra+' loading="lazy" decoding="async" onerror="this.style.display=\'none\'">':'';
const categoryImage=id=>PICS[id]||'';
const symbol={iphone:'◈',mac:'⌘',ipad:'▣',watch:'◉',airpods:'♫',casa:'⌂',acessorios:'✦'};
let selected=null,variantIndex=0,heroTimer=null;
function header(){
 const links=cats.map(c=>'<a href="'+url(c.id)+'" '+(document.body.dataset.category===c.id?'class="active" aria-current="page"':'')+'>'+esc(c.label)+'</a>').join('');
 return '<a class="skip" href="#conteudo">Ir ao conteúdo</a><header class="site-head"><div class="head-inner">'+
 '<a href="index.html" class="brand" aria-label="MD PHONE início"><img src="assets/md-phone-brand-mark.svg" width="42" height="42" alt=""><span><b>MD</b> PHONE</span></a>'+
 '<nav class="site-nav" aria-label="Produtos Apple">'+links+'</nav>'+
 '<div class="head-actions"><a class="head-cta" href="https://wa.me/'+wa+'?text=Ol%C3%A1%21%20Quero%20conhecer%20os%20produtos%20da%20MD%20PHONE." target="_blank" rel="noopener noreferrer">Atendimento ↗</a><button type="button" class="hamburger" id="menuButton" aria-expanded="false" aria-controls="mobileMenu" aria-label="Abrir menu">☰</button></div>'+
 '</div><nav class="mobile-menu" id="mobileMenu" aria-label="Categorias" hidden><a href="index.html">Início</a>'+links+'<a href="comparar.html">Comparar produtos</a><a href="sobre.html">Sobre a loja</a></nav></header>';
}
function footer(){
 const links=cats.map(c=>'<a href="'+url(c.id)+'">'+esc(c.label)+'</a>').join('');
 return '<footer class="footer"><div class="footer-inner"><div><a class="brand" href="index.html"><img src="assets/md-phone-brand-mark.svg" alt="" width="42" height="42"><span><b>MD</b> PHONE</span></a><p>A nova identidade da MD Use Imports. Tecnologia Apple, atendimento personalizado e uma experiência feita para você.</p></div><div><h4>Universo Apple</h4><div class="footer-links">'+links+'</div></div><div><h4>MD PHONE</h4><div class="footer-links"><a href="sobre.html">Nossa história</a><a href="comparar.html">Comparar modelos</a><a href="iphone.html">Seminovos</a></div></div><div><h4>Fale com a loja</h4><div class="footer-links"><a href="https://wa.me/'+wa+'" target="_blank" rel="noopener noreferrer">WhatsApp (33) 98704-4866 ↗</a><span style="font-size:11px;color:#a8c3b0">Disponibilidade, garantia, preços, frete e condições sujeitos à confirmação.</span></div></div></div><div class="footer-base"><span>© 2026 MD PHONE · MD Use Imports</span><span>Loja independente. Não afiliada à Apple Inc. Imagens de referência pertencem aos respectivos titulares.</span></div></footer>';
}
function dialogs(){
 return '<button class="concierge" type="button" id="conciergeButton" aria-label="Abrir atendimento MD PHONE"><span class="concierge-orb">✦</span><span>Assistente MD</span><span>↗</span></button>'+
 '<dialog class="dialog" id="checkout" aria-labelledby="checkoutTitle"><button class="dialog-close" data-close="checkout" type="button" aria-label="Fechar">×</button><span class="kicker">MD PHONE · SOLICITAÇÃO</span><h2 id="checkoutTitle">Seu próximo Apple começa aqui.</h2><p>Preencha os dados e receba atendimento no WhatsApp. Esta etapa não finaliza a compra nem reserva estoque.</p>'+
 '<form id="checkoutForm"><div class="dialog-choice" id="dialogChoice"></div><label>Nome completo *<input id="name" name="name" autocomplete="name" required minlength="2" maxlength="90" placeholder="Seu nome"></label><label>Seu WhatsApp *<input id="phone" name="phone" autocomplete="tel" required minlength="10" maxlength="24" placeholder="(33) 99999-9999"></label><label>Modalidade<select id="mode"><option value="Consultar entrega">Consultar entrega</option><option value="Retirada com a loja">Retirada com a loja</option></select></label><label>Cidade / UF<input id="city" autocomplete="address-level2" placeholder="Governador Valadares / MG"></label><label class="full" id="addressField">Endereço para consulta de entrega<input id="address" autocomplete="street-address" placeholder="Rua, número, bairro, complemento"></label><label>CEP (opcional)<input id="zip" autocomplete="postal-code" placeholder="00000-000" maxlength="9"></label><label class="full">Observações<textarea id="notes" rows="3" maxlength="250" placeholder="Cor, memória, troca do seu aparelho..."></textarea></label><label class="consent"><input id="consent" type="checkbox" required> Autorizo o envio dos dados informados à MD PHONE pelo WhatsApp para receber atendimento.</label><button type="submit" class="btn primary dialog-submit">Preparar mensagem no WhatsApp ↗</button><small>O site não armazena seus dados. A mensagem é preparada no WhatsApp e você confirma o envio.</small></form></dialog>'+
 '<dialog class="dialog" id="conciergeDialog" aria-labelledby="conciergeTitle"><button class="dialog-close" data-close="conciergeDialog" type="button" aria-label="Fechar">×</button><span class="kicker">MD PHONE · CONCIERGE</span><h2 id="conciergeTitle">Qual produto você procura?</h2><p>Conte o que deseja e nossa equipe poderá orientar você.</p><form id="conciergeForm"><label class="full">Categoria<select id="conciergeCategory">'+cats.map(c=>'<option>'+esc(c.label)+'</option>').join('')+'</select></label><label class="full">O que você precisa?<textarea id="conciergeText" rows="3" maxlength="300" placeholder="Modelo, cor, capacidade, orçamento, troca..."></textarea></label><button type="submit" class="btn primary dialog-submit">Conversar no WhatsApp ↗</button></form></dialog>';
}
function trust(){
 return '<section class="trust-strip"><div class="trust-items"><div class="trust-item"><strong>Detalhes transparentes</strong><p>Consulte condição, bateria, peças e disponibilidade de cada unidade antes de decidir.</p></div><div class="trust-item"><strong>Seu aparelho na troca</strong><p>Solicite uma avaliação personalizada diretamente com a equipe.</p></div><div class="trust-item"><strong>Atendimento humano</strong><p>Uma conversa direta para esclarecer valores, garantia, entrega e formas de pagamento.</p></div></div></section>';
}
const slides=[
 {id:'iphone-18-pro',label:'NOVO · UNIVERSO IPHONE',name:'iPhone 18 Pro.',title:'Muito além do esperado.',desc:'Uma nova geração para quem quer sentir a tecnologia em cada detalhe.',img:PICS.iphone,glow:'#1e533d',href:'produto.html?id=iphone-18-pro',cat:'iphone.html',catLabel:'Explorar iPhone'},
 {id:'macbook-pro-14',label:'UNIVERSO MAC',name:'MacBook Pro.',title:'Crie sem limites.',desc:'Uma experiência de alto nível para suas grandes ideias.',img:PICS.mac,glow:'#284b68',href:'produto.html?id=macbook-pro-14',cat:'mac.html',catLabel:'Explorar Mac'},
 {id:'apple-watch-series-12',label:'UNIVERSO WATCH',name:'Apple Watch.',title:'O ritmo é seu.',desc:'Estilo, tecnologia e possibilidades que acompanham cada dia.',img:PICS.watch,glow:'#3c5e3d',href:'produto.html?id=apple-watch-series-12',cat:'watch.html',catLabel:'Explorar Watch'}
];
function heroSlide(s,i){
 return '<div class="hero-slide '+(i===0?'active':'')+'" style="--glow:'+s.glow+'" data-hero="'+i+'" aria-hidden="'+(i===0?'false':'true')+'"><div class="hero-media photo-dark">'+photo(s.img,'Fotografia promocional do '+s.name,'fetchpriority="'+(i===0?'high':'low')+'"')+'</div><div class="hero-inner"><div class="hero-content"><span class="kicker">'+esc(s.label)+'</span><h1>'+esc(s.name)+'<br><em>'+esc(s.title)+'</em></h1><p class="hero-desc">'+esc(s.desc)+'</p><div class="action-row"><a class="btn primary" href="'+s.href+'">Conhecer o produto ↗</a><a class="btn secondary" href="'+s.cat+'">'+s.catLabel+' ↗</a></div></div><div class="hero-foot">MD PHONE <span></span> SUA PRÓXIMA CONQUISTA</div></div></div>';
}
function home(){
 const tiles=cats.map(c=>{
  const img=categoryImage(c.id);
  return '<a class="category-tile reveal" href="'+url(c.id)+'" style="--tile-glow:'+c.accent+'55" aria-label="Explorar '+esc(c.label)+'"><div class="tile-visual">'+(img?photo(img,'Imagem promocional da linha '+c.label):'<span class="tile-fallback" aria-hidden="true">'+(symbol[c.id]||'✦')+'</span>')+'</div><div class="tile-content"><span class="tile-eyebrow">MD PHONE · '+esc(c.label.toUpperCase())+'</span><h3>'+esc(c.label)+'</h3><p>'+esc(c.sub)+'</p><span class="tile-arrow">↗</span></div></a>';
 }).join('');
 const marqueeItems=['IPHONE','MAC','IPAD','APPLE WATCH','AIRPODS','TV E CASA','ACESSÓRIOS'].map(x=>'<span><b>✦</b>'+x+'</span>').join('');
 return '<main id="conteudo"><section class="hero" aria-label="Lançamentos em destaque">'+slides.map(heroSlide).join('')+'<span class="hero-label">MD PHONE / APPLE UNIVERSE</span><div class="hero-timeline" aria-hidden="true">'+slides.map((s,i)=>'<span class="timeline-item '+(i===0?'active':'')+'"></span>').join('')+'</div></section>'+
 '<div class="marquee" aria-hidden="true"><div class="marquee-track">'+marqueeItems+marqueeItems+'</div></div>'+
 '<section class="section universe" id="familias"><div class="section-inner"><div class="section-top reveal"><div><span class="kicker">UM UNIVERSO. MUITAS POSSIBILIDADES.</span><h2 class="section-heading">Tudo o que você ama.<br><em>Em um só lugar.</em></h2></div><p class="section-sub">Descubra cada linha Apple com a experiência visual que ela merece.</p></div><div class="category-grid">'+tiles+'</div></div></section>'+
 '<section class="immersive-strip"><div class="strip-photo">'+photo(PICS.imac,'Imagem promocional do iMac')+'<video class="brand-film" autoplay muted loop playsinline preload="metadata" disablepictureinpicture aria-hidden="true" poster="'+PICS.imac+'"><source src="https://resource2.heygen.ai/videos/ee161397c93a4dbda4b7e524885f995f/ee161397c93a4dbda4b7e524885f995f/01a1f13d-3fdc-7e47-ac0b-58b2c3d50310.mp4" type="video/mp4"></video></div><div class="strip-copy reveal"><span class="kicker">MD PHONE / FILME CONCEITUAL</span><h2>O futuro<br>tem <span style="color:var(--green)">a sua cara.</span></h2><p>Do iPhone ao Mac, encontre a tecnologia que acompanha suas conquistas. Consulte nossos modelos e disponibilidade.</p><div class="action-row"><a class="btn primary" href="mac.html">Descobrir o Mac ↗</a><a class="btn secondary" href="comparar.html">Comparar modelos ↗</a></div></div></section>'+trust()+'</main>';
}
function categoryPage(c){
 const list=products.filter(p=>p.category===c.id),pic=categoryImage(c.id);
 const tabs=list.map((p,i)=>'<button class="model-tab" role="tab" type="button" data-select-product="'+esc(p.id)+'" aria-selected="'+(i===0)+'" tabindex="'+(i===0?'0':'-1')+'">'+esc(p.name)+'</button>').join('');
 return '<main id="conteudo"><section class="category-hero" style="--hero-glow:'+c.accent+'55"><div class="category-photo photo-dark">'+photo(pic,'Imagem promocional da linha '+c.label)+'</div><div class="category-copy"><span class="kicker">MD PHONE / '+esc(c.label.toUpperCase())+'</span><h1>'+esc(c.label)+'<em>.</em></h1><p>'+esc(c.line)+' '+esc(c.sub)+'</p><div class="action-row"><a class="btn primary" href="#modelos">Explorar modelos ↗</a><a class="btn secondary" href="comparar.html?categoria='+c.id+'">Comparar ↗</a></div></div></section>'+
 '<section class="section model-section" id="modelos"><div class="section-inner"><div class="model-intro reveal"><span class="kicker">LINHA '+esc(c.label.toUpperCase())+'</span><h2 class="section-heading">Conheça a <em>família.</em></h2><p class="section-sub">Selecione um modelo. Uma apresentação por vez, sem repetições.</p></div><div class="model-rail" role="tablist" aria-label="Modelos '+esc(c.label)+'">'+tabs+'</div><div class="model-stage" id="modelStage" role="tabpanel" aria-live="polite"></div><p class="small-note">Fotografias promocionais ilustrativas. Modelos e configurações não confirmados em estoque aparecem sob consulta. Verifique sempre a unidade, o preço e as condições antes da compra.</p></div></section>'+trust()+'</main>';
}
function stage(p){
 const specs=(p.specs||[]).map(s=>'<span class="spec-pill">'+esc(s)+'</span>').join('');
 const source=picture(p),caption=p.image?'FOTO PROMOCIONAL DO MODELO':'FOTO DE REFERÊNCIA DA LINHA · CONSULTE FOTOS DA UNIDADE';
 return '<div class="model-art">'+photo(source,caption+' '+p.name)+(source?'':'<span style="font-size:140px;opacity:.24;position:absolute;inset:0;display:grid;place-items:center">'+(symbol[p.category]||'✦')+'</span>')+'<span class="model-art-label">'+caption+'</span></div>'+
 '<div class="model-info"><span class="stock-label">'+(p.availability==='estoque_informado'?'UNIDADE INFORMADA · CONFIRMAR DISPONIBILIDADE':'SOB CONSULTA · DISPONIBILIDADE A CONFIRMAR')+'</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.desc)+'</p><div class="model-specs">'+specs+'</div><div class="model-actions"><a class="btn primary" href="'+prodUrl(p)+'">Conhecer detalhes ↗</a><button class="btn secondary" type="button" data-consult="'+esc(p.id)+'">Consultar no WhatsApp ↗</button></div></div>';
}
function productPage(p){
 const c=cat(p.category),img=picture(p);
 const variantButtons=(p.variants||[]).length>1?'<div class="variant-list" role="group" aria-label="Selecione a unidade">'+p.variants.map((v,i)=>'<button type="button" data-variant="'+i+'" class="'+(i===0?'active':'')+'" aria-pressed="'+(i===0)+'">'+esc(v.label)+'</button>').join('')+'</div>':'';
 return '<main id="conteudo"><section class="product-hero" style="--prod-glow:'+p.accent+'44"><div class="product-photo">'+photo(img,'Imagem promocional de referência '+p.name)+(img?'':'<span style="font-size:190px;opacity:.18">'+(symbol[p.category]||'✦')+'</span>')+'</div><div class="product-copy"><a href="'+url(c.id)+'" class="text-link">← Voltar para '+esc(c.label)+'</a><div style="margin-top:24px"><span class="kicker">MD PHONE · '+esc(c.label.toUpperCase())+'</span></div><h1 class="product-title">'+esc(p.name)+'<em>.</em></h1><p>'+esc(p.desc)+'</p><span class="stock-label">'+(p.availability==='estoque_informado'?'UNIDADE INFORMADA · SUJEITA A CONFIRMAÇÃO':'SOB CONSULTA · DISPONIBILIDADE A CONFIRMAR')+'</span>'+variantButtons+'<div class="product-details" id="productDetails">'+details(p)+'</div><div class="action-row"><button class="btn primary" type="button" data-consult="'+esc(p.id)+'">Solicitar este produto ↗</button><a class="btn secondary" href="comparar.html?categoria='+esc(c.id)+'">Comparar modelos ↗</a></div></div></section>'+
 '<section class="section universe"><div class="section-inner"><span class="kicker">ANTES DE COMPRAR</span><h2 class="section-heading">Cada detalhe<br><em>faz diferença.</em></h2><div class="disclosure"><strong>Transparência MD PHONE.</strong> Valores, disponibilidade, especificações exatas, garantia e condições de envio são confirmados no atendimento. Fotos promocionais são referências da linha, não necessariamente da unidade disponível. Para seminovos, solicite fotos reais e histórico de peças.</div></div></section>'+trust()+'</main>';
}
function details(p){
 const v=p.variants?.[variantIndex];
 let arr=[...(p.specs||[])];
 if(v){arr=['Opção: '+v.label,'Saúde da bateria: '+(v.battery===null?'a confirmar':v.battery+'% informado'),'Histórico de peças: '+(v.repairs||'a confirmar')];}
 return arr.map(s=>'<div>'+esc(s)+'</div>').join('');
}
function comparePage(){
 const requested=new URLSearchParams(location.search).get('categoria');
 const c=cat(requested)||cats[0];
 const opts=products.filter(p=>p.category===c.id);
 const option=opts.map(p=>'<option value="'+esc(p.id)+'">'+esc(p.name)+'</option>').join('');
 return '<main id="conteudo" class="compare"><div class="section-inner" style="padding:0 22px 100px"><span class="kicker">MD PHONE / COMPARAR</span><h1 class="section-heading">Encontre a escolha <em>ideal.</em></h1><p class="section-sub" style="max-width:650px;margin-top:18px">Compare informações gerais dos modelos. Para configurações e condições exatas, consulte a equipe.</p><div class="compare-toolbar"><select id="compareCategory" aria-label="Categoria">'+cats.map(x=>'<option value="'+x.id+'" '+(x.id===c.id?'selected':'')+'>'+esc(x.label)+'</option>').join('')+'</select><select id="compareA" aria-label="Primeiro produto">'+option+'</select><select id="compareB" aria-label="Segundo produto">'+option+'</select></div><div class="compare-table" id="compareTable"></div></div>'+trust()+'</main>';
}
function compareCol(p){
 return '<article class="compare-col"><span class="kicker">'+esc(cat(p.category).label)+'</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.desc)+'</p><div class="compare-row">'+(p.availability==='estoque_informado'?'Unidade informada pela loja':'Disponibilidade sob consulta')+'</div>'+p.specs.map(s=>'<div class="compare-row">'+esc(s)+'</div>').join('')+'<a class="btn primary" href="'+prodUrl(p)+'">Ver detalhes ↗</a></article>';
}
function storyPage(){
 return '<main id="conteudo" style="padding-top:76px"><section class="story"><div><span class="kicker">MD PHONE · MD USE IMPORTS</span><h2>Uma nova identidade.<br><span style="color:var(--green)">O mesmo cuidado.</span></h2><p>A MD PHONE apresenta uma experiência própria para quem ama o universo Apple. Nossa proposta é unir um catálogo visual moderno a informações transparentes e atendimento personalizado.</p><p>Você pode consultar lançamentos e famílias de produtos, mas a disponibilidade real é confirmada diretamente com a equipe. Para seminovos, a condição individual de cada aparelho faz parte da conversa.</p><div class="action-row"><a class="btn primary" href="index.html">Explorar produtos ↗</a><a class="btn secondary" href="https://wa.me/'+wa+'" target="_blank" rel="noopener noreferrer">Falar com a loja ↗</a></div></div><div class="story-logo"><img src="assets/md-phone-brand-mark.svg" alt="Marca MD PHONE"></div></section>'+trust()+'</main>';
}
function init(){
 const page=document.body.dataset.page||'home';
 const params=new URLSearchParams(location.search);
 let content;
 if(page==='home')content=home();
 else if(page==='category'){const c=cat(document.body.dataset.category);content=c?categoryPage(c):home();if(c)document.title=c.label+' | MD PHONE';}
 else if(page==='product'){const p=product(params.get('id'))||products[0];selected=p;variantIndex=0;content=productPage(p);document.title=p.name+' | MD PHONE';}
 else if(page==='compare'){content=comparePage();document.title='Comparar produtos | MD PHONE';}
 else{content=storyPage();document.title='Sobre a loja | MD PHONE';}
 $('#app').innerHTML=header()+content+footer()+dialogs();
 const mb=$('#menuButton'),mn=$('#mobileMenu');
 mb?.addEventListener('click',()=>{mn.hidden=!mn.hidden;mb.setAttribute('aria-expanded',String(!mn.hidden))});
 mn?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mn.hidden=true;mb.setAttribute('aria-expanded','false')}));
 if(page==='home')initHero();
 if(page==='category'){const c=cat(document.body.dataset.category);if(c){const p=products.find(p=>p.category===c.id);if(p)$('#modelStage').innerHTML=stage(p)}}
 if(page==='compare'){const a=$('#compareA'),b=$('#compareB');if(b.options.length>1)b.selectedIndex=1;updateCompare();}
 initReveal();
 document.addEventListener('click',onClick);
 $('#compareCategory')?.addEventListener('change',e=>{const list=products.filter(p=>p.category===e.target.value);const options=list.map(p=>'<option value="'+esc(p.id)+'">'+esc(p.name)+'</option>').join('');$('#compareA').innerHTML=options;$('#compareB').innerHTML=options;if(list.length>1)$('#compareB').selectedIndex=1;updateCompare()});
 $('#compareA')?.addEventListener('change',updateCompare);$('#compareB')?.addEventListener('change',updateCompare);
 $('#mode')?.addEventListener('change',e=>{$('#addressField').hidden=e.target.value==='Retirada com a loja'});
 $('#checkoutForm')?.addEventListener('submit',checkoutSubmit);
 $('#conciergeForm')?.addEventListener('submit',conciergeSubmit);
}
function initHero(){
 const all=$$('.hero-slide'),ticks=$$('.timeline-item');if(all.length<2)return;
 let index=0;heroTimer=setInterval(()=>{
  if(document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const next=(index+1)%all.length;
  all[index].classList.remove('active');all[index].setAttribute('aria-hidden','true');ticks[index].classList.remove('active');
  all[next].classList.add('active');all[next].setAttribute('aria-hidden','false');ticks[next].classList.add('active');
  index=next;
 },7000);
}
function initReveal(){
 if(!('IntersectionObserver'in window)){ $$('.reveal').forEach(x=>x.classList.add('in'));return;}
 const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}})},{threshold:.09});
 $$('.reveal').forEach(x=>obs.observe(x));
}
function onClick(e){
 const sel=e.target.closest('[data-select-product]');if(sel){
  const p=product(sel.dataset.selectProduct);if(!p)return;
  $$('.model-tab').forEach(x=>{const on=x===sel;x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1});
  const st=$('#modelStage');st.style.opacity='.5';st.innerHTML=stage(p);st.style.opacity='1';return;
 }
 const v=e.target.closest('[data-variant]');if(v){
  variantIndex=Number(v.dataset.variant)||0;$$('[data-variant]').forEach(x=>{const on=x===v;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on))});
  if(selected)$('#productDetails').innerHTML=details(selected);return;
 }
 const consult=e.target.closest('[data-consult]');if(consult){const p=product(consult.dataset.consult);if(p)openCheckout(p);return;}
 if(e.target.closest('#conciergeButton')){openDialog($('#conciergeDialog'));return;}
 const close=e.target.closest('[data-close]');if(close){closeDialog(document.getElementById(close.dataset.close));return;}
}
function updateCompare(){
 const a=product($('#compareA')?.value),b=product($('#compareB')?.value);const el=$('#compareTable');if(el&&a&&b)el.innerHTML=compareCol(a)+compareCol(b);
}
function openDialog(d){if(!d)return;if(d.showModal&&!d.open)d.showModal();else d.setAttribute('open','')}
function closeDialog(d){if(!d)return;if(d.close)d.close();else d.removeAttribute('open')}
function openCheckout(p){selected=p;const v=p.variants?.[variantIndex];const choice=p.name+(v?' · '+v.label:'');$('#dialogChoice').textContent=choice;$('#checkoutForm').reset();$('#addressField').hidden=false;openDialog($('#checkout'))}
function openWA(text){const a=document.createElement('a');a.href='https://wa.me/'+wa+'?text='+encodeURIComponent(text);a.target='_blank';a.rel='noopener noreferrer';a.click()}
function checkoutSubmit(e){
 e.preventDefault();if(!e.currentTarget.reportValidity()||!selected)return;
 const name=$('#name').value.trim(),phone=$('#phone').value.trim();
 if(name.length<2||phone.replace(/\D/g,'').length<10){alert('Informe nome e telefone válidos.');return}
 const v=selected.variants?.[variantIndex];
 const lines=['Olá, MD PHONE! Gostaria de consultar este produto.','', 'Nome: '+name,'WhatsApp: '+phone,'Produto: '+selected.name];
 if(v){lines.push('Unidade: '+v.label);if(v.battery!==null)lines.push('Bateria informada: '+v.battery+'%');if(v.repairs)lines.push('Histórico de peças informado: '+v.repairs)}
 lines.push('Modalidade: '+$('#mode').value);
 if($('#city').value.trim())lines.push('Cidade: '+$('#city').value.trim());
 if($('#mode').value!=='Retirada com a loja'&&$('#address').value.trim())lines.push('Endereço para consulta de entrega: '+$('#address').value.trim());
 if($('#zip').value.trim())lines.push('CEP: '+$('#zip').value.trim());
 if($('#notes').value.trim())lines.push('Observações: '+$('#notes').value.trim());
 lines.push('','Pode confirmar preço, disponibilidade, fotos atuais da unidade, garantia e condições de compra?');
 openWA(lines.join('\n'));
}
function conciergeSubmit(e){e.preventDefault();const category=$('#conciergeCategory').value,details=$('#conciergeText').value.trim();openWA('Olá, MD PHONE! Gostaria de atendimento.\nCategoria: '+category+(details?'\nProcuro: '+details:'')+'\nPode me ajudar com opções e valores?')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();