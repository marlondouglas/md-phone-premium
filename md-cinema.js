/* MD PHONE cinema playback: original, silent product montage. */
(()=>{'use strict';
 function init(){
  const video=document.getElementById('mdCinemaVideo');
  const frame=document.getElementById('mdCinemaFrame');
  if(!video||!frame)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const fallback=()=>frame.classList.remove('is-playing');
  const refresh=()=>{
    if(reduced.matches){video.pause();fallback();return;}
    const task=video.play();
    if(task&&typeof task.catch==='function')task.catch(fallback);
  };
  video.addEventListener('playing',()=>{if(!reduced.matches)frame.classList.add('is-playing')});
  video.addEventListener('error',fallback);
  video.addEventListener('stalled',()=>{if(video.readyState<2)fallback()});
  if(reduced.addEventListener)reduced.addEventListener('change',refresh);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)video.pause();
    else refresh();
  });
  refresh();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
 else init();
})();


/* MD PHONE automatic hero rotation — no user-facing play or pause controls. */
(() => {
  'use strict';
  function initHeroRotation(){
    const hero=document.querySelector('.hero-frame');
    if(!hero)return;
    const slides=Array.from(hero.querySelectorAll('.hero-iphone.hero-auto-slide'));
    if(slides.length<2)return;
    slides.forEach(img=>{img.loading='eager';});
    let active=0;
    slides[active].classList.add('is-current');
    hero.classList.add('md-auto-ready');
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    window.setInterval(()=>{
      if(document.hidden||reduced.matches)return;
      for(let offset=1;offset<slides.length;offset++){
        const index=(active+offset)%slides.length;
        const image=slides[index];
        if(!image.complete||image.naturalWidth===0)continue;
        image.classList.add('is-current');
        slides[active].classList.remove('is-current');
        active=index;
        break;
      }
    },7000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initHeroRotation);
  else initHeroRotation();
})();
