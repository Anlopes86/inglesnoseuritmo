# Regras de manutenção do curso V3

## Escopo

Estas regras valem para os módulos `a1-v3`, `a2-v3`, `b1-v3`, `b2-v3`, `c1-v3` e para os arquivos compartilhados que os alimentam.

## Fontes de verdade

- Consulte `docs/v3-content-source-map.md` antes de alterar conteúdo de aula.
- O manifesto curricular é `js/v3-curriculum.js`; títulos, tipos, IDs, dependências e tags semânticas devem permanecer coerentes com ele.
- A fonte única de curadoria musical é `js/music-catalog-v3.js`; letras em runtime usam `js/lyrics-service-v3.js`, o player usa `js/spotify-embed-v3.js` e a atividade compartilhada é `js/music-cloze-v3.js`.
- A1 usa o registry e os arquivos individuais em `a1-v3/lesson-data/`.
- A2 lexical usa `a2-v3/a2-v3-template.js`; A2 conversação usa `a2-v3/a2-v3-conversation-template.js`.
- B1 usa `js/b1-v3-lessons-data.js`, os arquivos `js/b1-v3-lessons-block*.js` e `js/b1-v3-lesson-player.js`.
- Não reative geradores editoriais legados quando a camada atual declara `disableLegacyEditorial: true`.

## Invariantes editoriais

- Missão e música precisam ter interseção explícita com `languageTags` da aula.
- Música só pode existir quando `lessonKind === "lexical"`, ligada pelo `curriculumId`, e deve ser inserida imediatamente antes do homework.
- Um registro musical só pode sair de `draft-until-provider-match` para `provider-verified` quando LRCLIB, versão exata do Spotify, região BR e cinco ocorrências distintas forem auditados. Draft não aparece na Student View.
- Na fase privada, a letra pode vir do LRCLIB em runtime, com Lyrics.ovh como contingência e cache somente em `sessionStorage`. Antes de uso comercial/público, revisar licenciamento e mover gabarito/correção para uma camada autenticada.
- Nunca selecione conteúdo apenas pelo número antigo da lição.
- Não apresente texto autoral como letra de música comercial e não inclua letras comerciais no repositório.
- Placeholders, avisos de bastidor e instruções incompatíveis com aula particular não podem chegar à interface do aluno.
- Prefira corrigir player, template ou manifesto quando o defeito se repete em várias aulas.
- Migre em fatias verticais pequenas e registre cada etapa em `docs/v3-migration-log.md`.

## Verificação mínima

Depois de uma alteração V3, execute:

```text
node tools/audit-v3.cjs
node tools/audit-v3-semantics.cjs
node tools/audit-v3-music.cjs
node a2-v3/audit-conversation-lessons.cjs
```

Também valide visualmente ao menos uma aula afetada de cada player alterado.
