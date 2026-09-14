const assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
function harness() {
    const el = () => ({ value: '', textContent: '', innerHTML: '', disabled: false, open: false, dataset: {}, attrs: {},
        classList: { values: new Set(), add(...v) { v.forEach(x => this.values.add(x)); }, remove(...v) { v.forEach(x => this.values.delete(x)); }, contains(v) { return this.values.has(v); }, toggle(v,on) { if (on ?? !this.values.has(v)) this.values.add(v); else this.values.delete(v); } },
        setAttribute(k,v) { this.attrs[k]=v; }, querySelector() { return null; }, focus() {}, close() { this.open=false; }, showModal() { this.open=true; }
    });
    const elements = new Proxy({}, {get: (t,k) => t[k] ||= el()});
    const documents = new Map(); let fail=false, writes=0;
    const ref = (kind,id) => ({kind,id,set:async payload=>{if(fail)throw Error('offline');writes++;documents.set(kind+'/'+id,{...documents.get(kind+'/'+id),...payload});}});
    const db = {collection:()=>({doc:()=>({collection:kind=>({doc:id=>ref(kind,id)})})}),batch:()=>{const pending=[];return {delete:r=>pending.push(r),commit:async()=>{if(fail)throw Error('offline');for(const r of pending){documents.delete(r.kind+'/'+r.id);writes++;}}};}};
    const document = {activeElement:{tagName:'DIV'},querySelector:()=>null,querySelectorAll:()=>[]};
    const context = vm.createContext({console:{error(){}},document,db,Date,Set,Map,URL,URLSearchParams,navigator:{},localStorage:{getItem:()=>null,setItem(){}},
        firebase:{firestore:{FieldValue:{serverTimestamp:()=>new Date()}}},window:{setTimeout(){},matchMedia:()=>({matches:false})}});
    const source=fs.readFileSync('js/flashcards-app.js','utf8');
    const end=source.lastIndexOf("    if (document.readyState === 'loading')");
    vm.runInContext(source.slice(0,end)+`globalThis.test={state,elements,normalizeCard,normalizeRating,getProductionMeaning,renderCurrentCard,revealCard,toggleCard,handleKeyboard,saveCardFromDialog,confirmDeleteCard,renderOverviewStats,setup(){populateLessonFilter=()=>{};notify=()=>{};}};})();`,context);
    const a=context.test;a.setup();a.elements['study-deck-meta']=elements['study-deck-meta'];
    for(const id of ['study-card','card-flip-control','card-front-face','card-back-face','card-front-copy','card-back-copy','card-front-language','card-back-language','card-context-front','card-context-back','card-hint','difficulty-pill','rating-panel','answer-panel','answer-input','answer-feedback','check-answer-button','previous-card-button','next-card-button','card-save-button','card-edit-button','card-delete-button','session-progress-label','session-progress-bar','session-seen','session-review','session-mastered','card-dialog','card-front-input','card-back-input','card-category-input','card-dialog-feedback','save-card-button','delete-dialog','delete-card-confirm','reviewed-count','due-count','custom-count','continue-session','screen-study','study-status','card-area','restart-session-button'])a.elements[id]=elements[id];
    Object.assign(a.state,{ready:true,ownerId:'owner',deckId:'CUSTOM',mode:'recognition'});
    const card=a.normalizeCard({id:'lesson_one',f:'to order',b:'pedir — Formas: to order · ordered · ordered — Exemplo: I order lunch.',l:'Café',source:'lesson-flashcard',module:'a1-v3',curriculumId:'stable-id',lesson:7});
    const next=a.normalizeCard({id:'card_two',f:'bill',b:'conta',l:'Café'});
    Object.assign(a.state,{customCards:[card,next],cards:[card,next],filteredCards:[card,next],currentCard:card,queue:[next],sessionTotal:2,seen:new Set([card.key])});
    return {a,elements,documents,context,fail:v=>fail=v,writes:()=>writes};
}
(async()=>{
    const h=harness(),{a,elements:e}=h;
    assert.equal(a.getProductionMeaning(a.state.currentCard),'pedir');
    assert.equal(a.getProductionMeaning({b:'recibo Example: Keep the receipt.'}),'recibo');
    assert.equal(a.getProductionMeaning({b:'plain',meaning:'significado separado'}),'significado separado');
    a.state.mode='production';a.renderCurrentCard();assert.equal(e['card-front-copy'].textContent,'pedir');assert.equal(e['card-back-face'].attrs['aria-hidden'],'true');assert(e['card-back-face'].inert);assert.equal(e['card-flip-control'].tabIndex,-1);
    a.revealCard();assert.equal(e['card-front-face'].attrs['aria-hidden'],'true');assert.equal(e['card-back-copy'].textContent,'to order');assert.equal(e['card-back-face'].inert,false);
    a.renderCurrentCard();assert.equal(a.state.revealed,false);assert.equal(e['card-front-face'].attrs['aria-hidden'],'false');assert.equal(e['card-back-face'].attrs['aria-hidden'],'true');assert(!e['study-card'].classList.contains('is-flipped'));
    a.state.mode='recognition';a.state.revealed=false;a.renderCurrentCard();
    let prevented=0;
    a.handleKeyboard({key:'Enter',target:{closest:()=>e['card-flip-control']},preventDefault(){prevented++;}});assert(a.state.revealed);assert.equal(prevented,1);
    a.handleKeyboard({key:'Enter',target:{closest:()=>({tagName:'BUTTON'})},preventDefault(){throw Error('Native button was hijacked');}});assert(a.state.revealed);
    a.state.ratings={lesson_one:a.normalizeRating({level:'hard',deckId:'CUSTOM'}),lesson_orphan:a.normalizeRating({level:'hard',module:'a1-v3'}),fc_stock:a.normalizeRating({level:'easy',module:'A1'})};
    a.renderOverviewStats();assert.equal(e['reviewed-count'].textContent,'2');assert.equal(e['due-count'].textContent,'1');
    a.state.editingCardId='lesson_one';e['card-front-input'].value='to order';e['card-back-input'].value='pedir comida';e['card-category-input'].value='Pedidos';
    h.fail(true);await a.saveCardFromDialog();assert.equal(a.state.currentCard.b.includes('Formas:'),true);assert.equal(h.writes(),0);
    h.fail(false);await a.saveCardFromDialog();
    const saved=h.documents.get('myCards/lesson_one');assert.equal(saved.source,'lesson-flashcard');assert.equal(saved.curriculumId,'stable-id');assert.equal(saved.lesson,7);assert.equal(saved.meaning,'pedir comida');assert.equal(a.state.currentCard.key,'lesson_one');assert.deepEqual(Array.from(a.state.queue,c=>c.key),['card_two']);assert.equal(a.state.sessionTotal,2);assert.equal(a.state.seen.size,1);assert(a.state.revealed);
    a.state.mode='production';e['answer-input'].value='to order';e['answer-feedback'].textContent='Resposta conferida';e['check-answer-button'].disabled=true;
    a.state.editingCardId='lesson_one';e['card-category-input'].value='Nova categoria';await a.saveCardFromDialog();assert.equal(e['answer-input'].value,'to order');assert.equal(e['answer-feedback'].textContent,'Resposta conferida');assert.equal(e['check-answer-button'].disabled,true);
    a.state.pendingDeleteId='lesson_one';h.documents.set('ratings/lesson_one',{level:'hard'});
    h.fail(true);await a.confirmDeleteCard();assert(h.documents.has('myCards/lesson_one'));assert(h.documents.has('ratings/lesson_one'));assert.equal(a.state.currentCard.key,'lesson_one');
    h.fail(false);await a.confirmDeleteCard();assert(!h.documents.has('myCards/lesson_one'));assert(!h.documents.has('ratings/lesson_one'));assert.equal(a.state.currentCard.key,'card_two');assert.equal(a.state.queue.length,0);assert.equal(a.state.sessionTotal,1);assert.equal(a.state.ratings.lesson_one,undefined);
    const helper=fs.readFileSync('js/lesson-flashcard-save.js','utf8');const begin=helper.indexOf('    function studyFields('),end=helper.indexOf('    function ensureModal',begin);
    vm.runInContext(helper.slice(begin,end)+'globalThis.splitBack=studyFields;',h.context);
    const fields=h.context.splitBack('pedir — Formas: to order · ordered · ordered — Exemplo: I order lunch.');assert.equal(fields.meaning,'pedir');assert.equal(fields.forms,'to order · ordered · ordered');assert.equal(fields.example,'I order lunch.');
    console.log('PASS: production prompts, structured/legacy cards, face accessibility, keyboard controls, orphan statistics, provenance, preserved queue, failed edit, atomic deletion and failed deletion.');
})().catch(error=>{console.error(error);process.exitCode=1;});
