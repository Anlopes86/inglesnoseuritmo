document.addEventListener('DOMContentLoaded', () => {
    const ledger=window.ClassSessionLedger, dialog=document.getElementById('session-dialog'), form=document.getElementById('session-form'), save=document.getElementById('save-session-btn'), error=document.getElementById('session-error');
    if(!dialog||!ledger)return;
    let context=null, draft=null, saving=false;
    const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const hours=minutes=>new Intl.NumberFormat('pt-BR',{maximumFractionDigits:2}).format(minutes/60)+' h';
    const date=value=>{const parsed=new Date(value?.toDate?.()||value);return Number.isNaN(parsed.getTime())?'Data não informada':new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(parsed);};
    const localDate=value=>{const d=new Date(value);return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,16);};
    function render(data){
        const id=ledger.packageId(data), all=ledger.sessions(data);
        const rowsFor=id=>all.filter(row=>row.packageId===id).sort((a,b)=>b.startsAt.localeCompare(a.startsAt));
        const rowHTML=(row,editable)=>`<article class="session-row"><div><strong>${escape(date(row.startsAt))}</strong><span>${row.durationMinutes} min</span>${row.note?`<p>${escape(row.note)}</p>`:''}</div>${editable?`<button type="button" class="app-button-ghost" data-edit-session="${escape(row.id)}">Editar</button>`:''}</article>`;
        const rows=rowsFor(id), legacyMinutes=ledger.minutesUsed(data)-rows.reduce((total,row)=>total+row.durationMinutes,0);
        const remaining=Number(data.pacoteContratado||0)*60-ledger.minutesUsed(data);
        document.getElementById('session-balance').textContent=Number(data.pacoteContratado)>0?(remaining>=0?`${hours(remaining)} disponíveis no pacote`:`${hours(-remaining)} além do pacote`):'Inicie um pacote para registrar encontros.';
        document.getElementById('record-session-btn').disabled=!(Number(data.pacoteContratado)>0);
        let markup=legacyMinutes>0?`<p class="kpi-helper">${hours(legacyMinutes)} registradas antes do histórico detalhado.</p>`:'';
        markup+=rows.length?rows.map(row=>rowHTML(row,true)).join(''):'<p class="kpi-helper">Os novos encontros aparecerão aqui com data e duração.</p>';
        for(const archived of [...(data.packageHistory||[])].reverse()){
            const past=rowsFor(archived.id), previous=archived.usedMinutes-past.reduce((n,r)=>n+r.durationMinutes,0);
            markup+=`<details class="archived-package"><summary>Pacote de ${escape(archived.hours)} h · ${escape(archived.startDate)}</summary><p class="kpi-helper">${hours(archived.usedMinutes)} utilizadas · encerrado em ${escape(date(archived.closedAt))}</p>${previous>0?`<p class="kpi-helper">${hours(previous)} anteriores ao registro detalhado.</p>`:''}${past.map(row=>rowHTML(row,false)).join('')}</details>`;
        }
        const container=document.getElementById('session-history-content');if(container.innerHTML!==markup)container.innerHTML=markup;
    }
    document.addEventListener('teacher:package-loaded', e=>{context=e.detail;render(context.data);});
    function open(row){
        if(!context||context.studentId!==localStorage.getItem('selectedStudentId'))return;
        draft={studentId:context.studentId,id:row?.id||crypto.randomUUID(),packageId:ledger.packageId(context.data),expectedUpdatedAt:row?.updatedAt||null};
        form.reset();error.hidden=true;
        document.getElementById('session-student-name').textContent=localStorage.getItem('selectedStudentName')||'Aluno selecionado';
        document.getElementById('session-dialog-title').textContent=row?'Editar encontro':'Registrar encontro';
        document.getElementById('session-date').value=localDate(row?.startsAt||new Date());
        document.getElementById('session-duration').value=String(row?.durationMinutes||60);
        document.getElementById('session-note').value=row?.note||'';
        dialog.showModal();
    }
    document.getElementById('record-session-btn').addEventListener('click',()=>open());
    document.getElementById('session-history-content').addEventListener('click',e=>{const b=e.target.closest('[data-edit-session]');if(b)open(ledger.sessions(context.data).find(r=>r.id===b.dataset.editSession));});
    dialog.querySelectorAll('[data-close-session]').forEach(b=>b.addEventListener('click',()=>{if(!saving)dialog.close();}));
    dialog.addEventListener('cancel',e=>{if(saving)e.preventDefault();});
    form.addEventListener('submit',async e=>{
        e.preventDefault();if(saving||!draft)return;saving=true;save.disabled=true;save.textContent='Salvando…';error.hidden=true;
        const target={...draft},value={...draft,startsAt:document.getElementById('session-date').value,durationMinutes:Number(document.getElementById('session-duration').value),note:document.getElementById('session-note').value};
        try{
            const db=firebase.firestore(), profile=await window.PlatformAccess.getCurrentProfile(firebase.auth(),db);
            if(!profile||!window.PlatformAccess.isManager(profile))throw Error('Entre novamente com uma conta de professor.');
            const access=await window.PlatformAccess.assertStudentAccess(db,profile,target.studentId);if(!access.ok)throw Error('Não foi possível acessar este aluno.');
            const ref=db.collection('students').doc(target.studentId);
            await db.runTransaction(async transaction=>{const snapshot=await transaction.get(ref);if(!snapshot.exists)throw Error('Aluno não encontrado.');transaction.update(ref,ledger.record(snapshot.data(),value,profile.uid));});
            dialog.close();document.dispatchEvent(new CustomEvent('teacher:refresh-package',{detail:{studentId:target.studentId}}));
            if(typeof showToast==='function')showToast('Data, duração e saldo atualizados.','success','Encontro salvo');
        }catch(err){error.textContent=err.code==='permission-denied'?'Você não tem permissão para alterar este aluno.':err.message||'Não foi possível salvar. Tente novamente.';error.hidden=false;}
        finally{saving=false;save.disabled=false;save.textContent='Salvar encontro';}
    });
});
