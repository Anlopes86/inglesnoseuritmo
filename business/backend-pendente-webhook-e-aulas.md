# Backend Pendente: Webhook E Aulas Ao Vivo

## O que ja ficou resolvido no front-end

- base multi-tenant por `teacherId`
- camada inicial de planos e limites
- painel admin para atualizar plano, status e capacidade
- migracao de alunos legados sem `teacherId`
- regras iniciais de Firestore para separar professor, aluno e admin

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
