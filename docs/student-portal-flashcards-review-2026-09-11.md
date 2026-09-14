> Estado atual: proposta rejeitada e revertida em 2026-09-12. Portal e flashcards mantêm a versão anterior; as seções de implementação abaixo são apenas histórico da avaliação.

# Portal do aluno e flashcards — análise de 11/09/2026

## Escopo e método

Análise da experiência atual, sem implementar redesign. Inspecionados `home-aluno.html`, `js/student-portal-dashboard.js`, `css/student-portal.css`, `flashcards-app.html`, `js/flashcards-app.js`, `css/flashcards-app.css` e `js/lesson-flashcard-save.js`. O portal atual carrega `student-portal-dashboard.js`; `aluno.html` e `aluno-portal.js` são outra experiência e não foram usados como referência principal.

Conferência no navegador em cópias locais com um aluno e 12 cards fictícios, SDK Firebase removido e respostas simuladas. Portal conferido em claro/escuro no desktop e claro no celular; flashcards em desktop e celular. Não houve alteração de dados reais, publicação ou gravação no banco. As páginas de amostra ficam em `artifacts/student-study-audit/`.

## Diagnóstico

O portal e os flashcards têm uma base visual boa, mas funcionam como experiências pouco conectadas. Para este curso, o portal deve ajudar o aluno a reencontrar a aula e praticar entre encontros. Hoje a revisão exige escolher um acervo e configurar uma sessão sem indicar claramente o que veio da própria aula ou o que está na hora de revisar.

Preservar: identidade visual, temas do portal, botões de pronúncia, salvamento a partir das lições, criação de cards próprios, filtros por categoria, sessões curtas, dois sentidos de estudo e progresso sincronizado. A prioridade é tornar esses recursos coerentes e confiáveis.

## 1. Aproximar portal, aula e revisão — prioridade alta

- O portal mostra a próxima lição, mas `selectModule` define o destino de Continuar como `module.href`: abre o índice do módulo, não a lição anunciada. Confirmado na amostra: Lição 02 apontava para `a1-v3/a1-v3.html`.
- O cartão mostra número, sem título ou assunto da aula. O portal não consulta os cards salvos, revisões previstas ou homework para orientar a prática.
- Clicar em um módulo apenas o seleciona e rola de volta ao topo; é preciso usar Continuar depois. Esse comportamento deve ser explícito ou oferecer abertura direta.

Proposta: compactar a saudação e apresentar a aula com título, um acesso coerente com o rótulo e um bloco de estudo pessoal: Revisar palavras da aula, Revisões de hoje e Homework quando houver dados reais disponíveis. A próxima lição curricular não deve ser apresentada como uma aula já agendada pelo professor. A decisão de criar acesso direto é uma proposta para o portal do aluno; não reaplica automaticamente a sugestão recusada para o painel do professor.

## 2. Atualizar a relação dos flashcards com o currículo — prioridade alta

- O portal reconhece A1 V3 com 38 lições. A página inicial dos flashcards apresenta Módulo A1/A2, 32 lições, e `deckCatalog.A1` carrega `js/vocabulary.js`. Não há acervos gerais correspondentes a A1 V3, A2 V3 e B1 V3 nesse catálogo.
- Os cards efetivamente salvos das aulas V3 estão no acervo CUSTOM, portanto a integração pessoal existe; o problema é a organização e a diferença entre esse acervo e o material geral antigo.
- Os decks gerais são apresentados independentemente dos módulos liberados para o aluno. Isso precisa de uma decisão editorial: material complementar aberto ou material da trilha atual. Não concluir, a partir disso, que as páginas de aulas protegidas estão sem controle de acesso.
- O carregamento de conversação busca 64 HTMLs a cada abertura do deck e extrai os cards. É um ponto de fragilidade e custo de carregamento; não foi medido em conexão móvel real.

Proposta: Minha revisão, Palavras das minhas aulas e Biblioteca extra. Dentro das palavras salvas, filtros por módulo, lição e categoria, usando `curriculumId` e títulos reais. A biblioteca extra pode permanecer, identificada como complemento. Gerar os acervos atuais a partir das fontes V3, sem introduzir outra fonte editorial divergente.

## 3. Corrigir o agendamento e os indicadores — prioridade alta

Evidências no código de flashcards:

- `nextReviewDate` agenda hard em oito horas, medium em três dias e easy em sete dias. Porém `isDue` devolve verdadeiro para todo hard, ignorando a data. Na amostra, o card hard com data futura já entrou como prioritário.
- O intervalo é sempre igual para uma dificuldade, mesmo após sucessivas revisões; `reviewCount` não altera a programação.
- A fila inclui cards fáceis e médios ainda não vencidos se houver espaço. Não existe filtro específico de revisão vencida.
- A página calcula contagens de cards avaliados e a reforçar, mas `hero-stats` permanece com `is-hidden`.
- Ao carregar um card, ele já entra em `seen`. Confirmado: usar Próximo cinco vezes, sem resposta ou avaliação, termina em Sessão concluída, 5/5 e zero avaliações.
- Dominei/Dominados reflete uma autoavaliação easy, não um histórico de retenção.

Proposta: separar exibidos, respondidos e adiados; usar Lembrei / Com esforço / Não lembrei, com explicação do efeito. Mostrar quantidade de revisões previstas e próximo retorno, respeitar as datas e evoluir os intervalos conforme histórico. A revisão livre pode permitir repetir qualquer card, mas deve ser distinguida da revisão programada. Cards não lembrados podem reaparecer após outros itens na sessão, com limite claro.

## 4. Tornar a produção em inglês consistente — prioridade alta

- O salvamento de lição pode concatenar tradução e exemplo em inglês em um único verso (`extractBackText`). O modo produção coloca esse verso inteiro na frente do card.
- Confirmado com formato compatível com os cards de aula: a pergunta mostrou “reservar Example: I need to book a room.” para a resposta “to book”. O exemplo entregava o termo esperado.
- A correção compara apenas o texto normalizado com uma única frente. Não contempla respostas alternativas previamente aceitas.
- A pronúncia lê a frente em inglês em ambos os modos; em produção funciona como uma dica que entrega a resposta, embora apareça apenas como Ouvir pronúncia.

Proposta: separar termo, significado, exemplo e respostas aceitas. Em produção, o exemplo pode aparecer depois da tentativa ou com lacuna. Rotular áudio como dica quando revelar o termo. Oferecer responder mentalmente/em voz alta e depois conferir, sem exigir digitação em toda revisão. A leitura do navegador pode continuar; não implica implantar reconhecimento de voz ou avaliação automática de pronúncia.

## 5. Separar gerenciamento e prática — prioridade média/alta

- Meus Cards & Favoritos termina com Gerenciar, mas abre imediatamente uma sessão aleatória; não é uma tela de gerenciamento.
- Busca e edição existem durante o estudo. Editar ou excluir chama `applyFilters`, que reinicia a sessão; trocar filtros também reinicia silenciosamente.
- Continuar revisão persiste apenas o último deck, não a fila, o card atual ou a posição. Ao voltar, o deck é carregado e embaralhado novamente.
- Na tela de estudo pessoal, o grande bloco Crie seu próprio flashcard vem antes do card em revisão, inclusive no celular.

Proposta: Biblioteca para localizar, editar e organizar; Estudar para realizar uma sessão. Manter criação como ação compacta. Salvar a posição real para continuar e pedir uma decisão explícita antes de mudanças que reiniciem o estudo. Não é necessário mostrar uma lista extensa: a biblioteca pode usar busca, filtros e paginação.

## 6. Visual e celular — prioridade média

- O portal tem uma saudação muito grande e repete informações de módulo, lições e horas. Na amostra móvel de 390 × 844, o botão Continuar começou aproximadamente em 496 px e o título Módulos liberados em 1166 px. Não houve transbordamento horizontal (documento 375 px, espaço restante do scrollbar).
- Horas fracionadas aparecem como 6.75h, mesmo com interface em português. Seria mais claro 6 h 45 min ou 6,75 h de forma consistente.
- Flashcards usam marca Flash-English, outra paleta e somente tema escuro; não seguem a preferência clara do portal.
- No estudo móvel, a chamada de criação ocupa cerca de 170 px acima do card. A categoria longa é truncada e ações de avaliação ficam abaixo do card, exigindo rolagem em alguns estados.

Proposta: saudação curta, espaço prioritário para estudo e horas em resumo secundário compacto; manter identidade entre portal e flashcards. Durante estudo, reduzir o bloco de criação, adaptar altura/tipografia do card e deixar a avaliação fácil de alcançar sem cobrir a resposta. Diferenciar tradução e exemplo por hierarquia visual, em vez de tratá-los como um texto grande único.

## 7. Clareza, acessibilidade e confiança — prioridade técnica

- O verso visualmente oculto do flashcard também apareceu na árvore de acessibilidade antes da revelação. `study-card` é um botão contendo outros botões; revisar a semântica e esconder a face inativa também para leitores de tela.
- `handleKeyboard` intercepta Enter/espaço de maneira global sem excluir botões focados. Há risco de virar o card em vez de ativar o controle; achado de código, não um teste completo com leitor de tela.
- O proprietário da biblioteca é derivado de papel/aluno selecionado em localStorage. A identificação do aluno está visualmente escondida. Em uso por professor, convém mostrar de quem são os cards e confirmar o contexto via perfil autorizado. As regras de banco continuam sendo a barreira de autorização; não foi demonstrado vazamento entre contas.
- `rateCurrentCard` não bloqueia avaliações concorrentes durante a gravação. Cliques repetidos podem contar/gravar mais de uma vez e avançar mais de um card. Risco identificado no código; não reproduzido nesta rodada.
- Uma falha de gravação mantém a avaliação só em memória e avança o card. Há toast de erro, mas não fila de reenvio nem indicação permanente de mudanças pendentes. O rótulo Sincronizado vem da carga inicial.
- Excluir card não remove sua avaliação; contagens globais podem incluir itens excluídos.

Proposta: contexto de aluno visível para o professor, bloqueio de duplo envio, estados claros de pendência, recuperação de falha e testes de teclado. Unificar identificação/deduplicação dos cards salvos na aula e na central; os dois caminhos hoje usam normalizações diferentes para fingerprint.

## Ordem sugerida

1. Corrigir agendamento, contagem de revisão, produção com resposta exposta e gravação concorrente.
2. Conectar os cards às aulas V3 e facilitar a revisão do material pessoal.
3. Separar biblioteca de sessão e implementar retomada real.
4. Ajustar portal, identidade visual, celular e acessibilidade com o fluxo já consolidado.

Um piloto adequado seria uma aula lexical A1 V3: salvar termos, encontrá-los no portal, revisar em ambos os sentidos, sair e retomar, conferir a próxima revisão. Aprovar essa experiência antes de ampliar para os outros módulos. Nenhuma dessas propostas foi aplicada nesta análise.


## Implementação local — 2026-09-12

A proposta foi aplicada nos arquivos ativos, sem publicação e sem gravações em cadastros reais.

- Portal: próxima lição V3 com título e acesso direto, resumo da biblioteca pessoal, entrada para revisão de hoje e da última aula salva. Progresso e horas passaram para um resumo recolhível; horas fracionadas usam notação brasileira.
- Flashcards: biblioteca independente da sessão, busca, filtros por módulo e lição, paginação de oito itens, criação, edição e exclusão. Os cards salvos nas aulas continuam na coleção existente, com seus IDs e metadados preservados. Títulos V3 são resolvidos por curriculumId; números antigos não são associados automaticamente a aulas novas.
- Estudo: sessões de 5, 10 ou 20 cards, reconhecimento e produção em inglês, resposta oral/mental ou escrita opcional, pronúncia pelo navegador e exemplos separados do significado. Na produção, inglês e exemplo ficam ocultos até a conferência; ouvir é identificado como dica. Aceita variantes cadastradas e verbos com ou sem o to ao responder.
- Agendamento: difícil retorna em oito horas; médio começa em três dias e fácil em sete, crescendo com revisões posteriores. A fila de hoje reúne revisões vencidas e cards novos. Prática por aula/seleção pode incluir cards futuros, com identificação de prática livre.
- Retomada: fila, posição, modo, avaliações e adiamentos persistem por aluno no mesmo navegador. Encerrar com adiamentos não declara todos os cards estudados. Transações idempotentes e bloqueio de envio evitam duplicação; falhas permanecem pendentes até a tentativa de recuperação.
- Contexto do professor: proprietário é validado pelo perfil e pelo acesso ao aluno; nome aparece na biblioteca. As regras existentes do Firestore seguem responsáveis pela autorização.
- Acervos gerais permanecem em Biblioteca extra, sem serem apresentados como o currículo V3. Chaves de avaliações antigas são consideradas no carregamento e na gravação.
- Identidade visual compartilhada, tema claro/escuro, revelação com semântica acessível e atalhos que respeitam os controles de formulário.

### Fontes ativas

- home-aluno.html, css/student-portal.css, js/student-portal-dashboard.js.
- flashcards-app.html, css/flashcards-study.css, js/flashcards-study-app.js.
- js/flashcards-study-core.js: normalização, separação do exemplo, currículo e agendamento.
- js/flashcards-extra-library.js: acervos complementares.
- js/flashcards-app.js é histórico e não é carregado pela página atual.

### Verificação e limites

- tools/audit-flashcards-study.cjs aprovado: prazos, crescimento dos intervalos, fila, variantes, separação da resposta, idempotência e currículo por ID.
- As quatro auditorias obrigatórias V3 passaram. A auditoria musical conserva seus 23 avisos de repetição já existentes; nenhuma música foi alterada nesta etapa.
- Testes interativos com dados fictícios: reconhecimento, produção sem resposta antecipada, variante de verbo, edição sem perda da origem, criação/exclusão, busca/filtros, retomada após recarregar, encerramento com cards adiados, carregamento de acervo extra e falha/recuperação de gravação sem avanço ou avaliação duplicada.
- Conferência visual de portal e flashcards em claro/escuro, desktop e 390 × 844. Resumo recolhível e entrada direta na revisão verificados. Nenhum erro de aplicação registrado na última conferência do navegador.
- Prévia isolada gerada por tools/build-student-study-preview.cjs em artifacts/student-study-audit/portal.html e flashcards.html, porta 8769. Firebase foi substituído somente nessas duas páginas por dados fictícios persistidos em sessionStorage. Os botões de simulação não fazem parte das páginas do produto.
- A retomada da sessão é local ao navegador; cards e avaliações usam as coleções existentes na nuvem. Não foi feita validação com escrita em uma conta real nem teste completo com leitor de tela. Os deveres permanecem nas lições, sem novo agregador de homework.


### Ajuste mobile adicional — 2026-09-12

Prioridade explícita do usuário: flashcards otimizados para celular. Alvos de toque com mínimo de 44 px, avaliação com mínimo de 64 px, campos com fonte de 16 px, ações de biblioteca distribuídas pela largura e filtros em coluna a até 360 px. Sessão com espaços menores e diálogos adaptados à altura dinâmica e à área segura. Campo de produção sem autocapitalização/corretor de texto. Conferência visual em largura de 320 px sem rolagem horizontal; teclado físico de smartphone não foi testado. Alterações continuam locais, fora do push exclusivo da correção do login.
