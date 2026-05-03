import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useParallax(strength = 0.08): CSSProperties {
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setOffset(0);
      return;
    }

    let raf = 0;
    const update = () => {
      setOffset(window.scrollY * strength);
      raf = 0;
    };
    const onScroll = () => {
      if (raf === 0) {
        raf = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reducedMotion, strength]);

  return {
    transform: `translate3d(0, ${formatOffset(offset)}px, 0)`,
    willChange: reducedMotion ? undefined : 'transform',
  };
}

function formatOffset(offset: number): string {
  return Number.isInteger(offset) ? String(offset) : offset.toFixed(2);
}
