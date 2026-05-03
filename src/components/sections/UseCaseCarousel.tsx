import { useRef, useState } from 'react';
import { useCases } from '../../content/copy';
import Section from '../layout/Section';
import Eyebrow from '../primitives/Eyebrow';
import Mockup from '../media/Mockup';
import styles from './UseCaseCarousel.module.css';

export default function UseCaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = useCases[activeIndex];

  const activate = (index: number, focus = false) => {
    if (focus) {
      tabRefs.current[index]?.focus();
    }
    setActiveIndex(index);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const focusedIndex = tabRefs.current.findIndex((element) => element === document.activeElement);
    const baseIndex = focusedIndex >= 0 ? focusedIndex : activeIndex;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      activate((baseIndex + 1) % useCases.length, true);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      activate((baseIndex - 1 + useCases.length) % useCases.length, true);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      activate(0, true);
    }
    if (event.key === 'End') {
      event.preventDefault();
      activate(useCases.length - 1, true);
    }
  };

  return (
    <Section id="use-cases" containerClassName={styles.inner}>
      <div className={styles.heading}>
        <Eyebrow>Noise to signal by audience</Eyebrow>
        <h2>Built for the way retail teams operate.</h2>
      </div>
      <div className={styles.tabs} role="tablist" aria-label="Use cases" onKeyDown={onKeyDown}>
        {useCases.map((useCase, index) => (
          <button
            key={useCase.id}
            id={`tab-${useCase.id}`}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`panel-${useCase.id}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => activate(index)}
          >
            {useCase.tab}
          </button>
        ))}
      </div>
      <div key={active.id} id={`panel-${active.id}`} className={styles.panel} role="tabpanel" aria-labelledby={`tab-${active.id}`}>
        <div className={styles.copy}>
          <p className={styles.audience}>{active.audience}</p>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <strong>{active.metric}</strong>
          <ul>
            {active.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
        <Mockup type="usecase" />
      </div>
    </Section>
  );
}
