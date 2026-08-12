(function () {
    'use strict';

    function assessmentRouteSlide() {
        const steps = [
            ['1', 'Presentation', 'Apresente as cinco partes do seu perfil.'],
            ['2', 'Questions', 'Responda a perguntas sobre o que você disse.'],
            ['3', 'Focused retry', 'Refaça um trecho curto depois do feedback.']
        ];
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Assessment Route</p><h2>Como será a avaliação</h2><p>Você fará uma etapa por vez. Ouça a orientação antes de começar cada uma.</p></div><div class="dialogue-grid">${steps.map(([number, title, detail]) => `<article class="dialogue-card"><span class="dialogue-number">${number}</span><h3>${title}</h3><p>${detail}</p></article>`).join('')}</div></section>`;
    }

    function criteriaSlide() {
        return `<section><div class="slide-heading"><p class="lesson-panel-title">What Matters</p><h2>O que será observado</h2><p>O objetivo é demonstrar comunicação no nível A1, não falar sem pausas ou sem nenhum erro.</p></div><div class="dialogue-grid">
            <article class="dialogue-card"><h3>Mensagem</h3><p>As informações principais são compreensíveis.</p></article>
            <article class="dialogue-card"><h3>Linguagem</h3><p>As estruturas estudadas aparecem com controle suficiente.</p></article>
            <article class="dialogue-card"><h3>Interação</h3><p>Você compreende e responde às perguntas curtas.</p></article>
            <article class="dialogue-card"><h3>Clareza</h3><p>A fala pode ser entendida, mesmo com pausas e sotaque.</p></article>
        </div></section>`;
    }

    function questionPrepSlide() {
        return `<section><div class="slide-heading"><p class="lesson-panel-title">Question Preparation</p><h2>Ouça a palavra principal da pergunta</h2><p>Responda diretamente primeiro. Depois, acrescente um detalhe se conseguir.</p></div><div class="lesson-table-scroll"><table class="grammar-table"><thead><tr><th>Pergunta possível</th><th>Resposta direta</th><th>Detalhe</th></tr></thead><tbody>
            <tr><td>Where are you from?</td><td>I’m from...</td><td>I’m Brazilian.</td></tr>
            <tr><td>What time do you...?</td><td>At...</td><td>on weekdays</td></tr>
            <tr><td>Can you...?</td><td>Yes, I can. / No, I can’t.</td><td>but I can...</td></tr>
            <tr><td>What are you doing now?</td><td>I’m ...ing.</td><td>at home / at school</td></tr>
        </tbody></table></div><div class="grammar-notes"><p>Se não entender, diga: <strong>Could you repeat, please?</strong></p><p>Se precisar pensar, diga: <strong>Let me think.</strong></p></div></section>`;
    }

    window.V3LessonEditorial.register('a1-v3', 32, lesson => {
        const rounds = lesson.stations.filter(station => station.kind === 'individual-round');
        const assessmentRounds = rounds.map((station, index) => {
            if (index === 0) return {
                ...station,
                title: 'Avaliação: apresentação',
                instruction: 'Apresente seu perfil usando apenas o cartão de palavras-chave.',
                round: {
                    ...station.round,
                    label: 'A1 oral presentation',
                    scenario: 'Apresente identidade, uma pessoa importante, rotina, habilidades e uma situação atual.',
                    task: 'Fale do começo ao fim com uma sequência compreensível.',
                    condition: 'Não leia frases completas. Faça uma pausa curta se precisar organizar a próxima ideia.',
                    steps: ['Apresente-se.', 'Desenvolva as cinco partes.', 'Finalize sua apresentação.'],
                    support: ['My name is...', 'He/She...', 'I usually...', 'I can...', 'Right now...']
                }
            };
            if (index === 1) return {
                ...station,
                title: 'Avaliação: perguntas',
                instruction: 'Responda às perguntas sobre as informações que você apresentou.',
                round: {
                    ...station.round,
                    label: 'Questions and answers',
                    scenario: 'O professor fará perguntas curtas sobre identidade, família, rotina, horários, habilidades, lugar e ações atuais.',
                    task: 'Responda uma pergunta por vez e acrescente um detalhe quando conseguir.',
                    condition: 'Você pode pedir repetição ou alguns segundos para pensar.',
                    steps: ['Ouça a pergunta completa.', 'Responda diretamente.', 'Acrescente um detalhe relacionado.'],
                    support: ['Could you repeat, please?', 'Let me think.', 'Yes, I do.', 'No, I can’t.', 'At...']
                }
            };
            return {
                ...station,
                title: 'Avaliação: ajuste final',
                instruction: 'Refaça apenas um trecho curto depois do feedback.',
                round: {
                    ...station.round,
                    label: 'Focused retry',
                    scenario: 'O professor indicará um trecho que pode ficar mais claro ou correto.',
                    task: 'Ouça o foco e repita somente esse trecho com o ajuste.',
                    condition: 'A segunda tentativa avalia sua capacidade de perceber e aplicar o feedback.',
                    steps: ['Ouça o feedback.', 'Planeje a frase novamente.', 'Diga o trecho corrigido.'],
                    support: ['Let me say that again.', 'I am...', 'He/She is...', 'I usually...', 'Right now...']
                }
            };
        });
        return {
            ...lesson,
            objectives: [
                'Apresentar informações pessoais e cotidianas de forma compreensível.',
                'Interagir em perguntas curtas dentro dos temas trabalhados no A1.',
                'Aplicar um feedback simples em uma nova tentativa.'
            ],
            projectSlides: [
                { title: 'Roteiro da avaliação', body: assessmentRouteSlide },
                { title: 'Critérios de desempenho', body: criteriaSlide },
                { title: 'Preparação para perguntas', body: questionPrepSlide }
            ],
            stations: assessmentRounds,
            reading: {
                title: 'Your A1 performance',
                text: 'Today you will present your A1 profile, answer short questions and repeat one short part after feedback. Speak clearly and use the English you know. You do not need to speak fast.',
                questions: [
                    ['Do you need to speak fast?', 'No, you do not.'],
                    ['What happens after the presentation?', 'You answer short questions.'],
                    ['What do you repeat after feedback?', 'One short part.']
                ]
            },
            homework: {
                label: 'After the Assessment',
                heading: 'Registre seu próximo passo',
                instruction: 'Depois da avaliação, registre o que já consegue fazer com segurança e escolha um foco curto para continuar praticando.',
                themes: [
                    'Duas coisas que já consigo dizer com confiança',
                    'Uma estrutura que preciso revisar',
                    'Uma meta de comunicação para o início do A2'
                ],
                checklist: [
                    'Usei exemplos concretos para avaliar meu desempenho.',
                    'Escolhi apenas um foco prioritário de revisão.',
                    'Minha próxima meta é específica e possível.'
                ]
            }
        };
    });
}());
