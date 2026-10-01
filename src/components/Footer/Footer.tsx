import { motion } from 'framer-motion';

import { NAV_ITEMS as navItems } from '../../constants/navigation';
import { SERVICES as services } from '../../constants/services';
import { CONTACTS as contacts } from '../../constants/site';
import { ArrowUpIcon } from '../ui/icons';
import Logo from '../ui/Logo';
import { EASE, Magnetic } from '../ui/motion';
import './Footer.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="footer__brand-text">
              Частная мастерская Николая: перетяжка салонов автомобилей, мотоциклов и лодок.
              Натуральная кожа, алькантара, экокожа. Кожа. Строчка. Характер.
            </p>
          </div>

          <div className="footer__col">
            <p className="footer__heading mono">Разделы</p>
            <ul className="footer__list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <a href={item.path}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__heading mono">Услуги</p>
            <ul className="footer__list">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services">{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__heading mono">Контакты</p>
            <a href={contacts.phoneHref} className="footer__contact-line footer__contact-line--strong">
              {contacts.phone}
            </a>
            <p className="footer__contact-line">{contacts.address}</p>
            <p className="footer__contact-line">{contacts.hours}</p>
            <a href={`mailto:${contacts.email}`} className="footer__contact-line footer__contact-line--link">
              {contacts.email}
            </a>
          </div>
        </div>
      </div>

      <div className="footer__wordmark" aria-hidden="true">
        <motion.span
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          RULYOZHKA
        </motion.span>
      </div>

      <div className="container">
        <div className="footer__bottom">
          <p>© {year} RULYOZHKA. Все права защищены.</p>
          <p className="footer__tagline">Перетяжка салонов.</p>
          <Magnetic>
            <button type="button" className="footer__top-btn" onClick={scrollToTop} aria-label="Наверх">
              <ArrowUpIcon />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
