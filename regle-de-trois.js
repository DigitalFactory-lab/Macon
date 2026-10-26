'use strict';
function readRuleNumber(value){
 const text=value.trim().replace(/\s/g,'');
 return /^\d+(?:[.,]\d+)?$/.test(text)?Number(text.replace(',','.')):NaN;
}
const matchesRuleNumber=(value,expected)=>Number.isFinite(value)&&Math.abs(value-expected)<1e-9;
document.querySelectorAll('[data-calc]').forEach(area=>{
 const bank=area.querySelector('.token-bank'),slots=[...area.querySelectorAll('.calc-slot')];
 const input=area.querySelector('input'),feedback=area.querySelector('.calc-feedback');let selected=null;
 const next=document.querySelector('[data-calc="pour-dix"]');
 function lockNext(){if(area.dataset.calc==='pour-un'){next.hidden=true;next.querySelectorAll('.calc-slot').forEach(s=>s.replaceChildren());next.querySelector('input').value='';next.querySelector('.calc-feedback').textContent='';}}
 function clearFeedback(){feedback.textContent='';feedback.classList.remove('success');input.removeAttribute('aria-invalid');lockNext();}
 function select(token){selected=token;area.querySelectorAll('.calc-token').forEach(t=>{t.classList.toggle('selected',t===token);t.setAttribute('aria-pressed',String(t===token));});}
 function move(token,destination){
  if(!token||!area.contains(token))return;
  const sourceId=token.dataset.source||token.id;
  let placed=slots.map(s=>s.firstElementChild).find(t=>t?.dataset.source===sourceId);
  if(!placed){placed=token.cloneNode(true);placed.dataset.source=sourceId;placed.id=sourceId+'-placed';}
  destination.replaceChildren(placed);select(null);clearFeedback();
 }
 function place(slot){if(selected)move(selected,slot);else if(slot.firstElementChild)select(slot.firstElementChild);else feedback.textContent='Choisis d’abord un nombre ou un signe, puis cette case.';}
 area.addEventListener('click',event=>{const token=event.target.closest('.calc-token');if(token){event.stopPropagation();select(selected===token?null:token);}});
 area.addEventListener('dragstart',event=>{const token=event.target.closest('.calc-token');if(token){select(token);event.dataTransfer.setData('text/plain',token.id);event.dataTransfer.effectAllowed='move';}});
 area.addEventListener('dragend',()=>slots.forEach(slot=>slot.classList.remove('drag-over')));
 slots.forEach(slot=>{
  slot.addEventListener('click',event=>{if(!event.target.closest('.calc-token'))place(slot);});
  slot.addEventListener('keydown',event=>{if(event.target===slot&&['Enter',' '].includes(event.key)){event.preventDefault();place(slot);}});
  slot.addEventListener('dragover',event=>{event.preventDefault();slot.classList.add('drag-over');});
  slot.addEventListener('dragleave',()=>slot.classList.remove('drag-over'));
  slot.addEventListener('drop',event=>{event.preventDefault();slot.classList.remove('drag-over');move(document.getElementById(event.dataTransfer.getData('text/plain')),slot);});
 });
 bank.addEventListener('dragover',event=>event.preventDefault());
 bank.addEventListener('drop',event=>{event.preventDefault();const token=document.getElementById(event.dataTransfer.getData('text/plain'));if(token&&area.contains(token)&&token.dataset.source){token.remove();select(null);clearFeedback();}});
 area.querySelector('[data-reset-calc]').addEventListener('click',()=>{slots.forEach(s=>s.replaceChildren());select(null);input.value='';clearFeedback();});
 input.addEventListener('input',clearFeedback);
 area.querySelector('[data-check-calc]').addEventListener('click',()=>{
  const values=slots.map(slot=>slot.firstElementChild?.dataset.value??'');
  if(values.some(v=>!v)){feedback.textContent='Place tous les éléments du calcul dans les cases.';return;}
  if(!area.dataset.orders.split(';').includes(values.join('|'))){feedback.textContent=area.dataset.calc==='pour-un'?'Tu cherches la quantité pour une seule unité de surface. Comment répartir les blocs entre les m² connus ?':area.dataset.calc==='pour-dix'?'Tu connais la quantité pour 1 m². Quelle opération permet de passer à 10 m² ?':'Repère les deux nombres à multiplier en diagonale, puis le nombre par lequel diviser.';return;}
  const value=readRuleNumber(input.value);
  if(!Number.isFinite(value)){feedback.textContent='Le calcul est bien placé. Écris maintenant ton résultat.';input.setAttribute('aria-invalid','true');return;}
  const ok=matchesRuleNumber(value,Number(area.dataset.expected));input.setAttribute('aria-invalid',String(!ok));feedback.classList.toggle('success',ok);
  feedback.textContent=ok?(area.dataset.calc==='pour-un'?'Oui : on partage les 50 blocs entre les 4 m² pour trouver la quantité pour 1 m². Utilise maintenant ton résultat pour 10 m².':'Le calcul et le résultat sont justes. Explique avec tes mots ce que représente ce nombre.'):'L’ordre du calcul est juste. Recalcule le résultat ; tu peux utiliser une calculatrice.';
  if(ok&&area.dataset.calc==='pour-un'){
   const token=next.querySelector('[data-from-first]');token.dataset.value=String(value).replace('.',',');token.textContent=token.dataset.value;next.hidden=false;
  }
 });
});
document.querySelectorAll('.exercise-form').forEach(form=>{
 const inputs=[...form.querySelectorAll('input[data-answer]')],summary=form.querySelector('.exercise-feedback');
 inputs.forEach(input=>input.addEventListener('input',()=>{input.removeAttribute('aria-invalid');input.nextElementSibling.textContent='';summary.textContent='';}));
 form.addEventListener('submit',event=>{
  event.preventDefault();let correct=0;
  inputs.forEach(input=>{
   const value=readRuleNumber(input.value),ok=matchesRuleNumber(value,Number(input.dataset.answer));
   input.setAttribute('aria-invalid',String(!ok));const feedback=input.nextElementSibling;feedback.classList.toggle('success',ok);
   feedback.textContent=ok?'Résultat juste.':!input.value.trim()?'Écris ton résultat ici.':'À revoir : '+input.dataset.hint+'.';if(ok)correct++;
  });
  summary.classList.toggle('success',correct===inputs.length);
  summary.textContent=correct===inputs.length?'Tous les résultats sont justes. Explique ton raisonnement au formateur.':`${correct} résultat${correct>1?'s':''} juste${correct>1?'s':''} sur ${inputs.length}. Relis les indications, puis réessaie.`;
  if(Number(form.dataset.exercise)>=6&&correct===1)summary.textContent=inputs[0].dataset.hint+' Relis ton explication avec le formateur.';
 });
});

// Masquage pédagogique côté navigateur, sans authentification sécurisée.
(()=>{
 const dialog=document.getElementById('trainer-dialog');if(!dialog)return;
 const form=document.getElementById('trainer-access-form'),code=document.getElementById('trainer-code'),error=document.getElementById('trainer-error');
 const content=document.querySelector('.trainer-content'),key='declic-trainer-rule';
 let unlocked=false;try{unlocked=sessionStorage.getItem(key)==='open';}catch{}
 function open(){code.value='';error.textContent='';code.removeAttribute('aria-invalid');dialog.showModal();code.focus();}
 function close(){dialog.close();if(content)location.href='regle-de-trois-sur-chantier.html';}
 document.querySelector('[data-open-trainer]')?.addEventListener('click',open);
 document.querySelector('[data-close-trainer]')?.addEventListener('click',close);
 dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
 code.addEventListener('input',()=>{error.textContent='';code.removeAttribute('aria-invalid');});
 form.addEventListener('submit',event=>{
  event.preventDefault();if(code.value.trim()!=='3600'){error.textContent='Code incorrect. Réessaie.';code.setAttribute('aria-invalid','true');code.focus();return;}
  if(content){content.hidden=false;dialog.close();content.querySelector('h1').setAttribute('tabindex','-1');content.querySelector('h1').focus();}
  else{try{sessionStorage.setItem(key,'open');}catch{}location.href='regle-de-trois-corrige-formateur.html';}
 });
 document.querySelector('[data-lock-trainer]')?.addEventListener('click',()=>{try{sessionStorage.removeItem(key);}catch{}location.href='regle-de-trois-sur-chantier.html';});
 if(content){if(unlocked)content.hidden=false;else open();}
})();
