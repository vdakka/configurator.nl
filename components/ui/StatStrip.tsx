import { CountUp } from './CountUp';

export type Stat = {
  /** The displayed string, e.g. "50-90%". The CountUp animates to the upper bound. */
  display: string;
  /** Numeric value to count up to (typically the higher number of a range). */
  countTo: number;
  /** Suffix appended after CountUp value during animation, e.g. "%". */
  suffix?: string;
  /** Optional prefix during animation, e.g. "€". */
  prefix?: string;
  /** Label below the number. */
  label: string;
};

export function StatStrip({
  stats,
  source,
  tone = 'light',
}: {
  stats: Stat[];
  source?: string;
  tone?: 'light' | 'dark';
}) {
  const numberColor = tone === 'dark' ? 'text-hy' : 'text-hb';
  const labelColor = tone === 'dark' ? 'text-white/70' : 'text-hb-sec';
  return (
    <div>
      <div className="grid gap-10 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-3">
            <span className={`text-[44px] font-black tracking-display leading-none ${numberColor}`}>
              {/* Show the original "50-90%" label as a static hint, animate only the headline number */}
              <CountUp to={s.countTo} prefix={s.prefix} suffix={s.suffix ?? ''} />
              <span className="ml-2 text-[18px] font-bold tracking-normal text-hb-sec">
                ({s.display})
              </span>
            </span>
            <span className={`text-[15px] leading-snug ${labelColor}`}>{s.label}</span>
          </div>
        ))}
      </div>
      {source && (
        <p className={`mt-6 text-[12px] italic ${tone === 'dark' ? 'text-white/40' : 'text-hb-sec'}`}>
          {source}
        </p>
      )}
    </div>
  );
}
