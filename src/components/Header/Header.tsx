import { useEffect, useState } from 'react';

import { NAV_ITEMS as navItems } from '../../constants/navigation';
import { CONTACTS as contacts } from '../../constants/site';
import './Header.scss';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
