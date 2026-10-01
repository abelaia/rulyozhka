import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';

import { NAV_ITEMS as navItems } from '../../constants/navigation';
import { CONTACTS as contacts } from '../../constants/site';
import { useActiveSection } from '../../hooks';
import Logo from '../ui/Logo';
import { EASE, Magnetic } from '../ui/motion';
import './Header.scss';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = useActiveSection(navItems.map((item) => item.path.slice(1)));
  const { scrollY } = useScroll();

  // Прячем шапку при прокрутке вниз и возвращаем при прокрутке вверх
  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(current > 24);
    setIsHidden(current > 400 && current > previous);
  });

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const highlighted = hovered ?? `#${active}`;

  return (
    <>
      <motion.header
        className={`header ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'is-menu-open' : ''}`}
        animate={{ y: isHidden && !isMenuOpen ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="header__container">
          <Logo onClick={closeMenu} />

          <nav className="header__nav" aria-label="Основная навигация" onMouseLeave={() => setHovered(null)}>
            <ul className="header__nav-list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={`header__nav-link ${highlighted === item.path ? 'is-active' : ''}`}
                    onMouseEnter={() => setHovered(item.path)}
                    aria-current={`#${active}` === item.path ? 'true' : undefined}
                  >
                    {highlighted === item.path && (
                      <motion.span
                        layoutId="nav-pill"
                        className="header__nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="header__nav-text">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <a href={contacts.phoneHref} className="header__phone mono">
              {contacts.phone}
            </a>
            <Magnetic strength={0.25}>
              <a href="#contacts" className="btn btn--solid btn--sm header__cta" onClick={closeMenu}>
                Запись
              </a>
            </Magnetic>
            <button
              type="button"
              className="header__burger"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Меню вне header: у header есть transform, и fixed внутри него обрезался бы по его высоте */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="header__mobile"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav className="header__mobile-nav" aria-label="Мобильная навигация">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.path}
                  href={item.path}
                  className="header__mobile-link"
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: EASE }}
                >
                  <span className="header__mobile-index mono">0{i + 1}</span>
                  {item.name}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="header__mobile-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href={contacts.phoneHref} className="header__mobile-phone mono">
                {contacts.phone}
              </a>
              <a href="#contacts" className="btn btn--solid" onClick={closeMenu}>
                Записаться на замер
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
