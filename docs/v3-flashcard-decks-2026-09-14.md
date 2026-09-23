# Decks de flashcards alinhados ao V3

Fatia local: A1 e A2. A tela conserva seus componentes e o formato de estudo. Dois decks novos usam as palavras, expressões e verbos das fontes atuais: 744 cards no A1 e 397 no A2. O filtro mostra número e título da aula. As 38/32 aulas são o tamanho dos currículos; os cards estão nas 24/15 aulas lexicais que contêm seções de vocabulário. Comunicativas e consolidações sem essas seções não recebem cards artificiais.

## Origem e manutenção

O gerador carrega o manifesto, o registry/arquivos individuais A1 e os templates/adaptador A2 em ambiente isolado. Extrai apenas as seções cards/verbs, como o player. Nunca extrai letras, gabaritos de atividades ou conteúdo do catálogo antigo. Verbo-base recebe “to”; significado, exemplo e formas ficam em campos separados. O verso completo coincide com o formato salvo pela aula.

Execute `node tools/build-v3-flashcard-decks.cjs` após uma alteração nessas seções. Os dois JSONs são derivados, não fontes editoriais. `audit-v3.cjs` verifica a igualdade com a geração atual e falha se o deck ficar desatualizado. IDs usam currículo, seção e termo, sem índice de linha, tradução ou exemplo; mudanças de ordem ou exemplos não zeram avaliações. Mudança de termo gera um novo ID.

## Dados pessoais e compatibilidade

- Acervo A1/A2 anterior continua com a chave A1, arquivo e IDs anteriores. Nenhum card ou avaliação antiga foi migrado ou apagado.
- Decks atuais usam A1_V3/A2_V3 e prefixo v3fc_. Avaliações deles são contabilizadas mesmo sem favorito pessoal correspondente.
- Salvar um favorito cria um card pessoal com ID próprio e conserva módulo, curriculumId, número e título. Excluir esse favorito não remove a avaliação do card do catálogo.
- Avaliações antigas não são transferidas automaticamente por semelhança de palavras. Não se presume equivalência entre edições ou entre estudo no deck e estudo do favorito.
- Mantido o comportamento de acesso da biblioteca de flashcards: este ajuste não adiciona bloqueio por módulo ao catálogo. Favoritos e avaliações continuam pertencendo ao aluno autenticado/validado. As restrições das páginas das aulas não foram alteradas.

## Testes e publicação

Testes de decks, manutenção, confiabilidade e contexto aprovados; quatro auditorias V3 aprovadas com os 23 avisos musicais preexistentes. Prévia isolada conferiu A1/A2, filtro da aula 7, produção sem exemplo revelador e salvamento de favorito. Layout A2 conferido com viewport 390×844, largura útil 375 px sem transbordamento. Não é teste em telefone físico.

O push anterior b7d5ba4 publicou o site com sucesso. Sua verificação A2 falhou porque a entrada antiga procurava .slide/a2-content-ready, ausentes no player atual. A entrada agora encaminha ao teste das seções atuais, com Chromium fornecido pelo Playwright (ou CHROME_PATH explícito) e evidências em caso de erro. A aula 1 foi percorrida nas 13 seções no navegador, com música antes do homework. A execução completa das 32 aulas no GitHub ainda depende do próximo envio; não foi declarada aprovada nesta fatia.

Nenhum novo push, implantação de regras ou alteração em cadastros reais nesta etapa. Próximos itens independentes: B1/B2/C1, retomada completa da sessão e equivalências de respostas no modo de produção.
