import type { Feature } from '../../content/copy';
import Section from '../layout/Section';
import Eyebrow from '../primitives/Eyebrow';
import Pill from '../primitives/Pill';
import VideoPreview from '../media/VideoPreview';
import styles from './FeatureSection.module.css';

type FeatureSectionProps = {
  feature: Feature;
  reversed?: boolean;
};

export default function FeatureSection({ feature, reversed = false }: FeatureSectionProps) {
  const Icon = feature.icon;

  return (
    <Section id={feature.id} containerClassName={`${styles.inner} ${reversed ? styles.reversed : ''}`}>
      <div className={styles.copy}>
        <Eyebrow>{feature.eyebrow}</Eyebrow>
        <h2>{feature.title}</h2>
        <p>{feature.description}</p>
        <div className={styles.bullets}>
          {feature.bullets.map((bullet) => (
            <Pill key={bullet}>{bullet}</Pill>
          ))}
        </div>
        <div className={styles.signal}>
          <Icon aria-hidden="true" size={20} />
          <span>{feature.metric}</span>
        </div>
      </div>
      <VideoPreview type={feature.mockup} />
    </Section>
  );
}

