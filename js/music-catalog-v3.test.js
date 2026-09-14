const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const context = { window: {}, console, URL, URLSearchParams };
context.window.window = context.window;
vm.createContext(context);
for (const file of ['js/v3-curriculum.js', 'js/music-catalog-v3.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}

const catalog = context.window.MusicCatalogV3;
const records = catalog.auditSnapshot();
assert.equal(records.length, 54, 'catalogCoverage deve retornar 54 registros');
assert.deepEqual(
    Object.fromEntries(['a1-v3', 'a2-v3', 'b1-v3'].map(moduleId => [moduleId, records.filter(entry => entry.moduleId === moduleId).length])),
    { 'a1-v3': 24, 'a2-v3': 15, 'b1-v3': 15 }
);
assert.equal(new Set(records.map(entry => entry.curriculumId)).size, 54, 'curriculumIds devem ser únicos');
assert(records.every(entry => entry.lessonKind === 'lexical'), 'lexicalOnly');
assert(records.every(entry => entry.placement === 'penultimate-before-homework'), 'blockOrder metadata');
assert(records.every(entry => entry.gaps.length === 5), 'exactGapCount');
assert(records.every(entry => new Set(entry.gaps.map(gap => `${gap.answer.toLowerCase()}:${gap.occurrence}`)).size === 5), 'distinctPositions descriptors');
const pilots = records.filter(entry => entry.rollout.pilot);
const nonPilots = records.filter(entry => !entry.rollout.pilot);
const published = records.filter(entry => entry.status === 'provider-verified');
const a1Records = records.filter(entry => entry.moduleId === 'a1-v3');
const a2Records = records.filter(entry => entry.moduleId === 'a2-v3');
assert.equal(pilots.length, 12, 'piloto deve ter 12 aulas');
assert.equal(nonPilots.length, 42, 'o rollout completo deve preservar a identificação dos 42 registros posteriores ao piloto');
assert.equal(published.length, 54, 'as 54 atividades auditadas devem estar publicadas');
assert(records.every(entry => entry.publicationBlockers.length === 0), 'nenhuma atividade publicada pode manter bloqueios');
assert(records.every(entry => /^[A-Za-z0-9]{22}$/.test(entry.song.spotifyTrackId)), 'toda atividade deve ter Spotify ID exato');
assert(records.every(entry => entry.song.regionChecked === 'BR' && entry.song.spotifyCheckedAt === '2026-08-23'), 'toda atividade deve registrar a checagem BR');
assert(records.every(entry => Number.isInteger(entry.lyrics.lrclibId) && entry.lyrics.candidateCheckedAt >= '2026-08-23'), 'toda atividade deve ter candidato LRCLIB auditado');
assert(records.every(entry => entry.lyrics.gapAudit === '5-of-5-distinct'), 'toda atividade deve registrar cinco posições distintas');
assert(records.every(entry => catalog.isPublishable(entry) && catalog.getForCurriculumId(entry.curriculumId)?.id === entry.id), 'toda atividade validada deve chegar à Student View');
const a1LexicalLessons = context.window.V3Curriculum.getModule('a1-v3').filter(lesson => lesson.lessonKind === 'lexical');
assert.deepEqual(Array.from(a1Records, entry => entry.curriculumId).sort(), Array.from(a1LexicalLessons, lesson => lesson.id).sort(), 'as 24 músicas A1 devem cobrir exatamente os IDs lexicais do currículo atual');
for (const entry of a1Records) {
    const lesson = context.window.V3Curriculum.getLesson('a1-v3', entry.curriculumId);
    assert.equal(entry.lessonNumber, lesson.number, 'a numeração musical deve acompanhar seu ID curricular');
}
for (const [label, moduleRecords] of [['A1', a1Records], ['A2', a2Records]]) {
    assert(moduleRecords.every(entry => entry.pedagogy.transferPrompts.length === 3 && entry.pedagogy.transferPrompts.every(prompt => String(prompt || '').trim())), `cada música ${label} deve ter três perguntas pós-música`);
}
assert.equal(new Set(a1Records.flatMap(entry => entry.pedagogy.transferPrompts)).size, 72, 'as perguntas pós-música A1 devem ser personalizadas, sem cópias exatas');

const letItSnow = records.find(entry => entry.id === 'a2-v3-l01-song-01');
assert.deepEqual(Array.from(letItSnow.gaps, gap => gap.occurrence), [1, 1, 3, 1, 5]);
assert.equal(letItSnow.song.spotifyTrackId, '2uFaJJtFpPDc5Pa95XzTvg');

const phoneSong = records.find(entry => entry.id === 'a1-v3-l06-song-01');
assert.deepEqual(Array.from(phoneSong.gaps, gap => gap.providerAnswer), ['8', '6', '7', '5', '3']);
assert(phoneSong.gaps.every(gap => gap.acceptedAnswers.includes(gap.providerAnswer)), 'ditado deve aceitar algarismo e palavra por extenso');

const tomsDiner = records.find(entry => entry.id === 'a1-v3-l18-song-01');
assert.deepEqual(Array.from(tomsDiner.gaps, gap => `${gap.answer}:${gap.occurrence}`), ['sitting:1', 'waiting:1', 'looking:1', 'looking:2', 'looking:3']);

const workingWeekend = records.find(entry => entry.id === 'a1-v3-l02-song-01');
assert.equal(workingWeekend.song.title, 'Working for the Weekend', 'A1 L2 deve usar a faixa-reserva validada');
const shyGuy = records.find(entry => entry.id === 'a2-v3-l13-song-01');
assert.equal(shyGuy.song.spotifyTrackTitle, 'Shy Guy - Darpe Mix', 'A2 L13 deve usar a mesma versão validada no LRCLIB e Spotify');
assert(new Set(shyGuy.gaps.map(gap => gap.answer.toLowerCase())).size >= 3, 'Shy Guy deve usar ao menos três respostas reais diferentes');
assert.equal(shyGuy.lyrics.candidateCheckedAt, '2026-08-30', 'Shy Guy deve registrar a nova auditoria de ocorrências no LRCLIB');
const fashion = records.find(entry => entry.id === 'a2-v3-l23-song-01');
assert(new Set(fashion.gaps.map(gap => gap.answer.toLowerCase())).size >= 3, 'Fashion deve usar ao menos três respostas reais diferentes');
assert.equal(fashion.lyrics.candidateCheckedAt, '2026-08-30', 'Fashion deve registrar a nova auditoria de ocorrências no LRCLIB');

console.log('music-catalog-v3.test.js passed: 54 published lexical activities, exact providers, five distinct gaps and three post-song prompts in every A1 and A2 song.');
