# Avaliação final do módulo Conversation — prompt para implementação no VS Code

Este documento é uma avaliação e uma especificação de implementação. Ele não aplica as correções no módulo. O trecho iniciado em **“PROMPT MESTRE”** foi escrito para ser colado no modo Agent da IA do VS Code.

## Diagnóstico executivo

O módulo possui duas referências diferentes, que não devem ser confundidas:

- `conversation/licao-31.html` é a referência **editorial**: estrutura de 14 slides, progressão da conversa, densidade e estilo dos debates;
- as lições 49–64 são a referência **técnica da atividade musical**: faixa exata, catálogo verificado, letra real carregada apenas em runtime e cinco lacunas auditadas.

A lição 31 não é referência técnica para música. Ela ainda mantém letra comercial no HTML e usa mais de cinco lacunas. Sua arquitetura editorial deve ser preservada, mas seus três blocos musicais também precisam ser migrados.

Baseline encontrado nas lições 1–48:

- 48 aulas e 144 atividades musicais;
- 32 aulas fora da cadência de 14 slides;
- nenhuma aula usa o catálogo/runtime musical das lições 49+;
- as 144 atividades guardam letra comercial, interpretação sintética ou placeholder dentro da fonte;
- há players de busca, YouTube, IDs inválidos, versões incorretas e documentos malformados;
- diversas perguntas são corrigidas apenas em runtime por `conversation-lesson-theme.js`, criando duas fontes de verdade;
- as lições 13, 15, 16, 24, 35, 39, 43, 45 e 47 exigem a intervenção editorial/técnica mais profunda;
- as lições 1, 2, 17, 29, 31–33, 36, 37 e 41 já têm boa base editorial e precisam principalmente da migração musical.

Resultado esperado: todas as lições 1–48 devem oferecer a mesma cadência pedagógica da lição 31 e o mesmo contrato musical das lições 49–64, sem transformar o curso em 48 cópias genéricas.

---

# PROMPT MESTRE — COLE A PARTIR DAQUI NO MODO AGENT DO VS CODE

Você trabalhará no repositório:

`https://github.com/Anlopes86/inglesnoseuritmo`

## OBJETIVO

Executar o acabamento final completo das lições 1–48 do módulo `conversation`.

Use duas referências complementares:

1. `conversation/licao-31.html` — padrão de qualidade editorial, estrutura, progressão das perguntas e debates.
2. Lições 49–64 — padrão técnico da atividade musical, catálogo, provider, cinco lacunas, runtime, acessibilidade e falha segura.

Não copie as letras inline nem a quantidade de lacunas da lição 31. Ela é o modelo editorial, não o modelo técnico da música.

O objetivo não é apenas fazer todas as páginas terem 14 slides. É garantir que cada aula:

- comece com conversa pessoal acessível;
- introduza seis expressões úteis;
- use três músicas como estímulo para falar;
- tenha quatro perguntas fortes depois de cada música;
- progrida de experiência pessoal para cultura, opinião, contraponto e dilema;
- contenha dois momentos de transferência para situações reais;
- termine com prática lexical, produção oral, homework e encerramento;
- use letra real somente em runtime, com cinco lacunas verificadas;
- não exponha letra comercial, placeholder ou aviso de bastidor no repositório ou na Student View.

## CONTEXTO PEDAGÓGICO

- São aulas particulares individuais, ao vivo.
- O professor compartilha a tela.
- O site funciona como livro interativo do professor.
- O público inclui adultos e adolescentes.
- Speaking e listening são prioritários.
- As perguntas precisam gerar conversa real, não apenas testar compreensão da letra.
- O professor deve conseguir explorar uma aula em aproximadamente 60 minutos.
- Fontes devem ser legíveis em TV e notebook.
- Evite scroll no desktop sempre que possível.
- No mobile pode haver scroll vertical, mas nunca horizontal.
- Preserve a identidade temática de cada aula.
- Não repita músicas já usadas no módulo.
- Não substitua músicas automaticamente sem registrar e justificar a decisão.

## REGRAS DE SEGURANÇA

Antes de modificar arquivos:

1. Leia completamente:

   - `AGENTS.md`;
   - `docs/v3-content-source-map.md`;
   - `conversation/CONVERSATION_MUSIC_PILOT.md`;
   - `conversation/conversation-lessons-49-64-data.js`;
   - `conversation/conversation-lessons-49-64-runtime.js`;
   - `conversation/conversation-music-catalog-49-64.js`;
   - `conversation/conversation-music-cloze.js`;
   - `conversation/audit-lessons-49-64.cjs`;
   - `conversation/audit-conversation-music-cloze.cjs`.

2. Execute:

   ```powershell
   git status --short
   git branch --show-current
   git rev-parse HEAD
   ```

3. Não sobrescreva, reverta, mova ou formate alterações locais do usuário.

4. Se houver arquivos modificados que se sobreponham ao escopo, pare e informe exatamente o conflito. Não use `git reset --hard`, `git checkout --`, `git clean` ou comandos destrutivos.

5. Se o working tree estiver limpo e o usuário tiver autorizado o fluxo Git, atualize somente por fast-forward e crie uma branch:

   ```powershell
   git switch main
   git pull --ff-only
   git switch -c fix/conversation-01-48-final-polish
   ```

6. Não faça push, merge, PR ou deploy sem autorização.

7. Não altere o número, a ordem ou a URL das 64 lições.

8. Não altere A1-V3, A2-V3, B1-V3, B2-V3 ou C1-V3, exceto se uma função compartilhada realmente precisar de correção retrocompatível.

9. Se alterar `js/lyrics-service-v3.js` ou qualquer camada V3 compartilhada, execute todas as auditorias V3 no final.

10. Não inclua letras comerciais completas em HTML, JavaScript, JSON, testes, snapshots, fixtures, comentários ou documentação.

11. Não invente letra, palavra ou ocorrência.

12. Não apresente interpretação autoral como se fosse letra real.

13. Não reative geradores legados nem execute scripts antigos de atualização sem primeiro reconciliá-los com a fonte canônica nova.

14. Faça a migração em fatias verticais pequenas e auditáveis. Uma fatia só está concluída quando estrutura, música, debates, testes e visual foram verificados.

## FASE 0 — REGISTRAR O BASELINE

Antes de editar, execute:

```powershell
node conversation/audit-lessons-49-64.cjs
node conversation/audit-conversation-music-cloze.cjs
node conversation/conversation-music-cloze.test.cjs
node tools/audit-v3.cjs
node tools/audit-v3-semantics.cjs
node tools/audit-v3-music.cjs
node a2-v3/audit-conversation-lessons.cjs
```

Crie um inventário das lições 1–48 contendo:

- número e título;
- quantidade de slides;
- seis expressões;
- três músicas;
- tipo de embed e track ID;
- quantidade de perguntas no warm-up;
- quantidade de perguntas depois de cada música;
- número de contextos/transferências;
- prática lexical;
- produção oral;
- homework e exemplo;
- letra comercial inline, interpretação sintética ou placeholder;
- quantidade e tipo das lacunas;
- correções feitas atualmente por `conversation-lesson-theme.js`;
- erros de HTML, JavaScript, acessibilidade e player.

Salve o baseline em:

`docs/conversation-01-48-baseline.md`

Não considere a ausência de um auditor 1–48 motivo para começar a editar sem baseline. Crie primeiro um extrator somente leitura.

## CONTRATO EDITORIAL OBRIGATÓRIO — PADRÃO DA LIÇÃO 31

Cada lição 1–48 deve terminar com exatamente 14 slides, nesta cadência:

1. Warm-up.
2. Seis expressões em flashcards.
3. Música 1.
4. Debate da música 1.
5. Contexto/transferência 1.
6. Música 2.
7. Debate da música 2.
8. Contexto/transferência 2.
9. Música 3.
10. Debate da música 3.
11. Prática das seis expressões.
12. Aplicação oral/reflexão.
13. Homework com modelo de resposta.
14. Encerramento.

### Warm-up

- Use cinco prompts curtos e distintos.
- Comece por preferência, rotina, experiência ou escolha pessoal.
- Inclua pelo menos um follow-up que peça motivo ou exemplo.
- Evite começar com teoria, definição ou julgamento moral.
- Não faça cinco variações da mesma pergunta.

### Expressões

- Exatamente seis expressões úteis e naturais.
- Cada card deve ter significado e exemplo contextualizado.
- A prática do slide 11 deve usar as mesmas seis expressões.
- Não mantenha uma expressão na frente do card e outra no exemplo ou no gabarito.

### Debate pós-música

Cada uma das três músicas deve ser seguida por exatamente quatro cards. Use a progressão:

1. **Personal** — experiência, preferência, reação ou conexão pessoal.
2. **Culture & Society / Reflection** — contexto cultural, comportamento ou consequência real.
3. **Opinion** — interpretação e posicionamento com justificativa.
4. **Hot Take / Debate** — contraponto, trade-off ou dilema sem resposta óbvia.

Regras das perguntas:

- Ancore pelo menos duas perguntas em uma ideia concreta da música.
- Não dependa de o aluno memorizar um verso exato.
- Não faça apenas perguntas de compreensão como “What is the singer saying?”.
- Peça `why`, `how`, escolha, consequência, exemplo ou comparação.
- Evite perguntas binárias sem follow-up.
- Evite afirmações causais não sustentadas e perguntas indutivas.
- Use pelo menos duas expressões da aula ao longo dos debates ou transferências.
- Para temas sensíveis, use linguagem neutra, não estigmatizante e apropriada para aula particular.

### Dois contextos/transferências

- Não repita os debates das músicas.
- Um contexto deve levar a ideia para uma situação cotidiana, cultural ou profissional.
- O outro deve introduzir comparação, decisão, cenário, mini role-play ou trade-off.
- Cada contexto precisa gerar produção oral; não deve ser um bloco expositivo longo.

### Prática e aplicação

- O slide 11 recupera as seis expressões.
- O slide 12 exige uma resposta pessoal mais longa, posição, plano, história ou solução.
- A aplicação deve conter apoio suficiente para o aluno falar, mas não uma resposta pronta.

### Homework

- Uma tarefa clara e executável.
- Inclua um modelo curto de resposta.
- A tarefa deve reutilizar o tema e pelo menos duas expressões.
- Remova Markdown literal, placeholders e instruções de bastidor.

## CONTRATO MUSICAL OBRIGATÓRIO — PADRÃO DAS LIÇÕES 49–64

Todas as 144 músicas das lições 1–48 devem usar o mesmo contrato técnico das 49–64.

### Fonte e runtime

- Reutilize `conversation/conversation-music-cloze.js`.
- Reutilize `js/lyrics-service-v3.js`.
- Generalize o runtime atual de forma retrocompatível; não crie 48 implementações independentes.
- Letra real é buscada somente quando o slide musical é aberto.
- Cache apenas em `sessionStorage`.
- LRCLIB é o provider principal.
- Lyrics.ovh é contingência, seguindo o comportamento já definido.
- Falha do provider não pode quebrar a aula: mostre mensagem segura e permita continuar ao debate.

### Catálogo

Crie uma fonte canônica para as lições 1–48, por exemplo:

`conversation/conversation-music-catalog-01-48.js`

Cada registro deve conter, no mínimo:

- lesson number;
- song index;
- título e artista de exibição;
- Spotify track ID exato com 22 caracteres;
- versão exata;
- duração;
- confirmação de disponibilidade na região BR;
- provider;
- LRCLIB ID;
- data da verificação;
- status;
- exatamente cinco gaps;
- occurrence de cada gap;
- accepted answers;
- `usageScope: private-course-runtime`;
- `commercialPublicationApproved: false`.

Um registro só pode ser `provider-verified` quando todos estes itens forem confirmados:

1. O Spotify Embed devolve a mesma faixa.
2. A faixa está tocável em BR.
3. Título, artista, versão e duração correspondem.
4. O LRCLIB possui letra real para a mesma gravação ou versão compatível.
5. As cinco palavras existem nas ocorrências registradas.
6. Nenhuma ocorrência é reutilizada.
7. A atividade foi montada e testada com a letra retornada pelo provider.

Se qualquer item falhar:

- mantenha `draft-until-provider-match`;
- não mostre a atividade na Student View;
- registre a pendência para decisão humana;
- não enfraqueça a validação;
- não troque a faixa silenciosamente.

### Cinco lacunas

- Exatamente cinco palavras de uma única ocorrência cada.
- Não use frase inteira como lacuna.
- Distribua as lacunas pela música.
- Não repita a mesma palavra ou família lexical.
- Evite nomes próprios obscuros, interjeições, ruídos e palavras impossíveis de distinguir no áudio.
- Não selecione palavrão, termo racial ou linguagem ofensiva como resposta.
- Priorize palavras úteis para o tema, mas nunca invente uma ocorrência para forçar interseção.
- Preserve correção, estado `almost`, três tentativas, revelação individual e placar 0/5.
- Mantenha o fluxo `Predict → Listen → Complete → Check → Discuss`.

### Spotify

- Use apenas `https://open.spotify.com/embed/track/{TRACK_ID}`.
- Remova `embed/search`.
- Remova YouTube dos slides musicais.
- Adicione `title` acessível a todos os iframes.
- Não aceite player 404, capa de compilação errada ou versão diferente apenas porque o título é parecido.

### Direitos e conteúdo persistido

- Nenhuma letra completa ou trecho comercial deve permanecer no repositório.
- Não use letra em fixture de teste.
- Testes devem validar metadados, gaps e montagem com doubles mínimos, nunca salvar a obra.
- Antes de publicação comercial ou acesso público, o licenciamento precisa ser revisto.

## FASE 1 — DEFINIR FONTES CANÔNICAS E REMOVER A DUPLICAÇÃO

Hoje as lições 1–48 duplicam conteúdo, navegação, player e exercício em HTML. Não corrija o mesmo defeito 48 vezes.

Arquitetura recomendada, adaptável ao projeto existente:

- `conversation/conversation-lessons-01-48-data.js` — conteúdo editorial autoral;
- `conversation/conversation-music-catalog-01-48.js` — metadados musicais sem letra;
- `conversation/conversation-lessons-01-48-runtime.js` ou runtime unificado — renderização;
- `conversation/conversation-music-cloze.js` — atividade compartilhada existente;
- `conversation/conversation-music-cloze.css` — estilos reutilizáveis, se a separação for necessária;
- HTMLs das lições como shells mínimos e estáveis.

Regras:

1. Extraia conteúdo sem perder as melhores perguntas existentes.
2. Não use o número da lição como única chave sem validar título e tema.
3. Preserve URLs e integração de progresso.
4. Preserve compatibilidade com 49–64.
5. Corrija player/template/runtime quando o defeito se repetir.
6. Conteúdo autoral específico fica nos dados da aula, não em `conversation-lesson-theme.js`.
7. Quando uma correção por string do tema for incorporada à fonte canônica, remova o patch correspondente.
8. Não deixe HTML e Student View apresentarem músicas ou perguntas diferentes.
9. Não reexecute `tools/update-conversation-song-debates.ps1` nem geradores 41–48 sem auditoria; eles estão defasados em relação ao conteúdo atual.

## FASE 2 — CONSTRUIR O CATÁLOGO MUSICAL 1–48

Crie um builder reproduzível:

`tools/build-conversation-music-catalog-01-48.cjs`

O builder deve:

- ler a fonte canônica das 48 aulas;
- detectar músicas repetidas entre 1 e 64;
- validar ID exato do Spotify;
- confirmar disponibilidade BR;
- comparar título, artistas, versão e duração;
- localizar a versão correspondente no LRCLIB;
- selecionar ou validar cinco ocorrências distintas;
- bloquear respostas ofensivas;
- produzir catálogo sem letra;
- falhar sem gravar catálogo parcial quando um registro marcado como verificado não cumprir o contrato;
- emitir relatório separado de drafts e decisões humanas.

Não marque 144 registros em lote como verificados apenas porque uma busca retornou resultado.

Casos que exigem atenção humana especial:

- L2/L34: a mesma música aparece na fonte, enquanto o tema troca a L34 por `Private Eyes`; escolha uma fonte canônica sem duplicidade.
- L4, L8, L13, L19, L23, L25, L35, L38, L40 e L48: verificar linguagem explícita/sensível, versão clean e adequação etária.
- L14, L16, L24, L40 e L42: revalidar a interseção real entre tema e repertório.
- L44: `Hakuna Matata` possui registros de metadados no LRCLIB, mas pode não fornecer letra; não declarar verificado sem conteúdo real.
- L45: reparar players quebrados e confirmar versões.
- L47: consolidar a substituição de `Make ’Em Laugh` na fonte, se essa for a decisão aprovada.

## FASE 3 — MIGRAR EM FATIAS VERTICAIS

Migre em seis fatias:

1. Lições 1–8.
2. Lições 9–16.
3. Lições 17–24.
4. Lições 25–32.
5. Lições 33–40.
6. Lições 41–48.

Para cada fatia:

1. Migrar dados editoriais.
2. Migrar as 24 músicas da fatia para o catálogo/runtime.
3. Remover letras e placeholders antigos.
4. Normalizar 14 slides.
5. Garantir quatro perguntas por música.
6. Corrigir os dois contextos e a aplicação oral.
7. Executar auditores da fatia.
8. Abrir visualmente pelo menos uma aula simples e uma aula crítica.
9. Registrar a etapa em `docs/conversation-01-48-migration-log.md`.

Não comece a fatia seguinte com falha estrutural ou musical conhecida na anterior.

## FASE 4 — DECISÕES ESPECÍFICAS POR LIÇÃO

### Lições 1–16

**L1 — Dreams & Ambitions — intervenção leve**

- Preservar a estrutura de 14 slides e os debates.
- Migrar as três músicas para runtime e cinco gaps.
- Reduzir trechos persistidos a zero.
- Incorporar à fonte qualquer pergunta atualmente reescrita pelo tema.

**L2 — Love & Relationships — intervenção leve**

- Preservar a progressão sobre amor, dependência, controle e ciúme.
- Migrar música.
- Resolver a duplicidade de `Every Breath You Take` com a L34 sem substituição silenciosa.

**L3 — Rebellion & Freedom — intervenção alta**

- Expandir de 11 para 14 slides.
- Corrigir players repetidos/inválidos.
- Corrigir o caminho de `lesson-handler.js`.
- Remover carregamento duplicado do Firebase.
- Criar dois contextos e aplicação oral.
- Alinhar prática às seis expressões, não oito cards desconectados.

**L4 — City Life vs. Country Life — intervenção alta**

- Expandir para 14 slides.
- Validar versões exatas de `Englishman in New York` e `Country Roads`.
- Não expor termo racial de `Empire State of Mind` na fonte ou como gap.
- Corrigir scripts locais e Firebase duplicado.
- Adicionar comparação cultural concreta entre cidade e campo.

**L5 — Friendship — intervenção média**

- Expandir para 14 slides.
- Completar cinco gaps por música.
- Diversificar além de lealdade/apoio: conflito, reparação, diversão e memória.

**L6 — Overcoming Challenges — intervenção média**

- Expandir para 14 slides.
- Incorporar à fonte as versões mais naturais dos prompts hoje alteradas em runtime.
- Incluir cenário concreto e produção oral, evitando tom pesado em todos os blocos.

**L7 — Travel & Adventure — intervenção média**

- Expandir para 14 slides.
- Incluir planejamento, imprevisto e mini role-play de viagem.
- Tornar perguntas menos abstratas e mais aplicáveis.

**L8 — Work & Career — intervenção alta**

- Expandir para 14 slides.
- Revisar a adequação de `Working Class Hero` e versão clean.
- Não usar palavrão como gap.
- Adicionar negociação de emprego, rotina e equilíbrio trabalho-vida.

**L9 — Technology & Social Media — intervenção média**

- Expandir para 14 slides.
- Incorporar as reescritas de runtime à fonte.
- Adicionar situação prática de feed, detox, notificações ou permissões.

**L10 — Happiness & Life Philosophy — intervenção média**

- Expandir para 14 slides.
- Evitar repetir felicidade/preocupação de forma genérica.
- Trabalhar situações, escolhas, limite do otimismo e contraponto.

**L11 — The Supernatural & Mysteries — intervenção média**

- Preservar o bom equilíbrio divertido/reflexivo.
- Completar a cadência com dois contextos e aplicação oral.
- Migrar os três players e gaps.

**L12 — Memory & Nostalgia — intervenção média**

- Reduzir 9/7/8 gaps para exatamente cinco por faixa.
- Adicionar atividade com objeto, foto, memória ou linha do tempo.
- Variar o tom emocional.

**L13 — Crime & Justice — reconstrução prioritária**

- Remover imediatamente letras extensas, palavrões e termo racial da fonte.
- Recriar quatro perguntas por música.
- Evitar afirmar que pobreza causa crime.
- Usar linguagem neutra sobre justiça, desigualdade e responsabilidade.
- Reavaliar a ligação de `The Boxer` com o tema.
- Remover Markdown literal do homework.
- Revisar adequação e contexto de `Hurricane`.

**L14 — Food & Culture — intervenção alta**

- Expandir para 14 slides.
- Revalidar a interseção temática de `American Pie` e `Watermelon Sugar`.
- Se forem mantidas, não fingir que metáforas são conteúdo sobre alimentação.
- Criar contextos culturais reais sobre comida.

**L15 — Success & Failure — reconstrução prioritária**

- Expandir de duas para quatro perguntas por música.
- Tornar perguntas mais concretas e menos abstratas.
- Criar dois contextos e aplicação oral.
- Remover trechos longos de letra.

**L16 — The Future & AI — reconstrução prioritária**

- Criar quatro perguntas por faixa e dilemas futuros concretos.
- Revalidar se as três músicas realmente sustentam o tema de IA.
- Remover pergunta fraca sobre “secret” e binarismos sobre conexão/isolamento.
- Incluir automação, ética, privacidade e decisão humana.

### Lições 17–32

**L17 — Learning & Education — intervenção leve**

- Preservar a estrutura de 14 slides e os debates.
- Substituir interpretações autorais por letra real em runtime.
- Trocar `embed/search` por track ID exato.

**L18 — Animals & Nature — intervenção alta**

- Expandir de 11 para 14 slides e quatro perguntas por música.
- Integrar melhor animais, metáfora, conservação e ação humana.

**L19 — Sports & Competition — intervenção alta**

- Expandir de 12 para 14 slides.
- Trabalhar competição saudável, derrota, equipe e ética.
- Remover Markdown e erros de copy.
- Validar versão/adequação de `Lose Yourself`; não usar profanidade como gap.

**L20 — The Power of Habits — intervenção média**

- Expandir de 12 para 14 slides.
- Curar o excesso de perguntas em vez de apenas acrescentar.
- Garantir cinco palavras distintas; não repetir `change` como ocorrência pedagógica equivalente.
- Criar contextos aplicados a hábito, gatilho e pequena mudança.

**L21 — Volunteering & Social Causes — intervenção alta**

- Expandir para 14 slides.
- Organizar debates em pessoal, local, sistêmico e ético.
- Adicionar cenário de ação comunitária.

**L22 — Art & Creativity — intervenção alta**

- Expandir para 14 slides e quatro perguntas por faixa.
- Criar situações concretas de criação, identidade e indústria.
- Tratar arte e saúde mental com precisão, sem diagnóstico improvisado.

**L23 — Money & Personal Finance — intervenção alta**

- Expandir para 14 slides.
- Inserir orçamento, dívida, consumo, preço e decisão real.
- Remover respostas repetidas e linguagem explícita dos gaps.

**L24 — The Gig Economy & Remote Work — reconstrução prioritária**

- Reescrever contextos para tratar efetivamente de plataforma, freelancer, remoto e híbrido.
- Remover YouTube e usar Spotify exato.
- Expandir para 14 slides.
- Remover referência datada a 2026.
- Revalidar a interseção das músicas com o tema.

**L25 — The Media, News & Politics — intervenção alta**

- Expandir para 14 slides.
- Adicionar caso de mídia, fonte, viés, algoritmo e contraponto.
- Contextualizar conteúdo político sem conduzir o aluno a uma resposta.
- Verificar linguagem explícita e versão adequada.

**L26 — Psychology & Human Behavior — intervenção média**

- Preservar os bons cenários.
- Ampliar warm-up e cada debate musical para quatro perguntas.
- Corrigir o nome `T.O.P` para `Twenty One Pilots`.
- Remover controles inacessíveis de resposta ao migrar música.

**L27 — History & Historical Figures — intervenção média**

- Expandir de 12 para 14 slides.
- Remover resíduo literal `***`.
- Revisar e contextualizar afirmações históricas sensíveis.
- Adicionar aplicação oral.

**L28 — Ethics & Morality — intervenção média**

- Expandir de 13 para 14 slides.
- Completar quatro perguntas por música.
- Preservar os bons dilemas, organizando-os como dois contextos.

**L29 — Science & Space Exploration — intervenção leve**

- Preservar estrutura, cenários e humor.
- Trocar resumos autorais por letra real verificada e cinco gaps.
- Transformar tarefas imperativas em perguntas quando isso melhorar a conversa.

**L30 — Fashion & Personal Style — intervenção média**

- Expandir de 13 para 14 slides.
- Corrigir ID inválido de `Thrift Shop`.
- Remover referência fixa a 2024.
- Organizar os debates contemporâneos nos dois contextos.

**L31 — Culture & Leisure — benchmark editorial**

- Preservar a arquitetura e o estilo das perguntas.
- Migrar 10/11/11 gaps para cinco por música em runtime.
- Remover toda letra persistida.
- Corrigir o typo visível.
- Usar esta aula como teste de regressão editorial.

**L32 — Dating in the Digital Age — intervenção leve**

- Preservar a estrutura e os debates sobre vulnerabilidade, ghosting, limites e closure.
- Migrar música.
- Se necessário para consistência, completar o warm-up sem criar pergunta redundante.

### Lições 33–48

**L33 — Childhood & Growing Up — intervenção leve**

- Preservar estrutura e progressão.
- Migrar somente a camada musical para cinco gaps verificados.

**L34 — Conspiracy Theories — intervenção alta**

- Consolidar a música 2 na fonte canônica.
- Eliminar a divergência `Every Breath You Take` no HTML versus `Private Eyes` em runtime.
- Manter o enfoque crítico sem validar teorias falsas.

**L35 — Music, Emotions & Identity — reconstrução musical prioritária**

- Remover imediatamente trechos extensos e linguagem ofensiva da fonte.
- Tomar decisão humana sobre versão clean ou substituição da segunda música.
- Melhorar a ancoragem do primeiro debate na faixa.
- Não escolher profanidade ou termo racial como gap.

**L36 — Aging & Getting Older — intervenção leve**

- Preservar editorial equilibrado.
- Migrar 5/5/5 estáticos para provider/runtime; atingir cinco mecanicamente não basta.

**L37 — Language & Communication — intervenção leve**

- Preservar os debates fortes.
- Migrar música e manter quatro cards somente nos debates pós-faixa.

**L38 — Fan Culture, Rivalries & The World Cup — intervenção alta**

- Expandir de 13 para 14 slides.
- Adicionar o segundo contexto.
- Resolver divergência de título com o manifesto legado.
- Validar versão e linguagem explícita.

**L39 — Heroes & Role Models — reconstrução técnica prioritária**

- Remover o algoritmo que escolhe palavras aleatórias a cada carregamento.
- Usar cinco ocorrências canônicas e estáveis.
- Preservar o bom conteúdo editorial.
- Testar determinismo do gabarito.

**L40 — Food Adventures & Kitchen Personality — intervenção alta**

- Expandir de 13 para 14 slides.
- Revisar perguntas fragmentadas ou básicas.
- Corrigir copy e capitalização.
- Revalidar a ligação temática de `Sugar` e `Cake by the Ocean`.
- Resolver divergência de título com o manifesto.
- Validar versão adequada.

**L41 — The Paradox of Choice — intervenção leve**

- Preservar estrutura e conteúdo.
- Curar apenas excesso de densidade se houver scroll.
- Migrar música para runtime.

**L42 — Ethics of Biohacking — intervenção alta**

- Expandir de 13 para 14 slides.
- Incorporar à fonte os prompts adequados hoje reescritos pelo tema.
- Revalidar a ligação de `Fix You` com biohacking.
- Ignorar o mapeamento desatualizado do script legado.

**L43 — The Art of Storytelling — reconstrução técnica prioritária**

- Reconstruir o documento HTML, que contém documentos aninhados e iframes incompletos.
- Preservar as boas perguntas narrativas.
- Verificar todos os players.
- Revisar a abordagem de `Lola` com sensibilidade, evitando tratar identidade como mero “plot twist”.

**L44 — Movies, Series and Pop Culture — intervenção alta**

- Expandir de 13 para 14 slides.
- Reduzir gaps sobrecarregados para cinco por faixa.
- Corrigir concordância e copy.
- Não marcar `Hakuna Matata` como verificada se o provider não oferecer letra real; registrar decisão humana ou alternativa.

**L45 — Travel Dreams & Curious Destinations — reconstrução prioritária**

- Reparar os players 404 e confirmar versões.
- Expandir para 14 slides.
- Transformar imperativos em perguntas de conversa quando adequado.
- Remover linguagem exotizante/reducionista sobre a África.
- Resolver divergência de título com o manifesto.

**L46 — Weird Inventions and Crazy Ideas — intervenção alta**

- Expandir de 13 para 14 slides.
- Reduzir 8/10/8 para cinco gaps.
- Corrigir deriva entre flashcards, exemplos e prática.
- Remover referência fixa a 2026.

**L47 — Humor & The Power of Laughter — reconstrução prioritária**

- Remover placeholders, avisos de bastidor e embeds de busca.
- Consolidar músicas, perguntas e prática na fonte canônica.
- Eliminar as correções materiais feitas apenas por DOM patch.
- Manter o bom editorial final, mas torná-lo a fonte real.

**L48 — Everyday Life in 2050 — intervenção alta**

- Expandir de 13 para 14 slides.
- Criar quatro perguntas por música.
- Trocar lacunas de frases inteiras por cinco palavras distintas.
- Remover referências datadas a 2026.
- Contextualizar conteúdo racial sensível se a terceira música for mantida.
- Resolver divergência de título com o manifesto.

## FASE 5 — ACESSIBILIDADE, RESPONSIVIDADE E UX

1. Todos os iframes precisam de `title` descritivo.
2. Botões precisam funcionar com teclado.
3. Flashcards devem usar botão ou semântica interativa adequada, com `aria-expanded`/estado equivalente.
4. Correção e revelação precisam anunciar feedback com `aria-live`.
5. O foco deve avançar de forma previsível entre gaps.
6. A atividade precisa suportar loading, ready, almost, incorrect, complete, unavailable e mismatch.
7. Não monte 144 atividades no carregamento inicial; faça lazy mount do slide ativo.
8. O botão para continuar deve levar ao debate da música correspondente.
9. Desktop 1440 × 1000:

   - footer visível;
   - sem conteúdo cortado;
   - sem scroll horizontal;
   - cloze utilizável sem esconder controles.

10. Mobile 390 × 844:

   - sem scroll horizontal;
   - campos e botões tocáveis;
   - texto legível;
   - player e cloze dentro do viewport.

## FASE 6 — CRIAR AUDITORIAS 1–48

Crie:

- `conversation/audit-lessons-01-48.cjs`;
- `conversation/audit-conversation-music-01-48.cjs`;
- `conversation/audit-conversation-browser.cjs`;
- testes unitários necessários para o catálogo/runtime.

### Auditor estrutural

Deve falhar se qualquer aula não tiver:

- exatamente 14 slides;
- ordem estrutural definida;
- cinco prompts de warm-up;
- seis flashcards;
- três slides musicais;
- três debates imediatamente após suas músicas;
- exatamente quatro cards por debate;
- dois contextos;
- prática lexical;
- aplicação oral;
- homework com exemplo;
- encerramento;
- scripts compartilhados na ordem correta;
- HTML e JavaScript sintaticamente válidos;
- integração de progresso preservada.

Também deve falhar com:

- letra ou placeholder dentro de slide musical;
- `embed/search`;
- YouTube em música;
- track ID inválido;
- iframe sem `title`;
- aviso de bastidor na Student View;
- caminho local quebrado;
- música ou pergunta corrigida apenas por DOM patch após a fonte canônica existir.

Não confunda `data-answer` da prática lexical com letra persistida. A proibição vale para a atividade musical legada.

### Auditor musical

Deve exigir:

- 144 registros;
- 144 registros, cada um como `provider-verified` ou como draft explicitamente bloqueado e reportado;
- somente registros `provider-verified` podem aparecer na Student View;
- 720 gaps no total quando todos estiverem aprovados;
- exatamente cinco gaps por registro;
- posições distintas;
- LRCLIB ID para cada registro verificado;
- Spotify ID exato;
- confirmação BR;
- nenhuma repetição de faixa entre 1 e 64;
- cache `sessionStorage`;
- runtime-only;
- nenhuma letra persistida;
- nenhuma resposta ofensiva;
- versão, duração e artista compatíveis;
- direitos marcados como uso privado e publicação comercial não aprovada.

O auditor não pode considerar draft como sucesso silencioso. O relatório final deve dizer quantos drafts permanecem e por quê.

### Auditor de navegador

Automatize pelo menos:

- abertura das 48 páginas;
- navegação pelos 14 slides;
- contador e barra de progresso;
- montagem preguiçosa da música;
- fallback do provider;
- próximo/anterior;
- homework e encerramento;
- ausência de erro no console;
- ausência de overflow horizontal;
- desktop e mobile.

Faça revisão visual detalhada, no mínimo, das lições:

- L3 — estrutura e scripts legados;
- L13 — conteúdo sensível;
- L17 — aula editorialmente pronta;
- L24 — tema e player;
- L31 — benchmark;
- L35 — versão/language policy;
- L39 — determinismo;
- L43 — documento reconstruído;
- L45 — player e sensibilidade;
- L47 — remoção de placeholders/DOM patch;
- L48 — mobile e conteúdo futuro.

## FASE 7 — COMANDOS DE VALIDAÇÃO FINAL

Ao concluir, execute:

```powershell
node conversation/audit-lessons-01-48.cjs
node conversation/audit-conversation-music-01-48.cjs
node conversation/audit-conversation-browser.cjs
node conversation/audit-lessons-49-64.cjs
node conversation/audit-conversation-music-cloze.cjs
node conversation/conversation-music-cloze.test.cjs
node tools/audit-v3.cjs
node tools/audit-v3-semantics.cjs
node tools/audit-v3-music.cjs
node a2-v3/audit-conversation-lessons.cjs
git diff --check
git status --short
```

Se houver novos testes npm, execute também a suíte relacionada. Não esconda warnings relevantes.

## CRITÉRIOS DE ACEITE

O trabalho só está concluído quando:

1. Existem 48 lições migradas e nenhuma URL mudou.
2. Todas possuem exatamente 14 slides.
3. Todas possuem cinco prompts de warm-up, seis expressões e três músicas.
4. Cada música possui um debate com quatro perguntas de perspectivas diferentes.
5. Cada aula possui dois contextos, prática, aplicação, homework com exemplo e encerramento.
6. Há 144 registros musicais canônicos ou drafts explicitamente bloqueados por decisão humana.
7. Cada registro verificado tem cinco ocorrências reais e distintas.
8. Nenhuma letra comercial está persistida no repositório.
9. Não existem interpretações sintéticas apresentadas como letra.
10. Não existem placeholders ou avisos de bastidor na Student View.
11. Não existem embeds de busca, YouTube musical, IDs inválidos ou players 404.
12. Não há músicas repetidas entre as 64 aulas.
13. Perguntas não são apenas compreensão da letra e sempre pedem justificativa, exemplo, comparação ou decisão ao longo do bloco.
14. Conteúdo sensível foi revisado, não apenas ocultado.
15. `conversation-lesson-theme.js` não é mais fonte editorial paralela das aulas migradas.
16. As lições 49–64 continuam passando sem regressão.
17. As auditorias V3 continuam passando se qualquer camada compartilhada foi tocada.
18. Desktop e mobile passam na auditoria visual.
19. O relatório final documenta todas as decisões humanas pendentes.

## RELATÓRIO FINAL OBRIGATÓRIO

Crie:

`docs/conversation-01-48-final-polish-report.md`

Inclua:

- commit e branch de origem;
- arquivos criados e modificados;
- arquitetura adotada e fontes canônicas;
- tabela antes/depois das 48 aulas;
- músicas preservadas, substituídas ou mantidas como draft;
- justificativa de cada substituição;
- versões clean e decisões de adequação;
- quantidade de registros verificados e drafts;
- total de gaps;
- remoção de letras/placeholders;
- patches removidos de `conversation-lesson-theme.js`;
- resultados exatos de todos os comandos;
- páginas revisadas visualmente;
- screenshots ou caminhos dos artefatos de QA;
- riscos e decisões humanas restantes.

## FORMATO DA RESPOSTA DA IA

Ao terminar, responda com:

1. Resultado geral.
2. Arquitetura implementada.
3. Resumo por fatia.
4. Decisões musicais e drafts.
5. Problemas sensíveis revisados.
6. Testes e auditorias, com números.
7. Validação visual.
8. Arquivos principais.
9. Pendências reais.

Não diga apenas “feito”. Não marque o trabalho como concluído se houver letra persistida, draft aparecendo ao aluno, player incorreto, aula fora de 14 slides ou regressão em 49–64.

# FIM DO PROMPT MESTRE
