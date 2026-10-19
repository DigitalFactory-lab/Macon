'use strict';
// L’annexe s’ouvre dans un nouvel onglet pour conserver la séance en cours.
const intrusShortcut=document.createElement('a');
intrusShortcut.className='intrus-shortcut';
intrusShortcut.href='intrus.html';
intrusShortcut.target='_blank';
intrusShortcut.rel='noopener';
intrusShortcut.textContent='Jeu · Cherche l’intrus ↗';
intrusShortcut.setAttribute('aria-label','Ouvrir le jeu Cherche l’intrus dans un nouvel onglet');
document.body.append(intrusShortcut);
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
