# Arquitetura do curso V3

## Fluxo de dados

O manifesto `js/v3-curriculum.js` declara a identidade estável de cada aula: módulo, número atual, título, tipo, `lessonKind`, foco linguístico, dependências e `languageTags`. Os dados autorais de cada nível complementam esse manifesto. O catálogo musical `js/music-catalog-v3.js` se liga somente pelo `curriculumId`. O player renderiza a união dessas camadas; `js/v3-session-plan.js` acrescenta comportamentos compartilhados depois da hidratação.

```text
manifesto atual + dados autorais atuais
                 ↓
       curriculumId + languageTags
                 ↓
 catálogo + LyricsServiceV3 + SpotifyEmbedV3
                 ↓
             MusicClozeV3
                 ↓
         player/template do nível
                 ↓
           interface da aula
```

O número da lição serve para localizar a entrada atual, mas não pode ser a única regra de associação para missões, músicas ou atividades. Esses recursos precisam declarar tags e cruzá-las com as tags atuais da aula.

## Responsabilidades

- `js/v3-curriculum.js`: manifesto, IDs, `lessonKind`, progresso compatível, tags, dependências e resolvedores compartilhados.
- `js/music-catalog-v3.js`: 54 recomendações, cinco descritores, versão, faixa, rollout piloto e bloqueios de publicação.
- `js/lyrics-service-v3.js`: LRCLIB primeiro, Lyrics.ovh como contingência, timeout, um retry em 429, seleção de candidato, tokenização e cache temporário.
- `js/spotify-embed-v3.js`: valida o `spotifyTrackId` de 22 caracteres e monta somente o embed oficial da faixa exata.
- `js/music-cloze-v3.js`: ProviderLyricsAdapter, MusicClozeActivity, TeacherMusicPanel e estados resilientes.
- Dados autorais do nível: conteúdo pedagógico específico, missões e contratos comunicativos.
- Players/templates: apresentação, interação e uso dos contratos; não devem armazenar uma segunda grade curricular.
- `js/v3-session-plan.js`: recursos compartilhados de sessão e injeção de missão já resolvida pelo manifesto.
- `tools/audit-v3*.cjs`: validação estrutural, pedagógica e semântica.

## Compatibilidade legada

`legacyLessons` e `legacyIds` existem apenas para reconhecer progresso anterior. Eles não autorizam o player a buscar conteúdo, títulos, missões ou músicas na sequência antiga.

## Estado da migração

A curadoria musical cobre 24 aulas A1, 15 A2 e 15 B1. Os 54 registros estão em `draft-until-provider-match`: nenhum é enviado à Student View enquanto correspondência LRCLIB, versão Spotify brasileira e cinco ocorrências reais não forem confirmadas. Doze aulas possuem flag de piloto. O B1 segue o ciclo lexical ímpar + laboratório comunicativo par; as aulas 31–32 continuam como projeto.
