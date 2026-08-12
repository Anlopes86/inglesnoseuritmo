(function () {
    'use strict';

    function projectMapSlide() {
        const parts = [
            ['1', 'Identity', 'name, origin, nationality'],
            ['2', 'Important person', 'relationship, origin, one detail'],
            ['3', 'Routine', 'activity, day, time or frequency'],
            ['4', 'Abilities', 'can, can’t, and or but'],
            ['5', 'Right now', 'am/is/are + verb-ing']
        ];
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Project Map</p><h2>As cinco partes do seu perfil</h2><p>Escolha uma ou duas informações para cada parte. A apresentação precisa ser clara, não longa.</p></div><div class="dialogue-grid">${parts.map(([number, title, detail]) => `<article class="dialogue-card"><span class="dialogue-number">${number}</span><h3>${title}</h3><p>${detail}</p></article>`).join('')}</div></section>`;
    }

    function languageChoiceSlide() {
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Choose Your Language</p><h2>Selecione estruturas que você já domina</h2><p>Não é necessário usar tudo. Escolha os blocos que ajudam a contar o seu perfil com segurança.</p></div><div class="lesson-table-scroll"><table class="grammar-table"><thead><tr><th>Parte</th><th>Possíveis inícios</th><th>Detalhe que pode entrar</th></tr></thead><tbody>
            <tr><td>Identity</td><td>My name is... / I’m from...</td><td>nationality or age</td></tr>
            <tr><td>Important person</td><td>This is... / He/She is...</td><td>relationship or origin</td></tr>
            <tr><td>Routine</td><td>I usually... / I ... at...</td><td>day, time or frequency</td></tr>
            <tr><td>Abilities</td><td>I can... but I can’t...</td><td>two contrasting abilities</td></tr>
            <tr><td>Right now</td><td>I am ...ing.</td><td>place or current action</td></tr>
        </tbody></table></div></section>`;
    }

    function cueCardSlide() {
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Cue Card</p><h2>Use palavras-chave, não um texto para ler</h2><p>Este modelo mostra a quantidade de apoio necessária. Troque todas as informações pelas suas.</p></div><div class="number-patterns"><p><strong>identity:</strong> Paula · Brazilian · 20</p><p><strong>person:</strong> brother Leo · student · Spain</p><p><strong>routine:</strong> work 8:00 · English Tuesdays</p><p><strong>abilities:</strong> cook ✓ · sing ✗</p><p><strong>now:</strong> sit at home</p></div><div class="grammar-notes"><p>A partir dessas palavras, produza frases completas oralmente.</p><p>Se o cartão contém parágrafos, reduza-o antes do ensaio.</p></div></section>`;
    }

    window.V3LessonEditorial.register('a1-v3', 31, lesson => {
        const rounds = lesson.stations.filter(station => station.kind === 'individual-round');
        const projectRounds = rounds.map((station, index) => {
            if (index === 0) return {
                ...station,
                title: 'Projeto: escolha e organize',
                instruction: 'Escolha informações verdadeiras ou imaginárias e monte seu cartão de apoio.',
                round: {
                    ...station.round,
                    label: 'My A1 Profile',
                    scenario: 'Seu projeto terá cinco partes: identidade, uma pessoa importante, rotina, habilidades e o que acontece agora.',
                    task: 'Escolha pelo menos uma informação clara para cada parte.',
                    condition: 'Escreva somente palavras-chave, nomes, horários e verbos; não escreva o texto inteiro.',
                    steps: ['Escolha as cinco informações.', 'Separe-as na ordem da apresentação.', 'Faça uma primeira fala curta.'],
                    support: ['My name is...', 'He/She is...', 'I usually...', 'I can...', 'Right now...']
                }
            };
            if (index === 1) return {
                ...station,
                title: 'Projeto: complete as informações',
                instruction: 'Responda às perguntas e acrescente os detalhes que ainda faltam.',
                round: {
                    ...station.round,
                    label: 'Questions for clarity',
                    scenario: 'O professor fará perguntas curtas sobre origem, grafia, rotina, horários, habilidades e ações atuais.',
                    task: 'Responda com uma frase completa e atualize seu cartão de palavras-chave quando necessário.',
                    condition: 'Se não entender, peça repetição em inglês antes de responder.',
                    steps: ['Ouça uma pergunta por vez.', 'Responda e acrescente um detalhe.', 'Anote apenas a palavra-chave que faltava.'],
                    support: ['Could you repeat, please?', 'I’m from...', 'At...', 'I can...', 'I’m ...ing.']
                }
            };
            return {
                ...station,
                title: 'Projeto: ensaio completo',
                instruction: 'Apresente o projeto do começo ao fim usando somente o cartão de apoio.',
                round: {
                    ...station.round,
                    label: 'Full rehearsal',
                    scenario: 'Faça um ensaio da apresentação que será avaliada na próxima aula.',
                    task: 'Fale em uma sequência clara e finalize sem depender de frases escritas.',
                    condition: 'Depois do feedback, repita somente o trecho que precisa de ajuste.',
                    steps: ['Apresente as cinco partes.', 'Ouça um foco de feedback.', 'Refaça o trecho indicado.'],
                    support: ['First...', 'About my family...', 'I usually...', 'I can...', 'Right now...']
                }
            };
        });
        return {
            ...lesson,
            objectives: [
                'Selecionar linguagem já aprendida para criar um perfil pessoal A1.',
                'Organizar uma apresentação com começo, desenvolvimento e fechamento.',
                'Ensaiar respostas curtas para perguntas sobre o projeto.'
            ],
            projectSlides: [
                { title: 'Mapa do projeto', body: projectMapSlide },
                { title: 'Escolha da linguagem', body: languageChoiceSlide },
                { title: 'Cartão de apoio', body: cueCardSlide }
            ],
            stations: projectRounds,
            reading: {
                title: 'My A1 Profile: project brief',
                text: 'Prepare a short profile in English. Say who you are, introduce one important person, describe part of your routine, talk about your abilities and say what is happening now. Use keywords, not a complete written text.',
                questions: [
                    ['How many parts are in the project?', 'There are five parts.'],
                    ['Do you need a complete written text?', 'No. Use keywords.'],
                    ['What is the final part about?', 'It is about what is happening now.']
                ]
            },
            homework: {
                label: 'Project Preparation',
                heading: 'Finalize seu cartão de apoio',
                instruction: 'Revise o cartão criado na aula e ensaie a apresentação uma vez olhando para as palavras-chave e uma vez sem olhar.',
                themes: [
                    'Identidade e uma pessoa importante',
                    'Rotina, horário e frequência',
                    'Habilidades e uma ação acontecendo agora'
                ],
                checklist: [
                    'Meu cartão tem palavras-chave, não frases completas.',
                    'Minha apresentação tem uma ordem clara.',
                    'Consigo responder pelo menos três perguntas sobre o projeto.'
                ]
            }
        };
    });
}());
