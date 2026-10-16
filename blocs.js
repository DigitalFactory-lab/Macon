
(function(){
"use strict";

/* Consommation de mortier (litres par m² de mur), joints de 12 mm.
   Source : fiche Roosens Bétons « Consommations de mortier » 2.09.01 (version du 01/01/2023). */
const MORTIER=[
  {id:"c9",  t:"Bloc creux",  ep:9,  l:16},
  {id:"c14", t:"Bloc creux",  ep:14, l:23},
  {id:"c19", t:"Bloc creux",  ep:19, l:34},
  {id:"c29", t:"Bloc creux",  ep:29, l:53},
  {id:"p9",  t:"Bloc plein",  ep:9,  l:11.2},
  {id:"p14", t:"Bloc plein",  ep:14, l:17.4},
  {id:"p19", t:"Bloc plein",  ep:19, l:23.6}
];

const KEY="declic-combien-de-blocs-v2";
const LEGACY_KEY="declic-combien-de-blocs-v1";
const DEF=()=>({mode:"exo", step:0, murL:"", murH:"", blocL:"39", blocH:"19", joint:"1", ok:{}, mort:"", mortL:""});
let S;
try{
  const current=localStorage.getItem(KEY);
  S=Object.assign(DEF(),JSON.parse(current||localStorage.getItem(LEGACY_KEY)||"{}"));
  if(!current&&Number.isInteger(S.step)&&S.step>=7&&S.step<=12)S.step++;
}catch(e){S=DEF();}
S.step=Number.isInteger(S.step)&&S.step>=0&&S.step<=13?S.step:0;
S.mode=S.mode==="vite"?"vite":"exo";
S.ok=S.ok&&typeof S.ok==="object"&&!Array.isArray(S.ok)?S.ok:{};
const save=()=>{ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} };

/* ---------- Nombres ---------- */
const num=v=>{ if(v==null) return null; const t=String(v).trim().replace(/\s/g,"").replace(",","."); if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(t)) return null; const n=Number(t); return Number.isFinite(n)?n:null; };
const nf=(v,d=2)=>{ if(v==null||!Number.isFinite(v))return "—"; const r=Math.round(v*Math.pow(10,d))/Math.pow(10,d); return r.toLocaleString("fr-BE",{maximumFractionDigits:d}); };
const up=v=>Math.ceil(v-1e-9);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function V(){
  const positive=v=>{const n=num(v);return n>0&&n<=100000?n:null;};
  const L=positive(S.murL), H=positive(S.murH), bl=positive(S.blocL), bh=positive(S.blocH), jn=num(S.joint), j=jn!=null&&jn>=0&&jn<=1000?jn:null;
  const o={L,H,bl,bh,j};
  if(L&&H){ o.surf=L*H; o.Lcm=L*100; o.Hcm=H*100; }
  if(bl&&bh&&j!=null){ o.pas=bl+j; o.haut=bh+j; }
  if(o.Lcm&&o.pas){ o.parRang=o.Lcm/o.pas; }
  if(o.Hcm&&o.haut){ o.rangs=o.Hcm/o.haut; }
  if(o.pas&&o.haut){o.aireCm=o.pas*o.haut;o.aireM2=o.aireCm/10000;o.parM2=1/o.aireM2;}
  if(o.parRang&&o.rangs){ o.brut=o.parRang*o.rangs; o.total=up(o.brut); o.perte=o.total*10/100; o.commande=up(o.total+o.perte); }
  const m=MORTIER.find(x=>x.id===S.mort); o.lm2 = m ? m.l : positive(S.mortL);
  if(o.lm2&&o.surf){ o.litres=o.lm2*o.surf; o.litres10=o.litres*1.1; o.seaux=up(o.litres10/10); o.sacs=up(o.seaux/9); }
  return o;
}

/* ---------- Lecture à voix haute ---------- */
const canSpeak = "speechSynthesis" in window && typeof SpeechSynthesisUtterance!=="undefined";
function speak(t){
  if(!canSpeak) return;
  try{
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(t.replace(/×/g," fois ").replace(/÷/g," divisé par ").replace(/cm²/g," centimètres carrés").replace(/m²/g," mètres carrés").replace(/\bcm\b/g," centimètres").replace(/\bm\b/g," mètres"));
    u.lang="fr-BE"; u.rate=.9;
    const v=speechSynthesis.getVoices().find(x=>/^fr/i.test(x.lang)); if(v) u.voice=v;
    speechSynthesis.speak(u);
  }catch(e){}
}

/* ---------- Dessins ---------- */
const svgOpen=(w,h)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-hidden="true">`;
function arrowH(x1,x2,y,label){
  return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="var(--blue)" stroke-width="3"/>
  <path d="M${x1} ${y} l10 -6 v12z M${x2} ${y} l-10 -6 v12z" fill="var(--blue)"/>
  <rect x="${(x1+x2)/2-60}" y="${y-17}" width="120" height="34" rx="8" fill="var(--card)"/>
  <text x="${(x1+x2)/2}" y="${y+8}" text-anchor="middle" font-size="22" font-weight="700" fill="var(--blue)" font-family="var(--f)">${label}</text>`;
}
function arrowV(x,y1,y2,label){
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="var(--blue)" stroke-width="3"/>
  <path d="M${x} ${y1} l-6 10 h12z M${x} ${y2} l-6 -10 h12z" fill="var(--blue)"/>
  <g transform="rotate(-90 ${x} ${(y1+y2)/2})"><rect x="${x-60}" y="${(y1+y2)/2-17}" width="120" height="34" rx="8" fill="var(--card)"/>
  <text x="${x}" y="${(y1+y2)/2+8}" text-anchor="middle" font-size="22" font-weight="700" fill="var(--blue)" font-family="var(--f)">${label}</text></g>`;
}
/* Mur à l'échelle dans une boîte 560 × 300 */
function wallBox(o){
  const W=560,Hh=300,ml=70,mb=60,mt=20,mr=20;
  const L=o.L||5, H=o.H||2.5;
  const k=Math.min((W-ml-mr)/L,(Hh-mb-mt)/H);
  return {W,Hh,ml,mt,k,w:L*k,h:H*k,L,H};
}
function drawMur(o,opt={}){
  const b=wallBox(o); let s=svgOpen(b.W,b.Hh);
  const x0=b.ml, y0=b.mt;
  if(opt.grid){
    s+=`<rect x="${x0}" y="${y0}" width="${b.w}" height="${b.h}" fill="var(--blue-soft)" stroke="var(--ink)" stroke-width="3"/>`;
    const nx=Math.ceil(b.L-1e-9), ny=Math.ceil(b.H-1e-9);
    if(nx*ny<=400){
      for(let i=0;i<nx;i++) for(let jx=0;jx<ny;jx++){
        const w=Math.min(1,b.L-i)*b.k, h=Math.min(1,b.H-jx)*b.k, full=(b.L-i>=1&&b.H-jx>=1);
        s+=`<rect x="${x0+i*b.k}" y="${y0+b.h-jx*b.k-h}" width="${w}" height="${h}" fill="${full?"var(--yellow)":"var(--card)"}" stroke="var(--ink)" stroke-width="1.5" opacity="${full?.85:1}"/>`;
      }
    }
  } else if(opt.blocs && o.pas && o.haut){
    s+=bondPattern(x0,y0,b.w,b.h,o.pas/100*b.k,o.haut/100*b.k,o.j/100*b.k,opt.rows);
    s+=`<rect x="${x0}" y="${y0}" width="${b.w}" height="${b.h}" fill="none" stroke="var(--ink)" stroke-width="3"/>`;
  } else {
    s+=`<rect x="${x0}" y="${y0}" width="${b.w}" height="${b.h}" fill="var(--bloc)" stroke="var(--ink)" stroke-width="3"/>`;
  }
  if(opt.cotes!==false){
    s+=arrowH(x0,x0+b.w,y0+b.h+34,o.L?nf(o.L)+" m":"longueur");
    s+=arrowV(x0-34,y0,y0+b.h,o.H?nf(o.H)+" m":"hauteur");
  }
  return s+`</svg>`;
}
function bondPattern(x0,y0,w,h,pw,ph,jw,rowsOnly){
  let s=`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="var(--joint)"/>`;
  if(!(pw>0&&ph>0)||pw<2||ph<2) return s+`<text x="${x0+w/2}" y="${y0+h/2}" text-anchor="middle" fill="var(--ink)" font-size="18">Vue simplifiée</text>`;
  const nr=Math.min(200,Math.ceil(h/ph-1e-9)); let count=0;
  for(let r=0;r<nr;r++){
    const y=y0+h-(r+1)*ph, off=(r%2)?pw/2:0;
    for(let x=x0-off,col=0;x<x0+w-1e-6&&col<250;x+=pw,col++){
      const xa=Math.max(x,x0)+jw/2, xb=Math.min(x+pw,x0+w)-jw/2, ya=Math.max(y,y0)+jw/2, yb=y+ph-jw/2;
      if(xb-xa<=0.5||yb-ya<=0.5) continue;
      const cut=(xb-xa)<pw-jw-0.5||(yb-ya)<ph-jw-0.5;
      s+=`<rect x="${xa}" y="${ya}" width="${xb-xa}" height="${yb-ya}" fill="${cut?"var(--cut)":"var(--bloc)"}" ${cut?'stroke="var(--bloc-dark)" stroke-dasharray="4 3" stroke-width="1.2"':""}/>`;
      if(++count>3000) return s;
    }
    if(rowsOnly) s+=`<text x="${x0-10}" y="${y+ph/2+6}" text-anchor="end" font-size="15" font-weight="700" fill="var(--muted)" font-family="var(--f)">${r+1}</text>`;
  }
  return s;
}
function drawBloc(o){
  const bl=o.bl||39, bh=o.bh||19, j=(o.j==null?1:o.j);
  const W=560,H=280, k=Math.min(360/(bl+j),170/(bh+j));
  const x0=110,y0=50,w=bl*k,h=bh*k,jw=Math.max(j*k,4);
  let s=svgOpen(W,H);
  s+=`<rect x="${x0}" y="${y0}" width="${w+jw}" height="${h+jw}" fill="var(--joint)" stroke="var(--muted)" stroke-dasharray="6 4" stroke-width="2"/>`;
  s+=`<rect x="${x0}" y="${y0+jw}" width="${w}" height="${h}" fill="var(--bloc)" stroke="var(--ink)" stroke-width="3" rx="2"/>`;
  s+=`<text x="${W-16}" y="25" text-anchor="end" font-size="17" font-weight="700" fill="var(--muted)" font-family="var(--f)">joint ${o.j!=null?nf(j,2)+" cm":""}</text>`;
  s+=arrowH(x0,x0+w,y0+jw+h+36,o.bl?nf(bl,2)+" cm":"longueur");
  s+=arrowV(x0-34,y0+jw,y0+jw+h,o.bh?nf(bh,2)+" cm":"hauteur");
  return s+`</svg>`;
}
function drawRang(o){
  const W=560,H=200; let s=svgOpen(W,H);
  if(!o.pas||!o.Lcm) return s+`</svg>`;
  const x0=20,w=W-40,k=w/o.Lcm, ph=56, y0=40;
  const pw=o.pas*k, n=Math.floor(o.parRang+1e-9), rest=o.parRang-n;
  if(pw<3||o.parRang>200) return s+`<rect x="20" y="40" width="520" height="56" fill="var(--bloc)"/><text x="280" y="145" text-anchor="middle" fill="var(--ink)" font-size="20">${nf(o.parRang)} blocs par rangée · vue simplifiée</text></svg>`;
  for(let i=0;i<n && i<200;i++) s+=`<rect x="${x0+i*pw+1}" y="${y0}" width="${pw-2}" height="${ph}" fill="var(--bloc)" stroke="var(--ink)" stroke-width="1.5"/>`;
  if(rest>0.01) s+=`<rect x="${x0+n*pw+1}" y="${y0}" width="${Math.max(.5,rest*pw-2)}" height="${ph}" fill="var(--cut)" stroke="var(--bloc-dark)" stroke-dasharray="4 3" stroke-width="1.5"/>`;
  if(n<=30) for(let i=0;i<n;i++) s+=`<text x="${x0+i*pw+pw/2}" y="${y0+ph/2+6}" text-anchor="middle" font-size="${Math.min(16,pw*.5)}" font-weight="700" fill="var(--ink)" font-family="var(--f)">${i+1}</text>`;
  s+=arrowH(x0,x0+w,y0+ph+40,nf(o.Lcm,2)+" cm");
  return s+`</svg>`;
}
function drawM2(o){
  const W=560,H=300,side=240,x0=(W-side)/2,y0=24;
  let s=svgOpen(W,H);
  if(o.pas&&o.haut){ const k=side/100; s+=bondPattern(x0,y0,side,side,o.pas*k,o.haut*k,Math.max((o.j||0)*k,1.5),false); }
  s+=`<rect x="${x0}" y="${y0}" width="${side}" height="${side}" fill="none" stroke="var(--blue)" stroke-width="4"/>`;
  s+=`<text x="${W/2}" y="${y0+side+30}" text-anchor="middle" font-size="22" font-weight="700" fill="var(--blue)" font-family="var(--f)">1 m × 1 m = 1 m²</text>`;
  return s+`</svg>`;
}
function drawTile(t){
  const creux=t==="creux";
  return `<svg viewBox="0 0 120 56" aria-hidden="true"><rect x="10" y="8" width="100" height="40" rx="3" fill="var(--bloc)" stroke="var(--ink)" stroke-width="2.5"/>
  ${creux?`<rect x="20" y="16" width="34" height="24" rx="2" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/><rect x="66" y="16" width="34" height="24" rx="2" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/>`:""}</svg>`;
}

/* ---------- Bloc « à toi de calculer » ---------- */
function correctAnswer(value,answer,tolerance){
  if(value==null)return false;
  return tolerance<0.001 ? Math.abs(value-answer)<1e-6 : Math.abs(value-Math.round(answer*100)/100)<=0.005+1e-9;
}
function exo(key,ans,unit,sol,tol){
  if(S.mode!=="exo"||ans==null) return `<div class="card answer">${sol}</div>`;
  const saved=S.ok[key];
  const done=saved && correctAnswer(num(saved),ans,tol||0.02) ? saved : "";
  return `<div class="card"><p style="margin:0 0 10px;font-weight:700">À toi de calculer :</p><p class="small">${tol<0.001?"Arrondis au nombre entier supérieur.":"Pour un résultat décimal, arrondis à deux chiffres après la virgule."}</p>
    <div class="try"><div class="inp"><input inputmode="decimal" maxlength="18" autocomplete="off" id="ex-${key}" aria-label="Ta réponse" value="${done?esc(done):""}"><span>${esc(unit)}</span></div>
    <button class="btn go" data-act="check" data-k="${key}" data-a="${ans}" data-t="${tol||0.02}">Vérifier</button></div>
    <div role="status" class="fb${done?" ok":""}" id="fb-${key}">${done?"Réponse correcte. Compare ta méthode au calcul détaillé.":""}</div>
    <details class="reveal"${done?" open":""}><summary>Voir la solution</summary><div class="answer">${sol}</div></details></div>`;
}

/* ---------- Étapes ---------- */
const STEPS=[
 /* 0 */ o=>({t:"Combien de blocs ?",say:"Estime le nombre de blocs pour un mur simple et vérifie chaque étape. Choisis comment tu veux travailler.",
   h:`<p class="lead">Estime le nombre de blocs pour un mur simple et vérifie chaque étape.</p>
   <div class="fig">${drawMur({L:5,H:2.5,pas:40,haut:20,j:1},{blocs:1,cotes:false})}</div>
   <div class="modes" role="group" aria-label="Façon de travailler">
     <button class="mode" data-act="mode" data-v="exo" aria-pressed="${S.mode==="exo"}"><b>Je calcule moi-même</b><span>Je compare ma réponse au calcul.</span></button>
     <button class="mode" data-act="mode" data-v="vite" aria-pressed="${S.mode==="vite"}"><b>L'appli calcule</b><span>Je vérifie la méthode et les hypothèses.</span></button>
   </div>`, ok:true}),
 /* 1 */ o=>({t:"Mesure le mur",say:"Mesure la longueur et la hauteur du mur, en mètres.",
   h:`<p class="lead">Mesure la longueur et la hauteur du mur, en mètres.</p>
   <div class="fig">${drawMur(o)}</div>
   <div class="card"><div class="fields">
     ${field("murL","Longueur","m","ex. 5")}${field("murH","Hauteur","m","ex. 2,5")}
   </div><p class="small">Pour 2 m 50, écris 2,5. Utilise des dimensions positives.</p></div>`, ok:!!(o.L&&o.H)}),
 /* 2 */ o=>({t:"La surface du mur",say:`La surface, c'est la longueur fois la hauteur. ${nf(o.L)} fois ${nf(o.H)}.`,
   h:`<p class="lead">Surface = longueur × hauteur. Chaque carré orange entier représente 1 m².</p>
   <div class="fig">${drawMur(o,{grid:1})}</div>
   <div class="calc"><span class="n">${nf(o.L)}</span> × <span class="n">${nf(o.H)}</span> = <span class="q">?</span> m²</div>
   ${exo("surf",o.surf,"m²",`${nf(o.L)} × ${nf(o.H)} = <b>${nf(o.surf)} m²</b>`)}`, ok:true}),
 /* 3 */ o=>({t:"Mesure le bloc",say:"Mesure un bloc, en centimètres : sa longueur et sa hauteur. Indique aussi l’épaisseur du joint.",
   h:`<p class="lead">Mesure le bloc en centimètres et indique l’épaisseur du joint.</p>
   <div class="fig">${drawBloc(o)}</div>
   <div class="card"><div class="fields">
     ${field("blocL","Longueur du bloc","cm","ex. 39")}${field("blocH","Hauteur du bloc","cm","ex. 19")}
   </div><div class="fields one" style="margin-top:12px">${field("joint","Épaisseur du joint","cm","1")}</div>
   <p class="small">Exemple : un bloc de 39 × 19 cm et un joint de 1 cm donnent un module de 40 × 20 cm pour ce calcul.</p></div>`, ok:!!(o.pas&&o.haut)}),
 /* 4 */ o=>({t:"Blocs dans une rangée",say:`D'abord, change les mètres en centimètres. ${nf(o.L)} mètres, c'est ${nf(o.Lcm,2)} centimètres. Ensuite, divise par la longueur du bloc plus le joint : ${nf(o.pas,2)} centimètres.`,
   h:`<p class="lead">Combien de blocs dans une rangée ?</p>
   <div class="fig">${drawRang(o)}</div>
   <div class="card"><p style="margin:0 0 6px"><b>1.</b> Le mur en centimètres :</p>
     <div class="calc"><span class="n">${nf(o.L)}</span> m × 100 = <span class="n">${nf(o.Lcm,2)}</span> cm</div>
     <p style="margin:0 0 6px"><b>2.</b> Un bloc + joint : ${nf(o.bl,2)} + ${nf(o.j,2)} = <b>${nf(o.pas,2)} cm</b></p>
     <div class="calc"><span class="n">${nf(o.Lcm,2)}</span> ÷ <span class="n">${nf(o.pas,2)}</span> = <span class="q">?</span></div></div>
   ${exo("rang",o.parRang,"blocs",`${nf(o.Lcm,2)} ÷ ${nf(o.pas,2)} = <b>${nf(o.parRang)} blocs</b> par rangée.${o.parRang%1>0.01?`<br>La partie en pointillés représente une fraction de bloc. Le dessin ne détermine pas les découpes réelles.`:""}`)}`, ok:true}),
 /* 5 */ o=>({t:"Nombre de rangées",say:`La hauteur du mur, ${nf(o.Hcm,2)} centimètres, divisée par la hauteur du bloc plus le joint, ${nf(o.haut,2)} centimètres.`,
   h:`<p class="lead">Quel nombre théorique de rangées obtient-on ?</p>
   <div class="fig">${drawMur(o,{blocs:1,rows:1})}</div>
   <div class="card"><p style="margin:0 0 6px"><b>1.</b> La hauteur en centimètres : ${nf(o.H)} m × 100 = <b>${nf(o.Hcm,2)} cm</b></p>
     <p style="margin:0 0 6px"><b>2.</b> Un bloc + joint : ${nf(o.bh,2)} + ${nf(o.j,2)} = <b>${nf(o.haut,2)} cm</b></p>
     <div class="calc"><span class="n">${nf(o.Hcm,2)}</span> ÷ <span class="n">${nf(o.haut,2)}</span> = <span class="q">?</span></div></div>
   ${exo("rangs",o.rangs,"rangées",`${nf(o.Hcm,2)} ÷ ${nf(o.haut,2)} = <b>${nf(o.rangs)} rangées</b>.`)}`, ok:true}),
 /* 6 */ o=>({t:"Tous les blocs",say:`Multiplie les blocs d'une rangée par le nombre de rangées : ${nf(o.parRang)} fois ${nf(o.rangs)}. Puis arrondis au nombre entier au-dessus.`,
   h:`<p class="lead">Blocs d'une rangée × nombre de rangées.</p>
   <div class="fig">${drawMur(o,{blocs:1})}</div>
   <div class="calc"><span class="n">${nf(o.parRang)}</span> × <span class="n">${nf(o.rangs)}</span> = <span class="q">?</span></div>
   <p class="small" style="text-align:center;margin-top:-6px">Pour cette estimation, arrondis le total au nombre entier supérieur.</p>
   ${exo("total",o.total,"blocs",`${nf(o.parRang)} × ${nf(o.rangs)} = ${nf(o.brut)}, arrondi au-dessus : <b>${o.total} blocs</b>.`,0.0001)}`, ok:true}),
 /* 7 */ o=>({t:"Vérifie avec la règle de trois",say:`On calcule autrement pour vérifier. Un bloc avec son joint couvre ${nf(o.aireCm,2)} centimètres carrés, c'est-à-dire ${nf(o.aireM2,4)} mètre carré. Combien de blocs dans un mètre carré ? Puis combien dans ${nf(o.surf)} mètres carrés ?`,
   h:`<p class="lead">Vérifie le total par une autre méthode : les blocs par m². Compare d’abord les résultats avant l’arrondi à l’entier.</p>
   <div class="fig">${drawM2(o)}</div>
   <div class="card"><p style="margin:0 0 6px"><b>1.</b> Un bloc + joint couvre : ${nf(o.pas,2)} × ${nf(o.haut,2)} = <b>${nf(o.aireCm,2)} cm²</b></p>
     <p style="margin:0 0 6px"><b>2.</b> 1 m² = 10 000 cm², donc ${nf(o.aireCm,2)} cm² = <b>${nf(o.aireM2,4)} m²</b></p>
     <p style="margin:10px 0 8px;font-weight:700">Règle de trois :</p>
     <div class="rule"><span class="a">${nf(o.aireM2,4)} m²</span><span class="arr">→</span><span>1 bloc</span>
       <span class="a">1 m²</span><span class="arr">→</span><span>1 ÷ ${nf(o.aireM2,4)} = <span class="q" style="padding:0 8px;border-radius:8px;background:var(--yellow);color:var(--yellow-ink)">?</span></span></div></div>
   ${exo("m2",o.parM2,"blocs",`1 ÷ ${nf(o.aireM2,4)} = <b>${nf(o.parM2)} blocs</b> dans 1 m².<br>Le dessin illustre 1 m² ; le calcul tient aussi compte des fractions de bloc.`)}
   <div class="card"><div class="rule"><span class="a">1 m²</span><span class="arr">→</span><span>${nf(o.parM2)} blocs</span>
       <span class="a">${nf(o.surf)} m²</span><span class="arr">→</span><span>${nf(o.parM2)} × ${nf(o.surf)} = <span class="q" style="padding:0 8px;border-radius:8px;background:var(--yellow);color:var(--yellow-ink)">?</span></span></div></div>
   <p class="small">Garde la précision de ta calculatrice entre les étapes. Les nombres affichés sont arrondis pour la lecture.</p>
   ${exo("verif",o.brut,"blocs",`${nf(o.parM2)} × ${nf(o.surf)} = <b>${nf(o.brut)} blocs</b>.<br>À l’étape 6 : ${nf(o.parRang)} × ${nf(o.rangs)} = ${nf(o.brut)} avant arrondi.<br>Les deux méthodes donnent <b>${o.total} blocs</b> après arrondi à l’entier supérieur.`)}`, ok:true}),
 /* 8 */ o=>({t:"Ajoute 10 % de réserve",say:`Dans cet exemple, on prévoit dix pour cent en plus pour les blocs cassés et les découpes. Pour cent blocs, on en ajoute dix. Calcule la réserve pour ${o.total} blocs, puis ajoute-la au total.`,
   h:`<p class="lead">Pour cet exercice, on choisit une réserve de 10 % pour la casse et les découpes.</p>
   <div class="card"><p style="margin:0 0 8px;font-weight:700">Règle de trois :</p>
     <div class="rule"><span class="a">100 blocs</span><span class="arr">→</span><span>10 en plus</span>
       <span class="a">1 bloc</span><span class="arr">→</span><span>10 ÷ 100 = 0,1</span>
       <span class="a">${o.total} blocs</span><span class="arr">→</span><span>${o.total} × 0,1 = <span class="q" style="padding:0 8px;border-radius:8px;background:var(--yellow);color:var(--yellow-ink)">?</span></span></div>
     <div class="calc"><span class="n">${o.total}</span> + réserve = <span class="q">?</span></div>
     <p class="small" style="text-align:center;margin-top:-6px">Arrondis au-dessus.</p></div>
   ${exo("cmd",o.commande,"blocs",`Réserve : ${o.total} × 0,1 = ${nf(o.perte,2)}.<br>${o.total} + ${nf(o.perte,2)} = ${nf(o.total+o.perte,2)}, arrondi au-dessus : <b>${o.commande} blocs</b>.`,0.0001)}`, ok:true}),
 /* 9 */ o=>({t:"Ton estimation de blocs",say:`L’estimation avec dix pour cent de réserve est de ${o.commande} blocs.`,
   h:`<div class="card big"><div class="num">${o.commande}</div><div class="unit">blocs estimés · réserve comprise</div></div>
   <div class="card recap">
     <span>Mur</span><b>${nf(o.L)} m × ${nf(o.H)} m = ${nf(o.surf)} m²</b>
     <span>Bloc + joint</span><b>${nf(o.pas,2)} × ${nf(o.haut,2)} cm</b>
     <span>Par rangée</span><b>${nf(o.parRang)}</b>
     <span>Rangées</span><b>${nf(o.rangs)}</b>
     <span>Sans réserve</span><b>${o.total}</b>
     <span>Avec 10 % de réserve</span><b>${o.commande}</b>
   </div>
   <p class="small">Il y a une porte ou une fenêtre ? Ce calcul ne la retire pas. Demande au formateur.</p>
   <button class="btn block" style="width:100%;margin-top:6px" data-act="goto" data-v="10">Calculer aussi le mortier</button>`, ok:true, last:true}),
 /* 10 */ o=>({t:"Le mortier",say:"Choisis un bloc dans la table ou saisis une consommation de mortier vérifiée avec le formateur. La table correspond à des joints de douze millimètres.",
   h:`<p class="lead">Choisis un bloc de la table ou indique une consommation vérifiée avec le formateur.</p>
   <div class="tiles" role="group" aria-label="Type de bloc">
     ${MORTIER.map(m=>`<button class="tile" data-act="mort" data-v="${m.id}" aria-pressed="${S.mort===m.id}">${drawTile(m.t==="Bloc creux"?"creux":"plein")}${m.t}<small>Épaisseur : ${m.ep} cm</small><small>${nf(m.l,2)} litres par m²</small></button>`).join("")}
     <button class="tile" data-act="mort" data-v="autre" aria-pressed="${S.mort==="autre"}"><svg viewBox="0 0 120 56" aria-hidden="true"><text x="60" y="40" text-anchor="middle" font-size="34" font-weight="700" fill="var(--muted)" font-family="var(--f)">?</text></svg>Autre bloc<small>demande au formateur</small></button>
   </div>
   ${S.mort==="autre"?`<div class="card" style="margin-top:12px">${field("mortL","Mortier pour 1 m²","litres","")}</div>`:""}
   <p class="small">Table Roosens : blocs de 39 × 19 cm, joints de 12 mm. Le joint saisi pour compter les blocs ne modifie pas cette table. Pour un autre cas, choisis « Autre bloc ».</p>`, ok:!!o.lm2}),
 /* 11 */ o=>({t:"Litres de mortier",say:`Avec la consommation choisie, un mètre carré demande ${nf(o.lm2,2)} litres. Pour ${nf(o.surf)} mètres carrés, combien ?`,
   h:`<p class="lead">Avec la consommation choisie : 1 m² demande ${nf(o.lm2,2)} litres.</p>
   <div class="card"><div class="rule"><span class="a">1 m²</span><span class="arr">→</span><span>${nf(o.lm2,2)} litres</span>
     <span class="a">${nf(o.surf)} m²</span><span class="arr">→</span><span><span class="q" style="padding:0 8px;border-radius:8px;background:var(--yellow);color:var(--yellow-ink)">?</span> litres</span></div>
   <div class="calc"><span class="n">${nf(o.lm2,2)}</span> × <span class="n">${nf(o.surf)}</span> = <span class="q">?</span></div></div>
   ${exo("litres",o.litres,"litres",`${nf(o.lm2,2)} × ${nf(o.surf)} = <b>${nf(o.litres,2)} litres</b>.`)}`, ok:true}),
 /* 12 */ o=>({t:"Seaux et sacs",say:`Avec dix pour cent de réserve, on obtient ${nf(o.litres10,2)} litres. Dans cet exemple, un seau contient dix litres. Un sac de ciment de vingt-cinq kilos et neuf seaux de sable donnent environ neuf seaux de mortier.`,
   h:`<p class="lead">Avec 10 % de réserve : ${nf(o.litres,2)} × 1,1 = <b>${nf(o.litres10,2)} litres</b>.</p>
   <div class="card"><p style="margin:0 0 6px"><b>Dans cet exemple : 1 seau = 10 litres.</b></p>
     <div class="calc"><span class="n">${nf(o.litres10,2)}</span> ÷ 10 = <span class="q">?</span> seaux</div></div>
   ${exo("seaux",o.seaux,"seaux",`${nf(o.litres10,2)} ÷ 10 = ${nf(o.litres10/10,2)}, arrondi au-dessus : <b>${o.seaux} seaux</b> de mortier.`,0.0001)}
   <div class="card"><p style="margin:0 0 6px"><b>Repère pour cet exemple : 1 sac de ciment (25 kg) + 9 seaux de sable</b> donnent environ 9 seaux de mortier.</p>
     <div class="calc"><span class="n">${o.seaux}</span> ÷ 9 = <span class="q">?</span> sacs</div></div>
   ${exo("sacs",o.sacs,"sacs",`${o.seaux} ÷ 9 = ${nf(o.seaux/9,2)}, arrondi au-dessus : <b>${o.sacs} sacs</b> de ciment.`,0.0001)}`, ok:true}),
 /* 13 */ o=>({t:"Ton estimation",say:`Avec les hypothèses de cet exemple, l’estimation est de ${o.commande} blocs, ${o.sacs} sacs de ciment de vingt-cinq kilos et ${o.sacs*9} seaux de sable de dix litres.`,
   h:`<div class="card big"><div class="num">${o.commande}</div><div class="unit">blocs estimés · réserve comprise</div></div>
   <div class="tiles">
     <div class="card big" style="margin:0"><div class="num" style="font-size:3.2rem">${o.sacs}</div><div class="unit">sacs de ciment de 25 kg</div></div>
     <div class="card big" style="margin:0"><div class="num" style="font-size:3.2rem">${o.sacs*9}</div><div class="unit">seaux de sable de 10 litres</div></div>
   </div>
   <p class="small" style="margin-top:14px">Repère Holcim pour blocs lourds ou mi-lourds, dosage de 300 kg/m³ : 9 seaux de sable par sac de 25 kg. Fais confirmer le dosage adapté avec le formateur.</p>
   <button class="btn ghost" style="width:100%;margin-top:10px" data-act="restart">Nouveau mur</button>`, ok:true, last:true})
];
function field(k,label,unit,ph){
  return `<div class="f"><label for="i-${k}">${label}</label><div class="inp"><input id="i-${k}" inputmode="decimal" maxlength="18" autocomplete="off" data-k="${k}" value="${esc(S[k])}" placeholder="${esc(ph)}"><span>${unit}</span></div></div>`;
}

/* ---------- Rendu ---------- */
const app=document.getElementById("app"), nav=document.getElementById("nav");
let cur=null;
function render(focus){
  let o=V();
  if(S.step>=2 && !o.surf) S.step=1;
  else if(S.step>=4 && (!o.parRang||!o.rangs)) S.step=3;
  else if(S.step>=11 && !o.litres) S.step=10;
  const st=STEPS[S.step](o); cur=st;
  const n=S.step<=9?10:14, i=S.step;
  const prog=Array.from({length:n},(_,k)=>`<i class="${k<i?"done":k===i?"now":""}"></i>`).join("");
  app.innerHTML=`<div class="top"><span class="stepno">${i===0?"":(i<=9?`Étape ${i} sur 9`:`Mortier, étape ${i-9} sur 4`)}</span>
    ${canSpeak?`<button class="say" data-act="say"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>Écouter</button>`:""}</div>
    <div class="prog" aria-hidden="true">${prog}</div><h1 id="step-title" tabindex="-1">${st.t}</h1>${st.h}`;
  const back = i===10 ? 9 : i-1;
  nav.innerHTML=`<div class="wrap">${i>0?`<button class="btn ghost" data-act="goto" data-v="${back}">Retour</button>`:""}
    ${st.last?"":`<button class="btn go" data-act="next"${st.ok?"":" disabled"}>${i===0?"Commencer":"Suivant"}</button>`}</div>`;
  if(focus){ const el=document.getElementById(focus); if(el){ el.focus(); const v=el.value; el.value=""; el.value=v; } }
}
function go(n){ S.step=Math.max(0,Math.min(STEPS.length-1,n)); save(); render(); document.getElementById("step-title").focus({preventScroll:true}); window.scrollTo(0,0); if(canSpeak) speechSynthesis.cancel(); }

app.addEventListener("input",e=>{
  const t=e.target; if(!t.dataset.k) return;
  S[t.dataset.k]=t.value; S.ok={}; save();
  const o=V(), st=STEPS[S.step](o);
  const btn=nav.querySelector('[data-act="next"]'); if(btn) btn.disabled=!st.ok;
  const fig=app.querySelector(".fig"); if(fig){ const tmp=document.createElement("div"); tmp.innerHTML=st.h; const nf2=tmp.querySelector(".fig"); if(nf2) fig.innerHTML=nf2.innerHTML; }
});
app.addEventListener("keydown",e=>{
  if(e.key==="Enter" && e.target.id && e.target.id.startsWith("ex-")){ const b=e.target.closest(".card").querySelector('[data-act="check"]'); if(b) b.click(); }
});
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-act]"); if(!b||b.disabled) return;
  const a=b.dataset.act;
  if(a==="next") go(S.step+1);
  else if(a==="goto") go(Number(b.dataset.v));
  else if(a==="mode"){ S.mode=b.dataset.v; save(); render(); }
  else if(a==="mort"){ S.mort=b.dataset.v; S.ok={}; save(); render(b.dataset.v==="autre"?"i-mortL":null); }
  else if(a==="say"){ const tmp=document.createElement("div"); tmp.innerHTML=cur.h; speak(cur.say||tmp.textContent); }
  else if(a==="restart"){ const m=S.mode; S=DEF(); S.mode=m; save(); go(1); }
  else if(a==="check"){
    const k=b.dataset.k, ans=Number(b.dataset.a), tol=Number(b.dataset.t);
    const inp=document.getElementById("ex-"+k), fb=document.getElementById("fb-"+k), v=num(inp.value);
    if(v==null){ fb.className="fb ko"; fb.textContent="Écris un nombre."; inp.focus(); return; }
    const good = correctAnswer(v,ans,tol);
    if(good){ S.ok[k]=inp.value; save(); fb.className="fb ok"; fb.textContent="Réponse correcte. Compare ta méthode au calcul détaillé.";
      const d=fb.parentNode.querySelector("details"); if(d) d.open=true; }
    else { fb.className="fb ko"; fb.textContent = (tol<0.001 && Math.abs(v-ans)<1.0001 && v<ans) ? "Presque. As-tu arrondi au-dessus ?" : "Pas encore. Vérifie ton calcul et réessaie."; }
  }
});
if(canSpeak) try{ speechSynthesis.getVoices(); }catch(e){}
window.addEventListener("pagehide",()=>{if(canSpeak)speechSynthesis.cancel();});
render();
})();
