(function registerA1CadencePilot() {
    'use strict';

    const curriculum = window.V3Curriculum;
    const registry = window.A1V3LessonRegistry;
    const retrieval = {
        names: ['A first hello', 'Apresente-se para o professor e pergunte o nome dele. Depois, troquem as falas.', 'Hi! I’m… / What’s your name?'],
        work: ['One name, two ways to say it', 'Diga seu nome fictício. O professor pede a grafia e confirma o que ouviu.', 'How do you spell that? / My name is…'],
        contact: ['Two people at work', 'Escolha uma profissão e um local de trabalho. Diga os dois e pergunte pela profissão do professor.', 'I’m a… / I work at… / What do you do?'],
        registration: ['A new colleague', 'Pergunte o nome do professor e confirme a grafia. Depois, pergunte pela profissão e pelo local de trabalho.', 'What’s your name? / How do you spell that? / What do you do?']
    };

    for (const preview of curriculum.a1CadencePilot) {
        const source = curriculum.getLesson('a1-v3', preview.sourceCurriculumId);
        const lesson = registry.get(source.number);
        const prompt = retrieval[preview.slug];
        const slides = [...lesson.slides];
        if (prompt) {
            const [title, instruction, support] = prompt;
            slides.unshift({
                id: 'pilot-retrieval',
                type: 'conversation',
                title,
                kicker: 'Quick start',
                instruction,
                tasks: [['Student', 'Comece a conversa.'], ['Teacher', 'Responda e confirme o que ouviu.']],
                goal: 'Ready for today?',
                challenge: support
            });
        }
        registry.registerPreview(preview.id, { ...lesson, slides });
    }
}());
