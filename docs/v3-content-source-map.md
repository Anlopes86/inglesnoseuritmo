# Mapa de fontes de conteúdo V3

| Área | Fonte canônica | Camada de renderização | Evitar como fonte atual |
|---|---|---|---|
| Manifesto compartilhado | `js/v3-curriculum.js` | todos os players V3 | mapas duplicados por número |
| Plano de sessão | manifesto + dados autorais carregados | `js/v3-session-plan.js` | missões copiadas da grade antiga |
| A1 | `a1-v3/lesson-data/licao-XX.js` e `a1-v3/a1-v3-lesson-registry.js` | `js/v3-presentation.js` | `a1-v3-data.js`, `a1-v3-cadence-data.js`, editorial legado |
| A2 lexical | `a2-v3/a2-v3-template.js` | `a2-v3/a2-v3-presentation-data.js` + `js/v3-presentation.js` | perfis legados quando `disableLegacyEditorial` está ativo |
| A2 conversação | `a2-v3/a2-v3-conversation-template.js`, ligado por `sourceLesson` | `a2-v3/a2-v3-presentation-data.js` + `js/v3-presentation.js` | pares deduzidos por uma numeração antiga |
| Música A1/A2/B1 | `js/music-catalog-v3.js`, por `curriculumId` | `js/lyrics-service-v3.js` + `js/spotify-embed-v3.js` + `js/music-cloze-v3.js` | `music.lines`, mapas por número, letra persistida |
| B1 lexical e consolidações | `js/b1-v3-lessons-data.js` e `js/b1-v3-lessons-block*.js`; L1 expandida em `b1-v3/b1-v3-presentation-data.js` | L1: `js/v3-presentation.js`; demais: `js/b1-v3-lesson-player.js` | texto autoral apresentado como letra comercial |
| B1 conversação | `b1-v3/b1-v3-communicative-data.js`, com vínculo ao manifesto; perfil de L2 reaproveitado de `b1-v3/b1-v3-presentation-data.js` | `js/v3-presentation.js` | reviews geradas, blocos e adaptador antigo nas páginas comunicativas |
| B2/C1 | `js/advanced-v3-lessons-data.js` | `js/advanced-v3-lesson-player.js` | conteúdo copiado de outro nível sem contrato |

## Regra de resolução

1. Localize a aula no manifesto e obtenha seu `curriculumId` e `lessonKind`.
2. Leia os dados autorais da fonte canônica do nível.
3. Resolva atividades externas por interseção de `languageTags` e `semanticTags`.
4. Para música, exija `lessonKind="lexical"`, status publicável e posição imediatamente antes do homework.
5. Se direitos, áudio ou sincronização não estiverem confirmados, mantenha `draft` e não renderize o recurso.
6. Use IDs legados somente ao migrar progresso.

## Prévia de apresentação A1 — ciclo 7–9

A prévia da proposta de 38 aulas está isolada em `a1-v3/preview/`. O manifesto dos três IDs `a1-preview-*` está em `V3Curriculum.a1PreviewLessons`, dentro de `js/v3-curriculum.js`. Essas entradas não integram os módulos publicados nem a migração de progresso.

Os dados canônicos são `a1-v3/lesson-data/preview-at-the-cafe.js`, `preview-my-everyday-life.js` e `preview-a-day-in-my-life.js`, registrados por `A1V3LessonRegistry.registerPreview`. O player compartilhado é `js/v3-presentation.js` e a entrada para o professor é `a1-v3/preview/index.html`. Nenhum gerador editorial legado é aplicado. As duas aulas lexicais usam vínculos explícitos por curriculumId em `js/music-catalog-v3.js`, reutilizando registros provider-verified pelo ID editorial da faixa e com interseção semântica validada. MusicCloze, LyricsService e SpotifyEmbed compartilhados atendem o slide imediatamente anterior ao homework; a aula comunicativa não recebe música.

## A1: currículo de 38 aulas — 2026-09-09

As páginas oficiais licao-01.html até licao-38.html usam js/v3-presentation.js, css/v3-presentation.css e js/v3-presentation-theme.js. O registry fornece slides autorais; o manifesto fornece IDs a1-v3-38-*, títulos, tipos, dependências e tags. São 24 lexicais, 12 comunicativas e duas consolidações. A camada a1-v3-lesson-content.js é histórica e não é carregada pelas páginas atuais. A prévia usa o mesmo player com IDs isolados.

O snapshot docs/archive/a1-v3-32-content.json preserva a origem histórica. tools/migrate-a1-38.cjs documenta somente o primeiro rascunho de migração; não deve ser executado sobre as revisões editoriais atuais. Novas mudanças devem ser feitas nos arquivos individuais.

## A2: apresentação por seção — 2026-09-09

As 32 páginas oficiais usam o player, CSS e tema compartilhados com A1. O adaptador a2-v3/a2-v3-presentation-data.js converte as fontes lexicais e comunicativas em seções completas. Consolidações têm fonte própria em a2-v3/a2-v3-consolidation-template.js. São 15 pares lexical → comunicativa e duas consolidações, com IDs e dependências preservados. A camada a2-v3-lesson-content.js é histórica e não é carregada nas páginas atuais.

## B1: primeira fatia de apresentação — aulas 1 e 2

Na primeira fatia, as páginas licao-01.html e licao-02.html passaram a usar js/v3-presentation.js, CSS/tema compartilhados e b1-v3/b1-v3-presentation-data.js. Esse arquivo contém a expansão lexical e o perfil autoral de Maya; reaproveita a lexical canônica de js/b1-v3-lessons-data.js, resolvida pelo vínculo explícito legacyLessons do manifesto.

## Comunicativas A1/A2/B1 — revisão 2026-09-10/11

As 42 comunicativas têm sequências autorais próprias. Não regenerar a partir dos roteiros antigos de missão, roleplay e mudança obrigatória.

- A1: editar os 12 arquivos individuais (L3 a L36, múltiplos de três). Os demais arquivos individuais mantêm seu contrato atual.
- A2: `variedActivities` em `a2-v3/a2-v3-conversation-template.js` fornece `activities`, que o adaptador de apresentação consome diretamente. Os campos anteriores de realWorld/model fornecem textos e diálogos selecionados; rolePlay/challenge/followUp permanecem apenas por compatibilidade e não determinam a sequência atual.
- B1: todas as 15 comunicativas (L2 a L30, pares) carregam `b1-v3/b1-v3-communicative-data.js` depois de `b1-v3/b1-v3-presentation-data.js`. O registry final resolve essas aulas e preserva L1 no registry anterior. As páginas comunicativas não carregam o player, blocos ou adaptador curricular antigos. As lexicais L3–29 e as consolidações L31–32 ainda usam o formato anterior.
- O player compartilhado oferece associação (`matching`), texto com lacunas (`cloze`) e pesquisa de opinião (`survey`). Texto e opções aparecem completos; gabaritos têm revelação individual e em conjunto. Pesquisas não têm gabarito e mantêm escolhas enquanto se navega na aula. Referências factuais podem ser exibidas no próprio texto via `sources`.
- Verificar a fonte que o navegador efetivamente usa com `tools/audit-v3-communicative-variety.cjs`. O relatório `docs/v3-communicative-redesign-2026-09-11.md` registra a matriz das atividades e as referências de conhecimento geral.


## Portal e flashcards — estado após avaliação de 2026-09-12

A proposta de reformulação foi revertida a pedido do usuário. Permanecem home-aluno.html com js/student-portal-dashboard.js e css/student-portal.css; flashcards-app.html carrega js/flashcards-app.js e css/flashcards-app.css, na versão anterior. O helper js/lesson-flashcard-save.js e os registros existentes foram preservados.
