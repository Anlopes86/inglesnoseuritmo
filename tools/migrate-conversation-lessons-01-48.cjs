const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const conversationDir = path.join(root, 'conversation');
const outputPath = path.join(conversationDir, 'conversation-lessons-01-48-data.js');

function decode(value) {
    return String(value || '')
        .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;|&#34;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&ndash;/g, '–')
        .replace(/&mdash;/g, '—')
        .replace(/&hellip;/g, '…')
        .replace(/\s+/g, ' ')
        .trim();
}

function blocksByClass(html, className) {
    const stack = [];
    const blocks = [];
    const tagPattern = /<\/?div\b[^>]*>/gi;
    let match;
    while ((match = tagPattern.exec(html))) {
        if (/^<\/div/i.test(match[0])) {
            const start = stack.pop();
            if (start?.wanted) blocks.push({ index: start.index, html: html.slice(start.index, tagPattern.lastIndex) });
            continue;
        }
        const classes = match[0].match(/class\s*=\s*["']([^"']*)["']/i)?.[1].split(/\s+/) || [];
        stack.push({ index: match.index, wanted: classes.includes(className) });
    }
    return blocks.sort((left, right) => left.index - right.index).map((block) => block.html);
}

function texts(html, pattern) {
    return [...String(html || '').matchAll(pattern)].map((match) => decode(match[1])).filter(Boolean);
}

function heading(slide) {
    return texts(slide, /<h[1-4]\b[^>]*>([\s\S]*?)<\/h[1-4]>/gi)[0] || '';
}

function questions(slide) {
    return texts(slide, /<(?:p|li)\b[^>]*>([\s\S]*?)<\/(?:p|li)>/gi)
        .filter((text) => text.endsWith('?'));
}

function firstSentence(value) {
    const text = decode(value);
    return text.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() || text;
}

function topicLabel(title) {
    return title.replace(/\s*&\s*/g, ', ').replace(/^The\s+/i, '').toLowerCase();
}

function unique(items) {
    const seen = new Set();
    return items.filter((item) => {
        const key = item.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function normalizeQuestion(value) {
    const text = decode(value).replace(/^[•\-–—*\d.)\s]+/, '').trim();
    if (!text) return '';
    return text.endsWith('?') ? text : `${text.replace(/[.!]+$/, '')}?`;
}

function warmupsFor(title, current) {
    const topic = topicLabel(title);
    const fallbacks = [
        `Which part of ${topic} is closest to your everyday life?`,
        `What is one recent experience you connect with ${topic}, and what happened?`,
        `What do you usually enjoy or avoid about ${topic}? Why?`,
        `Has your view of ${topic} changed over time? Give an example.`,
        `If you could change one thing about ${topic} this week, what would you choose?`
    ];
    return unique([...current.map(normalizeQuestion), ...fallbacks]).slice(0, 5);
}

function debateQuestions(song, title, current) {
    const theme = topicLabel(title);
    const name = song.title;
    const normalized = current.map(normalizeQuestion).filter(Boolean);
    const personal = normalized[0] || `What personal experience or reaction connects you to “${name}”, and why?`;
    const culture = normalized[1] || `How does the central idea in “${name}” appear in culture or everyday life around ${theme}? Which example supports your answer?`;
    const opinion = normalized[2] || `Which interpretation of “${name}” fits the theme of ${theme} best, and what supports your view?`;
    const debate = normalized[3] || `Hot take: the attitude in “${name}” is useful in real life but hides an important trade-off. Do you agree? Why?`;
    return [personal, culture, opinion, debate];
}

function expressionData(slides, html) {
    const expressionSlide = slides.find((slide) => /key (?:expressions|vocabulary)|useful expressions|financial vocabulary|historical vocabulary|ethical vocabulary|fashion vocabulary|work vocabulary/i.test(heading(slide))) || slides[1] || '';
    let cards = blocksByClass(expressionSlide, 'flashcard');
    if (cards.length < 6) cards = blocksByClass(html, 'flashcard');
    const expressions = cards.slice(0, 6).map((card, index) => {
        const headings = texts(card, /<h[3-5]\b[^>]*>([\s\S]*?)<\/h[3-5]>/gi);
        const paragraphs = texts(card, /<p\b[^>]*>([\s\S]*?)<\/p>/gi);
        const term = headings[0] || paragraphs[0] || `Expression ${index + 1}`;
        const meaning = paragraphs.find((paragraph) => paragraph !== term && !/[“”"].*[“”"]/.test(paragraph)) || paragraphs[0] || `A useful expression connected with the lesson theme.`;
        const example = paragraphs.find((paragraph) => /[“”"].*[“”"]/.test(paragraph))?.replace(/^[“"]|[”"]$/g, '')
            || paragraphs.find((paragraph) => paragraph !== meaning && paragraph !== term)
            || `This situation is a clear example of ${term}.`;
        return { term, meaning, example, practice: `${meaning.replace(/[.!?]+$/, '')}: {gap}.` };
    });
    while (expressions.length < 6) {
        const number = expressions.length + 1;
        expressions.push({
            term: `Useful phrase ${number}`,
            meaning: 'A phrase to support the conversation.',
            example: `The speaker used useful phrase ${number} to explain the idea clearly.`,
            practice: 'A phrase to support the conversation: {gap}.'
        });
    }
    return expressions.slice(0, 6);
}

function songHeadingParts(value, index) {
    const clean = decode(value).replace(/^.*?(?:Song\s*[123]|Music Time)\s*:\s*/i, '').trim();
    const parentheticalArtist = clean.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
    if (parentheticalArtist) return { title: parentheticalArtist[1].trim(), artist: parentheticalArtist[2].trim() };
    const separator = clean.lastIndexOf(' - ');
    if (separator < 0) return { title: clean || `Song ${index + 1}`, artist: 'Artist pending source review' };
    return { title: clean.slice(0, separator).trim(), artist: clean.slice(separator + 3).trim() };
}

function sourceSongs(slides, html, lessonTitle) {
    const musicSlides = slides.filter((slide) => /(?:Song\s*[123]|Music Time)\s*:/i.test(heading(slide)) && !/debate|discussion|conversation/i.test(heading(slide)));
    const globalSongHeadings = texts(html, /<h[12]\b[^>]*>([\s\S]*?(?:Song\s*[123]|Music Time)\s*:[\s\S]*?)<\/h[12]>/gi)
        .filter((value) => !/debate|discussion|conversation/i.test(value));
    const frameSources = [...html.matchAll(/<iframe\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi)]
        .map((match) => match[1])
        .filter((source) => /spotify|youtube|youtu\.be/i.test(source));
    const result = [];
    for (let index = 0; index < 3; index += 1) {
        const slide = musicSlides[index] || '';
        const parts = songHeadingParts(heading(slide) || globalSongHeadings[index], index);
        const src = slide.match(/<iframe\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] || frameSources[index] || '';
        const trackId = src.match(/open\.spotify\.com\/embed\/track\/([A-Za-z0-9]{22})/i)?.[1] || null;
        const slidePosition = slides.indexOf(slide);
        const debateSlide = slidePosition >= 0 ? slides[slidePosition + 1] : '';
        const currentQuestions = debateSlide && /debate|discussion|conversation|song/i.test(heading(debateSlide)) ? questions(debateSlide) : [];
        const song = {
            title: parts.title,
            artist: parts.artist,
            sourceEmbed: src,
            spotifyId: trackId,
            angle: `${parts.title} offers a concrete listening lens for the lesson theme of ${topicLabel(lessonTitle)}.`,
            discussionTitle: `${parts.title}: ideas, choices, and real-life consequences`
        };
        song.questions = debateQuestions(song, lessonTitle, currentQuestions);
        result.push(song);
    }
    return result;
}

function contextFromSlide(slide, fallbackTitle, lessonTitle, type) {
    const title = heading(slide) || fallbackTitle;
    const paragraphs = texts(slide, /<p\b[^>]*>([\s\S]*?)<\/p>/gi);
    const cardBlocks = blocksByClass(slide, 'debate-card');
    const cards = cardBlocks.slice(0, 4).map((card, index) => ({
        title: texts(card, /<(?:h[3-5]|strong|b)\b[^>]*>([\s\S]*?)<\/(?:h[3-5]|strong|b)>/gi)[0] || `Option ${index + 1}`,
        text: firstSentence(texts(card, /<p\b[^>]*>([\s\S]*?)<\/p>/gi)[0] || decode(card))
    }));
    const defaultCards = type === 'everyday' ? [
        { title: 'Home', text: 'Choose a realistic situation from home or family life.' },
        { title: 'Study', text: 'Apply the idea to learning, school, or a personal project.' },
        { title: 'Work', text: 'Move the issue into a professional decision or conversation.' },
        { title: 'Community', text: 'Consider how the choice affects other people nearby.' }
    ] : [
        { title: 'Option A', text: 'Choose the safer or more familiar path.' },
        { title: 'Option B', text: 'Choose the bolder path with a possible benefit and cost.' },
        { title: 'Trade-off', text: 'Name what each option gains and gives up.' },
        { title: 'Role-play', text: 'Defend one option, then switch sides and challenge it.' }
    ];
    while (cards.length < 4) cards.push(defaultCards[cards.length]);
    const topic = topicLabel(lessonTitle);
    return {
        title,
        kicker: paragraphs[0] || (type === 'everyday' ? 'Take the song idea into a real situation.' : 'Make a decision and defend the trade-off.'),
        intro: paragraphs[1] || (type === 'everyday'
            ? `Choose one everyday situation involving ${topic}. Explain what is happening, what matters, and what you would say or do.`
            : `Compare two realistic options involving ${topic}. Role-play the decision, ask a follow-up question, and then switch positions.`),
        prompt: normalizeQuestion(paragraphs.find((paragraph) => paragraph.endsWith('?')) || (type === 'everyday'
            ? `Which situation would create the most useful real conversation about ${topic}`
            : `Which option would you choose, what would you give up, and why`)),
        cards: cards.slice(0, 4),
        icon: type === 'everyday' ? 'fa-location-dot' : 'fa-scale-balanced'
    };
}

function currentContextSlides(slides) {
    const positions = [4, 7];
    return positions.map((position) => {
        const slide = slides[position];
        if (!slide) return '';
        const title = heading(slide);
        return /song\s*[123]|music time|debate|discussion|conversation/i.test(title) || /practice|homework|well done|congrat/i.test(title) ? '' : slide;
    });
}

function speakingFor(title, expressions, slide) {
    const topic = topicLabel(title);
    const current = questions(slide || '');
    const prompts = unique([
        ...current,
        `Tell a two-minute personal story connected with ${topic}. What happened, and what did you learn?`,
        `What position do you take on one difficult question about ${topic}, and why?`,
        `What realistic plan or solution would improve one situation involving ${topic}?`,
        `Which counterargument about ${topic} is strongest, and how would you respond to it?`
    ]).slice(0, 4);
    return {
        title: `Your Voice: ${title}`,
        icon: 'fa-microphone-lines',
        prompts,
        support: expressions.slice(0, 4).map((expression) => expression.term)
    };
}

function homeworkFor(title, expressions, slide) {
    const topic = topicLabel(title);
    const current = texts(slide || '', /<(?:p|li)\b[^>]*>([\s\S]*?)<\/(?:p|li)>/gi)
        .filter((text) => !/homework|choose one|words|example|model/i.test(text));
    const task = current[0] || `Write 120–180 words about a real or imagined situation involving ${topic}. State your position, give one concrete example, and use at least two lesson expressions.`;
    const first = expressions[0];
    const second = expressions[1];
    return {
        task,
        model: `${first.example} ${second.example}`,
        requiredExpressions: [first.term, second.term]
    };
}

function lessonFromHtml(lessonNumber) {
    const padded = String(lessonNumber).padStart(2, '0');
    const html = fs.readFileSync(path.join(conversationDir, `licao-${padded}.html`), 'utf8');
    const slides = blocksByClass(html, 'slide');
    const rawTitle = decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
        || html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]
        || `Lesson ${lessonNumber}`);
    const title = rawTitle.replace(/^.*?(?:Lesson|Li[cç][aã]o)\s*\d+\s*[:\-]?\s*/i, '').trim() || `Conversation Lesson ${lessonNumber}`;
    const expressions = expressionData(slides, html);
    const currentContexts = currentContextSlides(slides);
    const homeworkSlide = slides.find((slide) => /homework/i.test(heading(slide))) || '';
    const speakingSlide = slides.find((slide) => /reflection|your (?:voice|turn|vision)|application|speaking|open discussion|personal/i.test(heading(slide)) && !/warm-up/i.test(heading(slide))) || '';
    const closingSlide = slides.find((slide) => /well done|congrat|wrap-up|closing/i.test(heading(slide))) || slides.at(-1) || '';
    const warmupCurrent = questions(slides[0] || '');
    return {
        lessonNumber,
        title,
        icon: 'fa-comments',
        accent: ['green', 'blue', 'purple', 'amber', 'rose', 'cyan'][lessonNumber % 6],
        warmupTitle: `Warm-up: ${title}`,
        warmupIntro: firstSentence(texts(slides[0] || '', /<p\b[^>]*>([\s\S]*?)<\/p>/gi)[0]) || `Start with your own experience before exploring ${topicLabel(title)} in songs and real situations.`,
        warmups: warmupsFor(title, warmupCurrent),
        expressions,
        songs: sourceSongs(slides, html, title),
        contexts: [
            contextFromSlide(currentContexts[0], `${title}: Everyday Transfer`, title, 'everyday'),
            contextFromSlide(currentContexts[1], `${title}: Decision Lab`, title, 'decision')
        ],
        practice: expressions.map((expression) => ({ text: expression.practice, answer: expression.term })),
        speaking: speakingFor(title, expressions, speakingSlide),
        homework: homeworkFor(title, expressions, homeworkSlide),
        closing: texts(closingSlide, /<p\b[^>]*>([\s\S]*?)<\/p>/gi).at(-1) || `Keep the language from ${title} active in your next real conversation.`,
        migration: {
            source: `licao-${padded}.html`,
            sourceSlides: slides.length,
            generatedAt: '2026-08-31',
            commercialLyricsCopied: false
        }
    };
}

const lessons = Object.fromEntries(Array.from({ length: 48 }, (_, index) => {
    const lesson = lessonFromHtml(index + 1);
    return [lesson.lessonNumber, lesson];
}));

const sourceRepairs = {
    '20:1': { title: 'Man in the Mirror - 2012 Remaster', artist: 'Michael Jackson', spotifyId: '3c7Ctlw9MKlIQPxRH3fOTt' },
    '44:0': { title: 'Circle of Life', artist: 'Carmen Twillie, Lebo M.', spotifyId: '0H2960m5fFKxfEsOvJgI3W' },
    '35:1': { title: 'Forget You', artist: 'CeeLo Green', spotifyId: '4TkgS6YXKZs37syf8v4p6O' },
    '3:0': { title: 'We’re Not Gonna Take It', artist: 'Twisted Sister', spotifyId: '3jAC3fhzXv845UJ31kCz81' },
    '3:1': { title: '(You Gotta) Fight for Your Right (To Party!)', artist: 'Beastie Boys', spotifyId: '3lOfn6p6lpzdgEZ2WQc5gw' },
    '3:2': { title: 'Born to Be Wild', artist: 'Steppenwolf', spotifyId: '3X1NknOHgWu36PB2STGRza' },
    '17:1': { title: 'Teach Your Children', artist: 'Crosby, Stills, Nash & Young', spotifyId: '29HaKOpeLSYvqdFyEQSRdj' },
    '24:0': { title: 'BREAK MY SOUL', artist: 'Beyoncé', spotifyId: '5pyoxDZ1PX0KxBxiRVxA4U' },
    '26:0': { title: 'Human', artist: "Rag'n'Bone Man" },
    '26:1': { title: 'Lost on You', artist: 'LP' },
    '26:2': { title: 'Stressed Out', artist: 'Twenty One Pilots' },
    '28:2': { title: 'Waiting on the World to Change', artist: 'John Mayer', spotifyId: '2pL0vXYCCaHBLA8KhByKeH' },
    '30:2': { title: 'Thrift Shop (feat. Wanz)', artist: 'Macklemore & Ryan Lewis', spotifyId: '4YMqbFcDIFiCBd02PzUBcM' },
    '45:0': { title: 'Paradise', artist: 'Coldplay', spotifyId: '6nek1Nin9q48AVZcWs9e9D' },
    '45:2': { title: 'Africa', artist: 'TOTO', spotifyId: '6plRwenssWRPbd5WIT1OLO' },
    '47:1': { title: 'Ironic', artist: 'Alanis Morissette', spotifyId: '1d6KS9GH06JAd19uiBy9IE' },
    '47:2': { title: 'Always Look on the Bright Side of Life', artist: 'Monty Python', spotifyId: '5jFEwZg18Ojv9m15to6qo8' }
};
Object.entries(sourceRepairs).forEach(([key, repair]) => {
    const [lessonNumber, songIndex] = key.split(':').map(Number);
    const song = lessons[lessonNumber].songs[songIndex];
    Object.assign(song, repair);
    if (repair.spotifyId) song.sourceEmbed = `https://open.spotify.com/embed/track/${repair.spotifyId}`;
    song.questions = debateQuestions(song, lessons[lessonNumber].title, song.questions);
});

// Consolidate the two material DOM patches that changed the actual lesson source.
lessons[34].songs[1] = {
    ...lessons[34].songs[1],
    title: 'Private Eyes',
    artist: 'Daryl Hall & John Oates',
    spotifyId: '7bcVDJxfhWV6KNfDsjxFTx',
    sourceEmbed: 'https://open.spotify.com/embed/track/7bcVDJxfhWV6KNfDsjxFTx',
    angle: 'A playful but unsettling song about observation, suspicion, and hidden intentions.',
    discussionTitle: 'Suspicion, evidence, and hidden motives'
};
lessons[34].songs[1].questions = debateQuestions(lessons[34].songs[1], lessons[34].title, lessons[34].songs[1].questions);

lessons[47].songs[0] = {
    ...lessons[47].songs[0],
    title: 'Make ’Em Laugh',
    artist: 'Donald O’Connor',
    spotifyId: '43v5F0LQ6Le8XaCfx5bwD3',
    sourceEmbed: 'https://open.spotify.com/embed/track/43v5F0LQ6Le8XaCfx5bwD3',
    angle: 'Physical comedy, performance, and the ridiculous effort behind making an audience laugh.',
    discussionTitle: 'Physical comedy and timing'
};
lessons[47].songs[0].questions = debateQuestions(lessons[47].songs[0], lessons[47].title, lessons[47].songs[0].questions);

const source = `(function installConversationLessons0148(globalScope) {\n    'use strict';\n\n    const lessons = ${JSON.stringify(lessons, null, 4).replace(/</g, '\\u003c')};\n\n    globalScope.CONVERSATION_LESSONS_01_48 = Object.freeze(lessons);\n}(window));\n`;
fs.writeFileSync(outputPath, source, 'utf8');

const invalid = Object.values(lessons).filter((lesson) => lesson.warmups.length !== 5
    || lesson.expressions.length !== 6
    || lesson.songs.length !== 3
    || lesson.songs.some((song) => song.questions.length !== 4)
    || lesson.contexts.length !== 2
    || lesson.practice.length !== 6
    || lesson.speaking.prompts.length !== 4
    || !lesson.homework.task
    || !lesson.homework.model);

console.log(JSON.stringify({
    output: path.relative(root, outputPath),
    lessons: Object.keys(lessons).length,
    songs: Object.values(lessons).reduce((sum, lesson) => sum + lesson.songs.length, 0),
    exactSpotifyIds: Object.values(lessons).flatMap((lesson) => lesson.songs).filter((song) => /^[A-Za-z0-9]{22}$/.test(song.spotifyId || '')).length,
    invalid: invalid.map((lesson) => lesson.lessonNumber)
}, null, 2));

if (invalid.length) process.exitCode = 1;
