document.addEventListener('DOMContentLoaded', () => {
    // Validação para garantir que os arquivos de dados foram carregados antes
    if (typeof lessonData === 'undefined' || typeof lessonExpressions === 'undefined' || typeof dailyChallenges === 'undefined' || typeof badgeMessages === 'undefined') {
        console.error("ERRO CRÍTICO: Um ou mais arquivos de dados não foram carregados.");
        document.getElementById('loading-message').textContent = 'Erro ao carregar dados do curso.';
        return;
    }

    const db = firebase.firestore();
    const auth = firebase.auth();

    // Ponto de Entrada Principal
    auth.onAuthStateChanged(user => {
        if (!user) {
            const loginPath = window.location.pathname.includes('/aluno/') ? '../login.html' : 'login.html';
            window.location.href = loginPath;
            return;
        }
        const role = localStorage.getItem('loggedInUserRole') || 'aluno';
        const studentId = (role === 'professor') ? localStorage.getItem('selectedStudentId') : user.uid;
        if (!studentId) {
            document.getElementById('loading-message').textContent = 'Erro: ID do aluno não encontrado.';
            return;
        }
        loadStudentPortal(studentId, role);
    });

    async function loadStudentPortal(studentId, role) {
        try {
            const studentDoc = await db.collection("students").doc(studentId).get();
            if (!studentDoc.exists) throw new Error("Aluno não encontrado na base de dados.");
            
            const studentData = studentDoc.data();
            const progress = studentData.progress || { a1: {}, conversation: {}, business: {}, vestibular: {} };
            
            populateHeader(studentData);
            populateLastLessonCard(progress, studentData.studentType);
            populateModulesCard(studentData.studentType);
            populateScheduleCard(studentData, role, studentId);
            populateFocusCard(studentData, role, studentId);
            populateChallengeCard();
            populateExpressionCard(progress, studentData.studentType);
            populateNextBadgeCard(progress, studentData.studentType);
            adjustPortalForStudentType(studentData.studentType);
            populateProgressSection(studentData, role, progress);
            populateBadgesSection(progress, studentData.studentType);
            populateAiPrompts(progress, studentData.studentType);
            populatePromptLibrary(progress, studentData.studentType);
            setupActionButtons(role, studentId);
            setupBadgeModalControls();

        } catch (error) {
            console.error("Erro ao carregar o portal:", error);
            document.getElementById('loading-message').textContent = `Erro: ${error.message}`;
        }
    }

    function populateHeader(studentData) {
        const welcomeSpan = document.getElementById('student-name-welcome');
        if (welcomeSpan) welcomeSpan.textContent = studentData.name.split(' ')[0];
    }
    
    function populateLastLessonCard(progress, studentType) {
        const card = document.getElementById('last-lesson-card');
        if (!card || !lessonData[studentType]) return;
        
        const lastCompletedNum = findLastCompletedLessonNumber(progress, studentType);
        
        if (lastCompletedNum > 0) {
            const moduleInfo = lessonData[studentType];
            const lessonTitle = moduleInfo.titles[lastCompletedNum] || `Lição ${lastCompletedNum}`;
            const lessonUrl = `../${studentType}/licao-${String(lastCompletedNum).padStart(2, '0')}.html`;
            card.innerHTML = `<div class="md:w-1/4 flex justify-center mb-4 md:mb-0"><i class="fas fa-history text-7xl text-white opacity-80"></i></div><div class="md:w-3/4 text-center md:text-left"><h3 class="text-2xl font-bold mb-2">Revise sua Última Aula</h3><p class="text-lg opacity-90 mb-6">Sua última lição foi: <strong>${lessonTitle}</strong></p><a href="${lessonUrl}" class="w-full md:w-auto inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-lg transition hover:bg-gray-100 shadow-md">Revisar Agora</a></div>`;
        } else {
             card.innerHTML = `<div class="text-center w-full"><i class="fas fa-book-open text-7xl text-white opacity-80 mb-4"></i><h3 class="text-2xl font-bold mb-2">Tudo a postos!</h3><p class="text-lg opacity-90">Complete a sua primeira lição para começar a jornada.</p></div>`;
        }
    }

    function populateModulesCard(studentType) {
        const card = document.getElementById('modules-card');
        if (!card) return;
        let moduleName = 'Módulo';
        if (studentType === 'a1') moduleName = 'Módulo A1';
        else if (studentType === 'conversation') moduleName = 'Tópicos de Conversação';
        else if (studentType === 'business') moduleName = 'Inglês para Negócios';
        else if (studentType === 'vestibular') moduleName = 'Dicas para Vestibular';
        const moduleUrl = `../${studentType}/${studentType}.html`;
        card.innerHTML = `<i class="fas fa-stream text-5xl mb-4"></i><h3 class="text-2xl font-bold mb-2">${moduleName}</h3><p class="text-lg opacity-90 mb-6">Acesse todas as lições e revise seu progresso.</p><a href="${moduleUrl}" class="w-full text-center block bg-white text-gray-800 font-bold py-3 px-6 rounded-lg transition hover:bg-gray-200">Ver Lições</a>`;
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
        let currentChallenge = {};

        function loadNewChallenge() {
            if (!questionEl || !tipsContainer || !dailyChallenges) return;
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
                if (userAnswer && userAnswer.includes(simpleCorrectAnswer) && simpleCorrectAnswer.length > 0) {
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
        if (!container || !lessonData[studentType]) return;
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
        function loadNewExpression() {
            if (learnedExpressions.length === 0) {
                container.innerHTML = `<p class="text-gray-500">Complete uma lição para ver as expressões aqui.</p>`;
                return;
            }
            const chosenExpression = learnedExpressions[Math.floor(Math.random() * learnedExpressions.length)];
            container.innerHTML = `<p id="expression-term" class="text-xl font-semibold text-purple-700">${chosenExpression.expression}</p><p id="expression-meaning" class="text-gray-600 mt-1 hidden">${chosenExpression.meaning}</p><div class="flex gap-2 mt-3"><button id="reveal-expression-btn" class="enhanced-btn bg-gray-200 text-gray-800 text-sm flex-1">Revelar</button><button id="new-expression-btn" class="enhanced-btn bg-purple-100 text-purple-800 text-sm px-3" title="Nova Expressão"><i class="fas fa-sync-alt"></i></button></div>`;
            document.getElementById('reveal-expression-btn').onclick = () => {
                const meaningEl = document.getElementById('expression-meaning');
                const btn = document.getElementById('reveal-expression-btn');
                meaningEl.classList.toggle('hidden');
                btn.textContent = meaningEl.classList.contains('hidden') ? 'Revelar' : 'Ocultar';
            };
            document.getElementById('new-expression-btn').onclick = loadNewExpression;
        }
        loadNewExpression();
    }
    
    function populateNextBadgeCard(progress, studentType) {
        const content = document.getElementById('next-badge-content');
        if (!content) return;
        const progressData = progress[studentType] || {};
        const completedCount = Object.keys(progressData).length;
        let badges = [];
        if (studentType === 'a1') badges = A1_BADGES;
        else if (studentType === 'conversation') badges = CONVERSATION_BADGES;
        else if (studentType === 'business') badges = BUSINESS_BADGES;
        else if (studentType === 'vestibular') badges = VESTIBULAR_BADGES;
        if (badges.length === 0) {
             content.innerHTML = '<p class="text-gray-500">Este módulo não possui emblemas.</p>';
             return;
        }
        let nextBadge = null;
        for (const badge of badges) {
            if (completedCount < badge.req) {
                nextBadge = badge;
                break;
            }
        }
        const iconEl = document.getElementById('next-badge-icon');
        const textEl = document.getElementById('next-badge-text');
        const progressBarEl = document.getElementById('next-badge-progress-bar');
        if (nextBadge) {
            const prevBadge = badges[badges.indexOf(nextBadge) - 1];
            const prevReq = prevBadge ? prevBadge.req : 0;
            const lessonsNeededForBadge = nextBadge.req - prevReq;
            const lessonsDoneForBadge = completedCount - prevReq;
            const percentage = Math.max(0, Math.min(100, (lessonsDoneForBadge / lessonsNeededForBadge) * 100));
            const lessonsRemaining = nextBadge.req - completedCount;
            iconEl.innerHTML = `<i class="fas ${nextBadge.icon} text-gray-400"></i>`;
            textEl.innerHTML = `Faltam <strong>${lessonsRemaining} ${lessonsRemaining > 1 ? 'lições' : 'lição'}</strong> para desbloquear "<span class="text-indigo-600">${nextBadge.title}</span>"!`;
            progressBarEl.style.width = `${percentage}%`;
        } else {
            iconEl.innerHTML = `<i class="fas fa-party-horn text-yellow-500"></i>`;
            textEl.textContent = "Parabéns! Você desbloqueou todos os emblemas!";
            progressBarEl.style.width = '100%';
            progressBarEl.classList.remove('from-indigo-500', 'to-purple-600');
            progressBarEl.classList.add('bg-yellow-500');
        }
    }
    
    function populateProgressSection(studentData, role, progress) {
        const totalA1 = (lessonData.a1 && lessonData.a1.titles.length - 1) || 0;
        createProgressChart('a1', Object.keys(progress.a1 || {}).length, totalA1);
        const totalConv = (lessonData.conversation && lessonData.conversation.titles.length - 1) || 0;
        createProgressChart('conversation', Object.keys(progress.conversation || {}).length, totalConv);
        const totalBusiness = (lessonData.business && lessonData.business.titles.length - 1) || 0;
        createProgressChart('business', Object.keys(progress.business || {}).length, totalBusiness);
        const totalVestibular = (lessonData.vestibular && lessonData.vestibular.titles.length - 1) || 0;
        createProgressChart('vestibular', Object.keys(progress.vestibular || {}).length, totalVestibular);
        const gradesCard = document.getElementById('grades-card-a1');
        if (studentData.studentType === 'a1') {
            gradesCard.style.display = 'block';
            const grades = studentData.gradesA1 || { listening: '', writing: '', speaking: '', reading: '' };
            const isDisabled = role === 'aluno' ? 'disabled' : '';
            gradesCard.innerHTML = `<h3 class="text-xl font-bold mb-4">Notas Detalhadas (A1)</h3><div class="grid grid-cols-2 gap-4">${Object.keys(grades).map(skill => `<div><label class="font-semibold capitalize text-gray-600">${skill}</label><input type="text" id="grade-${skill}" value="${grades[skill]}" class="enhanced-input w-full mt-1" ${isDisabled}></div>`).join('')}</div>`;
        } else {
            gradesCard.style.display = 'none';
        }
    }
    
    function populateBadgesSection(progress, studentType) {
        let badges = [];
        if (studentType === 'a1') badges = A1_BADGES;
        else if (studentType === 'conversation') badges = CONVERSATION_BADGES;
        else if (studentType === 'business') badges = BUSINESS_BADGES;
        else if (studentType === 'vestibular') badges = VESTIBULAR_BADGES;
        populateBadgesJourney(progress[studentType] || {}, studentType, badges);
    }

    function populateAiPrompts(progress, studentType) {
        const moduleInfo = lessonData[studentType];
        if (!moduleInfo || !moduleInfo.titles) return;
        const lastCompletedNum = findLastCompletedLessonNumber(progress, studentType);
        const nextLessonNum = findNextLessonNumber(progress[studentType] || {}, moduleInfo.titles.length - 1);
        const reviewPromptText = (moduleInfo.prompts && moduleInfo.prompts[lastCompletedNum]) || "Complete a sua primeira lição para começar a revisar.";
        const previewPromptText = (nextLessonNum && moduleInfo.preview_prompts && moduleInfo.preview_prompts[nextLessonNum]) ? moduleInfo.preview_prompts[nextLessonNum] : "Módulo concluído!";
        const reviewCard = document.getElementById('ai-review-card');
        const previewCard = document.getElementById('ai-preview-card');
        if (reviewCard) reviewCard.innerHTML = `<h3 class="text-2xl font-bold mb-3 flex items-center gap-3"><i class="fas fa-history text-gray-300"></i> Revisar o Passado</h3><p class="mb-4 text-gray-300 flex-grow">Use este prompt para criar exercícios com base no que já aprendeu.</p><pre class="ai-prompt-block text-gray-300 mb-4 flex-grow min-h-[150px]">${reviewPromptText}</pre><button class="enhanced-btn bg-gray-500 hover:bg-gray-600 mt-auto practice-btn"><i class="fas fa-copy mr-2"></i> Copiar Prompt</button>`;
        if (previewCard) previewCard.innerHTML = `<h3 class="text-2xl font-bold mb-3 flex items-center gap-3"><i class="fas fa-rocket text-teal-200"></i> Preparar para o Futuro</h3><p class="mb-4 text-teal-100 flex-grow">Prepare-se para a próxima aula! Use este prompt para se familiarizar com o novo tópico.</p><pre class="ai-prompt-block text-teal-100 mb-4 flex-grow min-h-[150px]">${previewPromptText}</pre><button class="enhanced-btn bg-teal-500 hover:bg-teal-700 mt-auto practice-btn"><i class="fas fa-copy mr-2"></i> Copiar Prompt</button>`;
        document.querySelectorAll('.practice-btn').forEach(button => {
            button.onclick = () => {
                const promptText = button.previousElementSibling.textContent;
                if (promptText.includes("Complete") || promptText.includes("Módulo concluído!")) return;
                navigator.clipboard.writeText(promptText).then(() => {
                    const originalHTML = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                    button.classList.add('bg-green-500');
                    window.open('https://gemini.google.com/', '_blank');
                    setTimeout(() => { button.innerHTML = originalHTML; button.classList.remove('bg-green-500'); }, 4000);
                });
            };
        });
    }

    function populatePromptLibrary(progress, studentType) {
        const accordionContainer = document.getElementById('prompt-library-accordion');
        if (!accordionContainer || !lessonData[studentType] || !lessonData[studentType].titles) return;
        const moduleInfo = lessonData[studentType];
        const completedLessons = Object.keys(progress[studentType] || {})
            .map(key => parseInt(key.replace('lesson_', ''))).filter(num => !isNaN(num)).sort((a, b) => a - b);
        if (completedLessons.length === 0) {
            accordionContainer.innerHTML = `<p class="text-center text-gray-500">A sua biblioteca aparecerá aqui assim que você completar a primeira lição.</p>`;
            return;
        }
        const accordionHtml = completedLessons.map(lessonNum => {
            const lessonTitle = moduleInfo.titles[lessonNum] || `Lição ${lessonNum}`;
            const reviewPrompt = (moduleInfo.prompts && moduleInfo.prompts[lessonNum]) || "Prompt de revisão não disponível.";
            const previewPrompt = (moduleInfo.preview_prompts && moduleInfo.preview_prompts[lessonNum]) || "Prompt de preparação não disponível.";
            return `<div class="accordion-item"><button class="accordion-header"><span>Lição ${String(lessonNum).padStart(2, '0')}: ${lessonTitle}</span><i class="fas fa-chevron-down accordion-icon"></i></button><div class="accordion-content"><div class="space-y-4 py-4"><div><h5 class="font-semibold text-gray-600 mb-1">Prompt de Revisão:</h5><pre class="ai-prompt-block text-sm bg-gray-200 text-gray-800 p-2 rounded">${reviewPrompt}</pre><button class="mt-2 text-sm enhanced-btn bg-gray-500 text-white w-full library-copy-btn"><i class="fas fa-copy mr-2"></i> Copiar</button></div><div><h5 class="font-semibold text-teal-600 mb-1">Prompt de Preparação:</h5><pre class="ai-prompt-block text-sm bg-gray-200 text-gray-800 p-2 rounded">${previewPrompt}</pre><button class="mt-2 text-sm enhanced-btn bg-teal-500 text-white w-full library-copy-btn"><i class="fas fa-copy mr-2"></i> Copiar</button></div></div></div></div>`;
        }).join('');
        accordionContainer.innerHTML = accordionHtml;
        setupAccordion();
        setupLibraryCopyButtons();
    }
    
    function setupAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
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
        if (!modal || !badgeMessages[title]) return;
        const badgeInfo = badgeMessages[title];
        const message = badgeInfo.message || "Parabéns por esta incrível conquista!";
        const skills = badgeInfo.skills || [];
        
        let skillsHtml = '';
        if (skills.length > 0) {
            skillsHtml = `<div class="mt-4 pt-4 border-t border-gray-200"><h4 class="font-bold text-gray-700 text-left">Habilidades Desbloqueadas:</h4><ul class="text-gray-600 text-left mt-2 space-y-1">${skills.map(skill => `<li><i class="fas fa-check-circle text-green-500 mr-2"></i>${skill}</li>`).join('')}</ul></div>`;
        }
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
        const moduleTitle = module.charAt(0).toUpperCase() + module.slice(1);
        container.innerHTML = `<h3 class="text-xl font-bold mb-4">Progresso ${moduleTitle}</h3><div class="relative w-40 h-40 md:w-48 md:h-48 mx-auto"><canvas id="${module}-progress-chart"></canvas><div class="progress-text absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-700"></div></div><p class="text-sm text-gray-500 text-center mt-2">${completed} de ${total} lições</p>`;
        const canvas = document.getElementById(`${module}-progress-chart`);
        const textEl = container.querySelector('.progress-text');
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        textEl.textContent = `${percentage}%`;
        let colors = ['#8b5cf6', '#e5e7eb'];
        if (module === 'a1') colors = ['#22c55e', '#e5e7eb'];
        if (module === 'business') colors = ['#0ea5e9', '#e5e7eb'];
        if (module === 'vestibular') colors = ['#f97316', '#e5e7eb'];
        if(canvas.chart) { canvas.chart.destroy(); }
        canvas.chart = new Chart(canvas.getContext('2d'), { type: 'doughnut', data: { datasets: [{ data: [completed, Math.max(0, total - completed)], backgroundColor: colors, borderColor: '#f9fafb', borderWidth: 4 }] }, options: { responsive: true, cutout: '80%', plugins: { legend: { display: false }, tooltip: { enabled: false } } } });
    }

    function populateBadgesJourney(progressData, type, badges) {
        const container = document.getElementById(`badges-card-${type}`);
        if(!container) return;
        let title = `Emblemas ${type.toUpperCase()}`;
        if (type === 'conversation') title = 'Emblemas de Conversação';
        if (type === 'business') title = 'Emblemas de Negócios';
        if (type === 'vestibular') title = 'Emblemas de Vestibular';
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

    function findLastCompletedLessonNumber(progress, studentType) {
        if (!progress || !progress[studentType]) return 0;
        const completedLessons = Object.keys(progress[studentType]).map(key => parseInt(key.replace('lesson_', ''))).filter(num => !isNaN(num)).sort((a, b) => b - a);
        return completedLessons.length > 0 ? completedLessons[0] : 0;
    }

    function findNextLessonNumber(moduleProgress, totalLessons) {
        if(!moduleProgress) return 1;
        for (let i = 1; i <= totalLessons; i++) {
            if (!moduleProgress[`lesson_${i}`]) return i;
        }
        return null;
    }

    function adjustPortalForStudentType(studentType) {
        const setVisibility = (id, isVisible) => {
            const el = document.getElementById(id);
            if (el) el.style.display = isVisible ? 'block' : 'none';
        };
        setVisibility('progress-card-a1', studentType === 'a1');
        setVisibility('grades-card-a1', studentType === 'a1');
        setVisibility('badges-card-a1', studentType === 'a1');
        setVisibility('progress-card-conversation', studentType === 'conversation');
        setVisibility('badges-card-conversation', studentType === 'conversation');
        setVisibility('progress-card-business', studentType === 'business');
        setVisibility('badges-card-business', studentType === 'business');
        setVisibility('progress-card-vestibular', studentType === 'vestibular');
        setVisibility('badges-card-vestibular', studentType === 'vestibular');
    }
    
    function setupActionButtons(role, studentId) {
        const isProfessor = role === 'professor';
        const logoutBtnContainer = document.getElementById('logout-btn-container');
        if (logoutBtnContainer && !logoutBtnContainer.querySelector('#logout-btn')) {
             logoutBtnContainer.innerHTML = `<button id="logout-btn" class="w-full text-left enhanced-btn bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition"><i class="fas fa-sign-out-alt nav-icon"></i>Sair</button>`;
             document.getElementById('logout-btn').addEventListener('click', () => { 
                auth.signOut().then(() => { localStorage.clear(); window.location.href = '../login.html'; }); 
            });
        }
        const backBtn = document.getElementById('back-to-index-btn');
        if (backBtn) backBtn.style.display = isProfessor ? 'flex' : 'none';
        
        if (isProfessor) {
            const gradesCard = document.getElementById('grades-card-a1');
            if(gradesCard && gradesCard.style.display !== 'none') {
                if(!document.getElementById('save-grades-btn')){
                    gradesCard.innerHTML += `<button id="save-grades-btn" class="enhanced-btn bg-blue-600 text-white w-full mt-4"><i class="fas fa-save mr-2"></i> Salvar Notas</button>`;
                }
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
});