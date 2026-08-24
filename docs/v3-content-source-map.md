# Mapa de fontes de conteúdo V3

| Área | Fonte canônica | Camada de renderização | Evitar como fonte atual |
|---|---|---|---|
| Manifesto compartilhado | `js/v3-curriculum.js` | todos os players V3 | mapas duplicados por número |
| Plano de sessão | manifesto + dados autorais carregados | `js/v3-session-plan.js` | missões copiadas da grade antiga |
| A1 | `a1-v3/lesson-data/licao-XX.js` e `a1-v3/a1-v3-lesson-registry.js` | `a1-v3/a1-v3-lesson-content.js` | `a1-v3-data.js`, `a1-v3-cadence-data.js`, editorial legado |
| A2 lexical | `a2-v3/a2-v3-template.js` | `a2-v3/a2-v3-lesson-content.js` | perfis legados quando `disableLegacyEditorial` está ativo |
| A2 conversação | `a2-v3/a2-v3-conversation-template.js`, ligado por `sourceLesson` | `a2-v3/a2-v3-lesson-content.js` | pares deduzidos por uma numeração antiga |
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
