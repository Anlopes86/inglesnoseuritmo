// Inspect the actual presentation sources, rather than the retained legacy CA fields.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
function load(moduleId){
 const context={window:{},console};vm.createContext(context);
 const files=['js/v3-curriculum.js'];
 if(moduleId==='a1-v3')files.push('a1-v3/a1-v3-lesson-registry.js',...Array.from({length:12},(_,i)=>`a1-v3/lesson-data/licao-${String((i+1)*3).padStart(2,'0')}.js`));
 if(moduleId==='a2-v3')files.push('a2-v3/a2-v3-template.js','a2-v3/a2-v3-conversation-template.js','a2-v3/a2-v3-consolidation-template.js','a2-v3/a2-v3-presentation-data.js');
 if(moduleId==='b1-v3')files.push('js/b1-v3-lessons-data.js','b1-v3/b1-v3-presentation-data.js','b1-v3/b1-v3-communicative-data.js');
 for(const f of files)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),context,{filename:f});
 return context.window;
}
const inventory=[];
for(const moduleId of ['a1-v3','a2-v3','b1-v3']){
 const w=load(moduleId),registry=w.V3PresentationRegistry||w.A1V3LessonRegistry;
 const manifest=w.V3Curriculum.getModule(moduleId),lessons=manifest.filter(m=>m.lessonKind==='communicative');
 for(const m of lessons){
  const l=registry.get(m.number),label=`${moduleId} ${m.number}`,slides=l.slides;
  assert.equal(l.title,m.title,label+' title');assert(l.editorialRevision,label+' revision');
  assert(slides.length>=5,label+' substantial activities');assert.equal(slides.at(-1).type,'homework');
  assert.equal(slides.at(-1).options.length,3,label+' homework choices');
  assert.equal(new Set(slides.map(s=>s.id)).size,slides.length,label+' stable section IDs');
  assert(slides.some(s=>['reading','dialogue','cloze'].includes(s.type)),label+' contextual input');
  assert(slides.some(s=>['conversation','survey'].includes(s.type)),label+' oral participation');
  assert(new Set(slides.filter(s=>s.type!=='homework').map(s=>s.type)).size>=3,label+' variety');
  assert(!slides.some(s=>['music','verbs','drill'].includes(s.type)),label+' communicative character');
  if(moduleId!=='a1-v3')assert.equal(l.sourceLesson,m.number-1,label+' lexical link');
  for(const s of slides){
   const at=label+' '+s.id;assert(s.title&&s.instruction,at+' instructions');
   if(s.items)for(const item of s.items)assert(item.length===2&&item.every(x=>typeof x==='string'&&x.trim()),at+' question/answer');
   if(s.type==='matching'){
    assert(s.options.length>=2&&s.items.length>=2,at+' choices');
    for(const [,answer] of s.items){const letter=answer.match(/^([A-Z])\s*[—–.-]/);assert(letter,at+' answer letter: '+answer);assert(letter[1].charCodeAt(0)-65<s.options.length,at+' answer index');}
   }
   if(s.type==='cloze'){
    const blanks=s.paragraphs.join(' ').match(/\(\d+\)\s*_+/g)||[];
    assert.equal(blanks.length,s.items.length,at+' one answer per numbered blank');
   }
   if(s.type==='survey'){assert(s.prompts.length>=3&&s.options.length>=2,at+' survey options');assert(s.followUp,at+' discussion');assert(!s.items,at+' opinions have no answer key');}
   if(s.type==='reading'){assert(s.paragraphs.length>=1&&s.items?.length>=2,at+' full reading and interpretation');for(const [name,url]of s.sources||[])assert(name&&/^https:\/\//.test(url),at+' source');}
  }
  inventory.push({module:moduleId,number:m.number,title:m.title,sections:slides.map(s=>({title:s.title,type:s.type})),sources:slides.flatMap(s=>s.sources||[])});
 }
 console.log(`${moduleId}: ${lessons.length} active communicative lessons verified.`);
}
assert.equal(inventory.length,42);
if(process.argv.includes('--inventory'))console.log(JSON.stringify(inventory,null,2));
console.log('PASS: 42 active CA sources, curriculum links, contextual input, varied formats, complete answer keys and homework.');
module.exports={load,inventory};
