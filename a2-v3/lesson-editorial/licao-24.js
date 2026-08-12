(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 24, data => ({
        ...data,
        bank: {
            ...data.bank,
            reviewListening: {
                title: 'A routine that changed',
                script: 'When Lucas was a teenager, he used to spend every evening playing video games. He did not use to exercise, and he often stayed awake after midnight. Two years ago, he started a job that required more energy in the morning. At first, changing his routine was difficult. Now he walks after work and prepares his clothes and breakfast before going to bed. If he finishes work early, he goes to the gym. If he is tired, he takes a shorter walk instead. He says he will not return to his old routine unless his schedule changes completely. Small alternatives have helped him continue.',
                questions: [
                    ['What did Lucas use to do every evening?', 'He used to play video games.'],
                    ['What did he not use to do?', 'He did not use to exercise.'],
                    ['Why did he change his routine?', 'His new job required more energy in the morning.'],
                    ['What does he do if he finishes work early?', 'He goes to the gym.'],
                    ['What does he do when he is tired?', 'He takes a shorter walk.']
                ]
            },
            reviewSpeaking: [
                ['Then and now', 'Describe one past habit and contrast it with your routine now.', 'I used to study late, but now I study before dinner.'],
                ['Past question', 'Ask three questions with Did you use to...?', 'Did you use to play outside? Did you use to live here? Did you use to walk to school?'],
                ['Real condition', 'Explain what you do if you have a busy day.', 'If I have a busy day, I review for ten minutes.'],
                ['Future result', 'Connect one new habit to a future result.', 'If I walk every day, I will have more energy.'],
                ['Backup plan', 'Create a main routine and an easier alternative.', 'If I finish early, I will go to the gym. If I am tired, I will walk for fifteen minutes.'],
                ['Unexpected condition', 'Your schedule changes completely next week. Adapt your plan.', 'If I start earlier, I will exercise after lunch instead.'],
                ['Second attempt', 'Give a one-minute answer about past habit, present routine and future result.', 'I used to sleep late, but now I prepare for bed earlier. If I continue, I will feel better in the morning.']
            ]
        }
    }));
}());
