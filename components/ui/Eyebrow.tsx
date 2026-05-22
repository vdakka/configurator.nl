import type { ReactNode } from 'react';

type Tone = 'default' | 'yellow' | 'light';

export function Eyebrow({
  children,
  tone = 'default',
  className = '',
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const toneCls =
    tone === 'yellow' ? 'eyebrow eyebrow--yellow' : tone === 'light' ? 'eyebrow eyebrow--light' : 'eyebrow';
  return <span className={`${toneCls} ${className}`}>{children}</span>;
}
