// js/aluno-notes.js

function inicializarAnotacoes() {
    if (typeof Quill === 'undefined') {
        console.error("A biblioteca Quill não foi carregada. As anotações não funcionarão.");
        return;
    }

    const db = firebase.firestore();
    let quill;
    let studentId;
    let studentDataCache;
    let currentLessonId = 'geral';
    let saveTimeout;

    const urlParams = new URLSearchParams(window.location.search);
    const studentIdFromUrl = urlParams.get('studentId');
    const viewingAsRole = localStorage.getItem('loggedInUserRole');
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (studentIdFromUrl && viewingAsRole === 'professor') {
        studentId = studentIdFromUrl;
    } else {
        studentId = loggedInUserId;
    }

    if (!studentId) {
        console.error("Não foi possível identificar o ID do aluno. Anotações não podem ser carregadas ou salvas.");
        return;
    }

    const docRef = db.collection('students').doc(studentId);
    const notesCard = document.getElementById('notes-card');
    
    if (!notesCard) return;

    const editorOptions = {
        theme: 'snow',
        placeholder: 'Suas anotações aqui...',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                ['clean']
            ]
        }
    };

    function loadNoteContent(lessonId) {
        currentLessonId = lessonId;
        const notes = studentDataCache?.notes || {};
        const content = notes[lessonId] || '';
        quill.setContents(content);
        document.getElementById('save-status').textContent = 'Pronto.';
    }

    async function saveCurrentNote(lessonId, quillContent) {
        const saveStatusEl = document.getElementById('save-status');
        if (saveStatusEl) saveStatusEl.textContent = 'Salvando...';

        // --- CORREÇÃO PRINCIPAL AQUI ---
        // Converte o "objeto especial" do Quill para um objeto simples (JSON) que o Firebase aceita.
        const contentToSave = JSON.parse(JSON.stringify(quillContent));

        const dataToSave = {
            notes: {
                [lessonId]: contentToSave
            }
        };

        try {
            await docRef.set(dataToSave, { merge: true });
            if (saveStatusEl) saveStatusEl.textContent = 'Salvo!';
            if (!studentDataCache.notes) studentDataCache.notes = {};
            studentDataCache.notes[lessonId] = contentToSave;
        } catch (error) {
            console.error("Erro ao salvar anotações: ", error);
            if (saveStatusEl) saveStatusEl.textContent = 'Erro ao salvar.';
        }
    }

    function renderTabs() {
        const progress = studentDataCache?.progress?.[studentDataCache.studentType] || {};
        const completedLessons = Object.keys(progress)
            .map(key => parseInt(key.replace('lesson_', '')))
            .filter(num => !isNaN(num))
            .sort((a, b) => a - b);
        
        const tabColors = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-purple-100 text-purple-800', 'bg-red-100 text-red-800'];
            
        let tabsHtml = `<div id="notes-tabs-container" class="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                            <button data-lesson-id="geral" class="note-tab active px-4 py-2 font-semibold text-sm rounded-md">Anotações Gerais</button>`;
        
        completedLessons.forEach((lessonNum, index) => {
            const lessonTitle = lessonData[studentDataCache.studentType]?.titles[lessonNum] || `Lição ${lessonNum}`;
            const colorClass = tabColors[index % tabColors.length];
            tabsHtml += `<button data-lesson-id="lesson_${lessonNum}" class="note-tab ${colorClass} px-4 py-2 font-semibold text-sm rounded-md" title="${lessonTitle}">${lessonTitle}</button>`;
        });
        
        tabsHtml += `</div>`;
        return tabsHtml;
    }

    notesCard.innerHTML = `
        <h3 class="text-2xl font-bold mb-4">Minhas Anotações</h3>
        <div id="tabs-wrapper"></div>
        <div id="editor-container" style="height: 400px; background-color: white; border: 1px solid #ccc;"></div>
        <p id="save-status" class="text-sm text-gray-500 mt-2 text-right italic"></p>
    `;
    quill = new Quill('#editor-container', editorOptions);
    
    docRef.get().then((doc) => {
        if (doc.exists) {
            studentDataCache = doc.data();
            const tabsWrapper = document.getElementById('tabs-wrapper');
            if (tabsWrapper) {
                tabsWrapper.innerHTML = renderTabs();
                const tabsContainer = document.getElementById('notes-tabs-container');
                tabsContainer.querySelectorAll('.note-tab').forEach(tab => {
                    tab.addEventListener('click', () => {
                        const newLessonId = tab.dataset.lessonId;
                        if (newLessonId === currentLessonId) return;

                        const contentToSave = quill.getContents();
                        if (contentToSave.ops.length > 1 || contentToSave.ops[0].insert.trim() !== '') {
                            saveCurrentNote(currentLessonId, contentToSave).then(() => {
                                const currentActive = tabsContainer.querySelector('.note-tab.active');
                                if (currentActive) currentActive.classList.remove('active');
                                tab.classList.add('active');
                                loadNoteContent(newLessonId);
                            });
                        } else {
                            const currentActive = tabsContainer.querySelector('.note-tab.active');
                            if (currentActive) currentActive.classList.remove('active');
                            tab.classList.add('active');
                            loadNoteContent(newLessonId);
                        }
                    });
                });
            }
            loadNoteContent('geral');
        }
    }).catch((error) => {
        console.error("Erro ao carregar dados do aluno para as anotações: ", error);
    });

    quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
            document.getElementById('save-status').textContent = 'Digitando...';
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                saveCurrentNote(currentLessonId, quill.getContents());
            }, 2000);
        }
    });

    const tabStyles = `
        .note-tab { border: 1px solid transparent; transition: all 0.2s ease-in-out; }
        .note-tab:hover { transform: translateY(-2px); filter: brightness(1.05); }
        .note-tab.active {
            border-color: var(--primary-blue, #2563eb);
            background-color: white !important;
            color: var(--primary-blue, #2563eb) !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transform: translateY(-2px);
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = tabStyles;
    document.head.appendChild(styleSheet);
}