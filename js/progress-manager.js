// js/progress-manager.js

async function updateStudentData(studentId, dataToUpdate) {
  const db = firebase.firestore();
  if (!studentId) {
    throw new Error("ID do aluno inválido ou não encontrado.");
  }
  const studentRef = db.collection("students").doc(studentId);
  try {
    await studentRef.update(dataToUpdate);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar dados do aluno:", error);
    throw error;
  }
}

async function markLessonAsComplete(moduleId, lessonId) {
  const auth = firebase.auth();
  
  if (!moduleId || !lessonId) {
    alert("Erro crítico: Módulo ou Lição não foram identificados. O progresso não pôde ser salvo.");
    console.error("markLessonAsComplete foi chamada sem moduleId ou lessonId.");
    return;
  }

  const role = localStorage.getItem("loggedInUserRole") || 'aluno';
  const currentUser = auth.currentUser;
  
  let studentId = localStorage.getItem("selectedStudentId") || localStorage.getItem("loggedInUserId") || (currentUser ? currentUser.uid : null);

  if (!studentId) {
    alert("Usuário não identificado. Por favor, faça login novamente ou selecione um aluno.");
    return;
  }

  const progressUpdate = {};
  progressUpdate[`progress.${moduleId}.lesson_${lessonId}`] = true;

  try {
    await updateStudentData(studentId, progressUpdate);
    alert("Parabéns! Você concluiu a lição!");
    
    // ? L?"GICA DE REDIRECIONAMENTO GEN??RICO ?
    // Esta parte do código vai funcionar para todos os módulos
    // que seguem a mesma estrutura de pastas.
    
    // Pega o caminho atual da URL, por exemplo: /conversation/lesson1.html
    const path = window.location.pathname;
    
    // Encontra a última "/" no caminho para descobrir o diretório atual
    const lastSlashIndex = path.lastIndexOf('/');
    
    // Extrai o caminho base do diretório, por exemplo: /conversation/
    const basePath = path.substring(0, lastSlashIndex + 1);
    
    // Redireciona para o arquivo 'conversation.html', 'a1.html', etc.
    // que está no mesmo diretório
    window.location.href = basePath + `${moduleId}.html`;

  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    alert("Ocorreu um erro ao salvar o progresso: " + error.message);
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

    console.error("Função markLessonAsComplete não encontrada.");
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
