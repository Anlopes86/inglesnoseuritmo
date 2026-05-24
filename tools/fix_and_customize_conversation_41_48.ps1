$ErrorActionPreference = 'Stop'

$lessons = @(
    @{
        Number = 41
        Title = 'The Paradox of Choice'
        WarmLead = "Let's talk about freedom, indecision, and modern decision-making."
        WarmQs = @(
            'Do more options really make people happier?',
            'When does choice become stressful?',
            'Why do people regret decisions even after choosing carefully?',
            'Is \"good enough\" sometimes better than \"perfect\"?'
        )
        Expressions = @(
            @('Choice overload', 'Stress caused by having too many options.'),
            @('To weigh pros and cons', 'To compare advantages and disadvantages.'),
            @('To second-guess', 'To doubt a decision after making it.'),
            @('Decision fatigue', 'Mental exhaustion from many decisions.'),
            @('To narrow it down', 'To reduce many options to a few.'),
            @('Good enough', 'Acceptable even if not perfect.')
        )
    },
    @{
        Number = 42
        Title = 'The Ethics of Biohacking'
        WarmLead = "Let's discuss science, enhancement, and moral boundaries."
        WarmQs = @(
            'Should people be free to enhance body and mind?',
            'What risks are acceptable in human experimentation?',
            'Who decides what is ethical in biohacking?',
            'Can enhancement increase social inequality?'
        )
        Expressions = @(
            @('Human enhancement', 'Improving abilities through biological or technological means.'),
            @('Ethical dilemma', 'A difficult choice between competing moral principles.'),
            @('Informed consent', 'Permission given with full understanding of risks.'),
            @('Long-term effects', 'Consequences that appear over time.'),
            @('To push the limits', 'To go beyond normal boundaries.'),
            @('To level the playing field', 'To make opportunities fairer for everyone.')
        )
    },
    @{
        Number = 43
        Title = 'The Art of Storytelling'
        WarmLead = "Let's explore narrative, emotion, and meaning."
        WarmQs = @(
            'Why do stories influence people more than facts alone?',
            'What makes a story memorable?',
            'How do good storytellers keep attention?',
            'Can storytelling be used to manipulate people?'
        )
        Expressions = @(
            @('To set the scene', 'To establish context at the start of a story.'),
            @('To build suspense', 'To create tension and anticipation.'),
            @('Plot twist', 'An unexpected change in the narrative.'),
            @('Relatable character', 'A character people emotionally connect with.'),
            @('To keep someone hooked', 'To hold someone’s attention strongly.'),
            @('Moral of the story', 'The main lesson communicated.')
        )
    },
    @{
        Number = 44
        Title = 'Leadership & Influence'
        WarmLead = "Let's examine leadership behavior, trust, and impact."
        WarmQs = @(
            'What separates real leadership from authority?',
            'How is trust built inside a team?',
            'Is charisma more important than competence?',
            'Can anyone learn to influence others positively?'
        )
        Expressions = @(
            @('To lead by example', 'To influence through actions, not just words.'),
            @('To earn trust', 'To gain confidence through consistent behavior.'),
            @('To delegate effectively', 'To assign responsibilities clearly and strategically.'),
            @('Accountability', 'Taking responsibility for decisions and outcomes.'),
            @('To motivate a team', 'To inspire people to perform well together.'),
            @('To call the shots', 'To make the final decisions.')
        )
    },
    @{
        Number = 45
        Title = 'Winning & Playing Fair'
        WarmLead = "Let's debate competition, integrity, and respect."
        WarmQs = @(
            'Is winning always the main objective?',
            'Why do some people cheat even when they can win fairly?',
            'What does fair play look like outside sports?',
            'Can you lose and still succeed ethically?'
        )
        Expressions = @(
            @('Fair play', 'Competing honestly and respectfully.'),
            @('To bend the rules', 'To stretch rules without fully breaking them.'),
            @('Win at all costs', 'To prioritize victory over ethics.'),
            @('Sportsmanship', 'Respectful conduct in competition.'),
            @('Level playing field', 'A fair context with equal opportunity.'),
            @('To take the high road', 'To choose the ethical path.')
        )
    },
    @{
        Number = 46
        Title = 'Identity & Who We Are'
        WarmLead = "Let's talk about self-image, belonging, and change."
        WarmQs = @(
            'Is identity fixed, or always evolving?',
            'How do culture and language shape who we are?',
            'What is the difference between fitting in and being authentic?',
            'Can people reinvent themselves without losing their core?'
        )
        Expressions = @(
            @('Sense of self', 'Your internal understanding of who you are.'),
            @('Core values', 'Principles that guide your choices.'),
            @('Self-image', 'How you see yourself.'),
            @('To fit in', 'To be socially accepted by a group.'),
            @('To stand out', 'To be distinct from others.'),
            @('To reinvent yourself', 'To significantly reshape your identity or path.')
        )
    },
    @{
        Number = 47
        Title = 'Humor & The Power of Laughter'
        WarmLead = "Let's discuss laughter, connection, and social boundaries."
        WarmQs = @(
            'Why does humor reduce tension?',
            'Where is the line between funny and offensive?',
            'Can humor help in difficult conversations?',
            'What does someone’s humor reveal about them?'
        )
        Expressions = @(
            @('To crack a joke', 'To say something funny.'),
            @('Comic relief', 'Humor that reduces stress in serious moments.'),
            @('Inside joke', 'A joke understood mainly by a specific group.'),
            @('Punchline', 'The final and funniest part of a joke.'),
            @('To laugh something off', 'To treat a problem lightly with humor.'),
            @('Sense of humor', 'A person’s ability to appreciate or create humor.')
        )
    },
    @{
        Number = 48
        Title = 'Comfort Zones & Personal Growth'
        WarmLead = "Let's explore risk, discomfort, and personal development."
        WarmQs = @(
            'Can growth happen without discomfort?',
            'Why do people stay in familiar situations too long?',
            'How can you take risks without being reckless?',
            'What does a personal breakthrough look like?'
        )
        Expressions = @(
            @('Comfort zone', 'A familiar, low-risk environment.'),
            @('To take a leap', 'To make a bold decision despite uncertainty.'),
            @('Growing pains', 'Difficulties that come with development.'),
            @('To play it safe', 'To avoid risks and choose security.'),
            @('Breakthrough', 'A significant step forward after struggle.'),
            @('To step out of your comfort zone', 'To do something unfamiliar or challenging.')
        )
    }
)

function Escape-Single([string]$text) {
    return $text.Replace("'", "\'")
}

foreach ($lesson in $lessons) {
    $num = [int]$lesson.Number
    $file = Join-Path 'conversation' ("licao-{0:d2}.html" -f $num)
    $content = Get-Content -Raw -Path $file

    $qLines = @(
        "<p><i class=""fas fa-lightbulb mr-2 text-green-500""></i> $($lesson.WarmQs[0])</p>",
        "<p><i class=""fas fa-brain mr-2 text-green-500""></i> $($lesson.WarmQs[1])</p>",
        "<p><i class=""fas fa-scale-balanced mr-2 text-green-500""></i> $($lesson.WarmQs[2])</p>",
        "<p><i class=""fas fa-compass mr-2 text-green-500""></i> $($lesson.WarmQs[3])</p>"
    ) -join ''

    $exprHtml = ($lesson.Expressions | ForEach-Object {
        "<div class='flashcard'><div class='flashcard-inner'><div class='flashcard-front'><h4 class='text-2xl font-bold'>$($_[0])</h4></div><div class='flashcard-back'><p class='text-xl'>$($_[1])</p></div></div></div>"
    }) -join ''

    $vocabJs = ($lesson.Expressions | ForEach-Object -Begin { $i = 1 } -Process {
        $row = "{ id: 'e$i', text: '" + (Escape-Single $_[0]) + "' }"
        $i++
        $row
    }) -join ', '

    $situationsJs = ($lesson.Expressions | ForEach-Object {
        $term = Escape-Single $_[0]
        "{ text: ""This lesson uses <span class='drop-zone' data-answer='$term'>________</span> to discuss $($lesson.Title)."", answer: '$term' }"
    }) -join ', '

    $script = @"
<script>document.addEventListener('DOMContentLoaded', () => { const moduleId = 'conversation', lessonNumber = $num, slides = document.querySelectorAll('.slide'), prevBtn = document.getElementById('prev-btn'), nextBtn = document.getElementById('next-btn'), finishLessonBtn = document.getElementById('finish-lesson-btn-main'), progressBar = document.getElementById('progress-bar'), slideCounter = document.getElementById('slide-counter'); let currentSlide = 0; function showSlide(index) { window.scrollTo({ top: 0, behavior: 'smooth' }); slides.forEach((s, i) => s.classList.toggle('active', i === index)); if (progressBar) progressBar.style.width = `${((index + 1) / slides.length) * 100}%`; if (slideCounter) slideCounter.innerText = `${index + 1} / ${slides.length}`; if (prevBtn) prevBtn.disabled = index === 0; const isLastSlide = index === slides.length - 1; if (nextBtn) nextBtn.style.display = isLastSlide ? 'none' : 'block'; } if (prevBtn) prevBtn.onclick = () => { if (currentSlide > 0) { currentSlide--; showSlide(currentSlide); } }; if (nextBtn) nextBtn.onclick = () => { if (currentSlide < slides.length - 1) { currentSlide++; showSlide(currentSlide); } }; if (finishLessonBtn) finishLessonBtn.onclick = () => { finishLessonBtn.disabled = true; finishLessonBtn.innerHTML = 'Salvando... <i class="fas fa-spinner fa-spin ml-2"></i>'; if (typeof markLessonAsComplete === 'function') markLessonAsComplete(moduleId, lessonNumber); else { console.error('Funcao markLessonAsComplete nao encontrada.'); localStorage.setItem(`lesson_${moduleId}_${lessonNumber}_completed`, 'true'); window.location.href = 'conversation.html'; } }; document.querySelectorAll('.flashcard').forEach(card => card.addEventListener('click', () => card.classList.toggle('flipped'))); document.querySelectorAll('.answer-btn').forEach(button => button.addEventListener('click', () => { const inputField = button.previousElementSibling; if (inputField) { inputField.value = button.dataset.answer; inputField.classList.add('text-green-400', 'font-bold'); } })); const wordBank = document.getElementById('word-bank'), activityContainer = document.getElementById('matching-activity'), checkBtn = document.getElementById('check-answers-btn'); const vocabulary = [$vocabJs]; const situations = [$situationsJs]; vocabulary.sort(() => Math.random() - 0.5).forEach(word => { const pill = document.createElement('div'); pill.className = 'word-pill'; pill.draggable = true; pill.innerText = word.text; pill.id = `word-${word.id}`; pill.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', word.text)); wordBank.appendChild(pill); }); activityContainer.innerHTML = situations.map(s => `<p class="text-xl text-gray-200">${s.text}</p>`).join(''); const dropZones = document.querySelectorAll('.drop-zone'); dropZones.forEach(zone => { zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('hover'); }); zone.addEventListener('dragleave', () => zone.classList.remove('hover')); zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('hover'); zone.innerText = e.dataTransfer.getData('text/plain'); zone.classList.add('filled'); }); zone.addEventListener('click', () => { zone.innerText = '________'; zone.classList.remove('filled'); zone.style.color = '#86efac'; }); }); if (checkBtn) checkBtn.onclick = () => { dropZones.forEach(zone => { if (zone.innerText.trim().toLowerCase() === zone.dataset.answer.toLowerCase()) zone.style.color = '#10b981'; else if (zone.innerText !== '________') zone.style.color = '#ef4444'; }); }; showSlide(0); });</script>
"@

    $content = [regex]::Replace($content, '<p class="font-semibold text-gray-300">.*?</p>', "<p class=""font-semibold text-gray-300"">$($lesson.WarmLead)</p>", [System.Text.RegularExpressions.RegexOptions]::Singleline)
    $content = [regex]::Replace($content, '<p><i class="fas fa-lightbulb mr-2 text-green-500"></i>.*?</p><p><i class="fas fa-brain mr-2 text-green-500"></i>.*?</p><p><i class="fas fa-scale-balanced mr-2 text-green-500"></i>.*?</p><p><i class="fas fa-compass mr-2 text-green-500"></i>.*?</p>', $qLines, [System.Text.RegularExpressions.RegexOptions]::Singleline)
    $content = [regex]::Replace($content, '<div class="flashcard-grid max-w-6xl mx-auto">.*?</div></div></div>', "<div class=""flashcard-grid max-w-6xl mx-auto"">$exprHtml</div></div></div>", [System.Text.RegularExpressions.RegexOptions]::Singleline)
    $content = [regex]::Replace($content, '<script>document\.addEventListener\(''DOMContentLoaded''.*?</script>', $script, [System.Text.RegularExpressions.RegexOptions]::Singleline)

    Set-Content -Path $file -Value $content -Encoding UTF8
}
