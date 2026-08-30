const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const storageData = new Map();
const context = {
    window: {}, console, URL, URLSearchParams, AbortController, DOMException, setTimeout, clearTimeout
};
Object.assign(context.window, {
    window: context.window,
    setTimeout,
    clearTimeout,
    sessionStorage: {
        getItem: key => storageData.get(key) || null,
        setItem: (key, value) => storageData.set(key, value)
    },
    MusicCatalogV3: { getForCurriculumId: () => null }
});
vm.createContext(context);
for (const file of ['js/lyrics-service-v3.js', 'js/spotify-embed-v3.js', 'js/music-cloze-v3.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}

const service = context.window.LyricsServiceV3;
const musicClozeSource = fs.readFileSync(path.join(root, 'js/music-cloze-v3.js'), 'utf8');
assert(/aria-label="Revelar resposta da lacuna \$\{field\.index \+ 1\}" aria-pressed="false" title="Revelar resposta"><i class="fas fa-eye" aria-hidden="true"><\/i><\/button>/.test(musicClozeSource), 'cada lacuna deve exibir um botão alternável com ícone de olho desde o carregamento');
assert(!/data-music-reveal="\$\{field\.index\}"[^>]*\shidden>/.test(musicClozeSource), 'o botão Revelar não pode começar oculto');
assert(/icon\?\.classList\.toggle\('fa-eye-slash', showingAnswer\)/.test(musicClozeSource), 'o controle deve trocar para olho riscado enquanto exibe a resposta');
assert(!/feedback\.textContent = `Resposta: \$\{answer\}`/.test(musicClozeSource), 'a resposta revelada deve aparecer somente dentro do campo');
assert(/payload\.transferPrompts\?\.length/.test(musicClozeSource), 'o componente deve preferir transferPrompts quando o array existe');
assert(/payload\.transferPrompt \|\|/.test(musicClozeSource), 'o componente deve preservar fallback retrocompatível para transferPrompt');
assert(/music-cloze-transfer-list/.test(musicClozeSource), 'as perguntas pós-música devem ser renderizadas em lista numerada');
const gapSpecs = [
    { id: 'g1', answer: 'work', occurrence: 1, acceptedAnswers: ['work'] },
    { id: 'g2', answer: 'name', occurrence: 1, acceptedAnswers: ['name'] },
    { id: 'g3', answer: 'work', occurrence: 2, acceptedAnswers: ['work'] },
    { id: 'g4', answer: "can't", occurrence: 1, acceptedAnswers: ["can't"] },
    { id: 'g5', answer: 'today', occurrence: 1, acceptedAnswers: ['today'] }
];
const providerText = "I work with a name today.\nWe work because we can't stop.";
const model = service.buildFiveGapModel(providerText, gapSpecs);
assert.equal(model.gaps.length, 5, 'exactGapCount');
assert.equal(new Set(Array.from(model.gaps, gap => gap.absoluteTokenIndex)).size, 5, 'distinctPositions');
assert.equal(model.lines.flatMap(line => Array.from(line.segments)).filter(segment => segment.type === 'gap').length, 5, 'DOM model deve conter cinco inputs');
assert.equal(service.normalizeAnswer(' “CAN’T!” '), "can't", 'normalização de caixa, apóstrofo e pontuação');
assert.equal(service.gradeAnswer('WORK', gapSpecs[0]), 'correct');
assert.notEqual(service.gradeAnswer('working', gapSpecs[0]), 'correct', 'flexão não declarada continua incorreta');
assert.throws(() => service.buildFiveGapModel(providerText, gapSpecs.slice(0, 4)), error => error.code === 'invalid-gap-count');
assert.throws(() => service.buildFiveGapModel(providerText, [...gapSpecs.slice(0, 4), { ...gapSpecs[0], id: 'duplicate' }]), error => error.code === 'duplicate-gap-position');

const phoneGapSpecs = [
    { id: 'n1', answer: 'eight', providerAnswer: '8', occurrence: 1, acceptedAnswers: ['eight', '8'] },
    { id: 'n2', answer: 'six', providerAnswer: '6', occurrence: 1, acceptedAnswers: ['six', '6'] },
    { id: 'n3', answer: 'seven', providerAnswer: '7', occurrence: 1, acceptedAnswers: ['seven', '7'] },
    { id: 'n4', answer: 'five', providerAnswer: '5', occurrence: 1, acceptedAnswers: ['five', '5'] },
    { id: 'n5', answer: 'three', providerAnswer: '3', occurrence: 1, acceptedAnswers: ['three', '3'] }
];
const phoneModel = service.buildFiveGapModel('Call 867-5309 today.', phoneGapSpecs);
assert.equal(phoneModel.gaps.length, 5, 'número telefônico deve gerar um campo por dígito');
assert.equal(new Set(Array.from(phoneModel.gaps, gap => gap.absoluteTokenIndex)).size, 5, 'os dígitos devem ocupar posições distintas');
assert.equal(service.gradeAnswer('8', phoneGapSpecs[0]), 'correct', 'o aluno pode responder com o algarismo');

const closestDurationCandidate = service.selectBestCandidate([
    { id: 1, trackName: 'Test Track', artistName: 'Test Artist', albumName: 'Test Album', duration: 121, plainLyrics: providerText },
    { id: 2, trackName: 'Test Track', artistName: 'Test Artist', albumName: 'Test Album', duration: 119, plainLyrics: providerText }
], { title: 'Test Track', artist: 'Test Artist', album: 'Test Album', durationSeconds: 118 });
assert.equal(closestDurationCandidate.id, 2, 'a gravação com duração mais próxima deve vencer dentro da tolerância');

const spotify = context.window.SpotifyEmbedV3;
assert(spotify.isValidTrackId('2uFaJJtFpPDc5Pa95XzTvg'));
assert(!spotify.isValidTrackId('search:wrong-version'));
assert(spotify.render({ title: 'Test', artist: 'Artist', spotifyTrackId: '2uFaJJtFpPDc5Pa95XzTvg' }).includes('/embed/track/2uFaJJtFpPDc5Pa95XzTvg'));
assert(!spotify.render({ title: 'Test', artist: 'Artist', spotifyTrackId: '2uFaJJtFpPDc5Pa95XzTvg' }).includes('/embed/search'));

const syntheticEntry = {
    id: 'test-song', status: 'provider-verified', song: { title: 'Test Track', artist: 'Test Artist' },
    lyrics: { fallback: 'lyricsovh' }, gaps: gapSpecs, pedagogy: { maxAttempts: 3 }
};
let call = 0;
const fetchImpl = async url => {
    call += 1;
    if (url.includes('lrclib')) return { ok: false, status: 500, headers: { get: () => null }, json: async () => ({}) };
    return { ok: true, status: 200, headers: { get: () => null }, json: async () => ({ lyrics: providerText }) };
};

(async () => {
    const loaded = await service.getLyrics(syntheticEntry, { fetchImpl, storage: context.window.sessionStorage, timeoutMs: 100 });
    assert.equal(loaded.source, 'lyricsovh-fallback', 'Lyrics.ovh deve ser contingência');
    assert(call >= 2, 'LRCLIB deve ser consultado antes da contingência');

    const cloze = context.window.MusicClozeV3;
    context.window.MusicCatalogV3.getForCurriculumId = () => syntheticEntry;
    const ordered = cloze.prepareSlides([{ type: 'content' }, { type: 'homework' }], { curriculumId: 'test', lessonKind: 'lexical' });
    assert.deepEqual(Array.from(ordered, slide => slide.type), ['content', 'musicCloze', 'homework'], 'blockOrder');
    const nonLexical = cloze.prepareSlides([{ type: 'content' }, { type: 'homework' }], { curriculumId: 'test', lessonKind: 'communicative' });
    assert.deepEqual(Array.from(nonLexical, slide => slide.type), ['content', 'homework'], 'lexicalOnly');
    console.log('music-cloze-v3.test.js passed: providers, tokenization, exact five gaps, post-song prompt compatibility, reveal controls, normalization and block order.');
})().catch(error => {
    console.error(error);
    process.exit(1);
});
