const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const moduleSource = fs.readFileSync(path.join(root, 'js', 'a2-v3-module.js'), 'utf8');
const warnings = [];
const renderedCards = [];
let onDomReady = null;
const loadingElement = {
    textContent: '',
    classList: { add() {}, remove() {} }
};
const gridElement = {
    innerHTML: '',
    classList: { add() {}, remove() {} },
    appendChild(card) {
        renderedCards.push(card);
    }
};

global.window = {
    console: {
        warn(message, details) {
            warnings.push({ message, details });
        }
    }
};
global.document = {
    addEventListener(eventName, callback) {
        if (eventName === 'DOMContentLoaded') onDomReady = callback;
    },
    getElementById(id) {
        return id === 'loading' ? loadingElement : id === 'lessons-grid' ? gridElement : null;
    },
    createElement(tagName) {
        assert.strictEqual(tagName, 'a', 'O hub deve preservar cards clicáveis como links.');
        return {
            attrs: {},
            className: '',
            dataset: {},
            href: '',
            innerHTML: '',
            setAttribute(name, value) {
                this.attrs[name] = value;
            },
            addEventListener() {}
        };
    }
};

require(path.join(root, 'js', 'v3-curriculum.js'));
require(path.join(root, 'js', 'a2-v3-module.js'));

const curriculumEntries = window.V3Curriculum.getModule('a2-v3');
const getCardModel = window.A2V3ModuleCards?.getCardModel;
const expectedPresentation = {
    lexical: {
        label: 'Language Building',
        materials: ['Vocabulary', 'Grammar', 'Reading', 'Music']
    },
    communicative: {
        label: 'Conversation Practice',
        materials: ['Listening', 'Real-world Input', 'Role-play', 'Speaking']
    },
    consolidation: {
        label: 'Review Mission',
        materials: ['Review', 'Listening', 'Speaking Challenge']
    }
};

assert.strictEqual(curriculumEntries.length, 32, 'O manifesto A2 deve fornecer 32 aulas aos cards.');
assert.deepStrictEqual(
    Object.fromEntries(Object.keys(expectedPresentation).map(kind => [kind, curriculumEntries.filter(entry => entry.lessonKind === kind).length])),
    { lexical: 15, communicative: 15, consolidation: 2 },
    'A distribuição real de lessonKind do A2 mudou.'
);
assert.strictEqual(typeof getCardModel, 'function', 'O resolvedor semântico dos cards não está disponível.');

for (const entry of curriculumEntries) {
    const model = getCardModel(entry);
    const expected = expectedPresentation[entry.lessonKind];
    assert(expected, `lessonKind sem contrato visual: ${entry.lessonKind}`);
    assert.strictEqual(model.curriculumId, entry.id, `L${entry.number}: o card perdeu o curriculumId.`);
    assert.strictEqual(model.number, entry.number, `L${entry.number}: o card perdeu a numeração canônica.`);
    assert.strictEqual(model.title, entry.title, `L${entry.number}: o título do card não vem do manifesto.`);
    assert.strictEqual(model.label, expected.label, `L${entry.number}: rótulo divergente para ${entry.lessonKind}.`);
    assert.deepStrictEqual(model.materials.map(material => material.label), expected.materials, `L${entry.number}: materiais divergentes para ${entry.lessonKind}.`);
    assert(model.materials.length <= 4, `L${entry.number}: badges demais para o layout do card.`);
}

assert(!/\blessonTitles\b|\bunitLabels\b|getLessonMaterials/.test(moduleSource), 'O hub ainda declara mapas editoriais legados.');
assert(!/entry\.type/.test(moduleSource), 'O hub ainda deriva a apresentação somente de entry.type.');
assert(/presentationByLessonKind\[entry\.lessonKind\]/.test(moduleSource), 'O hub não resolve os cards pelo lessonKind real.');

const fallback = getCardModel({ id: 'fixture', number: 99, title: 'Fixture', lessonKind: 'unknown-kind' });
assert.strictEqual(fallback.label, 'Lesson Overview', 'Fallback visual desconhecido incorreto.');
assert.deepStrictEqual(fallback.materials.map(material => material.label), ['Learning Activities'], 'Fallback de materiais desconhecidos incorreto.');
assert.strictEqual(warnings.length, 1, 'Metadado desconhecido deve gerar exatamente um warning explícito.');
assert(/fallback explícito/.test(warnings[0].message), 'O warning do fallback não explica a degradação.');

async function auditRenderedLinks() {
    const documents = {
        teacher: { role: 'professor' },
        student: { role: 'aluno', teacherId: 'teacher', progress: {} }
    };
    window.db = {
        collection(collectionName) {
            assert.strictEqual(collectionName, 'students');
            return {
                doc(id) {
                    return {
                        async get() {
                            const data = documents[id];
                            return { exists: Boolean(data), data: () => data };
                        }
                    };
                }
            };
        }
    };
    global.localStorage = {
        getItem(key) {
            return key === 'selectedStudentId' ? 'student' : null;
        }
    };
    const auth = {
        currentUser: { uid: 'teacher' },
        onAuthStateChanged(callback) {
            callback(this.currentUser);
        }
    };
    global.firebase = { auth: () => auth };
    window.firebase = global.firebase;
    window.location = new URL('http://localhost/a2-v3/a2-v3.html?studentId=student');
    window.history = { state: null, replaceState() {} };
    window.StudentContextSeed = { studentId: 'student' };
    document.querySelectorAll = () => [];
    require(path.join(root, 'js', 'student-context.js'));
    window.StudentContextReady = Promise.resolve(window.StudentContext);

    assert.strictEqual(typeof onDomReady, 'function', 'O inicializador do hub A2 não foi registrado.');
    onDomReady();
    for (let attempt = 0; attempt < 10 && renderedCards.length < 32; attempt += 1) {
        await new Promise(resolve => setImmediate(resolve));
    }

    assert.strictEqual(renderedCards.length, 32, 'O hub não renderizou os 32 cards canônicos.');
    renderedCards.forEach((card, index) => {
        const entry = curriculumEntries[index];
        const expected = expectedPresentation[entry.lessonKind];
        const padded = String(entry.number).padStart(2, '0');
        assert.strictEqual(new URL(card.href).pathname, `/a2-v3/licao-${padded}.html`, `L${entry.number}: destino da aula foi alterado.`);
        assert.strictEqual(new URL(card.href).searchParams.get('studentId'), 'student', `L${entry.number}: vínculo do aluno foi perdido.`);
        assert.strictEqual(card.dataset.lesson, String(entry.number), `L${entry.number}: data-lesson divergente.`);
        assert.strictEqual(card.dataset.curriculumId, entry.id, `L${entry.number}: curriculumId não chegou ao DOM.`);
        assert(/\blesson-card\b/.test(card.className), `L${entry.number}: classe visual principal removida.`);
        assert(card.innerHTML.includes(entry.title), `L${entry.number}: título canônico ausente no DOM.`);
        assert(card.innerHTML.includes(expected.label), `L${entry.number}: rótulo de lessonKind ausente no DOM.`);
        expected.materials.forEach(label => assert(card.innerHTML.includes(label), `L${entry.number}: badge ${label} ausente no DOM.`));
        assert(/lesson-unit/.test(card.innerHTML) && /lesson-material-pill/.test(card.innerHTML) && /lesson-state/.test(card.innerHTML), `L${entry.number}: contrato CSS do card foi alterado.`);
    });

    console.log('A2-V3 module-card audit passed: 32 manifesto titles and links, 15 lexical, 15 communicative and 2 consolidation cards derive labels/materials from lessonKind; CSS hooks remain, legacy number maps are absent and fallback warns.');
}

auditRenderedLinks().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
