import { CONTACT_ITEMS, CONTENT, SOCIALS } from '../../data';
import type { ContactItem } from '../../models';
import { ICONS } from '../ui/icons';
import { Reveal, SplitText } from '../ui/motion';
import { Overline } from '../ui/Section';
import ContactForm from './ContactForm';
import './Contacts.scss';

const TEXT = CONTENT.contacts;

function ContactCard({ item }: { item: ContactItem }) {
  const Icon = ICONS[item.id];
  const Tag = item.href ? 'a' : 'div';
  return (
    <Tag href={item.href} className={item.href ? 'contact-item is-link' : 'contact-item'}>
      <span className="contact-item__icon"><Icon /></span>
      <span className="contact-item__label mono">{item.label}</span>
      <span className="contact-item__value">{item.value}</span>
      {item.extra && <span className="contact-item__extra">{item.extra}</span>}
    </Tag>
  );
}

export default function Contacts() {
  return (
    <section className="contacts section" id="contacts">
      <div className="contacts__glow" aria-hidden="true" />
      <div className="container">
        <div className="contacts__grid">
          <div className="contacts__info">
            <Overline {...TEXT.head} />
            <h2 className="contacts__title">
              <SplitText text={TEXT.head.title} accent={TEXT.head.accent} />
            </h2>
            <Reveal delay={0.15}>
              <p className="contacts__lead">{TEXT.lead}</p>
            </Reveal>
            <div className="contacts__items">
              {CONTACT_ITEMS.map((item, i) => (
                <Reveal key={item.id} delay={0.1 + i * 0.08} y={24}>
                  <ContactCard item={item} />
                </Reveal>
              ))}
            </div>
            <Reveal className="contacts__socials" delay={0.3}>
              {SOCIALS.map(({ id, href, label }) => {
                const Icon = ICONS[id];
                return (
                  <a key={id} href={href} className={`contacts__social contacts__social--${id}`} target="_blank" rel="noreferrer">
                    <Icon />
                    {label}
                  </a>
                );
              })}
            </Reveal>
          </div>
          <Reveal delay={0.15} y={48}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
