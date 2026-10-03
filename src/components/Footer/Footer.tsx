import { motion } from 'framer-motion';

import { wordmarkIn } from '../../animations';
import { CONTACTS, CONTENT, NAV_ITEMS, SERVICES } from '../../data';
import { fill } from '../../utils/format';
import { ArrowUpIcon } from '../ui/icons';
import Logo from '../ui/Logo';
import './Footer.scss';

const TEXT = CONTENT.footer;

// Колонки ссылок: разделы сайта и услуги
const LINK_COLUMNS = [
  { title: TEXT.columns.nav, links: NAV_ITEMS.map(({ name, path }) => ({ label: name, href: path })) },
  { title: TEXT.columns.services, links: SERVICES.map(({ title }) => ({ label: title, href: '#services' })) },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="footer__brand-text">{TEXT.about}</p>
          </div>
          {LINK_COLUMNS.map((column) => (
            <div key={column.title} className="footer__col">
              <p className="footer__heading mono">{column.title}</p>
              <ul className="footer__list">
                {column.links.map((link) => (
                  <li key={link.label}><a href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer__col">
            <p className="footer__heading mono">{TEXT.columns.contacts}</p>
            <a href={CONTACTS.phoneHref} className="footer__contact-line footer__contact-line--strong">{CONTACTS.phone}</a>
            <p className="footer__contact-line">{CONTACTS.address}</p>
            <p className="footer__contact-line">{CONTACTS.hours}</p>
            <a href={`mailto:${CONTACTS.email}`} className="footer__contact-line footer__contact-line--link">{CONTACTS.email}</a>
          </div>
        </div>
      </div>
      <div className="footer__wordmark" aria-hidden="true">
        <motion.span {...wordmarkIn}>{CONTENT.brand.name}</motion.span>
      </div>
      <div className="container">
        <div className="footer__bottom">
          <p>{fill(TEXT.copyright, { year: new Date().getFullYear() })}</p>
          <p className="footer__tagline">{TEXT.tagline}</p>
          <button type="button" className="footer__top-btn" onClick={scrollToTop} aria-label={TEXT.toTop}>
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
}
