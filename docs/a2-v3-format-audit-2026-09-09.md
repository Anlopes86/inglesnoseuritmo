# Auditoria A2 V3 para o novo formato — 9 de setembro de 2026

## Parecer e decisão curricular

Preservar **32 aulas: 15 pares lexical → comunicativa, seguidos de duas consolidações**. O professor confirmou que, a partir do segundo módulo, cada lexical deve ser seguida de uma aula com textos e atividades diversas para praticar o repertório em situações reais. Não aplicar ao A2 o ciclo de duas lexicais do A1 nem aumentar automaticamente para 38 aulas.

A base atual é aproveitável e já atende à alternância. A prioridade é adaptar o player ao formato aprovado, ampliar seletivamente o repertório e tornar as tarefas comunicativas adequadas à tela compartilhada. Não é necessário reescrever todos os textos nem substituir todas as atividades.

Esta etapa é uma auditoria e preparação da migração. As páginas do A2 ainda usam seu player atual; somente três defeitos pontuais foram corrigidos.

## Evidência examinada

- Manifesto js/v3-curriculum.js: 15 lexicais, 15 comunicativas e duas consolidações.
- Fontes canônicas a2-v3-template.js e a2-v3-conversation-template.js, mais os caminhos ativos do player e do tema. A camada editorial legada permanece desativada.
- Inventário de todas as lexicais e de todos os pares. Leitura qualitativa de exemplos no início, meio e fim.
- Navegação das 32 páginas no Chrome: 14 seções por lexical, 10 por comunicativa e 10 por consolidação; 380 seções no conjunto. Sem exceções JavaScript do conteúdo no teste.
- Integrações de interface observadas com Firebase simulado, sem gravação de dados reais.
- Auditorias mínimas V3, audit-a2-v3-final-polish.cjs e audit-a2-v3-module-cards.cjs aprovadas.

**Limite visual:** o ambiente recusou Tailwind, fontes e ícones externos com ERR_NETWORK_ACCESS_DENIED. As capturas documentam o DOM e os componentes locais, mas não validam a aparência final online. Medidas de altura e largura em browser-results.json não devem ser usadas para aprovar o layout do produto. Na migração, preferir CSS local, como no A1, e repetir a inspeção visual com todos os estilos disponíveis. Spotify e serviços de letras não foram validados ao vivo.

## O que já está bom e deve permanecer

- Todas as lexicais têm diálogo introdutório, vocabulário, verbos, explicações, expressões, leitura e perguntas.
- Os verbos já são apresentados com **to** na forma base e têm leitura por síntese de voz.
- As comunicativas já diferem das lexicais: há mensagens, mapas de percurso, menus, pedidos, recibos, relatos, entrevistas, escolhas e negociação.
- Cada comunicativa aponta para sourceLesson e recicla pelo menos seis termos presentes na lexical correspondente. A auditoria de pares confirma essa ligação; isso ainda não prova que todos os termos serão usados espontaneamente pelo aluno.
- Música existe nas 15 lexicais e aparece imediatamente antes do homework; não aparece nas comunicativas ou consolidações. Preservar catálogo, curriculumId e os registros auditados.
- Tema escuro já existe no A2. Precisará apenas compartilhar a preferência visual com o A1: hoje A2 usa insr-theme e A1 usa insr:theme.
- Homework lexical já tem três alternativas autorais contextualizadas, com escrita, fala e aplicação. Preservar a ideia de escolha.

## Ajustes prioritários para o novo formato

| Prioridade | Constatação | Mudança indicada |
|---|---|---|
| Alta | Vocabulário usa cartões que exigem clique para conferir significado. | Lista completa com tradução e exemplo abertos; ocultação coletiva opcional. Uma seção por slide, sem transformar cada palavra em um slide. |
| Alta | 14 lexicais têm oito palavras e seis expressões; L1 tem 19 palavras e dez expressões. | Ampliar bancos com combinações úteis e exemplos pessoais. Como referência editorial, cerca de 14–20 termos e 8–10 expressões onde o tema permitir, sem impor uma quota nem exigir a prática de todos no encontro. |
| Alta | Verbos têm Ouvir, mas não Salvar; a reciclagem comunicativa também não expõe essas ações. | Ouvir e Salvar lado a lado em vocabulário, verbos e expressões, inclusive quando retomados na CA. Salvar significado, exemplo, formas e curriculumId no portal do aluno selecionado. |
| Alta | Role cards dos dois participantes são exibidos juntos. Em atividades chamadas information gap, isso pode revelar justamente a informação que o aluno deveria descobrir. | Mostrar o papel do aluno e o cenário comum. Usar revelação controlada para informação nova, troca de papéis ou mudança da situação. Não chamar de lacuna de informação uma tarefa em que todas as respostas estão visíveis. |
| Alta | O modelo de escuta da CA começa oculto; as instruções pedem escutar sem acompanhar o roteiro. | Para o uso confirmado pelo professor, texto completo por padrão, professor lê e aluno lê depois. Ocultar roteiro permanece opção, não etapa obrigatória. |
| Média | As 15 CAs têm praticamente a mesma sequência de dez seções. Os gêneros e missões variam, mas a experiência pode ficar previsível. | Variar a ordem e a atividade central: reconstruir cronologia, comparar documentos, localizar informação, negociar restrições, responder mensagem, escolher solução e refazer após uma mudança. |
| Média | Listas de questões já são completas, porém não há o índice/Retomar e a revelação coletiva do A1. | Preservar perguntas juntas, adicionar índice, Retomar, estado por seção e revelar/ocultar modelos individualmente ou em conjunto. |
| Média | CORE/EXTENDED/EXTRA é apresentado como orientação; o player não oferece seleção efetiva desses percursos. | Usar orientação breve e índice para seleção real. Evitar instruções técnicas de organização no conteúdo projetado ao aluno. |
| Média | As leituras lexicais têm 50–85 palavras; 14 ficam entre 50 e 61. | Preservar textos curtos como entrada e ampliar a CA com uma informação complementar que mude a decisão, em vez de apenas alongar todos os textos. |
| Média | Homework comunicativo lista três tarefas em sequência, sem indicar claramente se são alternativas. | Explicitar escolha ou uma tarefa essencial e uma extensão. Evitar transformar a lista inteira em obrigação automática. |
| Média | As duas consolidações ainda se apresentam em recipientes como Vocabulary Flashcards e Deep Grammar. | Organizar por situações de desempenho e evidência observável; dar acesso direto a cada missão pelo índice. |

As quantidades acima são propostas de edição para esta plataforma, não exigências oficiais de nível. Um texto curto ou uma estrutura isolada não determina por si só a adequação do curso.

## Progressão a partir do A1 novo

O A1 já introduz compras, direções, passado e planos. No A2, retomar esses temas deve acrescentar uma exigência comunicativa: explicar um motivo, comparar alternativas, confirmar informação, responder a uma restrição ou sustentar perguntas de continuação.

Exemplos:
- Direções: além de dizer o caminho, confirmar duração, ponto de referência e uma alternativa.
- Restaurante: além de pedir comida, combinar preferências e corrigir um pedido.
- Compras: além de perguntar preço, comparar qualidade, respeitar orçamento e escolher.
- Viagem: além de listar ações, ligar acontecimentos e responder perguntas.
- Planos: além de anunciar intenção, distinguir plano/previsão e combinar um próximo passo.

L15 combina relato de acidente, reflexivos e Have you ever...?; L23 reúne moda, stop + -ing/to e die/dye; L29 inclui hope/wish e look forward to. Preservar esses recursos como apoio ou extensão quando não forem necessários à missão. A tarefa final deve pedir um resultado comunicativo claro, não uma demonstração de todos os contrastes gramaticais da página.

## Pares atuais e transferência recomendada

| Aulas | Lexical | Texto/gênero da CA | Ação central a preservar |
|---|---|---|---|
| 1–2 | Welcome Back! Vacation and Weather | Two travel updates | A complete trip story |
| 3–4 | Location and Directions | Route card | Route rescue |
| 5–6 | Sports and Workout | Weekly workout board | Build a balanced week |
| 7–8 | Interests and Preferences | Event and media cards | Plan a free-time hour |
| 9–10 | Food and Drink 1 · Preferences | Food app reviews | The shared-table decision |
| 11–12 | Food and Drink 2 · At a Restaurant | Menu and order ticket | A complete table interaction |
| 13–14 | Personalities and Moods | Message thread | Choose the supportive response |
| 15–16 | Accidents and the Human Body | Incident report | Reconstruct the incident |
| 17–18 | Money and Shopping 1 · Compare and Pay | Product cards and receipt | Best buy under pressure |
| 19–20 | Money and Shopping 2 · Borrow or Lend? | Message exchange | Choose the responsible solution |
| 21–22 | Family and Friendship | Then-and-now captions | A memory with a before and after |
| 23–24 | Fashionable and Unfashionable | Style board | One outfit, one clear purpose |
| 25–26 | Giving and Asking for Advice | Advice column | Decision with consequences |
| 27–28 | The Best and the Worst | Traveler ranking | The best possible day |
| 29–30 | Hopes and Predictions | Goal tracker | A goal you can actually follow |

## Estrutura de destino

### Aula lexical

Diálogo inicial completo → Vocabulary → Verb bank → Helping You → práticas em listas → Expressions → diálogos de aplicação/leitura → uso pessoal e breve autoavaliação → Music Moment → Homework.

Unir ou separar explicações em seções conforme a legibilidade. Conteúdo rico deve ficar consultável; não deve exigir muitos cliques para existir na tela.

### Aula comunicativa

Situação de abertura → retomada breve dos termos úteis → texto/documento com compreensão → atividade de informação ou escolha → interação com objetivo → mudança da situação → nova tentativa e feedback → tarefa curta.

Não impor todas essas etapas a todas as aulas. Cada CA deve ter um gênero, uma situação e um resultado próprios. Exemplos de resultado: pedido corrigido, produto escolhido com justificativa, rota confirmada ou recado compreendido.

Para cada par, registrar:
1. Quais palavras e expressões da lexical o texto retoma.
2. Quais aparecem no apoio, sem obrigar o aluno a usar todas.
3. Qual decisão ou informação exige que o aluno fale.
4. Qual evidência mostra que a tarefa foi cumprida.
5. Qual mudança permite uma segunda tentativa com linguagem diferente.

## Defeitos corrigidos nesta auditoria

### Contador de slides

A camada de tema guardava a lista de slides antes de o conteúdo terminar de inserir novas seções. Na L1, havia 14 slides, mas o cabeçalho mostrava 2 / 10. Corrigido em a2-v3-lesson-theme.js: consultar os slides atuais ao sincronizar e observar mudanças no conteúdo. O teste agora exige contador correto em todas as seções das 32 aulas.

### Finalização sem confirmação de gravação

O player redirecionava ao módulo mesmo quando markLessonAsComplete retornava false. Corrigido em a2-v3-lesson-content.js: permanecer na aula, apresentar feedback e reabilitar o botão. Testado com gravação simulada recusada em todas as páginas; nenhum progresso real alterado.

### Instrução incorreta no Quick Start

A CA herdava “Clique nos cartões para ver o significado e ouvir a pronúncia”, embora seus cartões fossem perguntas estáticas. Substituída no template ativo por uma instrução de resposta oral e pergunta ao professor.

## Plano de migração

1. Preservar os 32 IDs e os 15 vínculos lexical/comunicativa enquanto o escopo das aulas permanecer equivalente.
2. Extrair um player compartilhado a partir do A1, parametrizado por módulo; não copiar referências a A1, URLs ou coleções para A2.
3. Migrar primeiro o par L1–L2: permite comparar vocabulário rico, texto de viagem, entrevista, música e flashcards.
4. Aplicar o contrato aos outros 14 pares, revendo gêneros e objetivos da CA. Manter as fontes atuais como origem e registrar cada fatia.
5. Migrar as duas consolidações como missões selecionáveis.
6. Atualizar o hub e validar aula lexical, comunicativa e consolidação em claro/escuro, incluindo tela compartilhada.
7. Reexecutar as auditorias existentes e testes de navegação, respostas, música/homework, salvamento no aluno correto e falhas de rede.

Critérios de aceite: seção completa por slide; repertório aberto; controles Ouvir/Salvar consistentes; diálogo inicial lexical; texto disponível para leitura conduzida; CA sem cópia mecânica da lexical; música só nas lexicais antes do homework; conclusão somente após gravação confirmada; nenhuma instrução incompatível com aula individual.

## Validação e arquivos

- tools/audit-a2-v3-format-browser.cjs: percorre as 32 aulas, verifica contador, isolamento do slide, finalização com falha simulada e registra inventário de ações.
- artifacts/a2-format-audit/browser-results.json: evidência por seção.
- Auditorias mínimas e específicas aprovadas. Persistem 23 avisos musicais preexistentes no conjunto V3, oito deles A2, sobre diversidade de respostas das lacunas.
- Sem publicação, sem alteração curricular e sem mudança em dados de alunos.
