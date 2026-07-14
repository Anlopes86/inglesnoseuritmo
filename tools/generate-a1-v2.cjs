const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const moduleDir = path.join(root, 'a1-v2');
const dataPath = path.join(moduleDir, 'a1-v2-data.js');
const source = fs.readFileSync(dataPath, 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: dataPath });

const titles = context.window.A1V2_DATA?.lessonTitles;
if (!Array.isArray(titles) || titles.length !== 32) {
    throw new Error('A1 V2 data must expose exactly 32 lesson titles.');
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function page(number, title) {
    const padded = String(number).padStart(2, '0');
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A1 V2 | Lição ${padded}: ${escapeHtml(title)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" rel="stylesheet">
    <link href="a1-lesson-theme.css" rel="stylesheet">
</head>
<body class="a1-lesson-page lesson-loading" data-lesson-number="${number}">
    <header class="lesson-header">
        <div class="header-inner">
            <a href="a1-v2.html" class="back-link" aria-label="Voltar para A1 V2"><i class="fas fa-chevron-left" aria-hidden="true"></i><span>Voltar para A1 V2</span></a>
            <div class="header-title">
                <h1 id="lesson-title">A1 V2 · Lição ${padded}: ${escapeHtml(title)}</h1>
                <p id="slide-title-header"></p>
            </div>
            <div class="header-actions">
                <button type="button" class="icon-button" data-a1-theme-toggle aria-label="Alternar tema" title="Alternar tema"><i class="fas fa-moon" aria-hidden="true"></i></button>
                <span id="slide-counter" class="slide-counter">1 / 1</span>
            </div>
        </div>
        <div class="progress-track"><div id="progress-bar" class="progress-bar"></div></div>
    </header>

    <main id="lesson-root" class="lesson-root" aria-live="polite"></main>

    <footer class="lesson-footer">
        <div class="footer-inner">
            <button type="button" id="prev-btn" class="nav-button"><i class="fas fa-chevron-left" aria-hidden="true"></i> Anterior</button>
            <button type="button" id="next-btn" class="nav-button primary">Próximo <i class="fas fa-chevron-right" aria-hidden="true"></i></button>
        </div>
    </footer>

    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    <script src="../js/firebase-config.js"></script>
    <script src="../js/progress-manager.js"></script>
    <script src="a1-v2-data.js"></script>
    <script src="a1-v2-lesson-content.js"></script>
    <script src="a1-lesson-theme.js"></script>
</body>
</html>
`;
}

for (let index = 0; index < titles.length; index += 1) {
    const number = index + 1;
    const filePath = path.join(moduleDir, `licao-${String(number).padStart(2, '0')}.html`);
    if (!filePath.startsWith(`${moduleDir}${path.sep}`)) {
        throw new Error(`Refusing to write outside A1 V2: ${filePath}`);
    }
    fs.writeFileSync(filePath, page(number, titles[index]), 'utf8');
}

console.log(`Generated ${titles.length} A1 V2 lesson pages.`);
