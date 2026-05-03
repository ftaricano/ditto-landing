import type { HTMLAttributes, PropsWithChildren } from 'react';
import styles from './Container.module.css';

type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement> & {
  className?: string;
}>;

export default function Container({ children, className = '', ...props }: ContainerProps) {
  return <div className={`${styles.container} ${className}`} {...props}>{children}</div>;
}
