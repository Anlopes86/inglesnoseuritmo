(function(scope){
    'use strict';
    const sessions = data => Array.isArray(data.classSessions) ? data.classSessions : [];
    const packageId = data => data.activePackageId || 'legacy';
    const minutesUsed = data => Math.round(Number(data.classCount || 0) * 60);
    function record(data, input, actorId, now = new Date().toISOString()) {
        if (!(Number(data.pacoteContratado) > 0)) throw Error('Inicie um pacote antes de registrar um encontro.');
        if (input.packageId !== packageId(data)) throw Error('O pacote mudou. Feche o formulário e confira o pacote atual.');
        const duration = Number(input.durationMinutes), startsAt = new Date(input.startsAt);
        if (!input.id || !Number.isInteger(duration) || duration < 15 || duration > 240 || duration % 15) throw Error('Escolha uma duração entre 15 e 240 minutos, em intervalos de 15 minutos.');
        if (Number.isNaN(startsAt.getTime())) throw Error('Informe uma data e um horário válidos.');
        const note = String(input.note || '').trim();
        if (note.length > 500) throw Error('Use até 500 caracteres na observação.');
        const rows = sessions(data).map(row => ({...row}));
        const index = rows.findIndex(row => row.id === input.id), previous = index < 0 ? null : rows[index];
        if (previous && previous.packageId !== packageId(data)) throw Error('Este encontro pertence a um pacote anterior.');
        if (previous && input.expectedUpdatedAt && previous.updatedAt !== input.expectedUpdatedAt) throw Error('Este encontro foi alterado. Feche e abra novamente para conferir os dados.');
        const total = minutesUsed(data) + duration - Number(previous?.durationMinutes || 0);
        if (total < 0) throw Error('Confira o saldo de horas antes de corrigir este encontro.');
        const entry = {id:input.id, packageId:packageId(data), startsAt:startsAt.toISOString(), durationMinutes:duration, note, createdAt:previous?.createdAt || now, updatedAt:now, recordedBy:previous?.recordedBy || actorId, updatedBy:actorId};
        if (index < 0) rows.push(entry); else rows[index] = entry;
        const latest = rows.filter(row => row.packageId === packageId(data)).map(row => row.startsAt).sort().at(-1);
        // Keep the legacy date separately so editing a recent encounter can move it backwards.
        const legacyLast = data.legacyLastClassRegisteredAt ?? (sessions(data).some(row => row.packageId === packageId(data)) ? null : data.lastClassRegisteredAt);
        const oldLatest = legacyLast?.toDate?.() || legacyLast;
        const legacyISO = oldLatest && !Number.isNaN(new Date(oldLatest).getTime()) ? new Date(oldLatest).toISOString() : null;
        const latestDate = legacyISO && legacyISO > latest ? legacyISO : latest;
        return {classSessions:rows, classCount:total / 60, lastClassRegisteredAt:latestDate, legacyLastClassRegisteredAt:legacyISO};
    }
    function startPackage(data, input, now = new Date().toISOString()) {
        if (!input.id || !Number.isFinite(input.hours) || !(input.hours > 0) || !Number.isFinite(input.value) || input.value < 0 || !input.startDate) throw Error('Confira os dados do pacote.');
        const archives = Array.isArray(data.packageHistory) ? [...data.packageHistory] : [];
        if (Number(data.pacoteContratado) > 0) archives.push({id:packageId(data), hours:Number(data.pacoteContratado), value:Number(data.valorPacote || 0), startDate:data.dataInicioPacote || '', usedMinutes:minutesUsed(data), closedAt:now, legacyDates:data.classRegistrationHistory || []});
        return {activePackageId:input.id, packageHistory:archives, pacoteContratado:input.hours, valorPacote:input.value, dataInicioPacote:input.startDate, classCount:0, classRegistrationHistory:[], lastClassRegisteredAt:null, legacyLastClassRegisteredAt:null};
    }
    scope.ClassSessionLedger = {sessions, packageId, minutesUsed, record, startPackage};
})(typeof window === 'undefined' ? globalThis : window);
