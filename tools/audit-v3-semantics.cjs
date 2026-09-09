const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

global.window = {};
require(path.join(root, 'js', 'v3-curriculum.js'));
require(path.join(root, 'js', 'music-catalog-v3.js'));
const curriculum = window.V3Curriculum;

function semanticErrors(lesson, asset, label) {
    const assetTags = asset?.semanticTags || curriculum.languageTagsFor(asset);
    if (!lesson?.languageTags?.length) return [`${label}: a aula não possui languageTags.`];
    if (!assetTags.length) return [`${label}: a atividade não possui tags semânticas reconhecidas.`];
    if (!curriculum.hasSemanticIntersection(lesson, assetTags)) {
        return [`${label}: sem interseção entre aula [${lesson.languageTags.join(', ')}] e atividade [${assetTags.join(', ')}].`];
    }
    return [];
}

function validate(lesson, asset, label) {
    failures.push(...semanticErrors(lesson, asset, label));
}

// Guard the validator itself with a deliberately incompatible fixture.
const fixtureErrors = semanticErrors(
    { languageTags: ['directions-location'] },
    { semanticTags: ['family-friendship'] },
    'fixture incompatível'
);
check(fixtureErrors.length === 1, 'A fixture incompatível não foi rejeitada pela auditoria semântica.');

require(path.join(root, 'a1-v3', 'a1-v3-lesson-registry.js'));
for (let number = 1; number <= 38; number += 1) {
    require(path.join(root, 'a1-v3', 'lesson-data', `licao-${String(number).padStart(2, '0')}.js`));
}

for (const lesson of curriculum.getModule('a1-v3').filter(entry => entry.type === 'content')) {
    const source = window.A1V3LessonRegistry.get(lesson.number) || {};
    if (source.mission) {
        validate(lesson, {
            ...source.mission,
            semanticTags: source.mission.semanticTags?.length ? source.mission.semanticTags : curriculum.languageTagsFor(source.mission.title, source.mission.task, source.mission.focus)
        }, `A1-V3 L${lesson.number} missão autoral`);
    }
    const mission = curriculum.resolveMission('a1-v3', lesson.number, source);
    validate(lesson, mission, `A1-V3 L${lesson.number} missão resolvida`);
}

const a1Lesson3=window.A1V3LessonRegistry.get(3);
check(a1Lesson3.lessonKind==='communicative'&&/nome|soletra/i.test(a1Lesson3.mission.task),'A1 L3: primeira interação fora do contexto.');
check(/preferência|pedido/i.test(window.A1V3LessonRegistry.get(7).mission.task),'A1 L7: café fora do contexto.');

for (const lesson of curriculum.getModule('a2-v3')) {
    const source = window.A2V3ConversationCurriculum?.lessons?.[lesson.number]
        || window.A2V3PremiumCurriculum?.lessons?.[lesson.number]
        || {};
    if (source.mission) {
        validate(lesson, {
            semanticTags: curriculum.languageTagsFor(source.title, source.mission, source.outcome)
        }, `A2-V3 L${lesson.number} missão autoral`);
    }
    const mission = curriculum.resolveMission('a2-v3', lesson.number, source);
    validate(lesson, mission, `A2-V3 L${lesson.number} missão resolvida`);

    const music = curriculum.resolveMusic('a2-v3', lesson.number, { includeDraft: true });
    if (lesson.lessonKind === 'lexical') {
        check(Boolean(music), `A2-V3 L${lesson.number}: nenhuma recomendação foi associada ao curriculumId.`);
        if (music) {
            validate(lesson, music, `A2-V3 L${lesson.number} música ${music.song.title}`);
            check(music.pedagogy.proposedGapAnswers.length === 5, `A2-V3 L${lesson.number}: curadoria sem cinco respostas propostas.`);
            const publicMusic = curriculum.resolveMusic('a2-v3', lesson.number);
            check(music.status === 'provider-verified', `A2-V3 L${lesson.number}: atividade auditada não foi ativada.`);
            check(publicMusic?.id === music.id, `A2-V3 L${lesson.number}: atividade auditada não está visível para o aluno.`);
            check(music.rights.displayLicensed === false, `A2-V3 L${lesson.number}: o catálogo declarou licença comercial inexistente.`);
        }
    } else {
        check(music === null, `A2-V3 L${lesson.number}: aula ${lesson.lessonKind} recebeu música.`);
    }
}

const sessionSource = read('js/v3-session-plan.js');
const a2PlayerSource = read('js/v3-presentation.js');
check(!/const\s+missions\s*=/.test(sessionSource), 'O mapa manual de missões antigas ainda existe no plano de sessão.');
check(/V3Curriculum\?\.resolveMission/.test(sessionSource), 'O plano de sessão não resolve missões pelo manifesto atual.');
check(!/musicSelectionsByLesson|getMusicSelection\([\s\S]*specificSelection/.test(a2PlayerSource), 'O player A2 ainda seleciona música pelo número antigo da lição.');
check(/MusicClozeV3\?\.getPublicEntry/.test(a2PlayerSource), 'O player A2 não consulta o catálogo por curriculumId.');

const renderableMusicSources = [
    'js/v3-presentation.js',
    'js/v3-presentation.js',
    'js/b1-v3-lesson-player.js'
];
for (const source of renderableMusicSources) {
    const content = read(source);
    check(!/I wake to see the|A quiet street is waiting down below|Preencha as lacunas com a palavra que você ouvir/.test(content), `${source}: o cloze musical genérico antigo ainda é renderizável.`);
    check(/MusicClozeV3/.test(content), `${source}: a integração com o componente musical seguro não foi instalada.`);
}

for (let number = 1; number <= 32; number += 1) {
    const html = read(`a2-v3/licao-${String(number).padStart(2, '0')}.html`);
    check(!/Complete a letra da música|Lyrics with blanks/.test(html), `A2-V3 L${number}: o shell HTML ainda anuncia a atividade antiga de letra.`);
    check(!/data-title="Music Moment"|music-lyrics/.test(html), `A2-V3 L${number}: shell musical estático ainda pode aparecer antes da hidratação.`);
}

const b1PlayerSource = read('js/b1-v3-lesson-player.js');
check(!/open\.spotify\.com\/embed\/search/.test(b1PlayerSource), 'B1-V3: o fallback musical ainda tenta incorporar uma busca inválida do Spotify.');
check(/musicCloze:\s*renderMusicClozeSlide/.test(b1PlayerSource), 'B1-V3: renderer MusicClozeV3 ausente.');

if (failures.length) {
    console.error(`V3 semantic audit failed with ${failures.length} issue(s):`);
    failures.forEach(failure => console.error(`- ${failure}`));
    process.exitCode = 1;
} else {
    console.log('V3 semantic audit passed: current missions, curriculumId music publication states, incompatible fixture and safe MusicCloze integration checked.');
}
