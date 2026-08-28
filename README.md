# zephryx-writeups

The research half of [Zephryx](https://zephryx.in) — served at
**[writeups.zephryx.in](https://writeups.zephryx.in)**.

- **Writeups** — CTF boxes and real engagements, dead ends included.
- **Detections** — the Sigma rules that came out of them, with tuning notes.
- **ATT&CK board** — which emulated techniques actually have a rule yet.
- **Search** — one box across every collection.

Next.js 15 App Router, statically exported to `out/` and served by Cloudflare
Workers Static Assets. No server, no database, no form — the whole site is
files on a CDN.

## The Zephryx network

| Site | Job |
|---|---|
| [zephryx.in](https://zephryx.in) | Portfolio, tooling & CVEs, contact |
| **writeups.zephryx.in** | Research: writeups, detections, ATT&CK board |
| [academy.zephryx.in](https://academy.zephryx.in) | Training & cheatsheets |
| [security.zephryx.in](https://security.zephryx.in) | Penetration testing services |

Each deploys as its own Worker so a bad push to one can't take the others
down.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Checks before pushing

`npm run lint` is not wired up (no ESLint config — `next lint` drops into an
interactive setup prompt). Use:

```bash
npx tsc --noEmit
npm run build
```

The build is the validator: a malformed ATT&CK id, an unknown technique, or a
writeup pointing at a missing image fails the build rather than shipping a
quiet gap.

## Adding content

Markdown under `content/`, rendered at build time.

- `content/writeups/<slug>.md` — images go in
  `public/writeups/<slug>/`.
- `content/detections/<slug>.md` — fenced blocks become deployable rules with
  copy and download controls attached automatically.

Frontmatter drives the indexes, the ATT&CK board and the search index; see an
existing file in either directory for the shape.

## Deploy

```bash
npm run deploy       # next build && wrangler deploy
```

See `CLAUDE.md` for the architectural rules that apply when changing this
repo.
