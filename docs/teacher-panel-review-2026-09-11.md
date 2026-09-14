# Painel do professor — análise visual e de uso

Análise de 11/09/2026. Escopo: `index.html`, `css/teacher-dashboard.css`, `css/app-theme.css`, `js/app.js` e `js/student-management.js`. O painel deve apoiar o professor que escolhe o aluno, abre a lição e compartilha a tela.

## Diagnóstico

O painel tem identidade visual consistente, tema escuro, controles identificados e separação inicial entre aluno e trilhas. A organização dá muito espaço a informações administrativas e pouco destaque à ação mais frequente: retomar a aula daquele aluno. O redesign deve começar pela hierarquia e pelos caminhos de navegação.

## Melhorias por prioridade

| Prioridade | Evidência atual | Consequência | Proposta |
|---|---|---|---|
| Alta | Próxima aula é texto; os cartões abrem o índice do módulo. | O professor conhece a próxima lição, mas precisa procurá-la novamente. | Bloco principal com nome do aluno, módulo, número e título da lição, botão **Retomar aula** e alternativa **Escolher outra lição**. |
| Alta | `refreshDashboardState` reconstrói controles periodicamente; `renderModuleReleaseOptions` limpa o seletor. Na amostra, a opção Ponte A2–B1 voltou a vazia sem confirmação. | Uma atualização de dados interrompe uma tarefa em andamento. | Atualizar somente dados alterados, preservar busca/seleção/foco e impedir respostas antigas de sobrescrever o aluno atual. |
| Alta | Em 390 px, a página mediu 405 px de largura; o resumo começou a cerca de 1.268 px e o primeiro cartão de módulo a 2.456 px do topo. | Cabeçalho cortado e várias rolagens antes do conteúdo pedagógico. | No celular: seletor compacto → retomar aula → resumo; pacote e outras ações em áreas recolhíveis. Reorganizar cabeçalho em menu. |
| Alta | Valores do pacote ficam visíveis na mesma página usada para preparar a aula. | Ao compartilhar a tela do painel, dados administrativos aparecem junto ao conteúdo. | Área **Aula** com notas do professor e valores ocultáveis; **Pacotes** como área separada. Um modo de apresentação deve abrir a lição com contexto do aluno explícito. |
| Média | Horas utilizadas e data do último registro aparecem duas vezes. Quatro cartões estreitos têm textos longos. | Excesso de caixas e informações repetidas, com quebras de texto desnecessárias. | Resumo compacto, menos bordas aninhadas e sombras, espaçamento consistente, um botão principal por área. Priorizar horas restantes quando se consulta o pacote. |
| Média | Busca e seleção são dois controles; a busca esconde opções de um select nativo. | Digitar não oferece uma lista clara de resultados; a lista não ajuda a distinguir alunos ou retomar os recentes. | Busca com resultados clicáveis: nome, módulo e último encontro; recentes e estado explícito de nenhum resultado. |
| Média | “Última atividade” é calculada pelo maior número de lição concluída, não pela data. | Um retorno a uma aula anterior não aparece como a atividade mais recente. | Mostrar **Última aula trabalhada** com data real; enquanto esse dado não existir, chamar o valor atual de **Maior lição concluída**. |
| Média | Nivelamento sempre vem antes do módulo principal. V3 aparece como “versão de teste” / “Testar trilha”. | A prioridade visual não corresponde à continuidade da aula; nomenclatura pode confundir o uso corrente do V3. | Módulo principal primeiro; nivelamento como ferramenta. Usar “Abrir módulo” e distinguir versões em uma área secundária, preservando seus IDs e acessos. |
| Média | Registrar horas é um +/− de uma hora; o histórico armazena datas e o novo pacote o reinicia. | Pouca clareza para duração diferente, correção e consulta a encontros anteriores. | **Registrar aula** com data, duração e nota opcional; histórico consultável e correção explícita. Preservar pacotes anteriores. |
| Média | O modal de cadastro permite sair pelo teclado para controles do painel. Reproduzido com Shift+Tab: foco foi para “Tornar principal” atrás do modal. | Navegação de teclado pode acionar algo fora do formulário que está aberto. | Conter foco no modal, tornar o fundo inerte e manter retorno ao botão de origem ao fechar. |
| Média | O painel não oferece um lugar próprio para observação pedagógica, tarefa pendente e ponto de retomada. | O professor precisa manter contexto em outro lugar. | Área compacta **Para a próxima aula**, com anotação privada, homework pendente e pontos a revisar. |

## Organização proposta

1. **Aluno atual:** busca/troca rápida, nome sempre visível, acesso ao portal como ação secundária.
2. **Aula:** próxima lição com título e tipo, Retomar, Escolher outra, observação privada e tarefa pendente.
3. **Progresso:** aulas trabalhadas e concluídas, datas e pontos marcados para voltar.
4. **Módulos:** liberados, principal, versões e liberação de novos acessos.
5. **Pacotes:** saldo de horas, registrar encontro e histórico; valores fora da área de compartilhamento.

Em telas grandes, a lista de alunos pode ocupar uma lateral compacta. No celular, vira um seletor no topo. Essa estrutura é proposta para implementação posterior; não foi aplicada ao painel nesta análise.

## Validação e limites

- Inspeção de código e de uma cópia isolada do HTML atual com dados fictícios, na porta 8769. A amostra usa a mesma renderização do painel; integrações reais de autenticação e banco são substituídas por respostas de teste.
- Inspeção visual do tema escuro em desktop e em 390 × 844. A faixa amarela de identificação pertence apenas à amostra; não faz parte do painel real. As medidas incluem essa faixa.
- Inspeção dos formulários de cadastro e pacote sem envio. Verificados foco do teclado e perda da seleção durante atualização automática. Não foram alterados cadastros, acessos, valores ou pacotes.
- Depois da correção de login, a sessão real do professor abriu o painel local e carregou sua lista de alunos. Dados pessoais dessa sessão não foram incluídos no relatório.
- Tema claro não recebeu inspeção visual nesta etapa. Os problemas de carregamento e concorrência que não foram reproduzidos são recomendações de robustez, não falhas confirmadas.

## Incidente de login tratado durante a análise

O navegador registrou `permission-denied` durante a entrada. O fluxo chamava `ensureInitialAdmin`, que consulta contas de administradores e professores e tenta promover uma conta. Essas operações conflitam com as permissões normais de professor.

A entrada passou a consultar somente o próprio perfil e respeitar o papel já cadastrado. Foram adicionados prazo limite, mensagens específicas e tentativa explícita de carregar novamente o perfil quando a autenticação do mesmo usuário não emite um novo evento. Um documento inexistente agora retorna perfil ausente, em vez de construir um perfil de aluno vazio.

Os testes de login e as quatro auditorias V3 passaram. A sessão real abriu localmente. A correção foi publicada no GitHub Pages em `00bd3f5beb2df9e0e9661fcca2c8cb4228757cd7`; publicação concluída e os dois arquivos JavaScript públicos conferidos com os locais. Não houve alteração de regras, papéis, senhas ou permissões. O login interativo no domínio público ainda depende da entrada do usuário nesse domínio.

Há outra migração antiga em `js/app.js`, `maybeMigrateLegacyStudents`, cujo erro é capturado e não impede abrir o painel. Recomenda-se remover a execução automática dessa migração em uma etapa específica, mantendo migrações de cadastros sob controle administrativo.

## Implementação local aprovada — itens 3 a 6

O usuário confirmou aplicar o item 3 (resultados clicáveis), além de 4–6. As propostas de Retomar aula e de separar Aula/Administração não foram aplicadas.

- Busca por nome sem distinção de acentos, resultados com nome e trilha, estado selecionado, navegação por botões e mensagem de nenhum resultado. O select antigo permanece oculto como ponte com os fluxos existentes de gestão.
- Resumo com menos caixas, retirada da duplicação de horas/data, saldo disponível no pacote e cartões mais compactos. A identidade e ambos os temas foram preservados.
- Cabeçalho responsivo, resumo em duas colunas no celular e pacote após o conteúdo principal. Na amostra de três alunos, em 390 × 844, a largura do documento foi 375 px (sem transbordamento), o resumo começou em aproximadamente 728 px e o primeiro cartão em 1540 px. As medidas incluem a faixa de identificação da prévia.
- Encontros com data/horário, duração de 15 a 240 minutos e observação opcional. Edição dos encontros do pacote atual recalcula apenas a diferença de duração. Pacotes encerrados conservam horas usadas e encontros para consulta. Registros antigos preservam totais e datas existentes, sem inventar detalhes ausentes.
- Gravação em transação no documento do aluno, preservando progresso e permissões existentes. O encontro captura aluno e pacote ao abrir; edição detecta alterações concorrentes. O modal nativo contém o foco. As observações são dados do aluno, não notas privadas do professor.

### Verificação desta etapa

`tools/audit-class-session-ledger.cjs` passou: duração fracionada, correção, repetição sem duplicar, conflito de edição/pacote, validação, datas antigas e arquivamento. As quatro auditorias V3 passaram; os 23 avisos musicais preexistentes permaneceram.

Na prévia isolada, sem SDK Firebase, foram verificados busca por `joao`, seleção, estado vazio, registro de 30 minutos, edição para 45 e novo pacote mantendo o histórico anterior. Testados temas claro/escuro em desktop e celular, incluindo formulário responsivo. As gravações interativas ocorreram somente em memória, com alunos fictícios; não houve alteração de cadastros reais nem publicação desta etapa.

Prévia reproduzível: executar `node tools/build-teacher-panel-preview.cjs` e servir o projeto na porta 8769. Abrir `/artifacts/teacher-panel-audit/fixture.html`. Recarregar restaura os dados fictícios iniciais. A integração de gravação no banco real não foi exercitada nesta revisão.

### Ajuste após avaliação do usuário

A lista clicável do item 3 foi retirada a pedido do usuário. Restaurado o dropdown de alunos com o campo de busca existente; removidos o script e os estilos exclusivos da lista. Permanecem o registro de encontros, o histórico e os demais ajustes visuais. A prévia foi atualizada e a troca de aluno pelo dropdown foi conferida no navegador. As quatro auditorias V3 e o teste do histórico passaram novamente.
