import { pricingPlans } from '../../content/copy';
import Section from '../layout/Section';
import Button from '../primitives/Button';
import Eyebrow from '../primitives/Eyebrow';
import styles from './PricingTeaser.module.css';

export default function PricingTeaser() {
  return (
    <Section id="pricing" containerClassName={styles.inner}>
      <div className={styles.heading}>
        <Eyebrow>Pricing teaser</Eyebrow>
        <h2>Simple entry points for clean signal.</h2>
        <p>Start with the operating model you have today. Scale when the signal needs to reach more teams.</p>
      </div>
      <div className={styles.plans}>
        {pricingPlans.map((plan) => {
          const Icon = plan.icon;
          return (
            <article key={plan.name} className={styles.plan}>
              <Icon aria-hidden="true" size={24} />
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.body}</p>
              <Button href="#demo" variant={plan.name === 'Franchise' ? 'primary' : 'secondary'} showIcon>
                Talk to sales
              </Button>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

