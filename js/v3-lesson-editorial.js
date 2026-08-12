(function installV3LessonEditorial(globalScope) {
    'use strict';

    if (globalScope.V3LessonEditorial) return;

    const transforms = new Map();
    const keyFor = (moduleId, lessonNumber) => `${String(moduleId).toLowerCase()}:${Number(lessonNumber)}`;

    function register(moduleId, lessonNumber, transform) {
        if (typeof transform !== 'function') {
            throw new TypeError('A transformação editorial da lição precisa ser uma função.');
        }
        const key = keyFor(moduleId, lessonNumber);
        const current = transforms.get(key) || [];
        current.push(transform);
        transforms.set(key, current);
    }

    function apply(moduleId, lessonNumber, lesson) {
        const registered = transforms.get(keyFor(moduleId, lessonNumber)) || [];
        return registered.reduce((current, transform) => transform(current) || current, lesson);
    }

    function has(moduleId, lessonNumber) {
        return transforms.has(keyFor(moduleId, lessonNumber));
    }

    globalScope.V3LessonEditorial = Object.freeze({ register, apply, has });
}(window));
