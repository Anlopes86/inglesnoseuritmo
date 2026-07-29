const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const modules = [
    { id: 'b2-v3', label: 'B2‑V3', color: 'blue', description: 'Conteúdo avançado e prática comunicativa em ciclos de desempenho. Cada aula par transforma o conteúdo anterior em uma missão com tentativa, mudança e segunda tentativa.' },
    { id: 'c1-v3', label: 'C1‑V3', color: 'violet', description: 'Precisão, flexibilidade, mediação crítica e adaptação de registro. Cada ciclo termina em desempenho observável alinhado aos descritores CEFR C1.' }
];

const lessonPage = (module, number) => {
    const padded = String(number).padStart(2, '0');
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${module.label} · Lição ${padded} do currículo V3 orientado à ação">
    <title>${module.label} · Lição ${padded}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" rel="stylesheet">
    <link href="../css/advanced-v3.css" rel="stylesheet">
</head>
<body data-module="${module.id}" data-lesson-number="${number}">
    <header class="advanced-header">
        <div class="advanced-header-inner">
            <a class="advanced-back" href="${module.id}.html"><i class="fas fa-chevron-left" aria-hidden="true"></i> Voltar</a>
            <div class="advanced-title"><h1 id="advanced-lesson-title">${module.label} · Lição ${padded}</h1><p id="advanced-slide-title"></p></div>
            <span id="advanced-counter" class="advanced-counter">1 / 1</span>
        </div>
        <div class="advanced-progress"><div id="advanced-progress-bar"></div></div>
    </header>
    <main id="advanced-root" class="advanced-main" aria-live="polite"></main>
    <footer class="advanced-footer">
        <div class="advanced-footer-inner">
            <button type="button" id="advanced-prev" class="advanced-nav"><i class="fas fa-chevron-left" aria-hidden="true"></i> Anterior</button>
            <span id="advanced-session-meta" class="advanced-duration"></span>
            <button type="button" id="advanced-next" class="advanced-nav primary">Próximo <i class="fas fa-chevron-right" aria-hidden="true"></i></button>
            <button type="button" id="advanced-finish" class="advanced-nav advanced-finish" hidden><i class="fas fa-check" aria-hidden="true"></i> Concluir aula</button>
        </div>
    </footer>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    <script src="../js/firebase-config.js"></script>
    <script src="../js/v3-curriculum.js"></script>
    <script src="../js/progress-manager.js"></script>
    <script src="../js/advanced-v3-lessons-data.js"></script>
    <script src="../js/advanced-v3-lesson-player.js"></script>
</body>
</html>
`;
};

const hubPage = module => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${module.label}, currículo V3 de 32 lições alinhado ao CEFR">
    <title>${module.label} · Módulo de teste</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" rel="stylesheet">
    <link href="../css/advanced-v3.css" rel="stylesheet">
</head>
<body data-module="${module.id}">
    <header class="advanced-header">
        <div class="advanced-header-inner">
            <a class="advanced-back" href="../home-aluno.html"><i class="fas fa-chevron-left" aria-hidden="true"></i> Portal</a>
            <div class="advanced-title"><h1>${module.label} · 32 lições</h1><p>Versão de teste · currículo orientado à ação</p></div>
            <span class="advanced-counter">TESTE</span>
        </div>
    </header>
    <main>
        <section class="module-hero"><div class="advanced-stage">
            <p class="advanced-eyebrow">CEFR ${module.label.replace('‑V3', '')} · Versão de teste</p>
            <h1>${module.label}</h1>
            <p>${module.description}</p>
            <div class="advanced-badges"><span class="advanced-badge">32 lições</span><span class="advanced-badge">16 ciclos</span><span class="advanced-badge">45 min oral nas revisões</span><span class="advanced-badge">Produção · interação · mediação</span></div>
        </div></section>
        <div id="loading" class="module-loading">Carregando progresso e permissões…</div>
        <section id="lessons-grid" class="module-grid" hidden aria-label="Lições do módulo"></section>
    </main>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    <script src="../js/firebase-config.js"></script>
    <script src="../js/platform-access.js"></script>
    <script src="../js/v3-curriculum.js"></script>
    <script src="../js/progress-manager.js"></script>
    <script src="../js/advanced-v3-module.js"></script>
</body>
</html>
`;

for (const module of modules) {
    const directory = path.join(root, module.id);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, `${module.id}.html`), hubPage(module), 'utf8');
    for (let number = 1; number <= 32; number += 1) {
        fs.writeFileSync(path.join(directory, `licao-${String(number).padStart(2, '0')}.html`), lessonPage(module, number), 'utf8');
    }
}

console.log(`Generated ${modules.length * 32} lesson pages and ${modules.length} module hubs.`);
