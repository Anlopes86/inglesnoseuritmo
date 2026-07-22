(function () {
    'use strict';

    const STORAGE_KEYS = {
        mode: 'flashcardsStudyMode',
        lastDeck: 'flashcardsLastDeck'
    };

    const deckCatalog = {
        AULAS_CONV: {
            label: 'Aulas de Conversação',
            shortLabel: 'Conversação',
            description: 'Expressões e linguagem das aulas temáticas.',
            type: 'conversation'
        },
        A1: {
            label: 'Módulo A1 / A2',
            shortLabel: 'A1 / A2',
            description: 'Vocabulário, expressões e verbos da base do curso.',
            type: 'vocabulary',
            file: 'js/vocabulary.js'
        },
        TRAVEL: {
            label: 'Viagem',
            shortLabel: 'Viagem',
            description: 'Comunicação prática para situações de viagem.',
            type: 'vocabulary',
            file: 'js/travel-vocabulary.js'
        },
        RESTAURANT: {
            label: 'Restaurante',
            shortLabel: 'Restaurante',
            description: 'Vocabulário para pedir, conversar e resolver situações.',
            type: 'vocabulary',
            file: 'js/restaurant-vocabulary.js'
        },
        VOC_CONV: {
            label: 'Vocabulário de conversação',
            shortLabel: 'Vocabulário',
            description: 'Expressões variadas para ganhar naturalidade.',
            type: 'vocabulary',
            file: 'js/conversation-vocabulary.js'
        },
        CUSTOM: {
            label: 'Meus Cards & Favoritos',
            shortLabel: 'Meus cards',
            description: 'Sua biblioteca pessoal, criada nas aulas e no portal.',
            type: 'custom'
        }
    };

    const state = {
        user: null,
        ownerId: null,
        deckId: null,
        mode: readStorage(STORAGE_KEYS.mode) || 'recognition',
        cards: [],
        customCards: [],
        ratings: {},
        filteredCards: [],
        queue: [],
        sessionTotal: 0,
        history: [],
        currentCard: null,
        seen: new Set(),
        sessionRatings: { hard: 0, medium: 0, easy: 0 },
        revealed: false,
        loading: false,
        editingCardId: null,
        pendingDeleteId: null,
        touchActive: false
    };

    const elements = {};

    function readStorage(key) {
        try {
            return localStorage.getItem(key);
        } catch (_) {
            return null;
        }
    }

    function writeStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (_) {
            // Persistence is helpful, but the study flow must keep working without it.
        }
    }

    function cacheElements() {
        [
            'screen-menu', 'screen-study', 'menu-back-link', 'study-close-link', 'continue-session',
            'reviewed-count', 'due-count', 'custom-count', 'library-owner-label', 'deck-grid',
            'study-deck-name', 'study-deck-meta', 'session-progress-label', 'session-progress-bar',
            'card-area', 'study-card', 'card-front-copy', 'card-back-copy', 'card-front-language',
            'card-back-language', 'card-context-front', 'card-context-back', 'card-hint',
            'difficulty-pill', 'card-save-button', 'card-edit-button', 'card-delete-button',
            'answer-panel', 'answer-input', 'answer-feedback', 'check-answer-button', 'rating-panel',
            'previous-card-button', 'next-card-button', 'search-filter', 'difficulty-filter',
            'lesson-filter', 'session-size-filter', 'session-seen', 'session-review', 'session-mastered', 'new-card-button',
            'study-status', 'restart-session-button', 'card-dialog', 'card-dialog-title',
            'card-front-input', 'card-back-input', 'card-category-input', 'card-dialog-feedback',
            'save-card-button', 'delete-dialog', 'delete-card-confirm', 'toast-region',
            'cloud-status', 'cloud-status-label'
        ].forEach((id) => {
            elements[id] = document.getElementById(id);
        });
    }

    function roleFromStorage() {
        return readStorage('loggedInUserRole') || 'aluno';
    }

    function getManagedOwnerId(user) {
        const role = roleFromStorage();
        const selectedStudentId = readStorage('selectedStudentId');
        if ((role === 'professor' || role === 'admin') && selectedStudentId) {
            return selectedStudentId;
        }
        return user?.uid || null;
    }

    function normalizeForSearch(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function isTouchFirstDevice() {
        return state.touchActive
            || navigator.maxTouchPoints > 0
            || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    }

    function hapticFeedback(duration = 10) {
        if (typeof navigator.vibrate === 'function') navigator.vibrate(duration);
    }

    function normalizeAnswer(value) {
        return normalizeForSearch(value)
            .replace(/[.,/#!$%^&*;:{}=_`~()?"'\-]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function hashText(value) {
        let hash = 2166136261;
        const text = String(value || '');
        for (let index = 0; index < text.length; index += 1) {
            hash ^= text.charCodeAt(index);
            hash = Math.imul(hash, 16777619);
        }
        return (hash >>> 0).toString(36);
    }

    function legacyCardKey(card) {
        if (!card || card.id) return card?.id || '';
        try {
            return btoa(unescape(encodeURIComponent(`${card.l}::${card.f}`)))
                .replace(/=/g, '')
                .substring(0, 40);
        } catch (_) {
            return '';
        }
    }

    function getCardKey(card) {
        if (!card) return '';
        if (card.id) return card.id;
        return `fc_${hashText(`${card.module || state.deckId}|${card.l}|${card.f}|${card.b}`)}`;
    }

    function getCardFingerprint(card) {
        return hashText(`${normalizeForSearch(card?.f)}|${normalizeForSearch(card?.b)}`);
    }

    function normalizeCard(card, fallback = {}) {
        const normalized = {
            ...fallback,
            ...card,
            f: String(card?.f || '').trim(),
            b: String(card?.b || '').trim(),
            l: String(card?.l || fallback.l || 'Geral').trim()
        };
        normalized.key = getCardKey(normalized);
        normalized.legacyKey = legacyCardKey(normalized);
        normalized.fingerprint = card?.fingerprint || getCardFingerprint(normalized);
        return normalized;
    }

    function getRating(card) {
        if (!card) return null;
        return state.ratings[card.key] || (card.legacyKey ? state.ratings[card.legacyKey] : null) || null;
    }

    function normalizeRating(data) {
        const safeData = data || {};
        return {
            level: ['hard', 'medium', 'easy'].includes(safeData.level) ? safeData.level : null,
            reviewCount: Number(safeData.reviewCount) || 0,
            lastReviewedAt: toDate(safeData.lastReviewedAt),
            nextReviewAt: toDate(safeData.nextReviewAt)
        };
    }

    function toDate(value) {
        if (!value) return null;
        if (value instanceof Date) return value;
        if (typeof value.toDate === 'function') return value.toDate();
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    function isDue(rating) {
        if (!rating?.level) return false;
        if (rating.level === 'hard') return true;
        if (!rating.nextReviewAt) return false;
        return rating.nextReviewAt.getTime() <= Date.now();
    }

    function shuffle(items) {
        const result = [...items];
        for (let index = result.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
        }
        return result;
    }

    function buildSmartQueue(cards) {
        const buckets = { due: [], new: [], hard: [], medium: [], easy: [] };
        cards.forEach((card) => {
            const rating = getRating(card);
            if (isDue(rating)) buckets.due.push(card);
            else if (!rating?.level) buckets.new.push(card);
            else buckets[rating.level].push(card);
        });
        return [
            ...shuffle(buckets.due),
            ...shuffle(buckets.new),
            ...shuffle(buckets.hard),
            ...shuffle(buckets.medium),
            ...shuffle(buckets.easy)
        ];
    }

    function notify(message, tone = 'default') {
        if (!elements['toast-region']) return;
        const toast = document.createElement('div');
        toast.className = `flash-toast${tone === 'error' ? ' is-error' : tone === 'success' ? ' is-success' : ''}`;
        toast.setAttribute('role', tone === 'error' ? 'alert' : 'status');
        toast.textContent = message;
        elements['toast-region'].appendChild(toast);
        window.setTimeout(() => toast.remove(), 3600);
    }

    function setStudyStatus(title, copy, icon = 'fa-circle-info') {
        elements['study-status'].classList.remove('is-hidden');
        elements['card-area'].classList.add('is-hidden');
        elements['restart-session-button'].classList.add('is-hidden');
        elements['study-status'].innerHTML = '';

        const iconElement = document.createElement('i');
        iconElement.className = `fas ${icon}`;
        const titleElement = document.createElement('strong');
        titleElement.textContent = title;
        const copyElement = document.createElement('p');
        copyElement.textContent = copy;
        elements['study-status'].append(iconElement, titleElement, copyElement);
    }

    function clearStudyStatus() {
        elements['study-status'].classList.add('is-hidden');
        elements['card-area'].classList.remove('is-hidden');
        elements['restart-session-button'].classList.add('is-hidden');
    }

    function syncModeControls() {
        document.querySelectorAll('[data-study-mode]').forEach((button) => {
            const isActive = button.dataset.studyMode === state.mode;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function setMode(mode, options = {}) {
        if (!['recognition', 'production'].includes(mode)) return;
        state.mode = mode;
        writeStorage(STORAGE_KEYS.mode, mode);
        syncModeControls();
        if (options.restart !== false && state.deckId && state.cards.length) {
            resetSession();
        }
    }

    function updateReturnLinks() {
        const role = roleFromStorage();
        const href = role === 'professor' || role === 'admin' ? 'index.html' : 'home-aluno.html';
        const label = role === 'professor' || role === 'admin' ? 'Voltar ao painel' : 'Voltar ao portal';
        [elements['menu-back-link'], elements['study-close-link']].forEach((link) => {
            if (!link) return;
            link.href = href;
            link.setAttribute('aria-label', label);
            link.title = label;
        });
        const labelElement = elements['menu-back-link']?.querySelector('.back-link-label');
        if (labelElement) labelElement.textContent = label;
    }

    async function loadOwnerLabel() {
        if (!state.ownerId || !state.user || state.ownerId === state.user.uid) {
            elements['library-owner-label'].textContent = 'Sua biblioteca pessoal';
            return;
        }
        try {
            const snapshot = await db.collection('students').doc(state.ownerId).get();
            const name = snapshot.exists ? snapshot.data()?.name : '';
            elements['library-owner-label'].textContent = name
                ? `Biblioteca de ${name}`
                : 'Biblioteca do aluno selecionado';
        } catch (_) {
            elements['library-owner-label'].textContent = 'Biblioteca do aluno selecionado';
        }
    }

    function userCollection(name) {
        return db.collection('users').doc(state.ownerId).collection(name);
    }

    async function loadCloudOverview() {
        if (!state.ownerId) return;
        const [ratingsResult, cardsResult] = await Promise.allSettled([
            userCollection('ratings').get(),
            userCollection('myCards').get()
        ]);

        state.ratings = {};
        if (ratingsResult.status === 'fulfilled') {
            ratingsResult.value.forEach((documentSnapshot) => {
                state.ratings[documentSnapshot.id] = normalizeRating(documentSnapshot.data());
            });
        } else {
            console.error('Falha ao carregar avaliações dos flashcards:', ratingsResult.reason);
            notify('A revisão abriu, mas a sincronização das dificuldades está indisponível.', 'error');
        }

        state.customCards = [];
        if (cardsResult.status === 'fulfilled') {
            state.customCards = cardsResult.value.docs
                .map((documentSnapshot) => normalizeCard({ id: documentSnapshot.id, ...documentSnapshot.data() }, { module: 'CUSTOM' }))
                .sort((first, second) => {
                    const firstDate = toDate(first.updatedAt || first.createdAt)?.getTime() || 0;
                    const secondDate = toDate(second.updatedAt || second.createdAt)?.getTime() || 0;
                    return secondDate - firstDate;
                });
        } else {
            console.error('Falha ao carregar cards pessoais:', cardsResult.reason);
            notify('Não foi possível sincronizar seus cards pessoais agora.', 'error');
        }

        const cloudReady = ratingsResult.status === 'fulfilled' && cardsResult.status === 'fulfilled';
        elements['cloud-status-label'].textContent = cloudReady ? 'Sincronizado' : 'Sincronização parcial';
        const cloudIcon = elements['cloud-status'].querySelector('i');
        if (cloudIcon) cloudIcon.className = `fas ${cloudReady ? 'fa-cloud' : 'fa-triangle-exclamation'}`;
        renderOverviewStats();
    }

    function renderOverviewStats() {
        const ratingList = Object.values(state.ratings);
        const reviewed = ratingList.filter((rating) => rating.level).length;
        const due = ratingList.filter((rating) => isDue(rating)).length;
        elements['reviewed-count'].textContent = String(reviewed);
        elements['due-count'].textContent = String(due);
        elements['custom-count'].textContent = String(state.customCards.length);

        const customMeta = document.querySelector('[data-custom-count]');
        if (customMeta) {
            customMeta.textContent = `${state.customCards.length} ${state.customCards.length === 1 ? 'card salvo' : 'cards salvos'}`;
        }

        const lastDeck = readStorage(STORAGE_KEYS.lastDeck);
        const canContinue = Boolean(lastDeck && deckCatalog[lastDeck]);
        elements['continue-session'].classList.toggle('is-hidden', !canContinue);
        if (canContinue) {
            const copy = elements['continue-session'].querySelector('[data-continue-label]');
            if (copy) copy.textContent = `Continuar em ${deckCatalog[lastDeck].shortLabel}`;
            elements['continue-session'].dataset.deck = lastDeck;
        }
    }

    async function parseVocabularyFile(filePath) {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Falha ao carregar ${filePath}`);
        const source = await response.text();
        const firstBrace = source.indexOf('{');
        const lastBrace = source.lastIndexOf('}');
        if (firstBrace < 0 || lastBrace <= firstBrace) throw new Error(`Formato inválido em ${filePath}`);
        return new Function(`"use strict"; return (${source.slice(firstBrace, lastBrace + 1)});`)();
    }

    function vocabularyDataToCards(data, deckId) {
        const cards = [];
        const duplicateKeys = new Set();

        function addItem(item, category, kind) {
            if (!item?.english || !item?.portuguese) return;
            const fingerprint = `${normalizeForSearch(item.english)}|${normalizeForSearch(item.portuguese)}|${category}`;
            if (duplicateKeys.has(fingerprint)) return;
            duplicateKeys.add(fingerprint);
            cards.push(normalizeCard({
                f: item.english,
                b: item.portuguese,
                l: category,
                module: deckId,
                source: kind
            }));
        }

        Object.entries(data || {}).forEach(([groupId, group]) => {
            const numericGroup = /^\d+$/.test(String(groupId));
            const category = numericGroup
                ? `Lição ${String(groupId).padStart(2, '0')}`
                : String(groupId).replace(/_/g, ' ');

            (group?.words || []).forEach((item) => addItem(item, category, 'word'));
            (group?.expressions || []).forEach((item) => addItem(item, category, 'expression'));
            Object.values(group?.verbs || {}).forEach((verbList) => {
                if (Array.isArray(verbList)) verbList.forEach((item) => addItem(item, category, 'verb'));
            });
        });
        return cards;
    }

    function extractCardFromElement(cardElement, lessonNumber) {
        const frontElement = cardElement.querySelector('.flashcard-front, .flip-card-front, .b1-vocab-front');
        const backElement = cardElement.querySelector('.flashcard-back, .flip-card-back, .b1-vocab-back');
        const front = cardElement.dataset.cardFront
            || frontElement?.querySelector('h1, h2, h3, h4, h5, h6, strong')?.textContent
            || frontElement?.textContent;
        const back = cardElement.dataset.cardBack
            || backElement?.querySelector('p')?.textContent
            || backElement?.textContent;
        if (!front?.trim() || !back?.trim()) return null;
        return normalizeCard({
            f: front.replace(/\s+/g, ' ').trim(),
            b: back.replace(/\s+/g, ' ').trim(),
            l: `Lição ${String(lessonNumber).padStart(2, '0')}`,
            module: 'AULAS_CONV',
            lesson: lessonNumber,
            source: 'conversation-lesson'
        });
    }

    async function loadConversationCards() {
        const lessonNumbers = Array.from({ length: 64 }, (_, index) => index + 1);
        const results = await Promise.all(lessonNumbers.map(async (lessonNumber) => {
            const padded = String(lessonNumber).padStart(2, '0');
            try {
                const response = await fetch(`conversation/licao-${padded}.html`);
                if (!response.ok) return [];
                const html = await response.text();
                const lessonDocument = new DOMParser().parseFromString(html, 'text/html');
                const candidates = lessonDocument.querySelectorAll('.flashcard, .flip-card, .b1-vocab-card, [data-save-card]');
                return Array.from(candidates)
                    .map((element) => extractCardFromElement(element, lessonNumber))
                    .filter(Boolean);
            } catch (error) {
                console.warn(`Flashcards da lição ${padded} indisponíveis:`, error);
                return [];
            }
        }));

        const cards = results.flat();
        const unique = new Map();
        cards.forEach((card) => unique.set(`${card.l}|${card.fingerprint}`, card));
        return [...unique.values()];
    }

    async function loadDeckCards(deckId) {
        const deck = deckCatalog[deckId];
        if (!deck) throw new Error('Deck inexistente.');
        if (deck.type === 'custom') return [...state.customCards];
        if (deck.type === 'conversation') return loadConversationCards();
        const data = await parseVocabularyFile(deck.file);
        return vocabularyDataToCards(data, deckId);
    }

    function showStudyScreen() {
        elements['screen-menu'].classList.add('is-hidden');
        elements['screen-study'].classList.remove('is-hidden');
        document.body.dataset.screen = 'study';
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    function showMenuScreen() {
        if (state.loading) return;
        window.speechSynthesis?.cancel();
        elements['screen-study'].classList.add('is-hidden');
        elements['screen-menu'].classList.remove('is-hidden');
        document.body.dataset.screen = 'menu';
        renderOverviewStats();
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    async function startDeck(deckId) {
        if (!state.user) {
            window.location.href = 'login.html';
            return;
        }
        if (state.loading || !deckCatalog[deckId]) return;

        state.loading = true;
        state.deckId = deckId;
        writeStorage(STORAGE_KEYS.lastDeck, deckId);
        showStudyScreen();
        elements['study-deck-name'].textContent = deckCatalog[deckId].label;
        elements['study-deck-meta'].textContent = 'Preparando sua sessão inteligente…';
        elements['new-card-button'].classList.toggle('is-hidden', deckId !== 'CUSTOM');
        setStudyStatus('Preparando seus cards', 'Organizando uma fila sem repetições e priorizando o que merece revisão.', 'fa-spinner fa-spin');

        try {
            state.cards = (await loadDeckCards(deckId)).map((card) => normalizeCard(card, { module: deckId }));
            populateLessonFilter();
            elements['search-filter'].value = '';
            elements['difficulty-filter'].value = 'all';
            applyFilters();
            elements['study-deck-meta'].textContent = `${state.cards.length} cards disponíveis`;
        } catch (error) {
            console.error(`Erro ao abrir o deck ${deckId}:`, error);
            state.cards = [];
            state.filteredCards = [];
            setStudyStatus('Não foi possível abrir este deck', 'Tente novamente. Se o problema continuar, volte ao portal e reabra os flashcards.', 'fa-triangle-exclamation');
            notify('Falha ao carregar o deck.', 'error');
        } finally {
            state.loading = false;
        }
    }

    function populateLessonFilter() {
        const select = elements['lesson-filter'];
        const categories = [...new Set(state.cards.map((card) => card.l).filter(Boolean))]
            .sort((first, second) => first.localeCompare(second, 'pt-BR', { numeric: true }));
        select.innerHTML = '<option value="all">Todas as lições</option>';
        categories.forEach((category) => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
    }

    function applyFilters() {
        const query = normalizeForSearch(elements['search-filter'].value);
        const difficulty = elements['difficulty-filter'].value;
        const lesson = elements['lesson-filter'].value;

        state.filteredCards = state.cards.filter((card) => {
            const rating = getRating(card);
            const matchesSearch = !query || normalizeForSearch(`${card.f} ${card.b} ${card.l}`).includes(query);
            const matchesLesson = lesson === 'all' || card.l === lesson;
            const matchesDifficulty = difficulty === 'all'
                || (difficulty === 'new' && !rating?.level)
                || rating?.level === difficulty;
            return matchesSearch && matchesLesson && matchesDifficulty;
        });
        resetSession();
    }

    function resetSession() {
        const smartQueue = buildSmartQueue(state.filteredCards);
        const requestedSize = elements['session-size-filter'].value;
        const sessionLimit = requestedSize === 'all' ? smartQueue.length : Number(requestedSize) || 10;
        state.queue = smartQueue.slice(0, sessionLimit);
        state.sessionTotal = state.queue.length;
        state.history = [];
        state.currentCard = null;
        state.seen = new Set();
        state.sessionRatings = { hard: 0, medium: 0, easy: 0 };
        state.revealed = false;
        updateSessionStats();
        showNextCard({ preserveHistory: false });
    }

    function showNextCard(options = {}) {
        if (state.currentCard && options.preserveHistory !== false) {
            state.history.push(state.currentCard);
        }

        if (!state.queue.length) {
            state.currentCard = null;
            renderSessionComplete();
            return;
        }

        state.currentCard = state.queue.shift();
        state.seen.add(state.currentCard.key);
        state.revealed = false;
        renderCurrentCard();
        updateSessionStats();
    }

    function showPreviousCard() {
        if (!state.history.length) return;
        if (state.currentCard) state.queue.unshift(state.currentCard);
        state.currentCard = state.history.pop();
        state.revealed = false;
        renderCurrentCard();
        updateSessionStats();
    }

    function renderSessionComplete() {
        const total = state.sessionTotal;
        if (!total) {
            setStudyStatus('Nenhum card encontrado', 'Ajuste a busca, a lição ou a dificuldade para montar uma nova sessão.', 'fa-filter-circle-xmark');
            elements['restart-session-button'].classList.add('is-hidden');
        } else {
            setStudyStatus('Sessão concluída', `Você passou por ${total} ${total === 1 ? 'card' : 'cards'} sem repetições. Reinicie para praticar novamente.`, 'fa-trophy');
            elements['restart-session-button'].classList.remove('is-hidden');
        }
        updateSessionStats();
    }

    function difficultyMeta(rating) {
        if (!rating?.level) return { label: 'Novo', className: 'new' };
        if (rating.level === 'hard') return { label: 'Revisar', className: 'hard' };
        if (rating.level === 'medium') return { label: 'Em progresso', className: 'medium' };
        return { label: 'Dominado', className: 'easy' };
    }

    function renderCurrentCard() {
        const card = state.currentCard;
        if (!card) return;
        clearStudyStatus();

        const isProduction = state.mode === 'production';
        const rating = getRating(card);
        const meta = difficultyMeta(rating);
        elements['study-card'].classList.remove('is-flipped');
        elements['study-card'].dataset.difficulty = meta.className;
        elements['study-card'].setAttribute('aria-label', isProduction
            ? 'Card de produção. Digite a resposta em inglês.'
            : 'Flashcard. Pressione Enter ou espaço para revelar a resposta.');
        elements['card-front-copy'].textContent = isProduction ? card.b : card.f;
        elements['card-back-copy'].textContent = isProduction ? card.f : card.b;
        elements['card-front-language'].textContent = isProduction ? 'Português · produza em inglês' : 'Inglês';
        elements['card-back-language'].textContent = isProduction ? 'Resposta em inglês' : 'Português';
        elements['card-context-front'].textContent = card.l;
        elements['card-context-back'].textContent = card.l;
        elements['card-hint'].textContent = isProduction
            ? 'Digite sua resposta abaixo'
            : isTouchFirstDevice()
                ? 'Toque para revelar · deslize para navegar'
                : 'Clique ou pressione espaço para revelar';
        elements['difficulty-pill'].textContent = meta.label;
        elements['rating-panel'].classList.add('is-hidden');
        elements['answer-panel'].classList.toggle('is-hidden', !isProduction);
        elements['answer-input'].value = '';
        elements['answer-feedback'].textContent = '';
        elements['answer-feedback'].className = 'answer-feedback';
        elements['check-answer-button'].disabled = false;
        elements['check-answer-button'].textContent = 'Conferir';
        elements['previous-card-button'].disabled = state.history.length === 0;
        elements['previous-card-button'].classList.toggle('is-hidden', state.history.length === 0);
        elements['next-card-button'].innerHTML = 'Próximo <i class="fas fa-arrow-right"></i>';

        const isCustom = state.deckId === 'CUSTOM';
        elements['card-save-button'].classList.toggle('is-hidden', isCustom);
        elements['card-edit-button'].classList.toggle('is-hidden', !isCustom);
        elements['card-delete-button'].classList.toggle('is-hidden', !isCustom);
        elements['card-save-button'].classList.toggle('is-saved', isCardSaved(card));
        elements['card-save-button'].title = isCardSaved(card) ? 'Card já salvo' : 'Salvar nos meus cards';

        if (isProduction) window.setTimeout(() => elements['answer-input'].focus(), 80);
    }

    function updateSessionStats() {
        const total = state.sessionTotal;
        const seen = Math.min(state.seen.size, total);
        const percentage = total ? Math.round((seen / total) * 100) : 0;
        elements['session-progress-label'].textContent = `${seen}/${total}`;
        elements['session-progress-bar'].style.width = `${percentage}%`;
        elements['session-seen'].textContent = String(seen);
        elements['session-review'].textContent = String(state.sessionRatings.hard);
        elements['session-mastered'].textContent = String(state.sessionRatings.easy);
    }

    function revealCard() {
        if (!state.currentCard || state.revealed) return;
        state.revealed = true;
        elements['study-card'].classList.add('is-flipped');
        elements['rating-panel'].classList.remove('is-hidden');
        elements['card-hint'].textContent = 'Avalie sua confiança para organizar a próxima revisão';
    }

    function toggleCard() {
        if (state.mode === 'production' || !state.currentCard) return;
        if (!state.revealed) revealCard();
        else {
            state.revealed = false;
            elements['study-card'].classList.remove('is-flipped');
            elements['rating-panel'].classList.add('is-hidden');
            elements['card-hint'].textContent = isTouchFirstDevice()
                ? 'Toque para revelar · deslize para navegar'
                : 'Clique ou pressione espaço para revelar';
        }
    }

    function checkAnswer() {
        if (!state.currentCard || state.mode !== 'production') return;
        const answer = normalizeAnswer(elements['answer-input'].value);
        const expected = normalizeAnswer(state.currentCard.f);
        if (!answer) {
            elements['answer-feedback'].textContent = 'Digite uma resposta antes de conferir.';
            elements['answer-feedback'].className = 'answer-feedback is-close';
            return;
        }

        const isCorrect = answer === expected;
        if (isCorrect) hapticFeedback(12);
        elements['answer-feedback'].textContent = isCorrect
            ? 'Perfeito — sua produção corresponde ao card.'
            : `Compare com a resposta: ${state.currentCard.f}`;
        elements['answer-feedback'].className = `answer-feedback ${isCorrect ? 'is-correct' : 'is-close'}`;
        elements['check-answer-button'].disabled = true;
        elements['check-answer-button'].textContent = isCorrect ? 'Correto' : 'Resposta exibida';
        revealCard();
    }

    function speakCurrentCard() {
        if (!state.currentCard || !('speechSynthesis' in window)) {
            notify('A pronúncia não está disponível neste navegador.', 'error');
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(state.currentCard.f);
        utterance.lang = 'en-US';
        utterance.rate = 0.88;
        window.speechSynthesis.speak(utterance);
    }

    function nextReviewDate(level) {
        const intervals = { hard: 0, medium: 3, easy: 7 };
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + intervals[level]);
        if (level === 'hard') nextDate.setHours(nextDate.getHours() + 8);
        return nextDate;
    }

    async function rateCurrentCard(level) {
        if (!state.currentCard || !['hard', 'medium', 'easy'].includes(level)) return;
        const card = state.currentCard;
        const existing = getRating(card) || { reviewCount: 0 };
        const rating = {
            level,
            reviewCount: existing.reviewCount + 1,
            lastReviewedAt: new Date(),
            nextReviewAt: nextReviewDate(level)
        };
        state.ratings[card.key] = rating;
        state.sessionRatings[level] += 1;
        hapticFeedback(level === 'easy' ? 16 : 9);
        updateSessionStats();

        try {
            await userCollection('ratings').doc(card.key).set({
                level,
                reviewCount: rating.reviewCount,
                lastReviewedAt: firebase.firestore.FieldValue.serverTimestamp(),
                nextReviewAt: rating.nextReviewAt,
                module: card.module || state.deckId,
                lesson: card.lesson || card.l || null,
                cardFingerprint: card.fingerprint
            }, { merge: true });
        } catch (error) {
            console.error('Falha ao salvar dificuldade:', error);
            notify('A avaliação ficou nesta sessão, mas não sincronizou com a nuvem.', 'error');
        }
        showNextCard();
    }

    function isCardSaved(card) {
        const fingerprint = card?.fingerprint || getCardFingerprint(card);
        return state.customCards.some((savedCard) => savedCard.fingerprint === fingerprint
            || getCardFingerprint(savedCard) === fingerprint);
    }

    function serverTimestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    function openCardDialog(card = null, options = {}) {
        state.editingCardId = card?.id || null;
        elements['card-dialog-title'].textContent = state.editingCardId
            ? 'Editar card'
            : options.favorite ? 'Salvar nos meus cards' : 'Criar novo card';
        elements['card-front-input'].value = card?.f || '';
        elements['card-back-input'].value = card?.b || '';
        elements['card-category-input'].value = card?.l || options.category || 'Geral';
        elements['card-dialog-feedback'].textContent = '';
        elements['card-dialog-feedback'].classList.add('is-hidden');
        elements['card-dialog'].dataset.favorite = options.favorite ? 'true' : 'false';
        elements['card-dialog'].showModal();
        window.setTimeout(() => elements['card-front-input'].focus(), 50);
    }

    function closeCardDialog() {
        if (elements['card-dialog'].open) elements['card-dialog'].close();
        state.editingCardId = null;
    }

    function setDialogFeedback(message) {
        elements['card-dialog-feedback'].textContent = message;
        elements['card-dialog-feedback'].classList.remove('is-hidden');
    }

    async function saveCardFromDialog() {
        const front = elements['card-front-input'].value.trim();
        const back = elements['card-back-input'].value.trim();
        const category = elements['card-category-input'].value.trim() || 'Geral';
        if (!front || !back) {
            setDialogFeedback('Preencha a frente e o verso do card.');
            return;
        }

        const fingerprint = getCardFingerprint({ f: front, b: back });
        const existingByFingerprint = state.customCards.find((card) => card.fingerprint === fingerprint);
        const documentId = state.editingCardId || existingByFingerprint?.id || `card_${fingerprint}`;
        const wasEditing = Boolean(state.editingCardId);
        const isExisting = Boolean(state.customCards.some((card) => card.id === documentId));
        const payload = {
            f: front,
            b: back,
            l: category,
            fingerprint,
            source: elements['card-dialog'].dataset.favorite === 'true' ? 'favorite' : 'custom',
            updatedAt: serverTimestamp()
        };
        if (!isExisting) payload.createdAt = serverTimestamp();

        elements['save-card-button'].disabled = true;
        elements['save-card-button'].textContent = 'Salvando…';
        try {
            await userCollection('myCards').doc(documentId).set(payload, { merge: true });
            closeCardDialog();
            await reloadCustomCards();
            notify(existingByFingerprint && !wasEditing ? 'Este card já estava salvo.' : 'Card salvo na biblioteca.', 'success');
            if (state.deckId === 'CUSTOM') {
                state.cards = [...state.customCards];
                populateLessonFilter();
                applyFilters();
            } else if (state.currentCard) {
                renderCurrentCard();
            }
        } catch (error) {
            console.error('Falha ao salvar card:', error);
            setDialogFeedback('Não foi possível salvar agora. Tente novamente.');
        } finally {
            elements['save-card-button'].disabled = false;
            elements['save-card-button'].textContent = 'Salvar card';
        }
    }

    async function reloadCustomCards() {
        const snapshot = await userCollection('myCards').get();
        state.customCards = snapshot.docs.map((documentSnapshot) => normalizeCard({
            id: documentSnapshot.id,
            ...documentSnapshot.data()
        }, { module: 'CUSTOM' }));
        renderOverviewStats();
    }

    function saveCurrentCard() {
        if (!state.currentCard) return;
        if (isCardSaved(state.currentCard)) {
            notify('Este card já está na sua biblioteca.');
            return;
        }
        const deckName = deckCatalog[state.deckId]?.shortLabel || 'Favoritos';
        openCardDialog(state.currentCard, { favorite: true, category: `Favoritos · ${deckName}` });
        elements['card-category-input'].value = `Favoritos · ${deckName}`;
    }

    function editCurrentCard() {
        if (state.deckId !== 'CUSTOM' || !state.currentCard) return;
        openCardDialog(state.currentCard);
    }

    function requestDeleteCurrentCard() {
        if (state.deckId !== 'CUSTOM' || !state.currentCard) return;
        state.pendingDeleteId = state.currentCard.id;
        elements['delete-dialog'].showModal();
    }

    async function confirmDeleteCard() {
        if (!state.pendingDeleteId) return;
        const documentId = state.pendingDeleteId;
        elements['delete-card-confirm'].disabled = true;
        try {
            await userCollection('myCards').doc(documentId).delete();
            state.customCards = state.customCards.filter((card) => card.id !== documentId);
            state.cards = state.cards.filter((card) => card.id !== documentId);
            elements['delete-dialog'].close();
            state.pendingDeleteId = null;
            populateLessonFilter();
            applyFilters();
            renderOverviewStats();
            notify('Card removido da biblioteca.', 'success');
        } catch (error) {
            console.error('Falha ao excluir card:', error);
            notify('Não foi possível excluir o card.', 'error');
        } finally {
            elements['delete-card-confirm'].disabled = false;
        }
    }

    function handleKeyboard(event) {
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        const isTyping = ['input', 'textarea', 'select'].includes(activeTag);
        if (isTyping || elements['card-dialog']?.open || elements['delete-dialog']?.open) return;
        if (elements['screen-study'].classList.contains('is-hidden')) return;

        if (event.key === ' ' || event.key === 'Enter') {
            if (state.mode === 'recognition') {
                event.preventDefault();
                toggleCard();
            }
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            showNextCard();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showPreviousCard();
        } else if (state.revealed && ['1', '2', '3'].includes(event.key)) {
            const level = { '1': 'hard', '2': 'medium', '3': 'easy' }[event.key];
            rateCurrentCard(level);
        }
    }

    function bindEvents() {
        let touchStart = null;
        let suppressCardTap = false;

        document.querySelectorAll('[data-study-mode]').forEach((button) => {
            button.addEventListener('click', () => setMode(button.dataset.studyMode));
        });

        document.querySelectorAll('[data-deck]').forEach((button) => {
            button.addEventListener('click', () => startDeck(button.dataset.deck));
        });

        document.getElementById('back-to-decks').addEventListener('click', showMenuScreen);
        elements['study-card'].addEventListener('click', (event) => {
            if (event.target.closest('button')) return;
            if (suppressCardTap) {
                suppressCardTap = false;
                return;
            }
            toggleCard();
        });
        elements['study-card'].addEventListener('touchstart', (event) => {
            if (event.target.closest('button') || event.touches.length !== 1) return;
            state.touchActive = true;
            touchStart = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }, { passive: true });
        elements['study-card'].addEventListener('touchend', (event) => {
            if (!touchStart || event.changedTouches.length !== 1) {
                touchStart = null;
                return;
            }
            const deltaX = event.changedTouches[0].clientX - touchStart.x;
            const deltaY = event.changedTouches[0].clientY - touchStart.y;
            touchStart = null;
            if (Math.abs(deltaX) < 58 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

            if (deltaX < 0 && state.currentCard) {
                suppressCardTap = true;
                hapticFeedback(7);
                showNextCard();
            } else if (deltaX > 0 && state.history.length) {
                suppressCardTap = true;
                hapticFeedback(7);
                showPreviousCard();
            }
        }, { passive: true });
        elements['study-card'].addEventListener('keydown', (event) => {
            if ((event.key === 'Enter' || event.key === ' ') && state.mode === 'recognition') {
                event.preventDefault();
                toggleCard();
            }
        });

        document.querySelectorAll('[data-card-action]').forEach((button) => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const action = button.dataset.cardAction;
                if (action === 'speak') speakCurrentCard();
                if (action === 'save') saveCurrentCard();
                if (action === 'edit') editCurrentCard();
                if (action === 'delete') requestDeleteCurrentCard();
            });
        });

        document.querySelectorAll('[data-rating]').forEach((button) => {
            button.addEventListener('click', () => rateCurrentCard(button.dataset.rating));
        });

        elements['previous-card-button'].addEventListener('click', showPreviousCard);
        elements['next-card-button'].addEventListener('click', () => showNextCard());
        elements['restart-session-button'].addEventListener('click', resetSession);
        elements['check-answer-button'].addEventListener('click', checkAnswer);
        elements['answer-input'].addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                checkAnswer();
            }
        });

        let searchTimer = null;
        elements['search-filter'].addEventListener('input', () => {
            window.clearTimeout(searchTimer);
            searchTimer = window.setTimeout(applyFilters, 180);
        });
        elements['difficulty-filter'].addEventListener('change', applyFilters);
        elements['lesson-filter'].addEventListener('change', applyFilters);
        elements['session-size-filter'].addEventListener('change', resetSession);
        elements['new-card-button'].addEventListener('click', () => openCardDialog());

        document.querySelectorAll('[data-dialog-close]').forEach((button) => {
            button.addEventListener('click', () => {
                const dialog = button.closest('dialog');
                dialog?.close();
            });
        });
        elements['save-card-button'].addEventListener('click', saveCardFromDialog);
        elements['delete-card-confirm'].addEventListener('click', confirmDeleteCard);
        elements['card-dialog'].addEventListener('close', () => {
            state.editingCardId = null;
            elements['card-dialog'].dataset.favorite = 'false';
        });
        elements['delete-dialog'].addEventListener('close', () => {
            state.pendingDeleteId = null;
        });
        document.addEventListener('keydown', handleKeyboard);
    }

    function initializeResponsiveTools() {
        const media = window.matchMedia('(max-width: 960px)');
        const tools = document.getElementById('study-tools');
        const sync = (event) => {
            if (tools) tools.open = !event.matches;
        };
        sync(media);
        if (typeof media.addEventListener === 'function') media.addEventListener('change', sync);
        else if (typeof media.addListener === 'function') media.addListener(sync);
    }

    function initializeAuth() {
        if (typeof firebase === 'undefined' || typeof db === 'undefined') {
            notify('Não foi possível iniciar a sincronização dos flashcards.', 'error');
            return;
        }

        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                window.location.href = 'login.html';
                return;
            }
            state.user = user;
            state.ownerId = getManagedOwnerId(user);
            updateReturnLinks();
            await Promise.all([loadCloudOverview(), loadOwnerLabel()]);
        });
    }

    function init() {
        cacheElements();
        syncModeControls();
        bindEvents();
        initializeResponsiveTools();
        updateReturnLinks();
        initializeAuth();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
