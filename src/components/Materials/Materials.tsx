import { MATERIALS as materials } from '../../constants/site';
import type { Material } from '../../constants/site';
import { useInView } from '../../hooks';
import './Materials.scss';

export default function Materials() {
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();

  return (
    <section className="materials section" id="materials">
      <div className="container">
        <div className={`section-head reveal ${headInView ? 'is-visible' : ''}`} ref={headRef}>
          <div>
            <p className="section-head__overline">Материалы</p>
            <h2 className="section-head__title">Из чего шьём</h2>
          </div>
          <p className="section-head__note">
            Только проверенные поставщики из Италии, Германии и Кореи. Образцы можно
            потрогать в ателье или заказать выезд с каталогом.
          </p>
        </div>

        <div className="materials__grid">
          {materials.map((material, i) => (
            <MaterialCard key={material.id} material={material} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MaterialCard({ material, delay }: { material: Material; delay: number }) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <article
      className={`material-card reveal ${inView ? 'is-visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`material-card__swatch ${
          material.texture ? `material-card__swatch--${material.texture}` : ''
        }`}
      >
        {material.image && <img src={material.image} alt={material.title} loading="lazy" />}
        <span className="material-card__badge">{material.badge}</span>
      </div>
      <div className="material-card__body">
        <div>
          <h3 className="material-card__title">{material.title}</h3>
          <p className="material-card__subtitle">{material.subtitle}</p>
        </div>
        <ul className="material-card__features">
          {material.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
