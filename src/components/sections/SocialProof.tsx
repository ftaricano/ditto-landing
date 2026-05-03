import { clientLogos, socialStats } from '../../content/copy';
import Section from '../layout/Section';
import Eyebrow from '../primitives/Eyebrow';
import styles from './SocialProof.module.css';

export default function SocialProof() {
  return (
    <Section id="social-proof" containerClassName={styles.inner}>
      <div className={styles.quote}>
        <Eyebrow>Social proof</Eyebrow>
        <blockquote>
          "Ditto replaced three weekly exports with one view our operators actually trust. The noisy comments stopped hiding the urgent issues."
        </blockquote>
        <cite>Marina Alves · VP Operations, Helix Retail</cite>
      </div>
      <div className={styles.stats}>
        {socialStats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.logos} aria-label="Example customer logos">
        {clientLogos.map((logo) => (
          <span key={logo}>{logo}</span>
        ))}
      </div>
    </Section>
  );
}

