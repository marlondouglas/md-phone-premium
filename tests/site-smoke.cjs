'use strict';
/* MD Phone / verificação automática de publicação, sem bibliotecas externas. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root,name),'utf8');
const html = read('index.html');
const app = read('app.js');
const assistants = read('md-concierge.js');
const stock = JSON.parse(read('estoque.json'));
const expectedFiles = [
 'styles.css','premium-effects.css','md-atelier.css','md-editorial.css',
 'md-product-photo.css','md-signature.css','md-storefront.css',
 'md-cinematic.css','md-retail.css','app.js','md-concierge.js',
 'md-order.js','md-cinema.js','premium-effects.js','md-atelier.js',
 'assets/md-assistant-avatar.svg','assets/md-assistant-live.mp4',
 'assets/mdphone-cinematic.mp4','assets/md-phone-brand-mark.svg',
 'estoque.json'
];
for (const filename of expectedFiles) {
 assert(fs.existsSync(path.join(root, filename)), 'Arquivo ausente: '+filename);
}
const ids=[...html.matchAll(/\bid=\"([^\"]+)\"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs repetidos no HTML');
for (const required of ['assistantTrigger','assistantModal','assistantOtherModel',
 'assistantIntent','assistantStage','assistantTradeFields','assistantWhatsApp',
 'headerAssistant','mobileAssistantLink','orderForm','orderName',
 'orderPhone','orderAddress','orderConsent','products']){
 assert(ids.includes(required),'Controle ausente: '+required);
}
assert(html.includes('assets/md-assistant-live.mp4'), 'Vídeo do mascote não utilizado');
assert(html.includes('md-retail.css'), 'CSS premium não vinculado');
assert(html.includes('md-concierge.js'), 'Assistente não vinculado');
assert(html.includes('12 meses para lacrados') && html.includes('3 meses para seminovos'), 'Garantias não indicadas');
assert(html.includes('Enviamos para todo o Brasil'), 'Entrega nacional não indicada');
assert(!html.includes('Xiaomi'), 'Catálogo contém marca incompatível com o escopo');
assert(assistants.includes('buildMessage()'), 'Mensagem de WhatsApp não construída');
assert(assistants.includes('assistantTradeBattery'), 'Troca sem bateria');
const idsInApp = [...app.matchAll(/\{id:'([^']+)',model:/g)].map(m=>m[1]);
assert(idsInApp.length>5, 'Estoque inicial inesperadamente vazio');
for (const id of idsInApp) assert(id in stock, 'ID sem disponibilidade: '+id);
for (const [id,status] of Object.entries(stock)) {
 assert(['disponivel','esgotado','sob_consulta'].includes(status), 'Estado inválido: '+id);
}
console.log('MD Phone: OK ('+expectedFiles.length+' arquivos, '+ids.length+' IDs únicos, '+idsInApp.length+' variantes de estoque).');
