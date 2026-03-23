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

        organizePracticeLayout();
    });
})();
