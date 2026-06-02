/**
 * "part of Happy Horizon" endorsement-snippet.
 *
 * Merkboek 2026 (V1.0): "Endorsement 'part of Happy Horizon' in italic
 * waar relevant." Gebruikt voor sub-brand-positionering: configurator.nl
 * is een specialisme-site van HH.
 */

type PartOfHorizonProps = {
  variant?: 'ink' | 'paper' | 'muted';
  className?: string;
};

export function PartOfHorizon({
  variant = 'muted',
  className,
}: PartOfHorizonProps) {
  const colorClass =
    variant === 'ink'
      ? 'text-mk-ink'
      : variant === 'paper'
        ? 'text-mk-paper'
        : 'text-mk-muted';
  return (
    <span
      className={`font-inter text-[12px] italic ${colorClass} ${className ?? ''}`}
    >
      part of Happy Horizon
    </span>
  );
}
