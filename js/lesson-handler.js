// js/lesson-handler.js (CÓDIGO ORIGINAL RESTAURADO)

document.addEventListener('DOMContentLoaded', () => {
    // This script assumes that a 'module' object is defined in another script
    // loaded before this one, e.g., a1-module.js or conversation-module.js

    if (typeof module === 'undefined') {
        // console.error("O objeto 'module' não foi definido antes de lesson-handler.js");
        return;
    }

    const lessonList = document.getElementById('lesson-list');
    const contentArea = document.getElementById('content-area');
    const lessonTitle = document.getElementById('lesson-title');
    const lessonSubtitle = document.getElementById('lesson-subtitle');
    const loadingOverlay = document.getElementById('loading-overlay');
    const nextLessonBtn = document.getElementById('next-lesson-btn');
    const prevLessonBtn = document.getElementById('prev-lesson-btn');
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');

    let currentLessonIndex = -1;

    function showLoading() {
        if (loadingOverlay) loadingOverlay.style.display = 'flex';
    }

    function hideLoading() {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }

    function updateNavButtons() {
        prevLessonBtn.disabled = currentLessonIndex <= 0;
        nextLessonBtn.disabled = currentLessonIndex >= module.lessons.length - 1;
    }

    async function loadLesson(lessonId) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (!lesson) {
            console.error('Lição não encontrada:', lessonId);
            contentArea.innerHTML = `<div class="text-center text-red-500">Erro: Lição não encontrada.</div>`;
            return;
        }

        currentLessonIndex = module.lessons.findIndex(l => l.id === lessonId);
        showLoading();

        try {
            const response = await fetch(lesson.url);
            if (!response.ok) {
                // If the lesson doesn't exist, show a "coming soon" message
                if (response.status === 404) {
                     contentArea.innerHTML = `
                        <div class="text-center p-8">
                            <i class="fas fa-hourglass-half fa-4x text-gray-300 mb-4"></i>
                            <h2 class="text-2xl font-semibold text-gray-600">Em Breve</h2>
                            <p class="text-gray-400">O conteúdo para esta lição está sendo preparado.</p>
                        </div>
                    `;
                    lessonTitle.textContent = lesson.title;
                    lessonSubtitle.textContent = `Lição ${currentLessonIndex + 1} de ${module.lessons.length}`;
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                const lessonContent = await response.text();
                contentArea.innerHTML = lessonContent;
                lessonTitle.textContent = lesson.title;
                lessonSubtitle.textContent = `Lição ${currentLessonIndex + 1} de ${module.lessons.length}`;
            }
            
            document.querySelectorAll('#lesson-list li a').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`#lesson-list li a[data-lesson-id="${lessonId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
            
            localStorage.setItem(`last-lesson-${module.id}`, lessonId);
            updateNavButtons();
            
            // Re-initialize any dynamic components if necessary (like whiteboard)
            if (window.initializeWhiteboard) {
                window.initializeWhiteboard();
            }

        } catch (error) {
            console.error('Erro ao carregar a lição:', error);
            contentArea.innerHTML = `<div class="text-center text-red-500">Não foi possível carregar o conteúdo da lição. Verifique o console para mais detalhes.</div>`;
        } finally {
            hideLoading();
        }
    }

    // Populate lesson list
    if (lessonList) {
        lessonList.innerHTML = module.lessons.map(lesson => {
            const iconClass = lesson.type === 'music' ? 'fa-music' : 'fa-book-open';
            const colorClass = lesson.type === 'music' ? 'text-pink-500' : 'text-blue-500';
            return `
            <li>
                <a href="#" data-lesson-id="${lesson.id}" class="lesson-link flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200">
                    <i class="fas ${iconClass} ${colorClass} mr-3"></i>
                    <span>${lesson.title}</span>
                </a>
            </li>
        `}).join('');

        lessonList.addEventListener('click', (e) => {
            e.preventDefault();
            const link = e.target.closest('.lesson-link');
            if (link) {
                const lessonId = link.dataset.lessonId;
                loadLesson(lessonId);
                 if (window.innerWidth < 768) { 
                    sidebar.classList.add('collapsed');
                }
            }
        });
    }

    // Navigation button listeners
    nextLessonBtn.addEventListener('click', () => {
        if (currentLessonIndex < module.lessons.length - 1) {
            currentLessonIndex++;
            loadLesson(module.lessons[currentLessonIndex].id);
        }
    });

    prevLessonBtn.addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            currentLessonIndex--;
            loadLesson(module.lessons[currentLessonIndex].id);
        }
    });
    
    // Sidebar toggle functionality
    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    const lastLessonId = localStorage.getItem(`last-lesson-${module.id}`);
    if (lastLessonId) {
        loadLesson(lastLessonId);
    } else {
       hideLoading();
    }
});