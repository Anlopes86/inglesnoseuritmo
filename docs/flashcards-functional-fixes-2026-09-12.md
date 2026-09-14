# Correções funcionais — portal e flashcards

Escopo aprovado: quatro prioridades altas da análise. Interface anterior preservada. Sem publicação nesta etapa e sem alteração em registros reais.

- Avaliação: bloqueio de cliques concorrentes, navegação, filtros e edição durante envio/pendência. Contador e avanço só mudam depois de sucesso. Transação com identificador da tentativa impede duplicação ao repetir uma gravação cuja confirmação se perdeu.
- Falha: card permanece na tela, com mensagem e botão para tentar salvar novamente. Pendência fica em sessionStorage por aluno e por aba, permitindo recuperar a avaliação ao recarregar ou voltar do portal na mesma aba. A recuperação trata o card pendente; não implementa retomada geral de toda a sessão. Fechar a aba ou limpar os dados do navegador pode remover a pendência local. Se sessionStorage estiver indisponível, há aviso para manter a aba aberta.
- Agendamento: cards difíceis com data futura não são classificados como vencidos antes do prazo. Dados legados difíceis sem data conservam prioridade de revisão. Intervalos existentes de oito horas, três dias e sete dias preservados.
- Aluno: links do portal levam studentId para o professor. Os flashcards consultam o perfil autenticado, validam o acesso, priorizam o aluno do endereço e mantêm o contexto nos links. Na entrada direta sem parâmetro, a seleção anterior só é usada para um gestor autenticado e após validação; a URL fica vinculada ao aluno resolvido. Alunos usam o próprio UID, independentemente de papel ou seleção em localStorage.

Arquivos de produto: js/flashcards-app.js, js/student-portal-dashboard.js e flashcards-app.html. Nenhum CSS alterado. O HTML apenas inclui PlatformAccess e uma área de erro, invisível no fluxo normal.

Verificação: tools/audit-flashcards-reliability.cjs cobre prazo, identidade, seleção obsoleta, acesso negado, cliques repetidos, bloqueio de navegação, falha antes da gravação, recuperação após recarregar e falha de confirmação após commit. Testes passaram. Prévia em artifacts/student-study-audit gerada por tools/build-flashcards-reliability-preview.cjs usa exclusivamente dados fictícios; o Firebase público é removido dessas páginas de teste. Conferência no navegador confirmou falha sem avanço, saída/retorno com recuperação e contexto professor → portal → flashcards → portal. As quatro auditorias obrigatórias V3 passaram; avisos musicais preexistentes permanecem. Nenhum player de aula foi alterado.

Demais pontos da análise (retomada geral, exemplos na produção, edição/exclusão e atalhos fora da pendência) ficam para etapas posteriores.
