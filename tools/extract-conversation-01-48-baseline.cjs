const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const conversationDir = path.join(root, 'conversation');
const outputPath = path.join(root, 'docs', 'conversation-01-48-baseline.md');
const themeSource = fs.readFileSync(path.join(conversationDir, 'conversation-lesson-theme.js'), 'utf8');

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
    const starts = [];
    const blocks = [];
    const tagPattern = /<\/?div\b[^>]*>/gi;
    let match;
    while ((match = tagPattern.exec(html))) {
        const tag = match[0];
        if (/^<\/div/i.test(tag)) {
            const start = starts.pop();
            if (start?.wanted) blocks.push(html.slice(start.index, tagPattern.lastIndex));
            continue;
        }
        const classMatch = tag.match(/class\s*=\s*["']([^"']*)["']/i);
        const classes = classMatch ? classMatch[1].split(/\s+/) : [];
        starts.push({ index: match.index, wanted: classes.includes(className) });
    }
    return blocks.sort((left, right) => html.indexOf(left) - html.indexOf(right));
}

function textMatches(html, pattern) {
    return [...html.matchAll(pattern)].map((match) => decode(match[1])).filter(Boolean);
}

function heading(slide) {
    return textMatches(slide, /<h[1-4]\b[^>]*>([\s\S]*?)<\/h[1-4]>/gi)[0] || '(untitled)';
}

function iframeInfo(slide) {
    const frames = [...slide.matchAll(/<iframe\b([^>]*)>/gi)];
    return frames.map((frame) => {
        const attrs = frame[1];
        return {
            src: attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] || '',
            title: attrs.match(/\btitle\s*=\s*["']([^"']+)["']/i)?.[1] || ''
        };
    });
}

function playerType(src) {
    if (/open\.spotify\.com\/embed\/track\//i.test(src)) return 'spotify-track';
    if (/open\.spotify\.com\/embed\/search\//i.test(src)) return 'spotify-search';
    if (/youtube(?:-nocookie)?\.com|youtu\.be/i.test(src)) return 'youtube';
    if (!src) return 'none';
    return 'other';
}

function spotifyId(src) {
    return src.match(/open\.spotify\.com\/embed\/track\/([A-Za-z0-9]{22})/i)?.[1] || '—';
}

function likelyQuestions(slide) {
    const candidates = textMatches(slide, /<(?:p|li)\b[^>]*>([\s\S]*?)<\/(?:p|li)>/gi);
    return candidates.filter((text) => /\?|^(?:tell|describe|choose|compare|imagine|explain|give|think|discuss|rank|create|design|role-play)\b/i.test(text));
}

function localScriptErrors(html, filePath) {
    const errors = [];
    const scripts = [...html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
    for (const source of scripts) {
        if (/^(?:https?:)?\/\//i.test(source)) continue;
        const absolute = path.resolve(path.dirname(filePath), source.split(/[?#]/)[0]);
        if (!fs.existsSync(absolute)) errors.push(`missing script ${source}`);
    }
    const firebaseCount = scripts.filter((source) => /firebase-(?:app|firestore|auth)-compat\.js/i.test(source)).length;
    if (firebaseCount > 3) errors.push(`duplicate Firebase scripts (${firebaseCount})`);
    return errors;
}

function themePatchesFor(lessonNumber, html) {
    const patches = [];
    if (new RegExp(`licao-${String(lessonNumber).padStart(2, '0')}\\\\.html`, 'i').test(themeSource)) {
        patches.push('lesson-specific DOM patch');
    }
    const replacementMap = themeSource.match(/const lighterPrompts\s*=\s*\{([\s\S]*?)\n\s*\};/);
    if (replacementMap) {
        const pairs = [...replacementMap[1].matchAll(/^[ \t]*(['"])(.*?)\1\s*:\s*(['"])(.*?)\3,?\s*$/gm)];
        const hits = pairs.filter((pair) => html.includes(pair[2])).length;
        if (hits) patches.push(`${hits} prompt rewrite(s)`);
    }
    if (lessonNumber === 34) patches.push('song 2 changed to Private Eyes at runtime');
    if (lessonNumber === 47) patches.push('track IDs, song 1, listening text and practice changed at runtime');
    return [...new Set(patches)];
}

function auditLesson(lessonNumber) {
    const padded = String(lessonNumber).padStart(2, '0');
    const filePath = path.join(conversationDir, `licao-${padded}.html`);
    const html = fs.readFileSync(filePath, 'utf8');
    const slides = blocksByClass(html, 'slide');
    const slideHeadings = slides.map(heading);
    const title = decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
        || html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]
        || `Lesson ${lessonNumber}`)
        .replace(/^.*?Lesson\s*\d+\s*[:\-]?\s*/i, '') || `Lesson ${lessonNumber}`;
    const flashcardBlocks = blocksByClass(html, 'flashcard');
    const expressions = flashcardBlocks.slice(0, 6).map((card) => {
        const term = textMatches(card, /<h[34]\b[^>]*>([\s\S]*?)<\/h[34]>/gi)[0] || '(missing)';
        const paragraphs = textMatches(card, /<p\b[^>]*>([\s\S]*?)<\/p>/gi);
        return `${term}${paragraphs.length ? ` — ${paragraphs.join(' / ')}` : ''}`;
    });
    const musicSlides = slides.filter((slide) => /Song\s*[123]\s*:/i.test(decode(slide)) || /\b(?:lyrics-box|music-player)\b/i.test(slide));
    const songs = musicSlides.slice(0, 3).map((slide, index) => {
        const songHeading = heading(slide).replace(/^.*?Song\s*\d+\s*:\s*/i, '');
        const frame = iframeInfo(slide)[0] || { src: '', title: '' };
        const legacyAnswers = [...slide.matchAll(/data-answer\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
        const inputCount = (slide.match(/<input\b/gi) || []).length;
        return {
            index: index + 1,
            label: songHeading || `(unparsed song ${index + 1})`,
            player: playerType(frame.src),
            spotifyId: spotifyId(frame.src),
            iframeTitle: frame.title,
            inputCount,
            legacyAnswers
        };
    });
    const warmupQuestions = slides[0] ? likelyQuestions(slides[0]) : [];
    const debateCounts = songs.map((song, songIndex) => {
        const musicPosition = slides.indexOf(musicSlides[songIndex]);
        return musicPosition >= 0 && slides[musicPosition + 1] ? likelyQuestions(slides[musicPosition + 1]).length : 0;
    });
    const headingsText = slideHeadings.join(' | ');
    const contextCount = slideHeadings.filter((value) => /context|scenario|challenge|case|role-play|world|workshop|lab|situation|debate|dilemma|spotlight|culture|real life|transfer/i.test(value) && !/song\s*\d/i.test(value)).length;
    const practice = slideHeadings.find((value) => /practice|expressions|vocabulary|match/i.test(value) && !/key expressions/i.test(value)) || 'not clearly identified';
    const speaking = slideHeadings.find((value) => /speak|application|reflection|your turn|production|final discussion|creative task/i.test(value)) || 'not clearly identified';
    const homeworkSlide = slides.find((slide) => /homework/i.test(heading(slide))) || '';
    const homeworkText = decode(homeworkSlide);
    const homework = homeworkSlide ? `present; example/model: ${/example|model|for example|e\.g\./i.test(homeworkText) ? 'yes' : 'no'}` : 'missing';
    const lyricSignals = musicSlides.reduce((total, slide) => total + (slide.match(/<p\b[^>]*>/gi) || []).length, 0);
    const placeholder = /placeholder|copyright-safe|coming soon|under review|awaiting verification|generated listening/i.test(musicSlides.join('\n'));
    const synthetic = /complete the interpretation|listening focus|the song (?:shows|suggests|explores|connects)|overall mood/i.test(musicSlides.join('\n'));
    const likelyInlineLyrics = musicSlides.some((slide) => {
        const text = decode(slide);
        return /lyrics?/i.test(slide) && text.split(/\s+/).length > 110 && (slide.match(/data-answer\s*=/gi) || []).length >= 5;
    });
    const errors = [
        ...localScriptErrors(html, filePath),
        ...(html.match(/<!doctype\s+html/gi) || []).length > 1 ? ['nested/duplicate HTML document'] : [],
        ...iframeInfo(html).filter((frame) => !frame.title).map(() => 'iframe without title'),
        ...iframeInfo(html).filter((frame) => playerType(frame.src) === 'spotify-search').map(() => 'Spotify search embed'),
        ...iframeInfo(html).filter((frame) => playerType(frame.src) === 'youtube').map(() => 'YouTube music embed'),
        ...iframeInfo(html).filter((frame) => /open\.spotify\.com\/embed\/track\//i.test(frame.src) && spotifyId(frame.src) === '—').map(() => 'invalid Spotify track ID')
    ];
    return {
        lessonNumber,
        title,
        slideCount: slides.length,
        slideHeadings,
        warmupQuestions,
        expressions,
        songs,
        debateCounts,
        contextCount,
        practice,
        speaking,
        homework,
        flags: [likelyInlineLyrics ? 'likely commercial lyric text' : null, synthetic ? 'synthetic interpretation' : null, placeholder ? 'placeholder/backstage text' : null].filter(Boolean),
        lyricSignals,
        themePatches: themePatchesFor(lessonNumber, html),
        errors: [...new Set(errors)],
        headingSummary: headingsText
    };
}

const lessons = Array.from({ length: 48 }, (_, index) => auditLesson(index + 1));
const generatedAt = new Date().toISOString();
const lines = [
    '# Baseline — Conversation lessons 01–48',
    '',
    `Generated read-only at ${generatedAt} from commit ${process.env.GIT_COMMIT || 'see git metadata below'}.`,
    '',
    '> This is a mechanical inventory of the pre-migration HTML. “Likely” findings are deliberately conservative and require editorial review.',
    '',
    '## Summary',
    '',
    `- Lessons: ${lessons.length}`,
    `- Slides: ${lessons.reduce((sum, lesson) => sum + lesson.slideCount, 0)} total; ${lessons.filter((lesson) => lesson.slideCount === 14).length}/48 already have 14.`,
    `- Music slides detected: ${lessons.reduce((sum, lesson) => sum + lesson.songs.length, 0)}.`,
    `- Pages with likely persisted commercial lyrics: ${lessons.filter((lesson) => lesson.flags.includes('likely commercial lyric text')).length}.`,
    `- Pages with synthetic interpretations in music activities: ${lessons.filter((lesson) => lesson.flags.includes('synthetic interpretation')).length}.`,
    `- Pages with placeholders/backstage text: ${lessons.filter((lesson) => lesson.flags.includes('placeholder/backstage text')).length}.`,
    '',
    '## Inventory table',
    '',
    '| L | Title | Slides | Warm-up prompts | Debate cards 1/2/3 | Contexts | Practice | Oral production | Homework | Music/content flags | Theme patches | Technical/accessibility errors |',
    '|---:|---|---:|---:|---|---:|---|---|---|---|---|---|'
];

for (const lesson of lessons) {
    const clean = (value) => String(value || '—').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
    lines.push(`| ${lesson.lessonNumber} | ${clean(lesson.title)} | ${lesson.slideCount} | ${lesson.warmupQuestions.length} | ${lesson.debateCounts.join('/')} | ${lesson.contextCount} | ${clean(lesson.practice)} | ${clean(lesson.speaking)} | ${clean(lesson.homework)} | ${clean(lesson.flags.join('; ') || 'none detected')} | ${clean(lesson.themePatches.join('; ') || 'none')} | ${clean(lesson.errors.join('; ') || 'none detected')} |`);
}

lines.push('', '## Per-lesson details', '');
for (const lesson of lessons) {
    lines.push(`### L${String(lesson.lessonNumber).padStart(2, '0')} — ${lesson.title}`, '');
    lines.push(`- Slide headings (${lesson.slideCount}): ${lesson.slideHeadings.join(' → ') || 'none parsed'}`);
    lines.push(`- Warm-up (${lesson.warmupQuestions.length}): ${lesson.warmupQuestions.join(' / ') || 'none parsed'}`);
    lines.push(`- Six-expression inventory (${lesson.expressions.length}): ${lesson.expressions.join(' || ') || 'none parsed'}`);
    lines.push(`- Music (${lesson.songs.length}): ${lesson.songs.map((song) => `${song.index}. ${song.label} [${song.player}; ${song.spotifyId}; iframe title ${song.iframeTitle ? 'yes' : 'no'}; ${song.inputCount} inputs; ${song.legacyAnswers.length} persisted answers]`).join(' || ') || 'none parsed'}`);
    lines.push(`- Post-song question counts: ${lesson.debateCounts.join(' / ') || 'none parsed'}`);
    lines.push(`- Context/transfer candidates: ${lesson.contextCount}. Practice: ${lesson.practice}. Oral production: ${lesson.speaking}. Homework: ${lesson.homework}.`);
    lines.push(`- Persisted music-content assessment: ${lesson.flags.join('; ') || 'none mechanically detected'}; music paragraphs scanned: ${lesson.lyricSignals}.`);
    lines.push(`- Runtime theme corrections: ${lesson.themePatches.join('; ') || 'none detected'}.`);
    lines.push(`- HTML/JS/player/accessibility findings: ${lesson.errors.join('; ') || 'none mechanically detected'}.`, '');
}

lines.push('## Git metadata', '', '```text');
try {
    const { execFileSync } = require('child_process');
    lines.push(`branch: ${execFileSync('git', ['branch', '--show-current'], { cwd: root, encoding: 'utf8' }).trim()}`);
    lines.push(`commit: ${execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()}`);
} catch (error) {
    lines.push(`git metadata unavailable: ${error.message}`);
}
lines.push('```', '');

fs.writeFileSync(outputPath, `${lines.join('\n')}\n`, 'utf8');
console.log(JSON.stringify({
    output: path.relative(root, outputPath),
    lessons: lessons.length,
    slides: lessons.reduce((sum, lesson) => sum + lesson.slideCount, 0),
    fourteenSlideLessons: lessons.filter((lesson) => lesson.slideCount === 14).length,
    detectedSongs: lessons.reduce((sum, lesson) => sum + lesson.songs.length, 0),
    likelyInlineLyrics: lessons.filter((lesson) => lesson.flags.includes('likely commercial lyric text')).map((lesson) => lesson.lessonNumber),
    placeholders: lessons.filter((lesson) => lesson.flags.includes('placeholder/backstage text')).map((lesson) => lesson.lessonNumber)
}, null, 2));
