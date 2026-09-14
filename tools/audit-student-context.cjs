const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=f=>fs.readFileSync(f,'utf8');
function page({uid='teacher',requested='a',profiles,search,selection='b',helperFailure=false}={}) {
 const data=profiles||{teacher:{role:'professor'},admin:{role:'admin'},a:{role:'aluno',teacherId:'teacher'},b:{role:'aluno',teacherId:'teacher'},foreign:{role:'aluno',teacherId:'other'}};
 const writes=[],reads=[],storage=new Map([['selectedStudentId',selection],['loggedInUserRole','admin']]);
 const auth={currentUser:uid?{uid}:null,onAuthStateChanged(){},setPersistence:()=>Promise.resolve()};
 const db={collection:collection=>({doc:id=>({get:async()=>{reads.push(id);return{exists:!!data[id],data:()=>data[id]};},update:async payload=>writes.push({collection,id,payload})})})};
 const location=new URL('http://localhost/a1-v3/licao-01.html'+(search===undefined?'?studentId='+requested:search));
 const document={currentScript:{src:'http://localhost/js/firebase-config.js'},readyState:'loading',addEventListener(){},querySelectorAll:()=>[],createElement:()=>({}),head:{appendChild(script){queueMicrotask(()=>{if(helperFailure){script.onerror();return;}vm.runInContext(source('js/student-context.js'),c);script.onload();});}}};
 const firebase={apps:[{}],app(){},auth:()=>auth,firestore:()=>db};firebase.auth.Auth={Persistence:{LOCAL:'local'}};
 const window={location,firebase,history:{state:null,replaceState(state,title,url){location.href=url;}},V3Curriculum:{getLesson:()=>({id:'stable-lesson',version:'current'})}};
 const c={window,document,firebase,console,URL,URLSearchParams,setTimeout,clearTimeout,localStorage:{getItem:k=>storage.get(k)||null}};vm.createContext(c);
 vm.runInContext(source('js/firebase-config.js'),c);
 vm.runInContext(source('js/progress-manager.js'),c);
 const save=source('js/lesson-flashcard-save.js');vm.runInContext(save.slice(save.indexOf('    async function getCardOwnerId'),save.indexOf('    function getLessonContext')),c);
 return {c,window,auth,data,writes,reads,storage,ready:()=>window.StudentContextReady};
}
(async()=>{
 const a=page({requested:'a'}),b=page({requested:'b'});await Promise.all([a.ready(),b.ready()]);
 a.storage.set('selectedStudentId','b');b.storage.set('selectedStudentId','a');
 assert.equal((await a.c.resolveProgressViewerContext()).studentId,'a');
 assert.equal((await b.c.resolveProgressViewerContext()).studentId,'b');
 assert.equal(await a.c.getCardOwnerId(a.auth.currentUser),'a');
 assert.equal(await a.c.markLessonAsComplete('a1-v3',1),true);assert.equal(a.writes[0].id,'a');
 assert.equal(new URL(a.window.location.href).searchParams.get('studentId'),'a');
 const legacy=page({search:'',selection:'a'});legacy.storage.set('selectedStudentId','b');await legacy.ready();assert.equal((await legacy.c.resolveProgressViewerContext()).studentId,'a');
 const student=page({uid:'a',requested:'foreign'});await student.ready();assert.equal((await student.c.resolveProgressViewerContext()).studentId,'a');assert.deepEqual(student.reads,['a']);
 const admin=page({uid:'admin',requested:'foreign'});await admin.ready();assert.equal((await admin.c.resolveProgressViewerContext()).studentId,'foreign');
 for(const requested of ['foreign','missing','teacher','']){const p=page({requested});await p.ready();await assert.rejects(p.c.resolveProgressViewerContext());assert.equal(p.writes.length,0);}
 const none=page({uid:null});await none.ready();await assert.rejects(none.c.resolveProgressViewerContext());
 const missing=page({uid:'unknown'});await missing.ready();await assert.rejects(missing.c.resolveProgressViewerContext());
 // A previously valid teacher loses the relationship: both save paths must recheck.
 a.data.a.teacherId='other';await assert.rejects(a.c.getCardOwnerId(a.auth.currentUser));await assert.rejects(a.c.resolveProgressViewerContext());
 const changed=page();await changed.ready();await changed.c.resolveProgressViewerContext();changed.auth.currentUser={uid:'admin'};await assert.rejects(changed.c.resolveProgressViewerContext());
 const race=page();await race.ready();const checking=race.window.StudentContext.resolve(race.c.firebase.firestore(),race.auth.currentUser);race.auth.currentUser={uid:'admin'};await assert.rejects(checking);
 const failedHelper=page({helperFailure:true});await assert.rejects(failedHelper.ready());await assert.rejects(failedHelper.c.resolveProgressViewerContext());assert.equal(failedHelper.writes.length,0);
 const cx=await b.ready();const resolved=await b.c.resolveProgressViewerContext();assert.equal(new URL(cx.link('licao-02.html',resolved)).searchParams.get('studentId'),'b');assert.equal(cx.link('https://example.com',resolved),'https://example.com');
 console.log('PASS: two tabs/two students; URL precedence; captured legacy selection; verified roles; own-student access; admin access; denied/missing accounts; changed account and relationship; progress and flashcard owners; context-preserving return links.');
})().catch(e=>{console.error(e);process.exitCode=1;});
