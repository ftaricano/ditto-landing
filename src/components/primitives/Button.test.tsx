import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button primitive', () => {
  it('renders a real button when no href is provided', () => {
    render(<Button onClick={() => undefined}>Submit</Button>);

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /submit/i })).not.toBeInTheDocument();
  });

  it('renders a link when href is provided', () => {
    render(<Button href="#demo">Get Demo</Button>);

    expect(screen.getByRole('link', { name: /get demo/i })).toHaveAttribute('href', '#demo');
  });
});
