# Piloto de letras musicais — Conversation 49–64

## Escopo

- 16 aulas e 48 músicas.
- Três atividades de letra por aula, montadas somente quando o respectivo slide é aberto.
- Exatamente cinco lacunas por faixa.
- Uso privado do curso; publicação comercial das letras permanece não aprovada.

## Fontes e responsabilidades

- `conversation-lessons-49-64-data.js`: conteúdo editorial e perguntas de conversação.
- `conversation-music-catalog-49-64.js`: IDs LRCLIB, metadados mínimos e cinco descritores `answer + occurrence`; nunca contém letras.
- `../js/lyrics-service-v3.js`: busca a letra real em runtime, mantém cache apenas em `sessionStorage`, resolve as ocorrências e corrige respostas.
- `conversation-music-cloze.js`: interface em inglês, revelação individual, feedback e passagem para a discussão.
- `conversation-lessons-runtime.js`: runtime unificado 1–64; monta a atividade de forma preguiçosa no slide musical e preserva o contrato verificado de 49–64.

## Regra de segurança editorial

Uma entrada só pode ficar `provider-verified` quando tiver um ID LRCLIB confirmado e cinco posições distintas. Divergência de metadados ou de ocorrência produz `syncMismatch`; indisponibilidade de rede produz `lyricsUnavailable`. Nos dois casos, o aluno pode continuar sem penalidade.

Por autorização explícita do responsável pelo produto em 2026-09-02, entradas `draft-until-provider-match` também podem exibir o embed Spotify e buscar letras em runtime. Essa visibilidade não altera o status editorial, não conta como verificação humana e não permite persistir letras comerciais no repositório.

## Expansão para as lições 1–48

Antes de expandir, validar este piloto com alunos e confirmar:

1. correspondência prática entre o áudio escolhido no embed e a letra do LRCLIB;
2. dificuldade e qualidade pedagógica das cinco palavras;
3. desempenho em celular e em conexões lentas;
4. política de licenciamento antes de qualquer publicação comercial.

## Verificação

```text
node conversation/audit-lessons-49-64.cjs
node conversation/audit-conversation-music-cloze.cjs
node conversation/conversation-music-cloze.test.cjs
```
