import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[600px] items-center justify-center bg-white px-6 py-20 text-center">
      <div className="max-w-[560px]">
        <span className="font-mono text-[12px] uppercase tracking-eyebrow text-hb-sec">404</span>
        <h1 className="mt-6 text-[40px] font-black leading-tight tracking-display sm:text-[52px]">
          Deze pagina hebben we niet kunnen vinden.
        </h1>
        <p className="mt-5 text-[17px] text-hb-sec">
          Misschien helpt het om terug te gaan naar de homepage of de quickscan te doen.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-hy px-5 py-3 text-[14px] font-bold text-hb hover:-translate-y-0.5"
          >
            Terug naar home <span aria-hidden>→</span>
          </Link>
          <Link
            href="/quickscan"
            className="inline-flex items-center gap-2 rounded-full border border-hg-line bg-white px-5 py-3 text-[14px] font-bold text-hb hover:border-hb"
          >
            Doe de quickscan <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
