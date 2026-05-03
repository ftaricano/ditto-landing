import { render, screen, waitFor } from '@testing-library/react';
import { useParallax } from './useParallax';

function ParallaxProbe() {
  const style = useParallax(0.1);
  return <div data-testid="probe" style={style} />;
}

describe('useParallax', () => {
  it('maps scroll position to a transform', async () => {
    render(<ParallaxProbe />);

    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      expect(screen.getByTestId('probe')).toHaveStyle({ transform: 'translate3d(0, 10px, 0)' });
    });
  });
});
