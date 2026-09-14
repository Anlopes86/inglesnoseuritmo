# Flashcards — manutenção funcional de 14/09/2026

Segunda fatia da auditoria comercial. Interface anterior preservada, com apenas contorno de foco para teclado. Alterações locais, sem publicação ou gravação em cadastros reais.

## Correções

- Produção em inglês apresenta o significado sem os trechos identificados como Formas/Exemplo/Example, que entregavam a resposta. Novos cards salvos das aulas guardam significado, formas e exemplo separadamente. Cards antigos continuam legíveis sem regravar seu conteúdo ou mudar seus IDs; o verso completo segue disponível no reconhecimento.
- Estatísticas ignoram avaliações identificáveis de cards pessoais que já não existem. A exclusão pessoal grava a remoção do card e da avaliação em uma única operação atômica. Falha mantém ambos disponíveis para nova tentativa.
- Edição preserva origem, vínculo curricular e posição na fila, sem recarregar toda a biblioteca. A tentativa digitada e o estado de revelação são preservados quando o termo em inglês não muda. Categoria selecionada não volta automaticamente para “todas”. Cards adicionados durante uma sessão ficam disponíveis na biblioteca e entram em uma nova sessão.
- Apenas a face ativa participa da leitura acessível. Controles de ouvir/editar/excluir ficam fora do botão de virar. Enter não dispara duas viradas nem substitui o comportamento dos botões. Fechamento dos diálogos fica bloqueado enquanto sua gravação está em andamento.

## Verificação

- `tools/audit-flashcards-maintenance.cjs`: produção com formato antigo/novo, faces acessíveis, teclado, estatísticas, procedência, tentativa/fila, falha de edição e exclusão atômica com falha.
- Testes de confiabilidade e contexto do aluno aprovados.
- Emulador Firestore isolado: 36 verificações de autorização, incluindo exclusão atômica autorizada, bloqueio de outro professor e repetição após remoção. Regras não foram alteradas nesta fatia.
- Quatro auditorias V3 obrigatórias aprovadas; permanecem 23 avisos musicais anteriores.
- Navegador com dados fictícios: produção sem exemplo revelador, edição de categoria após resposta correta, avaliação e exclusão sem reiniciar a fila, reconhecimento via Enter e inspeção das faces na árvore acessível. Largura configurada de 390 px, área útil de 375 px sem transbordamento horizontal. Inspeção visual após os ajustes finais.

## Limites e próxima fatia

Avaliações históricas sem origem e sem ID identificável não foram apagadas ou atribuídas automaticamente a cards pessoais. A limpeza de estatísticas cobre os casos identificáveis. Não houve migração destrutiva de dados antigos.

Permanecem fora desta fatia: alinhamento dos decks legados A1/A2 com o currículo V3, retomada completa de sessão após fechar a página, equivalências de resposta além da normalização atual e teste em aparelho móvel físico/leitor de tela real. A simulação de largura no navegador não substitui esses testes. O curso ainda não deve ser considerado integralmente pronto para comercialização apenas com estas verificações.
