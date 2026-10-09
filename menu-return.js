'use strict';
document.addEventListener('click',event=>{
  const link=event.target.closest('[data-return-menu]');
  if(!link||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const menu=document.getElementById('atelier-menu');
  if(!menu)return; // Les pages annexes utilisent le lien natif vers l’accueil.
  event.preventDefault();
  const modal=link.closest('dialog');
  if(modal?.open)modal.close();
  requestAnimationFrame(()=>{
    const selected=menu.querySelector('[role="tab"][aria-selected="true"]');
    selected?.focus({preventScroll:true});
    menu.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
});
