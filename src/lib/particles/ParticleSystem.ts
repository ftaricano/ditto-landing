import { gaussianRandom } from './boxMuller';
import { getNoiseToSignalProgress, shouldMigrateToSignal } from './noiseToSignal';

type Mode = 'brownian' | 'drift' | 'wave';
type RGB = [number, number, number];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  mode: Mode;
  phase: number;
  migratesToSignal: boolean;
  signalProgress: number;
};

export type ParticleVariant = 'hero' | 'cta-dark';

const fallbackColors = {
  noise: [148, 163, 184] as RGB,
  signal: [20, 184, 166] as RGB,
};

export class ParticleSystem {
  private particles: Particle[] = [];
  private width = 1;
  private height = 1;
  private elapsedMs = 0;
  private colors = fallbackColors;

  constructor(private readonly variant: ParticleVariant) {}

  init(count: number): void {
    this.elapsedMs = 0;
    this.colors = readParticleColors();
    this.particles = Array.from({ length: count }, (_, index) => this.createParticle(index));
  }

  resize(width: number, height: number): void {
    this.width = Math.max(width, 1);
    this.height = Math.max(height, 1);
    if (this.particles.length === 0) this.init(this.getCount());
  }

  step(dt: number): void {
    this.elapsedMs += Math.max(dt, 0);
    const capped = Math.min(dt, 33) / 16.67;
    const centerX = this.width * 0.58;
    const centerY = this.height * 0.5;
    const migrationProgress = getNoiseToSignalProgress(this.elapsedMs);

    for (const particle of this.particles) {
      if (particle.migratesToSignal) {
        particle.signalProgress = migrationProgress;
        particle.mode = migrationProgress > 0 ? 'drift' : 'brownian';
      }

      if (particle.mode === 'wave') {
        particle.vx += Math.cos(particle.phase) * 0.004 * capped;
        particle.vy += Math.sin(particle.phase * 1.4) * 0.005 * capped;
        particle.phase += 0.012 * capped;
      } else {
        const signalWeight = particle.signalProgress;
        const noiseWeight = 1 - signalWeight;
        particle.vx += gaussianRandom(0, 0.018 * noiseWeight) * capped;
        particle.vy += gaussianRandom(0, 0.018 * noiseWeight) * capped;
        particle.vx += (centerX - particle.x) * 0.000012 * signalWeight * capped;
        particle.vy += (centerY - particle.y) * 0.00001 * signalWeight * capped;
      }

      particle.vx *= 0.988;
      particle.vy *= 0.988;
      particle.x += particle.vx * capped;
      particle.y += particle.vy * capped;

      if (particle.x < -30) particle.x = this.width + 30;
      if (particle.x > this.width + 30) particle.x = -30;
      if (particle.y < -30) particle.y = this.height + 30;
      if (particle.y > this.height + 30) particle.y = -30;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, this.width, this.height);
    for (const particle of this.particles) {
      const color = interpolateColor(this.colors.noise, this.colors.signal, particle.signalProgress);
      const glow = 4 + particle.signalProgress * 6;
      const alpha = particle.alpha + particle.signalProgress * 0.2;
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * glow);
      gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * glow, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  destroy(): void {
    this.particles = [];
  }

  private createParticle(index: number): Particle {
    const cta = this.variant === 'cta-dark';
    const migratesToSignal = !cta && shouldMigrateToSignal(index);
    const signalProgress = cta ? 1 : 0;
    const x = this.width / 2 + gaussianRandom(0, this.width / (cta ? 3.6 : 3));
    const y = this.height / 2 + gaussianRandom(0, this.height / (cta ? 4.2 : 3));

    return {
      x,
      y,
      vx: gaussianRandom(0, cta ? 0.18 : 0.28),
      vy: gaussianRandom(0, cta ? 0.15 : 0.22),
      size: Math.random() * (cta ? 1.8 : 2.2) + 0.7,
      alpha: Math.random() * 0.38 + (cta ? 0.3 : 0.16),
      mode: cta ? 'wave' : 'brownian',
      phase: Math.random() * Math.PI * 2,
      migratesToSignal,
      signalProgress,
    };
  }

  private getCount(): number {
    if (this.width < 640) return this.variant === 'cta-dark' ? 24 : 40;
    if (this.width < 1024) return this.variant === 'cta-dark' ? 48 : 80;
    if (this.width < 1536) return this.variant === 'cta-dark' ? 72 : 140;
    return this.variant === 'cta-dark' ? 96 : 200;
  }
}

function readParticleColors(): { noise: RGB; signal: RGB } {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return fallbackColors;
  }

  const styles = window.getComputedStyle(document.documentElement);
  return {
    noise: parseCssColor(styles.getPropertyValue('--ditto-noise-400')) ?? fallbackColors.noise,
    signal: parseCssColor(styles.getPropertyValue('--ditto-signal-500')) ?? fallbackColors.signal,
  };
}

function parseCssColor(value: string): RGB | null {
  const trimmed = value.trim();
  const hex = trimmed.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (hex) {
    const raw = hex[1].length === 3
      ? hex[1].split('').map((char) => `${char}${char}`).join('')
      : hex[1];
    return [0, 2, 4].map((offset) => Number.parseInt(raw.slice(offset, offset + 2), 16)) as RGB;
  }

  const rgb = trimmed.match(/^rgba?\(([^)]+)\)$/i);
  if (!rgb) return null;

  const channels = rgb[1].split(',').slice(0, 3).map((channel) => Number.parseFloat(channel.trim()));
  if (channels.length !== 3 || channels.some((channel) => Number.isNaN(channel))) return null;

  return channels as RGB;
}

function interpolateColor(from: RGB, to: RGB, progress: number): string {
  return from
    .map((channel, index) => Math.round(channel + (to[index] - channel) * progress))
    .join(', ');
}
