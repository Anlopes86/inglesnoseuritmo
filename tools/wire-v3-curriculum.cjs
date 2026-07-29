const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function updateFile(file, transforms) {
    const absolute = path.join(root, file);
    let source = fs.readFileSync(absolute, 'utf8');
    transforms.forEach(([from, to]) => {
        if (source.includes(to)) return;
        if (!source.includes(from)) throw new Error(`Anchor not found in ${file}: ${from}`);
        source = source.replace(from, to);
    });
    fs.writeFileSync(absolute, source, 'utf8');
}

for (let number = 1; number <= 32; number += 1) {
    const padded = String(number).padStart(2, '0');
    updateFile(`a1-v3/licao-${padded}.html`, [
        ['    <script src="../js/progress-manager.js"></script>', '    <script src="../js/v3-curriculum.js"></script>\n    <script src="../js/progress-manager.js"></script>'],
        ['    <script src="a1-v3-data.js"></script>', '    <script src="a1-v3-data.js"></script>\n    <script src="a1-v3-cadence-data.js"></script>'],
        ['    <script src="a1-v3-cadence-data.js"></script>', '    <script src="a1-v3-cadence-data.js"></script>\n    <script src="../js/v3-curriculum-adapters.js"></script>']
    ]);
    updateFile(`a2-v3/licao-${padded}.html`, [
        ['    <script src="../js/progress-manager.js"></script>', '    <script src="../js/v3-curriculum.js"></script>\n    <script src="../js/progress-manager.js"></script>']
    ]);
    updateFile(`b1-v3/licao-${padded}.html`, [
        ['    <script src="../js/progress-manager.js"></script>', '    <script src="../js/v3-curriculum.js"></script>\n    <script src="../js/progress-manager.js"></script>'],
        ['    <script src="../js/b1-v3-lesson-player.js"></script>', '    <script src="../js/v3-curriculum-adapters.js"></script>\n    <script src="../js/b1-v3-lesson-player.js"></script>']
    ]);
}

for (const module of ['a1-v3', 'a2-v3', 'b1-v3']) {
    updateFile(`${module}/${module}.html`, [
        [`<script src="../js/${module.replace('-v3', '')}-v3-module.js"></script>`, `<script src="../js/v3-curriculum.js"></script>\n    <script src="../js/${module.replace('-v3', '')}-v3-module.js"></script>`]
    ]);
}

console.log('Wired the curriculum manifest into A1-V3, A2-V3 and B1-V3.');
