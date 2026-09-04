# Conversation 01–48 — reopened delivery report

## Status

The editorial/runtime and visual remediation is implemented and audited. The musical finish is **not complete**: lessons 1–48 contain 144 `draft-until-provider-match` records and zero `provider-verified` records because authenticated Spotify BR playback and human occurrence/player/cloze checks were not available. By explicit product-owner authorization, draft entries now display their exact Spotify embed and fetch lyrics at runtime without being promoted.

No commit, push, merge, pull request, or deployment was performed.

## Editorial quality

- L31 was compared with `git show HEAD:conversation/licao-31.html` and restored as the benchmark: three distinct four-question progressions, `The Streaming Revolution`, `High Culture or Pop Culture?`, six contextual practices, specific oral production, and a natural modeled homework.
- L1–48 now contain 240 warm-ups, 288 individually curated expression examples, 576 distinct song questions, 96 concrete contexts, 288 real-situation practice clues, 192 specific oral prompts, and 48 modeled homework tasks.
- Generic migration fillers, definition-slice practices, broken punctuation, embedded examples in meanings, literal entities, duplicate numbering/quotes, and repeated generic context cards are rejected by `audit-lessons-01-48.cjs`.
- Commercial lyrics are not persisted in lesson data or the music catalog.

## Music status and explicit decisions

- `provider-verified`: **0/144**.
- Drafts pending human verification: **144/144**.
- LRCLIB metadata candidates with five distinct gap positions: **144/144**. These are candidate positions only, not approvals.
- L20 song 2 is `Man in the Mirror - 2012 Remaster` by Michael Jackson, Spotify track `3c7Ctlw9MKlIQPxRH3fOTt`; the Squeeze House cover is no longer used.
- L44 song 1 explicitly replaces the unmatched `Hakuna Matata` entry with `Circle of Life` by Carmen Twillie and Lebo M., Spotify track `0H2960m5fFKxfEsOvJgI3W`. A same-recording LRCLIB candidate was found, but the entry remains a draft pending human verification.
- Draft status now controls publication evidence, not runtime visibility: all 144 entries expose the player and request LRCLIB lyrics only when their slide opens. Lyrics remain provider-fetched and session-cached; none are persisted in the repository.
- Every L1–48 record still requires authenticated Spotify BR availability, exact recording/version confirmation, five human-audited occurrences, and real player/cloze testing before promotion.

## Lessons 49–64 and flashcards

- The unified runtime preserves all three existing homework options and renders three `[data-homework-option]` cards. It no longer reduces the array to `lesson.homework[0]`.
- Rendered L49 and L64 checks passed on desktop and mobile; the full browser audit covered every L49–64 page in both profiles.
- Flashcards expose one semantic term, meaning, and example selector each. Pronunciation is bound only to the term. Save payload attributes contain the term and meaning/example, never `Show meaning` or `Show expression`. The invalid nested-button markup was removed and the full card dimensions were restored.
- Practice uses the prior vertical six-situation layout again; the temporary three-column compact grid was removed.

## Browser coverage

- Final visual/runtime run `conversation-visual-runtime-final`: **128/128 pages opened** (L1–64, desktop and mobile), all 14 slides traversed per page, zero failures. Each of the 384 rendered music slides was required to contain one Spotify iframe, a ready lyrics activity, and exactly five gaps. Deterministic provider responses were used to make this complete UI-integration run stable and non-rate-limited.
- Targeted real-provider run `real-provider-l31` passed all three L31 music slides with live LRCLIB responses and live Spotify embeds.
- L31 screenshots separately cover expressions, music, and Practice on desktop and mobile. The audit rejects collapsed flashcard faces, invalid nested buttons, non-vertical Practice, horizontal overflow, and content that cannot scroll clear of the fixed footer.
- Screenshots are stored in run-specific directories under `artifacts/conversation-qa/`; 25 stale PNGs from the unscoped root were removed and are not accepted as evidence.
- The in-app browser runtime had no available browser instance. Repository Playwright/Chromium performed the real rendered-page audit.

## Validation

- PASS: `node conversation/audit-lessons-01-48.cjs`
- PASS: `node conversation/audit-conversation-music-01-48.cjs`
- PASS: `node conversation/audit-lessons-49-64.cjs`
- PASS: `node conversation/audit-conversation-music-cloze.cjs`
- PASS: `node conversation/conversation-music-cloze.test.cjs`
- PASS with the coverage above: `node conversation/audit-conversation-browser.cjs`
- PASS: `node tools/audit-v3-semantics.cjs`
- PASS with 23 existing music repetition warnings: `node tools/audit-v3-music.cjs`
- PASS: `node a2-v3/audit-conversation-lessons.cjs`
- PASS: `git diff --check` (line-ending notices only)
- PRE-EXISTING UNRELATED FAILURE: `node tools/audit-v3.cjs` reports `A1-V3 L5: homework pessoal e adequado ao bloco ausente.` This comes from the already-dirty A1 registry work and was preserved.

## Remaining work

The module must not be described as having complete musical finish until a human performs all provider checks for the 144 drafts. Licensing and authenticated answer/correction architecture also remain required before commercial/public lyric use.
