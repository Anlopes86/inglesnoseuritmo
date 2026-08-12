(function () {
    'use strict';

    window.V3LessonEditorial.register('a1-v3', 30, lesson => {
        const rounds = lesson.stations.filter(station => station.kind === 'individual-round').map((station, index) => {
            if (index === 0) return {
                ...station,
                title: 'Speaking: organize a cena',
                instruction: 'Use as informações da tela para montar uma primeira descrição.',
                round: {
                    ...station.round,
                    label: 'Preparação para um show',
                    scenario: 'Mia can sing and Leo can play the guitar. Yesterday, they were at home. Now, they are practicing at the community center.',
                    task: 'Diga o que cada pessoa sabe fazer, onde elas estavam ontem e o que estão fazendo agora.',
                    condition: 'Use pelo menos uma frase com can, uma com was/were e uma com Present Continuous.',
                    steps: ['Identifique as três informações de cada pessoa.', 'Escolha a ordem da descrição.', 'Faça a primeira tentativa em voz alta.'],
                    support: ['Mia can...', 'Leo can...', 'Yesterday, they were...', 'Now, they are ...ing.']
                }
            };
            if (index === 1) return {
                ...station,
                title: 'Speaking: mudança no plano',
                instruction: 'Ouça a nova informação e atualize sua descrição.',
                round: {
                    ...station.round,
                    label: 'Nova informação',
                    scenario: 'Leo is not practicing now. He is waiting outside. Mia is practicing alone.',
                    task: 'Corrija a parte da sua descrição que mudou e responda às perguntas do professor.',
                    condition: 'Não repita tudo desde o começo; atualize apenas o que mudou primeiro.',
                    steps: ['Ouça a nova informação.', 'Diga o que não está acontecendo.', 'Diga o que está acontecendo agora.'],
                    support: ['He isn’t ...ing.', 'He is ...ing.', 'She is ...ing.', 'Where is...?']
                }
            };
            return {
                ...station,
                title: 'Speaking: relato completo',
                instruction: 'Conte a cena novamente já com a mudança incluída.',
                round: {
                    ...station.round,
                    label: 'Segunda tentativa',
                    scenario: 'Apresente habilidades, localização passada e situação atual em uma sequência clara.',
                    task: 'Faça o relato completo e aplique a correção prioritária indicada pelo professor.',
                    condition: 'Use palavras-chave como apoio, mas não leia frases completas.',
                    steps: ['Comece pelas habilidades.', 'Passe para yesterday.', 'Termine com now e a mudança.'],
                    support: ['They can...', 'Yesterday...', 'Now...', 'but...']
                }
            };
        });
        return {
            ...lesson,
            stations: [...lesson.stations.filter(station => station.kind === 'focus-practice'), ...rounds],
            homework: {
                instruction: 'Crie uma cena curta com duas pessoas em três momentos: habilidades, ontem e agora. Prepare-se para contá-la sem ler frases completas.',
                themes: [
                    'O que cada pessoa sabe e não sabe fazer',
                    'Onde as pessoas estavam ontem',
                    'O que cada pessoa está ou não está fazendo agora'
                ],
                checklist: [
                    'Usei can ou can’t seguido do verbo sem to.',
                    'Usei was ou were somente para lugar ou estado passado.',
                    'Usei am/is/are + verbo-ing para as ações atuais.'
                ]
            }
        };
    });
}());
