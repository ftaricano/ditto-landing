import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCustomCursor } from '../../hooks/useCustomCursor';
import CustomCursor from '../effects/CustomCursor';
import Mockup from './Mockup';
import styles from './VideoPreview.module.css';

type VideoPreviewProps = {
  type: 'inbox' | 'sentiment' | 'alerts' | 'usecase';
};

export default function VideoPreview({ type }: VideoPreviewProps) {
  const { visible, position, cursorHandlers } = useCustomCursor();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <div className={styles.preview} {...cursorHandlers}>
        <Mockup type={type} />
        <button className={styles.play} type="button" aria-label="Play product preview" onClick={() => setOpen(true)}>
          <Play size={18} fill="currentColor" />
        </button>
        <CustomCursor visible={visible} x={position.x} y={position.y} />
      </div>
      {open ? (
        <div className={styles.dialogShell} role="presentation">
          <button className={styles.backdrop} type="button" aria-label="Dismiss preview backdrop" onClick={() => setOpen(false)} />
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={`preview-title-${type}`}>
            <button className={styles.close} type="button" aria-label="Close preview" onClick={() => setOpen(false)}>
              ×
            </button>
            <div className={styles.dialogHeader}>
              <p>Noise to signal preview</p>
              <h2 id={`preview-title-${type}`}>Ditto product preview</h2>
            </div>
            <Mockup type={type} />
          </div>
        </div>
      ) : null}
    </>
  );
}
