import MorphingParticles from '../effects/MorphingParticles';
import Section from '../layout/Section';
import Button from '../primitives/Button';
import { contactEmail } from '../../content/copy';
import styles from './DarkCTABanner.module.css';

export default function DarkCTABanner() {
  return (
    <Section id="demo" dark className={styles.section} containerClassName={styles.outer}>
      <div className={styles.banner}>
        <MorphingParticles />
        <div className={styles.content}>
          <p>Noise is already moving through your channels.</p>
          <h2>Let Ditto turn it into the next clear decision.</h2>
          <div className={styles.actions}>
            <Button href={`mailto:${contactEmail}?subject=Ditto demo`} variant="accent" showIcon>
              Book a demo
            </Button>
            <span>30-min walkthrough · no commitment</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
