# Prévia A1 — como usar

Abra `a1-v3/preview/index.html` no navegador e escolha uma aula. O conteúdo autoral funciona localmente, sem instalação ou login. Música e letras precisam de internet e dos respectivos provedores. A numeração 7–9 corresponde ao currículo oficial de 38 aulas. Esta prévia mantém IDs próprios para comparação.

- Cada slide apresenta uma seção completa. Avance pelo rodapé, pelas setas do teclado ou pelo índice; role quando uma seção for longa. Vocabulário, exemplos e explicações já aparecem abertos; traduções do vocabulário podem ser ocultadas em conjunto.
- Nos drills, todas as frases aparecem em lista. Revele cada modelo após a resposta oral, ou use Revelar todos os modelos para conferir o conjunto. O rodapé permite saltar entre seções.
- As aulas lexicais começam com um diálogo de introdução completo; a Conversation Activities abre com escolhas pessoais e usa jogos e situações. Nos diálogos, ocultar A/B, destacar e mostrar uma fala por vez são recursos opcionais.
- Os textos aparecem completos, com perguntas logo abaixo. Traduções e leitura por trecho são opcionais.
- Marque Retomar e abra Atividades para filtrar o que deseja revisar.
- Setas esquerda/direita navegam entre atividades. Tab e Enter operam os botões; Escape fecha o índice.
- Tela cheia amplia a apresentação quando o navegador permite.
- A posição e as escolhas são lembradas apenas na sessão desta aba. Reiniciar esta aula limpa esses dados da prévia. Nada é registrado como progresso oficial do aluno.

O conteúdo exibido é visível a quem acompanha a tela; não há painel privado de gabarito. Nas conversas abertas, o modelo é uma resposta possível. O professor conduz a leitura; áudio gravado não faz parte deste piloto.

## Verificação

`node tools/audit-a1-preview.cjs`

Requer Playwright instalado e Chrome disponível. `CHROME_PATH` permite escolher outro executável Chromium; fora do Windows, usa o Chromium do Playwright. Capturas e medidas ficam em `artifacts/a1-preview/` ou em `A1_PREVIEW_ARTIFACTS`.

As 38 aulas já usam este formato em a1-v3/licao-01.html até licao-38.html. O percurso completo fica em a1-v3/a1-v3.html.

O botão Modo escuro/claro aparece no hub e nas aulas e lembra a preferência neste navegador. As aulas lexicais encerram com Music Moment antes do homework: faixa do catálogo auditado, cinco lacunas em runtime e perguntas de aplicação pessoal. Acesso direto ao Spotify e perguntas permanecem disponíveis se a letra falhar.

Flashcards: use Salvar no vocabulário, verbos ou expressões. Revise frente, verso e categoria antes de confirmar. Professor deve selecionar o aluno pelo painel existente; aluno autenticado salva no próprio perfil. O destino é o mesmo myCards do portal. Essa integração precisa de conexão e login na mesma origem; a prévia local não herda automaticamente a sessão do site publicado.
