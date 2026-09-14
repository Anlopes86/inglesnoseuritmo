# Primeira fatia de correções para comercialização

Escopo autorizado: vínculo do aluno por aula/aba e permissões de alteração do cadastro. Implementação local em 13/09/2026, preservando a aparência do portal, dos flashcards e das aulas. Nenhuma publicação ou gravação em contas reais.

## Vínculo do aluno

- Painel e portal passam `studentId` ao abrir módulos. Os cinco hubs V3 carregam o perfil verificado e transportam o mesmo contexto aos links de aula.
- `js/student-context.js`, carregado por `js/firebase-config.js`, captura a seleção uma única vez. O identificador explícito do endereço tem precedência. Para endereços antigos sem parâmetro, usa a seleção existente na abertura; não a consulta novamente ao salvar.
- Aulas preservam o contexto ao voltar ao hub, recarregar e concluir. O aluno autenticado sempre usa seu próprio UID; valores de papel ou aluno em armazenamento local não concedem acesso.
- Progresso e salvamento de palavras conferem novamente o perfil e o vínculo do professor. Administradores podem atuar no aluno explicitamente selecionado; perfil ausente, aluno inexistente, vínculo incorreto, mudança de conta ou falha de carregamento do contexto impedem a gravação.
- A identificação explícita acompanha a construção dos links mesmo se ocorrerem consultas simultâneas. A página do painel continua usando seu dropdown existente; esta fatia não reformula o gerenciamento de várias abas do próprio painel.
- O helper atende também às páginas antigas que já carregam os serviços compartilhados. A conferência visual desta etapa concentrou-se nos módulos V3; não equivale a percorrer todas as páginas legadas.

## Cadastro

Em `firestore.rules`, o aluno só pode alterar `progress` no próprio cadastro, e esse campo deve permanecer um mapa. Alterações, inclusões ou remoções de módulos, pacote, contagem de aulas, papel, professor e demais campos administrativos ficam fora da permissão de autoedição. A permissão existente do professor responsável e do administrador permanece. Regras de cards, avaliações e Aura não foram modificadas.

Progresso continua sendo autodeclarado pelo aluno; não é comprovação autenticada de avaliação/certificação. Esta mudança restringe o cadastro e não implementa proteção do conteúdo HTML público.

## Verificações concluídas

- `tools/audit-student-context.cjs`: duas abas, precedência da URL, captura de seleção antiga, papéis verificados, aluno no próprio cadastro, administrador, negações, troca de conta durante e após consulta, mudança de vínculo e falha de carregamento do helper.
- Testes de login, confiabilidade dos flashcards e registro de encontros passaram.
- Auditorias A2 de cards e acesso passaram. A matriz inclui liberação específica V3, liberação geral A2, recusa de V2 isolado, de outros módulos e de ausência de liberação. O teste de acesso agora roda o código real em ambiente simulado sem depender de Chrome instalado.
- As quatro auditorias V3 obrigatórias passaram. Permanecem os 23 avisos musicais já registrados, sem nova checagem de provedores.
- Navegador, serviços fictícios: 166 links nos cinco hubs carregaram o aluno B corretamente; A2 na visão de aluno manteve 31 de 32 aulas bloqueadas, ignorando o aluno diferente da URL.
- Fluxo real de controles na prévia: abrir A1 com aluno A → selecionar B em outra aba → salvar palavra → concluir aula. Gravações simuladas foram para `users/qa-a/myCards/...` e `students/qa-a`; retorno ao hub manteve `studentId=qa-a`. Inspeção visual de A1, A2, B1 e do hub compartilhado B2/C1.

## Validação das regras concluída

Após a autorização para continuar, o Java 21 foi obtido do projeto oficial Eclipse Temurin e o arquivo foi conferido pelo SHA-256 informado pelo fornecedor. O runtime foi extraído somente em .tmp/security-emulator/java21, sem instalação global.

O teste tools/audit-student-rules.cjs executou as regras reais do repositório no Firestore Emulator 1.20.4: **33 verificações passaram**, com projeto fictício demo-insr-security e conexão restrita a 127.0.0.1:8085. Foram confirmados progresso permitido, campos administrativos negados, sobrescrita/exclusão negadas ao aluno, permissões do professor responsável e administrador, isolamento de outros usuários, cards e avaliações. Nenhum cadastro real foi utilizado.

A primeira execução encontrou uma falha de mensagens do emulador com locale pt_BR. Foi interrompida e repetida com as propriedades Java -Duser.language=en e -Duser.country=US. A segunda execução terminou com código zero e as 33 verificações aprovadas. Isso não altera o idioma do sistema ou do site.

Evidência: artifacts/student-context-security/rules-result.json registra resultado, versões e hash do arquivo de regras testado. O teste aceita somente FIRESTORE_EMULATOR_HOST=127.0.0.1:<porta>; clearFirestore atua apenas no projeto fictício do emulador.

Para repetir, com Java 21 e Firebase CLI disponíveis no PATH, executar em um terminal de teste:

```powershell
$env:JAVA_TOOL_OPTIONS = '-Duser.language=en -Duser.country=US'
firebase emulators:exec --only firestore --project demo-insr-security --config firebase.security-test.json "npm run test:student-rules"
```

## Publicação pendente

A primeira fatia funcional está implementada e validada localmente. A publicação precisa incluir os scripts modificados, o novo helper e a implantação separada das regras do Firestore. Um push de arquivos ao GitHub Pages sozinho não atualiza as regras do banco. As regras atualmente implantadas não foram consultadas nem alteradas nesta etapa. Não houve push ou implantação.

Prévia reproduzível e isolada: `node tools/serve-student-context-preview.cjs`, na porta 8770. Todas as páginas HTML servidas por essa ferramenta recebem Firebase fictício; a ferramenta não deve ser usada como hospedagem de produção.
