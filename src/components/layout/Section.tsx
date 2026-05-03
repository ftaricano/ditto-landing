import type { ElementType, PropsWithChildren } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Container from '../primitives/Container';
import styles from './Section.module.css';

type SectionProps = PropsWithChildren<{
  id: string;
  as?: ElementType;
  className?: string;
  containerClassName?: string;
  dark?: boolean;
}>;

export default function Section({
  id,
  as: Component = 'section',
  children,
  className = '',
  containerClassName = '',
  dark = false,
}: SectionProps) {
  const { ref, revealed } = useScrollReveal<HTMLElement>();

  return (
    <Component
      id={id}
      ref={ref}
      className={`${styles.section} ${dark ? styles.dark : ''} ${className}`}
      data-revealed={revealed}
      data-testid={`section-${id}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}

