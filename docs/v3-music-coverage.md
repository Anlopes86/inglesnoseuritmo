# Cobertura do Mapa Musical V3

| Módulo | Lições lexicais mapeadas | Registros | Publicados | Draft justificado |
|---|---|---:|---:|---:|
| A1 | 1–4, 6–9, 11–14, 16–19, 21–24, 26–29 | 24 | 24 | 0 |
| A2 | ímpares 1–29 | 15 | 15 | 0 |
| B1 | ímpares 1–29 | 15 | 15 | 0 |
| **Total** | — | **54** | **54** | **0** |

## Estado de publicação

As 54 atividades foram auditadas contra uma correspondência LRCLIB, a gravação exata no Spotify em contexto BR e cinco posições distintas. Todas estão em `provider-verified` e aparecem na Student View das aulas lexicais correspondentes, imediatamente antes do homework.

As letras são obtidas em runtime e o cache fica somente em `sessionStorage`; nenhuma letra comercial foi adicionada ao repositório. Esta ativação vale para o uso privado do curso. O catálogo continua marcando `commercialPublicationApproved: false` até uma revisão específica de licenciamento para distribuição pública/comercial.

## Verificação

Execute:

```text
node js/music-catalog-v3.test.js
node js/music-cloze-v3.test.js
node tools/audit-v3-music.cjs
```

Resultado esperado: `A1 24/24 · A2 15/15 · B1 15/15 · total 54/54`, com `54 provider-verified`, `0 justified drafts` e `12 pilot flags` preservadas como histórico do rollout inicial.
