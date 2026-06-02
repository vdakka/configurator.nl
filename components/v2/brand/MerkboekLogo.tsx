import { SmileMark } from './SmileMark';

/**
 * Happy Horizon-wordmark volgens Merkboek 2026:
 *  - Lowercase, "horizon" in italic
 *  - Smile-mark onder het woordmerk, gecentreerd, nooit losgekoppeld
 *  - Min. 24px hoogte digitaal
 *
 * Programmatic — geen externe asset. Instrument Serif komt uit `--font-instrument`
 * (geladen via `next/font/google` in `app/layout.tsx`).
 *
 * Variants:
 *  - `ink`: Ink-tekst (op Paper achtergrond). Default.
 *  - `paper`: Paper-tekst (op Ink achtergrond, bv. footer).
 */

type MerkboekLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ink' | 'paper';
  withSmile?: boolean;
  className?: string;
};

const SIZE_TOKENS: Record<
  NonNullable<MerkboekLogoProps['size']>,
  { textClass: string; smileSize: number; smileMt: string }
> = {
  // 'sm' = ~24px hoogte voor wordmark (min. spec) — header-gebruik
  sm: { textClass: 'text-[22px]', smileSize: 10, smileMt: 'mt-1' },
  // 'md' = ~32px wordmark — footer-merkbalk
  md: { textClass: 'text-[32px]', smileSize: 14, smileMt: 'mt-1.5' },
  // 'lg' = ~56px wordmark — als display in chrome-secties
  lg: { textClass: 'text-[56px]', smileSize: 22, smileMt: 'mt-2' },
};

export function MerkboekLogo({
  size = 'sm',
  variant = 'ink',
  withSmile = true,
  className,
}: MerkboekLogoProps) {
  const tokens = SIZE_TOKENS[size];
  const colorClass = variant === 'ink' ? 'text-mk-ink' : 'text-mk-paper';

  return (
    <span
      className={`inline-flex flex-col items-center font-instrument leading-none ${colorClass} ${className ?? ''}`}
      aria-label="happy horizon"
    >
      <span className={`${tokens.textClass} font-normal`}>
        happy <span className="italic">horizon</span>
      </span>
      {withSmile && (
        <SmileMark size={tokens.smileSize} className={tokens.smileMt} />
      )}
    </span>
  );
}
