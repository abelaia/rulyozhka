import { motion } from 'framer-motion';

import { SERVICES as services } from '../../constants/services';
import type { Service } from '../../constants/services';
import { ArrowUpRightIcon } from '../ui/icons';
import { EASE, Magnetic, Reveal, VIEWPORT } from '../ui/motion';
import SectionHead from '../ui/SectionHead';
import './Services.scss';

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <SectionHead
          index="01"
          overline="Услуги"
          title="Что перетягиваю"
          accent={['перетягиваю']}
          note="От руля до полного салона — любой транспорт."
        />

        <div className="services__list">
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} delay={i * 0.06} />
          ))}
        </div>

        <Reveal className="services__foot">
          <p>Не нашли своё? Перетяну любой другой транспорт и элементы интерьера по вашему запросу.</p>
          <Magnetic>
            <a href="#contacts" className="btn btn--ghost">
              Обсудить проект
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceRow({ service, delay }: { service: Service; delay: number }) {
  return (
    <motion.a
      href="#contacts"
      className="services__row"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      <span className="services__index mono">{service.index}</span>
      <h3 className="services__title">{service.title}</h3>
      <p className="services__desc">{service.description}</p>
      <div className="services__meta">
        <span className="services__price">{service.price}</span>
        <span className="services__tags mono">{service.tags}</span>
      </div>
      <span className="services__arrow">
        <ArrowUpRightIcon />
      </span>
    </motion.a>
  );
}
