import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'dark' | 'yellow-dark';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-hy text-hb hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-white border border-white/40 hover:border-white/80',
  dark:
    'bg-hb text-white hover:-translate-y-0.5',
  'yellow-dark':
    'bg-hb text-white hover:bg-hb-soft',
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, 'className' | 'children'> & {
    href: string;
  };

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & {
    href?: never;
  };

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = 'primary', children, className = '', ...rest } = props;
  const base =
    'inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-all duration-200';
  const cls = `${base} ${VARIANT_CLASSES[variant]} ${className}`;

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorProps;
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonProps)}>
      {children}
    </button>
  );
}
