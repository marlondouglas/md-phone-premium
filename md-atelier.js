/* MD PHONE — Atelier experience layer.
   Minimal, dependency-free behavior using UI/UX Pro Max accessibility guidance
   and Motion-inspired browser-native transitions. */
(() => {
 'use strict';
 function initAtelier(){
   const navLinks=[...document.querySelectorAll('.desktop-nav a[href^="#"]')];
   const ids=new Map(navLinks.map(link=>[link.getAttribute('href').slice(1),link]));
   const sections=[...ids.keys()].map(id=>document.getElementById(id)).filter(Boolean);
   let selected='';
   function mark(id){
     if(selected===id)return;
     selected=id;
     navLinks.forEach(link=>{
       const yes=link.getAttribute('href')==='#'+id;
       link.classList.toggle('nav-current',yes);
       if(yes)link.setAttribute('aria-current','location');
       else link.removeAttribute('aria-current');
     });
   }
   if('IntersectionObserver' in window&&sections.length){
     const observer=new IntersectionObserver(entries=>{
       for(const entry of entries){
         if(entry.isIntersecting)mark(entry.target.id);
       }
     },{rootMargin:'-18% 0px -67% 0px',threshold:0});
     sections.forEach(section=>observer.observe(section));
   }
   const mobile=document.getElementById('mobileNav');
   const trigger=document.getElementById('mobileTrigger');
   if(mobile&&trigger){
     document.addEventListener('keydown',event=>{
       if(event.key==='Escape'&&mobile.classList.contains('open')){
         mobile.classList.remove('open');
         trigger.setAttribute('aria-expanded','false');
         trigger.focus();
       }
     });
     document.addEventListener('pointerdown',event=>{
       if(!mobile.classList.contains('open'))return;
       if(!mobile.contains(event.target)&&!trigger.contains(event.target)){
         mobile.classList.remove('open');
         trigger.setAttribute('aria-expanded','false');
       }
     });
   }
   document.addEventListener('click',event=>{
     const tab=event.target.closest('[data-gen]');
     if(!tab)return;
     const generation=tab.getAttribute('data-gen');
     // app.js rebuilds the tab strip; restore keyboard focus without jumping.
     requestAnimationFrame(()=>{
       const next=document.querySelector('#generationTabs [data-gen="'+generation+'"]');
       if(next&&event.detail===0)next.focus({preventScroll:true});
     });
   },{passive:true});
   // No forced animation: the browser and user motion preferences control effects.
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initAtelier);
 else initAtelier();
})();