const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('js/flashcards-app.js', 'utf8');
function setup(storage = new Map(), documents = new Map()) {
    const controls = [{ disabled: false }, { disabled: true }];
    const element = () => ({ disabled: false, textContent: '', classList: { add() {}, remove() {}, toggle() {} } });
    const elements = new Proxy({}, { get: (t, k) => t[k] ||= element() });
    const store = { getItem: k => storage.get(k) || null, setItem: (k,v) => storage.set(k,v), removeItem: k => storage.delete(k) };
    let profile = {uid: 'teacher', role: 'professor'}, requestedAccess = [], allowed = true, release = null, failure = '', writes = 0;
    const ref = id => ({id});
    const db = {collection: () => ({doc: () => ({collection: () => ({doc: ref})})}), runTransaction: async callback => {
        if (failure === 'before') throw Error('offline');
        if (failure === 'delay') await new Promise(resolve => {release = resolve;});
        const pending = [];
        await callback({ get: async r => ({exists: documents.has(r.id), data: () => documents.get(r.id)}), set: (r,data) => pending.push([r.id,data]) });
        for (const [id,data] of pending) {documents.set(id,data);writes++;}
        if (failure === 'after') throw Error('response lost after commit');
    }};
    const access = {getCurrentProfile: async () => profile, isManager: p => ['professor','admin'].includes(p.role), assertStudentAccess: async (db,p,id) => {requestedAccess.push(id);return {ok: allowed};}};
    const context = {console:{error(){}}, Date, URLSearchParams, URL, crypto:require('node:crypto').webcrypto,
        localStorage:store, sessionStorage:store, document:{querySelectorAll:()=>controls}, navigator:{}, db,
        firebase:{auth:()=>({}),firestore:{FieldValue:{serverTimestamp:()=>new Date()}}},
        window:{PlatformAccess:access,location:{search:'?studentId=student-A'},speechSynthesis:{cancel(){}}}};
    vm.createContext(context);
    const end = source.lastIndexOf("    if (document.readyState === 'loading')");
    vm.runInContext(source.slice(0,end) + 'globalThis.audit={state,elements,isDue,nextReviewDate,getManagedOwnerId,rateCurrentCard,restorePendingReview,showNextCard,showPreviousCard,resetSession,applyFilters,normalizeCard,setup(){populateLessonFilter=()=>{};syncModeControls=()=>{};updateSessionStats=()=>{};renderCurrentCard=()=>{};renderSessionComplete=()=>{};hapticFeedback=()=>{};showStudyScreen=()=>{};notify=()=>{};}};})();',context);
    const app=context.audit;app.setup();Object.assign(app.elements,elements);
    for(const id of ['retry-review-save','review-save-error','cloud-status-label','study-deck-name','study-deck-meta','custom-card-cta','rating-panel','study-card','card-hint']) app.elements[id]=element();
    app.state.ready=true;app.state.ownerId='student-A';app.state.deckId='CUSTOM';app.state.revealed=true;
    app.state.currentCard=app.normalizeCard({id:'one',f:'hello',b:'olá',l:'Aula'});
    app.state.queue=[app.normalizeCard({id:'two',f:'bye',b:'tchau',l:'Aula'})];
    return {app,storage,documents,controls,context,requests:requestedAccess,setProfile:p=>profile=p,deny:()=>allowed=false,fail:v=>failure=v,release:()=>release(),writes:()=>writes};
}
(async()=>{
    const test=setup(),A=test.app;
    assert.equal(A.isDue({level:'hard',nextReviewAt:A.nextReviewDate('hard')}),false);
    assert.equal(A.isDue({level:'hard',nextReviewAt:new Date(Date.now()-1)}),true);
    assert.equal(A.isDue({level:'hard',nextReviewAt:null}),true);
    assert.equal(A.isDue({level:'easy',nextReviewAt:A.nextReviewDate('easy')}),false);
    test.storage.set('loggedInUserRole','aluno');test.storage.set('selectedStudentId','student-B');
    assert.equal(await A.getManagedOwnerId({uid:'teacher'}),'student-A');assert.deepEqual(test.requests,['student-A']);
    test.deny();await assert.rejects(()=>A.getManagedOwnerId({uid:'teacher'}),/não tem acesso/);
    test.setProfile({uid:'actual-student',role:'aluno'});assert.equal(await A.getManagedOwnerId({uid:'actual-student'}),'actual-student');
    test.fail('delay');const first=A.rateCurrentCard('easy');const repeated=A.rateCurrentCard('easy');
    assert.equal(A.state.savingReview,true);assert(test.controls.every(c=>c.disabled));
    A.showNextCard();A.showPreviousCard();A.resetSession();A.applyFilters();assert.equal(A.state.currentCard.key,'one');
    test.release();await Promise.all([first,repeated]);assert.equal(test.writes(),1);assert.equal(A.state.sessionRatings.easy,1);assert.equal(A.state.currentCard.key,'two');assert.equal(test.controls[0].disabled,false);assert.equal(test.controls[1].disabled,true);
    const failed=setup();failed.fail('before');await failed.app.rateCurrentCard('hard');
    assert.equal(failed.app.state.currentCard.key,'one');assert.equal(failed.app.state.sessionRatings.hard,0);assert.equal(failed.writes(),0);assert(failed.storage.get('flashcardsPendingReview:student-A'));
    const restored=setup(failed.storage,failed.documents);restored.app.restorePendingReview();assert.equal(restored.app.state.currentCard.key,'one');assert(restored.app.state.revealed);assert.equal(restored.app.state.pendingReview.level,'hard');
    await restored.app.rateCurrentCard('hard');assert.equal(restored.writes(),1);assert.equal(restored.app.state.sessionRatings.hard,1);assert.equal(restored.storage.get('flashcardsPendingReview:student-A'),undefined);
    const ambiguous=setup();ambiguous.fail('after');await ambiguous.app.rateCurrentCard('medium');assert.equal(ambiguous.writes(),1);assert(ambiguous.app.state.pendingReview);
    ambiguous.fail('');await ambiguous.app.rateCurrentCard('medium');assert.equal(ambiguous.writes(),1);assert.equal(ambiguous.documents.get('one').reviewCount,1);assert.equal(ambiguous.app.state.currentCard.key,'two');
    console.log('PASS: due dates, verified owner, stale selection, access denial, duplicate clicks, locked navigation, failed writes, reload recovery and idempotent retry.');
})().catch(error=>{console.error(error);process.exitCode=1;});
