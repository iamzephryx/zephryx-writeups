/**
 * Single source of truth for identity, links and metadata.
 * Nothing else in the app should hardcode a link or an email address.
 *
 * Sibling of `zephryx.in`, `zephryx-academy` and `Zephryx-Security`, and
 * deliberately a separate Worker — the four deploy independently so a bad
 * push here can't take the main site down.
 */

export const SITE = {
  /**
   * The brand follows the domain. This site also carries the detection
   * library and the ATT&CK board, not only writeups — the tagline says so,
   * because `writeups.zephryx.in` is the address people will actually type
   * and a name that disagrees with the host reads as a different property.
   */
  name: 'Zephryx Writeups',
  short: 'Writeups',
  /**
   * The human behind the research. Same person as `zephryx.in`'s
   * `legalName` — stated here too so the Person entity resolves to one
   * identity across all four domains rather than four unlinked authors.
   */
  legalName: 'Mihir Sarwan',
  aliases: ['Zephryx', 'Zeph'],
  role: 'Penetration Tester',
  craft: 'Penetration Tester & Security Researcher',
  parentName: 'Zephryx',
  parentUrl: 'https://zephryx.in',
  domain: 'writeups.zephryx.in',
  url: 'https://writeups.zephryx.in',
  tagline: 'Writeups, detection rules, and the ATT&CK board that ties them together.',
  description:
    "The research half of Zephryx — CTF boxes and real engagements written up with the dead ends still in, the Sigma detection rules that came out of them, and an ATT&CK coverage board showing which attacks actually have a rule written for them yet.",
  locale: 'en_IN',
} as const;

/**
 * Profile URLs for the schema.org `sameAs` array only.
 *
 * `zephryx.in` carries the full `SOCIALS` list — labels, blurbs, icons — for
 * its contact page. This site has no contact page, so it needs the URLs and
 * nothing else; duplicating the icon paths here would be copy that drifts.
 */
export const PROFILES: readonly string[] = [
  'https://github.com/0xZephryx',
  'https://x.com/0xZephryx',
  'https://www.linkedin.com/in/zephryx/',
  'https://medium.com/@0xZephryx',
  'https://mastodon.social/@zephryx',
  'https://tryhackme.com/p/zephryx',
];

/**
 * Primary navigation.
 *
 * `label` is the plain word — it has to tell a first-time visitor where the
 * link goes without them having to guess. `cmd` is the terminal name for the
 * same destination, rendered in the dim slot beside it, so the voice stays
 * and the meaning arrives first.
 *
 * `external: true` marks a link to a different origin (a sibling site, not a
 * page on this one) — rendered as a plain anchor opened in a new tab, so it
 * never enters client-side routing and never carries a reader away from
 * whatever they were reading mid-scroll. External entries are clustered
 * behind a divider and carry an outbound glyph, the same treatment
 * `zephryx.in` uses, so "leaves this site" is legible before the click.
 */
export const NAV = [
  { href: '/', label: 'Home', cmd: '~', external: false },
  { href: '/writeups/', label: 'Writeups', cmd: 'cat', external: false },
  { href: '/detections/', label: 'Detections', cmd: 'sigma', external: false },
  { href: '/matrix/', label: 'Techniques', cmd: 'att&ck', external: false },
  { href: '/search/', label: 'Search', cmd: 'grep', external: false },
  { href: SITE.parentUrl, label: 'zephryx.in', cmd: 'parent', external: true },
] as const;

/**
 * Secondary destinations: reachable from the footer, deliberately kept out of
 * the primary nav so it stays legible.
 *
 * `asset: true` marks a static file that lives outside the router — those must
 * be rendered as a plain anchor, because client-side navigation cannot serve
 * them and would 404 into the app shell.
 */
export const FOOTER_LINKS = [
  { href: '/feed.xml', label: 'rss feed', asset: true },
] as const;

/**
 * The rest of the network, for the footer's cross-site column.
 *
 * Every sibling site links back to the others rather than pretending to be
 * the whole of Zephryx — `zephryx.in` is the hub and the other three are
 * one job each.
 */
export const NETWORK = [
  { href: 'https://zephryx.in', label: 'zephryx.in', blurb: 'Portfolio & tooling' },
  { href: 'https://academy.zephryx.in', label: 'academy.zephryx.in', blurb: 'Training' },
  { href: 'https://security.zephryx.in', label: 'security.zephryx.in', blurb: 'Pentest services' },
] as const;
