const assert = require('node:assert/strict');
const fs = require('node:fs');
const { buildDecks } = require('./build-v3-flashcard-decks.cjs');
const decks = buildDecks();
for (const [moduleId, deck] of Object.entries(decks)) {
    assert.equal(deck.lessonCount, moduleId === 'a1-v3' ? 38 : 32);
    assert.equal(new Set(deck.cards.map(card => card.id)).size, deck.cards.length);
    assert(deck.cards.length > 300);
    for (const lesson of deck.lessons) {
        const cards = deck.cards.filter(card => card.curriculumId === lesson.curriculumId);
        assert.equal(cards.length, lesson.cardCount);
        if (lesson.lessonKind === 'lexical') assert(cards.length >= 10, lesson.title);
        for (const card of cards) {
            assert.equal(card.module, moduleId);
            assert.equal(card.lesson, lesson.number);
            assert.equal(card.lessonTitle, lesson.title);
            assert(card.f.trim() && card.meaning.trim());
            assert(card.id.startsWith('v3fc_'));
            assert(!card.sectionId.includes('music'));
            if (card.kind === 'verb') assert(/^to\s+\S/.test(card.f));
        }
    }
    const saved = JSON.parse(fs.readFileSync(`js/${moduleId}-flashcards.json`, 'utf8'));
    assert.equal(JSON.stringify(saved), JSON.stringify(deck), 'generated deck drift');
}
const html = fs.readFileSync('flashcards-app.html', 'utf8');
assert(html.includes('data-deck="A1_V3"') && html.includes('data-deck="A2_V3"'));
assert(html.includes('data-deck="A1"'), 'legacy deck must remain reachable');
console.log('PASS: current A1/A2 sources, lesson IDs and labels, complete lexical coverage, unique card IDs, to-infinitives, no music and preserved legacy entry.');
