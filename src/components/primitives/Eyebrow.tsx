import type { PropsWithChildren } from 'react';
import styles from './Eyebrow.module.css';

export default function Eyebrow({ children }: PropsWithChildren) {
  return <p className={styles.eyebrow}>{children}</p>;
}

