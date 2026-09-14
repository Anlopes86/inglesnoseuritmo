// Isolated UI fixture: no Firebase SDK, account credentials, or production writes.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const records = {
    'teacher-demo': {name:'Professor Demo',email:'teacher@example.test',role:'professor',platformPlan:'pro',subscriptionStatus:'active',studentLimit:40},
    'student-demo-1': {name:'Marina Costa',email:'marina@example.test',role:'aluno',teacherId:'teacher-demo',studentType:'a1-v3',modules:['a1-v3','a2-v3','conversation'],accessibleProducts:['a1-v3','a2-v3','conversation'],classCount:6,pacoteContratado:16,valorPacote:700,dataInicioPacote:'01/09/2026',lastClassRegisteredAt:'2026-09-08T17:30:00Z',progress:{'a1-v3':{lesson_1:true,lesson_2:true}}},
    'student-demo-2': {name:'João Almeida',email:'joao@example.test',role:'aluno',teacherId:'teacher-demo',studentType:'a2-v3',modules:['a2-v3'],accessibleProducts:['a2-v3'],classCount:4,pacoteContratado:8,valorPacote:400,dataInicioPacote:'01/09/2026',progress:{}},
    'student-demo-3': {name:'Beatriz Santos',email:'bia@example.test',role:'aluno',teacherId:'teacher-demo',studentType:'b1-v3',modules:['b1-v3'],accessibleProducts:['b1-v3'],classCount:0,progress:{}}
};
const mock = `(() => {
    if(location.port !== '8769') throw Error('Esta prévia só pode abrir na porta local 8769.');
    const records=${JSON.stringify(records)};
    const clone=v=>JSON.parse(JSON.stringify(v));
    const makeDoc=id=>({id,exists:!!records[id],data:()=>clone(records[id]||{}),ref:makeRef(id)});
    const makeRef=id=>({id,get:async()=>makeDoc(id),update:async patch=>{Object.assign(records[id],clone(patch));},set:async()=>{throw Error('Cadastro desativado nesta prévia.');},delete:async()=>{throw Error('Exclusão desativada nesta prévia.');}});
    const query=(conditions=[])=>({where(field,op,value){return query([...conditions,[field,value]]);},async get(){const docs=Object.keys(records).filter(id=>conditions.every(([field,value])=>records[id][field]===value)).map(makeDoc);return{docs,size:docs.length,empty:!docs.length,forEach:cb=>docs.forEach(cb)};}});
    const db={collection:()=>Object.assign(query(),{doc:makeRef}),batch:()=>({update(){},commit:async()=>{}}),async runTransaction(cb){const updates=[];const result=await cb({get:ref=>ref.get(),update:(ref,patch)=>updates.push([ref,patch])});for(const [ref,patch] of updates)await ref.update(patch);return result;}};
    const auth={currentUser:{uid:'teacher-demo',email:'teacher@example.test'},onAuthStateChanged(cb){Promise.resolve().then(()=>cb(auth.currentUser));},signOut:async()=>{}};
    function firestore(){return db;}firestore.FieldValue={serverTimestamp:()=>new Date().toISOString(),arrayUnion:(...values)=>values};firestore.Timestamp={now:()=>new Date()};
    window.firebase={apps:[{}],firestore,auth:()=>auth,app:()=>({options:{}}),initializeApp(){return this;}};
    localStorage.setItem('selectedStudentId','student-demo-1');localStorage.setItem('selectedStudentName','Marina Costa');
})();`;
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
html=html.replace('<head>','<head>\n<base href="/">');
html=html.replace(/<script src="https:\/\/www\.gstatic\.com\/firebasejs\/[^\"]+"><\/script>/g,'');
html=html.replace('<script src="js/firebase-config.js"></script>',`<script>${mock}</script>`);
html=html.replace('<main id="main-content"', '<p style="padding:8px 16px;background:#e0f2fe;color:#075985;font:600 13px Inter,sans-serif;text-align:center">Prévia com alunos fictícios · registros feitos aqui não alteram alunos reais.</p>\n<main id="main-content"');
const output=path.join(root,'artifacts/teacher-panel-audit/fixture.html');fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,html);
console.log('Preview: http://127.0.0.1:8769/artifacts/teacher-panel-audit/fixture.html');
