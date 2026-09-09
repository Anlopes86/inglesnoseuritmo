const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
(async()=>{const root=path.resolve(__dirname,'..'),out=path.join(root,'artifacts/a2-presentation/migration-32');fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});try{
const page=await browser.newPage({viewport:{width:1366,height:900}});await page.route('**/*',r=>/^https?:/.test(r.request().url())?r.fulfill({body:'',contentType:'application/javascript'}):r.continue());let errors=[];page.on('pageerror',e=>errors.push(e.message));const results=[];
for(let n=1;n<=32;n++){errors=[];await page.goto(pathToFileURL(path.join(root,'a2-v3/licao-'+String(n).padStart(2,'0')+'.html')).href);
const data=await page.evaluate(n=>({lesson:A2V3PresentationRegistry.get(n),manifest:V3Curriculum.getModule('a2-v3')[n-1]}),n);
await page.locator('#open-index').click();const count=await page.locator('[data-index]').count();await page.locator('#close-index').click();
assert.equal(count,data.lesson.slides.length+(data.manifest.lessonKind==='lexical'?1:0));
for(let i=0;i<count;i++){
assert.equal(await page.locator('.lesson-section').count(),1,'one section L'+n);assert.equal(await page.locator('#counter').innerText(),String(i+1).padStart(2,'0')+' / '+count);
const section=page.locator('.lesson-section'),id=await page.locator('#stage').getAttribute('data-slide-id');
assert(!(await section.innerText()).includes('undefined'),'undefined L'+n);
if(await section.locator('[data-key="item-0"]').count()){await section.locator('[data-key="item-0"]').click();assert(await section.locator('.answer:visible').count());}
if(id==='roleplay'){const roles=section.locator('[data-action="select-role"]');assert.equal(await roles.count(),2);const first=await section.locator('.board').innerText();await roles.nth(1).click();assert.notEqual(await section.locator('.board').innerText(),first);await roles.nth(0).click();assert.equal(await section.locator('.board').innerText(),first);}
if(['vocabulary','verbs','expressions','recycle','toolbox'].includes(id)){assert(await section.locator('.lesson-flashcard-save-btn').count()>0,'Save '+id);assert(await section.locator('.flashcard-pronounce-btn').count()>0,'Hear '+id);}
if(id==='verbs'){const verbs=await section.locator('tbody tr td:first-child').allTextContents();assert(verbs.every(t=>t.trim().startsWith('to ')),'Infinitives L'+n);}
if(data.manifest.lessonKind==='lexical'&&i===count-2)assert.equal(id,'music');
if([1,2,17,18,29,30,31,32].includes(n)&&[0,1,count-1].includes(i))await page.screenshot({path:path.join(out,'lesson-'+n+'-'+id+'.png')});
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'desktop overflow L'+n+' '+id);
if(i<count-1)await page.locator('#next').click();
}
assert.equal(await page.locator('#stage').getAttribute('data-slide-id'),'homework');await page.locator('#next').click();assert(await page.locator('#completion-status').innerText(),'Offline completion feedback');
await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'mobile overflow L'+n);await page.setViewportSize({width:1366,height:900});assert.deepEqual(errors,[],'JS L'+n);results.push({number:n,sections:count,kind:data.manifest.lessonKind});console.log('L'+n+' '+count+' sections OK');
}
await page.locator('#theme-toggle').click();const theme=await page.locator('html').getAttribute('data-theme');await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),theme);await page.screenshot({path:path.join(out,'dark-homework.png')});fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.log('PASS: 32 lessons, all sections, answers, music ordering, infinitives, offline completion, theme persistence and responsive width.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
