// js/progress-manager.js (VERSÃO FINAL, SIMPLES E CORRETA)

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
  
  // Garante que o módulo e a lição foram informados
  if (!moduleId || !lessonId) {
      alert("Erro crítico: Módulo ou Lição não foram identificados. O progresso não pôde ser salvo.");
      console.error("markLessonAsComplete foi chamada sem moduleId ou lessonId.");
      return;
  }

  const role = localStorage.getItem("loggedInUserRole") || 'aluno';
  const currentUser = auth.currentUser;
  
  let studentId;
  if (role === 'professor') {
      studentId = localStorage.getItem("selectedStudentId");
  } else if (currentUser) {
      studentId = currentUser.uid;
  }

  if (!studentId) {
    alert("Usuário não identificado. Por favor, faça login novamente ou selecione um aluno.");
    return;
  }

  const progressUpdate = {};
  progressUpdate[`progress.${moduleId}.lesson_${lessonId}`] = true;

  try {
    await updateStudentData(studentId, progressUpdate);
    alert("Parabéns! Você concluiu a lição.");
    
    // Constrói um caminho absoluto para o redirecionamento.
    // Ex: Se o moduleId for 'a1', ele redireciona para '/a1/a1.html'
    window.location.href = `/${moduleId}/${moduleId}.html`;

  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    alert("Ocorreu um erro ao salvar o progresso: " + error.message);
  }
}