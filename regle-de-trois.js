'use strict';
function readRuleNumber(value){
 const text=value.trim().replace(/\s/g,'');
 return /^\d+(?:[.,]\d+)?$/.test(text)?Number(text.replace(',','.')):NaN;
}
const matchesRuleNumber=(value,expected)=>Number.isFinite(value)&&Math.abs(value-expected)<1e-9;
document.querySelectorAll('[data-calc]').forEach(area=>{
 const bank=area.querySelector('.token-bank'),tokens=[...area.querySelectorAll('.calc-token')],slots=[...area.querySelectorAll('.calc-slot')];
 const input=area.querySelector('input'),feedback=area.querySelector('.calc-feedback');let selected=null;
 function clearFeedback(){feedback.textContent='';feedback.classList.remove('success');input.removeAttribute('aria-invalid');}
 function select(token){selected=token;tokens.forEach(t=>{t.classList.toggle('selected',t===token);t.setAttribute('aria-pressed',String(t===token));});}
 function move(token,destination){
  if(!tokens.includes(token))return;
  const previous=destination.querySelector('.calc-token');if(previous&&previous!==token)bank.append(previous);
  destination.append(token);select(null);clearFeedback();
 }
 function place(slot){if(selected)move(selected,slot);else if(slot.firstElementChild)select(slot.firstElementChild);else{feedback.textContent='Choisis d’abord un nombre ou un signe, puis cette case.';}}
 tokens.forEach(token=>{
  token.addEventListener('click',event=>{event.stopPropagation();select(selected===token?null:token);});
  token.addEventListener('dragstart',event=>{select(token);event.dataTransfer.setData('text/plain',token.id);event.dataTransfer.effectAllowed='move';});
  token.addEventListener('dragend',()=>slots.forEach(slot=>slot.classList.remove('drag-over')));
 });
 slots.forEach(slot=>{
  slot.addEventListener('click',()=>place(slot));
  slot.addEventListener('keydown',event=>{if(event.target===slot&&['Enter',' '].includes(event.key)){event.preventDefault();place(slot);}});
  slot.addEventListener('dragover',event=>{event.preventDefault();slot.classList.add('drag-over');});
  slot.addEventListener('dragleave',()=>slot.classList.remove('drag-over'));
  slot.addEventListener('drop',event=>{event.preventDefault();slot.classList.remove('drag-over');move(tokens.find(t=>t.id===event.dataTransfer.getData('text/plain')),slot);});
 });
 bank.addEventListener('dragover',event=>event.preventDefault());
 bank.addEventListener('drop',event=>{event.preventDefault();const token=tokens.find(t=>t.id===event.dataTransfer.getData('text/plain'));if(token){bank.append(token);select(null);clearFeedback();}});
 area.querySelector('[data-reset-calc]').addEventListener('click',()=>{tokens.forEach(t=>bank.append(t));select(null);input.value='';clearFeedback();});
 input.addEventListener('input',clearFeedback);
 area.querySelector('[data-check-calc]').addEventListener('click',()=>{
  const values=slots.map(slot=>slot.firstElementChild?.dataset.value??'');
  if(values.some(v=>!v)){feedback.textContent='Place tous les éléments du calcul dans les cases.';return;}
  if(!area.dataset.orders.split(';').includes(values.join('|'))){feedback.textContent=area.dataset.calc==='pour-un'?'Pour trouver pour 1 m², divise le nombre de blocs par la surface connue.':'Reprends l’ordre indiqué : commence par la multiplication, puis la division s’il y en a une.';return;}
  const value=readRuleNumber(input.value);
  if(!Number.isFinite(value)){feedback.textContent='Le calcul est bien placé. Écris maintenant un résultat (par exemple 12,5).';input.setAttribute('aria-invalid','true');return;}
  const ok=matchesRuleNumber(value,Number(area.dataset.expected));input.setAttribute('aria-invalid',String(!ok));feedback.classList.toggle('success',ok);
  feedback.textContent=ok?'Le calcul et le résultat sont justes. Explique avec tes mots ce que représente ce nombre.':'L’ordre du calcul est juste. Recalcule le résultat ; tu peux utiliser une calculatrice.';
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
