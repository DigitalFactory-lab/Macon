'use strict';
const sessions = {
  1: {kicker:'ENSUITE / MODÉLISER LA BRIQUE',title:'Du plan de la brique<br>au modèle numérique.',goal:'Lis un plan, suis les étapes et vérifie les dimensions de ton modèle.',steps:['Manipule la brique et repère les cotes utiles sur son plan.','Crée l’esquisse puis le volume dans Fusion, avec le formateur.','Compare les dimensions du modèle avec celles du plan.'],proof:'Retrouve une cote du plan dans ton modèle et explique comment tu l’as vérifiée.',resource:'plan'},
  2: {kicker:'DEMI-JOURNÉE 02 / COMPRENDRE & IMPRIMER',title:'Une forme.<br>Des couches. Un objet.',goal:'Observe, compare et explique les étapes entre le fichier et l’objet.',steps:['Termine la brique si nécessaire et vérifie ses dimensions.','Observe la vidéo d’une construction : repère le dépôt de matière et ce qui a été préparé.','Parcours les cinq repères visuels avec le formateur, puis prépare l’impression avec lui et observe la machine.'],proof:'Explique le chemin du modèle 3D à la pièce, et une différence avec la construction montrée dans la vidéo.',resource:'video'},
  3: {kicker:'DEMI-JOURNÉE 03 / ADAPTER & FABRIQUER',title:'Un tendeur.<br>Une réalisation à toi.',goal:'Utilise tes mesures, adapte la base préparée et explique tes vérifications.',steps:['Manipule le modèle et relève les dimensions utiles.','Modifie les éléments autorisés et ajoute ta personnalisation.','Fais vérifier ton fichier, utilise les remarques pour le corriger, puis prépare son impression.'],proof:'Explique une modification et montre comment tu vérifieras son effet.',resource:'tendeur'},
  4: {kicker:'DEMI-JOURNÉE 04 / COMPRENDRE, QUESTIONNER & ESSAYER',title:'Comprendre l’IA.<br>Garder l’esprit critique.',goal:'Explore les usages, les limites et les enjeux de l’IA. Mets ensuite ton esprit critique à l’épreuve en créant une appli.',steps:['Parcours l’atelier Genially avec le formateur : confronte tes idées et distingue les usages de l’IA.','Discute des risques, des données personnelles, de l’environnement et du rôle de l’humain.','De retour ici, choisis un besoin avec ton binôme, crée une petite appli et teste-la avec un résultat connu.'],proof:'Explique un usage utile, un risque à prendre en compte et une vérification réalisée dans ton appli.',resource:'app'},
  5: {kicker:'DEMI-JOURNÉE 05 / TESTER & EXPLIQUER',title:'Ça fonctionne ?<br>Montre comment tu le sais.',goal:'Teste, utilise les retours et explique les compétences que tu emportes pour la suite.',steps:['Contrôle ton tendeur et explique le résultat de l’essai.','Fais tester l’application par un autre binôme, reformule son retour et essaie une correction.','Présente une mesure, un choix et un contrôle que tu as réalisés.'],proof:'Appuie ta décision sur une mesure ou un essai et explique où tu réutiliserais cette démarche.',resource:'bilan'}
};

const sessionCompetencies={
  1:{items:[['Rigueur','Relève une cote avec son unité et retrouve-la dans le modèle.'],['Respect des consignes','Prépare les étapes, reformule la consigne et vérifie ce qui doit être validé avant de poursuivre.'],['Coopération et engagement','Réalise ta part du travail dans le temps convenu et échange les rôles avec ton binôme.']],transfer:'Avant d’exécuter une consigne, repère les informations nécessaires et fais préciser ce qui manque. Où pourrais-tu réutiliser cette méthode ?'},
  2:{items:[['Observation','Décris ce que tu vois dans la vidéo et sur les schémas avant d’en tirer une conclusion.'],['Anticipation et sécurité','Vérifie matière, position et durée ; respecte les consignes de sécurité et attends la validation du formateur avant le lancement.'],['Communication','Explique le passage du fichier à l’objet avec tes propres mots.']],transfer:'Avant de lancer une tâche, comprends la suite des étapes et les contraintes. Quelle vérification évite de découvrir trop tard un oubli ?'},
  3:{items:[['Précision','Note les dimensions utiles et contrôle leur report dans le fichier.'],['Autonomie','Prépare ton prochain geste et demande une aide ciblée si tu bloques.'],['Écoute et adaptation','Reformule la remarque reçue, essaie une correction et contrôle son effet.']],transfer:'Quand un résultat ne convient pas, localise l’écart avant de modifier. Comment pourrais-tu appliquer ce réflexe à une autre réalisation ?'},
  4:{items:[['Esprit critique','Questionne une affirmation, distingue ce que tu sais de ce que tu supposes et vérifie avant de conclure.'],['Responsabilité','Repère les données à protéger, discute des impacts de l’usage choisi et garde la responsabilité de tes décisions.'],['Communication et coopération','Écoute les points de vue, justifie ton choix et alterne les rôles avec ton binôme pour formuler et tester.']],transfer:'Avant d’utiliser l’IA au travail : à quoi sert-elle ici, quelles données lui confies-tu et comment vérifieras-tu sa réponse ?'},
  5:{items:[['Contrôle','Appuie ta décision sur une mesure, un critère ou un essai.'],['Écoute et retour constructif','Écoute le retour sans interrompre, demande un exemple précis et choisis une amélioration à tester.'],['Prise de recul','Nomme une difficulté, une remarque utile et un engagement que tu as tenu.']],transfer:'Pour transmettre ton travail, explique le résultat et la méthode. Donne un exemple de compétence exercée ici que tu veux emporter en formation ou dans ton métier.'}
};
const resourceTemplates={
  plan:`<div class="resource-caption"><span class="micro">LA BRIQUE / PLAN ET MODÈLE</span><span>01</span></div><div class="brick-visual"><div class="view-switch" role="group" aria-label="Comparer le plan et la brique"><button type="button" data-brick-view="plan" aria-pressed="true">Le plan</button><button type="button" data-brick-view="objet" aria-pressed="false">La brique</button></div><button class="brick-stage chapter-stage" type="button" data-image="assets/plan-brique.png" data-title="Plan coté de la brique" aria-label="Agrandir le plan coté de la brique"><span class="chapter-number" aria-hidden="true">01</span><img id="brick-image" class="plan-view" src="assets/plan-brique.png" width="1463" height="1038" alt="Plan coté de la brique avec vues et coupe"><span class="zoom-label">Agrandir le visuel <span aria-hidden="true">＋</span></span></button><p class="brick-observe">Passe d’une vue à l’autre : où retrouves-tu la même forme ? Quelles dimensions dois-tu contrôler ?</p></div><div class="resource-footer"><a href="assets/plan-brique.png" download="Plan-brique.png">Télécharger le plan de la brique</a></div>`,
  video:`<div class="resource-caption"><span class="micro">POINT DE DÉPART / CONSTRUCTION BÉTON</span><span>02</span></div><div class="construction-video"><video controls playsinline preload="metadata" aria-label="Reportage sur l’impression 3D béton"><source src="assets/impression-3d-beton.mp4" type="video/mp4">Ton navigateur ne peut pas lire la vidéo. <a href="assets/impression-3d-beton.mp4">Ouvrir le fichier vidéo</a></video></div><div class="video-observe"><p>Observe le dépôt de matière, la façon dont la forme apparaît et les différences avec notre imprimante.</p><a href="assets/impression-3d-beton.mp4" target="_blank" rel="noopener" class="text-link">Ouvrir la vidéo en grand <span aria-hidden="true">↗</span></a><p class="external-note">Vidéo incluse dans la version locale, pour une lecture hors connexion.</p></div><div class="resource-footer"><a href="#comprendre-3d" data-open-print-guide>Explorer les infographies 3D</a></div>`,
  tendeur:`<div class="resource-caption"><span class="micro">MODÈLE À OBSERVER</span><span>03</span></div><button class="resource-image chapter-stage" type="button" data-image="assets/tendeur-studio.webp" data-title="Modèle de tendeur" aria-label="Agrandir le visuel du tendeur"><span class="chapter-number" aria-hidden="true">03</span><img src="assets/tendeur-studio.webp" width="1536" height="1024" alt="Visuel de présentation du tendeur rouge sous deux angles, sur fond clair"><span class="zoom-label">Observer l’objet <span aria-hidden="true">＋</span></span></button><div class="resource-footer"><span>Visuel régénéré. Les mesures sont relevées sur l’objet avec le formateur.</span></div>`,
  app:`<div class="resource-caption"><span class="micro">L’IA / DEUX TEMPS POUR APPRENDRE</span><span>04</span></div><div class="app-example ia-discovery chapter-stage"><span class="chapter-number" aria-hidden="true">04</span><span class="micro">D’ABORD / COMPRENDRE ET QUESTIONNER</span><h4>Quel usage ?<br>Quels enjeux ?</h4><p>Mythes et réalités, données personnelles, risques et environnement : échange tes points de vue dans l’atelier existant.</p><a href="https://leforem.genially.com/6a82d169440c7d314e52e46f" target="_blank" rel="noopener noreferrer" class="button primary">Ouvrir l’atelier IA <span aria-hidden="true">↗</span></a><p class="external-note">Genially · nouvel onglet · connexion requise.<br>Reviens ici pour la mise en pratique.</p></div><div class="ia-practice"><span class="micro">ENSUITE / METTRE EN PRATIQUE</span><h4>Crée une appli.<br>Teste tes réflexes.</h4><p>Pars d’un besoin personnel ou professionnel. Formule, vérifie et améliore avec ton binôme.</p><a href="concevoir-appli.html" class="text-link">Ouvrir le guide de création <span aria-hidden="true">↗</span></a></div><div class="resource-footer trainer-resource" data-trainer-only hidden><a href="combien-de-blocs.html" target="_blank" rel="noopener">Exemple formateur · Combien de blocs ? ↗</a></div>`,
  bilan:`<div class="resource-caption"><span class="micro">TON BILAN</span><span>05</span></div><div class="resource-note chapter-stage bilan-note"><span class="chapter-number" aria-hidden="true">05</span><span class="micro">PRENDS UN MOMENT POUR Y PENSER</span><h4>Qu’est-ce que<br>tu emportes avec toi ?</h4><ul class="bilan-questions"><li>Ce que j’ai préféré…</li><li>Ce qui m’a posé une difficulté…</li><li>Ce que je sais mieux expliquer…</li><li>Une remarque qui m’a aidé à progresser…</li><li>Un engagement que j’ai tenu dans le groupe…</li><li>Ce que je réutiliserai dans mon métier…</li></ul></div>`
};
let currentSession=1;
let trainerMode=false;
const tabs=[...document.querySelectorAll('[data-session]')];
function selectSession(n,{scroll=false,focus=false}={}){
  const session=sessions[n];if(!session)return;currentSession=n;
  document.getElementById('session-details').open=false;
  document.getElementById('transfer-details').open=false;
  tabs.forEach(tab=>{const active=Number(tab.dataset.session)===n;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus({preventScroll:true});});
  document.getElementById('session-panel').setAttribute('aria-labelledby',`tab-${n}`);
  document.getElementById('session-icebreakers').hidden=n!==1;
  document.getElementById('comprendre-fusion').hidden=n!==1;
  document.getElementById('comprendre-3d').hidden=n!==2;
  window.PrintGuide.pause();
  const competencies=sessionCompetencies[n];
  document.getElementById('session-skills').replaceChildren(...competencies.items.map(([title,text])=>{const li=document.createElement('li');const details=document.createElement('details');details.className='skill-detail';const summary=document.createElement('summary');summary.textContent=title;const p=document.createElement('p');p.textContent=text;details.append(summary,p);li.append(details);return li;}));
  document.getElementById('session-transfer').textContent=competencies.transfer;
  document.getElementById('session-kicker').textContent=session.kicker;
  document.getElementById('session-title').innerHTML=session.title;
  document.getElementById('session-goal').textContent=session.goal;
  document.getElementById('session-steps').replaceChildren(...session.steps.map((step,i)=>{const li=document.createElement('li');const num=document.createElement('span');num.textContent=String(i+1).padStart(2,'0');li.append(num,document.createTextNode(step));return li;}));
  document.querySelector('#session-proof p>span').textContent=session.proof;
  document.getElementById('session-resource').innerHTML=resourceTemplates[session.resource];
  document.querySelectorAll('[data-trainer-only]').forEach(el=>el.hidden=!trainerMode);
  document.getElementById('next-session').textContent=n===5?'Revenir à la séance 01':`Voir la séance ${String(n+1).padStart(2,'0')}`;
  document.getElementById('session-quiz-label').textContent=`FIN DE DEMI-JOURNÉE ${String(n).padStart(2,'0')} / MINI-QUIZ`;
  const quizLink=document.getElementById('session-quiz-link');
  quizLink.href=`quiz.html?session=${n}`;
  quizLink.setAttribute('aria-label',`Ouvrir le quiz de la demi-journée ${String(n).padStart(2,'0')}`);
  const activeTab=tabs.find(tab=>Number(tab.dataset.session)===n);
  if(activeTab){const menu=activeTab.parentNode;if(menu.scrollWidth>menu.clientWidth){const left=activeTab.offsetLeft-(menu.clientWidth-activeTab.clientWidth)/2;menu.scrollTo({left,behavior:'instant'});}}
  if(scroll)document.getElementById('parcours').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
tabs.forEach(tab=>tab.addEventListener('click',()=>selectSession(Number(tab.dataset.session),{scroll:true})));
document.querySelector('.session-tabs').addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=currentSession%5+1;else if(event.key==='ArrowLeft')next=(currentSession+3)%5+1;else if(event.key==='Home')next=1;else if(event.key==='End')next=5;else return;event.preventDefault();selectSession(next,{focus:true,scroll:true});});
document.getElementById('next-session').addEventListener('click',()=>selectSession(currentSession%5+1,{scroll:true,focus:true}));
document.querySelectorAll('[data-start]').forEach(el=>el.addEventListener('click',()=>selectSession(1)));
document.querySelectorAll('[data-select-session]').forEach(el=>el.addEventListener('click',()=>selectSession(Number(el.dataset.selectSession),{scroll:true,focus:true})));
document.addEventListener('click',event=>{
  const view=event.target.closest('[data-brick-view]');
  if(view){
    const isPlan=view.dataset.brickView==='plan';
    document.querySelectorAll('[data-brick-view]').forEach(button=>button.setAttribute('aria-pressed',String(button===view)));
    const img=document.getElementById('brick-image'),trigger=img.closest('[data-image]');
    img.src=isPlan?'assets/plan-brique.png':'assets/briques.jpeg';
    img.alt=isPlan?'Plan coté de la brique avec vues et coupe':'Deux briques imprimées en 3D, assemblées par leurs côtés';
    img.width=isPlan?1463:1900;img.height=isPlan?1038:1267;
    img.classList.toggle('plan-view',isPlan);
    trigger.dataset.image=img.getAttribute('src');trigger.dataset.title=isPlan?'Plan coté de la brique':'Les briques imprimées et assemblées';
    trigger.setAttribute('aria-label',isPlan?'Agrandir le plan coté de la brique':'Agrandir la photo des briques imprimées');
    const animateView=()=>{
      if(!img.isConnected||img.getAttribute('src')!==(isPlan?'assets/plan-brique.png':'assets/briques.jpeg'))return;
      if(matchMedia('(prefers-reduced-motion: reduce)').matches||!img.animate)return;
      img.getAnimations?.().forEach(animation=>animation.cancel());
      img.animate([{opacity:0,transform:`translateY(16px) translateX(${isPlan?-14:14}px) scale(.97)`},{opacity:1,transform:'translateY(0) translateX(0) scale(1)'}],{duration:520,easing:'cubic-bezier(.2,.75,.25,1)'});
      const number=trigger.querySelector('.chapter-number');
      if(number?.animate)number.animate([{transform:'translateY(10px)',opacity:.4},{transform:'translateY(0)',opacity:1}],{duration:650,easing:'ease-out'});
    };
    if(img.decode)img.decode().then(animateView).catch(()=>{});else animateView();
  }
  const guide=event.target.closest('[data-open-print-guide]');
  if(guide){event.preventDefault();if(currentSession!==2)selectSession(2);document.getElementById('comprendre-3d').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.getElementById('print-tab-0').focus({preventScroll:true});}
});
const dialog=document.getElementById('image-dialog');let imageTrigger=null;
document.addEventListener('click',event=>{const button=event.target.closest('[data-image]');if(!button)return;imageTrigger=button;document.getElementById('dialog-image').src=button.dataset.image;document.getElementById('dialog-image').alt=button.dataset.title;document.getElementById('dialog-title').textContent=button.dataset.title;dialog.showModal();document.body.classList.add('modal-open');});
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(imageTrigger?.isConnected)imageTrigger.focus();});

// L’exemple se révèle uniquement à la demande du formateur, sans mémoriser ce mode.
const trainerToggle=document.getElementById('trainer-toggle');
const trainerPanel=document.getElementById('trainer-panel');
let trainerClicks=0, trainerLastClick=0;
function setTrainerMode(value){
  trainerMode=value;trainerPanel.hidden=!value;
  trainerToggle.setAttribute('aria-expanded',String(value));
  document.querySelectorAll('[data-trainer-only]').forEach(el=>el.hidden=!value);
  if(value){trainerPanel.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});trainerPanel.querySelector('a').focus({preventScroll:true});}
  else trainerToggle.focus({preventScroll:true});
}
trainerToggle.addEventListener('click',()=>{const now=Date.now();trainerClicks=now-trainerLastClick<1500?trainerClicks+1:1;trainerLastClick=now;if(trainerClicks===3){trainerClicks=0;setTrainerMode(!trainerMode);}});
document.getElementById('trainer-hide').addEventListener('click',()=>setTrainerMode(false));
document.addEventListener('keydown',event=>{if(event.altKey&&event.shiftKey&&event.key.toLowerCase()==='f'){event.preventDefault();setTrainerMode(!trainerMode);}});
const requestedSession=Number(new URLSearchParams(location.search).get('session'));
selectSession(location.hash==='#ia'?4:([1,2,3,4,5].includes(requestedSession)?requestedSession:1));
if(location.hash==='#ia') document.getElementById('parcours').scrollIntoView();
