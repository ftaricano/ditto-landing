import { pillars } from '../../content/copy';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Section from '../layout/Section';
import Eyebrow from '../primitives/Eyebrow';
import styles from './PillarRow.module.css';

export default function PillarRow() {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  return (
    <Section id="pillars" containerClassName={styles.inner}>
      <div className={styles.heading}>
        <Eyebrow>Three steps from noise to action</Eyebrow>
        <h2>Extract. Understand. Act.</h2>
      </div>
      <div ref={ref} className={styles.grid}>
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <article
              key={pillar.title}
              className={`${styles.card} ${revealed ? styles.inView : ''}`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className={styles.icon}>
                <Icon aria-hidden="true" size={34} strokeWidth={1.8} />
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
