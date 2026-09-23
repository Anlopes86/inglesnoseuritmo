const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
function buildDecks() {
    const context = vm.createContext({ window: {}, console });
    const load = file => vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
    load('js/v3-curriculum.js');
    load('a1-v3/a1-v3-lesson-registry.js');
    const curriculum = context.window.V3Curriculum;
    for (const lesson of curriculum.getModule('a1-v3')) load(`a1-v3/lesson-data/licao-${String(lesson.number).padStart(2, '0')}.js`);
    for (const file of ['a2-v3-template.js', 'a2-v3-conversation-template.js', 'a2-v3-consolidation-template.js', 'a2-v3-presentation-data.js']) load(`a2-v3/${file}`);
    const registries = { 'a1-v3': context.window.A1V3LessonRegistry, 'a2-v3': context.window.A2V3PresentationRegistry };
    const decks = {};
    for (const [moduleId, registry] of Object.entries(registries)) {
        const cards = [], ids = new Set(), lessons = [];
        for (const manifest of curriculum.getModule(moduleId)) {
            const lesson = registry.get(manifest.number);
            if (!lesson?.slides) throw Error(`Missing lesson source: ${manifest.id}`);
            let count = 0;
            for (const slide of lesson.slides) {
                if (!['cards', 'verbs', 'ohe-flashcards'].includes(slide.type)) continue;
                const rows = slide.groups ? slide.groups.flatMap(group => group.cards || []) : slide.cards || [];
                for (const row of rows) {
                    const [term, meaning, example = '', forms = ''] = Array.isArray(row)
                        ? row
                        : [row.term, row.meaning, row.examples?.[0] || '', ''];
                    const f = slide.type === 'verbs' ? 'to ' + term.replace(/^to\s+/i, '') : term;
                    if (!f?.trim() || !meaning?.trim()) throw Error(`Incomplete card: ${manifest.id}/${slide.id}`);
                    // Stable across reordering and translation/example edits; never based on array position.
                    const id = 'v3fc_' + createHash('sha256').update(`${manifest.id}|${slide.id}|${f.normalize('NFC').trim().toLowerCase()}`).digest('hex').slice(0, 24);
                    if (ids.has(id)) continue;
                    ids.add(id);
                    cards.push({ id, f, b: [meaning, forms ? `Formas: ${f} · ${forms}` : '', example ? `Exemplo: ${example}` : ''].filter(Boolean).join(' — '),
                        meaning, example, forms, l: `Lição ${String(manifest.number).padStart(2, '0')} · ${manifest.title}`,
                        module: moduleId, curriculumId: manifest.id, lesson: manifest.number, lessonTitle: manifest.title,
                        sectionId: slide.id, source: 'v3-curriculum', kind: slide.type === 'verbs' ? 'verb' : slide.id === 'expressions' ? 'expression' : 'word' });
                    count++;
                }
            }
            lessons.push({ curriculumId: manifest.id, number: manifest.number, title: manifest.title, lessonKind: manifest.lessonKind, cardCount: count });
        }
        decks[moduleId] = { schemaVersion: 1, moduleId, lessonCount: lessons.length, lessons, cards };
    }
    return decks;
}
if (require.main === module) {
    const check = process.argv.includes('--check');
    for (const [moduleId, deck] of Object.entries(buildDecks())) {
        const file = path.join(root, 'js', `${moduleId}-flashcards.json`), content = JSON.stringify(deck, null, 2) + '\n';
        if (check) {
            if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') !== content) throw Error(`Deck out of date: ${moduleId}; run node tools/build-v3-flashcard-decks.cjs`);
        } else fs.writeFileSync(file, content);
        console.log(`${moduleId}: ${deck.lessonCount} lessons, ${deck.cards.length} cards${check ? ' verified against canonical sources' : ' generated'}.`);
    }
}
module.exports = { buildDecks };
