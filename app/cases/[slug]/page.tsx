import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getCase, getCaseList } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function generateStaticParams() {
  return getCaseList().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data = getCase(params.slug);
  if (!data) return {};
  return {
    title: data.meta.title,
    description: data.meta.summary,
    alternates: { canonical: `/cases/${params.slug}` },
  };
}

export default function CaseDetailPage({ params }: { params: { slug: string } }) {
  const data = getCase(params.slug);
  if (!data) notFound();
  const { meta, body } = data;
  return (
    <article className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[900px] px-6 sm:px-8">
        <Link href="/cases" className="font-mono text-[12px] text-hb-sec hover:text-hb">
          ← Alle cases
        </Link>
        <Eyebrow>Case</Eyebrow>
        <h1 className="mt-6 text-[36px] font-black leading-[1.05] tracking-display sm:text-[48px] md:text-[60px]">
          {meta.title}
        </h1>
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {meta.tags.map((t) => (
            <li
              key={t}
              className="rounded-sm bg-hg px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-mono text-hb-sec"
            >
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[19px] font-medium leading-relaxed text-hb-sec">{meta.summary}</p>
        <div className="prose mt-10 max-w-none text-[16px] leading-relaxed">
          <MDXRemote source={body} />
        </div>
      </div>
    </article>
  );
}
