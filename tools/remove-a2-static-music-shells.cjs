const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const startMarker = '        <!-- SLIDE 10: Música -->';
const endMarker = '        <!-- SLIDE 11: Homework -->';
let removed = 0;

for (let number = 1; number <= 32; number += 1) {
    const padded = String(number).padStart(2, '0');
    const file = path.join(root, 'a2-v3', `licao-${padded}.html`);
    const source = fs.readFileSync(file, 'utf8');
    if (!source.includes(startMarker)) {
        if (/data-title="Music Moment"/.test(source)) throw new Error(`${file}: shell musical sem marcador reconhecido.`);
        continue;
    }
    const start = source.indexOf(startMarker);
    const end = source.indexOf(endMarker, start);
    if (end < 0) throw new Error(`${file}: marcador de homework não encontrado.`);
    const output = `${source.slice(0, start)}${source.slice(end)}`;
    fs.writeFileSync(file, output, 'utf8');
    removed += 1;
}

if (removed !== 0 && removed !== 32) throw new Error(`Esperado remover 32 shells ou executar de forma idempotente; removidos ${removed}.`);
console.log(`A2-V3: ${removed} shells musicais estáticos removidos.`);
