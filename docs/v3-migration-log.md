# Registro de migração V3

## 2026-08-30 · A2-V3 — acabamento editorial e contratos curriculares

Escopo concluído:

- alinhadas a promessa de nível, as correções de Past Perfect e as cópias de títulos ao manifesto curricular;
- substituídos os mapas editoriais antigos dos cards por metadados derivados de `lessonKind`, com fallback explícito;
- mantidas as 32 aulas, os 15 pares lexical → comunicativa e a identidade visual existente;
- adicionadas auditorias específicas para coerência de títulos, tipos, materiais e links do módulo.

## 2026-08-30 · A2-V3 — consolidações, rota de 60 minutos e homework

Escopo concluído:

- desvinculadas as aulas 31 e 32 de `lessonProfiles`, com dados atuais e explícitos na camada canônica do player;
- criada a escuta `A Busy Day in Town` na consolidação 31 e uma escuta final atual na consolidação 32, ambas ligadas a compreensão e produção oral;
- adicionada rota reutilizável Core/Extended/Extra às 15 aulas lexicais, sem alterar a ordem principal dos slides;
- criadas exatamente três tarefas autorais e contextualizadas de homework por aula lexical, com a instrução `Choose one option.`.

## 2026-08-30 · A2-V3 — transferência musical e variedade de lacunas

Escopo concluído:

- ampliado o contrato compartilhado para `transferPrompts`, mantendo compatibilidade com `transferPrompt` nos outros módulos;
- adicionadas três perguntas pós-música específicas a cada uma das 15 atividades A2;
- preservados catálogo, Spotify, provedores, cinco ocorrências e posição imediatamente anterior ao homework;
- aumentada para três a variedade de respostas em `Shy Guy` e `Fashion`, usando ocorrências já verificadas no provedor e sem armazenar letras;
- mantidos como warning os oito registros A2 cuja letra auditada oferece apenas duas respostas diferentes no recorte atual.

## 2026-08-30 · A2-V3 — QA portátil e integração contínua

Escopo concluído:

- tornado o browser audit portátil via `CHROME_PATH`, Chromium do Playwright e fallbacks de sistema documentados;
- cobertas as 32 aulas em 1440 × 1000 e 390 × 844, incluindo layout, navegação, revelações, música, homework e consolidações;
- criados scripts de qualidade e workflow de GitHub Actions sem etapa de deploy, com artifacts visuais apenas em falha;
- preservado o escopo privado do curso; publicação pública ou comercial continua dependendo da revisão de licenciamento já registrada.

## 2026-08-23 · Rollout musical completo nas 54 aulas lexicais

Escopo concluído:

- auditadas e ativadas as 42 atividades posteriores ao piloto, totalizando 24 músicas no A1, 15 no A2 e 15 no B1;
- confirmados IDs exatos de faixa no Spotify em contexto BR, título da versão, álbum e duração;
- confirmados os IDs LRCLIB e cinco posições distintas em cada uma das 54 atividades, sem persistir letras no repositório;
- substituída `9 to 5` por `Working for the Weekend` na A1 L2 e ajustadas lacunas pontuais incompatíveis com as letras reais;
- fixada a versão `Shy Guy - Darpe Mix` na A2 L13 para manter Spotify e LRCLIB na mesma gravação;
- habilitada por padrão a flag `musicClozeV3All`; aulas comunicativas, revisões e projetos continuam sem música;
- preservado o escopo `private-course-runtime`, com `commercialPublicationApproved: false`.

## 2026-08-23 · Alternância para mostrar e ocultar respostas

Escopo concluído:

- removido o feedback textual `Resposta: ...` após o clique no olho;
- o primeiro clique agora exibe a resposta somente dentro do campo e troca o ícone para olho riscado;
- o segundo clique oculta a resposta, restaura o valor anterior do aluno e devolve o ícone de olho;
- mantida a regra de que respostas reveladas não contam como acerto.

## 2026-08-23 · Ícone de olho para revelar respostas

Escopo concluído:

- substituído o texto visível `Revelar` pelo ícone de olho em cada lacuna musical;
- preservados `aria-label` e `title` descritivos para acessibilidade e identificação da ação;
- compactado o controle em um botão quadrado de 2 rem ao lado do campo.

## 2026-08-23 · Revelação individual nas lacunas musicais

Escopo concluído:

- adicionado um botão `Revelar` visível ao lado de cada uma das cinco lacunas do `MusicClozeV3`;
- cada botão revela somente sua própria resposta, desabilita o campo correspondente e desaparece após o uso;
- respostas reveladas permanecem fora da contagem de acertos, preservando o feedback pedagógico;
- botões de lacunas respondidas corretamente também são ocultados após a verificação.

## 2026-08-23 · Ativação privada das 12 músicas-piloto

Escopo concluído:

- ativados em `provider-verified` os 12 pilotos previamente auditados: quatro no A1, quatro no A2 e quatro no B1;
- habilitada por padrão a flag `musicClozeV3Pilots`, fazendo a atividade aparecer na Student View das aulas lexicais correspondentes, imediatamente antes do homework;
- mantidos os outros 42 registros em `draft-until-provider-match`, invisíveis para o aluno até receberem a mesma auditoria;
- preservado o carregamento de letras apenas em runtime, com LRCLIB e contingência Lyrics.ovh e cache somente em `sessionStorage`;
- registrada a ativação como `private-course-runtime`, sem declarar licença de exibição ou aprovação para publicação comercial.

Observação: esta etapa substitui o bloqueio de Student View registrado ao fim da curadoria técnica abaixo. A restrição de licenciamento para distribuição pública/comercial permanece.

## 2026-08-23 · Curadoria técnica das 12 músicas-piloto

Escopo concluído:

- confirmados no Spotify em contexto brasileiro os 12 IDs de faixa, com título da gravação, álbum e duração registrados no catálogo;
- cadastrados 12 IDs candidatos do LRCLIB e validadas em runtime cinco posições distintas para cada atividade, sem salvar letras comerciais no repositório;
- o seletor LRCLIB agora prefere a duração mais próxima dentro da tolerância e repete a busca sem álbum quando uma compilação não existe no índice do provedor;
- o tokenizer passou a separar algarismos de números telefônicos, permitindo o ditado de `867-5309/Jenny` com um campo por dígito e aceitando tanto número quanto palavra por extenso;
- em `Tom’s Diner`, a segunda ocorrência inexistente de `sitting` foi substituída pelas ocorrências reais 2 e 3 de `looking`, preservando cinco alvos em `-ing`;
- criada `tools/music-cloze-v3-pilot-qa.html`, que ativa os rascunhos apenas em memória para revisão privada de player, letra e gaps.
- a QA visual cobriu A1, A2 e B1 no desktop e A1 em 360 px; o container compartilhado recebeu `box-sizing: border-box` para eliminar rolagem horizontal no celular.

Bloqueio mantido: os 12 registros continuam em `draft-until-provider-match`, a flag de piloto segue desligada e a Student View não recebe músicas até a revisão humana final. O uso público/comercial continua condicionado à revisão de licenciamento indicada no contrato V3.

## 2026-08-22 · Mapa Musical V3 atualizado — LRCLIB e Spotify

Escopo concluído:

- substituído o `LicensedLyricsAdapter` genérico por `js/lyrics-service-v3.js`, com LRCLIB primeiro e Lyrics.ovh como contingência;
- adicionados timeout de 10 segundos, um retry para HTTP 429/`Retry-After`, seleção conservadora de candidato e cache somente em `sessionStorage`;
- criado `js/spotify-embed-v3.js`, que aceita apenas `spotifyTrackId` de 22 caracteres e nunca usa busca genérica;
- os 54 registros agora declaram exatamente cinco gaps `answer + occurrence`, status `draft-until-provider-match` e rollout de 12 aulas-piloto;
- `MusicClozeV3` passou a montar cinco inputs sobre a letra real, corrigir normalização, preservar acertos, revelar individualmente e avançar ao homework;
- criados `js/music-catalog-v3.test.js` e `js/music-cloze-v3.test.js`; a auditoria central verifica provedores, scripts, gaps, estados e embeds.

Pendência editorial: confirmar manualmente `lrclibId`, `spotifyTrackId`, versão/região BR e as cinco ocorrências de cada faixa antes de alterar qualquer registro para `provider-verified` e habilitar a flag de piloto.

## 2026-08-22 · Mapa Musical V3 — catálogo e bloqueio seguro

Escopo concluído:

- criada fonte única `js/music-catalog-v3.js` com 54 recomendações por `curriculumId`: 24 A1, 15 A2 e 15 B1;
- todos os registros permanecem em `draft`, com bloqueios explícitos para letra licenciada, versão exata, região BR, timestamps e cinco posições validadas;
- criado `js/music-cloze-v3.js`, separando SpotifyEmbed, LicensedLyricsAdapter, MusicClozeActivity e TeacherMusicPanel;
- adicionados `lessonKind` e nova cadência B1: ímpares lexicais, pares comunicativas e 31–32 projeto;
- removidos 32 objetos musicais legados do A1, 51 seleções genéricas do A2 e 28 objetos `music` do B1;
- removidos os 32 shells musicais estáticos A2, impedindo conteúdo transitório antes da hidratação;
- o MusicCloze só é inserido antes do homework quando o registro passa pelo validador publicável;
- criada auditoria `tools/audit-v3-music.cjs` com cobertura 54/54, bloqueio de drafts e verificação das 96 páginas.

Pendência externa para publicação: contratar/conectar provedor de letras autorizado e validar manualmente áudio, região, conteúdo e sincronização. Até isso acontecer, a Student View exibe zero clozes musicais.

## 2026-08-22 · Fase 0 — integridade semântica

Escopo concluído:

- removido o mapa manual de missões antigas de `js/v3-session-plan.js`;
- criada resolução de missão a partir do manifesto e dos dados autorais atuais;
- corrigidas as missões A1 L3 (`At Break`) e A1 L7 (`Let’s Go Out!`);
- adicionados `languageTags`, `sourceLesson` para pares A2 e catálogo musical semântico ao manifesto;
- removido `musicSelectionsByLesson` do A2;
- substituído o cloze genérico nos players A1, A2 e B1 por Listening Lab sem letra comercial;
- corrigido o rótulo da faixa padrão A1 e trocado o embed de busca inválido do B1 por link explícito ao Spotify quando não há ID verificado;
- removida dos 32 shells A2 a instrução estática antiga “Complete a letra da música”;
- criada `tools/audit-v3-semantics.cjs`, incluindo fixture deliberadamente incompatível;
- preservadas as alterações de primeira pintura/hidratação já presentes no A2 e mudanças não relacionadas do usuário.

Fora deste recorte:

- reestruturação integral das 96 aulas A1/A2/B1;
- novo motor Student/Teacher;
- piloto completo A2 L9–10;
- nova cadência B1 lexical/conversação;
- remoção ampla de compatibilidade legada.

Próxima fatia recomendada: consolidar o contrato compartilhado de atividades e executar o piloto A2 L9–10 antes de qualquer migração em massa.

## 2026-09-05 · A1 — recuperação das Conversation Activities e avaliação de qualidade

- Reproduzida exceção em `renderHomework`: registry descartava `themes/checklist` e player ainda chamava `.map` nesses campos. O contador permanecia no estado inicial `1 / 1` porque a aula não era montada.
- Preservadas instruções, temas e checklist autorais no registry; player aceita também opções com títulos/instruções. Contratos antigos continuam explicitamente marcados como legados, sem simular migração editorial.
- Criado `tools/audit-a1-v3-browser.cjs`: 32 aulas navegadas até o homework, retorno, contador, erros de runtime, preservação de conteúdo, fixture do formato novo e viewport mobile. Serviços externos são excluídos desse teste.
- Conversation Activities: L5 15 slides, L10 18, L15/L20/L25/L30 19; consolidações L31/L32 36 cada.
- Passaram as quatro verificações mínimas V3 e o teste de navegador. Auditoria musical mantém 23 avisos de diversidade de respostas no conjunto dos níveis, 12 deles em A1.
- Inspeção visual de L5 e avaliação documentada em `docs/a1-v3-quality-review-2026-09-05.md`, com prioridades de conteúdo A1 e apresentação para aula individual online.
- Mudanças locais; publicação e validação dos serviços externos não realizadas.

## 2026-09-06 · A1 — prévia do ciclo 7–9 para tela compartilhada

- Implementadas três aulas autorais da proposta: At the Café (16 atividades), My Everyday Life (17) e A Day in My Life (13), total de 46 atividades com sequências internas de drills/perguntas.
- Criados IDs de prévia no manifesto e registro separado no registry; os 32 IDs publicados e a migração de progresso permanecem intactos.
- Novo player local com revelação individual de modelos, traduções opcionais, ocultação de personagem, destaque de leitura, foco em uma fala/trecho, índice, marcações de retomada, teclado e tela cheia.
- Homework com escolha única entre três tarefas; autoavaliação de apoio. Posição, marcações e escolhas ficam apenas na sessão da aba, em chave própria da prévia. Recarregar oculta respostas novamente. Não há sincronização com contas de alunos.
- Conteúdo e interface funcionam sem fontes, áudio ou serviços externos. O professor faz a leitura. Não houve publicação nem alteração do hub atual.
- Auditoria `tools/audit-a1-preview.cjs` cobre todas as atividades, itens de drills, revelação, papéis, tradução, índice, marcas, sessão, teclado e mobile. As quatro auditorias mínimas V3 passaram, com os avisos musicais preexistentes.
- Fontes da prévia e isolamento documentados em `docs/v3-content-source-map.md`.

## 2026-09-07 · A1 — página contínua e ampliação do piloto

- Substituída a navegação obrigatória por slides por uma página contínua, com saltos entre seções pelo índice e rodapé. As três aulas têm 12, 11 e 12 seções.
- Vocabulário, exemplos, formas verbais e Helping You aparecem abertos. Drills mostram todos os enunciados, com revelação individual ou conjunta dos modelos. Estados de resposta são isolados por seção.
- Incluídos diálogos iniciais nas três aulas; nas duas lexicais, vocabulário ampliado para 20 entradas e expressões para 10, além de explicações e drills adicionais. Textos e perguntas reunidos na mesma seção.
- Atualizada a auditoria de navegador para página contínua, controles individuais/conjuntos, traduções, papéis, índice, sessão e mobile. Inspeção visual de abertura, vocabulário e exercícios.
- Alteração restrita ao piloto; demais aulas publicadas não migradas.
- As quatro auditorias mínimas V3 passaram; permanecem os 23 avisos musicais preexistentes sobre diversidade das lacunas.

## 2026-09-07 · A1 — um slide por seção

- Atendendo à revisão do professor, cada seção volta a ocupar um slide próprio. Mantidos conteúdo ampliado, listas completas, significados abertos e revelação individual/conjunta.
- Navegação por rodapé, índice e teclado abre a seção no topo; rolagem fica restrita à seção longa. Respostas continuam preservadas ao voltar durante a aula e ocultas após recarregar.
- Auditoria ajustada para verificar isolamento dos slides, retorno com estado preservado e navegação por teclado.
- Validação: teste de navegador das três aulas e quatro auditorias mínimas passaram; inspeção visual do slide de exercícios concluída. Permanecem os 23 avisos musicais preexistentes.

## 2026-09-08 · A1 — conversação, tema e música no piloto

- Conversation Activities remodelada em 11 seções com escolhas pessoais, adivinhação por perguntas, narrativa por horários, negociação de pedidos, correção de informação e desafio sem roteiro. Removida a sequência de drills e diálogo de imitação.
- Tema claro/escuro no hub e nas aulas da prévia, com preferência persistente e preferência do sistema como padrão.
- Música imediatamente antes do homework nas duas lexicais. Vínculos explícitos por curriculumId no catálogo reutilizam The Coffee Song e Wake Me Up Before You Go-Go, com auditoria de provedor preexistente e alvos semânticos food-drink/routines-habits. Sem novos registros promovidos ou letras comerciais no repositório.
- Reutilizados MusicCloze, LyricsService e SpotifyEmbed. Player e respostas musicais preservados ao retornar ao slide; acesso direto à faixa, preparação e perguntas disponíveis mesmo sem letra.
- Quatro auditorias mínimas passaram (23 avisos musicais preexistentes). Testes de navegador cobrem tema, conversação, vínculo/posição musical, contingência offline, teclado e mobile. Consulta real ao serviço de letras retornou lyricsUnavailable neste ambiente; reprodução externa não confirmada.

## 2026-09-08 · A1 — flashcards pessoais na prévia

- Vocabulário, verbos e expressões passam a expor Salvar pelo helper compartilhado lesson-flashcard-save.js. Preservados frente, significado, exemplo e formas verbais. Categoria usa o título da aula; curriculumId explícito isola os IDs da proposta.
- Reutilizada coleção users/{owner}/myCards consumida pelo portal. Professor usa selectedStudentId; na prévia, ausência de aluno selecionado impede gravar no próprio perfil por engano. Escrita merge com ID determinístico evita duplicar a mesma entrada.
- Modal revisável, tema compatível e indicação de sucesso somente após confirmação do Firestore. Conta e internet necessárias; nenhum registro real de aluno usado nos testes.
- Validação: quatro auditorias mínimas V3 passaram; teste de navegador com Firestore simulado verificou três tipos de cartões, payload, proprietário selecionado, IDs estáveis e bloqueio sem aluno. Modal inspecionado visualmente.

## 2026-09-08 · A1 — ouvir ao lado de salvar

- Reutilizado flashcard-pronunciation.js nos termos, verbos e expressões da prévia. Ações Ouvir e Salvar agrupadas lado a lado. Voz nativa en-US, velocidade 0,9; nova reprodução cancela a anterior e mudança de slide interrompe a fala.
- Auditorias mínimas V3 passaram. Teste de navegador verifica texto/idioma enviado à API de voz e coexistência com o salvamento, usando serviços simulados.

## 2026-09-08 · A1 — infinitivos com to

- Banco de verbos da prévia apresenta to antes de cada verbo, também na pronúncia e nos dados do flashcard. Cabeçalho identifica infinitivo; exemplos, passado e particípio preservados.


## 2026-09-09 · A1 — migração integral para 38 aulas

- Decisão do professor: adotar 38 aulas, com duas lexicais e uma Conversation Activities por ciclo, mais duas consolidações. Manifesto versionado 2026.09-a1-38; 24 lexicais, 12 comunicativas e duas consolidações.
- Fatia curricular: snapshot das 32 aulas anteriores, IDs novos estáveis e equivalências explícitas de conteúdo para progresso histórico. Novas atividades comunicativas e consolidações exigem conclusão própria; nenhum fechamento automático pelo número antigo.
- Fatia de apresentação: 38 páginas oficiais ligadas ao registry e ao player compartilhado presentation.js; slide por seção, diálogos de abertura completos, bancos de vocabulário/verbos/expressões, explicações, textos e listas de questões. Referência de meses e datas recuperada do campo histórico content.
- Fatia comunicativa: situações de cadastro, estoque, compra com restrições, achados e perdidos, direções, linha do tempo, atraso e recado. Instruções adaptadas ao atendimento individual; tarefas de casa revisadas com produtos concretos de fala, escrita e cartões.
- Fatia de integração: tema persistente, Ouvir/Salvar lado a lado, infinitivos com to, finalização por ID e aluno selecionado, hub e contadores do portal atualizados para 38.
- Música: 24 vínculos explícitos no catálogo, exclusivamente lexicais e imediatamente antes do homework. Preservadas faixas, versões e auditorias de provedor anteriores; perguntas das aulas Travel Updates e I Need Some Help alinhadas à linguagem atual. Não houve inclusão de letras comerciais nem promoção de novos registros.
- Verificações: quatro auditorias mínimas aprovadas. Navegador percorreu todas as seções das 38 aulas, revelação de respostas, música/homework, infinitivos, conclusão offline e largura responsiva. Testes com Firebase simulado cobriram flashcards e progresso no aluno correto, IDs determinísticos, falta de seleção, vínculo de professor, erro de gravação, 38 cartões, bloqueios do aluno e logout. Nenhum dado real de aluno alterado.
- Inspeção visual: lexical 1, comunicativa 3, consolidação 37, homework em modo escuro e hub com 38 aulas. Capturas em artifacts/a1-preview/migration-38/.
- Limites: 23 avisos preexistentes de diversidade de lacunas permanecem. Reprodução Spotify e resposta real dos provedores de letra dependem dos serviços externos e não foram reconfirmadas nesta migração. Alterações locais, sem publicação.


## 2026-09-09 · A2 — auditoria para o formato de apresentação

- Professor confirmou a cadência lexical → comunicativa a partir do segundo módulo. Mantidas 32 aulas, 15 pares e duas consolidações; sem migração integral nesta etapa.
- Inventário dos 15 pares e navegação das 32 páginas. Relatório em docs/a2-v3-format-audit-2026-09-09.md; evidências em artifacts/a2-format-audit/.
- Corrigidos contador que usava slides anteriores à hidratação, redirecionamento após falha de gravação e instrução de clique herdada indevidamente pelo Quick Start comunicativo.
- Auditorias mínimas e específicas aprovadas. Novo teste exige contador correto e permanência na aula após conclusão recusada nas 32 páginas; serviços simulados, sem gravações reais.
- Limitação visual: Tailwind/fontes/ícones externos recusados pelo ambiente. Capturas não aprovam o layout online. Priorizar CSS local na migração e repetir a inspeção com estilos disponíveis.
