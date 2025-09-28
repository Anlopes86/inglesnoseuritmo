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
    
    // ⭐ LÓGICA DE REDIRECIONAMENTO GENÉRICO ⭐
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