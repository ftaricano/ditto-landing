import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Ditto landing page', () => {
  it('renders the canonical brand, tagline, and all landing sections', () => {
    render(<App />);

    expect(screen.getAllByText('Ditto')[0]).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Noise in\. Clarity out\./i })).toBeInTheDocument();

    const sections = [
      'hero',
      'pillars',
      'extract',
      'understand',
      'act',
      'use-cases',
      'social-proof',
      'pricing',
      'demo',
      'footer',
    ];

    for (const section of sections) {
      expect(screen.getByTestId(`section-${section}`)).toBeInTheDocument();
    }
  });

  it('switches use-case panels with keyboard-accessible tabs', async () => {
    const user = userEvent.setup();
    render(<App />);

    const franchiseTab = screen.getByRole('tab', { name: /Franquias/i });
    const smbTab = screen.getByRole('tab', { name: /PMEs/i });
    await user.click(smbTab);

    expect(smbTab).toHaveAttribute('aria-selected', 'true');
    expect(await screen.findByRole('tabpanel', { name: /PMEs/i })).toHaveTextContent('owner-led teams');

    franchiseTab.focus();
    await user.keyboard('{ArrowRight}');
    expect(smbTab).toHaveFocus();

    await user.keyboard('{Home}');
    expect(franchiseTab).toHaveFocus();

    await user.keyboard('{End}');
    expect(smbTab).toHaveFocus();
  });

  it('exposes a labeled newsletter form and keeps success inline', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('ditto_waitlist_leads', '{broken');
    render(<App />);

    expect(screen.getByLabelText(/Work email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Join waitlist/i })).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Work email/i), 'ops@retail.test');
    await user.click(screen.getByRole('button', { name: /Join waitlist/i }));

    expect(screen.getByText(/early access list/i)).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem('ditto_waitlist_leads') || '[]')).toEqual(['ops@retail.test']);
    expect(window.location.href).not.toContain('mailto:');
  });

  it('uses non-reserved conversion paths', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /Book a demo/i })).not.toHaveAttribute('href', expect.stringContaining('.example'));
  });

  it('opens and closes the product preview dialog', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /Play product preview/i })[0]);
    expect(screen.getByRole('dialog', { name: /Ditto product preview/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Close preview/i }));
    expect(screen.queryByRole('dialog', { name: /Ditto product preview/i })).not.toBeInTheDocument();
  });
});
