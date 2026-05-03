export function gaussianRandom(mean = 0, stdDev = 1): number {
  const u1 = 1 - Math.random();
  const u2 = Math.random();
  return mean + stdDev * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}
