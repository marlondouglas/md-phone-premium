'use strict';
/* Assistente MD: escolha guiada, sem IA simulada, sem envio automático.
   Não armazena informações; somente abre o WhatsApp com texto preenchido. */
(function(){
  const number='5533987044866';
  const $=id=>document.getElementById(id);
  function buildMessage(){
    const model=$('assistantModel').value.trim();
    const budget=$('assistantBudget').value.trim();
    const condition=$('assistantCondition').value.trim();
    const notes=$('assistantNotes').value.trim().slice(0,240);
    const parts=[
      'Olá, MD PHONE! Vim pelo assistente do site e gostaria de atendimento.',
      'Modelo: '+model+'.',
      'Faixa de valor: '+budget+'.',
      'Condição: '+condition+'.'
    ];
    if(notes)parts.push('Preferências: '+notes+'.');
    parts.push('Vocês podem confirmar modelos disponíveis, cor, armazenamento, bateria, peças, preço e enviar fotos atuais da unidade?');
    return parts.join('\n');
  }
  function updateLink(){
    const a=$('assistantWhatsApp');
    a.href='https://wa.me/'+number+'?text='+encodeURIComponent(buildMessage());
    a.setAttribute('aria-label','Abrir WhatsApp da MD PHONE com consulta do '+$('assistantModel').value);
  }
  function init(){
    const modal=$('assistantModal'),trigger=$('assistantTrigger');
    if(!modal||!trigger)return;
    const close=$('assistantClose'),form=$('assistantForm');
    trigger.addEventListener('click',()=>{
      updateLink();
      if(!modal.open)modal.showModal();
      $('assistantModel').focus();
    });
    close.addEventListener('click',()=>modal.close());
    form.addEventListener('submit',e=>e.preventDefault());
    form.addEventListener('input',updateLink);
    form.addEventListener('change',updateLink);
    modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
    modal.addEventListener('close',()=>trigger.focus({preventScroll:true}));
    updateLink();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
