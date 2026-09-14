const fs=require('fs');
const mock = '(' + function(){
    if(location.port!=='8769') throw Error('Prévia isolada');
    const teacher = new URLSearchParams(location.search).get('as')==='teacher';
    const user={uid:teacher?'qa-teacher':'qa-student'};
    const profiles={'qa-teacher':{role:'professor',name:'Professor de teste'},'qa-student':{role:'aluno',name:'Marina de teste',teacherId:'qa-teacher',studentType:'a1-v3',modules:['a1-v3'],classCount:4,pacoteContratado:16,progress:{}}};
    let data;try{data=JSON.parse(sessionStorage.getItem('flashcards-reliability-fixture'));}catch{}
    data=data||{myCards:{one:{f:'to order',b:'pedir — Formas: to order · ordered · ordered — Exemplo: I would like to order a coffee.',l:'Café',module:'a1-v3',source:'lesson-flashcard',curriculumId:'qa-cafe'},two:{f:'receipt',b:'recibo',l:'Café',module:'a1-v3'},three:{f:'bill',b:'conta',l:'Café',module:'a1-v3'}},ratings:{lesson_deleted:{level:'hard',module:'a1-v3'}}};
    let failNext=false;
    const save=()=>sessionStorage.setItem('flashcards-reliability-fixture',JSON.stringify(data));
    const snap=(id,value)=>({id,exists:!!value,data:()=>structuredClone(value)});
    const ref=(kind,id)=>({id,kind,get:async()=>snap(id,data[kind][id]),set:async value=>{data[kind][id]={...data[kind][id],...value};save();},delete:async()=>{delete data[kind][id];save();}});
    const collection=kind=>({doc:id=>ref(kind,id),get:async()=>{const docs=Object.entries(data[kind]).map(([id,value])=>snap(id,value));return {docs,size:docs.length,forEach:cb=>docs.forEach(cb)};}});
    const db={collection:name=>({doc:id=>({get:async()=>snap(id,profiles[id]),collection})}),runTransaction:async cb=>{await new Promise(r=>setTimeout(r,250));if(failNext){failNext=false;document.getElementById('qa-failure').textContent='Simular falha no próximo salvamento';throw Error('Falha simulada');}const writes=[];await cb({get:r=>r.get(),set:(r,value)=>writes.push([r,value])});for(const [r,value] of writes)await r.set(value);}};
    const auth={currentUser:user,onAuthStateChanged:cb=>Promise.resolve().then(()=>cb(user)),signOut:async()=>{}};
    db.batch=()=>{const pending=[];return {delete:r=>pending.push(r),commit:async()=>{if(failNext){failNext=false;throw Error('Falha simulada');}for(const r of pending)delete data[r.kind][r.id];save();}};};
    function firestore(){return db;}firestore.FieldValue={serverTimestamp:()=>new Date().toISOString()};window.firebase={apps:[{}],auth:()=>auth,firestore};window.db=db;
    document.addEventListener('DOMContentLoaded',()=>{
        const banner=document.createElement('aside');banner.style.cssText='padding:10px;text-align:center;background:#e0f2fe;color:#075985;font:13px sans-serif;';banner.textContent='Prévia com dados fictícios · nenhum aluno real é alterado. ';
        const button=document.createElement('button');button.id='qa-failure';button.textContent='Simular falha no próximo salvamento';button.onclick=()=>{failNext=true;button.textContent='Falha simulada preparada';};banner.append(button);document.body.prepend(banner);
        const rewrite=()=>document.querySelectorAll('a[href]').forEach(a=>{const u=new URL(a.href);if(u.origin!==location.origin)return;const page=u.pathname.endsWith('/home-aluno.html')?'portal.html':u.pathname.endsWith('/flashcards-app.html')?'flashcards.html':null;if(!page)return;u.pathname='/artifacts/student-study-audit/'+page;if(teacher)u.searchParams.set('as','teacher');a.href=u.href;});
        setTimeout(()=>{rewrite();const observer=new MutationObserver(rewrite);observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['href']});},0);
    });
}.toString()+')();';
for(const [source,target] of [['home-aluno.html','portal.html'],['flashcards-app.html','flashcards.html']]){
    let html=fs.readFileSync(source,'utf8').replace('<head>','<head><base href="/">');
    html=html.replace(/<script src="https:\/\/www\.gstatic\.com\/firebasejs\/[^\"]+"><\/script>/g,'').replace('<script src="js/firebase-config.js"></script>','<script>'+mock+'</script>');
    fs.mkdirSync('artifacts/student-study-audit',{recursive:true});fs.writeFileSync('artifacts/student-study-audit/'+target,html);
}
console.log('Prévia funcional atualizada, somente com dados fictícios.');
