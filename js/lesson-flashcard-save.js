(function () {
    const STYLE_ID = 'lesson-flashcard-save-style';
    const MODAL_ID = 'lesson-flashcard-save-modal';
    const BUTTON_CLASS = 'lesson-flashcard-save-btn';
    const CARD_SELECTOR = '.flashcard, .flip-card';

    function getLessonContext() {
        const match = window.location.pathname.match(/\/([^\/]+)\/licao-(\d+)\.html$/i);
        if (!match) {
            return {
                moduleId: 'lesson',
                lessonNumber: null,
                lessonLabel: 'Lesson',
                defaultCategory: 'FAVORITOS'
            };
        }

        const moduleId = match[1].toLowerCase();
        const lessonRaw = match[2];
        const lessonNumber = parseInt(lessonRaw, 10);
        const moduleLabel = moduleId.charAt(0).toUpperCase() + moduleId.slice(1);

        return {
            moduleId,
            lessonNumber,
            lessonLabel: `${moduleLabel} ${lessonRaw}`,
            defaultCategory: `FAVORITOS - ${moduleLabel} ${lessonRaw}`
        };
    }

    function ensureStyles() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            .${BUTTON_CLASS} {
                position: absolute;
                top: 0.75rem;
                left: 0.75rem;
                width: 2.2rem;
                height: 2.2rem;
                border-radius: 9999px;
                border: 1px solid rgba(96, 165, 250, 0.5);
                background: rgba(17, 24, 39, 0.88);
                color: #60a5fa;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                z-index: 4;
                cursor: pointer;
            }
            .${BUTTON_CLASS}:hover {
                background: rgba(37, 99, 235, 0.18);
                color: #93c5fd;
            }
            .${BUTTON_CLASS}.saved {
                color: #facc15;
                border-color: rgba(250, 204, 21, 0.65);
            }
            #${MODAL_ID}.hidden {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }

    function extractFrontText(card) {
        const front = card.querySelector('.flashcard-front, .flip-card-front');
        if (!front) return '';

        const heading = front.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading && heading.textContent.trim()) {
            return heading.textContent.trim();
        }

        const clone = front.cloneNode(true);
        clone.querySelectorAll('button').forEach((button) => button.remove());
        return clone.textContent.replace(/\s+/g, ' ').trim();
    }

    function extractBackText(card) {
        const back = card.querySelector('.flashcard-back, .flip-card-back');
        if (!back) return '';

        const paragraph = back.querySelector('p');
        if (paragraph && paragraph.textContent.trim()) {
            return paragraph.textContent.trim();
        }

        return back.textContent.replace(/\s+/g, ' ').trim();
    }

    function ensureModal() {
        let modal = document.getElementById(MODAL_ID);
        if (modal) return modal;

        modal = document.createElement('div');
        modal.id = MODAL_ID;
        modal.className = 'hidden fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-sm';
        modal.innerHTML = `
            <div class="bg-slate-900 border-2 border-slate-800 w-full max-w-md rounded-[2rem] p-8 shadow-2xl">
                <h2 class="text-2xl font-black uppercase italic mb-6 text-blue-400 text-center">Salvar Card</h2>
                <div class="space-y-4">
                    <div>
                        <label class="text-[10px] font-bold text-slate-500 uppercase ml-2">Frente (Inglês)</label>
                        <input type="text" data-role="front" class="w-full bg-slate-800 border-2 border-slate-700 p-4 rounded-2xl text-white font-bold outline-none focus:border-blue-500">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-500 uppercase ml-2">Verso (Tradução/Significado)</label>
                        <input type="text" data-role="back" class="w-full bg-slate-800 border-2 border-slate-700 p-4 rounded-2xl text-white font-bold outline-none focus:border-blue-500">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold text-slate-500 uppercase ml-2">Categoria/Favorito</label>
                        <input type="text" data-role="category" class="w-full bg-slate-800 border-2 border-slate-700 p-4 rounded-2xl text-white font-bold outline-none focus:border-blue-500">
                    </div>
                </div>
                <p data-role="feedback" class="hidden mt-4 text-sm font-semibold rounded-xl px-4 py-3"></p>
                <div class="grid grid-cols-2 gap-3 mt-8">
                    <button type="button" data-role="cancel" class="bg-slate-800 text-slate-400 font-black py-4 rounded-2xl uppercase text-xs">Cancelar</button>
                    <button type="button" data-role="confirm" class="bg-blue-600 text-white font-black py-4 rounded-2xl uppercase text-xs">Salvar Card</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        return modal;
    }

    function init() {
        ensureStyles();
        if (typeof window.firebase === 'undefined' || typeof window.db === 'undefined') return;

        const context = getLessonContext();
        const modal = ensureModal();
        const frontInput = modal.querySelector('[data-role="front"]');
        const backInput = modal.querySelector('[data-role="back"]');
        const categoryInput = modal.querySelector('[data-role="category"]');
        const feedback = modal.querySelector('[data-role="feedback"]');
        const cancelBtn = modal.querySelector('[data-role="cancel"]');
        const confirmBtn = modal.querySelector('[data-role="confirm"]');
        const loginUrl = new URL('../login.html', window.location.href).href;
        let activeCard = null;

        function setFeedback(message, type) {
            feedback.textContent = message;
            feedback.className = 'mt-4 text-sm font-semibold rounded-xl px-4 py-3';
            if (type === 'error') {
                feedback.classList.add('bg-red-500/10', 'text-red-300', 'border', 'border-red-500/30');
            } else {
                feedback.classList.add('bg-emerald-500/10', 'text-emerald-300', 'border', 'border-emerald-500/30');
            }
        }

        function resetModal() {
            feedback.className = 'hidden mt-4 text-sm font-semibold rounded-xl px-4 py-3';
            feedback.textContent = '';
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Salvar Card';
        }

        function toggleModal(show) {
            modal.classList.toggle('hidden', !show);
            if (!show) {
                activeCard = null;
                resetModal();
            }
        }

        function openSaveModal(card) {
            const user = firebase.auth().currentUser;
            if (!user) {
                window.location.href = loginUrl;
                return;
            }

            activeCard = card;
            frontInput.value = extractFrontText(card);
            backInput.value = extractBackText(card);
            categoryInput.value = context.defaultCategory;
            resetModal();
            toggleModal(true);
        }

        async function saveCard() {
            const user = firebase.auth().currentUser;
            if (!user) {
                window.location.href = loginUrl;
                return;
            }

            const f = frontInput.value.trim();
            const b = backInput.value.trim();
            const l = categoryInput.value.trim() || context.defaultCategory;

            if (!f || !b) {
                setFeedback('Preencha a frente e o verso antes de salvar.', 'error');
                return;
            }

            confirmBtn.disabled = true;
            confirmBtn.textContent = 'Salvando...';

            try {
                await db.collection('users').doc(user.uid).collection('myCards').add({
                    f,
                    b,
                    l,
                    module: context.moduleId,
                    lesson: context.lessonNumber,
                    source: 'lesson-flashcard'
                });

                if (activeCard) {
                    const button = activeCard.querySelector(`.${BUTTON_CLASS}`);
                    if (button) {
                        button.classList.add('saved');
                        button.title = 'Card salvo';
                    }
                }

                setFeedback('Card salvo com sucesso na conta do aluno.', 'success');
                window.setTimeout(() => toggleModal(false), 900);
            } catch (error) {
                console.error('Erro ao salvar card da lição:', error);
                setFeedback('Não foi possível salvar agora. Tente novamente.', 'error');
                confirmBtn.disabled = false;
                confirmBtn.textContent = 'Salvar Card';
            }
        }

        function enhanceCards(root) {
            const scope = root || document;
            const cards = [];

            if (scope instanceof Element && scope.matches(CARD_SELECTOR)) {
                cards.push(scope);
            }

            if (scope.querySelectorAll) {
                cards.push(...Array.from(scope.querySelectorAll(CARD_SELECTOR)));
            }

            cards.forEach((card) => {
                if (card.querySelector(`.${BUTTON_CLASS}`)) return;

                const frontText = extractFrontText(card);
                const backText = extractBackText(card);
                if (!frontText || !backText) return;

                if (window.getComputedStyle(card).position === 'static') {
                    card.style.position = 'relative';
                }

                const button = document.createElement('button');
                button.type = 'button';
                button.className = BUTTON_CLASS;
                button.title = 'Salvar este flashcard';
                button.innerHTML = '<i class="fas fa-bookmark"></i>';
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    openSaveModal(card);
                });
                card.appendChild(button);
            });
        }

        enhanceCards(document);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) return;
                    if (node.matches && node.matches(CARD_SELECTOR)) {
                        enhanceCards(node.parentElement || document);
                    } else if (node.querySelector && node.querySelector(CARD_SELECTOR)) {
                        enhanceCards(node);
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        cancelBtn.addEventListener('click', () => toggleModal(false));
        modal.addEventListener('click', (event) => {
            if (event.target === modal) toggleModal(false);
        });
        confirmBtn.addEventListener('click', saveCard);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
