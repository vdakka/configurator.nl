import type { ReactNode } from 'react';

export function YellowHighlight({ children }: { children: ReactNode }) {
  return <span className="yellow-highlight">{children}</span>;
}
