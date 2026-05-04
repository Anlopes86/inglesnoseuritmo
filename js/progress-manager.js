async function updateStudentData(studentId, dataToUpdate) {
    const db = firebase.firestore();
    if (!studentId) {
        throw new Error('ID do aluno invalido ou nao encontrado.');
    }

    const studentRef = db.collection('students').doc(studentId);
    try {
        await studentRef.update(dataToUpdate);
        return true;
    } catch (error) {
        console.error('Erro ao atualizar dados do aluno:', error);
        throw error;
    }
}

async function resolveProgressViewerContext() {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
        return { role: 'aluno', studentId: null };
    }

    const viewerDoc = await db.collection('students').doc(currentUser.uid).get();
    const viewerData = viewerDoc.exists ? viewerDoc.data() : {};
    const role = viewerData.role || localStorage.getItem('loggedInUserRole') || 'aluno';

    if (role === 'professor') {
        const studentId = localStorage.getItem('selectedStudentId');
        if (!studentId) {
            return { role, studentId: null };
        }

        const studentDoc = await db.collection('students').doc(studentId).get();
        if (!studentDoc.exists) {
            throw new Error('Aluno selecionado nao foi encontrado.');
        }

        if (studentDoc.data().teacherId !== currentUser.uid) {
            throw new Error('Acesso negado ao aluno selecionado.');
        }

        return { role, studentId, viewerId: currentUser.uid };
    }

    if (role !== 'aluno') {
        throw new Error('Perfil sem permissao para salvar progresso.');
    }

    return { role, studentId: currentUser.uid, viewerId: currentUser.uid };
}

async function markLessonAsComplete(moduleId, lessonId) {
    if (!moduleId || !lessonId) {
        if (typeof showToast === 'function') {
            showToast('Modulo ou licao nao foram identificados corretamente.', 'error', 'Progresso indisponivel');
        }
        console.error('markLessonAsComplete foi chamada sem moduleId ou lessonId.');
        return false;
    }

    let viewerContext;
    try {
        viewerContext = await resolveProgressViewerContext();
    } catch (error) {
        console.error('Erro ao validar contexto do progresso:', error);
        if (typeof showToast === 'function') {
            showToast('Nao foi possivel validar seu acesso a este aluno.', 'error', 'Acesso negado');
        }
        return false;
    }

    const studentId = viewerContext.studentId;
    if (!studentId) {
        if (typeof showToast === 'function') {
            showToast('Faca login novamente ou selecione um aluno antes de salvar.', 'error', 'Usuario nao identificado');
        }
        return false;
    }

    const progressUpdate = {};
    progressUpdate[`progress.${moduleId}.lesson_${lessonId}`] = true;

    try {
        await updateStudentData(studentId, progressUpdate);
        if (typeof showToast === 'function') {
            showToast(`A ${String(lessonId).padStart(2, '0')} foi concluida com sucesso.`, 'success', 'Progresso salvo');
        }

        const path = window.location.pathname;
        const lastSlashIndex = path.lastIndexOf('/');
        const basePath = path.substring(0, lastSlashIndex + 1);
        window.location.href = basePath + `${moduleId}.html`;
        return true;
    } catch (error) {
        console.error('Erro ao salvar progresso:', error);
        if (typeof showToast === 'function') {
            showToast('Nao foi possivel salvar o progresso agora.', 'error', 'Falha ao salvar');
        }
        return false;
    }
}

function getLessonContextFromPath() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const match = path.match(/\/([a-z0-9-]+)\/licao-(\d+)\.html$/i);
    if (!match) return null;

    return {
        moduleId: match[1].toLowerCase(),
        lessonNumber: parseInt(match[2], 10)
    };
}

function wireStandardLessonFinish() {
    const context = getLessonContextFromPath();
    if (!context) return;

    const isLastSlideActive = () => {
        const slides = Array.from(document.querySelectorAll('.slide'));
        if (!slides.length) return false;

        const activeIndex = slides.findIndex((slide) => slide.classList.contains('active'));
        return activeIndex >= 0 && activeIndex === slides.length - 1;
    };

    const isFinishTrigger = (button) => {
        if (!button) return false;

        if (button.matches('#finish-lesson-btn, #finish-lesson-btn-main')) {
            return true;
        }

        if (button.matches('#next-btn, #next-btn-main') && isLastSlideActive()) {
            return true;
        }

        return false;
    };

    document.addEventListener('click', async (event) => {
        const button = event.target.closest('#finish-lesson-btn, #finish-lesson-btn-main, #next-btn, #next-btn-main');
        if (!isFinishTrigger(button)) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        button.disabled = true;
        const originalContent = button.innerHTML;
        button.innerHTML = 'Salvando... <i class="fas fa-spinner fa-spin ml-2"></i>';

        if (typeof markLessonAsComplete === 'function') {
            const saved = await markLessonAsComplete(context.moduleId, context.lessonNumber);
            if (!saved) {
                button.disabled = false;
                button.innerHTML = originalContent;
            }
            return;
        }

        console.error('Funcao markLessonAsComplete nao encontrada.');
        localStorage.setItem(`lesson_${context.moduleId}_${context.lessonNumber}_completed`, 'true');
        const path = window.location.pathname;
        const lastSlashIndex = path.lastIndexOf('/');
        const basePath = path.substring(0, lastSlashIndex + 1);
        window.location.href = basePath + `${context.moduleId}.html`;
    }, true);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireStandardLessonFinish);
} else {
    wireStandardLessonFinish();
}
