const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function updateFile(file) {
    const absolute = path.join(root, file);
    let source = fs.readFileSync(absolute, 'utf8');
    const anchor = '    <script src="../js/v3-curriculum.js"></script>';
    const wired = `${anchor}\n    <script src="../js/music-catalog-v3.js"></script>\n    <script src="../js/lyrics-service-v3.js"></script>\n    <script src="../js/spotify-embed-v3.js"></script>\n    <script src="../js/music-cloze-v3.js"></script>`;
    if (source.includes(wired)) return;
    if (!source.includes(anchor)) throw new Error(`Curriculum anchor not found in ${file}.`);
    source = source.replace(
        /    <script src="\.\.\/js\/v3-curriculum\.js"><\/script>\r?\n(?:    <script src="\.\.\/js\/(?:music-catalog-v3|lyrics-service-v3|spotify-embed-v3|music-cloze-v3)\.js"><\/script>\r?\n?)*/,
        `${wired}\n`
    );
    fs.writeFileSync(absolute, source, 'utf8');
}

for (let number = 1; number <= 32; number += 1) {
    const padded = String(number).padStart(2, '0');
    updateFile(`a1-v3/licao-${padded}.html`);
    updateFile(`a2-v3/licao-${padded}.html`);
    updateFile(`b1-v3/licao-${padded}.html`);
}

console.log('Wired the V3 music catalog, lyrics service, Spotify embed and MusicCloze component into 96 lesson pages.');
