const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
(async()=>{
 const root=path.resolve(__dirname,'..'),out=path.resolve(process.env.V3_UI_ARTIFACTS||path.join(root,'artifacts/communicative-redesign'));fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const results=[];
 try{for(const [moduleId,n]of [['a1-v3',6],['a1-v3',21],['a1-v3',24],['a1-v3',27],['a2-v3',22],['b1-v3',22],['b1-v3',24]]){
  const page=await browser.newPage({viewport:{width:1366,height:900}}),errors=[];
  await page.route('**/*',r=>/^https?:/.test(r.request().url())?r.fulfill({body:'',contentType:'application/javascript'}):r.continue());
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.join(root,moduleId,`licao-${String(n).padStart(2,'0')}.html`)).href);
  const slides=await page.evaluate(n=>(window.V3PresentationRegistry||window.A1V3LessonRegistry).get(n).slides,n);
  for(let i=0;i<slides.length;i++){
   const s=slides[i],label=`${moduleId}-${n}-${s.id}`;
   assert.equal(await page.locator('#stage').getAttribute('data-slide-id'),s.id,label);
   const answers=page.locator('.answer:visible');assert.equal(await answers.count(),0,label+' starts concealed');
   if(['matching','cloze'].includes(s.type)){
    await page.locator('[data-key="item-0"]').click();assert.equal(await answers.count(),1,label+' individual answer');
    await page.locator('[data-action="all-models"]').click();assert.equal(await answers.count(),s.items.length,label+' full answer key');
    await page.locator('[data-action="all-models"]').click();assert.equal(await answers.count(),0,label+' conceal key');
   }
   if(s.type==='survey'){
    const a=page.locator('[data-action="survey-choice"][data-question="0"]');
    await a.nth(0).click();await a.nth(1).click();assert.equal(await a.nth(0).getAttribute('aria-pressed'),'false');assert.equal(await a.nth(1).getAttribute('aria-pressed'),'true');
    await page.locator('[data-action="survey-choice"][data-question="1"]').first().click();
    await page.locator('#next').click();await page.locator('#previous').click();assert.equal(await a.nth(1).getAttribute('aria-pressed'),'true',label+' keep opinion while navigating');
    assert.equal(await page.locator('[data-action="survey-choice"][aria-pressed="true"]').count(),2,label+' independent answers');
   }
   if(s.type==='registration-form'){
    const fields=page.locator('[data-registration-field]');
    const confirm=page.getByRole('button',{name:'Conferir ficha após a leitura'});
    await confirm.click();
    assert.equal(await page.locator('.live-result').count(),0,label+' requires filled fields');
    for(const [index,value] of ['Lia Park','designer','North Studio','lia@example.test'].entries())await fields.nth(index).fill(value);
    await confirm.click();
    assert.equal(await page.locator('.live-result').count(),1,label+' feedback after confirmation');
    assert.equal(await fields.nth(3).inputValue(),'lia@example.test');
    await page.getByRole('button',{name:'Trocar os papéis'}).click();
    assert.equal(await fields.nth(0).inputValue(),'',label+' starts a new form on role swap');
   }
   if(s.type==='message-relay'){
    await page.setViewportSize({width:1024,height:640});
    assert.equal(await page.getByText(s.cases[0].update,{exact:true}).count(),0,label+' update withheld');
    await page.locator('[data-key="relay-update"]').click();
    assert.equal(await page.getByText(s.cases[0].update,{exact:true}).count(),1,label+' update follows the question');
    assert(await page.locator('.live-workbench').evaluate(el=>el.getBoundingClientRect().bottom<=document.querySelector('.bottombar').getBoundingClientRect().top),label+' both notices fit');
    await page.locator('[data-key="relay-model"]').click();
    assert.equal(await page.getByText(s.cases[0].model,{exact:true}).count(),1,label+' one possible response');
    await page.locator('[data-action="relay-case"]').nth(1).click();
    assert.equal(await answers.count(),0,label+' case change hides updates and models');
   }
   if(s.sources?.length)assert.equal(await page.locator('.reading-sources a').count(),s.sources.length,label+' visible references');
   if(i===0||s.type==='reference'||s.type==='matching')await page.screenshot({path:path.join(out,label+'.png'),fullPage:true});
   await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),label+' mobile width');
   await page.setViewportSize({width:1366,height:900});
   if(i<slides.length-1)await page.locator('#next').click();
  }
  await page.locator('#theme-toggle').click();await page.locator('#open-index').click();await page.locator('[data-index="0"]').click();
  await page.screenshot({path:path.join(out,`${moduleId}-${n}-dark.png`),fullPage:true});
  assert.deepEqual(errors,[],moduleId+' '+n+' browser errors');results.push({moduleId,number:n,sections:slides.length});await page.close();
 }
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.log('PASS: full sections, individual/bulk answers, independent survey choices retained on navigation, source links, dark mode and mobile widths.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
