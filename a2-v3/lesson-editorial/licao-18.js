(function () {
    'use strict';

    window.V3LessonEditorial.register('a2-v3', 18, data => ({
        ...data,
        bank: {
            ...data.bank,
            reviewListening: {
                title: 'Finding the urgent care clinic',
                script: 'Daniel has had a sore throat and a fever since Tuesday. On Thursday morning, he calls an urgent care clinic. The receptionist gives him an appointment at eleven fifteen and asks him to arrive ten minutes early. Daniel is near the central station, so she explains the route. He has to leave through the south exit, walk past the pharmacy, and cross Green Street at the traffic lights. The clinic is between a bank and a small café, across from the public library. Daniel repeats the directions to check them. The receptionist also advises him to bring identification and a list of any medicine he is taking.',
                questions: [
                    ['How long has Daniel had a sore throat and fever?', 'He has had them since Tuesday.'],
                    ['What time is his appointment?', 'His appointment is at eleven fifteen.'],
                    ['Which station exit should he use?', 'He should use the south exit.'],
                    ['Where is the clinic?', 'It is between a bank and a café, across from the library.'],
                    ['What two things should Daniel bring?', 'Identification and a list of his medicine.']
                ]
            },
            reviewSpeaking: [
                ['Symptoms', 'Describe two symptoms and say how long you have had them.', 'I have had a cough for three days, and I have felt tired since Monday.'],
                ['Appointment call', 'Ask for an appointment and confirm the time.', 'Could I make an appointment for today? Is eleven fifteen available?'],
                ['Route', 'Give directions from a station to a clinic using at least four steps.', 'Take the south exit, walk past the pharmacy, cross the street, and turn right.'],
                ['Check understanding', 'Repeat directions and ask whether they are correct.', 'So I go past the bank and turn left at the café, right?'],
                ['Unexpected condition', 'The south exit is closed. Explain a different route.', 'Use the north exit, walk through the station, and cross near the library.'],
                ['Full simulation', 'Explain the health problem, confirm the appointment and repeat the route.', 'I have had a fever since Tuesday. My appointment is at eleven fifteen, and I should use the north exit.']
            ]
        }
    }));
}());
