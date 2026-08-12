const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const moduleDirectories = ['a1-v3', 'a2-v3', 'b1-v3', 'b2-v3', 'c1-v3'];
const supportedExtensions = new Set(['.html', '.js', '.css']);
const suspiciousEncoding = /\u00c3[\u0080-\u00bf]|\u00c2[\u0080-\u00bf]|\u00e2[\u0080-\u00bf]{2}|\uFFFD/g;

function collectFiles(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const absolutePath = path.join(directory, entry.name);
        if (entry.isDirectory()) return collectFiles(absolutePath);
        return supportedExtensions.has(path.extname(entry.name).toLowerCase()) ? [absolutePath] : [];
    });
}

const files = moduleDirectories.flatMap((directory) => collectFiles(path.join(root, directory)));
const jsDirectory = path.join(root, 'js');
files.push(...fs.readdirSync(jsDirectory)
    .filter((name) => name.toLowerCase().includes('v3') && supportedExtensions.has(path.extname(name).toLowerCase()))
    .map((name) => path.join(jsDirectory, name)));

const issues = [];
for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(suspiciousEncoding)) {
        const before = source.slice(0, match.index);
        const line = before.split(/\r?\n/).length;
        const codePoints = [...match[0]]
            .map((character) => `U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`)
            .join(' ');
        issues.push(`${path.relative(root, file)}:${line} (${codePoints})`);
    }
}

if (issues.length) {
    console.error(`V3 encoding audit failed with ${issues.length} suspicious sequence(s):`);
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exit(1);
}

console.log(`V3 encoding audit passed for ${files.length} files.`);
