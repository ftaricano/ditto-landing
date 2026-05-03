import { useEffect, useRef } from 'react';
import styles from './AnimatedFooterSVG.module.css';

const waveA = [0, 118, 84, 44, 154, 184, 246, 112, 338, 40, 410, 160, 500, 110, 594, 58, 682, 140, 776, 104, 884, 62, 992, 146, 1200, 86];
const waveB = [0, 120, 140, 88, 220, 160, 360, 118, 500, 76, 620, 150, 760, 112, 870, 82, 970, 126, 1060, 110, 1120, 96, 1160, 102, 1200, 100];

export default function AnimatedFooterSVG() {
  const waveARef = useRef<SVGPathElement | null>(null);
  const waveBRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reducedMotion) return;

    let raf = 0;
    const frame = (time: number) => {
      const phaseA = (Math.sin((time / 10000) * Math.PI * 2 - Math.PI / 2) + 1) / 2;
      const phaseB = (Math.sin((time / 12000) * Math.PI * 2 + Math.PI / 2) + 1) / 2;

      waveARef.current?.setAttribute('d', buildWavePath(interpolatePath(waveA, waveB, phaseA)));
      waveBRef.current?.setAttribute('d', buildWavePath(interpolatePath(waveB, waveA, phaseB)));
      waveBRef.current?.setAttribute('transform', `translate(${(phaseB - 0.5) * 36} 0)`);

      raf = window.requestAnimationFrame(frame);
    };

    raf = window.requestAnimationFrame(frame);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <svg viewBox="0 0 1200 220" preserveAspectRatio="none">
        <path ref={waveARef} className={styles.waveA} d={buildWavePath(waveA)} />
        <path ref={waveBRef} className={styles.waveB} d={buildWavePath(waveB)} />
      </svg>
    </div>
  );
}

function interpolatePath(from: number[], to: number[], progress: number): number[] {
  return from.map((value, index) => value + (to[index] - value) * progress);
}

function buildWavePath(points: number[]): string {
  return [
    `M${points[0]} ${points[1]}`,
    `C${points[2]} ${points[3]} ${points[4]} ${points[5]} ${points[6]} ${points[7]}`,
    `C${points[8]} ${points[9]} ${points[10]} ${points[11]} ${points[12]} ${points[13]}`,
    `C${points[14]} ${points[15]} ${points[16]} ${points[17]} ${points[18]} ${points[19]}`,
    `C${points[20]} ${points[21]} ${points[22]} ${points[23]} ${points[24]} ${points[25]}`,
  ].join(' ');
}
