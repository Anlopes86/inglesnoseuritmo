const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Esta é a nossa função segura que será chamada pelo site
exports.deleteUser = functions.https.onCall(async (data, context) => {
  // 1. Verifica se o usuário que está fazendo a chamada está logado
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação."
    );
  }

  const callerUid = context.auth.uid;
  const uidToDelete = data.uid; // ID do aluno a ser deletado

  if (!uidToDelete) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "O ID do usuário a ser deletado não foi fornecido."
    );
  }

  try {
    // 2. Busca o perfil de quem está chamando para ver se é um professor
    const callerDoc = await admin.firestore().collection("students").doc(callerUid).get();

    if (!callerDoc.exists || callerDoc.data().role !== "professor") {
      // 3. Se não for um professor, bloqueia a ação
      throw new functions.https.HttpsError(
        "permission-denied",
        "Você não tem permissão para deletar usuários."
      );
    }

    // 4. Se for um professor, deleta o usuário do sistema de Autenticação
    await admin.auth().deleteUser(uidToDelete);

    return { success: true, message: "Usuário deletado da autenticação com sucesso." };

  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Ocorreu um erro interno ao tentar deletar o usuário."
    );
  }
});