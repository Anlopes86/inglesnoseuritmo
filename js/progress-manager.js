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
    
    // CORREÇÃO AQUI: Redirecionamento para um caminho relativo e mais seguro.
    // Isso assume que a página da lição (ex: licao-06.html) está na mesma pasta
    // que a página principal do módulo (ex: conversation.html).
    window.location.href = `${moduleId}.html`;

  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    alert("Ocorreu um erro ao salvar o progresso: " + error.message);
  }
}