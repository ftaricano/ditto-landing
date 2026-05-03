import { useEffect, useRef } from 'react';
import { ParticleSystem, type ParticleVariant } from '../../lib/particles/ParticleSystem';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './ParticleCanvas.module.css';

type ParticleCanvasProps = {
  variant?: ParticleVariant;
  className?: string;
};

export default function ParticleCanvas({ variant = 'hero', className = '' }: ParticleCanvasProps) {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      return;
    }
    if (!ctx) return;

    const system = new ParticleSystem(variant);
    let raf = 0;
    let last = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(Math.floor(rect.width * dpr), 1);
      canvas.height = Math.max(Math.floor(rect.height * dpr), 1);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      system.resize(rect.width, rect.height);
    };

    const frame = (time: number) => {
      if (visibleRef.current) {
        system.step(time - last);
        system.render(ctx);
      }
      last = time;
      raf = window.requestAnimationFrame(frame);
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
        visibleRef.current = entry.isIntersecting;
      }, { threshold: 0.01 })
      : null;

    resize();
    observer?.observe(canvas);
    window.addEventListener('resize', resize, { passive: true });
    raf = window.requestAnimationFrame(frame);

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      system.destroy();
    };
  }, [reducedMotion, variant]);

  if (reducedMotion) {
    return <div className={`${styles.fallback} ${styles[variant]} ${className}`} aria-hidden="true" />;
  }

  return <canvas ref={canvasRef} className={`${styles.canvas} ${className}`} aria-hidden="true" />;
}
