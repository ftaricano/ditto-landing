export const NOISE_TO_SIGNAL_START_MS = 1500;
export const NOISE_TO_SIGNAL_WINDOW_MS = 2000;
export const NOISE_TO_SIGNAL_RATIO = 0.3;

export function getNoiseToSignalProgress(elapsedMs: number): number {
  const linear = (elapsedMs - NOISE_TO_SIGNAL_START_MS) / NOISE_TO_SIGNAL_WINDOW_MS;
  const clamped = Math.min(Math.max(linear, 0), 1);

  return clamped * clamped * (3 - 2 * clamped);
}

export function shouldMigrateToSignal(index: number): boolean {
  return index % 10 < NOISE_TO_SIGNAL_RATIO * 10;
}
