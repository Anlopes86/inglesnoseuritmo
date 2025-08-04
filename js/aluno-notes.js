// js/aluno-notes.js - VERSÃO COM OPÇÃO DE TAMANHO DE FONTE

function inicializarAnotacoes() {
    const notesCard = document.getElementById('notes-card');
    if (!notesCard || document.getElementById('lesson-tabs-container')) {
        return;
    }

    const NUMBER_OF_LESSONS = 32;
    let activeLessonId = 'lesson-1';
    let studentId = null;
    let allNotesData = {}; 

    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        notesCard.innerHTML = '<p class="text-gray-500 text-center">Você precisa estar logado para acessar suas anotações.</p>';
        return;
    }
    studentId = currentUser.uid;

    notesCard.innerHTML = `
        <div id="lesson-tabs-container" class="flex flex-wrap gap-2 border-b border-gray-200 mb-4 pb-2"></div>
        <div id="editor-wrapper">
            <div id="editor-container" style="height: 300px; border-radius: 8px;"></div>
        </div>
    `;

    const tabsContainer = document.getElementById('lesson-tabs-container');
    
    // ### ALTERAÇÃO AQUI ###
    // Adicionamos a opção 'size' à barra de ferramentas.
    const toolbarOptions = [
        [{ 'size': ['small', false, 'large', 'huge'] }], // Opções: Pequeno, Normal, Grande, Gigante
        ['bold', 'italic', 'underline'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean']
    ];

    const quill = new Quill('#editor-container', {
        modules: { toolbar: toolbarOptions }, // Usa a nova barra de ferramentas
        theme: 'snow',
        placeholder: 'Carregando anotações...'
    });

    function getStorageKey() { return `studentNotes_v_editable_${studentId}`; }

    function loadNotes() {
        const storedData = localStorage.getItem(getStorageKey());
        allNotesData = storedData ? JSON.parse(storedData) : {};
    }

    function saveNoteData() {
        if (!quill.isEnabled() || !activeLessonId) return;
        const lessonData = allNotesData[activeLessonId] || {};
        lessonData.note = quill.root.innerHTML;
        allNotesData[activeLessonId] = lessonData;
        localStorage.setItem(getStorageKey(), JSON.stringify(allNotesData));
    }

    function saveTabName(lessonId, newName) {
        const lessonData = allNotesData[lessonId] || { note: '<p><br></p>' };
        lessonData.name = newName;
        allNotesData[lessonId] = lessonData;
        localStorage.setItem(getStorageKey(), JSON.stringify(allNotesData));
    }

    function renderTabs() {
        tabsContainer.innerHTML = ''; 
        for (let i = 1; i <= NUMBER_OF_LESSONS; i++) {
            const lessonId = `lesson-${i}`;
            const lessonData = allNotesData[lessonId] || {};
            const customName = lessonData.name;
            const defaultName = `Lição ${i}`;
            
            const tab = document.createElement('div'); 
            tab.setAttribute('role', 'button');
            tab.setAttribute('tabindex', '0');

            tab.dataset.lessonId = lessonId;
            tab.className = 'lesson-tab px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 flex-shrink-0 flex items-center gap-2 cursor-pointer';
            
            tab.innerHTML = `
                <span class="tab-name">${customName || defaultName}</span>
                <i class="fas fa-pencil-alt text-xs opacity-50 hover:opacity-100 edit-icon" title="Editar nome da lição"></i>
            `;
            tabsContainer.appendChild(tab);
        }
    }

    function setActiveLesson(lessonId) {
        if (activeLessonId && activeLessonId !== lessonId) {
            saveNoteData();
        }
        activeLessonId = lessonId;
        document.querySelectorAll('.lesson-tab').forEach(tab => {
            const isSelected = tab.dataset.lessonId === lessonId;
            tab.classList.toggle('bg-purple-600', isSelected);
            tab.classList.toggle('text-white', isSelected);
            tab.classList.toggle('bg-gray-200', !isSelected);
            tab.classList.toggle('text-gray-700', !isSelected);
        });
        const lessonData = allNotesData[lessonId] || {};
        const noteContent = lessonData.note || '<p><br></p>';
        const tabName = lessonData.name || `Lição ${lessonId.split('-')[1]}`;
        quill.root.innerHTML = noteContent;
        quill.root.dataset.placeholder = `Escreva suas anotações para "${tabName}"...`;
        quill.enable();
        quill.focus();
    }

    tabsContainer.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.classList.contains('edit-icon')) {
            e.stopPropagation();
            const tabElement = target.closest('.lesson-tab');
            const tabNameSpan = tabElement.querySelector('.tab-name');
            const currentName = tabNameSpan.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentName;
            input.className = 'bg-white text-black px-1 rounded w-24';
            tabNameSpan.replaceWith(input);
            input.focus();
            input.select();

            const saveAndExit = () => {
                const newName = input.value.trim();
                if (newName && newName !== currentName) {
                    saveTabName(tabElement.dataset.lessonId, newName);
                }
                renderTabs();
                setActiveLesson(activeLessonId);
            };

            input.addEventListener('blur', saveAndExit);
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    saveAndExit();
                } else if (event.key === 'Escape') {
                    renderTabs();
                    setActiveLesson(activeLessonId);
                }
            });
        } 
        else if (target.closest('.lesson-tab') && target.tagName !== 'INPUT') {
            const tabElement = target.closest('.lesson-tab');
            setActiveLesson(tabElement.dataset.lessonId);
        }
    });

    let saveTimeout;
    quill.on('text-change', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveNoteData, 500);
    });
    
    window.addEventListener('beforeunload', saveNoteData);

    loadNotes();
    renderTabs();
    setActiveLesson(activeLessonId);
}