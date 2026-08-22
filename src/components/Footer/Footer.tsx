import { useState } from 'react';

import { NAV_ITEMS as navItems } from '../../constants/navigation';
import { SERVICES as services } from '../../constants/services';
import { CONTACTS as contacts } from '../../constants/site';
import './Footer.scss';

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5m-6 6 6-6 6 6" />
    </svg>
  );
}

export default function Footer() {
  const [logoError, setLogoError] = useState(false);
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#hero" className="footer__logo">
              {logoError ? (
                <span className="footer__logo-mark">R</span>
              ) : (
                <img
                  src="/logo.png"
                  alt="RULYOZHKA"
                  className="footer__logo-img"
                  onError={() => setLogoError(true)}
                />
              )}
              <span className="footer__logo-text">
                RULYOZHKA<span className="footer__logo-dot">.</span>
              </span>
            </a>
            <p className="footer__brand-text">
              Частная мастерская Николая: перетяжка салонов автомобилей, мотоциклов и лодок.
              Натуральная кожа, алькантара, экокожа. Кожа. Строчка. Характер.
            </p>
          </div>

          <div className="footer__col">
            <p className="footer__heading">Разделы</p>
            <ul className="footer__list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <a href={item.path}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__heading">Услуги</p>
            <ul className="footer__list">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services">{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__heading">Контакты</p>
            <a href={contacts.phoneHref} className="footer__contact-line">
              {contacts.phone}
            </a>
            <p className="footer__contact-line footer__contact-line--muted">{contacts.address}</p>
            <p className="footer__contact-line footer__contact-line--muted">{contacts.hours}</p>
            <a href={`mailto:${contacts.email}`} className="footer__contact-line">
              {contacts.email}
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} RULYOZHKA. Все права защищены.</p>
          <p className="footer__tagline">Перетяжка салонов с гарантией 3 года</p>
          <button type="button" className="footer__top-btn" onClick={scrollToTop} aria-label="Наверх">
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
}
