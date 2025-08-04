document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos importantes da página
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const finishLessonBtn = document.getElementById('finish-lesson-btn');
    const openWhiteboardBtn = document.getElementById('open-whiteboard-btn');
    const whiteboard = document.getElementById('whiteboard');
    const closeWhiteboardBtn = document.getElementById('close-whiteboard-btn');
    
    // Variável para guardar a posição do slide atual
    let currentSlide = 0;

    // Função principal que mostra o slide correto e atualiza os botões
    function showSlide(slideIndex) {
        // Esconde todos os slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Mostra apenas o slide atual
        if (slides[slideIndex]) {
            slides[slideIndex].style.display = 'block';
        }

        // --- Lógica de exibição dos botões ---

        // Botão "Anterior" (Previous)
        // Mostra se não for o primeiro slide (index 0)
        prevBtn.style.display = (slideIndex === 0) ? 'none' : 'inline-flex';

        // Botão "Próximo" (Next)
        // Mostra se NÃO for o último slide
        nextBtn.style.display = (slideIndex === slides.length - 1) ? 'none' : 'inline-flex';

        // Botão "Finalizar Aula"
        // Mostra APENAS se for o último slide
        if (finishLessonBtn) {
            finishLessonBtn.style.display = (slideIndex === slides.length - 1) ? 'inline-flex' : 'none';
        }
    }

    // --- Configuração dos Eventos de Clique ---

    // Evento para o botão "Next"
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                showSlide(currentSlide);
            }
        });
    }

    // Evento para o botão "Previous"
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                showSlide(currentSlide);
            }
        });
    }

    // Evento para o botão "Finalizar Aula"
    if (finishLessonBtn) {
        finishLessonBtn.addEventListener('click', () => {
            // A função markLessonAsComplete() vem do arquivo progress-manager.js
            // que já está carregado na sua página.
            if (typeof markLessonAsComplete === 'function') {
                markLessonAsComplete();
            } else {
                console.error('Função markLessonAsComplete() não encontrada. Verifique se progress-manager.js está sendo carregado.');
                alert('Erro ao tentar salvar o progresso. Verifique o console.');
            }
        });
    }

    // Evento para abrir o Quadro Branco
    if (openWhiteboardBtn && whiteboard) {
        openWhiteboardBtn.addEventListener('click', () => {
            whiteboard.style.display = 'flex';
        });
    }

    // Evento para fechar o Quadro Branco
    if (closeWhiteboardBtn && whiteboard) {
        closeWhiteboardBtn.addEventListener('click', () => {
            whiteboard.style.display = 'none';
        });
    }

    // --- Inicialização ---
    // Chama a função pela primeira vez para configurar o slide inicial (slide 0)
    showSlide(currentSlide);
});