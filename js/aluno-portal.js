document.addEventListener('DOMContentLoaded', () => {
    // Validação inicial e configuração do Firebase
    if (typeof lessonData === 'undefined' || typeof lessonExpressions === 'undefined' || typeof dailyChallenges === 'undefined' || typeof badgeMessages === 'undefined') {
        console.error("ERRO CRÍTICO: Um ou mais arquivos de dados (prompts, expressions, challenges, badges) não foram carregados. Verifique os <script> tags no aluno.html");
        document.getElementById('loading-message').textContent = 'Erro ao carregar dados do curso.';
        return;
    }
    const db = firebase.firestore();
    const auth = firebase.auth();

    const BADGE_MAP = {
        a1: typeof A1_BADGES !== 'undefined' ? A1_BADGES : [],
        conversation: typeof CONVERSATION_BADGES !== 'undefined' ? CONVERSATION_BADGES : [],
        business: typeof BUSINESS_BADGES !== 'undefined' ? BUSINESS_BADGES : [],
        vestibular: typeof VESTIBULAR_BADGES !== 'undefined' ? VESTIBULAR_BADGES : []
    };

    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = window.location.pathname.includes('/aluno/') ? 'login.html' : 'login.html';
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const studentIdFromUrl = urlParams.get('studentId');
        const viewingAsRole = localStorage.getItem('loggedInUserRole');

        let studentIdToLoad;
        
        if (studentIdFromUrl && viewingAsRole === 'professor') {
            studentIdToLoad = studentIdFromUrl;
        } else {
            studentIdToLoad = user.uid;
        }

        if (!studentIdToLoad) {
            document.getElementById('loading-message').textContent = 'Erro: ID do aluno não encontrado.';
            return;
        }
        
        loadStudentPortal(studentIdToLoad, viewingAsRole || 'aluno');
    });

    async function loadStudentPortal(studentId, role) {
        try {
            const studentDoc = await db.collection("students").doc(studentId).get();
            if (!studentDoc.exists) throw new Error("Aluno não encontrado na base de dados.");
            
            const studentData = studentDoc.data();
            const studentType = studentData.studentType;
            const progress = studentData.progress || {};
            if (!progress[studentType]) { progress[studentType] = {}; }

            populateHeader(studentData);
            populateLastLessonCard(progress, studentType);
            populateModulesCard(studentType);
            populateScheduleCard(studentData, role, studentId);
            populateFocusCard(studentData, role, studentId);
            populateChallengeCard();
            populateExpressionCard(progress, studentType);
            populateNextBadgeCard(progress, studentType);
            adjustPortalForStudentType(studentType);
            populateProgressSection(studentData, role, progress);
            populateBadgesSection(progress, studentType);
            populateAiPrompts(progress, studentType);
            populatePromptLibrary(progress, studentType);
            setupActionButtons(role, studentId);
            setupBadgeModalControls();

        } catch (error) {
            console.error("Erro ao carregar o portal:", error);
            document.getElementById('loading-message').textContent = `Erro ao carregar o portal: ${error.message}`;
        }
    }

    function populateHeader(studentData) {
        const welcomeSpan = document.getElementById('student-name-welcome');
        if (welcomeSpan) welcomeSpan.textContent = studentData.name.split(' ')[0];
    }
    
    function populateLastLessonCard(progress, studentType) {
        const card = document.getElementById('last-lesson-card');
        if (!card) return;
        if (!lessonData[studentType] || lessonData[studentType].titles.length <= 1) {
            card.innerHTML = `<div class="text-center w-full"><i class="fas fa-book-open text-7xl text-white opacity-80 mb-4"></i><h3 class="text-2xl font-bold mb-2">Bem-vindo(a)!</h3><p class="text-lg opacity-90">Acesse seu módulo de estudo para começar.</p></div>`;
            return;
        }
        const lastCompletedNum = findLastCompletedLessonNumber(progress, studentType);
        if (lastCompletedNum > 0) {
            const moduleInfo = lessonData[studentType];
            const lessonTitle = moduleInfo.titles[lastCompletedNum] || `Lição ${lastCompletedNum}`;
            const lessonUrl = `${studentType}/licao-${String(lastCompletedNum).padStart(2, '0')}.html`;
            card.innerHTML = `<div class="md:w-1/4 flex justify-center mb-4 md:mb-0"><i class="fas fa-history text-7xl text-white opacity-80"></i></div><div class="md:w-3/4 text-center md:text-left"><h3 class="text-2xl font-bold mb-2">Revise sua Última Aula</h3><p class="text-lg opacity-90 mb-6">Sua última lição foi: <strong>${lessonTitle}</strong></p><a href="${lessonUrl}" class="w-full md:w-auto inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-lg transition hover:bg-gray-100 shadow-md">Revisar Agora</a></div>`;
        } else {
             card.innerHTML = `<div class="text-center w-full"><i class="fas fa-book-open text-7xl text-white opacity-80 mb-4"></i><h3 class="text-2xl font-bold mb-2">Tudo a postos!</h3><p class="text-lg opacity-90">Complete a sua primeira lição para começar a jornada.</p></div>`;
        }
    }
    
    function populateModulesCard(studentType) {
        const card = document.getElementById('modules-card');
        if (!card) return;
        const moduleDetails = {
            a1: { name: 'Módulo A1', url: `a1/a1.html` },
            a2: { name: 'Módulo A2', url: `a2/a2.html` },
            conversation: { name: 'Tópicos de Conversação', url: `conversation/conversation.html` },
            business: { name: 'Inglês para Negócios', url: `business/business.html` },
            vestibular: { name: 'Dicas para Vestibular', url: `vestibular/vestibular.html` }
        };
        const details = moduleDetails[studentType] || { name: 'Módulo Principal', url: '#' };
        card.innerHTML = `<i class="fas fa-stream text-5xl mb-4"></i><h3 class="text-2xl font-bold mb-2">${details.name}</h3><p class="text-lg opacity-90 mb-6">Acesse todas as lições e revise seu progresso.</p><a href="${details.url}" class="w-full text-center block bg-white text-gray-800 font-bold py-3 px-6 rounded-lg transition hover:bg-gray-200">Ver Lições</a>`;
    }

    function populateScheduleCard(studentData, role, studentId) {
        const container = document.getElementById('schedule-card-content');
        if (!container) return;
        if (role === 'professor') {
            const nextClass = studentData.nextClass || {};
            container.innerHTML = `<div class="space-y-3"><input type="date" id="next-class-date-input" class="enhanced-input w-full" value="${nextClass.date || ''}"><input type="time" id="next-class-time-input" class="enhanced-input w-full" value="${nextClass.time || ''}"><button id="save-schedule-btn" class="enhanced-btn bg-blue-600 text-white w-full"><i class="fas fa-save mr-2"></i> Salvar</button></div>`;
            document.getElementById('save-schedule-btn').onclick = () => {
                const newDate = document.getElementById('next-class-date-input').value;
                const newTime = document.getElementById('next-class-time-input').value;
                if (!newDate || !newTime) { alert("Preencha data e hora."); return; }
                db.collection("students").doc(studentId).update({ nextClass: { date: newDate, time: newTime } }).then(() => alert("Agendamento salvo!"));
            };
        } else {
            const { nextClass } = studentData;
            if (nextClass && nextClass.date && nextClass.time) {
                const [year, month, day] = nextClass.date.split('-');
                const formattedDate = new Date(year, month - 1, day).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', timeZone: 'UTC' });
                container.innerHTML = `<p class="text-xl font-semibold text-green-700">${formattedDate}</p><p class="text-4xl font-bold text-gray-800">${nextClass.time}</p>`;
            } else {
                container.innerHTML = `<p class="text-gray-500">Nenhuma aula agendada.</p>`;
            }
        }
    }
    
    function populateFocusCard(studentData, role, studentId) {
        const container = document.getElementById('focus-card-content');
        if (!container) return;
        if (role === 'professor') {
            container.innerHTML = `<textarea id="focus-of-the-week-input" class="enhanced-input w-full h-24" placeholder="Defina os tópicos da semana, um por linha...">${studentData.focusWeek || ''}</textarea><button id="save-focus-btn" class="enhanced-btn bg-blue-600 text-white w-full mt-2"><i class="fas fa-save mr-2"></i> Salvar Foco</button>`;
            document.getElementById('save-focus-btn').onclick = () => {
                 const focusText = document.getElementById('focus-of-the-week-input').value;
                 db.collection("students").doc(studentId).update({ focusWeek: focusText }).then(() => alert('Foco da semana salvo!'));
            };
        } else {
            if (studentData.focusWeek) {
                const topics = studentData.focusWeek.split('\n').filter(t => t.trim() !== '').map(topic => `<li><i class="fas fa-check-circle text-blue-500 mr-2"></i>${topic.trim()}</li>`).join('');
                container.innerHTML = `<ul class="space-y-2 text-gray-700">${topics}</ul>`;
            } else {
                container.innerHTML = `<p class="text-gray-500">O professor definirá o foco em breve.</p>`;
            }
        }
    }

    function populateChallengeCard() {
        const questionEl = document.getElementById('daily-challenge-question');
        const answerInput = document.getElementById('daily-challenge-answer');
        const submitBtn = document.getElementById('daily-challenge-submit');
        const feedbackEl = document.getElementById('challenge-feedback');
        const newChallengeBtn = document.getElementById('new-challenge-btn');
        const tipsContainer = document.getElementById('challenge-tips-container');
        const tipsBtn = document.getElementById('show-tips-btn');
        const tipsText = document.getElementById('challenge-tips-text');
        if (!questionEl) return;
        let currentChallenge = {};

        function loadNewChallenge() {
            currentChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
            questionEl.textContent = currentChallenge.pergunta || currentChallenge.question;
            answerInput.value = '';
            feedbackEl.textContent = '';
            feedbackEl.className = "text-sm mt-2 h-4 font-semibold";
            if (currentChallenge.dicas && currentChallenge.dicas.length > 0) {
                tipsContainer.style.display = 'block';
                tipsText.innerHTML = `<ul>${currentChallenge.dicas.map(d => `<li class="ml-4 list-disc">${d}</li>`).join('')}</ul>`;
                tipsText.classList.add('hidden');
                tipsBtn.textContent = 'Precisa de uma dica?';
            } else {
                tipsContainer.style.display = 'none';
            }
        }
        if (submitBtn) {
            submitBtn.onclick = () => {
                const userAnswer = answerInput.value.trim().toLowerCase();
                const correctAnswer = (currentChallenge.resposta || "").toLowerCase();
                const simpleCorrectAnswer = correctAnswer.replace(/\[.*?\]/g, '').trim();
                if (userAnswer && simpleCorrectAnswer && userAnswer.includes(simpleCorrectAnswer)) {
                    feedbackEl.textContent = "Correto! Bom trabalho!";
                    feedbackEl.classList.add("text-green-600");
                } else {
                    feedbackEl.textContent = `Quase! A resposta era "${currentChallenge.resposta}".`;
                    feedbackEl.classList.add("text-red-600");
                }
            };
        }
        if (newChallengeBtn) newChallengeBtn.onclick = loadNewChallenge;
        if (tipsBtn) {
            tipsBtn.onclick = (e) => {
                e.preventDefault();
                tipsText.classList.toggle('hidden');
                tipsBtn.textContent = tipsText.classList.contains('hidden') ? 'Precisa de uma dica?' : 'Ocultar Dica';
            };
        }
        loadNewChallenge();
    }

    function populateExpressionCard(progress, studentType) {
        const container = document.getElementById('expression-card-content');
        if (!container) return;
        const learnedExpressions = [];
        const lastCompletedNum = findLastCompletedLessonNumber(progress, studentType);
        if (lastCompletedNum === 0) {
            learnedExpressions.push(...(lessonExpressions['default'] || []));
        } else {
            for (let i = 1; i <= lastCompletedNum; i++) {
                const lessonKey = `${studentType}-licao-${String(i).padStart(2, '0')}`;
                if (lessonExpressions[lessonKey]) {
                    learnedExpressions.push(...lessonExpressions[lessonKey]);
                }
            }
        }
        if(learnedExpressions.length === 0) {
             learnedExpressions.push(...(lessonExpressions['default'] || []));
        }
        function loadNewExpression() {
            if (learnedExpressions.length === 0) return;
            const chosenExpression = learnedExpressions[Math.floor(Math.random() * learnedExpressions.length)];
            container.innerHTML = `<p id="expression-term" class="text-xl font-semibold text-purple-700">${chosenExpression.expression}</p><p id="expression-meaning" class="text-gray-600 mt-1 hidden">${chosenExpression.meaning}</p><div class="flex gap-2 mt-3"><button id="reveal-expression-btn" class="enhanced-btn bg-gray-200 text-gray-800 text-sm flex-1">Revelar</button><button id="new-expression-btn" class="enhanced-btn bg-purple-100 text-purple-800 text-sm px-3" title="Nova Expressão"><i class="fas fa-sync-alt"></i></button></div>`;
            document.getElementById('reveal-expression-btn').onclick = () => {
                document.getElementById('expression-meaning').classList.toggle('hidden');
                document.getElementById('reveal-expression-btn').textContent = document.getElementById('expression-meaning').classList.contains('hidden') ? 'Revelar' : 'Ocultar';
            };
            document.getElementById('new-expression-btn').onclick = loadNewExpression;
        }
        loadNewExpression();
    }
    
    function populateNextBadgeCard(progress, studentType) {
        const card = document.getElementById('next-badge-card');
        if (!card) return;
        const badges = BADGE_MAP[studentType];
        if (!badges || badges.length === 0) {
            card.style.display = 'none';
            return;
        }
        const progressData = progress[studentType] || {};
        const completedCount = Object.keys(progressData).length;
        const nextBadge = badges.find(badge => completedCount < badge.req);
        const iconEl = document.getElementById('next-badge-icon');
        const textEl = document.getElementById('next-badge-text');
        const progressBarEl = document.getElementById('next-badge-progress-bar');
        card.style.display = 'block';
        if (nextBadge) {
            const prevBadgeIndex = badges.indexOf(nextBadge) - 1;
            const prevReq = prevBadgeIndex >= 0 ? badges[prevBadgeIndex].req : 0;
            const lessonsNeededForBadge = nextBadge.req - prevReq;
            const lessonsDoneForBadge = completedCount - prevReq;
            const percentage = Math.max(0, Math.min(100, (lessonsDoneForBadge / lessonsNeededForBadge) * 100));
            const lessonsRemaining = nextBadge.req - completedCount;
            iconEl.innerHTML = `<i class="fas ${nextBadge.icon} text-gray-400"></i>`;
            textEl.innerHTML = `Faltam <strong>${lessonsRemaining} ${lessonsRemaining === 1 ? 'lição' : 'lições'}</strong> para desbloquear "<span class="text-indigo-600">${nextBadge.title}</span>"!`;
            progressBarEl.style.width = `${percentage}%`;
        } else {
            iconEl.innerHTML = `<i class="fas fa-party-horn text-yellow-500"></i>`;
            textEl.textContent = "Parabéns! Você desbloqueou todos os emblemas deste módulo!";
            progressBarEl.style.width = '100%';
        }
    }
    
    function populateProgressSection(studentData, role, progress) {
        const studentType = studentData.studentType;
        if (lessonData[studentType] && lessonData[studentType].titles.length > 1) {
            const completed = Object.keys(progress[studentType] || {}).length;
            const total = lessonData[studentType].titles.length - 1;
            if (total > 0) createProgressChart(studentType, completed, total);
        }
        const gradesCard = document.getElementById('grades-card-a1');
        if (gradesCard) {
            gradesCard.style.display = studentType === 'a1' ? 'block' : 'none';
            if (studentType === 'a1') {
                const grades = studentData.gradesA1 || { listening: '', writing: '', speaking: '', reading: '' };
                const isDisabled = role === 'aluno' ? 'disabled' : '';
                gradesCard.innerHTML = `<h3 class="text-xl font-bold mb-4">Notas Detalhadas (A1)</h3><div class="grid grid-cols-2 gap-4">${Object.keys(grades).map(skill => `<div><label class="font-semibold capitalize text-gray-600">${skill}</label><input type="text" id="grade-${skill}" value="${grades[skill]}" class="enhanced-input w-full mt-1" ${isDisabled}></div>`).join('')}</div>`;
            }
        }
    }

    function populateBadgesSection(progress, studentType) {
        const badges = BADGE_MAP[studentType];
        if (badges && badges.length > 0) {
            populateBadgesJourney(progress[studentType] || {}, studentType, badges);
        }
    }

    function populateBadgesJourney(progressData, type, badges) {
        const container = document.getElementById(`badges-card-${type}`);
        if(!container) return;
        const moduleNames = { a1: "Emblemas A1", a2: "Emblemas A2", conversation: "Emblemas de Conversação", business: "Emblemas de Negócios", vestibular: "Emblemas de Vestibular" };
        const title = moduleNames[type] || "Jornada de Emblemas";
        container.innerHTML = `<h2 class="text-xl font-bold mb-4">${title}</h2><div id="badges-grid-${type}" class="grid grid-cols-2 md:grid-cols-4 gap-4"></div>`;
        const grid = document.getElementById(`badges-grid-${type}`);
        const completedCount = Object.keys(progressData).length;
        grid.innerHTML = badges.map(badge => {
            const isUnlocked = completedCount >= badge.req;
            return `<div class="badge-item ${isUnlocked ? 'unlocked' : 'locked'}" data-title="${badge.title}" data-icon="${badge.icon}" title="${isUnlocked ? 'Clique para ver sua conquista!' : `Desbloqueia com ${badge.req} lições`}">
                        <i class="fas ${isUnlocked ? badge.icon : 'fa-lock'} badge-icon text-5xl mb-1"></i>
                        <h4 class="badge-title text-lg">${isUnlocked ? badge.title : 'Bloqueado'}</h4>
                        ${!isUnlocked ? `<span class="badge-requirement">Desbloqueia com ${badge.req} lições</span>` : ''}
                    </div>`;
        }).join('');
        addBadgeClickListeners(grid);
    }
    
    function adjustPortalForStudentType(studentType) {
        const setVisibility = (id, isVisible) => {
            const el = document.getElementById(id);
            if (el) el.style.display = isVisible ? 'block' : 'none';
        };
        const hasProgress = lessonData[studentType] && lessonData[studentType].titles.length > 1;
        const hasBadges = BADGE_MAP[studentType] && BADGE_MAP[studentType].length > 0;
        Object.keys(lessonData).forEach(mod => setVisibility(`progress-card-${mod}`, false));
        Object.keys(BADGE_MAP).forEach(mod => setVisibility(`badges-card-${mod}`, false));
        if (hasProgress) setVisibility(`progress-card-${studentType}`, true);
        if (hasBadges) setVisibility(`badges-card-${studentType}`, true);
        setVisibility('grades-card-a1', studentType === 'a1');
    }
    
    function populateAiPrompts(progress, studentType) {
        const toolsSection = document.getElementById('tools-section');
        const moduleInfo = lessonData[studentType];
        if (!toolsSection) return;
        if (!moduleInfo || !moduleInfo.prompts || Object.keys(moduleInfo.prompts).length === 0) {
            return;
        }
        const lastCompletedNum = findLastCompletedLessonNumber(progress, studentType);
        const nextLessonNum = findNextLessonNumber(progress[studentType] || {}, moduleInfo.titles.length - 1);
        const reviewPromptText = moduleInfo.prompts[lastCompletedNum] || "Complete a sua primeira lição para começar a revisar.";
        const previewPromptText = nextLessonNum ? moduleInfo.preview_prompts[nextLessonNum] : "Módulo concluído!";
        const reviewCard = document.getElementById('ai-review-card');
        const previewCard = document.getElementById('ai-preview-card');
        if(reviewCard) reviewCard.innerHTML = `<h3 class="text-2xl font-bold mb-3 flex items-center gap-3"><i class="fas fa-history text-gray-300"></i> Revisar o Passado</h3><p class="mb-4 text-gray-300 flex-grow">Use este prompt para criar exercícios com base no que já aprendeu.</p><pre class="ai-prompt-block text-gray-300 mb-4 flex-grow min-h-[150px]">${reviewPromptText}</pre><button class="enhanced-btn bg-gray-500 hover:bg-gray-600 mt-auto practice-btn"><i class="fas fa-copy mr-2"></i> Copiar Prompt</button>`;
        if(previewCard) previewCard.innerHTML = `<h3 class="text-2xl font-bold mb-3 flex items-center gap-3"><i class="fas fa-rocket text-teal-200"></i> Preparar para o Futuro</h3><p class="mb-4 text-teal-100 flex-grow">Prepare-se para a próxima aula! Use este prompt para se familiarizar com o novo tópico.</p><pre class="ai-prompt-block text-teal-100 mb-4 flex-grow min-h-[150px]">${previewPromptText}</pre><button class="enhanced-btn bg-teal-500 hover:bg-teal-700 mt-auto practice-btn"><i class="fas fa-copy mr-2"></i> Copiar Prompt</button>`;
        document.querySelectorAll('.practice-btn').forEach(button => {
            button.onclick = () => {
                const promptText = button.previousElementSibling.textContent;
                if (!promptText || promptText.includes("Complete") || promptText.includes("Módulo concluído!")) return;
                navigator.clipboard.writeText(promptText).then(() => {
                    const originalHTML = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                    button.classList.add('bg-green-500');
                    window.open('https://chat.openai.com/', '_blank');
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                        button.classList.remove('bg-green-500');
                    }, 4000);
                });
            };
        });
    }

    function populatePromptLibrary(progress, studentType) {
        const accordionContainer = document.getElementById('prompt-library-accordion');
        if (!accordionContainer) return;
        const moduleInfo = lessonData[studentType];
        if (!moduleInfo || !moduleInfo.titles || moduleInfo.titles.length <= 1) {
             accordionContainer.innerHTML = `<p class="text-center text-gray-500">Nenhuma biblioteca de prompts disponível para este módulo.</p>`;
            return;
        }
        const completedLessons = Object.keys(progress[studentType] || {}).map(key => parseInt(key.replace('lesson_', ''))).filter(num => !isNaN(num)).sort((a, b) => a - b);
        if (completedLessons.length === 0) {
            accordionContainer.innerHTML = `<p class="text-center text-gray-500">A sua biblioteca de prompts aparecerá aqui assim que você completar a primeira lição.</p>`;
            return;
        }
        let accordionHtml = completedLessons.map(lessonNum => {
            const lessonTitle = moduleInfo.titles[lessonNum] || `Lição ${lessonNum}`;
            const reviewPrompt = moduleInfo.prompts[lessonNum] || "Prompt de revisão não disponível.";
            const previewPrompt = moduleInfo.preview_prompts[lessonNum] || "Prompt de preparação não disponível.";
            return `<div class="accordion-item">
                    <button class="accordion-header">
                        <span>Lição ${String(lessonNum).padStart(2, '0')}: ${lessonTitle}</span>
                        <i class="fas fa-chevron-down accordion-icon"></i>
                    </button>
                    <div class="accordion-content">
                        <div class="space-y-4 py-4">
                            <div>
                                <h5 class="font-semibold text-gray-600 mb-1">Prompt de Revisão:</h5>
                                <pre class="ai-prompt-block text-sm bg-gray-200 text-gray-800 p-2 rounded">${reviewPrompt}</pre>
                                <button class="mt-2 text-sm enhanced-btn bg-gray-500 text-white w-full library-copy-btn"><i class="fas fa-copy mr-2"></i> Copiar Prompt de Revisão</button>
                            </div>
                            <div>
                                <h5 class="font-semibold text-teal-600 mb-1">Prompt de Preparação:</h5>
                                <pre class="ai-prompt-block text-sm bg-gray-200 text-gray-800 p-2 rounded">${previewPrompt}</pre>
                                <button class="mt-2 text-sm enhanced-btn bg-teal-500 text-white w-full library-copy-btn"><i class="fas fa-copy mr-2"></i> Copiar Prompt de Preparação</button>
                            </div>
                        </div>
                    </div>
                </div>`;
        }).join('');
        accordionContainer.innerHTML = accordionHtml;
        setupAccordion();
        setupLibraryCopyButtons();
    }

    function setupAccordion() {
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                header.classList.toggle('active');
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }

    function setupLibraryCopyButtons() {
        document.querySelectorAll('.library-copy-btn').forEach(button => {
            button.onclick = () => {
                const promptText = button.previousElementSibling.textContent;
                navigator.clipboard.writeText(promptText).then(() => {
                    const originalHTML = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                    button.classList.add('bg-green-500');
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                        button.classList.remove('bg-green-500');
                    }, 2000);
                });
            };
        });
    }

    function addBadgeClickListeners(grid) {
        grid.querySelectorAll('.badge-item.unlocked').forEach(badge => {
            badge.addEventListener('click', () => {
                badge.classList.add('is-spinning');
                setTimeout(() => badge.classList.remove('is-spinning'), 800);
                showBadgeModal(badge.dataset.title, badge.dataset.icon);
            });
        });
    }

    function showBadgeModal(title, icon) {
        const modal = document.getElementById('badge-modal');
        const modalIcon = document.getElementById('badge-modal-icon');
        const modalTitle = document.getElementById('badge-modal-title');
        const modalMessage = document.getElementById('badge-modal-message');
        const badgeInfo = badgeMessages[title];
        if (!modal || !badgeInfo) return;
        const message = badgeInfo.message || "Parabéns por esta incrível conquista!";
        const skills = badgeInfo.skills || [];
        let skillsHtml = skills.length > 0 ? `<div class="mt-4 pt-4 border-t border-gray-200">
                    <h4 class="font-bold text-gray-700 text-left">Habilidades Desbloqueadas:</h4>
                    <ul class="text-gray-600 text-left mt-2 space-y-1">
                        ${skills.map(skill => `<li><i class="fas fa-check-circle text-green-500 mr-2"></i>${skill}</li>`).join('')}
                    </ul>
                </div>` : '';
        modalIcon.innerHTML = `<i class="fas ${icon} badge-icon"></i>`;
        modalTitle.textContent = title;
        modalMessage.innerHTML = `<p>${message}</p>${skillsHtml}`;
        modal.classList.remove('hidden');
    }

    function setupBadgeModalControls() {
        const modal = document.getElementById('badge-modal');
        const closeModalBtn = document.getElementById('close-badge-modal-btn');
        if(closeModalBtn) closeModalBtn.onclick = () => modal.classList.add('hidden');
        if(modal) modal.onclick = (event) => { if (event.target === modal) modal.classList.add('hidden'); };
    }

    function createProgressChart(module, completed, total) {
        const container = document.getElementById(`progress-card-${module}`);
        if (!container) return;
        container.innerHTML = `<h3 class="text-xl font-bold mb-4">Progresso ${module.toUpperCase()}</h3><div class="relative w-40 h-40 md:w-48 md:h-48 mx-auto"><canvas id="${module}-progress-chart"></canvas><div class="progress-text absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-700"></div></div><p class="text-sm text-gray-500 text-center mt-2"><span class="completed-lessons">${completed}</span> de <span class="total-lessons">${total}</span> lições</p>`;
        const canvas = document.getElementById(`${module}-progress-chart`);
        const textEl = container.querySelector('.progress-text');
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        textEl.textContent = `${percentage}%`;
        const colors = { a1: ['#22c55e', '#e5e7eb'], conversation: ['#8b5cf6', '#e5e7eb'], business: ['#3b82f6', '#e5e7eb'], vestibular: ['#f97316', '#e5e7eb'] };
        if(canvas.chart) { canvas.chart.destroy(); }
        canvas.chart = new Chart(canvas.getContext('2d'), { type: 'doughnut', data: { datasets: [{ data: [completed, Math.max(0, total - completed)], backgroundColor: colors[module] || colors['conversation'], borderColor: '#f9fafb', borderWidth: 4 }] }, options: { responsive: true, cutout: '80%', plugins: { legend: { display: false }, tooltip: { enabled: false } } } });
    }

    function findLastCompletedLessonNumber(progress, studentType) {
        const moduleProgress = progress[studentType] || {};
        const completedLessons = Object.keys(moduleProgress).map(key => parseInt(key.replace('lesson_', ''))).sort((a, b) => b - a);
        return completedLessons.length > 0 ? completedLessons[0] : 0;
    }

    function findNextLessonNumber(moduleProgress, totalLessons) {
        if(!moduleProgress) return 1;
        for (let i = 1; i <= totalLessons; i++) {
            if (!moduleProgress[`lesson_${i}`]) return i;
        }
        return null;
    }
    
    function setupActionButtons(role, studentId) {
        const isProfessor = role === 'professor';
        const logoutBtnContainer = document.getElementById('logout-btn-container');
        if (logoutBtnContainer && !logoutBtnContainer.querySelector('#logout-btn')) {
             logoutBtnContainer.innerHTML = `<button id="logout-btn" class="w-full text-left enhanced-btn bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition"><i class="fas fa-sign-out-alt nav-icon"></i>Sair</button>`;
             document.getElementById('logout-btn').addEventListener('click', () => { 
                auth.signOut().then(() => { 
                    localStorage.clear(); 
                    window.location.href = 'login.html'; 
                }); 
            });
        }
        const backBtn = document.getElementById('back-to-index-btn');
        if (backBtn) backBtn.style.display = isProfessor ? 'flex' : 'none';
        
        if (isProfessor && document.getElementById('grades-card-a1')?.style.display !== 'none') {
            const gradesCard = document.getElementById('grades-card-a1');
            if(gradesCard && !document.getElementById('save-grades-btn')) {
                gradesCard.querySelectorAll('input').forEach(input => input.disabled = false);
                gradesCard.insertAdjacentHTML('beforeend', `<button id="save-grades-btn" class="enhanced-btn bg-blue-600 text-white w-full mt-4"><i class="fas fa-save mr-2"></i> Salvar Notas</button>`);
                document.getElementById('save-grades-btn').onclick = () => {
                    const gradesData = {
                        listening: document.getElementById('grade-listening').value,
                        writing: document.getElementById('grade-writing').value,
                        speaking: document.getElementById('grade-speaking').value,
                        reading: document.getElementById('grade-reading').value
                    };
                    db.collection("students").doc(studentId).update({ gradesA1: gradesData })
                        .then(() => alert('Notas salvas com sucesso!'));
                };
            }
        }
    }

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
    }

    function closeMenu() {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
    }

    if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
});