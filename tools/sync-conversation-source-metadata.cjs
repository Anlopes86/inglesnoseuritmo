const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const conversationDir = path.join(root, 'conversation');
const dataPath = path.join(conversationDir, 'conversation-lessons-01-48-data.js');

global.window = {};
require(dataPath);
require(path.join(conversationDir, 'conversation-music-catalog-01-48.js'));

const lessons = global.window.CONVERSATION_LESSONS_01_48;
const catalog = global.window.ConversationMusicCatalog0148;
let updates = 0;
Object.values(lessons).forEach((lesson) => {
    lesson.songs.forEach((song, songIndex) => {
        const entry = catalog.get(lesson.lessonNumber, songIndex);
        if (!entry) return;
        if (entry.song.displayTitle && song.title !== entry.song.displayTitle) {
            song.title = entry.song.displayTitle;
            updates += 1;
        }
        if (entry.song.displayArtist && song.artist !== entry.song.displayArtist) {
            song.artist = entry.song.displayArtist;
            updates += 1;
        }
        song.spotifyId = entry.song.spotifyId;
        song.sourceEmbed = `https://open.spotify.com/embed/track/${entry.song.spotifyId}`;
    });
});

const source = `(function installConversationLessons0148(globalScope) {\n    'use strict';\n\n    const lessons = ${JSON.stringify(lessons, null, 4).replace(/</g, '\\u003c')};\n\n    globalScope.CONVERSATION_LESSONS_01_48 = Object.freeze(lessons);\n}(window));\n`;
fs.writeFileSync(dataPath, source, 'utf8');
console.log(JSON.stringify({ data: path.relative(root, dataPath), metadataUpdates: updates }, null, 2));
