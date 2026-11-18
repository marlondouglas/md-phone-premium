'use strict';
/* MD PHONE / Assistente de compra. Pré-preenche WhatsApp sem envio silencioso. */
(function(){
  const number='5533987044866';
  const $=id=>document.getElementById(id);
  const val=id=>$(id)?.value?.trim()||'';
  function isTrade(){return val('assistantIntent')==='Tenho aparelho para troca';}
  function isOther(){return val('assistantModel')==='Outro modelo';}
  function selectedModel(){return isOther()?(val('assistantOtherModel')||'Outro modelo a definir'):val('assistantModel');}
  function buildMessage(){
    const parts=[
      'Olá, MD PHONE! Vim pelo Assistente MD do site.',
      'Interesse: '+val('assistantStage')+'.',
      'iPhone procurado: '+selectedModel()+'.',
      'Faixa de valor: '+val('assistantBudget')+'.',
      'Condição desejada: '+val('assistantCondition')+'.',
      'Modalidade: '+val('assistantIntent')+'.'
    ];
    if(isTrade()){
      parts.push('Aparelho que tenho para trocar: '+(val('assistantTradeModel')||'Informarei no atendimento')+'.');
      if(val('assistantTradeBattery'))parts.push('Bateria do aparelho da troca: '+val('assistantTradeBattery')+'.');
      parts.push('Condição informada: '+val('assistantTradeCondition')+'.');
      if(val('assistantTradeNotes'))parts.push('Detalhes da troca: '+val('assistantTradeNotes').slice(0,240)+'.');
    }
    if(val('assistantNotes'))parts.push('Preferências do iPhone procurado: '+val('assistantNotes').slice(0,240)+'.');
    parts.push('Pode confirmar preços, disponibilidade, fotos reais e as condições para comprar'+(isTrade()?' ou trocar':'')+'?');
    return parts.join('\n');
  }
  function updateForm(){
    const other=$('assistantOtherWrap'),trade=$('assistantTradeFields');
    other.hidden=!isOther();
    trade.hidden=!isTrade();
    const valid=!isOther()||val('assistantOtherModel').length>0;
    const link=$('assistantWhatsApp');
    link.href='https://wa.me/'+number+'?text='+encodeURIComponent(buildMessage());
    link.setAttribute('aria-disabled',String(!valid));
    link.setAttribute('aria-label','Abrir WhatsApp da MD PHONE com solicitação sobre '+selectedModel());
    link.tabIndex=valid?0:-1;
  }
  function init(){
    const modal=$('assistantModal'),trigger=$('assistantTrigger'),form=$('assistantForm');
    if(!modal||!trigger||!form)return;
    trigger.addEventListener('click',()=>{
      updateForm();
      if(!modal.open)modal.showModal();
      $('assistantModel').focus({preventScroll:true});
    });
    const header=$('headerAssistant'),mobile=$('mobileAssistantLink');
    function openFromNavigation(event){
      if(event)event.preventDefault();
      const mobileNav=$('mobileNav');
      mobileNav?.classList.remove('open');
      $('mobileTrigger')?.setAttribute('aria-expanded','false');
      trigger.click();
    }
    header?.addEventListener('click',openFromNavigation);
    mobile?.addEventListener('click',openFromNavigation);
    window.MD_ASSISTANT_OPEN=()=>trigger.click();
    const video=trigger.querySelector('.md-mascot-video');
    if(video){
      const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
      function stop(){trigger.classList.remove('md-mascot-is-playing');}
      video.addEventListener('playing',()=>{
        if(reduced.matches){video.pause();stop();return;}
        trigger.classList.add('md-mascot-is-playing');
      });
      video.addEventListener('error',stop);
      video.addEventListener('pause',stop);
      if(reduced.matches)video.pause();
      const tryPlay=()=>{
        if(document.hidden||reduced.matches){video.pause();stop();return;}
        const task=video.play();
        if(task?.catch)task.catch(stop);
      };
      if(reduced.addEventListener)reduced.addEventListener('change',tryPlay);
      document.addEventListener('visibilitychange',tryPlay);
      tryPlay();
    }
    $('assistantClose').addEventListener('click',()=>modal.close());
    form.addEventListener('submit',e=>e.preventDefault());
    form.addEventListener('input',updateForm);
    form.addEventListener('change',updateForm);
    $('assistantWhatsApp').addEventListener('click',e=>{
      if(isOther()&&!val('assistantOtherModel')){
        e.preventDefault();
        $('assistantOtherModel').focus();
      }
    });
    modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
    modal.addEventListener('close',()=>trigger.focus({preventScroll:true}));
    updateForm();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
