(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 21, data => ({
        ...data,
        bank: {
            ...data.bank,
            reviewListening: {
                title: 'A room that was not ready',
                script: 'When Sofia arrived at the hotel, her room was not ready. She did not mind waiting for a few minutes, so she decided to have coffee in the lobby. After half an hour, the receptionist said the room still needed cleaning. Sofia explained that she wanted to change clothes before an important dinner. The receptionist apologized and offered a different room on the same floor. Sofia agreed to move, but when she opened the door, she noticed that the air conditioner was not working. This time, the hotel sent a technician immediately and offered breakfast at no extra cost. Sofia preferred staying in the second room because it was quieter and had a better view.',
                questions: [
                    ['Why did Sofia wait in the lobby?', 'Because her room was not ready.'],
                    ['What did she decide to do while she waited?', 'She decided to have coffee.'],
                    ['Why did she need the room soon?', 'She wanted to change before an important dinner.'],
                    ['What problem did the second room have?', 'The air conditioner was not working.'],
                    ['Why did Sofia prefer the second room?', 'It was quieter and had a better view.']
                ]
            },
            reviewSpeaking: [
                ['Explain a problem', 'Report a hotel problem clearly and politely.', 'Excuse me, the air conditioner in my room is not working.'],
                ['Request', 'Ask for a specific solution.', 'Could someone check it, or could I change rooms?'],
                ['Preference', 'Say what you prefer doing while you wait.', 'I prefer waiting in the lobby because it is quieter.'],
                ['Verb pattern', 'Use enjoy, avoid, decide and want in four connected sentences.', 'I enjoy traveling, but I avoid arriving late. I decided to book early because I wanted a quiet room.'],
                ['Service recovery', 'The replacement room is smaller. Accept it only with one condition.', 'I can accept the smaller room if breakfast is included.'],
                ['Second attempt', 'Perform the complete complaint and negotiate a solution.', 'The room is not ready, and I need to change before dinner. Could you offer another room or keep my bags safely?']
            ]
        }
    }));
}());
