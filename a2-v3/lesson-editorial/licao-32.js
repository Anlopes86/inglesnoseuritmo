(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 32, data => ({
        ...data,
        bank: {
            ...data.bank,
            reviewListening: {
                title: 'A realistic plan for a new routine',
                script: 'Marina used to study English only before a trip or an important meeting. She did not use to practice every week, so she often forgot useful expressions. This year, she has created a more realistic routine. If she has a quiet morning, she listens to a short story and writes down five key words. If work is busy, she practices one spoken answer while she is cooking dinner. She prefers doing a small task instead of missing the whole day. Next month, she is meeting an international team at work, and she hopes to feel more confident. Unless her schedule changes, she is going to practice four times a week. Her teacher has advised her to record the same answer twice: once before feedback and once after it. Marina thinks this is the most useful strategy because she can hear her own progress.',
                questions: [
                    ['When did Marina use to study English?', 'Only before trips or important meetings.'],
                    ['What does she do on a quiet morning?', 'She listens to a short story and writes five key words.'],
                    ['How does she practice on a busy day?', 'She practices one spoken answer while cooking dinner.'],
                    ['What arrangement does she have next month?', 'She is meeting an international team at work.'],
                    ['How often is she going to practice?', 'Four times a week.'],
                    ['What has her teacher advised her to do?', 'Record the same answer before and after feedback.'],
                    ['Why does Marina like this strategy?', 'Because she can hear her own progress.']
                ]
            },
            reviewSpeaking: [
                ['Then and now', 'Describe a habit you used to have and what you do now.', 'I used to study only before tests, but now I practice every week.'],
                ['Health and practical need', 'Describe a symptom and explain how to reach a clinic.', 'I have had a cough since Monday. The clinic is across from the bank.'],
                ['Service problem', 'Report a problem and request a realistic solution.', 'The room is too noisy. Could I move to a quieter room?'],
                ['Preference', 'Use enjoy, avoid, prefer and decide in a connected answer.', 'I enjoy studying in the morning, avoid studying late, and prefer doing short tasks.'],
                ['Condition', 'Explain your main plan and a backup plan with if.', 'If I have time, I will study for thirty minutes. If I am busy, I will review five sentences.'],
                ['Best choice', 'Rank three study strategies and justify the best one.', 'Recording is the most useful strategy because I can compare my answers.'],
                ['Hope and intention', 'Say what you hope to improve and what you are going to do.', 'I hope to understand faster speech, so I am going to listen every day.'],
                ['Deadline and advice', 'Give advice for reaching a goal by a specific date.', 'You should practice four times a week and record your progress before the end of the month.'],
                ['Unexpected condition', 'Your available study time is cut in half. Adapt the plan.', 'I will keep the listening task and shorten the writing task.'],
                ['Final performance', 'Give a two-minute answer about progress, remaining difficulty and next steps.', 'I have become more confident, but listening is still difficult. I am going to follow a small weekly plan and record my answers.']
            ]
        }
    }));
}());
