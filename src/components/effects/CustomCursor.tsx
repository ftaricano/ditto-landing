import { Play } from 'lucide-react';
import styles from './CustomCursor.module.css';

type CustomCursorProps = {
  visible: boolean;
  x: number;
  y: number;
  label?: string;
};

export default function CustomCursor({ visible, x, y, label = 'Play' }: CustomCursorProps) {
  return (
    <div className={styles.cursor} data-visible={visible} style={{ transform: `translate(${x}px, ${y}px)` }} aria-hidden="true">
      <div className={styles.content}>
        <Play size={16} fill="currentColor" />
        <span>{label}</span>
      </div>
    </div>
  );
}

