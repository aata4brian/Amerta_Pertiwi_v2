# Canonical repository decision

Decision date: 21 September 2026.

| Evidence | Earlier `Amerta-Pertiwi` | `Amerta_Pertiwi_v2` |
| --- | --- | --- |
| Main baseline | `3df7cae` | `868415b` |
| HTML pages | 12 | 14 |
| Structure | `assets/site.css`, `assets/site.js` | Separate CSS, responsive CSS, JS and configuration |
| Configuration | JS-embedded settings | `assets/js/config.js` |
| Main commits at audit | 1 | 2 |
| Additional development | None found | `Develop` at `4fcd3f2` |
| Hosting metadata | `amerta-pertiwi.vercel.app` | `amerta-pertiwi-v2.vercel.app` |

Use this repository as the canonical **portfolio entry** because it provides the more structured baseline and the continuing development branch. This is not a claim that every page is complete or that `Develop` is production-ready.

`Develop` modifies 17 files relative to `main` (1,793 insertions and 433 deletions in the audited comparison). It remains intact. No history rewrite, deletion, archive action, rename, production deployment or branch merge is part of this change.

The earlier repository receives a superseded notice linking here. Retain its history as design context. A later `amerta-pertiwi` rename is optional after confirming Vercel binding, remote URLs and external links. Git tags can track releases after an approved release; no release is invented merely to replace the `v2` suffix.
