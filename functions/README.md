# Firebase Functions

Este pacote cria o webhook de compra e o provisionamento automatico de professores, mas o caminho recomendado agora e o servidor em `server/` para uso no Render.

## Endpoints

- `GET /healthz`
- `POST /webhooks/kiwify`
- `POST /internal/professors`
- `POST /webhooks/hotmart`

Se voce publicar via Hosting, as rotas publicas ficam em:

- `/api/webhooks/kiwify`
- `/api/webhooks/hotmart`

## Configuracao sugerida

```bash
firebase functions:secrets:set WEBHOOK_SECRET
```

Se quiser parametrizar o restante, use variáveis de ambiente no deploy ou deixe os valores padrão do código.

## Instalar e publicar

```bash
cd functions
npm install
firebase deploy --only functions
```

## Como testar

Envie um `POST /webhooks/kiwify` ou `POST /webhooks/hotmart` com:

- header `x-webhook-secret`
- corpo JSON contendo `email` do professor
- `status` aprovado

Depois do webhook, o professor entra com o email da compra e usa `Esqueci minha senha` no login para ativar a senha, se ainda nao tiver definido uma.
