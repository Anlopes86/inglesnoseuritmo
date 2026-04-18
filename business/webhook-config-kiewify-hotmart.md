# Guia de Webhook: Kiwify e Hotmart

Este projeto aceita os dois provedores pelo mesmo backend:

- `POST /webhooks/kiwify`
- `POST /webhooks/hotmart`

Se voce quiser proteger a URL, acrescente `?secret=SUA_CHAVE` na configuracao do webhook.
Essa chave deve ser configurada no Render como variavel de ambiente `WEBHOOK_SECRET`.

## O que o backend espera

O webhook precisa entregar pelo menos:

- `email` do comprador/professor
- `name` do comprador/professor, se houver
- identificador do produto ou plano
- status de aprovacao

O backend faz o mapeamento assim:

- `starter` -> `starter`
- `pro` -> `pro`
- `scale` -> `scale`
- qualquer valor sem correspondencia -> `starter`

## Exemplo de payload aceito

```json
{
  "status": "approved",
  "email": "professor@exemplo.com",
  "name": "Professor Exemplo",
  "planId": "pro",
  "order": {
    "id": "ORDER-12345",
    "product_name": "Teacher Pro"
  }
}
```

## Exemplo para Kiwify

Se a Kiwify enviar os dados em JSON, nosso backend tenta ler campos comuns como:

- `email`
- `name`
- `status`
- `planId`
- `productId`
- `product.name`
- `order.id`

Se o evento vier como compra aprovada, a conta do professor e criada ou atualizada automaticamente.

## Exemplo para Hotmart

O Hotmart Webhook permite escolher eventos como:

- `purchase approved`
- `purchase refunded`
- `purchase overdue`
- `subscription cancelation`
- `chargeback`

Para o seu fluxo, o evento principal e `purchase approved`.

## Teste recomendado

1. Envie um webhook de teste.
2. Confirme que a resposta voltou com `ok: true`.
3. Verifique se o usuario apareceu em `students/{uid}` com `role: professor`.
4. Confirme se o professor consegue entrar em `login.html`.

## Observacao importante

Se o fornecedor do checkout nao permitir header customizado, use a query string:

```text
/webhooks/kiwify?secret=SUA_CHAVE
```

ou

```text
/webhooks/hotmart?secret=SUA_CHAVE
```
