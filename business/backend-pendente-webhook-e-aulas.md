# Backend Pendente: Webhook E Aulas Ao Vivo

## O que ja ficou resolvido no front-end

- base multi-tenant por `teacherId`
- camada inicial de planos e limites
- painel admin para atualizar plano, status e capacidade
- migracao de alunos legados sem `teacherId`
- regras iniciais de Firestore para separar professor, aluno e admin
- fluxo de login com redefinicao de senha para o professor

## O que ja foi scaffoldado no backend

- `server/index.js` com webhook de compra no Render
- endpoint `POST /webhooks/kiwify`
- endpoint `POST /webhooks/hotmart`
- endpoint interno `POST /internal/professors` para suporte
- criacao automatica de conta de professor no Firebase Auth
- gravacao do perfil do professor em `students/{uid}`
- idempotencia basica via `purchase_events`
- envio automatico de e-mail de boas-vindas com link para criar/redefinir senha, quando SMTP estiver configurado
- deploy independente do front no GitHub Pages

## O que ainda depende de backend

## 1. Automacao de compra

Hoje o projeto nao possui backend proprio.
Por isso a automacao de compra nao pode ficar so no front-end.

### Fluxo recomendado

1. Checkout aprovado.
2. Plataforma de pagamento envia webhook.
3. Backend valida assinatura do webhook.
4. Backend cria ou atualiza a conta do professor.
5. Backend define:
   - `platformPlan`
   - `subscriptionStatus`
   - `studentLimit`
   - `billingCycle`
   - `planStartedAt`
   - `planEndsAt`
   - `accessibleProducts`
6. Backend registra a compra em uma colecao de eventos.
7. Backend envia e-mail ou mensagem com acesso.

### Como o fluxo ficou neste projeto

1. A compra aprovada chama o webhook `POST /webhooks/kiwify`.
1. A compra aprovada chama o webhook `POST /webhooks/hotmart` se a venda vier da Hotmart.
2. O backend cria o usuario do professor no Firebase Auth, se ainda nao existir.
3. O backend grava o perfil com `role: professor` e plano inicial.
4. O professor entra em `login.html` com o email da compra.
5. O professor recebe um e-mail com o link de redefinicao de senha, se o SMTP estiver configurado.
6. Se precisar, o professor tambem pode usar `Esqueci minha senha` em `login.html`.

### Campos recomendados por compra

- `provider`
- `providerOrderId`
- `providerCustomerId`
- `buyerEmail`
- `buyerName`
- `productId`
- `planId`
- `status`
- `amount`
- `currency`
- `approvedAt`
- `rawPayload`

### Colecoes recomendadas

- `purchase_events`
- `subscriptions`
- `billing_logs`

## 2. Upgrades, cancelamento e bloqueio

O admin ja pode ajustar plano e limite manualmente.
Mas o fluxo ideal e automatico:

- `upgrade`: sobe limite e acessos imediatamente
- `downgrade`: agenda efeito no proximo ciclo
- `cancelamento`: mantem acesso ate `planEndsAt`
- `inadimplencia`: muda `subscriptionStatus` para `past_due`

## 3. Agenda e aulas ao vivo

Ainda nao existe agenda integrada nem sala nativa.

### Caminho mais simples

Integrar com links externos:

- Google Meet
- Zoom
- Calendly

### Dados recomendados

- `scheduled_classes`
- `teacherId`
- `studentId`
- `startsAt`
- `endsAt`
- `meetingUrl`
- `provider`
- `status`
- `notes`

### Primeira versao suficiente

- cadastro manual de link de aula
- agenda simples por professor
- historico de aulas realizadas

## Ordem recomendada

1. webhook de compra
2. assinatura e bloqueio por plano
3. agenda simples com link externo
4. integracao real com calendario

Essa ordem reduz risco e evita construir features de aula ao vivo antes de a base comercial estar automatizada.

## Variaveis de ambiente sugeridas

- `WEBHOOK_SECRET`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `APP_URL`
- `DEFAULT_TEACHER_PLAN`
- `DEFAULT_BILLING_CYCLE`
- `DEFAULT_STUDENT_LIMIT`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_SECURE`
- `MAIL_USER`
- `MAIL_PASS`
- `MAIL_FROM`
- `MAIL_FROM_NAME`
- `MAIL_TLS_ALLOW_INVALID_CERTS`
