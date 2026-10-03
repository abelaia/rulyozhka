import { motion } from 'framer-motion';

import { inView } from '../../animations';
import { CONTENT, SERVICES } from '../../data';
import Button from '../ui/Button';
import { ArrowUpRightIcon } from '../ui/icons';
import { Reveal } from '../ui/motion';
import Section from '../ui/Section';
import './Services.scss';

const TEXT = CONTENT.services;

export default function Services() {
  return (
    <Section id="services" className="services" head={TEXT.head}>
      <div className="services__list">
        {SERVICES.map((service, i) => (
          <motion.a key={service.id} href="#contacts" className="services__row" {...inView(i * 0.06)}>
            <span className="services__index mono">{service.index}</span>
            <h3 className="services__title">{service.title}</h3>
            <p className="services__desc">{service.description}</p>
            <div className="services__meta">
              <span className="services__price">{service.price}</span>
              <span className="services__tags mono">{service.tags}</span>
            </div>
            <span className="services__arrow"><ArrowUpRightIcon /></span>
          </motion.a>
        ))}
      </div>
      <Reveal className="services__foot">
        <p>{TEXT.foot}</p>
        <Button href="#contacts" variant="ghost">{TEXT.cta}</Button>
      </Reveal>
    </Section>
  );
}
