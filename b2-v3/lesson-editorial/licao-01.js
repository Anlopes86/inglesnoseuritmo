(function () {
    'use strict';

    window.V3LessonEditorial.register('b2-v3', 1, lesson => ({
        ...lesson,
        chunks: [
            ...lesson.chunks,
            { term: 'by the time', meaning: 'estabelece um ponto posterior de referência', example: 'By the time the supervisor arrived, the two witnesses had already given conflicting accounts.' }
        ],
        practice: [
            { label: 'Timeline', prompt: 'Place the three events on a timeline and choose the most useful narrative starting point.', answer: 'Begin with the discovery, then move back to what had happened before it.' },
            { label: 'Perspective', prompt: 'Retell the same incident first as a witness and then as an investigator.', answer: 'The witness foregrounds perception; the investigator foregrounds evidence and sequence.' },
            { label: 'Reformulate', prompt: 'Use “by the time” to connect the arrival and the completed interviews.', answer: 'By the time the manager arrived, the team had interviewed both witnesses.' },
            { label: 'Repair', prompt: 'Correct the temporal relationship: When the alarm had sounded, everyone left the room.', answer: 'When the alarm sounded, everyone left the room. / By the time help arrived, everyone had left.' },
            { label: 'Narrative choice', prompt: 'Explain why a speaker might delay revealing one event in a reconstruction.', answer: 'Delaying the event can preserve suspense or reflect the order in which the evidence became known.' }
        ]
    }));
}());
