import { describe, expect, it } from 'vitest';
import { getNoiseToSignalProgress, shouldMigrateToSignal } from './noiseToSignal';

describe('noise to signal transition', () => {
  it('starts after 1500ms and completes over a 2000ms window', () => {
    expect(getNoiseToSignalProgress(1499)).toBe(0);
    expect(getNoiseToSignalProgress(1500)).toBe(0);
    expect(getNoiseToSignalProgress(2500)).toBeGreaterThan(0.45);
    expect(getNoiseToSignalProgress(2500)).toBeLessThan(0.55);
    expect(getNoiseToSignalProgress(3500)).toBe(1);
  });

  it('selects roughly 30 percent of particles deterministically', () => {
    const count = Array.from({ length: 100 }, (_, index) => shouldMigrateToSignal(index)).filter(Boolean).length;

    expect(count).toBeGreaterThanOrEqual(28);
    expect(count).toBeLessThanOrEqual(32);
    expect(shouldMigrateToSignal(7)).toBe(shouldMigrateToSignal(7));
  });
});
