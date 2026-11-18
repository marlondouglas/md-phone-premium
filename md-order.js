'use strict';
/* MD PHONE: formulário de solicitação de disponibilidade / orçamento.
 * O catálogo não processa pagamento nem confirma venda.
 * Dados permanecem no navegador; a página apenas prepara mensagem WhatsApp.
 * Para envio sem interação do cliente, é necessária API Business autenticada.
 */
(function(){
  const number='5533987044866';
  const $=id=>document.getElementById(id);
  let currentProduct=null;
  let automaticReady=false;
  let widgetId=null;
  let captchaSiteKey=null;
  function getOptions(){
    const inventory=(typeof MD!=='undefined'&&Array.isArray(MD.inventory))?MD.inventory:[];
    const appleAccessories=[
      {id:'airpods-pro',model:'AirPods Pro'},
      {id:'airpods-max',model:'AirPods Max'},
      {id:'watch-s9',model:'Apple Watch Series 9'},
      {id:'watch-ultra',model:'Apple Watch Ultra'},
      {id:'iphone-accessories',model:'Acessórios para iPhone'}
    ];
    return [...inventory,...appleAccessories];
  }
  function findProduct(id){return getOptions().find(x=>x.id===id);}
  function clean(input,max=160){return String(input||'').trim().replace(/[\r\n\t]+/g,' ').slice(0,max);}
  function buildMessage(){
    const name=clean($('orderName').value,90);
    const phone=clean($('orderPhone').value,25);
    const item=findProduct($('orderProduct').value);
    const qty=Number($('orderQty').value)||1;
    const details=[];
    if(item){
      details.push('Produto: '+item.model);
      if(item.capacity)details.push('Memória: '+item.capacity);
      if(item.color)details.push('Cor: '+item.color);
      if(item.type)details.push('Condição informada: '+(item.type==='lacrado'?'Lacrado':'Seminovo'));
      if(item.battery!==null&&item.battery!==undefined)details.push('Bateria informada: '+item.battery+'%');
      if(Array.isArray(item.repairs)&&item.repairs.length)details.push('Histórico informado: '+item.repairs.join(', '));
    } else {details.push('Produto: a definir');}
    details.push('Quantidade solicitada: '+qty);
    const city=clean($('orderCity').value,100),address=clean($('orderAddress').value,180),postal=clean($('orderPostal').value,12);
    const note=clean($('orderNotes').value,260);
    const result=[
      'Olá, MD PHONE! Fiz uma solicitação pelo site.',
      'Nome: '+name,
      'WhatsApp para retorno: '+phone,
      '',
      ...details,
      '',
      'Preço e disponibilidade: AGUARDANDO CONFIRMAÇÃO DA LOJA.'
    ];
    if(city||address||postal){
      result.push('','Dados para consulta de entrega:');
      if(address)result.push('Endereço: '+address);
      if(city)result.push('Cidade/UF: '+city);
      if(postal)result.push('CEP: '+postal);
    }
    if(note)result.push('','Observações: '+note);
    result.push('','Podem confirmar o valor, a disponibilidade e as condições da unidade antes de finalizar o pedido?');
    return result.join('\n');
  }
  function updateLink(){
    const link=$('orderWhatsapp');
    if(!link)return;
    link.href='https://wa.me/'+number+'?text='+encodeURIComponent(buildMessage());
  }
  async function checkAutomatic(){
    if(location.hostname!=='mdphone-gv-premium.netlify.app')return false;
    try{
      const reply=await fetch('/.netlify/functions/order-notify',{signal:AbortSignal.timeout(6000)});
      if(!reply.ok)return false;
      const data=await reply.json();
      automaticReady=data.enabled===true;
      captchaSiteKey=automaticReady?data.siteKey:null;
      if(automaticReady&&captchaSiteKey)await setupTurnstile(captchaSiteKey);
      return automaticReady;
    }catch{return false;}
  }
  function setupTurnstile(key){
    return new Promise(resolve=>{
      const host=$('orderCaptcha');if(!host){resolve(false);return;}
      host.hidden=false;
      const draw=()=>{try{
        if(!window.turnstile){resolve(false);return;}
        if(widgetId===null)widgetId=window.turnstile.render(host,{sitekey:key,theme:'dark'});
        resolve(true);
      }catch{resolve(false);}};
      if(window.turnstile){draw();return;}
      const script=document.createElement('script');
      script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async=true;script.defer=true;script.onload=draw;script.onerror=()=>resolve(false);
      document.head.appendChild(script);
    });
  }
  function payload(){
    const item=findProduct($('orderProduct').value);
    return {
      name:clean($('orderName').value,90),
      phone:clean($('orderPhone').value,25),
      product:item?.model||'Produto Apple sob consulta',
      quantity:Number($('orderQty').value)||1,
      color:item?.color||'',capacity:item?.capacity||'',
      condition:item?.type==='lacrado'?'Lacrado (informado)':'Seminovo / a confirmar',
      battery:item?.battery===null?'A confirmar':item?.battery!==undefined?String(item.battery)+'%':'',
      repairs:Array.isArray(item?.repairs)?item.repairs.join(', '):'',
      city:clean($('orderCity').value,100),address:clean($('orderAddress').value,180),
      postal:clean($('orderPostal').value,12),notes:clean($('orderNotes').value,260),
      consent:$('orderConsent').checked,
      captchaToken:window.turnstile&&widgetId!==null?window.turnstile.getResponse(widgetId):'',
      website:$('orderWebsite')?.value||''
    };
  }
  function whatsappFallback(message){
    updateLink();
    $('orderStatus').textContent=message||'WhatsApp aberto. Revise e toque em Enviar para encaminhar à loja.';
    $('orderWhatsapp').click();
  }
  async function submitAutomatic(){
    if(!automaticReady){whatsappFallback();return;}
    const data=payload(),button=$('orderSubmit');
    if(!data.captchaToken){
      $('orderStatus').textContent='Confirme a verificação de segurança para enviar o pedido.';
      return;
    }
    button.disabled=true;button.textContent='Enviando solicitação...';
    try{
      const response=await fetch('/.netlify/functions/order-notify',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data),signal:AbortSignal.timeout(19000)
      });
      const result=await response.json().catch(()=>({}));
      if(response.ok&&result.accepted===true){
        $('orderStatus').textContent='Solicitação aceita pelo serviço de mensagens da MD PHONE. Nossa equipe confirmará preço e disponibilidade pelo WhatsApp.';
        button.textContent='Solicitação recebida';button.disabled=true;
        return;
      }
      whatsappFallback('A notificação automática não foi confirmada. Abrimos o WhatsApp para você encaminhar a solicitação manualmente.');
    }catch{
      whatsappFallback('Não foi possível confirmar o recebimento automático. Encaminhe a mensagem pelo WhatsApp.');
    }finally{
      if(!button.textContent.includes('recebida')){button.disabled=false;button.textContent='Enviar solicitação ↗';}
      if(window.turnstile&&widgetId!==null)window.turnstile.reset(widgetId);
    }
  }
  function openOrder(id){
    const modal=$('orderModal');
    if(!modal)return;
    const options=getOptions();
    $('orderProduct').innerHTML=options.map(p=>'<option value="'+p.id+'">'+p.model.replace(/&/g,'&amp;').replace(/</g,'&lt;')+(p.color?' · '+p.color:'')+(p.capacity?' · '+p.capacity:'')+'</option>').join('');
    const item=findProduct(id);
    if(item)$('orderProduct').value=item.id;
    currentProduct=item||null;
    $('orderContext').textContent=item?'Consultar '+item.model+(item.color?' · '+item.color:''):'Solicitar atendimento Apple';
    updateLink();
    const productModal=$('productModal');
    if(productModal?.open)productModal.close();
    if(!modal.open)modal.showModal();
    $('orderName').focus();
    if(!automaticReady)checkAutomatic().then(ready=>{if(ready)$('orderStatus').textContent='Envio automático disponível mediante confirmação da segurança. A loja responderá com preço e disponibilidade.';});
  }
  function init(){
    const modal=$('orderModal'),form=$('orderForm');
    if(!modal||!form)return;
    const trigger=$('orderWhatsapp');
    document.addEventListener('click',e=>{
      const btn=e.target.closest('[data-order]');
      if(btn){e.preventDefault();openOrder(btn.dataset.order);return;}
    });
    $('orderClose').addEventListener('click',()=>modal.close());
    modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
    form.addEventListener('input',updateLink);
    form.addEventListener('change',updateLink);
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!form.reportValidity())return;
      updateLink();
      submitAutomatic();
    });
    $('orderWhatsapp').addEventListener('click',e=>{
      if(!form.reportValidity()){e.preventDefault();return;}
      updateLink();
      $('orderStatus').textContent='Confira a mensagem no WhatsApp e toque em Enviar.';
    });
    window.MD_ORDER_OPEN=openOrder;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
