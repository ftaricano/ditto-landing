import { mockupIcons } from '../../content/copy';
import styles from './Mockup.module.css';

type MockupProps = {
  type: 'inbox' | 'sentiment' | 'alerts' | 'usecase';
};

const rows = {
  inbox: ['Google Reviews · 4.2', 'iFood · late delivery', 'App Store · checkout friction'],
  sentiment: ['Taste +12%', 'Service -8%', 'Wait time -17%'],
  alerts: ['Route to ops', 'Brief store manager', 'Watch repeat issue'],
  usecase: ['São Paulo · clear', 'Rio · noisy', 'Curitiba · rising'],
};

export default function Mockup({ type }: MockupProps) {
  return (
    <div className={styles.mockup} aria-label={`${type} dashboard mockup`}>
      <div className={styles.chrome}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.grid}>
        <div className={styles.sidebar}>
          {mockupIcons.slice(0, 4).map((Icon, index) => (
            <span key={index}>
              <Icon size={16} />
            </span>
          ))}
        </div>
        <div className={styles.panel}>
          <div className={styles.metric}>
            <span>Signal quality</span>
            <strong>{type === 'sentiment' ? '87%' : type === 'alerts' ? '4' : '12'}</strong>
          </div>
          <div className={styles.chart}>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className={styles.rows}>
            {rows[type].map((row, index) => (
              <div key={row} className={styles.row}>
                <span className={index === 1 ? styles.noise : styles.signal} />
                <p>{row}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

