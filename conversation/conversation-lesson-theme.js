(function () {
    function shuffle(items) {
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        return items;
    }

    function createPill(value, label) {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'conversation-dd-pill';
        pill.draggable = true;
        pill.dataset.value = value;
        pill.textContent = label;
        pill.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', value);
            event.dataTransfer.effectAllowed = 'move';
            window.__conversationDraggedPill = pill;
        });
        pill.addEventListener('dragend', () => {
            window.__conversationDraggedPill = null;
        });
        return pill;
    }

    function setZoneValue(zone, select, bank, pill) {
        const currentPill = zone.querySelector('.conversation-dd-pill');
        if (currentPill && currentPill !== pill) {
            bank.appendChild(currentPill);
        }

        const sourceZone = pill.parentElement;
        if (sourceZone && sourceZone !== bank && sourceZone.classList.contains('conversation-dd-drop-zone')) {
            if (sourceZone._select) {
                sourceZone._select.value = '';
            }
            sourceZone.classList.remove('filled');
            sourceZone.classList.remove('hover');
            sourceZone.innerHTML = '';
            sourceZone.appendChild(document.createTextNode(sourceZone.dataset.placeholder || 'Drop here'));
        }

        zone.innerHTML = '';
        zone.appendChild(pill);
        zone.classList.add('filled');
        zone.classList.remove('hover');
        select.value = pill.dataset.value;
    }

    function clearZone(zone, bank) {
        const existingPill = zone.querySelector('.conversation-dd-pill');
        if (!existingPill) return;

        bank.appendChild(existingPill);
        zone.innerHTML = '';
        zone.appendChild(document.createTextNode(zone.dataset.placeholder || 'Drop here'));
        zone.classList.remove('filled');
        zone.classList.remove('hover');

        if (zone._select) {
            zone._select.value = '';
        }
    }

    function enhanceSelectMatching(container) {
        const selects = Array.from(container.querySelectorAll('select[data-answer]'));
        if (!selects.length || container.dataset.dragdropEnhanced === 'true') {
            return;
        }

        const optionsMap = new Map();
        selects.forEach((select) => {
            Array.from(select.options).forEach((option) => {
                const value = option.value && option.value.trim();
                const text = option.textContent && option.textContent.trim();
                if (!value || !text || /select/i.test(text)) return;
                if (!optionsMap.has(value)) {
                    optionsMap.set(value, text);
                }
            });
        });

        if (!optionsMap.size) return;

        container.dataset.dragdropEnhanced = 'true';

        const bank = document.createElement('div');
        bank.className = 'conversation-dd-bank';
        shuffle(Array.from(optionsMap.entries())).forEach(([value, label]) => {
            bank.appendChild(createPill(value, label));
        });

        container.parentNode.insertBefore(bank, container);

        selects.forEach((select) => {
            const zone = document.createElement('div');
            zone.className = 'conversation-dd-drop-zone';
            zone.dataset.placeholder = 'Drop here';
            zone.textContent = 'Drop here';
            zone._select = select;

            zone.addEventListener('dragover', (event) => {
                event.preventDefault();
                zone.classList.add('hover');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('hover');
            });

            zone.addEventListener('drop', (event) => {
                event.preventDefault();
                const pill = window.__conversationDraggedPill;
                if (!pill) return;
                setZoneValue(zone, select, bank, pill);
            });

            zone.addEventListener('click', () => {
                clearZone(zone, bank);
            });

            select.classList.add('conversation-dd-hidden-select');
            select.parentNode.insertBefore(zone, select);
        });
    }

    function organizePracticeLayout() {
        const wordBank = document.getElementById('word-bank');
        const activityContainer = document.getElementById('matching-activity');

        if (!wordBank || !activityContainer) return;
        if (wordBank.closest('.conversation-practice-layout')) return;
        if (!wordBank.parentElement || wordBank.parentElement !== activityContainer.parentElement) return;

        const parent = activityContainer.parentElement;
        const layout = document.createElement('div');
        const mainColumn = document.createElement('div');
        const sideColumn = document.createElement('div');

        layout.className = 'conversation-practice-layout';
        mainColumn.className = 'conversation-practice-main';
        sideColumn.className = 'conversation-practice-sidebar';

        parent.insertBefore(layout, wordBank);
        layout.appendChild(mainColumn);
        layout.appendChild(sideColumn);
        mainColumn.appendChild(activityContainer);
        sideColumn.appendChild(wordBank);
    }

    function enhanceKeyboardAndTouch() {
        document.querySelectorAll('.flashcard').forEach((card) => {
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'Flip vocabulary card');
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    card.click();
                }
            });
        });

        document.querySelectorAll('.answer-btn, .reveal-btn').forEach((button) => {
            if (!button.getAttribute('aria-label')) {
                button.setAttribute('aria-label', 'Reveal answer');
            }
        });

        let selectedPill = null;
        const pills = Array.from(document.querySelectorAll('.word-pill'));
        const zones = Array.from(document.querySelectorAll('.drop-zone'));

        pills.forEach((pill) => {
            pill.setAttribute('role', 'button');
            pill.setAttribute('tabindex', '0');
            pill.setAttribute('aria-label', `Select ${pill.textContent.trim()}`);
            const select = () => {
                pills.forEach((item) => item.classList.remove('is-selected'));
                selectedPill = pill;
                pill.classList.add('is-selected');
            };
            pill.addEventListener('click', select);
            pill.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    select();
                }
            });
        });

        zones.forEach((zone) => {
            zone.setAttribute('role', 'button');
            zone.setAttribute('tabindex', '0');
            zone.setAttribute('aria-label', 'Place the selected expression here');
            const place = () => {
                if (!selectedPill) return;
                zone.textContent = selectedPill.textContent.trim();
                zone.classList.add('filled');
                selectedPill.classList.remove('is-selected');
                selectedPill = null;
            };
            zone.addEventListener('click', place);
            zone.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    place();
                }
            });
        });
    }

    function polishGeneratedLessons() {
        const lessonPath = window.location.pathname;
        const expressionUpgrades = [
            [/licao-38\.html$/i, 'To be a good sport', 'To take defeat gracefully'],
            [/licao-39\.html$/i, 'To make a difference', 'To leave a positive mark'],
            [/licao-40\.html$/i, 'To have a sweet tooth', 'To save room for dessert'],
            [/licao-42\.html$/i, 'A double-edged sword', 'A mixed blessing'],
            [/licao-45\.html$/i, 'Off the beaten path', 'A hidden gem'],
            [/licao-45\.html$/i, 'To travel light', 'To pack the essentials'],
            [/licao-46\.html$/i, 'To think outside the box', 'To dream up an idea'],
            [/licao-46\.html$/i, 'A game changer', 'To break new ground'],
            [/licao-48\.html$/i, 'The sky is the limit', 'To aim high']
        ];
        expressionUpgrades.forEach(([pattern, oldExpression, newExpression]) => {
            if (!pattern.test(lessonPath)) return;
            document.querySelectorAll('#word-bank .word-pill').forEach((pill) => {
                if (pill.textContent.trim() === oldExpression) pill.textContent = newExpression;
            });
            document.querySelectorAll('.drop-zone').forEach((zone) => {
                if (zone.dataset.answer === oldExpression) zone.dataset.answer = newExpression;
            });
        });

        const practiceRewrites = {
            'licao-38.html': {
                'To take defeat gracefully': ['After losing the final, she shook hands with the winner and managed ', '.']
            },
            'licao-40.html': {
                'To save room for dessert': ['I ate a smaller main course because I wanted ', '.']
            },
            'licao-45.html': {
                'A hidden gem': ['The quiet beach was ', ' that few tourists knew about.']
            },
            'licao-46.html': {
                'To break new ground': ['The research team hopes ', ' with its low-cost medical device.']
            },
            'licao-48.html': {
                'To aim high': ['The small team decided ', ' and design a zero-waste city.']
            }
        };
        const lessonFile = lessonPath.split('/').pop();
        const lessonRewrites = practiceRewrites[lessonFile] || {};
        document.querySelectorAll('#matching-activity .drop-zone').forEach((zone) => {
            const parts = lessonRewrites[zone.dataset.answer];
            if (!parts || !zone.parentElement) return;
            zone.parentElement.replaceChildren(document.createTextNode(parts[0]), zone, document.createTextNode(parts[1]));
        });

        const lighterPrompts = {
            'Do you think people should always follow their dreams?': 'Which dream deserves a serious plan, and which dream is fun simply to imagine?',
            'Is patience essential when you want something big, or should ambitious people act fast?': 'Choose a dream and divide it into one patient step and one bold step.',
            'Is it brave or irresponsible to leave everything behind in order to chase a dream?': 'Your friend wants to quit everything for a dream. What three practical questions would you ask?',
            'Do you believe in love at first sight?': 'What can happen at first sight: love, attraction, curiosity, or a very good story?',
            'Can love survive without trust?': 'Describe one everyday action that builds trust better than a dramatic romantic gesture.',
            'Do you think there is such a thing as the perfect partner, or is that only a romantic fantasy?': 'Create a dating profile for a “perfect” partner with one hilariously imperfect habit.',
            'Do you think challenges make us stronger?': 'Name a challenge that taught you a useful skill and one that was simply annoying.',
            'Is confidence more important than talent when someone is under pressure?': 'Give confidence and talent 100 points to share. How many points does each get in a stressful situation?',
            'Is persistence always admirable, or should people sometimes stop and change direction?': 'Think of a goal: what signal means “keep going,” and what signal means “change the plan”?',
            'Do you prefer traveling alone or with others?': 'Plan two ideal days: one solo travel day and one group travel day.',
            'Is getting lost part of the fun in a trip, or something that ruins the experience?': 'Tell a story—or invent one—where getting lost leads to the best part of a trip.',
            'Do the best trips come from planning carefully or following impulse?': 'Create a travel plan that is 70% organized and 30% spontaneous.',
            'Is it more important to have a job you love or a job that pays well?': 'Design a job offer with a realistic balance of salary, free time, and interesting work.',
            'Do you think people work too much nowadays?': 'Which part of a workday could disappear without anyone truly missing it?',
            'Is a predictable routine comforting, exhausting, or both?': 'Build a work routine with one comforting habit and one change that prevents boredom.',
            'Is technology making our lives better or worse?': 'Choose one technology that clearly improves your day and one that regularly steals your attention.',
            'Could you live without your phone for a week?': 'Plan a phone-free Saturday that would be enjoyable rather than miserable.',
            'Has social media improved human connection overall, or weakened it?': 'Compare one way social media creates real connection with one way it creates only the appearance of connection.',
            'Is it possible to find your soulmate online?': 'Write the first message that could start a genuinely interesting online conversation.',
            'Is jealousy usually a sign of love, control, or fear of being replaced?': 'Imagine jealousy as a terrible relationship adviser. What advice would it give?',
            'Has love become easier to find, or just easier to fake?': 'Which detail in an online profile feels authentic, and which one feels carefully manufactured?',
            'Do you think children today grow up faster than before?': 'Compare one childhood freedom from the past with one advantage children have today.',
            'Are kids losing their childhood, or is childhood simply changing?': 'Design one perfect screen-free afternoon for a child today.',
            'Is nostalgia usually comforting, or can it stop people from moving forward?': 'Which object, snack, or song gives you instant harmless nostalgia?',
            'Is it healthy to question the media and official narratives?': 'Create a three-step routine for checking a surprising story before sharing it.',
            'Are our phones and apps a real invasion of privacy, or is that exaggerated?': 'Which app permission feels reasonable, and which one feels like a nosy neighbor?',
            'Is privacy becoming less important to younger generations?': 'What personal detail would you share online, and what stays completely private?',
            'Do you use music to change your mood?': 'Build a three-song playlist for changing a bad mood.',
            'Can your music taste say something about who you are?': 'What wildly inaccurate conclusion might someone make from your playlist?',
            'Should artists use profanity in their songs to be more authentic?': 'When does strong language add emotion to a song, and when is it just decoration?',
            'Do people become wiser as they get older?': 'Which lesson tends to arrive with age, and which lesson can a teenager understand perfectly?',
            'Is youth really the most valuable stage of life?': 'Give each life stage one special advantage: childhood, youth, adulthood, and old age.',
            'Would living much longer actually make people happier?': 'If people lived to 150, what new birthday tradition would we need?',
            'Is speaking a language well more about grammar or confidence?': 'Give grammar and confidence 100 points to share in a real conversation.',
            'Is listening harder than speaking?': 'Describe a situation where good listening is more impressive than a perfect answer.',
            'Is it better to talk immediately during conflict or wait until emotions cool down?': 'Create a useful sentence for pausing an argument without avoiding it.',
            'Do you think rivalries make sports more exciting or more dangerous?': 'Invent a funny but harmless tradition for two rival teams.',
            'Is it possible to be a good sport even when you lose?': 'What does a graceful loser say five seconds after a painful defeat?',
            'Are today\'s athletes better than those of past generations, or is nostalgia making us unfair?': 'Choose one old sports legend and one modern athlete for a dream team.',
            'Do heroes need to be famous?': 'Describe an everyday hero whose action would never appear in the news.',
            'Can a flawed person still be inspiring?': 'Name one admirable quality a very imperfect person can still teach others.',
            'Can someone still be a role model in one area if they fail badly in another?': 'Create a “role model report card” with three categories instead of one perfect score.',
            'Do you prefer spicy, sweet, or savory flavors?': 'Rank these from best to worst: spicy, sweet, and savory. What food wins each category?',
            'Is there a specific dish that reminds you of home or your childhood?': 'Which dish instantly takes you back to home or childhood, and what memory comes with it?',
            'Can a good meal really change a person\'s mood?': 'Describe the ideal meal for rescuing a terrible day.',
            'Is comfort food a healthy way to deal with stress?': 'Build a comfort-food menu for a stressful week. What belongs on it?',
            'Should governments tax unhealthy foods?': 'Imagine a tax on one unhealthy food. Which choice would cause the funniest public protest?',
            'Do more options really make people happier?': 'Tell us about a choice with so many options that it became ridiculous.',
            'Is "good enough" sometimes better than "perfect"?': 'Where in daily life is “good enough” genuinely the smartest choice?',
            'Is indecision a sign of intelligence or fear?': 'Create a funny warning sign for a person who takes forever to decide.',
            'At what point does freedom become a burden?': 'Which menu, app, or store gives you more choices than any human needs?',
            'Should we optimize choices, or simplify our standards?': 'Choose one decision you could simplify this week. What rule would you use?',
            'Does love require compromise or radical authenticity?': 'Which small compromise is easy in a relationship, and which one causes comic chaos?',
            'In major choices, should "we" come before "I"?': 'Plan a trip for two people with opposite tastes. How would you keep both happy?',
            'Would you ever consider a chip implant to pay for things with a wave of your hand?': 'A payment chip is free, but it plays a sound every time you buy something. Which sound would make you accept it?',
            'If technology could double your memory or focus, would you use it even if it was expensive?': 'Choose one upgrade: perfect memory, instant focus, or eight hours of energy. What would you do with it first?',
            'If biohacking could make humans live for 200 years, would that be a good thing for society?': 'Imagine a 200th birthday party. What would be wonderful—and what would be hilariously inconvenient?',
            'Should people have the right to modify their own DNA if they want to?': 'Design one harmless DNA upgrade that people would immediately want.',
            'Is biohacking the next step in human evolution or the end of it?': 'Give biohacking a dramatic movie title and a one-sentence plot.',
            'If biohacking could fix a physical limitation you have, would you do it immediately?': 'Which safe body upgrade would make an ordinary Monday easier?',
            'Should parents be allowed to choose the eye color or intelligence level of their children?': 'Imagine a “design your baby” website. Which options would be useful, silly, or uncomfortable?',
            'If your boss offered to pay for a brain implant to make you work faster, would you accept?': 'Your boss offers a work-speed implant. What questions would you ask before even considering it?',
            'Do you prefer a true story or a good story?': 'Choose one for a party: a completely true story or a slightly improved story. What makes it entertaining?',
            'Who is more guilty: the person who invents gossip or the person who repeats it?': 'Act out two versions of a rumor: the original and the wildly exaggerated fifth version.',
            'Can a false story ever be more interesting than the truth? Should we care?': 'Turn a boring true event into a dramatic movie trailer without changing the basic facts.',
            'What responsibility does a storyteller have to challenge the audience\'s assumptions?': 'What small clue makes a plot twist feel clever instead of random?',
            'Is there an actor or director whose work you follow religiously?': 'Which actor or director can convince you to watch almost anything, and why?',
            'Do you prefer the cinematic experience of a theater or the comfort of your own couch?': 'Compare your perfect cinema night with your perfect movie night at home.',
            'Do romantic movies create unrealistic expectations for real-life relationships?': 'Name one romantic-movie habit that would be charming on screen but annoying in real life.',
            'Is the \'magic of cinema\' dying, or just evolving?': 'Invent one cinema feature that would make people leave the couch again.',
            'Are you more attracted to famous tourist landmarks or \'hidden\' places that nobody knows about?': 'Build a one-day itinerary with one famous landmark and one secret local place.',
            'Do famous destinations usually live up to the \'paradise\' we imagine in our heads?': 'Which famous destination might look better online than on a crowded afternoon?',
            'Is mass tourism destroying the very \'paradises\' that people are trying to visit?': 'Write three friendly rules for visitors to a beautiful but crowded destination.',
            'Can you really \'know\' a place if you only stay there for a week as a tourist?': 'What can a traveler learn in one week, and what usually remains invisible?',
            'Are we losing our connection to the physical world because of technology?': 'Which screen-free activity can make three hours disappear for you?',
            'Are you more fascinated by robots or terrified of them?': 'Choose a robot roommate: chef, cleaner, DJ, or personal assistant. What could go wrong?',
            'Would you be willing to be the first person to test a dangerous new invention (like a teleporter)?': 'A teleporter needs its first tester. What reward and safety guarantee would you demand?',
            'Can humor help in difficult conversations?': 'Give an example of a joke that could reduce tension—and one that would make everything worse.',
            'The song names everyday problems but answers them with extreme simplicity. Is that wisdom, denial, or comedy?': 'Which physical-comedy moment is funniest: a perfect fall, a ridiculous dance, or an object that refuses to cooperate?',
            'How does the cheerful tone change the way we hear serious problems?': 'What skill makes physical comedy work: timing, facial expression, movement, or surprise?',
            'When can laughter reduce stress without ignoring reality?': 'Describe a harmless mistake that became funnier after everyone relaxed.',
            'Would this attitude help during conflict, or could it make people feel unheard?': 'Create a ten-second silent comedy scene using a chair and a hat.',
            'Is offensive humor ever acceptable?': 'Compare a joke that includes everyone with one that makes someone feel excluded.',
            'Can someone be funny without making fun of anyone?': 'Invent a joke setup based on confusion, timing, or an everyday object—not a person.',
            'Can optimism be rebellious when the situation seems hopeless?': 'Write an absurdly cheerful slogan for a very bad Monday.',
            'Should people apologize when a joke lands badly?': 'What is a natural way to recover when a joke gets complete silence?',
            'Will flying cars finally be a reality in 2050, or is that just a movie dream?': 'Design a flying car for 2050. Where does it park, and what ridiculous problem does it create?',
            'Do you think robots will be doing all our chores by then, or will we be working even harder?': 'Assign three chores to a robot and keep one for yourself. Explain the choices.',
            'Will we have a colony on Mars by 2050? Would you want to live there?': 'Pack five things for one month on Mars. Which comfort item is non-negotiable?',
            'Are you generally optimistic or pessimistic about the future of humanity?': 'Choose one future trend that excites you and one that makes you cautious.',
            'Can dreaming about a better future actually help us create it?': 'Turn one future dream into a tiny action someone could start this week.',
            'Are we spending too much time dreaming about the future and not enough fixing the present?': 'Which present-day problem deserves a futuristic solution right now?',
            'Is optimism a choice or a personality trait?': 'What habit helps a realistic person stay hopeful without pretending everything is perfect?',
            'Will people be more creative or less creative in the future?': 'Imagine a creative hobby in 2050. What new tool would it use?',
            'Do you think schools and universities will still exist in 30 years?': 'Design one class for a school in 2050. What would students build, practice, or debate?',
            'Will everyone speak the same global language in 2050?': 'Invent one useful word that a future global language should have.'
        };
        document.querySelectorAll('p').forEach((paragraph) => {
            const replacement = lighterPrompts[paragraph.textContent.trim()];
            if (replacement) paragraph.textContent = replacement;
        });

        const seenPills = new Set();
        document.querySelectorAll('#word-bank .word-pill').forEach((pill) => {
            const key = pill.textContent.trim().toLowerCase();
            if (seenPills.has(key)) pill.remove();
            else seenPills.add(key);
        });

        if (/licao-34\.html$/i.test(window.location.pathname)) {
            const repeatedSongHeading = Array.from(document.querySelectorAll('h2')).find((title) => title.textContent.includes('Every Breath You Take'));
            if (repeatedSongHeading) {
                const songSlide = repeatedSongHeading.closest('.slide');
                repeatedSongHeading.innerHTML = '<i class="fas fa-music text-blue-500"></i> Song 2: Private Eyes <span class="text-xl text-gray-400">- Daryl Hall &amp; John Oates</span>';
                const iframe = songSlide?.querySelector('iframe');
                if (iframe) iframe.src = 'https://open.spotify.com/embed/track/7bcVDJxfhWV6KNfDsjxFTx?utm_source=generator';
                const context = songSlide?.querySelector('.bg-blue-900\\/30 p');
                if (context) context.innerHTML = '<i class="fas fa-info-circle mr-2 text-blue-400"></i> A playful but unsettling song about observation, suspicion, and reading hidden intentions.';
                const listeningBox = songSlide?.querySelector('.lyrics-box > div');
                if (listeningBox) {
                    listeningBox.innerHTML = [
                        '<p class="text-sm text-gray-400 uppercase tracking-wider">Complete the interpretation after listening:</p>',
                        '<p>The repeated warning creates a feeling of <input type="text" class="w-28 border-b-2 text-center bg-transparent border-gray-500 focus:border-blue-400 outline-none"> <button class="answer-btn" data-answer="suspicion"><i class="fas fa-eye"></i></button>.</p>',
                        '<p>The upbeat sound contrasts with the idea of being <input type="text" class="w-28 border-b-2 text-center bg-transparent border-gray-500 focus:border-blue-400 outline-none"> <button class="answer-btn" data-answer="observed"><i class="fas fa-eye"></i></button>.</p>',
                        '<p>The song turns hidden motives into a catchy detective <input type="text" class="w-28 border-b-2 text-center bg-transparent border-gray-500 focus:border-blue-400 outline-none"> <button class="answer-btn" data-answer="story"><i class="fas fa-eye"></i></button>.</p>'
                    ].join('');
                }
            }
            const repeatedDebate = Array.from(document.querySelectorAll('p')).find((paragraph) => paragraph.textContent.includes('Every Breath You Take') && paragraph.textContent.includes('Obsession and control'));
            if (repeatedDebate) repeatedDebate.textContent = 'Private Eyes - Suspicion and hidden motives';
        }

        if (!/licao-47\.html$/i.test(window.location.pathname)) return;

        const trackIds = [
            '43v5F0LQ6Le8XaCfx5bwD3',
            '1d6KS9GH06JAd19uiBy9IE',
            '5jFEwZg18Ojv9m15to6qo8'
        ];
        document.querySelectorAll('iframe[src*="open.spotify.com/embed/search/"]').forEach((iframe, index) => {
            if (trackIds[index]) {
                iframe.src = `https://open.spotify.com/embed/track/${trackIds[index]}?utm_source=generator`;
            }
        });

        document.querySelectorAll('.lyrics-box p').forEach((paragraph) => {
            if (paragraph.textContent.includes('Copyright-safe lyric placeholder')) {
                paragraph.textContent = 'Listening focus: complete the interpretation after hearing the song.';
            }
        });

        const heading = Array.from(document.querySelectorAll('h2')).find((title) => title.textContent.includes('Dont Worry Be Happy'));
        if (heading) {
            const songSlide = heading.closest('.slide');
            heading.innerHTML = '<i class="fas fa-music text-yellow-500"></i> Song 1: Make ‘Em Laugh <span class="text-xl text-gray-400">- Donald O’Connor</span>';
            const context = songSlide?.querySelector('.bg-green-900\\/30 p');
            if (context) context.innerHTML = '<i class="fas fa-info-circle mr-2 text-green-400"></i> Theme: physical comedy, performance, and the ridiculous effort behind making an audience laugh.';
            const listeningBox = songSlide?.querySelector('.lyrics-box > div');
            if (listeningBox) {
                listeningBox.innerHTML = [
                    '<p class="text-sm text-gray-400 uppercase tracking-wider">Complete the interpretation after listening:</p>',
                    '<p>The performance uses movement and comic <input type="text" class="w-32 border-b-2 text-center bg-transparent border-gray-500 focus:border-green-400 outline-none"> <button class="answer-btn" data-answer="timing"><i class="fas fa-eye"></i></button>.</p>',
                    '<p>Ordinary objects become part of the <input type="text" class="w-32 border-b-2 text-center bg-transparent border-gray-500 focus:border-green-400 outline-none"> <button class="answer-btn" data-answer="joke"><i class="fas fa-eye"></i></button>.</p>',
                    '<p>The actor looks exhausted, but the scene remains <input type="text" class="w-32 border-b-2 text-center bg-transparent border-gray-500 focus:border-green-400 outline-none"> <button class="answer-btn" data-answer="playful"><i class="fas fa-eye"></i></button>.</p>'
                ].join('');
            }
        }

        const firstDebate = Array.from(document.querySelectorAll('p')).find((paragraph) => paragraph.textContent.includes('Dont Worry Be Happy - humor as coping'));
        if (firstDebate) firstDebate.textContent = 'Make ‘Em Laugh - Physical Comedy and Timing';

        const practiceSentences = {
            'To crack a joke': ['When the meeting became tense, Ana decided ', ' to help everyone relax.'],
            'Comic relief': ['The side character provides ', ' during the film’s darkest scenes.'],
            'Inside joke': ['Nobody else understood because it was an ', ' between two old friends.'],
            'Punchline': ['His story was engaging, but the ', ' arrived too late.'],
            'To laugh something off': ['She chose ', ' after making a harmless mistake on stage.'],
            'Sense of humor': ['A shared ', ' can make communication easier across cultures.']
        };
        document.querySelectorAll('#matching-activity .drop-zone').forEach((zone) => {
            const parts = practiceSentences[zone.dataset.answer];
            if (!parts || !zone.parentElement) return;
            const paragraph = zone.parentElement;
            paragraph.replaceChildren(document.createTextNode(parts[0]), zone, document.createTextNode(parts[1]));
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('conversation-theme-26');

        document.querySelectorAll('.flashcard').forEach((card) => {
            if (typeof card.onclick === 'function') {
                card.onclick = null;
            }
        });

        document.querySelectorAll('#matching-activity').forEach((container) => {
            enhanceSelectMatching(container);
        });

        polishGeneratedLessons();
        organizePracticeLayout();
        enhanceKeyboardAndTouch();
    });
})();
