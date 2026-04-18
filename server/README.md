# Webhook no Render

Este servidor cuida apenas do webhook de compra e do provisionamento automatizado de professores.

## Rotas

- `GET /healthz`
- `POST /webhooks/kiwify`
- `POST /webhooks/hotmart`
- `POST /internal/professors`

## Variaveis de ambiente

Obrigatorias:

- `WEBHOOK_SECRET`
- `FIREBASE_SERVICE_ACCOUNT_JSON` ou arquivo secreto `firebase-service-account.json`

Opcional:

- `DEFAULT_TEACHER_PLAN`
- `DEFAULT_BILLING_CYCLE`
- `APP_URL`

Se preferir, o servidor tambem aceita as variaveis separadas:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### Formato da `FIREBASE_PRIVATE_KEY`

Se voce colar a chave direto no Render, mantenha as quebras de linha como `\n`.

Se usar `FIREBASE_SERVICE_ACCOUNT_JSON`, cole o JSON completo do service account do Firebase em uma unica variavel de ambiente.
Se usar arquivo secreto, envie o JSON baixado do Firebase Console como `firebase-service-account.json`.

## Deploy no Render

1. Crie um novo Web Service.
2. Aponte o `root directory` para `server`.
3. Use `npm install` como build command.
4. Use `npm start` como start command.
5. Configure as variaveis de ambiente acima.

## Teste rapido

```bash
curl https://SEU-SERVICO.onrender.com/healthz
```

## Webhooks

Use estas URLs no checkout:

- `https://SEU-SERVICO.onrender.com/webhooks/kiwify?secret=SUA_CHAVE`
- `https://SEU-SERVICO.onrender.com/webhooks/hotmart?secret=SUA_CHAVE`
