'use strict';
const guideTabs=[...document.querySelectorAll('[role="tab"][aria-controls^="guide-panel-"]')];
function activateGuideTab(tab,{focus=false}={}){
  guideTabs.forEach(item=>{
    const active=item===tab;
    item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;
    document.getElementById(item.getAttribute('aria-controls')).hidden=!active;
  });
  if(focus)tab.focus();
  const publish=tab.id==='guide-tab-publish';
  document.getElementById('print-guide').textContent=publish?'Imprimer ces étapes ↗':'Imprimer la fiche ↗';
  history.replaceState(null,'',location.pathname+location.search+(publish?'#publier':''));
}
guideTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activateGuideTab(tab));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%guideTabs.length;
    else if(event.key==='ArrowLeft')next=(index+guideTabs.length-1)%guideTabs.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=guideTabs.length-1;
    else return;
    event.preventDefault();activateGuideTab(guideTabs[next],{focus:true});
  });
});
if(location.hash==='#publier')activateGuideTab(guideTabs[1]);
document.getElementById('print-guide').addEventListener('click',()=>window.print());
