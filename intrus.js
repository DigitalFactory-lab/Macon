'use strict';
(() => {
  const cases = window.IntrusCases, $ = id => document.getElementById(id);
  const clamp = n => Math.max(0, Math.min(100, n));
  const states = cases.map(() => ({marks:[], history:[], done:false}));
  let current = 0, uid = 0, loaded = false, drag = null, suppressClick = false, audioContext;
  const state = () => states[current];
  const stage = $('photo-stage'), marks = $('intrus-marks'), photo = $('intrus-photo');
  const snapshot = () => {state().history.push(state().marks.map(m => ({...m})));if(state().history.length > 100)state().history.shift();};
  const available = () => loaded && !state().done;
  const tell = message => {$('intrus-status').textContent = message;};

  function controls() {
    const s = state(), count = s.marks.length;
    $('mark-count').textContent = `${count} croix placée${count > 1 ? 's' : ''}`;
    $('add-mark').disabled = !available();
    $('undo-mark').disabled = !available() || !s.history.length;
    $('clear-marks').disabled = !loaded || (!count && !s.done);
    $('intrus-buzzer').disabled = !available() || !count;
    $('resume-game').hidden = !s.done;
    $('intrus-correction').hidden = !s.done;
    stage.setAttribute('aria-disabled', String(!available()));
    marks.querySelectorAll('button').forEach(b => {b.disabled = !available();});
  }
  function draw(focusId) {
    marks.replaceChildren(...state().marks.map((mark, i) => {
      const b = document.createElement('button'); b.type = 'button';b.className = 'intrus-mark';b.textContent = '×';b.dataset.markId = mark.id;
      b.style.left = mark.x + '%';b.style.top = mark.y + '%';
      b.setAttribute('aria-label', `Croix ${i + 1}. Flèches pour déplacer, Suppr pour retirer.`);return b;
    }));
    controls();
    if(focusId !== undefined)marks.querySelector(`[data-mark-id="${focusId}"]`)?.focus({preventScroll:true});
  }
  function add(x, y) {
    if(!available())return;
    snapshot();const id = ++uid;state().marks.push({id,x:clamp(x),y:clamp(y)});draw(id);tell('Croix ajoutée. Ajuste sa position si nécessaire.');
  }
  function choose(index) {
    current = index;loaded = false;drag = null;
    $('intrus-correction').open = false;
    $('plan-zoom').value = '1';$('photo-zoom').value = '1';$('intrus-plan').style.width = '100%';stage.style.width = '100%';
    $('intrus-plan').src = cases[index].plan;$('plan-large').href = cases[index].plan;
    // Le corrigé n’est chargé que lorsque la recherche est terminée.
    $('intrus-result').removeAttribute('src');$('result-large').href = cases[index].result;
    document.querySelectorAll('[data-case]').forEach(b => b.setAttribute('aria-pressed',String(Number(b.dataset.case) === index)));
    stage.hidden = !cases[index].photo;$('photo-pending').hidden = !!cases[index].photo;
    photo.removeAttribute('src');
    if(cases[index].photo)photo.src = cases[index].photo;
    tell(state().done ? 'Recherche terminée. Expliquez vos choix au formateur.' : '');draw();
  }
  photo.addEventListener('load', () => {if(!cases[current].photo)return;loaded = true;draw();});
  photo.addEventListener('error', () => {loaded = false;tell('La photo ne se charge pas. Réessaie en choisissant cette maison.');controls();});
  document.querySelectorAll('[data-case]').forEach(b => b.addEventListener('click', () => choose(Number(b.dataset.case))));
  $('plan-zoom').addEventListener('change', e => {$('intrus-plan').style.width = Number(e.target.value) * 100 + '%';});
  $('photo-zoom').addEventListener('change', e => {stage.style.width = Number(e.target.value) * 100 + '%';});
  stage.addEventListener('click', e => {
    if(suppressClick){suppressClick = false;return;}
    if(e.target.closest('[data-mark-id]') || !available())return;
    const r = stage.getBoundingClientRect();if(!r.width || !r.height)return;
    add((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100);
  });
  $('add-mark').addEventListener('click', () => add(50,50));
  marks.addEventListener('pointerdown', e => {
    const b = e.target.closest('[data-mark-id]');if(!b || !available() || e.button !== 0)return;
    const mark = state().marks.find(m => m.id === Number(b.dataset.markId));
    drag = {b,mark,x:e.clientX,y:e.clientY,moved:false,pointerId:e.pointerId};b.setPointerCapture(e.pointerId);
  });
  marks.addEventListener('pointermove', e => {
    if(!drag || e.pointerId !== drag.pointerId)return;
    if(!drag.moved && Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<4)return;
    if(!drag.moved){snapshot();drag.moved=true;}
    const r=stage.getBoundingClientRect();if(!r.width || !r.height)return;
    drag.mark.x=clamp((e.clientX-r.left)/r.width*100);drag.mark.y=clamp((e.clientY-r.top)/r.height*100);
    drag.b.style.left=drag.mark.x+'%';drag.b.style.top=drag.mark.y+'%';e.preventDefault();
  });
  function endDrag(e) {
    if(!drag || drag.pointerId!==e.pointerId)return;
    const moved=drag.moved;drag=null;suppressClick=moved;
    if(moved){controls();tell('Croix déplacée.');}
    // Le clic qui suit un déplacement ne doit pas ajouter une nouvelle croix.
    setTimeout(()=>{suppressClick=false;},0);
  }
  marks.addEventListener('pointerup',endDrag);marks.addEventListener('pointercancel',endDrag);
  marks.addEventListener('keydown', e => {
    const b=e.target.closest('[data-mark-id]');if(!b || !available())return;
    const mark=state().marks.find(m=>m.id===Number(b.dataset.markId)),delta=e.shiftKey?5:1;
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Delete','Backspace'].includes(e.key))return;
    e.preventDefault();snapshot();
    if(e.key==='Delete'||e.key==='Backspace'){state().marks=state().marks.filter(m=>m!==mark);draw();$('add-mark').focus();tell('Croix retirée.');return;}
    if(e.key==='ArrowLeft')mark.x=clamp(mark.x-delta);if(e.key==='ArrowRight')mark.x=clamp(mark.x+delta);
    if(e.key==='ArrowUp')mark.y=clamp(mark.y-delta);if(e.key==='ArrowDown')mark.y=clamp(mark.y+delta);draw(mark.id);
  });
  $('undo-mark').addEventListener('click',()=>{if(!available()||!state().history.length)return;state().marks=state().history.pop();draw();tell('Dernière modification annulée.');});
  $('clear-marks').addEventListener('click',()=>{if(!loaded)return;if(!confirm('Effacer les croix de cette maison et recommencer ?'))return;state().marks=[];state().history=[];state().done=false;$('intrus-correction').open=false;draw();tell('Vous pouvez recommencer.');});
  $('resume-game').addEventListener('click',()=>{state().done=false;$('intrus-correction').open=false;draw();tell('La recherche reprend.');});
  async function buzz() {
    const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('Audio indisponible');
    audioContext ||= new Audio();await audioContext.resume();if(audioContext.state!=='running')throw Error('Audio bloqué');
    const start=audioContext.currentTime;
    [0,.26,.52].forEach((offset,i)=>{const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();oscillator.type='square';oscillator.frequency.value=i===2?660:440;gain.gain.setValueAtTime(0,start+offset);gain.gain.linearRampToValueAtTime(.065,start+offset+.015);gain.gain.exponentialRampToValueAtTime(.001,start+offset+.2);oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start(start+offset);oscillator.stop(start+offset+.22);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};});
  }
  $('intrus-buzzer').addEventListener('click',async()=>{
    if(!available()||!state().marks.length)return;
    const finishedCase=current;state().done=true;draw();tell('Terminé ! Appelez le formateur et expliquez vos différences.');
    try{await buzz();}catch{if(current===finishedCase&&state().done)tell('Terminé ! Le son est indisponible sur ce poste : signalez-le au formateur.');}
  });
  $('intrus-correction').addEventListener('toggle',()=>{if($('intrus-correction').open&&state().done)$('intrus-result').src=cases[current].result;});
  choose(0);
})();
