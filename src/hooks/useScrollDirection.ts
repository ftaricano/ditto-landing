import { useEffect, useState } from 'react';

export function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const [opaque, setOpaque] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    let raf = 0;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (Math.abs(delta) > 8) {
        setHidden(delta > 0 && y > 80);
        lastY = y;
      }

      setOpaque(y > 12);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        raf = window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { hidden, opaque };
}
