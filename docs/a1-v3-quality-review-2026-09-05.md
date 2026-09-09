# Avaliação do módulo A1 V3 — 5 de setembro de 2026

## Parecer

O módulo tem uma base aproveitável: situações cotidianas, exemplos contextualizados, apoio em português, diálogos, revisão recorrente e tarefas com professor e aluno. Minha recomendação é preservar essa base e revisar a progressão e a experiência de apresentação. Hoje, a quantidade de material e a complexidade das tarefas finais dificultam usá-lo como um percurso A1 consistente de aulas particulares de 60 minutos.

Esta avaliação combina inspeção do manifesto e dos 32 arquivos canônicos, leitura qualitativa de amostras do início, meio e fim, execução das 32 aulas e inspeção visual de telas. Não constitui certificação CEFR, revisão linguística exaustiva de cada frase ou observação de alunos reais.

## Defeito corrigido

O navegador reproduziu `Cannot read properties of undefined (reading 'map')` em `renderHomework`, chamado por `reviewSlides`. O registry normalizava homework para `options`, descartava `themes` e `checklist` e substituía a instrução autoral por `Choose one option.`. O player ainda executava `homework.themes.map(...)` e `homework.checklist.map(...)`.

Como o conjunto de slides é preparado antes de ser inserido na página, a falha no último slide impedia toda a montagem. O “1 / 1” era o contador inicial do HTML, não uma aula contendo efetivamente um slide. O mesmo caminho afetava as aulas lexicais após L4; L1–4 usam um homework específico no player.

A correção preserva os campos autorais antigos no registry e permite ao player renderizar tanto temas/checklist quanto opções com título e instrução. A compatibilidade continua identificada como `legacy-theme-contract`/`usesFallback`; nenhuma aula foi falsamente marcada como migrada. As 32 fontes ainda usam esse contrato antigo. A migração editorial completa deve ocorrer em outra fatia.

Resultados de navegação após a correção:

| Aula | Slides |
|---|---:|
| L5 — Conversation Activities 1 | 15 |
| L10 — Conversation Activities 2 | 18 |
| L15, L20, L25 e L30 | 19 por aula |
| L31 e L32 — Consolidações | 36 por aula |

Alterações locais, sem commit, push ou publicação.

## Conteúdo e adequação ao A1

### O que preservar

- Apresentações, contatos, rotina, família, casa e compras dão finalidade prática à linguagem.
- Revisão a cada quatro aulas permite retomar o vocabulário em outro contexto.
- Frases de apoio, modelos, respostas reveláveis e leitura com o professor ajudam o iniciante.
- Atividades como ditar e confirmar um contato são adequadas à interação individual online.

### Prioridade alta: equilibrar apoio e autonomia

L1–4 e L5 repetem instruções como “não precisa criar frases novas” e “não é necessário criar um diálogo”. O apoio inicial faz sentido, mas recomendo introduzir escolhas pessoais simples já nesse bloco: ouvir um modelo, trocar nome/profissão, responder com apoio e fazer uma pergunta ao professor. A1 pode envolver perguntas e respostas simples com repetição e ajuda; não precisa ficar restrito à reprodução.

No extremo oposto, L24 exige combinar Past Continuous e Past Simple, usar when/while, reconstruir problemas de viagem e criar uma narrativa com seis ações e três interrupções. L22 pede oito eventos, negativas e perguntas. Isso é uma exigência de produção elevada para o núcleo do percurso proposto. Recomendo mover a reconstrução narrativa complexa para extensão/transição A2, mantendo no núcleo respostas curtas e modelos de situações familiares.

Essa é uma avaliação das tarefas e do grau de autonomia exigido, não uma regra de que um tempo verbal isolado determina o nível CEFR.

### Prioridade alta: reduzir a carga por encontro

Os dados canônicos têm 14–22 entradas de vocabulário por aula lexical e 16–41 itens nas seções de atividades, além de gramática, traduções, diálogos, leitura e conversa. O player renderiza listas completas. Embora o registry declare limites e rotas `core/extended/extra`, o player atual não os aplica.

Recomendo um percurso essencial com cerca de 6–8 novos blocos lexicais, prática selecionada e uma tarefa de comunicação observável; o restante vira extensão ou revisão. São metas de design para testar com alunos, não limites oficiais do CEFR.

L31 e L32, com 36 slides cada, devem funcionar como diagnóstico seletivo ou ser divididas em encontros. Evitar percorrer todas as estações obrigatoriamente.

### Prioridade média: homework, escuta e evidência de aprendizagem

- Trocar tarefas extensas por uma produção curta com critério claro: áudio de 30–60 segundos, formulário simples ou 4–6 frases, conforme a etapa. Exemplo para L5: apresentar-se, dizer profissão/local e devolver uma pergunta.
- A fonte das consolidações contém `minimumWords:180/220`, mas esse metadado não chega ao homework normalizado/renderizado. Não é uma exigência visível atual; é mais um sinal de contratos incompletos.
- Manter música como complemento. Há áudio por síntese de voz no código; recomendo também diálogos curtos gravados, com velocidade controlada, tarefa de compreensão e transcrição revelável. A qualidade sonora não foi avaliada nesta sessão.
- Encerrar com um resultado verificável: “confirmou três informações de contato”, “fez uma pergunta”, “pediu repetição quando necessário”. Registrar o apoio usado e retomar um ponto na próxima aula.
- O corretor de inputs compara uma resposta normalizada. Reservá-lo a respostas fechadas; produções abertas devem aceitar variantes ou ficar para feedback do professor.

## Design para aula particular online

A identidade azul, os cartões e a navegação persistente dão consistência. Os modelos destacados e o botão de revelar resposta são úteis para conduzir a aula. O principal problema é densidade: em viewport de 1366 × 768, todas as aulas têm pelo menos uma tela de conteúdo acima de 1.000 px de altura; as consolidações chegaram a aproximadamente 1.818 px. São medidas do teste offline, com fontes externas indisponíveis; a aparência online pode variar.

Recomendações em ordem:

1. **Modo de apresentação com uma tarefa por tela.** Dividir listas extensas em grupos de 4–6 itens e exibir uma pergunta oral por vez. Testar em 1366 × 768 com espaço para a videochamada.
2. **Percurso essencial e índice de aula.** Permitir selecionar uma estação de revisão sem atravessar todos os slides. Aplicar de fato as rotas já declaradas no registry.
3. **Separar orientações do professor.** Mostrar ao aluno objetivo, situação, pergunta e apoio; deixar condução, critérios de observação e respostas em painel próprio.
4. **Tempo planejado por tarefa.** O selo de 60 minutos é uma distribuição automática pelo número/título dos slides. Não comprova que a aula cabe em uma hora; planejar durações e reservar espaço para dúvida, repetição e feedback.
5. **Teclado e áudio.** Os flashcards têm `role=button` e foco, mas o handler de inversão inspecionado é de clique. Adicionar Enter/Espaço e verificar estados de foco; validar escuta, clareza e repetição com áudio real.

Proposta de encontro-piloto de 60 minutos: retomada 5; modelo/escuta 8; prática guiada 12; conversa com escolhas reais 20; feedback e nova tentativa 10; tarefa de casa 5. O professor ajusta o apoio à resposta do aluno.

## Validação e limites

Passaram:

- `node tools/audit-v3.cjs`
- `node tools/audit-v3-semantics.cjs`
- `node tools/audit-v3-music.cjs` — com 23 avisos de baixa diversidade de respostas no conjunto A1/A2/B1, dos quais 12 no A1.
- `node a2-v3/audit-conversation-lessons.cjs`
- `node tools/audit-a1-v3-browser.cjs` — 32 aulas, avanço até o homework, retorno, contador, ausência de exceções do conteúdo, preservação de instruções/checklists, fixture de três opções e layout mobile de L5.

O teste de navegador bloqueia serviços externos deliberadamente: não valida autenticação, gravação de progresso, disponibilidade de Spotify/LRCLIB nem fontes/CDNs. As auditorias estáticas aprovadas também não substituem uma aula real; antes da correção elas não detectavam essa exceção do player. Capturas foram inspecionadas para layout e alcance do homework.

Próxima fatia recomendada: redesenhar o par L4–L5 como piloto, incluindo interação com escolhas, telas menores, rota essencial e um critério final de desempenho. Validar com um aluno iniciante e então replicar o padrão. Evitar reescrever o módulo inteiro antes dessa validação.

Referência pedagógica: [descritores oficiais do CEFR — Conselho da Europa](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors-search). Para A1, a interação admite ajuda, fala lenta e repetição em perguntas e respostas simples sobre assuntos familiares. As quantidades, o roteiro de 60 minutos e as recomendações de interface acima são propostas desta avaliação.
