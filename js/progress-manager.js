async function updateStudentData(studentId, dataToUpdate) {
    const db = firebase.firestore();
    if (!studentId) {
        throw new Error('ID do aluno inválido ou não encontrado.');
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

async function markLessonAsComplete(moduleId, lessonId) {
    const auth = firebase.auth();

    if (!moduleId || !lessonId) {
        if (typeof showToast === 'function') {
            showToast('Módulo ou lição não foram identificados corretamente.', 'error', 'Progresso indisponível');
        }
        console.error('markLessonAsComplete foi chamada sem moduleId ou lessonId.');
        return;
    }

    const currentUser = auth.currentUser;
    const studentId = localStorage.getItem('selectedStudentId')
        || localStorage.getItem('loggedInUserId')
        || (currentUser ? currentUser.uid : null);

    if (!studentId) {
        if (typeof showToast === 'function') {
            showToast('Faça login novamente ou selecione um aluno antes de salvar.', 'error', 'Usuário não identificado');
        }
        return;
    }

    const progressUpdate = {};
    progressUpdate[`progress.${moduleId}.lesson_${lessonId}`] = true;

    try {
        await updateStudentData(studentId, progressUpdate);
        if (typeof showToast === 'function') {
            showToast(`A ${String(lessonId).padStart(2, '0')} foi concluída com sucesso.`, 'success', 'Progresso salvo');
        }

        const path = window.location.pathname;
        const lastSlashIndex = path.lastIndexOf('/');
        const basePath = path.substring(0, lastSlashIndex + 1);
        window.location.href = basePath + `${moduleId}.html`;
    } catch (error) {
        console.error('Erro ao salvar progresso:', error);
        if (typeof showToast === 'function') {
            showToast('Não foi possível salvar o progresso agora.', 'error', 'Falha ao salvar');
        }
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

    document.addEventListener('click', async (event) => {
        const button = event.target.closest('#finish-lesson-btn, #finish-lesson-btn-main');
        if (!button) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        button.disabled = true;
        button.innerHTML = 'Salvando... <i class="fas fa-spinner fa-spin ml-2"></i>';

        if (typeof markLessonAsComplete === 'function') {
            await markLessonAsComplete(context.moduleId, context.lessonNumber);
            return;
        }

        console.error('Função markLessonAsComplete não encontrada.');
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
