# Mapa de fontes de conteúdo V3

| Área | Fonte canônica | Camada de renderização | Evitar como fonte atual |
|---|---|---|---|
| Manifesto compartilhado | `js/v3-curriculum.js` | todos os players V3 | mapas duplicados por número |
| Plano de sessão | manifesto + dados autorais carregados | `js/v3-session-plan.js` | missões copiadas da grade antiga |
| A1 | `a1-v3/lesson-data/licao-XX.js` e `a1-v3/a1-v3-lesson-registry.js` | `js/v3-presentation.js` | `a1-v3-data.js`, `a1-v3-cadence-data.js`, editorial legado |
| A2 lexical | `a2-v3/a2-v3-template.js` | `a2-v3/a2-v3-presentation-data.js` + `js/v3-presentation.js` | perfis legados quando `disableLegacyEditorial` está ativo |
| A2 conversação | `a2-v3/a2-v3-conversation-template.js`, ligado por `sourceLesson` | `a2-v3/a2-v3-presentation-data.js` + `js/v3-presentation.js` | pares deduzidos por uma numeração antiga |
| Música A1/A2/B1 | `js/music-catalog-v3.js`, por `curriculumId` | `js/lyrics-service-v3.js` + `js/spotify-embed-v3.js` + `js/music-cloze-v3.js` | `music.lines`, mapas por número, letra persistida |
| B1 | `js/b1-v3-lessons-data.js` e `js/b1-v3-lessons-block*.js` | `js/b1-v3-lesson-player.js` | texto autoral apresentado como letra comercial |
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

As páginas licao-01.html e licao-02.html usam js/v3-presentation.js, CSS/tema compartilhados e b1-v3/b1-v3-presentation-data.js. Esse arquivo contém a expansão lexical e a comunicativa autoral; reaproveita a lexical canônica de js/b1-v3-lessons-data.js, resolvida pelo vínculo explícito legacyLessons do manifesto. Não carrega v3-curriculum-adapters.js nem o player antigo. Aulas 3–32 continuam nas fontes block e no adaptador curricular ativo, renderizadas por js/b1-v3-lesson-player.js. Não aplicar o gerador de revisão legado às duas aulas migradas.
