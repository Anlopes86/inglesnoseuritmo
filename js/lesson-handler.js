// js/lesson-handler.js

document.addEventListener('DOMContentLoaded', () => {
    // This script assumes that a `module` object is defined before this file loads.
    if (typeof module === 'undefined') {
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
        if (prevLessonBtn) {
            prevLessonBtn.disabled = currentLessonIndex <= 0;
        }

        if (nextLessonBtn) {
            nextLessonBtn.disabled = currentLessonIndex >= module.lessons.length - 1;
        }
    }

    async function loadLesson(lessonId) {
        const lesson = module.lessons.find((item) => item.id === lessonId);
        if (!lesson) {
            console.error('Licao nao encontrada:', lessonId);
            if (contentArea) {
                contentArea.innerHTML = '<div class="text-center text-red-500">Erro: licao nao encontrada.</div>';
            }
            return;
        }

        currentLessonIndex = module.lessons.findIndex((item) => item.id === lessonId);
        showLoading();

        try {
            const response = await fetch(lesson.url);

            if (!response.ok) {
                if (response.status === 404) {
                    if (contentArea) {
                        contentArea.innerHTML = `
                            <div class="text-center p-8">
                                <i class="fas fa-hourglass-half fa-4x text-gray-300 mb-4"></i>
                                <h2 class="text-2xl font-semibold text-gray-600">Em breve</h2>
                                <p class="text-gray-400">O conteudo para esta licao esta sendo preparado.</p>
                            </div>
                        `;
                    }

                    if (lessonTitle) lessonTitle.textContent = lesson.title;
                    if (lessonSubtitle) {
                        lessonSubtitle.textContent = `Licao ${currentLessonIndex + 1} de ${module.lessons.length}`;
                    }
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                const lessonContent = await response.text();
                if (contentArea) {
                    contentArea.innerHTML = lessonContent;
                }
                if (lessonTitle) lessonTitle.textContent = lesson.title;
                if (lessonSubtitle) {
                    lessonSubtitle.textContent = `Licao ${currentLessonIndex + 1} de ${module.lessons.length}`;
                }
            }

            document.querySelectorAll('#lesson-list li a').forEach((link) => {
                link.classList.remove('active');
            });

            const activeLink = document.querySelector(`#lesson-list li a[data-lesson-id="${lessonId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            localStorage.setItem(`last-lesson-${module.id}`, lessonId);
            updateNavButtons();

            if (window.initializeWhiteboard) {
                window.initializeWhiteboard();
            }
        } catch (error) {
            console.error('Erro ao carregar a licao:', error);
            if (contentArea) {
                contentArea.innerHTML = '<div class="text-center text-red-500">Nao foi possivel carregar o conteudo da licao.</div>';
            }
        } finally {
            hideLoading();
        }
    }

    if (lessonList) {
        lessonList.innerHTML = module.lessons.map((lesson) => {
            const iconClass = lesson.type === 'music' ? 'fa-music' : 'fa-book-open';
            const colorClass = lesson.type === 'music' ? 'text-pink-500' : 'text-blue-500';

            return `
                <li>
                    <a href="#" data-lesson-id="${lesson.id}" class="lesson-link flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200">
                        <i class="fas ${iconClass} ${colorClass} mr-3"></i>
                        <span>${lesson.title}</span>
                    </a>
                </li>
            `;
        }).join('');

        lessonList.addEventListener('click', (event) => {
            event.preventDefault();
            const link = event.target.closest('.lesson-link');
            if (!link) return;

            loadLesson(link.dataset.lessonId);
            if (window.innerWidth < 768 && sidebar) {
                sidebar.classList.add('collapsed');
            }
        });
    }

    if (nextLessonBtn) {
        nextLessonBtn.addEventListener('click', () => {
            if (currentLessonIndex < module.lessons.length - 1) {
                currentLessonIndex += 1;
                loadLesson(module.lessons[currentLessonIndex].id);
            }
        });
    }

    if (prevLessonBtn) {
        prevLessonBtn.addEventListener('click', () => {
            if (currentLessonIndex > 0) {
                currentLessonIndex -= 1;
                loadLesson(module.lessons[currentLessonIndex].id);
            }
        });
    }

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
