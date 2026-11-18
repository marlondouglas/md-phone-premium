/* MD PHONE / Native premium effects.
   Inspired by Magic UI spotlight and Motion scroll reveals; dependency-free. */
(() => {
 'use strict';
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 const fine = window.matchMedia('(hover:hover) and (pointer:fine)');
 function start() {
   const header = document.querySelector('.site-header');
   if (header) {
     const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
     update();
     window.addEventListener('scroll', update, {passive:true});
   }
   const hero = document.querySelector('.hero-frame');
   if (hero && fine.matches && !reduced.matches) {
     let pending = false, event;
     hero.addEventListener('pointermove', e => {
       event=e;
       if(pending)return;
       pending=true;
       requestAnimationFrame(()=>{
         const rect=hero.getBoundingClientRect();
         hero.style.setProperty('--md-x', ((event.clientX-rect.left)/rect.width*100).toFixed(1)+'%');
         hero.style.setProperty('--md-y', ((event.clientY-rect.top)/rect.height*100).toFixed(1)+'%');
         pending=false;
       });
     },{passive:true});
   }
   if (fine.matches && !reduced.matches) {
     document.querySelectorAll('.story-card').forEach(card=>{
       card.addEventListener('pointermove', e=>{
         const r=card.getBoundingClientRect();
         card.style.setProperty('--md-card-x',((e.clientX-r.left)/r.width*100)+'%');
         card.style.setProperty('--md-card-y',((e.clientY-r.top)/r.height*100)+'%');
       },{passive:true});
     });
   }
   /* Progressive enhancement: base site reveal observer retains control. */
   if ('IntersectionObserver' in window && !reduced.matches) {
     document.querySelectorAll('.reveal:not(.hero-content)').forEach((el,i)=>{
       if(el.classList.contains('show'))return;
       el.style.setProperty('--md-delay',String(Math.min(i%3,2)*65)+'ms');
       el.classList.add('md-observed');
     });
   }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);
 else start();
})();