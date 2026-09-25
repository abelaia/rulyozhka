import { SERVICES as services } from '../../constants/services';
import type { Service } from '../../constants/services';
import { useInView } from '../../hooks';
import './Services.scss';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Services() {
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();

  return (
    <section className="services section" id="services">
      <div className="container">
        <div className={`section-head reveal ${headInView ? 'is-visible' : ''}`} ref={headRef}>
          <div>
            <p className="section-head__overline">Услуги</p>
            <h2 className="section-head__title">Что перетягиваю</h2>
          </div>
          <p className="section-head__note">
            От руля до полного салона — любой транспорт.
          </p>
        </div>

        <div className="services__list">
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} delay={i * 60} />
          ))}
        </div>

        <div className="services__foot">
          <p>Не нашли своё? Перетяну любой другой транспорт и элементы интерьера по вашему запросу.</p>
          <a href="#contacts" className="btn btn--outline">
            Обсудить проект
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, delay }: { service: Service; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      className={`services__row reveal ${inView ? 'is-visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="services__index">{service.index}</span>
      <h3 className="services__title">{service.title}</h3>
      <p className="services__desc">{service.description}</p>
      <div className="services__meta">
        <span className="services__price">{service.price}</span>
        <span className="services__tags">{service.tags}</span>
      </div>
      <a href="#contacts" className="services__arrow" aria-label={`Заказать: ${service.title}`}>
        <ArrowIcon />
      </a>
    </div>
  );
}
