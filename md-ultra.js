/* MD PHONE Ultra — vitrines de produto com fotos amplas, sem boneco e sem controles de video. */
(()=>{'use strict';
function init(){
const $=q=>document.querySelector(q);
const hero=$('.hero-content');
if(hero){
  const t=hero.querySelector('h1');if(t)t.innerHTML='Seu próximo<br><em>iPhone começa aqui.</em>';
  const p=hero.querySelector('p');if(p)p.textContent='Tecnologia, elegância e atendimento personalizado. Conheça seu próximo iPhone com todos os detalhes.';
  const b=hero.querySelector('.hero-buttons .button.lime');if(b){b.innerHTML='Escolher meu iPhone <span aria-hidden="true">↗</span>';b.href='#vitrine'}
  const w=hero.querySelector('.hero-buttons .button.ghost');if(w){w.textContent='Falar no WhatsApp';w.href='https://wa.me/5533987044866?text='+encodeURIComponent('Olá, MD PHONE! Quero atendimento para escolher meu iPhone.');w.target='_blank';w.rel='noopener noreferrer'}
}
const promises=$('.md-promises-inner');
if(promises)promises.innerHTML=[
  ['◇','Compra com clareza','Detalhes, condições e histórico do aparelho'],
  ['↗','Entrega para todo o Brasil','Consulte frete, cobertura e prazo'],
  ['↻','Seu iPhone na troca','Solicite avaliação do aparelho atual'],
  ['✆','Atendimento pelo WhatsApp','Equipe para esclarecer suas dúvidas']
].map(([icon,title,sub])=>'<div class="md-promise"><span class="md-promise-icon" aria-hidden="true">'+icon+'</span><div><strong>'+title+'</strong><small>'+sub+'</small></div></div>').join('');
const video=$('#mdCinemaVideo');if(video){video.autoplay=true;video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;video.controls=false;video.removeAttribute('controls')}
const sec=$('#destaques');
if(sec){
  const h=sec.querySelector('.section-title h2');if(h)h.innerHTML='A experiência <em>iPhone</em> começa nos detalhes.';
  const p=sec.querySelector('.section-title p');if(p)p.textContent='Fotos em destaque, design impressionante e modelos para cada estilo.';
  const k=sec.querySelector('.section-title .eyebrow');if(k)k.textContent='DESTAQUES DA MD PHONE';
  const products=[
    {label:'LINHA PRO · SOB CONSULTA',title:'iPhone 18<br>Pro Max',description:'Uma nova geração de desempenho e fotografia. Consulte opções e disponibilidade.',src:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-18-pro-max-finish-select-silver-202609?wid=900&hei=1112&fmt=png-alpha',color:'#4b7861',id:'18pro',alt:'Imagem promocional ilustrativa do iPhone 18 Pro Max prateado'},
    {label:'LINHA PRO · SOB CONSULTA',title:'iPhone 17<br>Pro Max',description:'Uma experiência premium em cada detalhe. Escolha sua configuração com nossa equipe.',src:'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-max-finish-select-silver-202509?wid=900&hei=1112&fmt=png-alpha',color:'#403955',id:'17pro-new',alt:'Imagem ilustrativa do iPhone 17 Pro Max'},
    {label:'SEMINOVOS · OPÇÕES REAIS',title:'iPhone 13<br>Pro',description:'O design Pro que permanece atual. Veja cores, armazenamento, bateria e histórico.',src:'assets/iphone-13-pro-azul-real-verso.webp',color:'#24577b',id:'13p-blue',alt:'Foto do iPhone 13 Pro azul do catálogo da MD PHONE'}
  ];
  const grid=sec.querySelector('.editorial-grid');
  if(grid)grid.innerHTML=products.map((p,i)=>'<article class="md-ultra-feature" style="--feature-glow:'+p.color+';" aria-label="'+p.title.replace('<br>',' ')+'"><img src="'+p.src+'" alt="'+p.alt+'" loading="'+(i===0?'eager':'lazy')+'" decoding="async"><div class="md-ultra-copy"><small>'+p.label+'</small><h3>'+p.title+'</h3><p>'+p.description+'</p><div class="md-ultra-actions"><button type="button" data-order="'+p.id+'">Consultar compra ↗</button><a href="#vitrine">Ver detalhes</a></div></div></article>').join('');
}
const steps=$('#filmes');
if(steps){
  const h=steps.querySelector('h2');if(h)h.innerHTML='Sua próxima conquista.<br>Em três passos.';
  const content=[
    ['01 / ESCOLHA','Escolha seu iPhone.','Explore o catálogo, compare as cores e confira memória, bateria e condições cadastradas.'],
    ['02 / CADASTRO','Conte seus dados.','No botão de compra, informe nome, WhatsApp e, se necessário, o endereço para entrega.'],
    ['03 / WHATSAPP','Finalize com a loja.','Sua solicitação abre uma conversa com mensagem pronta. A equipe confirma preço e disponibilidade.']
  ];
  steps.querySelectorAll('.md-step').forEach((node,i)=>{if(content[i])node.innerHTML='<span>'+content[i][0]+'</span><h3>'+content[i][1]+'</h3><p>'+content[i][2]+'</p>'});
}
const btn=$('#headerAssistant');if(btn){btn.textContent='Atendimento MD ↗';btn.title='Abrir atendimento guiado'}
const assistant=$('#assistantTrigger');if(assistant)assistant.querySelector('.md-mascot-stage')?.remove();
const intro=$('.md-assistant-intro');if(intro)intro.querySelector('.md-mascot-modal-stage')?.remove();
const anchor=$('#filmes');
if(anchor&&!$('#md-ultra-trust')){
 const e=document.createElement('section');e.id='md-ultra-trust';
 e.innerHTML='<div class="md-ultra-trust-inner shell"><div class="md-ultra-trust-head"><span>CONFIANÇA SE CONSTRÓI COM TRANSPARÊNCIA</span><h2>Seu próximo iPhone.<br><em>Com uma escolha segura.</em></h2><p>MD PHONE é a nova identidade da MD Use Imports. Priorizamos informações claras sobre os aparelhos e atendimento personalizado.</p></div><div class="md-ultra-trust-points"><div><b>01</b><strong>Informações do aparelho</strong><small>Cor, memória, bateria e histórico conhecidos na ficha da unidade.</small></div><div><b>02</b><strong>Atendimento direto</strong><small>Consulte condições e receba orientação antes da decisão.</small></div><div><b>03</b><strong>Sua opinião importa</strong><small>Conheça as avaliações públicas da MD Use Imports.</small></div></div><a class="md-ultra-google" href="https://www.google.com/search?q=MD+Use+Imports+Governador+Valadares+avalia%C3%A7%C3%B5es" rel="noopener noreferrer" target="_blank">Ver avaliações públicas no Google ↗</a></div>';
 anchor.insertAdjacentElement('afterend',e);
}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();