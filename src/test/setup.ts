import '@testing-library/jest-dom/vitest';

HTMLCanvasElement.prototype.getContext = (() => ({
  arc: () => undefined,
  beginPath: () => undefined,
  clearRect: () => undefined,
  createRadialGradient: () => ({
    addColorStop: () => undefined,
  }),
  fill: () => undefined,
  setTransform: () => undefined,
})) as unknown as HTMLCanvasElement['getContext'];
