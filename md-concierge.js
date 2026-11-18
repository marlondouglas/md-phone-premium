'use strict';
/* Assistente MD: pré-qualificação de atendimento com consentimento do cliente.
   O link pré-preenche a mensagem, mas o WhatsApp exige confirmação do envio. */
(function(){
  const number='5533987044866';
  const $=id=>document.getElementById(id);
  let lastOpener=null;
  function value(id){return $(id)?.value.trim()||'';}
  function selectedModel(){
    const chosen=value('assistantModel');
    if(chosen==='Outro modelo') return value('assistantOtherModel')||'Outro modelo (não informado)';
    return chosen;
  }
  function buildMessage(){
    const parts=[
      'Olá, MD PHONE! Vim pelo Assistente MD do site.',
      'Interesse: '+value('assistantTiming')+'.',
      'Modalidade: '+value('assistantPurchase')+'.',
      'Modelo desejado: '+selectedModel()+'.',
      'Orçamento: '+value('assistantBudget')+'.',
      'Condição preferida: '+value('assistantCondition')+'.'
    ];
    const notes=value('assistantNotes').slice(0,360);
    if(notes)parts.push((value('assistantPurchase')==='Tenho aparelho na troca'?'Informações do aparelho na troca e preferências: ':'Detalhes e preferências: ')+notes+'.');
    if(value('assistantPurchase')==='Tenho aparelho na troca'){
      parts.push('Gostaria de uma avaliação do meu aparelho na troca e de conhecer as opções.');
    }else{
      parts.push('Gostaria de confirmar as opções disponíveis, preço e fotos reais do aparelho.');
    }
    return parts.join('\n');
  }
  function updateLink(){
    const a=$('assistantWhatsApp'),isOther=value('assistantModel')==='Outro modelo';
    const wrap=$('assistantOtherWrap'),input=$('assistantOtherModel');
    if(wrap)wrap.hidden=!isOther;
    if(input)input.required=isOther;
    if(!a)return;
    a.href='https://wa.me/'+number+'?text='+encodeURIComponent(buildMessage());
    a.setAttribute('aria-label','Abrir WhatsApp da MD PHONE com pedido de '+selectedModel());
  }
  function init(){
    const modal=$('assistantModal'),trigger=$('assistantTrigger');
    if(!modal||!trigger)return;
    const form=$('assistantForm');
    const openFrom=(opener)=>{
      lastOpener=opener;
      updateLink();
      if(!modal.open)modal.showModal();
      $('assistantModel')?.focus({preventScroll:true});
    };
    trigger.addEventListener('click',()=>openFrom(trigger));
    $('headerAssistant')?.addEventListener('click',()=>openFrom($('headerAssistant')));
    $('mobileAssistantLink')?.addEventListener('click',e=>{e.preventDefault();openFrom($('mobileAssistantLink'));});
    $('assistantClose')?.addEventListener('click',()=>modal.close());
    form.addEventListener('submit',e=>e.preventDefault());
    form.addEventListener('input',updateLink);
    form.addEventListener('change',updateLink);
    $('assistantWhatsApp')?.addEventListener('click',e=>{
      if(value('assistantModel')==='Outro modelo'&&!value('assistantOtherModel')){
        e.preventDefault();$('assistantOtherModel')?.focus();return;
      }
      updateLink();
    });
    modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
    modal.addEventListener('close',()=>lastOpener?.focus({preventScroll:true}));
    updateLink();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
