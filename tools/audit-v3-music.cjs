const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const failures = [];
const warnings = [];
const check = (condition, message) => {
    if (!condition) failures.push(message);
};
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function run(file, context) {
    vm.runInContext(read(file), context, { filename: file });
}

const context = { window: {}, console, URL, URLSearchParams, AbortController, DOMException, setTimeout, clearTimeout };
context.window.window = context.window;
context.window.setTimeout = setTimeout;
context.window.clearTimeout = clearTimeout;
vm.createContext(context);
run('js/v3-curriculum.js', context);
run('js/music-catalog-v3.js', context);
run('js/lyrics-service-v3.js', context);
run('js/spotify-embed-v3.js', context);
run('js/music-cloze-v3.js', context);

const curriculum = context.window.V3Curriculum;
const catalog = context.window.MusicCatalogV3;
const snapshot = catalog.auditSnapshot();
const expectedCounts = { 'a1-v3': 24, 'a2-v3': 15, 'b1-v3': 15 };
const actualCounts = snapshot.reduce((counts, entry) => {
    counts[entry.moduleId] = (counts[entry.moduleId] || 0) + 1;
    return counts;
}, {});

check(snapshot.length === 54, `Catálogo musical: esperado 54 registros; encontrado ${snapshot.length}.`);
check(new Set(snapshot.map(entry => entry.id)).size === 54, 'Catálogo musical: IDs de registro duplicados.');
check(new Set(snapshot.map(entry => entry.curriculumId)).size === 54, 'Catálogo musical: curriculumIds duplicados.');
Object.entries(expectedCounts).forEach(([moduleId, count]) => {
    check(actualCounts[moduleId] === count, `${moduleId}: esperado ${count} registros; encontrado ${actualCounts[moduleId] || 0}.`);
});

snapshot.forEach(entry => {
    const lesson = curriculum.getLesson(entry.moduleId, entry.curriculumId);
    check(Boolean(lesson), `${entry.id}: curriculumId não existe.`);
    check(lesson?.lessonKind === 'lexical', `${entry.id}: registro associado a lição não lexical.`);
    check(entry.lessonKind === 'lexical', `${entry.id}: lessonKind incorreto no catálogo.`);
    check(entry.placement === 'penultimate-before-homework', `${entry.id}: posição musical incorreta.`);
    check(entry.rights.displayLicensed === false, `${entry.id}: direitos não podem aparecer como confirmados.`);
    check(entry.excerpt.gaps.length === 0, `${entry.id}: gaps não validados foram colocados no trecho publicável.`);
    check(entry.lyrics.provider === 'lrclib' && entry.lyrics.fallback === 'lyricsovh', `${entry.id}: cadeia LRCLIB → Lyrics.ovh não configurada.`);
    check(entry.lyrics.cache === 'sessionStorage', `${entry.id}: cache de letras deve ser temporário.`);
    check(entry.gaps.length === 5, `${entry.id}: catálogo deve conter exatamente cinco descritores de lacuna.`);
    check(new Set(entry.gaps.map(gap => `${gap.answer.toLowerCase()}:${gap.occurrence}`)).size === 5, `${entry.id}: descritores de ocorrência duplicados.`);
    check(entry.pedagogy.proposedGapAnswers.length === 5, `${entry.id}: a curadoria deve trazer cinco respostas propostas.`);
    if (entry.moduleId === 'a2-v3') {
        check(entry.pedagogy.transferPrompts?.length === 3, `${entry.id}: música A2 deve ter exatamente três perguntas pós-música.`);
        check(entry.pedagogy.transferPrompts?.every(prompt => String(prompt || '').trim()), `${entry.id}: pergunta pós-música vazia.`);
    }
    const distinctAnswers = new Set(entry.gaps.map(gap => String(gap.answer || '').toLowerCase())).size;
    if (distinctAnswers < 3) warnings.push(`${entry.id}: somente ${distinctAnswers} resposta(s) diferente(s) nas cinco lacunas; repetição mantida para preservar a letra e a curadoria auditada.`);
    check(entry.validation.valid, `${entry.id}: contrato editorial básico inválido: ${entry.validation.errors.join('; ')}`);
    check(entry.status === 'provider-verified', `${entry.id}: atividade auditada não foi publicada.`);
    check(entry.publicationBlockers.length === 0, `${entry.id}: atividade publicada ainda tem bloqueios.`);
    check(entry.lyrics.providerVerifiedAt === '2026-08-23', `${entry.id}: data de verificação do provedor ausente.`);
    check(Number.isInteger(entry.lyrics.lrclibId), `${entry.id}: ID LRCLIB auditado ausente.`);
    check(entry.lyrics.gapAudit === '5-of-5-distinct', `${entry.id}: cinco posições distintas não foram registradas.`);
    check(/^[A-Za-z0-9]{22}$/.test(entry.song.spotifyTrackId || ''), `${entry.id}: Spotify ID exato ausente.`);
    check(entry.song.regionChecked === 'BR', `${entry.id}: região BR não confirmada.`);
    check(entry.rights.usageScope === 'private-course-runtime' && entry.rights.commercialPublicationApproved === false, `${entry.id}: escopo privado não foi preservado.`);
    check(entry.publishableValidation.valid, `${entry.id}: atividade não passa no contrato publicável: ${entry.publishableValidation.errors.join('; ')}`);
    check(catalog.isPublishable(entry), `${entry.id}: atividade validada não foi considerada publicável.`);
    check(curriculum.resolveMusic(entry.moduleId, entry.lessonNumber)?.id === entry.id, `${entry.id}: atividade não chegou à Student View.`);
    check(curriculum.resolveMusic(entry.moduleId, entry.lessonNumber, { includeDraft: true })?.id === entry.id, `${entry.id}: lookup editorial por curriculumId falhou.`);
});
check(snapshot.filter(entry => entry.rollout.pilot).length === 12, 'Rollout musical: esperado piloto em 12 aulas.');

for (const moduleId of Object.keys(expectedCounts)) {
    curriculum.getModule(moduleId).forEach(lesson => {
        const music = curriculum.resolveMusic(moduleId, lesson.number);
        if (lesson.lessonKind === 'lexical') check(Boolean(music), `${moduleId} L${lesson.number}: lição lexical sem atividade musical publicada.`);
        else check(music === null, `${moduleId} L${lesson.number}: aula ${lesson.lessonKind} recebeu música.`);
    });
}

const b1Context = { window: {}, console, URL, URLSearchParams, AbortController, DOMException, setTimeout, clearTimeout };
b1Context.window.window = b1Context.window;
b1Context.window.setTimeout = setTimeout;
b1Context.window.clearTimeout = clearTimeout;
vm.createContext(b1Context);
[
    'js/v3-curriculum.js',
    'js/music-catalog-v3.js',
    'js/lyrics-service-v3.js',
    'js/spotify-embed-v3.js',
    'js/music-cloze-v3.js',
    'js/b1-v3-lessons-data.js',
    ...fs.readdirSync(path.join(root, 'js')).filter(file => /^b1-v3-lessons-block.*\.js$/.test(file)).sort().map(file => `js/${file}`),
    'js/v3-curriculum-adapters.js'
].forEach(file => run(file, b1Context));

const b1Lessons = b1Context.window.B1_V3_LESSONS;
check(b1Lessons.length === 32, `B1 reorganizado: esperado 32 lições; encontrado ${b1Lessons.length}.`);
b1Lessons.forEach(lesson => {
    const manifest = b1Context.window.V3Curriculum.getLesson('b1-v3', lesson.number);
    const slideTypes = lesson.slides.map(slide => slide.type);
    const publishedMusic = b1Context.window.MusicCatalogV3.getForCurriculumId(lesson.curriculumId);
    check(lesson.curriculumId === manifest.id, `B1 L${lesson.number}: curriculumId divergente.`);
    check(lesson.lessonKind === manifest.lessonKind, `B1 L${lesson.number}: lessonKind divergente.`);
    check(!slideTypes.includes('music'), `B1 L${lesson.number}: player musical legado ainda está ativo.`);
    check(slideTypes.filter(type => type === 'musicCloze').length === (publishedMusic ? 1 : 0), `B1 L${lesson.number}: bloco musical publicado incorreto.`);
    if (publishedMusic) check(slideTypes.at(-2) === 'musicCloze', `B1 L${lesson.number}: música não está imediatamente antes do homework.`);
    check(slideTypes.at(-1) === 'homework', `B1 L${lesson.number}: homework não é o último bloco.`);
});

const sourceFiles = [
    'a1-v3/a1-v3-data.js',
    'a1-v3/a1-v3-lesson-registry.js',
    'a1-v3/a1-v3-lesson-content.js',
    'a2-v3/a2-v3-lesson-content.js',
    'js/b1-v3-lessons-data.js',
    ...fs.readdirSync(path.join(root, 'js')).filter(file => /^b1-v3-lessons-block.*\.js$/.test(file)).sort().map(file => `js/${file}`),
    'js/b1-v3-lesson-player.js'
];
const forbidden = /Complete o trecho original|placeholder autoral|Texto musical fictício|Copyright-safe lyric|I wake to see the|open\.spotify\.com\/embed\/search/i;
sourceFiles.forEach(file => {
    const source = read(file);
    check(!/^[\t ]*music:\s*[\[{]/m.test(source), `${file}: fonte musical legada ainda cadastrada fora do catálogo único.`);
    check(!forbidden.test(source), `${file}: texto musical inventado/placeholder ainda presente.`);
});

for (const moduleId of Object.keys(expectedCounts)) {
    for (let number = 1; number <= 32; number += 1) {
        const padded = String(number).padStart(2, '0');
        const file = `${moduleId}/licao-${padded}.html`;
        const source = read(file);
        const curriculumIndex = source.indexOf('../js/v3-curriculum.js');
        const catalogIndex = source.indexOf('../js/music-catalog-v3.js');
        const lyricsIndex = source.indexOf('../js/lyrics-service-v3.js');
        const spotifyIndex = source.indexOf('../js/spotify-embed-v3.js');
        const componentIndex = source.indexOf('../js/music-cloze-v3.js');
        check(curriculumIndex >= 0 && catalogIndex > curriculumIndex && lyricsIndex > catalogIndex && spotifyIndex > lyricsIndex && componentIndex > spotifyIndex, `${file}: scripts musicais ausentes ou fora de ordem.`);
        check((source.match(/music-catalog-v3\.js/g) || []).length === 1, `${file}: catálogo musical duplicado.`);
        check((source.match(/lyrics-service-v3\.js/g) || []).length === 1, `${file}: serviço de letras duplicado.`);
        check((source.match(/spotify-embed-v3\.js/g) || []).length === 1, `${file}: embed do Spotify duplicado.`);
        check((source.match(/music-cloze-v3\.js/g) || []).length === 1, `${file}: componente musical duplicado.`);
        if (moduleId === 'a2-v3') {
            check(!/data-title="Music Moment"|id="music-lyrics"/.test(source), `${file}: shell musical estático ainda pode aparecer antes da hidratação.`);
        }
    }
}

const componentSource = read('js/music-cloze-v3.js');
['ProviderLyricsAdapter', 'MusicClozeActivity', 'TeacherMusicPanel'].forEach(name => {
    check(componentSource.includes(`class ${name}`), `MusicClozeV3: componente ${name} ausente.`);
});
['loading', 'ready', 'checking', 'submitted', 'partial', 'complete', 'correct', 'lyricsUnavailable', 'audioUnavailable', 'draft', 'rightsBlocked', 'syncMismatch'].forEach(state => {
    check(componentSource.includes(state), `MusicClozeV3: estado ${state} ausente.`);
});
check(/aria-live="polite"/.test(componentSource), 'MusicClozeV3: feedback aria-live ausente.');
check(/aria-label="Lacuna \$\{field\.index \+ 1\} de 5"/.test(componentSource), 'MusicClozeV3: labels acessíveis das lacunas ausentes.');
check(/data-music-reveal/.test(componentSource), 'MusicClozeV3: revelação individual ausente.');
check(/Ir para o homework/.test(componentSource), 'MusicClozeV3: CTA para o homework ausente.');
check(/transferPrompts/.test(componentSource) && /transferPrompt/.test(componentSource), 'MusicClozeV3: compatibilidade entre transferPrompts e transferPrompt ausente.');
check(/music-cloze-transfer-list/.test(componentSource), 'MusicClozeV3: bloco numerado de perguntas pós-música ausente.');
check(!/payload\.answerKey/.test(componentSource), 'MusicClozeV3: gabarito foi solicitado no payload inicial da Student View.');
check(/gradeResponses/.test(componentSource) && /data-gap-feedback/.test(componentSource), 'MusicClozeV3: correção ou feedback textual por lacuna ausente.');
check(!/scrap|genius|azlyrics|letras\.mus/i.test(componentSource), 'MusicClozeV3: indício de scraping de letras encontrado.');

const lyricsSource = read('js/lyrics-service-v3.js');
check(/https:\/\/lrclib\.net\/api/.test(lyricsSource), 'LyricsServiceV3: LRCLIB não está configurado como provedor principal.');
check(/https:\/\/api\.lyrics\.ovh\/v1/.test(lyricsSource), 'LyricsServiceV3: Lyrics.ovh não está configurado como contingência.');
check(/DEFAULT_TIMEOUT_MS\s*=\s*10000/.test(lyricsSource), 'LyricsServiceV3: timeout não está entre 8 e 12 segundos.');
check(/response\.status === 429/.test(lyricsSource) && /Retry-After/.test(lyricsSource), 'LyricsServiceV3: tratamento de 429/Retry-After ausente.');
check(/sessionStorage/.test(lyricsSource) && !/localStorage/.test(lyricsSource), 'LyricsServiceV3: cache deve usar somente sessionStorage.');
check(/buildFiveGapModel/.test(lyricsSource) && /DuplicateGapPositionError/.test(lyricsSource), 'LyricsServiceV3: resolução de cinco posições distintas ausente.');

const spotifySource = read('js/spotify-embed-v3.js');
check(/\^\[A-Za-z0-9\]\{22\}\$/.test(spotifySource), 'SpotifyEmbedV3: validação de trackId exato ausente.');
check(/open\.spotify\.com\/embed\/track\//.test(spotifySource), 'SpotifyEmbedV3: embed oficial por faixa ausente.');
check(!/embed\/search/.test(spotifySource), 'SpotifyEmbedV3: busca genérica não pode ser usada em produção.');

if (failures.length) {
    console.error(`V3 music audit failed with ${failures.length} issue(s):`);
    failures.forEach(message => console.error(`- ${message}`));
    process.exit(1);
}

console.log('V3 music audit passed.');
console.log(`Coverage: A1 ${actualCounts['a1-v3']}/24 · A2 ${actualCounts['a2-v3']}/15 · B1 ${actualCounts['b1-v3']}/15 · total ${snapshot.length}/54.`);
console.log(`Publication: ${snapshot.filter(entry => entry.status === 'provider-verified').length} provider-verified · ${snapshot.filter(entry => entry.status === 'draft-until-provider-match').length} justified drafts · 12 historical pilot flags · 0 music blocks in non-lexical lessons.`);
if (warnings.length) {
    console.warn(`V3 music audit warnings (${warnings.length}):`);
    warnings.forEach(message => console.warn(`- ${message}`));
}
