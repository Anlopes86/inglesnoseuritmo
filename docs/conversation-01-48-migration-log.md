# Conversation 01–48 migration log

## Origin and safety

- Origin branch: `fix/a1-v3-final-polish`
- Origin commit: `7511349c9d5bf06dc028fc02dbe9ee3d53e5023b`
- The worktree already contained unrelated A1-V3 and music-catalog changes. They were preserved; no branch switch, pull, reset, clean, push, merge, PR, or deploy was performed.
- The read-only pre-migration inventory is in `docs/conversation-01-48-baseline.md`.

## Slice 1 — Lessons 1–8

- Extracted authorial lesson content into the canonical data source.
- Normalized every lesson to the 14-slide contract.
- Repaired the three invalid L3 Spotify IDs and removed legacy inline players, duplicated Firebase loading, and broken local script paths from the generated shells.
- Added five warm-ups, six aligned expressions, three four-card debates, two transfers, deterministic lexical practice, oral production, modeled homework, and closing per lesson.
- Registered 24 music records as blocked drafts; no lyric was copied.

## Slice 2 — Lessons 9–16

- Migrated 24 music records and normalized all eight lessons.
- Rebuilt L13 with neutral language about context, responsibility, safeguards, repair, and reintegration; removed literal Markdown.
- Rebuilt L16 around automation, privacy, human review, workplace autonomy, and accountable high-stakes decisions.
- Kept sensitive or explicit material out of persisted gaps and Student View.

## Slice 3 — Lessons 17–24

- Migrated 24 music records and normalized all eight lessons.
- Repaired the exact Spotify metadata for L17 and L24.
- Rebuilt L24 around platform work, freelance contracts, remote/hybrid policy, predictable payment, and burnout protections; removed YouTube and dated copy.
- Removed synthetic interpretations and all persisted lyric material.

## Slice 4 — Lessons 25–32

- Migrated 24 music records and normalized all eight lessons.
- Rebuilt L25 around source tracing, framing, corroboration, algorithms, and non-partisan trade-offs.
- Corrected Twenty One Pilots metadata, the L28 Spotify ID, and the L30 `Thrift Shop` track ID.
- Removed the L27 literal formatting residue and fixed deterministic practice alignment.

## Slice 5 — Lessons 33–40

- Migrated 24 music records and normalized all eight lessons.
- Consolidated L34 song 2 as `Private Eyes`, eliminating the `Every Breath You Take` duplication with L2.
- Chose the radio-clean `Forget You` for L35 song 2 and documented the replacement; the record remains blocked pending human verification.
- Removed L39 random answer selection and made all six lexical answers canonical and stable.

## Slice 6 — Lessons 41–48

- Migrated 24 music records and normalized all eight lessons.
- Reconstructed the malformed L43 shell and revised the `Lola` discussion so identity is not treated as a trick.
- Kept L44 `Hakuna Matata` blocked because LRCLIB did not provide usable lyric content.
- Repaired L45 track IDs and rewrote the travel material to avoid exoticizing Africa.
- Consolidated L47 `Make ’Em Laugh` in the canonical source and removed the DOM-patch dependency.
- Revised L48 to remove dated copy and discuss technological and social progress with appropriate historical context.

## Cross-cutting completion

- Replaced 48 duplicated lesson implementations with minimal stable shells and a unified runtime shared with lessons 49–64.
- Removed the obsolete `conversation-lessons-49-64-runtime.js`; `conversation-lessons-runtime.js` now renders 1–64.
- Reduced `conversation-lesson-theme.js` to theme-class installation; it no longer changes songs, prompts, listening text, or practice answers.
- Added structural, music, and Playwright browser auditors.
- Final browser run: 96 page/profile combinations passed; 22 critical screenshots were captured.
- Final catalog state: 144 blocked drafts, 0 provider-verified, 142 candidate five-gap sets, 710 candidate gaps, 0 persisted lyric lines.

## Reopened remediation — 2026-09-02

- Reclassified the prior result as a structural migration, not final musical polish.
- Restored L31 from the committed authorial benchmark and individually curated examples, contexts, debates, practice, oral production, and homework across L1–48.
- Removed migration filler phrases and added audits for repeated/generic prose, malformed quotes/numbering/entities, duplicate contexts, contextual practice, and rendered homework/flashcards.
- Corrected L20 to Michael Jackson's `Man in the Mirror - 2012 Remaster` (`3c7Ctlw9MKlIQPxRH3fOTt`).
- Replaced the unmatched L44 `Hakuna Matata` entry with the explicit editorial choice `Circle of Life` by Carmen Twillie and Lebo M. (`0H2960m5fFKxfEsOvJgI3W`).
- Rebuilt the draft catalog: 144 blocked drafts, 0 provider-verified, 144 LRCLIB five-gap candidate sets, and no persisted commercial lyrics.
- Restored all three rendered homework options in L49–64 and added browser/static regression checks against array flattening.
- Added exclusive flashcard semantics; pronunciation and save extraction now consume term/meaning/example rather than hint text.
- Browser evidence is run-specific. The full audit opened 128/128 desktop/mobile pages; the single L26 desktop overlap it found was fixed and passed an isolated corrective run.
- Preserved the unrelated dirty A1/music-catalog work and performed no commit, push, merge, PR, or deployment.

## Visual/runtime remediation — 2026-09-02

- Removed the invalid button-inside-button flashcard structure and restored full-size card faces on desktop and mobile.
- Restored Practice to the prior vertical six-situation layout and removed the temporary three-column compaction.
- Under explicit product-owner authorization, enabled exact Spotify embeds and provider-fetched runtime lyrics for `draft-until-provider-match` entries without changing their publication status.
- Kept all 144 L1–48 entries as drafts, all lyric text outside the repository, and provider results cached only in `sessionStorage`.
- Strengthened the browser audit to require player + ready five-gap lyrics UI on all 384 music slides, full-size flashcards, legacy Practice layout, and scroll-clear footer behavior.
- Completed a deterministic 128/128 desktop/mobile browser run and a live-provider L31 run covering all three songs.
