// Read-only course inventory. Writes evidence only under artifacts/commercial-readiness.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const c = {window: {}, console}; vm.createContext(c);
const files = ['js/v3-curriculum.js','a1-v3/a1-v3-lesson-registry.js',
 ...Array.from({length:38},(_,i)=>`a1-v3/lesson-data/licao-${String(i+1).padStart(2,'0')}.js`),
 'a2-v3/a2-v3-template.js','a2-v3/a2-v3-conversation-template.js','a2-v3/a2-v3-consolidation-template.js','a2-v3/a2-v3-presentation-data.js',
 'js/b1-v3-lessons-data.js',...['1a','1b','2a','2b','3a','3b','4a','4b'].map(b=>`js/b1-v3-lessons-block${b}.js`),
 'b1-v3/b1-v3-presentation-data.js','b1-v3/b1-v3-communicative-data.js',
 'js/advanced-v3-lessons-data.js','js/music-catalog-v3.js'];
for(const f of files) vm.runInContext(read(f), c, {filename:f});
// The old B1 player loads the curriculum adapter in its own page context.
const legacy={window:{V3Curriculum:c.window.V3Curriculum},console};vm.createContext(legacy);
for(const f of files.filter(f=>/^js\/b1-v3-lessons/.test(f)).concat('js/v3-curriculum-adapters.js'))vm.runInContext(read(f),legacy,{filename:f});
const w=c.window, rows=[], missingRefs=[];
for(const module of ['a1-v3','a2-v3','b1-v3','b2-v3','c1-v3']) {
 for(const m of w.V3Curriculum.getModule(module)) {
  const file=`${module}/licao-${String(m.number).padStart(2,'0')}.html`, html=read(file);
  const player=html.includes('/v3-presentation.js')?'presentation':html.includes('/b1-v3-lesson-player.js')?'b1-legacy':'advanced';
  const registry=module==='a1-v3'?w.A1V3LessonRegistry:module==='a2-v3'?w.A2V3PresentationRegistry:w.B1V3PresentationRegistry;
  const data=player==='presentation'?registry?.get(m.number):player==='b1-legacy'?legacy.window.B1_V3_LESSONS.find(l=>l.number===m.number):w.AdvancedV3Lessons[module].find(l=>l.number===m.number);
  const slides=data?.slides||[];
  const cards=type=>slides.filter(s=>s.type===type).flatMap(s=>s.cards||s.items||[]);
  rows.push({module,number:m.number,id:m.id,title:m.title,kind:m.lessonKind,type:m.type,player,
   music:!!w.MusicCatalogV3.getForCurriculumId(m.id),
   helperSave:html.includes('lesson-flashcard-save.js'),helperPronounce:html.includes('flashcard-pronunciation.js'),theme:html.includes('theme'),
   sectionTypes:slides.map(s=>s.type),sectionTitles:slides.map(s=>s.title),
   openingLines:slides[0]?.type==='dialogue'?slides[0].lines?.length:null,
   vocabularyCount:slides.find(s=>s.id==='vocabulary')?.cards?.length,
   verbs:cards('verbs').map(x=>Array.isArray(x)?x[0]:x.term||x.base),
   verbExamples:cards('verbs').map(x=>({term:x[0],example:x[2]||''})),
   advancedReadingWords:data?.input?.paragraphs?.join(' ').split(/\s+/).length,
   advancedExamples:data?.language?.examples,advancedChunkMeanings:data?.chunks?.map(x=>x.meaning),
   rubric:m.rubric||data?.rubric||null});
  for(const match of html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) {
   const ref=match[1];if(/^(?:https?:|data:|mailto:|tel:|#|javascript:)/.test(ref))continue;
   const bare=decodeURIComponent(ref.split(/[?#]/)[0]);if(!bare)continue;
   const target=path.resolve(path.dirname(path.join(root,file)),bare);
   if(!fs.existsSync(target))missingRefs.push({file,ref});
  }
 }
}
const summary=['a1-v3','a2-v3','b1-v3','b2-v3','c1-v3'].map(module=>{
 const items=rows.filter(r=>r.module===module);
 const count=key=>Object.fromEntries([...new Set(items.map(x=>x[key]))].map(v=>[String(v),items.filter(x=>x[key]===v).length]));
 return{module,total:items.length,kinds:count('kind'),players:count('player'),music:items.filter(x=>x.music).length,saveHelper:items.filter(x=>x.helperSave).length,pronunciationHelper:items.filter(x=>x.helperPronounce).length,themeScript:items.filter(x=>x.theme).length};
});
const out=path.join(root,'artifacts/commercial-readiness');fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'inventory.json'),JSON.stringify({date:'2026-09-12',summary,missingRefs,lessons:rows},null,2));
console.log(JSON.stringify({summary,missingRefs,registries:Object.keys(w).filter(x=>/Registry/.test(x))},null,2));
