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
