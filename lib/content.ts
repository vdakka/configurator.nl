import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function readJson<T>(relative: string): T {
  const raw = fs.readFileSync(path.join(CONTENT_ROOT, relative), 'utf-8');
  return JSON.parse(raw) as T;
}

export type HeroHeadline = { pre: string; highlight: string; post: string };

export type HomepageContent = {
  seo: { title: string; description: string };
  hero: {
    metaStrip: string[];
    headline: HeroHeadline;
    sub: string;
    primaryCta: string;
    secondaryCta: string;
  };
  trustStrip: {
    label: string;
    logos: Array<{ slug: string; name: string; ext: 'svg' | 'png' }>;
    quote?: { text: string; name: string; role: string; company: string };
  };
  marketShift: {
    eyebrow: string;
    title: string;
    lede: string;
    blocks: Array<{ num: string; title: string; body: string }>;
  };
  quickscanTeaser: {
    eyebrow: string;
    title: string;
    lede: string;
    meta: Array<{ value: string; label: string }>;
    cta: string;
    exampleStatement: string;
    exampleLabel: string;
  };
  discovery: {
    eyebrow: string;
    title: string;
    lede: string;
    axes: Array<{
      id: string;
      tag: string;
      label: string;
      coord: string;
      shape: 'sphereY' | 'sphereY2' | 'sphereB' | 'capB';
      glyph: 'target' | 'figures' | 'nodes' | 'chip';
      detailTitle: string;
      detailBody: string;
      chips: string[];
    }>;
    phases: Array<{ num: string; title: string; body: string }>;
    cta: string;
    tip: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    lede: string;
    linkLabel: string;
    linkHref: string;
    items: FAQItem[];
  };
  contactCta: {
    eyebrow: string;
    title: string;
    body: string;
  };
};

export function getHomepage(): HomepageContent {
  return readJson<HomepageContent>('homepage.json');
}

export type AanpakContent = {
  seo: { title: string; description: string };
  breadcrumb: Array<{ label: string; href: string }>;
  hero: { eyebrow: string; headline: HeroHeadline; sub: string; primaryCta: string; secondaryCta: string };
  stats: Array<{ value: string; label: string }>;
  definition: { title: string; body: string };
  audiences: Array<{ num: string; title: string; body: string }>;
  axesIntro: { eyebrow: string; title: string; titleSub: string; lede: string };
  axes: Array<{
    id: string;
    tag: string;
    shape:
      | 'sphereY'
      | 'sphereY2'
      | 'sphereB'
      | 'capB'
      | 'bigTubeY'
      | 'bigTubeY2'
      | 'bigTubeB'
      | 'smallCubeY'
      | 'smallCubeY2'
      | 'smallCubeB'
      | 'cubeY';
    title: string;
    titleSub: string;
    intro: string;
    questions: string[];
    deliverables: string[];
  }>;
  timeline: {
    eyebrow: string;
    title: string;
    lede: string;
    phases: Array<{ week: string; title: string; body: string; who: string; highlight: boolean }>;
  };
  deliverables: {
    title: string;
    lede: string;
    items: Array<{ num: string; title: string; body: string; tag: string }>;
  };
  faq: { title: string; note: string; linkLabel: string; linkHref: string };
  finalCta: {
    eyebrow: string;
    title: string;
    options: Array<{ tag: string; title: string; body: string; href: string }>;
  };
};

export function getAanpak(): AanpakContent {
  return readJson<AanpakContent>('aanpak.json');
}

export type ContactContent = {
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; lede: string };
  options: Array<{ tag: string; title: string; body: string; href: string; cta: string }>;
};

export function getContact(): ContactContent {
  return readJson<ContactContent>('contact.json');
}

export type StatsConfig = {
  heroStats: Array<{ display: string; label: string }>;
  sources: string[];
};

export function getStats(): StatsConfig {
  return readJson<StatsConfig>('stats.json');
}

export type FAQItem = { q: string; a: string; open?: boolean };
export function getAanpakFAQ(): FAQItem[] {
  const data = readJson<{ aanpak: FAQItem[] }>('faqs.json');
  return data.aanpak;
}

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  portrait: string;
  /**
   * Transparante PNG-variant zonder achtergrond — bedoeld voor /v2
   * (Merkboek 2026). v2-componenten kiezen deze i.p.v. `portrait` zodat
   * we de juiste achtergrond per spoor zelf kunnen bepalen. Optioneel
   * gemaakt zodat oude code niet breekt als asset (nog) ontbreekt.
   */
  portraitV2?: string;
  portraitAlt: string;
  linkedin: string;
};
export function getGerke(): TeamMember {
  const data = readJson<{ gerke: TeamMember }>('team.json');
  return data.gerke;
}

export type Statement = { id: string; text: string };
export type StatementsConfig = {
  core: Statement[];
  b2b: Array<Statement & { swapIndex: number }>;
  b2c: Array<Statement & { swapIndex: number }>;
};
export function getStatements(): StatementsConfig {
  return readJson<StatementsConfig>('quickscan/statements.json');
}

export function getQuickscanMicrocopy(): Record<string, unknown> {
  return readJson('quickscan/microcopy.json');
}

export type CaseMeta = {
  title: string;
  slug: string;
  client: string;
  tags: string[];
  summary: string;
  brands?: string[];
  stats?: Array<{ value: string; label: string }>;
};

export function getCaseList(): CaseMeta[] {
  const dir = path.join(CONTENT_ROOT, 'cases');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      const { data } = matter(raw);
      return data as CaseMeta;
    });
}

export function getCase(slug: string): { meta: CaseMeta; body: string } | null {
  const file = path.join(CONTENT_ROOT, 'cases', `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);
  return { meta: data as CaseMeta, body: content };
}
