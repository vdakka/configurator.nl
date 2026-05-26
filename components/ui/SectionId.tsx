/**
 * Spec-sheet style sectie-coördinaat in mono, top-right hoek.
 * Subtiel; suggereert "deze site is een gestructureerde stack, geen
 * marketing-pagina". Wordt absoluut gepositioneerd binnen een relative parent.
 */
export function SectionId({
  num,
  label,
  tone = 'dark',
}: {
  num: string;
  label: string;
  /** `dark` voor witte/grijze achtergrond, `light` voor donkere achtergrond. */
  tone?: 'dark' | 'light';
}) {
  const colorClass =
    tone === 'light' ? 'text-white/40' : 'text-hb-sec/55';
  return (
    <span
      aria-hidden
      className={`mono-label absolute right-6 top-6 z-10 text-[10px] sm:right-8 ${colorClass}`}
    >
      § {num} / {label}
    </span>
  );
}
