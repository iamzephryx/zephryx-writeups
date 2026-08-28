# Working notes for this repo

Next.js 15 App Router, static export (`out/`) served by Cloudflare Workers.
Sibling of `zephryx.in`, `zephryx-academy` and `Zephryx-Security` —
deliberately a separate Worker so a bad push here can't take the other sites
down.

This is the **research** site: writeups, the Sigma detection library, and the
ATT&CK coverage board that ties them together. It was split out of
`zephryx.in`, which keeps the portfolio job — identity (`/whoami/`), the tool
and CVE arsenal (`/arsenal/`), and contact (`/handshake/`). The brand follows
the domain rather than the contents: the site is named for writeups because
`writeups.zephryx.in` is the address people type, even though a third of what
is here is detection rules.

## Why these four things live together

Writeups, detections, the matrix and search are **one unit**, and splitting
them would break real behaviour rather than just being inconvenient:

- `getCoverage()` in `src/lib/attack.ts` reads writeups *and* detections to
  work out which emulated technique has a rule written for it. Move one
  collection away and the board silently under-reports.
- `/search/` indexes both collections, and `CrossContentHint` tells a reader
  filtering writeups that detections match their query too.
- Detections cross-link to the writeup that prompted them ("written in
  response to"), and writeups link back to the rules that came out of them.

The arsenal deliberately did **not** come along: `arsenal.ts` never fed the
coverage calculation or the search index, so it is portfolio proof-of-work,
not research content, and it stays on `zephryx.in`.

## Anything a reader might copy gets a copy control

Inherited from `zephryx.in` as a standing rule, and it matters more here than
anywhere else in the network — a detection page exists so somebody can take
the rule and deploy it. If a value on the page exists so somebody can take it
— a rule, a query, a command, a fingerprint, an identifier — it ships with a
way to take it. Select-and-drag out of a scrolling `<pre>` does not count.

Two pieces implement it; reuse them rather than writing a third:

- **Fenced code blocks** — `codeBlockActions()` in `src/lib/codeblock.ts` is a
  `marked` `code` renderer that wraps each block in a labelled figure with the
  controls. `download: 'always'` offers every block as a file (detections,
  where blocks are rules you deploy); `download: 'named'` offers only blocks
  whose fence names a file (` ```bash recon.sh `), which keeps pasted output
  from being dressed up as something worth saving. Copy is offered either way.
  Bodies render through `<ProseBody html={…} />`, which binds one delegated
  listener for the page.
- **Single values** — `<CopyValue value={…} label={…} />`, used next to the
  value rather than replacing it.

Controls are inert markup until the client component mounts, every copy or
download announces its result through a `role="status"` region, and clipboard
writes go through `copyText()` in `src/lib/browser.ts` (which falls back to a
hidden textarea outside secure contexts). All of it is verified against the
CSP in `public/_headers` — `default-src 'self'` permits the blob save, but
re-check if that policy tightens.

## This site has no attack surface — keep it that way

There is no form, no `/api/*` route, and therefore no Worker script:
`wrangler.jsonc` has no `main` and no `run_worker_first`, so requests are
served straight from the static export. The sibling sites each carry exactly
one input endpoint and a stack of defences around it; this one carries zero,
which is the cheapest posture to hold. Don't add an endpoint here — if
something needs to collect input, it belongs on the site that already owns
that job.

If a route ever needs a permanent redirect (a renamed slug), add
`main: "worker/index.ts"` plus `run_worker_first: true` and follow the
`REDIRECTS` map pattern in `zephryx.in`'s `worker/index.ts` rather than
inventing a second mechanism.

## Other things worth knowing

- Both markdown pipelines disable raw HTML (`html: () => ''`). Content is
  first-party, but that keeps stored XSS off the board entirely — don't
  re-enable it to solve a formatting problem.
- The build is the validator: a malformed ATT&CK id, an unknown technique, or
  a writeup image pointing at a missing file fails `npm run build` rather than
  shipping a quiet gap in the coverage matrix.
- `npm run lint` is not usable — there's no ESLint config, so `next lint`
  drops into an interactive setup prompt. Use `npx tsc --noEmit` plus
  `npm run build`.
- The CSP is `default-src 'self'`. Any external script, font or analytics
  origin needs `public/_headers` widened first, and that should be a
  deliberate decision rather than a fix for a broken embed.
