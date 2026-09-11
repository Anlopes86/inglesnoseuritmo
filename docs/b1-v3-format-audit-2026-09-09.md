# Auditoria B1 V3 para o padrão A2 — 9 de setembro de 2026

## Parecer

Manter 32 aulas: 15 pares lexical → comunicativa, seguidos de uma oficina de projeto e uma avaliação de desempenho. A sequência já está no manifesto. O B1 precisa de uma revisão editorial das comunicativas e dos dois encontros finais, além da adoção do player compartilhado A1/A2. Não é necessário descartar a base lexical.

Esta etapa analisa e prepara a migração; não altera as aulas, o manifesto ou as integrações de produção.

## Fontes e método

Foram examinados js/v3-curriculum.js, js/b1-v3-lessons-data.js, os oito arquivos block, js/v3-curriculum-adapters.js, js/b1-v3-lesson-player.js, os shells e o tema. A análise dos dados considera o resultado da adaptação curricular, não apenas as aulas históricas. Inventário e snapshot em artifacts/b1-format-audit/. O snapshot VM omite música porque não monta MusicCloze; o teste de navegador carrega a integração e registra a posição real.

Navegação automatizada das páginas pelo Chrome, sem autenticação e sem gravação. Recursos HTTPS foram bloqueados deliberadamente para isolar o conteúdo local. Portanto, as capturas não aprovam o layout final: Tailwind, fontes e ícones externos não estavam disponíveis. Reprodução musical e serviços de letra não foram revalidados. Auditorias estruturais não equivalem a uma avaliação pedagógica ou certificação do nível.

## O que preservar

- Alternância de 15 lexicais e 15 comunicativas, com dependências explícitas no manifesto.
- Diálogos iniciais completos nas lexicais, explicações, exemplos, traduções orais e diálogos de aplicação.
- Leituras lexicais de 125–214 palavras, com gêneros e assuntos variados. A extensão não precisa crescer automaticamente.
- Temas úteis: relatos, duração, adaptação, evidência, negociação, regras, mensagens, reclamações, desafios e hipóteses.
- Música nas 15 lexicais, antes do homework, com catálogo central e IDs estáveis. Não promover nem substituir faixas como efeito colateral da migração.
- Tema escuro existente e integração de flashcards; adaptar sua apresentação ao padrão comum.

## Achados prioritários

| Prioridade | Evidência atual | Mudança indicada |
|---|---|---|
| Alta | As 15 comunicativas reutilizam integralmente a primeira leitura da lexical anterior. | Preservar uma retomada breve, mas acrescentar um texto/documento novo que gere decisão, comparação ou interação. |
| Alta | As 15 missões comunicativas usam o mesmo cenário genérico, variando essencialmente o título. | Escrever missão própria com interlocutor, informação, restrição e resultado verificável. |
| Alta | Guided Questions and Choice recebe itens de erro e reordenação porque o filtro de exercícios controlados não inclui error/reorder. | Classificar pela ação real exigida; correção/reordenação permanece apoio opcional, não atividade comunicativa central. |
| Alta | L2, L6 e L14 exibem Teacher Listening cujo roteiro é a instrução genérica em português e não tem perguntas. | Substituir por entrada autoral real ou retirar a seção. Não apresentar orientação editorial como texto de escuta. |
| Alta | Os slides de L31 e L32 são exatamente iguais, apesar de títulos de oficina e avaliação diferentes. | L31 prepara e ensaia; L32 apresenta tarefa inédita, perguntas, mudança de condição e avaliação própria. |
| Alta | Todas as 15 lexicais têm oito entradas no Vocabulary. | Ampliar seletivamente o repertório para algo como 14–20 itens úteis, incluindo colocações e exemplos; quantidade é referência editorial, não requisito oficial. |
| Alta | Verbos estão misturados ao vocabulário e não há banco próprio de formas. Há 51 entradas classificadas como verbais sem to; algumas também são substantivos. | Criar banco de verbos com infinitivo, passado, particípio, significado e exemplo. Usar to nas entradas verbais sem alterar o uso nominal de palavras como regret. |
| Alta | Vocabulário exige virar cartões; roteiro de escuta começa oculto e impõe revelação posterior. | Referência e textos completos por padrão, com ocultação opcional. Um slide por seção, não por frase. |
| Média | Lexicais posteriores acumulam material de várias fontes: L17–25 e L29 têm dois bancos de expressões/leituras; L27 tem três de cada. | Consolidar os bancos, escolher a leitura central e destinar material pertinente às comunicativas ou extensões consultáveis. |
| Média | L26, Service Recovery, reapresenta como leitura principal a Torre de Pisa; o texto de reclamação está na segunda leitura de L25. | Selecionar pelo objetivo da tarefa: pedido, resposta de atendimento e condições de solução são entradas mais diretas. |
| Média | Abertura exibe Action Cycle calculado por divisão por três, herdado de outra cadência. | Remover a contagem antiga e usar metadados do par lexical → comunicativa. |
| Média | Instruções como Protocolo de aplicação, Teacher focus e descritores de bastidor são projetadas ao aluno. | Instruções diretas ao aluno; notas do professor recolhidas separadamente. |
| Média | Há salvamento no vocabulário/expressões, mas o cartão lexical declara apenas significado em data-card-back; o exemplo fica em outro atributo. | Garantir que o flashcard preserve significado, exemplo e formas. Ouvir/Salvar juntos nos bancos e na retomada comunicativa. |
| Média | Tema B1 usa insr-theme, enquanto o player novo grava insr:theme. | Compartilhar tema, navegação, índice, Retomar e revelação individual/coletiva com A2. |

As comunicativas atuais têm sempre dez seções, com gramática, jogo, duas práticas, leitura, escuta, tradução, fala e homework. A ligação curricular existe; a variedade de tarefa e a transferência para situações novas ainda são insuficientes. Não basta renomear as seções.

## Proposta para os 15 pares

| Par | Foco lexical | Nova tarefa comunicativa sugerida |
|---|---|---|
| 1–2 | Defining Moments | Entrevistar alguém a partir de perfil e linha do tempo; distinguir fato passado e experiência e produzir um relato. |
| 3–4 | Progress and Duration | Interpretar quadro de projeto e mensagem de atraso; apresentar atualização e combinar próximo passo. |
| 5–6 | Habits and Adaptation | Comparar rotinas antes/depois de uma mudança e propor adaptação a uma dificuldade concreta. |
| 7–8 | Stories with Layers | Cruzar dois relatos e horários, reconstruir sequência e explicar contradição. |
| 9–10 | Plans in Motion | Organizar evento com agenda e previsão; renegociar após alteração de disponibilidade. |
| 11–12 | Conditions and Backup Plans | Escolher plano de contingência com recursos limitados e explicitar condições. |
| 13–14 | Deduction and Evidence | Comparar pistas, justificar graus de certeza e revisar hipótese diante de nova evidência. |
| 15–16 | Rules, Permission and Expectations | Orientar novo usuário de um espaço usando regulamento; negociar um pedido de exceção. |
| 17–18 | Opinions, Disagreement and Clarification | Comparar propostas, discordar com respeito e esclarecer uma mensagem ambígua. |
| 19–20 | Suggestions, Trade-Offs and Negotiation | Negociar horário, orçamento e prioridades até registrar um acordo. |
| 21–22 | Detail and Factual Reporting | Transformar notas e dados em relato factual, separando evidência de interpretação. |
| 23–24 | Reported Speech and Indirect Questions | Transmitir recados de fontes diferentes e confirmar informação ausente por perguntas indiretas. |
| 25–26 | Problems, Complaints and Social Repair | Usar comprovante e resposta de atendimento para negociar solução e redigir confirmação. |
| 27–28 | Real-World Progress and Challenges | Comparar recursos, prazo e obstáculos; defender solução e ajustá-la após um imprevisto. |
| 29–30 | Hypotheses and Wishes | Comparar alternativas para uma situação insatisfatória e explicar consequências e limites. |

São propostas para autoria posterior; ainda não estão implementadas. Cada CA deve registrar os termos efetivamente retomados da lexical, a informação nova e o produto final. Alternar entrevistas, documentos, cronologias, negociação, relatos e tomada de decisão. Evitar quinze variações da mesma rodada de perguntas.

## Estrutura de destino e progressão

Lexical: diálogo inicial → vocabulário → verbos → explicações e prática breve → expressões → diálogos/leitura → uso pessoal → música → homework. Ajustar agrupamento ao volume, com conteúdo completo dentro de cada seção.

Comunicativa: cenário concreto → retomada consultável → nova entrada com compreensão → tarefa central → nova informação ou objeção → nova tentativa → fechamento e homework contextualizado. Variar a ordem de acordo com o gênero. Mostrar apenas o papel ativo quando a tarefa exigir descoberta de informação.

Em relação ao A2, exigir respostas mais conectadas, justificativas com evidência, reparo de mal-entendidos, negociação de restrições e acompanhamento de perguntas. A progressão deve aparecer na tarefa, não apenas em mais estruturas gramaticais ou textos maiores.

L31: escolher problema, delimitar objetivo, organizar evidência, ensaiar e aplicar feedback. L32: realizar apresentação e interação, responder a informação inédita e receber feedback por cumprimento da tarefa, organização, compreensão, interação e uso da linguagem. Não repetir a oficina nem exigir decoração do roteiro.

## Implementação recomendada

1. Preservar IDs e dependências; documentar fontes ativas, incluindo o adaptador curricular.
2. Migrar um par lexical/comunicativo para o player compartilhado e revisar sua experiência completa.
3. Criar dados autorais próprios para as 15 comunicativas, substituindo a montagem genérica ativa sem reativar editorial legado.
4. Reorganizar bancos e leituras das lexicais; criar oficina e avaliação distintas.
5. Migrar o restante em pares e verificar flashcards, pronúncia, aluno selecionado, progresso, tema, música e homework.
6. Percorrer todas as seções, validar visualmente com CSS local e ampliar os testes para rejeitar listening vazio, duplicação de avaliação e missões genéricas.

O mapa de fontes deve passar a reconhecer js/v3-curriculum-adapters.js como camada ativa do B1 enquanto a migração não ocorrer. As auditorias estruturais atuais passam mesmo com os problemas editoriais acima; serão necessários contratos de conteúdo mais específicos.

## Resultado da verificação

As 32 páginas foram percorridas, totalizando 393 seções renderizadas; os contadores chegaram ao total em todas elas. As 15 lexicais carregaram musicCloze antes do homework. O plano de sessão pode inserir atividades além do array de dados, por isso o total renderizado difere do inventário VM. O único tipo de exceção registrado foi firebase is not defined, consequência do bloqueio deliberado do SDK externo. Autenticação, salvamento e conclusão não foram validados nesta auditoria; não houve gravação. Os botões de salvar não foram encontrados nesse teste offline; com o SDK indisponível, esse resultado não comprova falha no ambiente autenticado. A integração foi examinada apenas pelo código.

As quatro auditorias mínimas passaram; permanecem 23 avisos preexistentes de diversidade das lacunas musicais. A inspeção da abertura da L2 confirmou instruções e estrutura, mas não aprova aparência com dependências externas bloqueadas.
