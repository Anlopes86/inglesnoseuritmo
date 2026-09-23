const assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
function setup(storage = new Map(), actor = 'teacher', owner = 'student-A') {
    const element = () => ({value:'',textContent:'',disabled:false,dataset:{},style:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){}});
    const elements = new Proxy({}, {get:(t,k)=>t[k] ||= element()});
    let unavailable=false, warnings=0;
    const store={getItem:k=>storage.get(k)||null,setItem:(k,v)=>{if(unavailable)throw Error('quota');storage.set(k,v);},removeItem:k=>storage.delete(k)};
    const context=vm.createContext({console,Date,URLSearchParams,URL,localStorage:store,sessionStorage:{getItem:()=>null,removeItem(){},setItem(){}},navigator:{},document:{querySelectorAll:()=>[]},window:{},});
    const source=fs.readFileSync('js/flashcards-app.js','utf8'),end=source.lastIndexOf("    if (document.readyState === 'loading')");
    vm.runInContext(source.slice(0,end)+`globalThis.app={state,elements,normalizeCard,readSavedSession,persistStudySession,restoreStudySession,restorePendingReview,lastSessionDeck,resetSession,
      setup(warn){notify=warn;syncModeControls=()=>{};populateLessonFilter=()=>{};updateSessionStats=()=>{};showStudyScreen=()=>{};
        renderCurrentCard=()=>{state.revealed=false;elements['answer-input'].value='';elements['check-answer-button'].disabled=false;};renderSessionComplete=()=>{state.currentCard=null;};}};})();`,context);
    const app=context.app;app.setup(()=>warnings++);
    for(const id of ['answer-input','answer-feedback','check-answer-button','search-filter','lesson-filter','difficulty-filter','session-size-filter','study-card','rating-panel','card-hint','retry-review-save','study-deck-name','study-deck-meta','custom-card-cta','review-save-error','cloud-status-label'])app.elements[id]=elements[id];
    elements['search-filter'].value='';elements['lesson-filter'].value='Aula';elements['difficulty-filter'].value='all';elements['session-size-filter'].value='10';
    const cards=['one','two','three'].map((id,i)=>app.normalizeCard({id,f:['hello','bye','thanks'][i],b:['olá','tchau','obrigado'][i],l:'Aula'}));
    Object.assign(app.state,{user:{uid:actor},ownerId:owner,ready:true,deckId:'CUSTOM',mode:'production',sessionActive:true,customCardsLoaded:true,
        cards,customCards:cards,filteredCards:cards,currentCard:cards[1],history:[cards[0]],queue:[cards[2]],seen:new Set(['one','two']),sessionTotal:3,
        sessionRatings:{hard:1,medium:0,easy:0},sessionFilters:{query:'',lesson:'Aula',difficulty:'all',size:'10'}});
    return {app,elements,storage,fail:()=>unavailable=true,warnings:()=>warnings};
}
(async()=>{
    const first=setup();first.elements['answer-input'].value='by';first.app.persistStudySession();
    const restored=setup(first.storage);assert.equal(restored.app.lastSessionDeck(),'CUSTOM');
    assert(restored.app.restoreStudySession(restored.app.readSavedSession('CUSTOM')));
    assert.equal(restored.app.state.currentCard.key,'two');assert.deepEqual(Array.from(restored.app.state.queue,c=>c.key),['three']);assert.deepEqual(Array.from(restored.app.state.history,c=>c.key),['one']);
    assert.equal(restored.app.state.sessionTotal,3);assert.equal(restored.app.state.seen.size,2);assert.equal(restored.app.state.sessionRatings.hard,1);assert.equal(restored.elements['answer-input'].value,'by');assert.equal(restored.elements['lesson-filter'].value,'Aula');
    assert.equal(setup(first.storage,'teacher','student-B').app.readSavedSession('CUSTOM'),null);
    assert.equal(setup(first.storage,'another-teacher','student-A').app.readSavedSession('CUSTOM'),null);
    assert.equal(restored.app.readSavedSession('A1_V3'),null);
    const edited=setup(first.storage);edited.app.state.cards[1]={...edited.app.state.cards[1],f:'goodbye'};edited.app.restoreStudySession(edited.app.readSavedSession('CUSTOM'));assert.equal(edited.elements['answer-input'].value,'');
    const removed=setup(first.storage);removed.app.state.cards=removed.app.state.cards.filter(c=>c.key!=='two');removed.app.restoreStudySession(removed.app.readSavedSession('CUSTOM'));assert.equal(removed.app.state.currentCard.key,'three');assert.equal(removed.app.state.sessionTotal,2);assert.equal(removed.app.state.seen.size,2);
    const pending=setup();pending.app.state.revealed=true;pending.elements['answer-input'].value='bye';pending.elements['check-answer-button'].disabled=true;
    pending.app.state.pendingReview={eventId:'stable-attempt',level:'easy',card:pending.app.state.currentCard,nextReviewAt:new Date().toISOString()};pending.app.persistStudySession();
    const retry=setup(pending.storage);await retry.app.restorePendingReview();assert.equal(retry.app.state.pendingReview.eventId,'stable-attempt');assert.equal(retry.app.state.currentCard.key,'two');assert.equal(retry.app.state.queue[0].key,'three');assert.equal(retry.app.state.history[0].key,'one');assert.equal(retry.app.state.sessionTotal,3);assert(retry.app.state.revealed);
    const unavailable=setup(new Map(pending.storage));unavailable.app.state.customCardsLoaded=false;await assert.rejects(()=>unavailable.app.restorePendingReview(),/sincronizada/);assert(unavailable.app.readSavedSession('CUSTOM').pending);
    const updatedPending=setup(new Map(pending.storage));updatedPending.app.state.customCards[1].f='goodbye';await updatedPending.app.restorePendingReview();assert.equal(updatedPending.app.state.pendingReview,null);assert.equal(updatedPending.app.readSavedSession('CUSTOM').pending,null);
    first.app.state.currentCard=null;first.app.state.queue=[];first.app.state.history=first.app.state.cards;first.app.persistStudySession();
    const complete=setup(first.storage);complete.app.restoreStudySession(complete.app.readSavedSession('CUSTOM'));assert.equal(complete.app.state.currentCard,null);assert.equal(complete.app.state.sessionTotal,3);
    const bad=setup(new Map([['flashcardsSessionV1:teacher:student-A:CUSTOM','{']]));assert.equal(bad.app.readSavedSession('CUSTOM'),null);
    const blocked=setup();blocked.fail();blocked.app.persistStudySession();blocked.app.persistStudySession();assert.equal(blocked.warnings(),1);
    console.log('PASS: durable session, queue/history/filters/draft, owner and actor isolation, edited/deleted cards, full pending session, unavailable library, completion, corrupt data and storage failure.');
})().catch(error=>{console.error(error);process.exitCode=1;});
