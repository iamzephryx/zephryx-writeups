import Link from 'next/link';
import { FOOTER_LINKS, NAV, NETWORK, SITE } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  // Pages on this site only — the parent-site entry lives in the NETWORK
  // column below, where it sits with the other siblings rather than reading
  // as one more internal route.
  const routes = NAV.filter((item) => !item.external);

  return (
    <footer className="relative z-10 mt-32 border-t border-line/70 bg-abyss/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center border border-red-deep/60 bg-red-ash/20 font-mono text-[13px] font-bold text-red-blood">
                Z
              </span>
              <span className="font-mono text-[15px] font-semibold text-ink">
                writeups
                <span className="text-red-blood">.zephryx.in</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-dim">
              {SITE.tagline} Every attack published here gets checked against what would
              have caught it — that is what the board is for.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[10px] tracking-[0.25em] text-ink-faint">CONTENT</h2>
            <ul className="mt-4 space-y-2.5">
              {routes.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mono text-[13px] text-ink-dim transition-colors hover:text-red-blood"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-mono text-[13px] text-ink-dim transition-colors hover:text-red-blood"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="The Zephryx network">
            <h2 className="font-mono text-[10px] tracking-[0.25em] text-ink-faint">
              THE ZEPHRYX NETWORK
            </h2>
            <ul className="mt-4 space-y-3.5">
              {NETWORK.map((site) => (
                <li key={site.href}>
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="group block"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-[13px] text-ink-dim transition-colors group-hover:text-red-blood">
                      {site.label}
                      <span className="text-[10px] text-ink-faint" aria-hidden>
                        ↗
                      </span>
                    </span>
                    <span className="mt-0.5 block text-[11px] text-ink-faint">{site.blurb}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-ink-faint">
            © {year} {SITE.legalName} · {SITE.domain}
          </p>
          <p className="font-mono text-[11px] text-ink-faint">
            part of{' '}
            <a
              href={SITE.parentUrl}
              target="_blank"
              rel="noopener noreferrer external"
              className="text-ink-dim transition-colors hover:text-red-blood"
            >
              {SITE.parentName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
