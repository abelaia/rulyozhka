import { useEffect, useState } from 'react';

import { NAV_ITEMS as navItems } from '../../constants/navigation';
import { CONTACTS as contacts } from '../../constants/site';
import './Header.scss';

type Theme = 'light' | 'dark';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
    </svg>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light'
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
    try {
      localStorage.setItem('rulyozhka-theme', theme);
    } catch {
      return;
    }
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'is-menu-open' : ''}`}>
      <div className="header__container">
        <a href="#hero" className="header__logo" onClick={closeMenu}>
          {logoError ? (
            <span className="header__logo-mark">R</span>
          ) : (
            <img
              src="/logo.png"
              alt="RULYOZHKA"
              className="header__logo-img"
              onError={() => setLogoError(true)}
            />
          )}
          <span className="header__logo-text">
            RULYOZHKA<span className="header__logo-dot">.</span>
          </span>
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <a href={item.path} className="header__nav-link">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="header__theme"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <a href="#contacts" className="btn btn--outline-accent header__cta" onClick={closeMenu}>
            Запись
          </a>
          <button
            type="button"
            className="header__burger"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`header__mobile ${isMenuOpen ? 'is-open' : ''}`}>
        <nav className="header__mobile-nav" aria-label="Мобильная навигация">
          {navItems.map((item, i) => (
            <a key={item.path} href={item.path} className="header__mobile-link" onClick={closeMenu}>
              <span className="header__mobile-index">0{i + 1}</span>
              {item.name}
            </a>
          ))}
        </nav>
        <div className="header__mobile-actions">
          <a href={contacts.phoneHref} className="header__mobile-phone">
            {contacts.phone}
          </a>
          <a href="#contacts" className="btn btn--solid" onClick={closeMenu}>
            Записаться на замер
          </a>
        </div>
      </div>
    </header>
  );
}
