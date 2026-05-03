import { clientLogos } from '../../content/copy';
import { useParallax } from '../../hooks/useParallax';
import ParticleCanvas from '../effects/ParticleCanvas';
import BlinkingCursor from '../effects/BlinkingCursor';
import Button from '../primitives/Button';
import Container from '../primitives/Container';
import Eyebrow from '../primitives/Eyebrow';
import styles from './Hero.module.css';

export default function Hero() {
  const parallaxStyle = useParallax(0.04);

  return (
    <section id="hero" className={styles.hero} data-testid="section-hero">
      <ParticleCanvas />
      <Container className={styles.inner} style={parallaxStyle}>
        <div className={styles.copy}>
          <Eyebrow>Source of truth for retail</Eyebrow>
          <h1>
            <span className={`${styles.line} ${styles.lineOne}`}>Noise in.</span>
            <span className={`${styles.line} ${styles.lineTwo}`}>
              Clarity out.
              <BlinkingCursor />
            </span>
          </h1>
          <p>
            Ditto turns scattered retail reviews into one clean operating signal, so teams know what changed, why it matters, and what to do next.
          </p>
          <div className={styles.ctas}>
            <Button href="#demo" variant="primary" showIcon>
              Get Demo
            </Button>
            <Button href="#extract" variant="secondary">
              See how it works
            </Button>
          </div>
        </div>
        <div className={styles.trust} aria-label="Trusted by retail teams">
          {clientLogos.slice(0, 4).map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </Container>
    </section>
  );
}
