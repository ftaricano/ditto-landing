import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navItems } from '../../content/copy';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import Button from '../primitives/Button';
import styles from './Header.module.css';

export default function Header() {
  const { hidden, opaque } = useScrollDirection();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header} data-hidden={hidden} data-opaque={opaque || open}>
      <a className={styles.logo} href="#hero" aria-label="Ditto home">
        <span>Ditto</span>
        <span className={styles.logoCursor} aria-hidden="true" />
      </a>
      <nav className={styles.nav} aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className={styles.actions}>
        <Button href="#demo" variant="primary">
          Get Demo
        </Button>
      </div>
      <button
        className={styles.menuButton}
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.srOnly}>Toggle navigation</span>
        {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
      </button>
      <div id="mobile-menu" className={styles.mobileMenu} data-open={open}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <Button href="#demo" variant="primary">
          Get Demo
        </Button>
      </div>
    </header>
  );
}
