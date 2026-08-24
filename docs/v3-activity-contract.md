# Contrato de atividades V3

## Campos comuns

Toda atividade reutilizável deve conseguir declarar:

- `type`: tipo estável da atividade;
- `instruction`: ação observável para o aluno;
- `semanticTags`: temas ou funções comunicativas controladas;
- `teacherFocus`: evidência que o professor deve observar;
- `studentPrompt`: conteúdo visível ao aluno;
- `answer`, `model` ou `rubric`: apoio reservado ao professor quando aplicável;
- `source`: origem editorial do conteúdo.

Uma atividade só pode ser ligada a uma aula quando suas `semanticTags` cruzarem as `languageTags` do manifesto.

## MusicClozeV3

O contrato musical segue este fluxo:

1. previsão curta;
2. primeira escuta do trecho completo;
3. preenchimento de cinco ocorrências reais retornadas pelo provedor;
4. segunda escuta e feedback por tentativa, com opção de revelar individualmente qualquer lacuna;
5. terceira escuta opcional para itens pendentes;
6. transferência oral curta;
7. navegação direta para o homework.

O componente só recebe um registro quando `status="provider-verified"`, a flag de rollout permite e o validador confirma LRCLIB, versão Spotify na região BR e cinco descritores distintos. Na fase privada, a letra completa é buscada em runtime no LRCLIB, com Lyrics.ovh como contingência, e pode ficar apenas em `sessionStorage`. Spotify fornece áudio, não licença de letra. Não há scraping, letra inventada nem fallback textual.

Cada campo possui um botão com ícone de olho visível desde o carregamento e nome acessível `Revelar resposta da lacuna`. O primeiro clique mostra a resposta somente dentro do campo e troca o controle para olho riscado; o segundo clique oculta a resposta e restaura o valor que o aluno havia digitado. Não aparece texto auxiliar `Resposta: ...`, e a revelação não conta como acerto. O botão desaparece apenas quando a lacuna é respondida corretamente.

Os estados obrigatórios são `loading`, `ready`, `checking`, `submitted`, `partial`, `complete`, `lyricsUnavailable`, `audioUnavailable`, `draft`, `rightsBlocked` e `syncMismatch`. Falhas externas nunca impedem concluir a aula.

## Modos Student e Teacher

Na fase privada e estática, os descritores de resposta permanecem no catálogo para localizar e corrigir as cinco ocorrências no navegador; as respostas não são inseridas antecipadamente no DOM. O `TeacherMusicPanel` exige autorização explícita e não é montado nas páginas de aluno. Antes de disponibilização comercial ou pública, os descritores e a correção devem migrar para uma camada autenticada por papel para não expor o gabarito no bundle.
