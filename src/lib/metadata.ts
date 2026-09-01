import type { Metadata } from 'next';
import { SITE } from './site';

/**
 * Next.js metadata merges `openGraph`/`twitter` shallowly: a page that sets
 * either object replaces the root layout's wholesale, rather than layering
 * page-specific fields onto the site defaults. Writeup and detection pages
 * set a partial openGraph object (title/description/publishedTime/tags) and
 * no twitter object at all — so a shared article link silently loses
 * og:url, og:site_name and og:locale, and its Twitter card falls back to
 * the generic site tagline even though og:title is correctly article-
 * specific. This helper builds a complete, self-sufficient openGraph +
 * twitter pair for every page, so a shared link always previews with that
 * page's own title, description and url rather than the generic root
 * defaults.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  tags?: readonly string[];
}): Metadata {
  const url = `${SITE.url}${path}`;
  // `title` goes through the root layout's `title.template` for the <title>
  // tag automatically, but openGraph.title/twitter.title are not templated —
  // they need the fully expanded string to match what the tab actually shows.
  const fullTitle = `${title} — ${SITE.name}`;
  // Setting openGraph here replaces the root's wholesale, which also drops
  // the root's auto-wired opengraph-image file-convention image — so every
  // page needs to point back at it explicitly.
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: fullTitle }],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(tags ? { tags: [...tags] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@0xZephryx',
      creator: '@0xZephryx',
      title: fullTitle,
      description,
      images: [`${SITE.url}/twitter-image`],
    },
  };
}
