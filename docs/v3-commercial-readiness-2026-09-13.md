# Auditoria de prontidão comercial — curso V3

Análise realizada em 12–13 de setembro de 2026. Escopo: A1, A2, B1, B2 e C1 V3; apresentação das aulas; portal, flashcards e serviços compartilhados necessários à operação. **Parecer: o conjunto A1–C1 ainda não está pronto para ser vendido como uma solução V3 concluída.** Há uma base aproveitável, sobretudo em A1/A2, mas existem bloqueios funcionais, editoriais e de publicação.

Esta etapa produziu diagnóstico, inventário e reproduções isoladas. Não alterou conteúdo, aparência, permissões, alunos ou publicação. As melhorias de portal/flashcards anteriormente rejeitadas não foram retomadas.

## 1. Critério utilizado

A referência é o método aprovado: aula particular conduzida pelo professor por compartilhamento de tela; seções em slides, conteúdo completo dentro da seção, leitura pelo professor e depois pelo aluno, respostas reveladas após a tentativa. A1 tem duas lexicais e uma comunicativa por ciclo; do A2 em diante, uma lexical seguida de uma comunicativa. As comunicativas precisam oferecer assuntos interessantes, repertório cultural e tarefas variadas, com textos originais e reaproveitamento da linguagem anterior.

Também fazem parte do produto: diálogo inicial, vocabulário e explicações substanciais, verbos no infinitivo com “to”, ouvir e salvar, modo escuro, música nas lexicais imediatamente antes do homework e flashcards utilizáveis no celular. O desenho atual do portal deve ser preservado.

“Pronto para comercializar” exige distinguir duas ofertas: aulas particulares acompanhadas por você e licenciamento da plataforma para outros professores. A segunda também depende de provisionamento, planos, limites e cancelamentos confiáveis. A existência de 166 páginas ou de descritores CEFR não prova que um aluno alcançará C1 no tempo anunciado.

## 2. O que foi verificado e o que permanece em aberto

Foi feito inventário das **166 páginas**, dos cinco manifestos, dos players efetivamente carregados, dos scripts compartilhados e dos registros musicais. Foram executadas 12 verificações automatizadas existentes; dez passaram e duas falharam. O inventário não encontrou referências locais ausentes em `src`/`href` das páginas de lição. Essa verificação não cobre todos os links criados dinamicamente, arquivos externos ou disponibilidade de serviços.

Houve inspeção de interface em A1 L3, A2 L3/L30, B1 L3/L18, B2 L1, C1 L3 e na prévia isolada de flashcards. Foram examinados diálogos, leitura, gramática, vocabulário, verbos e revelação conforme a amostra. Nos flashcards foi utilizada largura de 390 px e dados fictícios. Também foi reproduzida, em memória e sem gravação, a seleção incorreta de aluno no progresso.

**Limites:** não houve revisão humana de cada frase das 166 aulas, teste completo de cada lição no navegador, auditoria de plágio, certificação CEFR, teste de carga, teste em iPhone/Android físicos ou alteração de conta real. Regras do Firestore foram analisadas no repositório; não foi comprovado que sejam as mesmas atualmente implantadas. Não foram validados contratos/licenças privados, ambiente de pagamento ou recuperação real de backup. A consulta pública ao site não foi concluída pela ferramenta web; não confundo o resultado local com o estado publicado.

Base Git observada: `00bd3f5` — correção de login. Há alterações locais ainda não incluídas nesse commit, inclusive a revisão comunicativa recente e correções funcionais dos flashcards. Um teste local aprovado não demonstra que a mesma versão esteja no site.

## 3. Situação por módulo

| Módulo | Currículo | Formato efetivo | Música | Avaliação |
|---|---|---|---|---|
| A1 V3 | 24 lexicais, 12 comunicativas, 2 consolidações | 38/38 no player novo | 24 lexicais mapeadas | Mais próximo da proposta; precisa de revisão final e fechamento dos pontos compartilhados |
| A2 V3 | 15 lexicais, 15 comunicativas, 2 consolidações | 32/32 no player novo | 15 lexicais mapeadas | Mais próximo da proposta; exemplos de verbos, títulos e validação editorial pendentes |
| B1 V3 | 15 lexicais, 15 comunicativas, 2 projetos | 16 no player novo e 16 no anterior | 15 lexicais mapeadas | Migração incompleta; L1 e comunicativas novas, demais lexicais/projetos antigos |
| B2 V3 | 15 lexicais, 15 comunicativas, 2 projetos | 32 no player avançado anterior | Nenhuma | Necessita revisão editorial substancial e adequação funcional |
| C1 V3 | 15 lexicais, 15 comunicativas, 2 projetos | 32 no player avançado anterior | Nenhuma | Necessita revisão editorial substancial e adequação funcional |

São **86 páginas no player novo e 80 nos anteriores**. Um player diferente não seria, por si só, um defeito; aqui ele acompanha diferenças reais de conteúdo, controles e metodologia.

Fontes: [mapa editorial](v3-content-source-map.md), [inventário por lição](../artifacts/commercial-readiness/inventory.json), [manifesto](../js/v3-curriculum.js).

## 4. Bloqueios antes do lançamento

### C01 — Cadastro permite ao aluno editar campos de acesso e comerciais

**Prioridade crítica; confirmado no código das regras.** Em `firestore.rules`, a atualização do próprio documento de aluno preserva apenas `role` e `teacherId`. Os demais campos não são limitados por uma lista de alterações permitidas. Ao mesmo tempo, `modules`, `studentType` e `accessibleProducts` controlam acesso; pacote e contagem de aulas também ficam no documento.

Consequência: se essas regras estiverem implantadas, um aluno autenticado pode alterar campos que deveriam ser exclusivos do professor/administrador, mesmo sem existir botão para isso na tela. Isso não equivale a conseguir virar administrador: o papel está protegido. O problema é a autorização dos outros campos.

**Correção necessária:** definir campos editáveis pelo aluno, proteger contratação/liberação/financeiro e testar operações permitidas e negadas no emulador. Separar dados de estudo dos dados comerciais quando adequado. Validar também limites e formatos de progresso/ratings, que hoje têm validação parcial.

**Aceite:** aluno salva seus cards e progresso permitido, mas não libera módulos, altera pacote, muda vínculo ou lê/escreve dados alheios. Professor só gerencia seus alunos. Comparar regras versionadas com as implantadas.

Evidência: [regras](../firestore.rules), linhas 98–110; [resolução dos módulos](../js/platform-access.js), linha 95.

### C02 — Progresso e salvamento de palavras não fixam o aluno por aula/aba

**Prioridade crítica operacional; progresso reproduzido sem banco real.** `progress-manager.js` usa `localStorage.selectedStudentId`; `lesson-flashcard-save.js` também resolve o destinatário pela seleção global e por um papel guardado no navegador.

Cenário: o professor abre uma aula para A, seleciona B em outra aba e volta à aula anterior. A conclusão pode ser gravada para B. A validação de vínculo não impede isso se A e B forem alunos do mesmo professor. Na reprodução, com `studentId=student-a` na URL e seleção global B, o progresso resolveu B.

**Correção necessária:** transportar um contexto explícito de aluno desde o painel até a lição, fixá-lo na aba e validar o usuário/papel/vínculo antes de cada gravação. Aplicar o mesmo contrato a conclusão, palavras salvas e retorno ao portal. A correção recente na página de flashcards não resolve automaticamente os helpers das lições.

**Aceite:** duas abas com alunos diferentes salvam exclusivamente para seus respectivos alunos; troca de seleção em outra aba não redireciona uma gravação. Perfil inválido ou aluno não selecionado produz mensagem clara e não grava.

Evidência: [progresso](../js/progress-manager.js), linha 43; [salvar na lição](../js/lesson-flashcard-save.js), linha 17; [reprodução](../artifacts/commercial-readiness/context-reproduction.json).

### C03 — Conteúdo pago e gabaritos continuam em arquivos estáticos

**Prioridade alta para área de membros.** As páginas carregam conteúdo e respostas em JavaScript distribuído ao navegador. Os carregadores das lições não apresentam uma barreira de autorização equivalente à proteção do banco. Bloquear um cartão de módulo na interface não protege os arquivos da aula.

**Correção necessária:** decidir quais conteúdos serão públicos e quais serão autenticados; proteger a entrega de conteúdo restrito e de gabaritos por uma camada de servidor com verificação de acesso. Não há promessa de impedir cópia por um aluno autorizado, mas é possível impedir acesso anônimo ao material reservado. A proteção de dados pessoais do Firestore é um assunto separado.

**Aceite:** uma sessão sem acesso não recebe conteúdo restrito nem gabarito reservado, inclusive por URL direta. Revogação de acesso tem comportamento documentado e testado. Este parecer é arquitetural; não foi feito teste de invasão no ambiente publicado.

### C04 — Música tem correspondência técnica, mas não autorização comercial registrada

**Bloqueio explícito do próprio projeto.** Há 54 registros `provider-verified`, com identificadores, região BR e cinco ocorrências registradas. Porém o catálogo mantém `displayLicensed: false`, `commercialPublicationApproved: false` e escopo `private-course-runtime`. A verificação automatizada conferiu esses registros; não realizou nova escuta das 54 faixas.

O [AGENTS.md](../AGENTS.md) exige: “Antes de uso comercial/público, revisar licenciamento e mover gabarito/correção para uma camada autenticada.” A pendência se aplica diretamente à comercialização solicitada. O [contrato de atividades](v3-activity-contract.md) registra a mesma restrição.

**Correção necessária:** manter a importância pedagógica da música, mas escolher e documentar uma forma autorizada de uso de gravação e letra; resolver exibição/reprodução, exercício derivado, acesso do aluno e transmissão durante a aula. Acesso a LRCLIB/Lyrics.ovh ou assinatura pessoal de streaming não constitui, por si, prova de licença para distribuir letras em um curso pago.

O embed tem termos próprios, inclusive divulgação sobre dados/cookies; não se deve aplicar indiscriminadamente uma regra do Web Playback SDK a um simples widget. Ainda assim, a licença do widget não resolve todos os direitos sobre letras e uso durante aulas. Verificar o caso concreto com os titulares/provedor e orientação jurídica. [Termos de widgets Spotify](https://developer.spotify.com/documentation/embeds/terms), [uso público/comercial](https://support.spotify.com/us/article/spotify-public-commercial-use/).

**Aceite:** documentação de direitos para a solução escolhida, gabarito protegido conforme o contrato, tratamento de indisponibilidade e funcionamento validado no Brasil. B2/C1 precisam de curadoria própria para suas 30 lexicais; não reutilizar faixas apenas por número antigo de aula.

### C05 — B2/C1 contêm modelos linguísticos inadequados e conteúdo gerado repetitivamente

**Bloqueio editorial confirmado no código e na interface.** O gerador avançado usa modelos de frase que inserem chunks sem verificar sua função gramatical. Em C1 L3, aparece: “Would appear to, the team should verify the evidence before deciding.” A expressão está incompleta nesse uso. Uma tradução explicativa não corrige o inglês apresentado.

Em B2 L1, “Conferir modelo” para a pergunta sobre o problema comunicativo revela uma instrução para separar fatos e perspectivas, em vez de uma resposta contextualizada. Explicações de gramática, diálogos, significados de chunks e tarefas reutilizam a mesma construção entre diferentes tópicos. Os significados incluem rótulos genéricos como “bloco para enquadrar informação”.

As leituras das 15 lexicais têm 45–69 palavras no B2 e 34–59 no C1. Um texto curto pode ser útil; o problema é essa ser a base recorrente para síntese de fontes, argumentação e produção extensa, sem evidências suficientes no material. As comunicativas reutilizam leitura, perguntas, listening e prática da lexical, com os mesmos três momentos de discussão. Os projetos finais também passam pelas funções genéricas de conteúdo/revisão, não por uma implementação independente de avaliação final.

**Correção necessária:** revisar as 64 aulas, com exemplos completos e naturais, explicações específicas, respostas-modelo reais, fontes/contextos suficientes, progressão de complexidade e comunicativas diversas. Preservar temas aproveitáveis, mas substituir a composição mecânica.

**Aceite:** revisão linguística de todas as frases geradas, gabaritos conferidos, distinção observável entre B2/C1, projetos com critérios explícitos e demonstração de uso em aula. Fonte: [gerador avançado](../js/advanced-v3-lessons-data.js), linhas 177–328; [player](../js/advanced-v3-lesson-player.js).

## 5. Revisão pedagógica e consistência da experiência

| Achado | Evidência e efeito | Ação para fechar |
|---|---|---|
| B1 parcialmente migrado | 14 lexicais e 2 projetos ainda usam o player antigo; L3 possui cards que precisam virar e verbo `maintain` sem “to” | Uniformizar as 16 aulas restantes, preservando diálogos e material bom já existente; auditar verbos também dentro de vocabulary/expressions |
| Exemplos ausentes no A2 | 20 linhas de verbos, em 13 lexicais, ficam sem exemplo; `to cross` em L3 foi confirmado na interface | Escrever exemplos explícitos e adequados ao significado. Não depender apenas da busca automática por palavra dentro de outras frases |
| Sentido e exemplo desalinhados | Em L3, `to take` traz “levar; pegar” ao lado de `How long does it take on foot?` | Explicar o sentido de duração (“demorar/levar tempo”) quando esse for o exemplo |
| Títulos desatualizados | A2 L30 anuncia Rick/New Year, mas apresenta mensagens ao eu futuro e um clube de cápsula do tempo | Revisar títulos, summaries e instruções no manifesto e fontes atuais, preservando IDs e progresso |
| Variedade ainda concentrada | Nas 42 comunicativas: 41 têm reading, 36 matching, 29 survey, 13 cloze e 7 dialogue | Variar ações e experiências, não apenas rótulos. Há dramatização possível em conversation, portanto ausência do tipo `roleplay` não prova ausência da prática |
| Avançados sem recursos comuns | B2/C1 não carregam música, helper de salvar/ouvir ou tema escuro; não há esses controles no player inspecionado | Implantar o contrato aprovado nos dois módulos e verificar aula inteira, não só a abertura |
| Material interno chega ao aluno | B1 antigo mostra descritores extensos; portal chama V3 de “teste”/“versão de teste”; avançados mostram “CEFR coverage” | Manter orientação de condução discreta e retirar linguagem de bastidor do produto final, sem refazer o design aprovado |
| Estado da aula não identifica aluno | Chave `insr:lesson-page:v3:versão:id` guarda seção, retomadas, autoavaliações e homework em sessionStorage | Separar estado por aluno/contexto. Não afirmar que ele equivale a evidência pedagógica sincronizada |

Fontes: [inventário](../artifacts/commercial-readiness/inventory.json), [adapter A2](../a2-v3/a2-v3-presentation-data.js), [player compartilhado](../js/v3-presentation.js), [portal](../js/student-portal-dashboard.js).

### Como preservar a liberdade das comunicativas

Não recomendo transformar todas em uma sequência obrigatória de seis blocos. A revisão deve escolher a tarefa a partir do assunto: interpretar uma mensagem, comparar opções, descobrir uma informação faltante, reconstruir acontecimentos, entrevistar, decidir com restrições, explicar uma imagem, solucionar um mal-entendido ou defender uma interpretação.

Para cada comunicativa, registrar: linguagem recuperada; motivo real para falar; informação nova/interessante; resultado concreto; apoio opcional; possibilidade de ampliar ou simplificar. Textos culturais precisam de fonte quando apresentam fatos externos; cenários ficcionais podem ser autorais. Usar as imagens do livro como inspiração de formato continua sendo a orientação, não copiar textos, ilustrações ou páginas.

### Avaliação de aprendizagem

Os manifestos atribuem seis descritores CEFR a cada aula por perfil de nível. Os testes verificam presença e consistência, não desempenho do aluno. Há missões, checklists e projetos úteis, mas falta comprovar uma avaliação integrada e calibrada de entrada, acompanhamento e saída.

Antes de anunciar resultados por nível, definir rubricas observáveis — compreensão, interação, alcance lexical, precisão e autonomia — com exemplos de desempenho, apoio permitido, devolutiva e critérios de retomada. Concluir uma aula registra percurso; não comprova domínio. O manual do Conselho da Europa trata a vinculação de avaliações ao CEFR como um processo de construção de evidências. [Referência oficial](https://www.coe.int/en/web/common-european-framework-reference-languages/relating-examinations-to-the-cefr).

Validar a carga em aulas reais de 60 minutos, identificando atividades essenciais e extensões. Não usar o número de slides ou textos como medida isolada de qualidade e não anunciar fluência garantida pelo total de horas.

## 6. Portal e flashcards: correções funcionais, preservando o visual

As correções recentes passaram no teste isolado: evitar dupla avaliação, respeitar a data de revisão, manter o card em falha de salvamento, retomar a pendência na mesma sessão e repetir uma gravação incerta sem duplicá-la no cenário testado. A correção de login também passou. Esses resultados são positivos, mas ainda não substituem teste com contas de homologação e regras reais.

Pendências identificadas:

1. **Resposta pode aparecer no lado de produção.** O verso salvo pelas lições inclui tradução, formas e exemplo em inglês. O modo “Produzir em inglês” exibe esse verso inteiro. Em verbos, as próprias formas podem entregar o infinitivo. Separar termo, significado, exemplo e flexões no registro e controlar o que aparece antes/depois da tentativa.
2. **Estatísticas incluem avaliações órfãs.** Excluir card remove `myCards`, mas não sua avaliação em `ratings`; o resumo conta `Object.values(state.ratings)`. Definir se histórico será preservado ou excluído e calcular o painel sobre os cards elegíveis.
3. **Editar card muda origem e reinicia a fila.** A edição define `source` como custom/favorite e reaplica filtros. Preservar procedência da aula e posição sempre que possível.
4. **O baralho A1/A2 é legado.** Continua anunciado como 32 lições e usa `js/vocabulary.js`; não corresponde ao novo A1 de 38 aulas nem ao conjunto A2 atual. Cards salvos individualmente continuam em “Meus Cards”. Escolher como expor essa biblioteca e migrar identificadores sem perder estudo anterior.
5. **Retomada é parcial.** A pendência de gravação foi protegida, mas a sessão completa não é uma fila durável por aluno. Fechar a aba pode perder estado em sessionStorage. Descrever a função corretamente e decidir se haverá retomada completa.
6. **Contagem de cards vistos não é aprendizagem.** `seen` aumenta ao mostrar o card e “Dominei” é autodeclaração. Não usar esses números como prova de domínio do nível.
7. **Produção usa correspondência exata normalizada.** Não aceita alternativas semânticas; a mensagem atual pede comparação, o que é mais prudente do que chamar toda diferença de erro. Definir variantes válidas e o tratamento de infinitivos sem “to” sem transformar o exercício em corretor universal.
8. **Acessibilidade do card.** Na amostra, a árvore acessível expõe frente e verso antes de virar, com botões dentro de um elemento que também funciona como botão. Ocultar semanticamente a face inativa e separar os controles. Verificar foco e atalhos.
9. **Mobile precisa de teste em aparelhos reais.** Em 390 × 844 a área estudada não apresentou transbordamento horizontal; revelar funcionou e os controles de produto medidos não tinham alvo menor que 36 px. A prévia tem uma faixa extra de teste, ausente no produto. Ainda faltam teclado virtual em produção, rotação, Safari/Chrome, voz, rede instável e retorno após suspensão. Não é necessário redesenhar o portal para isso.

Evidência: [aplicativo](../js/flashcards-app.js), linhas 377, 656, 722, 921 e exclusão; [serialização nas lições](../js/v3-presentation.js), `saveAttrs`; [histórico das correções](flashcards-functional-fixes-2026-09-12.md).

## 7. Operação comercial, privacidade e publicação

### Hospedagem e distribuição

O endereço informado usa GitHub Pages. As regras atuais do serviço restringem seu uso como hospedagem gratuita para operar negócio online, comércio eletrônico ou SaaS comercial. **Antes de vender acesso à plataforma, escolher hospedagem compatível com a operação e validar o enquadramento.** Um site institucional e uma plataforma paga não são a mesma situação; este diagnóstico considera a plataforma de curso. [Limites oficiais do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

Definir uma publicação reproduzível, com lista explícita dos arquivos de produção. `firebase.json` aponta a raiz como diretório público e não exclui `artifacts`, `tools` ou `docs`; isso requer revisão se Firebase Hosting for usado. A configuração de publicação de GitHub Pages não foi confirmada nesta etapa. As prévias, provas de conceito e documentos internos não devem ser publicados acidentalmente junto com a oferta comercial.

### Venda para professores e automação de compras

Há implementação de webhook em `server/` e outra em `functions/`; a documentação recomenda Render. Os endpoints exigem segredo, portanto não foram classificados como abertos sem autenticação. Porém, no servidor recomendado:

- ausência de status é interpretada como `approved`;
- eventos diferentes de aprovado são ignorados, sem fluxo visível de revogação por cancelamento/reembolso;
- a deduplicação lê e depois grava, sem uma reserva transacional do evento;
- o cadastro resultante é de professor, não matrícula de aluno;
- `getManagerModuleProducts` concede ao professor os produtos do catálogo Scale; limites e assinatura precisam ser coerentes com a oferta, não apenas com o papel.

Essas lacunas bloqueiam a promessa de **venda/provisionamento automático com controle por plano**, caso essa seja a oferta. Venda manual de aulas não precisa de um checkout próprio, mas precisa de procedimento claro de liberação, suporte e cancelamento. Não foram enviados webhooks nem realizadas compras. Fonte: [servidor](../server/index.js), linhas 241, 488 e 537; [acesso](../js/platform-access.js), linha 112.

### Informação ao cliente e dados pessoais

Não localizei páginas públicas próprias de termos, privacidade e cancelamento nos arquivos HTML pesquisados. Isso não prova ausência de contratos fornecidos fora do site. Antes da venda, documentar e tornar acessíveis: quem presta o serviço, contato, oferta e preço, duração/acesso, acompanhamento incluído, requisitos técnicos, cancelamento/reembolso e suporte.

Para contratação eletrônica, o Decreto 7.962/2013 disciplina informações da oferta, atendimento e exercício do arrependimento. O contrato concreto e a política de cancelamento precisam ser revisados para a forma de venda escolhida. [Texto oficial](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm).

Mapear os dados de alunos/professores, finalidades, acesso, retenção, fornecedores e canal de atendimento aos titulares. Ser pequeno negócio não elimina as obrigações de proteção de dados; a ANPD prevê informação aos titulares, canal de comunicação e medidas de segurança compatíveis. [Resolução da ANPD para pequeno porte](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022).

Se houver menores, tratar essa faixa explicitamente na oferta e nos fluxos; não presumir que todos sejam adultos. Confirmar inventário/licenças de imagens, fontes, textos adaptados e músicas. A licença de software de uma biblioteca não licencia automaticamente o conteúdo servido por ela.

### Continuidade de serviço

Não encontrei, na documentação operacional examinada, prova de restauração testada do banco. Antes do lançamento, executar backup/restauração em ambiente separado, definir recuperação de conta, exportação/exclusão de dados conforme política aplicável, tratamento de falhas de e-mail e de provedores, monitoramento de erros e caminho de suporte. Não afirmar SLA, disponibilidade ou escala sem medições.

## 8. Resultado dos testes e qualidade da própria auditoria automática

| Verificação executada | Resultado | Interpretação |
|---|---|---|
| `audit-v3.cjs` | Passou | Estrutura, IDs e contratos de 166 páginas; não é revisão linguística nem teste de segurança implantada |
| `audit-v3-semantics.cjs` | Passou | Vínculos/metadados semânticos e integração musical |
| `audit-v3-music.cjs` | Passou, 23 avisos | 54 registros nos três primeiros níveis; não cobre a ausência de curadoria B2/C1 |
| Auditoria de conversação A2 | Passou | Pares e contratos de 15 comunicativas |
| `audit-v3-communicative-variety.cjs` | Passou | 42 fontes atuais A1/A2/B1; não avalia B2/C1 nem garante surpresa pedagógica |
| `audit-v3-encoding.cjs` | Passou | 321 arquivos sem padrões de codificação suspeita detectados |
| `audit-v3-translations.cjs` | Falhou, 16 apontamentos | Lê a antiga fonte A2 `a2-v3-lesson-content.js`; não considerar automaticamente 16 erros nas aulas atuais |
| `music-catalog-v3.test.js` | Falhou | Espera a antiga lista de números A1; alinhar ao manifesto por IDs |
| `music-cloze-v3.test.js` | Passou | Lacunas, normalização, controles e ordem do bloco |
| `audit-login-flow.cjs` | Passou | Cenários isolados de login, retry, erros e timeout |
| `audit-flashcards-reliability.cjs` | Passou | Cenários isolados de gravação, pendência e contexto do app |
| `audit-class-session-ledger.cjs` | Passou | Duração, edição, validação e arquivo de pacotes em memória |

Os 23 avisos musicais indicam apenas uma ou duas respostas diferentes em cinco posições de algumas músicas. As ocorrências são distintas; não significa haver menos de cinco lacunas. A repetição pode ser adequada ao início do curso, mas merece decisão pedagógica por faixa.

A integração contínua encontrada está centrada no A2 e seus filtros não incluem alterações exclusivas em vários arquivos de A1/B1/B2/C1, login, regras e flashcards. Ampliar gatilhos e verificações; consertar testes desatualizados sem apagar os critérios. Adicionar inspeção das fontes efetivamente carregadas e testes de autorização com emulador. O texto “permissions checked” de um teste estático não substitui isso.

Evidência: [saídas dos testes](../artifacts/commercial-readiness/test-results.json), [workflow](../.github/workflows/a2-v3-quality.yml), [teste musical antigo](../js/music-catalog-v3.test.js), [auditoria de tradução](../tools/audit-v3-translations.cjs).

## 9. Plano de fechamento com critérios verificáveis

| Etapa | Trabalho | Evidência para aprovar |
|---|---|---|
| 1. Integridade dos alunos | Restringir campos, fixar contexto nas lições, revisar acesso direto e gravações | Testes positivos/negativos no emulador; duas abas/dois alunos; regras implantadas conferidas |
| 2. Base comercial | Decidir hospedagem, direitos musicais, oferta, privacidade e operação de vendas | Solução autorizada documentada; ambientes definidos; fluxos de compra/cancelamento testados quando usados |
| 3. Fechar A1/A2 | Corrigir verbos/exemplos/títulos, revisar gabaritos, ritmos e atividades; alinhar testes | Planilha/registro por aula com revisão de linguagem e condução; aula piloto de cada ciclo; nenhuma pendência impeditiva |
| 4. Completar B1 | Migrar 14 lexicais e 2 projetos restantes e conferir os 15 pares | Mesmos recursos aprovados; infinitivos consistentes; projeto e avaliação com critérios próprios |
| 5. Refazer a base editorial B2/C1 | Revisar 64 aulas e integrar música/flashcards/tema | Exemplos naturais, fontes suficientes, tarefas variadas, progressão de nível e avaliações finais verificadas |
| 6. Homologar a operação | Portal/flashcards mantendo visual; mobile real; falhas de rede; backup; acessibilidade | Roteiro de ponta a ponta com contas de teste e restauração demonstrada |
| 7. Publicar versão candidata | Separar arquivos de produção, registrar versão e executar testes no ambiente final | Mesma revisão validada localmente e publicada; smoke test professor/aluno; plano de retorno |

O registro de aceite por aula deve conter: ID, objetivo comunicativo, pré-requisito, linguagem recuperada, correção linguística, gabaritos/variantes, fontes/licenças quando aplicável, recursos ouvir/salvar, música e homework, duração observada, problemas encontrados e responsável/data da revisão. Isso é um controle de qualidade editorial; não impõe um molde fixo às comunicativas.

**Decisão recomendada:** concluir os bloqueios compartilhados e A1/A2 primeiro; depois B1; B2/C1 precisam de uma etapa editorial própria. É possível planejar lançamento por módulo explicitamente concluído, mas não anunciar agora todo o percurso A1–C1 como finalizado. A aprovação comercial deve se basear nas evidências acima, não em um percentual estimado de conclusão.
