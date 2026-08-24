const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const targets = [
    { file: 'a1-v3/a1-v3-data.js', expected: 32 },
    { file: 'a2-v3/a2-v3-lesson-content.js', expected: 51 }
];

function findValueEnd(source, openIndex) {
    const open = source[openIndex];
    const close = open === '{' ? '}' : ']';
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
        if (char === open) depth += 1;
        if (char === close) {
            depth -= 1;
            if (depth === 0) return index;
        }
    }
    throw new Error(`Valor music sem fechamento a partir do índice ${openIndex}.`);
}

function migrate(source) {
    const starts = [...source.matchAll(/^[\t ]*music:\s*[\[{]/gm)];
    const spans = starts.map(match => {
        const openIndex = source.slice(match.index).search(/[\[{]/) + match.index;
        const closeIndex = findValueEnd(source, openIndex);
        let end = closeIndex + 1;
        while (source[end] === ' ' || source[end] === '\t') end += 1;
        if (source[end] === ',') end += 1;
        while (source[end] === ' ' || source[end] === '\t') end += 1;
        if (source.slice(end, end + 2) === '\r\n') end += 2;
        else if (source[end] === '\n') end += 1;
        return [match.index, end];
    });

    let output = source;
    spans.reverse().forEach(([start, end]) => {
        output = `${output.slice(0, start)}${output.slice(end)}`;
    });
    return { output, count: spans.length };
}

for (const target of targets) {
    const absolute = path.join(root, target.file);
    const source = fs.readFileSync(absolute, 'utf8');
    const result = migrate(source);
    if (result.count !== 0 && result.count !== target.expected) {
        throw new Error(`${target.file}: esperado ${target.expected} propriedades legadas ou execução idempotente; encontradas ${result.count}.`);
    }
    if (result.count) fs.writeFileSync(absolute, result.output, 'utf8');
    if (/^[\t ]*music:\s*[\[{]/m.test(result.output)) throw new Error(`${target.file}: ainda há propriedade music legada.`);
    console.log(`${target.file}: ${result.count} propriedade(s) music removida(s)`);
}
