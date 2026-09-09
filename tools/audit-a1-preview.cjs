const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'artifacts/a1-preview');
(async()=>{
 global.window={};require('../js/v3-curriculum.js');require('../a1-v3/a1-v3-lesson-registry.js');
 for(const slug of ['at-the-cafe','my-everyday-life','a-day-in-my-life'])require('../a1-v3/lesson-data/preview-'+slug+'.js');
 assert.equal(window.V3Curriculum.getModule('a1-v3').length,38);assert.equal(Object.keys(window.A1V3_DATA.lessons).length,0);
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined),headless:true});
 fs.mkdirSync(out,{recursive:true});const errors=[],results=[];
 try{const page=await browser.newPage({viewport:{width:1366,height:768}});page.on('pageerror',e=>errors.push(e.message));
 async function go(index){await page.locator('#open-index').click();await page.locator('#only-marked').uncheck();await page.locator('[data-index="'+index+'"]').click();assert.equal(await page.locator('.lesson-section').count(),1);assert.equal(await page.evaluate(()=>scrollY),0);}
 for(const m of window.V3Curriculum.a1PreviewLessons.filter(m=>m.lessonKind==='lexical')){
 const l=window.A1V3LessonRegistry.getPreview(m.id),url=pathToFileURL(path.join(root,'a1-v3/preview/aula.html')).href+'?aula='+m.slug;
 await page.goto(url);assert.equal(await page.locator('.lesson-section').count(),1);assert.equal(l.slides[0].type,'dialogue');assert.equal(l.slides[0].id,'opening');
 assert.equal(await page.locator('[data-action="item-next"]').count(),0,'No sentence-by-sentence navigation');
 assert.equal(await page.locator('.answer:visible').count(),0);
 const ids=await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id));assert.equal(ids.length,new Set(ids).size,'All DOM IDs unique');
 for(const s of l.slides){await go(l.slides.indexOf(s));const section=page.locator('#section-'+s.id);
 if(s.type==='cards'){
  const entries=s.cards||(s.groups||[]).flatMap(g=>g.cards);assert.equal(await section.locator('.reference-row').count(),entries.length);
  assert.equal(await section.locator('.meaning').count(),entries.length,'Definitions visible by default');
  await section.locator('[data-action="meanings"]').click();assert.equal(await section.locator('.meaning').count(),0);
  await section.locator('[data-action="meanings"]').click();assert.equal(await section.locator('.meaning').count(),entries.length);
 }else if(s.type==='patterns'){assert.equal(await section.locator('[data-action="reveal"]').count(),0);assert(await section.locator('.meaning').count()>0);}
 else if(s.type==='verbs'){assert.equal(await section.locator('tbody tr').count(),s.cards.length);assert.equal(await section.locator('[data-action="reveal"]').count(),0);}
 if(s.items){
  assert.equal(await section.locator('.exercise-row').count(),s.items.length,'Every prompt in the list');
  const one=section.locator('[data-key="item-0"]');await one.click();assert.equal(await section.locator('.answer:visible').count(),1);
  assert.equal(await section.locator('.answer:visible').innerText(),s.items[0][1]);await one.click();
  await section.locator('[data-action="all-models"]').click();assert.equal(await section.locator('.answer:visible').count(),s.items.length);
  await section.locator('[data-action="all-models"]').click();assert.equal(await section.locator('.answer:visible').count(),0);
 }
 if(s.type==='dialogue'){
  await section.locator('[data-role="A"]').click();assert.equal(await section.locator('.concealed').count(),s.lines.filter(x=>x[0]==='A').length);
  await section.locator('[data-role="A"]').click();await section.locator('[data-action="translations"]').click();assert.equal(await section.locator('.line-translation').count(),s.lines.length);
  await section.locator('[data-action="translations"]').click();
 }
 if(s.type==='reading'){assert(await section.locator('.paragraph').count()>0);assert.equal(await section.locator('.exercise-row').count(),s.items.length,'Questions beside their source section');}
 }
 const drill=l.slides.find(s=>s.type==='drill');const ds=page.locator('#section-'+drill.id);
 await go(l.slides.indexOf(drill));await ds.locator('[data-key="item-0"]').click();const other=l.slides.find(s=>s.items&&s.id!==drill.id);await go(l.slides.indexOf(other));assert.equal(await page.locator('.answer:visible').count(),0,'No cross-section answer leakage');await go(l.slides.indexOf(drill));assert.equal(await ds.locator('.answer:visible').count(),1,'Returning preserves the revealed model');
 await ds.locator('[data-action="bookmark"]').click();await page.locator('#open-index').click();await page.locator('#only-marked').check();assert.equal(await page.locator('.index-item').count(),1);await page.locator('.index-item').click();
 assert.equal(await ds.count(),1,'Index opens selected section');await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#stage').getAttribute('data-slide-id'),l.slides[l.slides.indexOf(drill)+1].id);await page.keyboard.press('ArrowLeft');assert.equal(await ds.count(),1);
 await page.reload();assert.equal(await page.locator('.answer:visible').count(),0,'Reload hides answer models');
 for(const id of ['opening',l.slides.find(s=>s.type==='cards')?.id,drill.id]){if(!id)continue;await go(l.slides.findIndex(s=>s.id===id));await page.screenshot({path:path.join(out,m.slug+'-page-'+id+'.png')});}
 await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No mobile horizontal page overflow');await page.screenshot({path:path.join(out,m.slug+'-page-mobile.png')});await page.setViewportSize({width:1366,height:768});
 results.push({lesson:m.title,sections:l.slides.length,vocabulary:l.slides.filter(s=>s.type==='cards'&&s.id!=='expressions').reduce((n,s)=>n+(s.cards||s.groups.flatMap(g=>g.cards)).length,0),expressions:l.slides.find(s=>s.id==='expressions')?.cards.length||0});
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'page-results.json'),JSON.stringify(results,null,2));console.log('PASS: one section per slide, opening dialogs, visible reference, all drill prompts, individual/bulk answers, scoped states, reading/questions, roles, index/bookmarks, reload, mobile.');console.log(JSON.stringify(results));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
