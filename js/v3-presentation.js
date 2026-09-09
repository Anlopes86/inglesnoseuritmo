(function () {
 'use strict';
 const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const moduleId = document.body.dataset.module || 'a1-v3';
 const moduleLabel = moduleId.split('-')[0].toUpperCase();
 const published = Boolean(document.body.dataset.module);
 const homeUrl = published ? moduleId+'.html' : 'index.html';
 const manifests = published ? window.V3Curriculum.getModule(moduleId) : window.V3Curriculum.a1PreviewLessons;
 const registry = window.V3PresentationRegistry || window.A1V3LessonRegistry;
 const href = m => `aula.html?aula=${encodeURIComponent(m.slug)}`;
 const hub = document.getElementById('lesson-list');
 if (hub) {
   hub.innerHTML = manifests.map(m => {const lesson=registry.getPreview(m.id);return `<a class="lesson-card" href="${href(m)}"><span class="number">${String(m.number).padStart(2,'0')}</span><span class="eyebrow">${m.lessonKind==='communicative'?'CONVERSATION ACTIVITIES':'VOCABULÁRIO & PRÁTICA'}</span><h2>${escape(m.title)}</h2><p>${escape(lesson.summary)}</p><span class="open">Abrir aula <span aria-hidden="true">↗</span></span></a>`;}).join('');
   return;
 }
 const slug = new URLSearchParams(location.search).get('aula');
 const manifest = published ? manifests.find(m=>m.number===Number(document.body.dataset.lessonNumber)) : manifests.find(m=>m.slug===slug);
 const stage = document.getElementById('stage');
 if (!manifest) {stage.innerHTML='<section class="error"><h1>Aula não encontrada.</h1><a href="index.html">Voltar ao ciclo de aulas →</a></section>';document.querySelector('.bottombar').hidden=true;return;}
 const sourceLesson = published ? {...registry.get(manifest.number),...manifest,curriculumId:manifest.id} : registry.getPreview(manifest.id);
 const musicEntry = window.MusicClozeV3?.getPublicEntry(sourceLesson);
 const slides = [...sourceLesson.slides];
 if(musicEntry) slides.splice(slides.findIndex(s=>s.type==='homework'),0,{id:'music',type:'music',title:'Music Moment',kicker:'Listen & connect',instruction:'Ouça com o professor. Diga as palavras que reconhece, complete as cinco lacunas e use o vocabulário em uma conversa sua.',entry:musicEntry});
 const lesson = {...sourceLesson,slides};
 let musicRoot=null;
 window.LessonFlashcardContext={moduleId,curriculumId:lesson.id,lessonNumber:lesson.number,lessonLabel:lesson.title,defaultCategory:moduleLabel+' · '+lesson.title,loginPath:published?'../login.html':'../../login.html',requireStudent:true};
 const storageKey = `insr:lesson-page:v3:${lesson.version}:${lesson.id}`;
 let saved={};try{saved=JSON.parse(sessionStorage.getItem(storageKey)||'{}')||{};}catch{}
 const states = new Map();
 const marks = new Set((Array.isArray(saved.marks)?saved.marks:[]).filter(id=>lesson.slides.some(s=>s.id===id)));
 let current=Math.max(0,Math.min(Number.isInteger(saved.current)?saved.current:0,lesson.slides.length-1));
 let ratings = saved.ratings && typeof saved.ratings==='object'?saved.ratings:{};
 let homework = typeof saved.homework==='string'?saved.homework:'';
 const dialog=document.getElementById('index-dialog');
 const button = (label,action,extra='',cls='quiet')=>`<button type="button" class="${cls}" data-action="${action}" ${extra}>${label}</button>`;
 const stateFor = slide => {if(!states.has(slide.id))states.set(slide.id,{reveals:new Set(),cursor:0,highlight:0,role:'',translation:false,single:false,meanings:true});return states.get(slide.id);};
 const save = ()=>{try{sessionStorage.setItem(storageKey,JSON.stringify({current,marks:[...marks],ratings,homework}));}catch{}};
 const reveal = (key,label='Revelar significado')=>{const st=stateFor(lesson.slides[current]);return button(st.reveals.has(key)?'Ocultar':label,'reveal',`data-key="${key}" aria-expanded="${st.reveals.has(key)}" aria-controls="answer-${lesson.slides[current].id}-${key}"`,'reveal');};
 const answer = (key,content,cls='')=>`<div id="answer-${lesson.slides[current].id}-${key}" class="answer ${cls}" ${stateFor(lesson.slides[current]).reveals.has(key)?'':'hidden'}>${content}</div>`;
 function art(scene){
   if(scene==='cafe')return `<svg viewBox="0 0 360 230" aria-hidden="true"><ellipse cx="176" cy="201" rx="136" ry="12" fill="#becfc6"/><path d="M79 99h159l-14 79q-4 25-62 25t-69-25z" fill="#fff9ed"/><path d="M238 109h24q43 33-25 63" fill="none" stroke="#fff9ed" stroke-width="16"/><ellipse cx="159" cy="99" rx="80" ry="17" fill="#c27850"/><ellipse cx="159" cy="96" rx="65" ry="10" fill="#51372e"/><path d="M126 61q-18-17 0-37M159 61q-18-17 0-37M193 61q-18-17 0-37" fill="none" stroke="#839f91" stroke-width="5" stroke-linecap="round"/><path d="M239 205l49-68 40 68z" fill="#dfad6d"/><path d="M250 190h66" stroke="#618274" stroke-width="8"/></svg>`;
   return `<svg viewBox="0 0 360 230" aria-hidden="true"><rect x="57" y="39" width="172" height="163" rx="12" fill="#fff9ed"/><path d="M57 79h172" stroke="#c9d5cd" stroke-width="2"/><path d="M93 27v26M189 27v26" stroke="#ba532e" stroke-width="9" stroke-linecap="round"/><path d="M84 108h31m22 0h31m22 0h17M84 141h31m22 0h31M84 174h31" stroke="#9ab1a4" stroke-width="10"/><circle cx="247" cy="148" r="61" fill="#274da9"/><circle cx="247" cy="148" r="49" fill="#f3f6ff"/><path d="M247 112v36l25 16" stroke="#274da9" fill="none" stroke-width="6" stroke-linecap="round"/><circle cx="247" cy="148" r="5" fill="#ba532e"/></svg>`;
 }
 function title(s){return `<div class="slide-top"><div><p class="eyebrow">${escape(s.kicker)}</p><h1 id="slide-heading" tabindex="-1">${escape(s.title)}</h1><p class="instruction">${escape(s.instruction)}</p></div>${button(marks.has(s.id)?'★ Retomar':'☆ Retomar','bookmark',`aria-pressed="${marks.has(s.id)}" aria-label="${marks.has(s.id)?'Desmarcar':'Marcar'} atividade para retomar"`,'quiet bookmark')}</div>`;}

 function saveAttrs(front,back,example,forms){return ' data-pronounce-text="'+escape(front)+'" data-save-card data-card-front="'+escape(front)+'" data-card-back="'+escape([back,forms?'Formas: '+front+' · '+forms:'',example?'Exemplo: '+example:''].filter(Boolean).join(' — '))+'"';}
 function cards(s){
  const st=stateFor(s),groups=s.groups||[{title:'',cards:s.cards}];
  if(s.type==='verbs')return '<div class="verb-table-wrap"><table class="verb-table"><thead><tr><th>Infinitivo · to + verbo</th><th>Passado</th><th>Particípio</th><th>Significado e exemplo</th></tr></thead><tbody>'+s.cards.map(([front,back,example,forms])=>{front='to '+front.replace(/^to\s+/i,'');const f=forms.split(' · ');return '<tr><td lang="en"><div class="verb-save"'+saveAttrs(front,back,example,forms)+'><strong>'+escape(front)+'</strong></div></td><td lang="en">'+escape(f[0])+'</td><td lang="en">'+escape(f[1])+'</td><td>'+escape(back)+'<p lang="en">'+escape(example)+'</p></td></tr>';}).join('')+'</tbody></table></div>';
  const control=s.type==='cards'?'<div class="toolbar">'+button(st.meanings?'Ocultar traduções':'Mostrar traduções','meanings','aria-pressed="'+st.meanings+'"','small-button')+'</div>':'';
  return control+groups.map(g=>'<section class="content-group">'+(g.title?'<h2 class="group-title">'+escape(g.title)+'</h2>':'')+'<div class="'+(s.type==='patterns'?'explanation-grid':'vocabulary-list')+'">'+g.cards.map(([front,back,example])=>'<article class="reference-row"'+(s.type==='cards'?saveAttrs(front,back,example):'')+'><div class="reference-pair"><h3 lang="en">'+escape(front)+'</h3>'+(s.type==='patterns'||st.meanings?'<p class="meaning">'+escape(back)+'</p>':'')+'</div><p class="reference-example" lang="en">'+escape(example)+'</p></article>').join('')+'</div></section>').join('');
 }
 function exercise(s){
  const st=stateFor(s),all=s.items.every((_,i)=>st.reveals.has('item-'+i));
  return (s.passage?'<div class="passage" lang="en">'+escape(s.passage)+'</div>':'')+'<div class="exercise-toolbar"><span>'+s.items.length+' '+(s.type==='questions'?'perguntas':'frases')+' · responda em voz alta</span>'+button(all?'Ocultar todos os modelos':'Revelar todos os modelos','all-models','aria-expanded="'+all+'"','small-button')+'</div><div class="exercise-list">'+s.items.map(([q,a],i)=>'<article class="exercise-row"><div class="exercise-question"><span class="item-number">'+String(i+1).padStart(2,'0')+'</span><h3>'+escape(q)+'</h3>'+reveal('item-'+i,'Ver modelo')+'</div>'+answer('item-'+i,'<span lang="en">'+escape(a)+'</span>')+'</article>').join('')+'</div>';
 }
 function dialogue(s){const st=stateFor(s);return `<div class="toolbar">${s.lines.every(line=>line[2])?button(st.translation?'Ocultar traduções':'Mostrar traduções','translations',`aria-pressed="${st.translation}"`,'small-button'):''}${[...new Set(s.lines.map(line=>line[0]))].map(role=>button((st.role===role?'Mostrar ':'Ocultar ')+escape(role),'role',`data-role="${escape(role)}" aria-pressed="${st.role===role}"`,'small-button')).join('')}${button(st.single?'Ver diálogo completo':'Uma fala por vez','single',`aria-pressed="${st.single}"`,'small-button')}${button('Destacar próxima fala →','highlight-next','','small-button')}</div><div class="dialogue-lines ${st.single?'single':''}">${s.lines.map(([speaker,en,pt],i)=>{const masked=st.role===speaker&&!st.reveals.has(`line-${i}`);return `${s.lineTitles?.[i]?'<h2 class="group-title">'+escape(s.lineTitles[i])+'</h2>':''}<article ${st.single&&st.highlight!==i?'hidden':''} class="dialogue-row ${st.highlight===i?'current':''}"><button type="button" class="speaker" data-action="highlight" data-line="${i}" aria-label="Destacar fala ${i+1}, personagem ${speaker}" aria-pressed="${st.highlight===i}">${speaker}</button><div>${masked?'<p class="concealed">Sua fala…</p>':`<p lang="en" class="line-english">${escape(en)}</p>${st.translation?`<p class="line-translation">${escape(pt)}</p>`:''}`}</div>${st.role===speaker?button(masked?'Revelar fala':'Ocultar fala','line',`data-line="${i}" aria-label="${masked?'Revelar':'Ocultar'} fala ${i+1}"`,'reveal line-reveal'):''}</article>`;}).join('')}</div>`;}
 function reading(s){const st=stateFor(s),hasTranslations=s.translations?.length===s.paragraphs.length;return `<div class="toolbar">${hasTranslations?button(st.translation?'Ocultar traduções':'Mostrar traduções','translations',`aria-pressed="${st.translation}"`,'small-button'):''}${button(st.single?'Ver texto completo':'Um trecho por vez','single',`aria-pressed="${st.single}"`,'small-button')}${button('Destacar próximo trecho →','highlight-next','','small-button')}</div><div class="reading ${st.single?'single':''}">${s.paragraphs.map((p,i)=>`<article ${st.single&&st.highlight!==i?'hidden':''} class="paragraph ${st.highlight===i?'current':''}"><button type="button" data-action="highlight" data-line="${i}" lang="en" aria-pressed="${st.highlight===i}">${escape(p)}</button>${st.translation&&hasTranslations?`<p class="translation">${escape(s.translations[i])}</p>`:''}</article>`).join('')}</div>${s.items?'<h2 class="group-title reading-question-title">Let’s check understanding</h2>'+exercise({...s,type:'questions'}):''}`;}
 function conversation(s){return '<div class="conversation-cards">'+s.tasks.map(([label,text],i)=>'<article class="conversation-card"><span class="eyebrow">'+escape(label)+'</span><h2>'+escape(text)+'</h2></article>').join('')+'</div><div class="conversation-goal"><h2>'+escape(s.goal)+'</h2><p>'+escape(s.challenge)+'</p></div>';}
 function mission(s){const st=stateFor(s);return `<div class="mission-grid"><section class="board">${s.board.map(([label,text])=>`<div class="board-section"><h2>${escape(label)}</h2><p lang="en">${escape(text)}</p></div>`).join('')}</section><section><ol class="mission-steps">${s.steps.map(step=>`<li>${escape(step)}</li>`).join('')}</ol>${button(st.reveals.has('support')?'Mostrar apoio':'Ocultar apoio','support',`aria-expanded="${!st.reveals.has('support')}"`,'small-button')}<div class="support" ${st.reveals.has('support')?'hidden':''}>${s.support.map(p=>`<span lang="en">${escape(p)}</span>`).join('')}</div><div class="mission-actions">${s.surprise?reveal('surprise','Revelar mudança'):''}${reveal('model','Ver resposta possível')}</div><div class="mission-reveals">${s.surprise?answer('surprise',`<span lang="en">${escape(s.surprise)}</span>`):''}${answer('model',`<span lang="en">${escape(s.model)}</span>`)}</div></section></div>`;}
 function renderSection(s){
   document.title=`${lesson.title} · Inglês no Seu Ritmo`;
   document.getElementById('lesson-title').textContent=lesson.title;
   document.getElementById('lesson-kind').textContent=`${moduleLabel} · Aula ${lesson.number}`;
   let content='';
   if(s.type==='welcome') content=`<section class="welcome"><div><p class="eyebrow">${escape(s.kicker)} · ${moduleLabel}</p><h1 id="slide-heading" tabindex="-1">${escape(s.title)}</h1><p class="instruction">${escape(s.instruction)}</p><div class="chips">${s.chips.map(x=>`<span>${escape(x)}</span>`).join('')}</div></div><div class="scene"><span class="scene-label">ENGLISH FOR YOUR EVERYDAY LIFE</span>${art(s.scene)}<div class="outcome"><small>UMA FRASE PARA LEVAR COM VOCÊ</small><span lang="en">${escape(s.outcome)}</span></div></div></section>`;
   else {
    if(['cards','verbs','patterns'].includes(s.type))content=cards(s);
    else if(['drill','questions'].includes(s.type))content=exercise(s);
    else if(s.type==='dialogue')content=dialogue(s);
    else if(s.type==='reading')content=reading(s);
    else if(s.type==='mission')content=mission(s);
    else if(s.type==='roleplay'){const st=stateFor(s),index=st.roleIndex||0,role=s.roles[index];content='<div class="toolbar">'+s.roles.map((r,i)=>button(escape(r.name),'select-role',`data-role-index="${i}" aria-pressed="${i===index}"`,'small-button')).join('')+'</div>'+mission({...s,board:[[role.name,role.goal],['Your information',role.details.join(' · ')]]});}
    else if(s.type==='reference')content='<div class="reference-content">'+s.body+'</div>';
    else if(s.type==='music')content='<div class="music-prelisten"><p>Antes de ouvir: diga uma frase sua com <strong lang="en">'+escape(musicEntry.pedagogy.targetVocabulary.join(' · '))+'</strong>.</p><a class="quiet" href="https://open.spotify.com/track/'+musicEntry.song.spotifyTrackId+'" target="_blank" rel="noopener">Abrir faixa no Spotify ↗</a></div><div id="music-slot"></div><section class="conversation-goal"><h2>After listening · now it’s about you</h2><ol>'+musicEntry.pedagogy.transferPrompts.map(q=>'<li lang="en">'+escape(q)+'</li>').join('')+'</ol></section>';
    else if(s.type==='conversation')content=conversation(s);
    else if(s.type==='exit')content=`<div class="assessment">${s.checks.map((text,i)=>`<article class="assessment-card"><h2>${escape(text)}</h2><div class="ratings" role="group" aria-label="${escape(text)}">${['Com modelo','Com uma dica','Consigo'].map((label,r)=>button(label,'rate',`data-check="${i}" data-rating="${r}" aria-pressed="${ratings[s.id+'-'+i]===r}"`,'small-button')).join('')}</div></article>`).join('')}</div>`;
    else if(s.type==='homework')content=`<div class="homework-grid">${s.options.map(([letter,name,text])=>`<article class="homework-card ${homework===letter?'selected':''}"><span class="homework-letter">${letter}</span><h2 lang="en">${escape(name)}</h2><p>${escape(text)}</p>${button(homework===letter?'✓ Opção escolhida':`Escolher ${letter}`,'homework',`data-option="${letter}" aria-pressed="${homework===letter}"`,'quiet')}</article>`).join('')}</div>`;
    content=title(s)+content;
   }

   return '<section class="lesson-section" data-section-index="'+current+'" data-section-id="'+s.id+'" id="section-'+s.id+'">'+content.replace('id="slide-heading"','id="heading-'+s.id+'"')+'</section>';
 }
 function updateNav(){
   const s=lesson.slides[current];stage.dataset.slideId=s.id;stage.dataset.slideType=s.type;
   document.getElementById('previous').disabled=current===0;
   document.getElementById('next').textContent=current===lesson.slides.length-1?(published?'Concluir aula ✓':'Voltar ao ciclo ↗'):'Próxima seção →';
   document.getElementById('counter').textContent=String(current+1).padStart(2,'0')+' / '+lesson.slides.length;
   document.getElementById('progress').style.width=((current+1)/lesson.slides.length*100)+'%';save();
 }
 function render(){if(musicRoot?.isConnected)musicRoot.remove();stage.innerHTML=renderSection(lesson.slides[current]);document.querySelector('.skip-link').href='#heading-'+lesson.slides[current].id;updateNav();if(lesson.slides[current].type==='music'){if(!musicRoot){const box=document.createElement('div');box.innerHTML=window.MusicClozeV3.renderShell(musicEntry,lesson);musicRoot=box.firstElementChild;musicRoot.querySelector('.lesson-panel-title').textContent='Listen & speak';}document.getElementById('music-slot').append(musicRoot);window.MusicClozeV3.mountAll();}}
 function move(index){if(index<0||index>=lesson.slides.length)return;window.speechSynthesis?.cancel();current=index;render();window.scrollTo({top:0,behavior:'instant'});document.getElementById('heading-'+lesson.slides[index].id)?.focus({preventScroll:true});}
 function indexContents(){const markedOnly=document.getElementById('only-marked').checked;
   const selected=lesson.slides.map((s,i)=>({s,i})).filter(({s})=>!markedOnly||marks.has(s.id));
   document.getElementById('index-items').innerHTML=selected.map(({s,i})=>`<button type="button" class="index-item" data-index="${i}" ${i===current?'aria-current="step"':''}><small>${String(i+1).padStart(2,'0')}</small><strong>${escape(s.title.replace(/\n/g,' '))}</strong>${marks.has(s.id)?'<span>★ Retomar</span>':''}</button>`).join('');
   document.getElementById('empty-marks').hidden=selected.length>0;
 }
 stage.addEventListener('click',event=>{
   const el=event.target.closest('button[data-action]');if(!el)return;
   current=Number(el.closest('[data-section-index]').dataset.sectionIndex);const anchorTop=el.getBoundingClientRect().top;
   const s=lesson.slides[current],st=stateFor(s),a=el.dataset.action;
   const toggle=key=>st.reveals.has(key)?st.reveals.delete(key):st.reveals.add(key);
   if(a==='reveal')toggle(el.dataset.key);
   else if(a==='bookmark'){marks.has(s.id)?marks.delete(s.id):marks.add(s.id);}
   else if(a==='all-models'){const all=s.items.every((_,i)=>st.reveals.has('item-'+i));s.items.forEach((_,i)=>all?st.reveals.delete('item-'+i):st.reveals.add('item-'+i));}
   else if(a==='meanings')st.meanings=!st.meanings;
   else if(a==='item-prev')st.cursor=Math.max(0,st.cursor-1);
   else if(a==='single')st.single=!st.single;
   else if(a==='translations')st.translation=!st.translation;
   else if(a==='select-role'){st.roleIndex=Number(el.dataset.roleIndex);st.reveals.clear();}
   else if(a==='role'){st.role=st.role===el.dataset.role?'':el.dataset.role;[...st.reveals].filter(k=>k.startsWith('line-')).forEach(k=>st.reveals.delete(k));}
   else if(a==='line')toggle(`line-${el.dataset.line}`);
   else if(a==='highlight')st.highlight=Number(el.dataset.line);
   else if(a==='highlight-next')st.highlight=(st.highlight+1)%(s.lines||s.paragraphs).length;
   else if(a==='support')toggle('support');
   else if(a==='rate')ratings[s.id+'-'+el.dataset.check]=Number(el.dataset.rating);
   else if(a==='homework')homework=el.dataset.option;
   const match=Object.entries(el.dataset).map(([k,v])=>`[data-${k.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())}="${CSS.escape(v)}"]`).join('');
   render();const target=document.getElementById('section-'+s.id).querySelector(`button${match}`);if(target&&!target.disabled){window.scrollBy(0,target.getBoundingClientRect().top-anchorTop);target.focus({preventScroll:true});}
 });
 ['musiccloze:skip','musiccloze:complete'].forEach(name=>stage.addEventListener(name,()=>move(lesson.slides.findIndex(s=>s.type==='homework'))));
 document.getElementById('previous').addEventListener('click',()=>move(current-1));
 document.getElementById('next').addEventListener('click',async()=>{if(current!==lesson.slides.length-1){move(current+1);return;}if(!published){location.href=homeUrl;return;}const next=document.getElementById('next');const status=document.getElementById('completion-status');next.disabled=true;status.textContent='Salvando conclusão…';try{if(!window.firebase?.auth().currentUser||!window.db)throw Error('Entre na sua conta e selecione o aluno no portal para salvar a conclusão.');const ok=await window.markLessonAsComplete(moduleId,lesson.id);if(!ok)throw Error('Não foi possível salvar. Confira o aluno selecionado e sua conexão.');}catch(error){status.textContent=error.message;}finally{next.disabled=false;}});
 document.getElementById('open-index').addEventListener('click',()=>{indexContents();dialog.showModal();});
 document.getElementById('close-index').addEventListener('click',()=>dialog.close());
 document.getElementById('only-marked').addEventListener('change',indexContents);
 document.getElementById('index-items').addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b){dialog.close();move(Number(b.dataset.index));}});
 document.getElementById('reset').addEventListener('click',()=>{
  if(!window.confirm('Reiniciar esta aula? As marcações, escolhas e posição desta aula serão apagadas.'))return;
  states.clear();marks.clear();ratings={};homework='';document.getElementById('only-marked').checked=false;dialog.close();current=0;render();move(0);
 });
 document.getElementById('fullscreen').addEventListener('click',async()=>{
  try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{document.getElementById('fullscreen').textContent='Use F11 para ampliar';}
 });
 document.addEventListener('fullscreenchange',()=>document.getElementById('fullscreen').textContent=document.fullscreenElement?'Sair da tela cheia':'Tela cheia');
 document.addEventListener('keydown',event=>{
  if(document.querySelector('#lesson-flashcard-save-modal:not(.hidden)')||dialog.open||event.altKey||event.ctrlKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName))return;
  if(event.key==='ArrowRight'&&current<lesson.slides.length-1){event.preventDefault();move(current+1);}
  if(event.key==='ArrowLeft'){event.preventDefault();move(current-1);}
 });
 render();requestAnimationFrame(()=>move(current));
}());
