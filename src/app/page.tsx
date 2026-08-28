import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { getAllWriteups, getLatestWriteups, formatDate } from '@/lib/writeups';
import { getDetectionCount } from '@/lib/detections';
import { getCoverage } from '@/lib/attack';
import { SITE } from '@/lib/site';

/**
 * The landing page is a table of contents, not a pitch.
 *
 * Someone arriving at this host wants the research; the persuasion, the id
 * card and the hire-me path all live on `zephryx.in`. So this page states
 * what is here, proves the numbers against the content that backs them, and
 * gets out of the way — every figure below is derived from the collection it
 * links to rather than typed in, so the page can never claim a count the rest
 * of the site cannot show.
 */
export default function HomePage() {
  const writeups = getAllWriteups();
  const latest = getLatestWriteups(3);
  const ruleCount = getDetectionCount();
  const coverage = getCoverage();

  const SHELVES = [
    {
      href: '/writeups/',
      cmd: 'cat',
      title: 'Writeups',
      count: writeups.length,
      unit: writeups.length === 1 ? 'published' : 'published',
      body: "CTF boxes and real engagements, written up with the dead ends still in — the wrong turns are usually the part worth reading.",
    },
    {
      href: '/detections/',
      cmd: 'sigma',
      title: 'Detections',
      count: ruleCount,
      unit: 'rules',
      body: 'Sigma, with KQL alongside it, plus how each rule was tuned and where it will still miss. Most exist because a writeup made me go write them.',
    },
    {
      href: '/matrix/',
      cmd: 'att&ck',
      title: 'ATT&CK board',
      count: coverage.both,
      unit: `of ${coverage.emulated} closed`,
      body: 'Every technique with a published attack, matched against whether the detection for it exists yet. Some gaps are just me not getting to it.',
    },
  ];

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative px-5 pt-32 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 font-mono text-sm text-ink-dim">
            <span className="text-red-blood">$</span> ls /research
          </p>

          <h1 className="max-w-3xl font-mono text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            The attacks, and{' '}
            <span className="text-red-blood text-glow">what would have caught them</span>.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-dim">
            {SITE.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/writeups/"
              className="clip-tab border border-red-deep bg-red-core px-6 py-3 font-mono text-sm font-medium text-void transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(255,45,75,0.8)]"
            >
              ./read --latest
            </Link>
            <a
              href={SITE.parentUrl}
              target="_blank"
              rel="noopener noreferrer external"
              className="group flex items-center gap-2 px-2 py-3 font-mono text-sm text-ink-dim transition-colors hover:text-red-blood"
            >
              who writes this
              <span className="text-[11px] text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5">
                ↗ zephryx.in
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================= SHELVES ============================= */}
      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {SHELVES.map((shelf, i) => (
            <Reveal key={shelf.href} delay={i * 90}>
              <Link
                href={shelf.href}
                className="panel clip-corner group flex h-full flex-col p-6 transition-all duration-400 hover:-translate-y-1.5 hover:border-red-deep/70 hover:box-glow"
              >
                <div className="flex items-baseline justify-between">
                  <h2 className="font-mono text-lg font-semibold text-ink">{shelf.title}</h2>
                  <span className="font-mono text-[11px] text-ink-faint" aria-hidden>
                    {shelf.cmd}
                  </span>
                </div>

                <p className="mt-4 font-mono text-4xl font-bold text-red-blood text-glow">
                  {shelf.count}
                  <span className="ml-2 align-middle font-mono text-[11px] font-normal uppercase tracking-wider text-ink-faint">
                    {shelf.unit}
                  </span>
                </p>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-dim">{shelf.body}</p>

                <span className="mt-6 inline-flex items-center gap-2 border-t border-line pt-4 font-mono text-sm text-red-blood">
                  open
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================= LATEST WRITEUPS ========================= */}
      {latest.length > 0 ? (
        <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Reveal>
            <SectionHeading
              index="01 / LATEST"
              title="most recent"
              sub="Whatever I've most recently found interesting enough to sit down and actually write about."
            />
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {latest.map((w, i) => (
              <Reveal key={w.slug} delay={i * 90}>
                <Link
                  href={`/writeups/${w.slug}/`}
                  className="panel clip-corner group flex h-full flex-col p-6 transition-all duration-400 hover:-translate-y-1.5 hover:border-red-deep/70 hover:box-glow"
                >
                  <div className="mb-4 flex items-center gap-2 font-mono text-[10px]">
                    <span className="border border-red-deep/40 bg-red-ash/20 px-2 py-0.5 text-red-blood">
                      {w.category}
                    </span>
                    <span className="text-ink-faint">{w.difficulty}</span>
                    <span className="ml-auto text-ink-faint">{w.readingMinutes} min</span>
                  </div>
                  <h3 className="font-mono text-base font-semibold leading-snug text-ink transition-colors group-hover:text-red-blood">
                    {w.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim line-clamp-3">
                    {w.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] text-ink-faint">
                    <span>{formatDate(w.date)}</span>
                    <span className="text-red-blood transition-transform duration-300 group-hover:translate-x-1">
                      read →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 text-center">
              <Link
                href="/writeups/"
                className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-sm text-ink-dim transition-all hover:border-red-deep/70 hover:text-red-blood"
              >
                cat /writeups/* <span>→</span>
              </Link>
            </div>
          </Reveal>
        </section>
      ) : null}
    </>
  );
}
