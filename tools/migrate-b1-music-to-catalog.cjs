const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const jsDir = path.join(root, 'js');
const files = [
    'b1-v3-lessons-data.js',
    ...fs.readdirSync(jsDir).filter(name => /^b1-v3-lessons-block.*\.js$/.test(name)).sort()
];

function findObjectEnd(source, openIndex) {
    let depth = 0;
    let quote = null;
    let escaped = false;
    for (let index = openIndex; index < source.length; index += 1) {
        const char = source[index];
        if (quote) {
            if (escaped) escaped = false;
            else if (char === '\\') escaped = true;
            else if (char === quote) quote = null;
            continue;
        }
        if (char === '"' || char === "'" || char === '`') {
            quote = char;
            continue;
        }
        if (char === '{') depth += 1;
        if (char === '}') {
            depth -= 1;
            if (depth === 0) return index;
        }
    }
    throw new Error(`Objeto music sem fechamento a partir do índice ${openIndex}.`);
}

function removeLegacyMusic(source, file) {
    const starts = [...source.matchAll(/^[\t ]*music:\s*\{/gm)];
    const spans = starts.map(match => {
        const openIndex = source.indexOf('{', match.index);
        const closeIndex = findObjectEnd(source, openIndex);
        let end = closeIndex + 1;
        while (source[end] === ' ' || source[end] === '\t') end += 1;
        if (source[end] === ',') end += 1;
        while (source[end] === ' ' || source[end] === '\t') end += 1;
        if (source.slice(end, end + 2) === '\r\n') end += 2;
        else if (source[end] === '\n') end += 1;

        const following = source.slice(end, end + 80);
        if (!/^[\t ]*homework:/.test(following)) {
            throw new Error(`A propriedade music em ${file} não está imediatamente antes de homework.`);
        }
        return [match.index, end];
    });

    let migrated = source;
    spans.reverse().forEach(([start, end]) => {
        migrated = `${migrated.slice(0, start)}${migrated.slice(end)}`;
    });
    return { migrated, count: spans.length };
}

let removed = 0;
for (const file of files) {
    const absolute = path.join(jsDir, file);
    const source = fs.readFileSync(absolute, 'utf8');
    const result = removeLegacyMusic(source, file);
    if (result.count) fs.writeFileSync(absolute, result.migrated, 'utf8');
    removed += result.count;
    console.log(`${file}: ${result.count} objeto(s) music removido(s)`);
}

if (removed !== 28 && removed !== 0) {
    throw new Error(`Migração incompleta: esperado 28 objetos legados ou execução idempotente; removidos ${removed}.`);
}
console.log(`Migração B1 concluída: ${removed} objetos legados removidos.`);
