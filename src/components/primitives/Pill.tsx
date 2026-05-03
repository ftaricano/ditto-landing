import type { PropsWithChildren } from 'react';
import styles from './Pill.module.css';

export default function Pill({ children }: PropsWithChildren) {
  return <span className={styles.pill}>{children}</span>;
}

