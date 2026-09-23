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

## 2026-09-09 · A2 — migração integral para apresentação por seção

- Fatia de infraestrutura: player, CSS local e tema compartilhados em js/v3-presentation.js, css/v3-presentation.css e js/v3-presentation-theme.js. A1 e A2 usam a mesma implementação, preservando os dados canônicos de cada módulo.
- Fatia lexical: 15 aulas com diálogo inicial completo, 14–19 palavras, 8–10 expressões, exemplos, explicações, verbos, leitura e prática. Slides representam seções completas.
- Fatia comunicativa: 15 aulas ligadas à lexical anterior, documentos e diálogos completos, papéis alternáveis, nova mensagem com questões e mudança de situação. Consolidações 31 e 32 com quatro missões cada. Homework com três alternativas.
- Fatia de integração: 32 páginas e hub atualizados; professor acessa todas as aulas, aluno mantém progressão. Ouvir/Salvar, infinitivos com to, tema persistente e conclusão por aluno selecionado preservados. Música exclusivamente lexical antes do homework; catálogo e estados de provedor preservados.
- Verificação: auditorias V3, semântica, música, conversação e contrato de apresentação aprovadas. Todas as seções das 32 aulas percorridas no navegador, incluindo respostas, papéis, tema, largura responsiva e falha de conclusão offline. Flashcards e portal testados com serviços simulados, sem gravações reais. Prévia A1 aprovada como regressão do player compartilhado.
- Inspeção visual: vocabulário lexical e abertura comunicativa com CSS local; capturas em artifacts/a2-presentation/migration-32/.
- Limites: alterações locais, sem publicação. Mantidos 23 avisos preexistentes da auditoria musical; reprodução e provedores externos não reconfirmados nesta migração.

## 2026-09-09 · B1 — auditoria para o padrão A2

- Analisados manifesto, fontes autorais, adaptador curricular ativo, player e 32 páginas; 393 seções percorridas. Relatório em docs/b1-v3-format-audit-2026-09-09.md e evidências em artifacts/b1-format-audit/.
- Manter 15 pares lexical/comunicativa mais oficina e avaliação. Prioridades: 15 leituras repetidas nas CAs, missões genéricas, listening de preenchimento em L2/L6/L14, duplicação integral L31/L32 e organização do repertório lexical.
- Quatro auditorias mínimas aprovadas, com 23 avisos musicais anteriores. Inspeção offline com recursos externos bloqueados; autenticação, gravações e reprodução externa não avaliadas. Nenhuma aula ou integração de produção alterada.

## 2026-09-09 · B1 — primeiro par no padrão compartilhado

- Aulas 1 e 2 migradas como fatia vertical. IDs, dependência lexical/comunicativa e catálogo musical preservados; aulas 3–32 ainda no formato anterior.
- Lexical: 16 entradas de vocabulário, seis verbos com formas e exemplos, dez expressões, diálogo inicial e leitura canônica.
- Comunicativa autoral: perfil de Maya, reconstrução cronológica, entrevista com Alex, nova mensagem e recomendação que muda com informação adicional. Sem listening genérico ou leitura duplicada da lexical.
- Player compartilhado com A2: seções completas, índice, Retomar, tema, Ouvir/Salvar e música lexical antes do homework.
- Verificação: 23 seções percorridas, respostas, papéis, infinitivos, tema persistente, largura responsiva e falha de conclusão offline aprovados. Flashcards testados com aluno selecionado, exemplos/formas, ID determinístico e falta de seleção; serviços simulados, sem gravações reais. Quatro auditorias mínimas passaram, mantendo 23 avisos musicais anteriores.
- Inspeção visual da abertura comunicativa e vocabulário lexical; evidências em artifacts/b1-presentation/pair-01/. Sem publicação ou nova validação dos provedores musicais.

## 2026-09-10 · A2 — liberação específica do V3

- Corrigido o hub A2 V3: consultava a permissão a2 em vez de a2-v3. Agora usa o ID do próprio módulo; o resolvedor compartilhado preserva a compatibilidade com liberação geral a2.
- Regressão no navegador cobre liberação a2-v3 e a2, recusa de a2-v2 isolado, outros módulos e ausência de permissão. Aluno liberado vê 32 aulas com a progressão preservada. Serviços simulados, sem mudar cadastro ou gravar dados reais.
- Captura de inspeção visual em artifacts/a2-access-fix/student-v3-grant.png. Correção local.

## 2026-09-10/11 · Comunicativas — variedade desde o A1

- Fatia A1: revisão das 12 comunicativas nos arquivos individuais. Novos textos, pistas, cartões, enquetes, associações, lacunas, descrição e conversa pessoal. Cores/objetos na L21 e mapa na L24 como estímulos visuais. Preservados manifesto, IDs e dependências.
- Fatia A2: 15 sequências autorais em `variedActivities` na fonte canônica. O adaptador consome `activities` diretamente. Reaproveitados documentos/diálogos adequados, com novas mensagens, leituras e dinâmicas. Sem obrigatoriedade de roleplay, mudança de situação ou missão final.
- Fatia B1: 15 comunicativas migradas para o player compartilhado com fonte em `b1-v3/b1-v3-communicative-data.js`. Leituras próprias e assuntos de conhecimento geral com referências primárias visíveis. L1 lexical mantém o primeiro par; demais lexicais e L31/L32 permanecem no formato anterior.
- Fatia do player: associação com opções completas, textos com lacunas e pesquisa de opinião sem gabarito. Revelação individual/coletiva e escolhas independentes preservadas ao navegar. Fontes factuais opcionais junto à leitura. Conteúdo autoral inspirado nos formatos das imagens, sem cópia dos exercícios ou uso das imagens do livro.
- Verificação: quatro auditorias obrigatórias aprovadas; teste das 42 fontes ativas integrado ao audit-v3. Navegador percorreu 38 páginas A1, 32 A2 e 16 B1. Seis amostras adicionais cobrem mapa inserido depois, novas interações, respostas, fontes, modo escuro e largura de todas as seções em celular. Inspeção visual A1 L24, A2 L22 e B1 L24, com capturas em artifacts/communicative-redesign/.
- Relatório e matriz das aulas: docs/v3-communicative-redesign-2026-09-11.md. Alterações locais, sem publicação ou gravação em cadastros reais. Permanecem 23 avisos musicais preexistentes; provedores externos não reconfirmados nesta revisão.

## 2026-09-11 · Correção do login durante a análise do painel

- Retirada a chamada de migração/promoção administrativa do login: professor pode entrar consultando somente seu perfil. Perfil inexistente retorna null; tentativas após falha não dependem de novo evento de autenticação. Adicionados prazo limite e feedback específico de conexão/permissões.
- `tools/audit-login-flow.cjs` cobre os três papéis, leitura apenas do próprio perfil, ausência de promoção, eventos concorrentes, nova tentativa, perfil ausente e erros. Teste e quatro auditorias obrigatórias aprovados. Sessão real abriu o painel local.
- Publicados exclusivamente js/login.js, js/platform-access.js e o teste em 00bd3f5beb2df9e0e9661fcca2c8cb4228757cd7. GitHub Pages concluído e arquivos públicos conferidos. Regras, permissões e cadastros preservados; revisão das aulas e análise do painel permanecem locais.
- Análise visual e de usabilidade em docs/teacher-panel-review-2026-09-11.md; nenhuma reformulação do painel aplicada nesta etapa.
# 2026-09-11 — Painel do professor: revisão local dos itens 3–6

Atualização após avaliação: restaurado o dropdown de alunos com busca, removendo a lista clicável. Registro de encontros e demais ajustes mantidos; prévia e verificações atualizadas, sem publicação.

- Busca com alunos clicáveis, resumo compacto, ajustes de celular e encontros com data, duração, observação, edição e arquivo de pacotes.
- Sem alteração curricular ou dos players; preservados os fluxos de acesso aos módulos e o progresso. Propostas 1–2 não implementadas, conforme escolha do usuário.
- Testes do histórico e quatro auditorias V3 aprovados. Conferência visual e testes interativos somente em prévia com dados fictícios. Sem publicação nesta etapa.
- Detalhes e limites em `docs/teacher-panel-review-2026-09-11.md`.


## 2026-09-12 · Portal do aluno e estudo pessoal — revisão local

- Portal com título e link direto da próxima lição V3, atalhos para cards pessoais e progresso/pacote recolhível.
- Nova biblioteca de flashcards e sessão separada, retomada no mesmo navegador, produção sem exemplo exposto, intervalos progressivos e recuperação idempotente de falhas. IDs dos cards e metadados de origem preservados.
- Fontes ativas: js/flashcards-study-app.js, js/flashcards-study-core.js e js/flashcards-extra-library.js; flashcards-app.html não carrega o aplicativo antigo.
- Teste de estudo e quatro auditorias obrigatórias aprovados. Conferência visual/interativa em dados fictícios; nenhuma publicação ou alteração em contas reais.
- Detalhes em docs/student-portal-flashcards-review-2026-09-11.md; prévia em artifacts/student-study-audit/.


## 2026-09-12 · Reversão da proposta de portal e flashcards

A pedido do usuário, restaurados integralmente home-aluno.html, flashcards-app.html, css/student-portal.css e js/student-portal-dashboard.js à versão anterior à proposta. Removidos os novos arquivos de estudo e os seus testes/gerador. As prévias foram regeneradas com a interface anterior. Correção publicada do login, painel do professor, aulas e registros reais preservados. Nenhum push necessário: a proposta descartada não havia sido publicada.


## 2026-09-12 · Correções funcionais do estudo, sem reformulação visual

Aplicadas as quatro prioridades altas aprovadas: impedir dupla avaliação, recuperar falha sem avançar, respeitar a data de revisão difícil e preservar/validar o aluno do portal nos flashcards. CSS e estrutura visual anterior mantidos. Testes isolados e quatro auditorias V3 passaram; conferência com dados fictícios. Sem publicação. Detalhes em docs/flashcards-functional-fixes-2026-09-12.md.

## 2026-09-13 · Contexto do aluno e permissões do cadastro

- Primeira fatia funcional da auditoria comercial: contexto validado por aba em js/student-context.js; painel/portal, hubs A1–C1, conclusão e salvamento de palavras transportam o aluno correto. Revalidação antes de gravar, sem confiar no papel do armazenamento local. Visual preservado.
- Regras locais restringem autoedição do aluno ao mapa progress. Módulos, pacote, contagem e demais campos administrativos deixam de ser autoeditáveis. Permissões do professor responsável e administrador preservadas.
- Testes de contexto, login, flashcards, encontros, cards/acesso A2 e quatro auditorias V3 aprovados. Navegador confirmou 166 links, progressão do aluno e salvamento para A após selecionar B em outra aba, usando somente serviços fictícios.
- Pendente: executar o novo teste de autorização no emulador. Java 21 necessário; consulta ao fornecedor bloqueada pela revisão automática por limite de uso. Não houve implantação de regras nem push. Detalhes e comandos em docs/student-context-security-fixes-2026-09-13.md.

## 2026-09-13 · Validação das permissões concluída

- Retomada autorizada: Java 21 oficial extraído apenas na pasta temporária, integridade conferida. Firestore Emulator 1.20.4 executou as regras locais com projeto demo-insr-security: 33 verificações de autorização aprovadas.
- Falha inicial de mensagens pt_BR do emulador resolvida iniciando somente o processo de teste com locale en_US. Aluno, professor responsável, outro professor, administrador, usuário sem perfil e acesso anônimo incluídos. Progresso/cards/avaliações permitidos conforme o perfil e campos administrativos protegidos.
- Pendência de validação do registro anterior encerrada. Resultado e hash das regras em artifacts/student-context-security/rules-result.json. Nenhuma publicação nem alteração em dados reais.

## 2026-09-14 · Flashcards — produção, edição, exclusão e acessibilidade

- Significado separado de formas/exemplos na produção; gravação estruturada dos novos cards das aulas, com compatibilidade dos versos antigos. IDs e conteúdo histórico preservados.
- Edição conserva procedência curricular, fila e tentativa quando o termo não muda. Exclusão pessoal remove também a avaliação de modo atômico; estatísticas desconsideram órfãos identificáveis.
- Faces acessíveis sincronizadas, Enter sem dupla virada e botões independentes. Visual anterior preservado.
- Testes funcionais e quatro auditorias V3 aprovados; 36 verificações de autorização no emulador. Conferência visual e interativa em largura móvel com dados fictícios. Permanecem os 23 avisos musicais anteriores.
- Detalhes e limites em docs/flashcards-maintenance-2026-09-14.md. Sem publicação ou alterações em contas reais; decks legados e retomada completa da sessão ficam para outra fatia.

## 2026-09-14 · Preparação do envio completo para main

- Envio de todas as alterações locais solicitado pelo usuário, incluindo aulas comunicativas, painel do professor, correções de acesso/contexto, flashcards, testes e documentação.
- Teste musical de A1 atualizado para comparar IDs e números com o manifesto de 38 aulas, eliminando a lista fixa do currículo antigo. Catálogo e seleção de músicas preservados; ambos os testes musicais aprovados.
- Login, registro de aulas, acesso A2 e auditorias finais A2 aprovados novamente antes do envio. Regras do Firestore versionadas; push no GitHub não equivale à implantação dessas regras no Firebase.

## 2026-09-14 · Decks A1/A2 V3 e atualização do teste de navegador

- Adicionados decks atuais com 744/397 cards extraídos das fontes canônicas. Filtro por aula atual, verbos com to, metadados curriculares e significado separado de exemplos. Acervo anterior preservado, sem migração de avaliações.
- Favoritos usam ID pessoal independente do catálogo; estatísticas reconhecem avaliações dos novos decks. Testes específicos, regressões de estudo/contexto e quatro auditorias V3 aprovados. Conferência em navegador isolado e largura móvel.
- Publicação de b7d5ba4 confirmada. Falha da checagem A2 identificada no teste do player antigo; entrada atualizada para a auditoria das seções atuais e Chromium portátil. Nova execução integral no GitHub pendente de envio.
- Registro completo em docs/v3-flashcard-decks-2026-09-14.md. Alterações desta fatia locais; sem alteração em cadastros reais ou novo push.

## 2026-09-14 · Retomada de sessão dos flashcards

- Sessão durável no navegador por usuário/aluno/deck: posição, fila, histórico, filtros, modo, contagem e tentativa. Biblioteca recarregada por IDs, removendo cards excluídos e invalidando respostas de cards editados.
- Pendência de avaliação recupera a fila completa e conserva o identificador da tentativa. Biblioteca indisponível não apaga a sessão. Estado antigo de pendência continua legível.
- Testes locais de sessão/manutenção/confiabilidade e conferência no navegador com recarga, falha de salvamento e fechamento/reabertura da aba. Detalhes e limites em docs/flashcards-session-resume-2026-09-14.md. Sem mudança visual, publicação ou escrita em cadastros reais.

## 2026-09-18 · A2 — expansão OHE para todas as aulas lexicais

Escopo concluído:

- replicado nas 15 aulas lexicais o ciclo `Observe → Hypothesize → Experiment` dos flashcards de expressões;
- cada expressão passa a reunir três exemplos contextualizados, uma explicação de uso e uma frase inédita em português para teste com resposta revelável;
- os `Dialog Samples` passam a vir antes da atividade de transferência e trazem duas situações desenvolvidas por aula, com pelo menos oito falas em cada uma;
- preservadas oito frases adicionais e diferentes na atividade `Transfer · Say it in English`, evitando a repetição dos testes dos flashcards;
- ampliadas as auditorias de conteúdo e de navegador para verificar o contrato OHE, a ordem didática, a extensão dos diálogos, a interação dos cards e o contraste dos personagens em modo escuro em todas as aulas lexicais.

## 2026-09-18 · A2 L3 — piloto OHE nas expressões

- A lição 3 passou a tratar as oito expressões como flashcards interativos em uma sequência Observe → Hypothesize → Experiment: exemplo inicial na frente; significado, regra e dois exemplos adicionais no verso; desafio em português com resposta revelável.
- O antigo slide redundante `Expressions in context` foi removido apenas desta fatia. O componente OHE entrou no player compartilhado de forma opt-in e as demais aulas continuam com o contrato anterior até receberem conteúdo autoral equivalente.
- Os dois diálogos de duas falas foram substituídos por duas situações de oito falas, cobrindo pedido de ajuda, rota, confirmação, pontos de referência, alternativa de transporte e duração. A sequência agora é OHE → Dialog Samples → transferência.
- O slide de tradução recebeu oito situações diferentes dos modelos e experimentos do OHE, funcionando como transferência do padrão para novos contextos.
- O tema escuro do player compartilhado passou a vincular as cores ao papel do personagem, com fundos verde e laranja escuros e texto claro de alto contraste; o segundo personagem não herda mais o fundo claro da alternância por linha. O ajuste vale para todos os diálogos renderizados pelo player.
- A auditoria de contrato verifica os oito cards completos, os 16 turnos de diálogo, ausência da duplicação, ordem pedagógica e não repetição das frases. A auditoria de navegador cobre virar card, revelar resposta, salvar/ouvir, diálogos, largura móvel e as 32 aulas A2. Evidências visuais em `artifacts/a2-presentation/migration-32/lesson-3-*.png`.

## 2026-09-18 · A2 — pilotos de prática comunicativa online

- Reestruturadas como pilotos as comunicativas 4, 14 e 26, escolhidas para testar três dinâmicas diferentes: lacuna de informação e rota, interpretação de tom e resposta de apoio, e aconselhamento com consequências.
- Cada piloto agora começa com seis alvos recuperados da lição lexical anterior — quatro obrigatórios e dois bônus — e mantém um placar clicável durante as atividades. O progresso permanece ao navegar entre os slides.
- As sequências passaram a incluir decisões guiadas, papéis separados entre aluno e professor, mudança inesperada de situação, segunda rodada para reformular uma resposta curta e saída com evidências observáveis de desempenho.
- Após a primeira revisão, os três pilotos foram recalibrados explicitamente para A1 em transição ao A2: leitura dos apoios permitida, turnos de uma a três frases, decisões por escolha, lacunas prontas e repetição com troca de apenas um detalhe. Foram removidas exigências de defender opiniões, justificar decisões longamente, improvisar sem apoio ou produzir respostas de 30–90 segundos.
- O player compartilhado recebeu componentes opt-in para o placar de linguagem e painéis de decisão; as demais comunicativas mantêm a sequência atual enquanto os pilotos são avaliados.
- As auditorias verificam a correspondência entre alvos e reciclagem lexical, a estrutura dos papéis, as mudanças de situação, as interações e a responsividade. Conferência visual realizada em desktop, celular e modo escuro; alterações locais, sem publicação.

## 2026-09-19 · A2 — numeração comunicativa e reconstrução de To Lie or Not to Lie

- Removida dos títulos a contagem paralela `Conversation Activities 1–15`. O módulo conserva apenas a numeração curricular: lexicais ímpares e comunicativas pares; a página agora identifica esta aula como `A2 · Aula 26` e `Conversation Activities · To Lie or Not to Lie`.
- A aula 26 passa a abrir diretamente com uma história curta sobre uma reserva esquecida. O aluno verifica fatos, escolhe o que faria, usa um motivo curto e aconselha o personagem interpretado pelo professor.
- Acrescentadas duas situações adultas e plausíveis: sinceridade gentil ao responder sobre uma refeição e proteção de privacidade diante de um colega insistente. A mudança de informação exige adaptar somente uma frase.
- Mantidos os seis itens de reciclagem lexical e o apoio visível, sem debate longo, resposta moral única ou exposição pessoal obrigatória. A auditoria rejeita os cenários escolares e mecânicos descartados e confirma história, escolha, role-play, nova informação e transferência.

## 2026-09-19 · A2 L4 — mapa interativo de direções

- A prática abstrata de rotas foi substituída por um mapa de cidade com oito pontos de referência, quatro ruas e três percursos numerados. As letras A e B ficam reservadas exclusivamente para origem e destino.
- O professor escolhe o percurso e pergunta como chegar; o aluno guia uma instrução curta por vez enquanto o professor acompanha com o cursor, testa um movimento incorreto e pede confirmação. Depois da tentativa, a dupla revela e compara uma rota-modelo coerente com todas as ruas percorridas.
- A linha da solução permanece oculta durante a produção. Pharmacy → Bank, Supermarket → Café e Clinic → Pharmacy variam extensão, curvas e pontos de referência, reciclando o vocabulário da lição lexical anterior com apoio visível.
- O componente compartilhado `map-route` recebeu seleção de percurso, estado reiniciado ao trocar a rota, descrição estrutural para tecnologia assistiva, identificação de idioma, layout responsivo e contraste específico no modo escuro.
- As auditorias agora verificam correspondência entre linha e resposta falada, reset do gabarito, numeração sem ambiguidade, descrição acessível, legibilidade dos nomes das ruas no celular e contraste/contornos no modo escuro. A sequência completa de 32 aulas passou em desktop, celular e tema escuro; alterações locais, sem publicação.

## 2026-09-19 · A2 L4 — reconstrução integral como simulação de cidade

- Removidos da aula 4 o placar isolado, o diálogo-modelo curto, a missão genérica e o checklist final. O mesmo mapa passou a sustentar uma experiência contínua, em vez de aparecer como uma boa atividade cercada por slides abstratos.
- A sequência agora propõe sete operações diferentes e adequadas ao A1 em transição ao A2: localizar um visitante por pistas, ordenar uma rota, guiar o professor de A até B, interromper e corrigir um caminho errado, contornar uma rua bloqueada para entregar remédio, seguir instruções em áudio sem ler a transcrição e chegar ao último ônibus antes do horário.
- Cada desafio exige uma ação oral curta e produz uma mudança visível: lugar encontrado, cartões ordenados, trajeto revelado, marcador corrigido, entrega concluída, destino identificado ou viajante deslocado. Apoios permanecem disponíveis sem exigir opinião longa ou improvisação avançada.
- O player compartilhado recebeu componentes opt-in para as sete mecânicas, síntese de voz para o desafio auditivo, estados de erro/acerto, cronômetro por movimentos e resultados responsivos. No modo escuro, marcadores e estados de sucesso têm contraste próprio.
- A auditoria de navegador cobre todas as interações e percorre novamente as 32 aulas em desktop, celular e tema escuro. A mudança continua local, sem publicação.

## 2026-09-19 · A2 L4 — correção de falsa variedade

- A versão anterior foi reavaliada após feedback: telefone, cartões, bloqueio, áudio e relógio mudavam a aparência, mas seis atividades repetiam a mesma operação de localizar ou percorrer um caminho no mapa.
- A aula passa a ter somente uma atividade de mapa. As demais cinco mudam informação recebida, operação mental, papel social e produto oral: reformular um pedido inadequado, extrair dados de uma mensagem de voz, investigar um estabelecimento secreto com perguntas, decidir o transporte usando duração e restrições, e transmitir um compromisso que o professor precisa identificar.
- A sequência ativa agora é `polite-help → voice-note → secret-place → city-map → travel-desk → meeting-message → homework`. Os seis tipos de atividade de sala são diferentes; o mapa não é reutilizado como fundo para listening, correção, decisão ou fechamento.
- Os novos componentes mantêm turnos curtos adequados ao A1 em transição ao A2, apoio visível, papéis claros para professor e aluno e resultados observáveis. Áudio tem contingência textual; tarefas secretas orientam quem deve desviar o olhar; nenhuma exige opinião longa.
- As auditorias rejeitam explicitamente os antigos reskins de mapa na L4, exigem exatamente um `map-route`, exercitam cada interação e verificam celular, tema escuro e contraste. Alterações locais, sem publicação.

## 2026-09-20 · A2 L6 — MoveLab de esportes e rotina possível

- Reconstruída a aula comunicativa 6 como uma sequência de cinco operações diferentes, sem repetir as estruturas genéricas de enquete, leitura, associação e conversa aberta: classificar `play / go / do`, interpretar duas curiosidades reais, representar um diálogo, responder como treinador e montar uma agenda de duas sessões.
- Os textos curtos apresentam o `rajio taiso` no Japão e a participação de caminhantes no parkrun, com perguntas de evidência, inferência de `warm up` e `at your own pace`, transferência para outra frase e links para as fontes oficiais.
- O diálogo passou a ter oito falas curtas. O desafio de treinador limita cada resposta do aluno a uma frase e mostra a reação do participante; a agenda cria uma lacuna real de informação entre professor e aluno, aceita mais de um primeiro plano e exige replanejamento quando a aula de terça fica lotada.
- A produção foi calibrada para A1 em transição ao A2: apoios visíveis, personagem fictícia, escolhas verificáveis, ausência de `should` antes de sua introdução curricular e resultado final de três frases. A aula recicla oito itens da L5, incluindo `How good are you at...?`, `twice a week`, `warm up`, `get in shape` e `take a break`.
- O player compartilhado recebeu quatro componentes opt-in, com cartão privado, feedback, progressão, estados acessíveis e layouts responsivos em modo claro e escuro. As auditorias de apresentação, variedade, semântica, música e conversação passaram; a auditoria das 32 aulas percorreu todos os novos cliques, celular e tema escuro sem erro de JavaScript ou overflow. Alterações locais, sem publicação.

## 2026-09-21 · A2 L8, L10 e L12 — mídia, sabores e serviço de restaurante

- A aula 8 foi reconstruída como um pequeno estúdio de mídia: o aluno monta um feed de interesses, formula uma hipótese sobre o fenômeno norueguês de *slow TV*, lê um diálogo de oito falas, edita três resenhas exageradas com evidências e recomenda uma opção para um perfil que muda. O relato cultural traz links para a Biblioteca Nacional da Noruega e o Guinness World Records.
- A aula 10 agora alterna percepção visual de seis sabores, reconstrução de uma história cultural curta do fish and chips, diálogo, corrente oral de concordância e uma negociação com cartões privados para montar uma bandeja compartilhada. A história tem fonte do London Museum e as ilustrações vetoriais são locais, sem depender de imagens externas.
- A aula 12 passou a formar uma única experiência de restaurante: preparar a mesa, distinguir preferência de alergia, consultar a cozinha sem prometer segurança, decodificar um ticket fictício e corrigir duas cobranças antes de pedir contas separadas. O resultado do checkpoint avalia a comunicação e mantém explicitamente o prato como não confirmado; as orientações estão ligadas à Food Standards Agency e à FDA.
- Nas três aulas, cada slide de sala executa uma operação diferente, usa fala curta e apoio visível para A1 em transição ao A2 e produz uma mudança observável na tela. Diálogos têm oito turnos e recuperam o léxico da aula ímpar anterior.
- O player recebeu doze componentes opt-in com estado, reset, feedback e ilustrações SVG; as auditorias estruturais e de variedade foram ampliadas para os contratos das três aulas. Alterações locais, sem publicação.

## 2026-09-21 · A2 L2 — viagem contada por pistas e imagens

- Substituída a sequência genérica de conversa, leitura, associação e enquete por cinco operações: investigar uma mala secreta, adaptar um passeio à mudança do clima, observar um diálogo bilíngue de oito falas, corrigir legendas que contradizem as imagens e montar um cartão-postal de voz de vinte segundos.
- O primeiro desafio cria uma lacuna de informação real sem expor um gabarito na tela compartilhada: o sistema sorteia a mala internamente, libera somente as respostas das perguntas feitas pelo aluno e revela o dono apenas depois do palpite. O aluno tem até três perguntas curtas antes de identificar a mala. As atividades seguintes usam escolhas visíveis e falas-modelo, sem exigir relato pessoal ou resposta longa.
- A linguagem recuperada vem da L1, incluindo `trip`, `foggy`, `at least`, `take a picture`, `most of the time`, `the whole time`, `take a trip` e `have a picnic`; perguntas sobre viagem e clima permanecem como estruturas de apoio já apresentadas na aula lexical.
- Todos os cenários e imagens são autorais e fictícios. O player usa ilustrações SVG locais de malas, clima, fotos e cartão-postal, sem dependência de mídia externa. A auditoria de navegador confirma que os nomes dos três viajantes não aparecem antes do palpite e que as 32 aulas continuam funcionais em desktop, celular e modo escuro. Alterações locais, sem publicação.

