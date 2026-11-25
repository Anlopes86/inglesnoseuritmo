# Cobertura do Mapa Musical V3

| Módulo | Lições lexicais mapeadas | Registros | Ativos no catálogo | Draft justificado |
|---|---|---:|---:|---:|
| A1 | 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23, 25, 26, 28, 29, 31, 32, 34, 35 | 24 | 24 | 0 |
| A2 | ímpares 1–29 | 15 | 15 | 0 |
| B1 | ímpares 1–29 | 15 | 15 | 0 |
| **Total** | — | **54** | **54** | **0** |

## Estado de publicação

As 54 atividades foram auditadas contra uma correspondência LRCLIB, a gravação exata no Spotify em contexto BR e cinco posições distintas. Todas estão em `provider-verified` e aparecem na Student View das aulas lexicais correspondentes, imediatamente antes do homework.

As letras são obtidas em runtime e o cache fica somente em `sessionStorage`; nenhuma letra comercial foi adicionada ao repositório. Esta ativação vale para o uso privado do curso. O catálogo continua marcando `commercialPublicationApproved: false` até uma revisão específica de licenciamento para distribuição pública/comercial.

## Conferência de 2026-11-09

- As 54 referências do Spotify retornaram o player da faixa cadastrada e as 54 letras do LRCLIB permitiram montar as cinco lacunas após reteste. Na rodada final, 13 faixas exigiram nova consulta. A consulta ao player verifica a referência da faixa. A reprodução integral no Brasil requer conferência de escuta.
- Em 23 exercícios, as cinco lacunas se distribuem entre uma ou duas respostas diferentes. Em 19, a primeira e a última lacuna abrangem mais de 20 linhas do provedor principal. Começar a revisão pelos exercícios em que a repetição torna o preenchimento previsível e pelos que exigem acompanhar grande parte da gravação, como A1 L20.
- O slide usa ordem de leitura para a numeração e identidade da lacuna para a correção. A prática na tela compartilhada oferece acesso direto a cada campo, revelação individual, retorno ao player, nova tentativa de carregar a letra e conversa de contingência. Cada faixa tem três perguntas de transferência ligadas à aula.

## Verificação

Execute:

```text
node js/music-catalog-v3.test.js
node js/music-cloze-v3.test.js
node tools/audit-v3-music.cjs
```

Resultado esperado: `A1 24/24 · A2 15/15 · B1 15/15 · total 54/54`, com `54 provider-verified`, `0 justified drafts` e `12 pilot flags` preservadas como histórico do rollout inicial.
