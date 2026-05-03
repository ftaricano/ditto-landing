import { z } from 'zod';
import { useState } from 'react';
import { footerGroups } from '../../content/copy';
import AnimatedFooterSVG from '../effects/AnimatedFooterSVG';
import Container from '../primitives/Container';
import styles from './Footer.module.css';

const emailSchema = z.string().email();
const waitlistSchema = z.array(z.string().email());

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setMessage('Enter a valid work email.');
      return;
    }
    const leads = readWaitlistLeads();
    window.localStorage.setItem('ditto_waitlist_leads', JSON.stringify([...leads, parsed.data]));
    setMessage('You are on the Ditto early access list.');
    setEmail('');
  };

  return (
    <footer id="footer" className={styles.footer} data-testid="section-footer">
      <AnimatedFooterSVG />
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <a className={styles.logo} href="#hero">
            <span>Ditto</span>
            <span aria-hidden="true" />
          </a>
          <p>Noise in. Clarity out.</p>
        </div>
        <form className={styles.newsletter} onSubmit={submit} noValidate>
          <label htmlFor="newsletter-email">Work email</label>
          <div>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-describedby="newsletter-message"
              placeholder="name@company.com"
            />
            <button type="submit">Join waitlist</button>
          </div>
          <p id="newsletter-message" aria-live="polite">
            {message || 'Monthly signal notes. No noisy drip campaign.'}
          </p>
        </form>
        <nav className={styles.links} aria-label="Footer navigation">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className={styles.bottom}>
          <span>© 2026 Ditto Labs. All rights reserved.</span>
          <span>LinkedIn · X · GitHub</span>
        </div>
      </Container>
    </footer>
  );
}

function readWaitlistLeads(): string[] {
  const stored = window.localStorage.getItem('ditto_waitlist_leads');
  if (!stored) return [];

  try {
    const parsed: unknown = JSON.parse(stored);
    const result = waitlistSchema.safeParse(parsed);
    return result.success ? result.data : [];
  } catch {
    return [];
  }
}
