import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { headerSlide, menuActions, menuLink, menuPanel } from '../../animations';
import { CONTACTS, CONTENT, NAV_ITEMS } from '../../data';
import { useActiveSection, useHideOnScroll, useLockBodyScroll } from '../../hooks';
import { cx, pad2 } from '../../utils/format';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import { ActivePill } from '../ui/motion';
import './Header.scss';

const TEXT = CONTENT.header;
const SECTION_IDS = NAV_ITEMS.map((item) => item.path.slice(1));

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { isScrolled, isHidden } = useHideOnScroll();
  const active = `#${useActiveSection(SECTION_IDS)}`;
  const highlighted = hovered ?? active;
  const closeMenu = () => setIsMenuOpen(false);
  useLockBodyScroll(isMenuOpen);
  return (
    <>
      <motion.header
        className={cx('header', isScrolled && 'is-scrolled', isMenuOpen && 'is-menu-open')}
        {...headerSlide(isHidden && !isMenuOpen)}
      >
        <div className="header__container">
          <Logo onClick={closeMenu} />
          <nav className="header__nav" aria-label={TEXT.navLabel} onMouseLeave={() => setHovered(null)}>
            <ul className="header__nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className={cx('header__nav-link', highlighted === item.path && 'is-active')}
                    onMouseEnter={() => setHovered(item.path)}
                    aria-current={active === item.path ? 'true' : undefined}
                  >
                    {highlighted === item.path && <ActivePill id="nav-pill" className="header__nav-pill" />}
                    <span className="header__nav-text">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__actions">
            <a href={CONTACTS.phoneHref} className="header__phone mono">{CONTACTS.phone}</a>
            <Button href="#contacts" size="sm" className="header__cta" onClick={closeMenu}>{TEXT.cta}</Button>
            <button
              type="button"
              className="header__burger"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? TEXT.closeMenu : TEXT.openMenu}
              aria-expanded={isMenuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className="header__mobile" {...menuPanel}>
            <nav className="header__mobile-nav" aria-label={TEXT.mobileNavLabel}>
              {NAV_ITEMS.map((item, i) => (
                <motion.a key={item.path} href={item.path} className="header__mobile-link" onClick={closeMenu} {...menuLink(i)}>
                  <span className="header__mobile-index mono">{pad2(i + 1)}</span>
                  {item.name}
                </motion.a>
              ))}
            </nav>
            <motion.div className="header__mobile-actions" {...menuActions}>
              <a href={CONTACTS.phoneHref} className="header__mobile-phone mono">{CONTACTS.phone}</a>
              <Button href="#contacts" onClick={closeMenu}>{TEXT.mobileCta}</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
