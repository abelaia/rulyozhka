import { IMAGES as images } from '../../constants/images';
import { useCountUp, useInView } from '../../hooks';
import './Hero.scss';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 7, suffix: '+', label: 'лет опыта' },
  { value: 1000, suffix: '+', label: 'выполненных работ' },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function StatItem({ stat, started }: { stat: Stat; started: boolean }) {
  const value = useCountUp(stat.value, started);
  return (
    <div className="hero__stat">
      <div className="hero__stat-value">
        {value}
        <span className="hero__stat-suffix">{stat.suffix}</span>
      </div>
      <div className="hero__stat-label">{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>(0.3);

  return (
    <section className="hero" id="hero">
      <div className="hero__media">
        <img src={images.hero} alt="Перетянутый кожей салон автомобиля" />
      </div>
      <div className="hero__scrim" />

      <div className="container hero__content">
        <p className="hero__overline">Мастер по перетяжке салонов · с 2018 года</p>
        <h1 className="hero__title">
          <span className="hero__title-line">
            <span className="hero__title-inner" style={{ animationDelay: '0.1s' }}>
              Интерьерный 
            </span>
          </span>
          <span className="hero__title-line">
            <span className="hero__title-inner" style={{ animationDelay: '0.2s' }}>
              <em className="hero__title-word">
                тюнинг
              </em>
            </span>
          </span>
          <span className="hero__title-line">
            <span
              className="hero__title-inner"
              style={{ animationDelay: '0.4s' }}
            >
              автомобиля
            </span>
          </span>
        </h1>
        <p className="hero__subtitle">
          Перетяжка салонов автомобилей, мотоциклов и лодок — натуральная кожа, алькантара
          и экокожа.
        </p>

        <div className="hero__actions">
          <a href="#works" className="btn btn--solid">
            Смотреть работы
            <ArrowIcon />
          </a>
          <a href="#contacts" className="btn btn--light">
            Записаться на замер
          </a>
        </div>

        <div className="hero__stats" ref={statsRef}>
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} started={statsInView} />
          ))}
        </div>
      </div>

      <div className="hero__badge" aria-hidden="true">
        <svg viewBox="0 0 160 160">
          <defs>
            <path id="hero-circle" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
          </defs>
          <text>
            <textPath href="#hero-circle">
              ПЕРЕТЯЖКА · КОЖА · АЛЬКАНТАРА · ГАРАНТИЯ ·
            </textPath>
          </text>
        </svg>
        <span className="hero__badge-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 4 20l8-4 8 4L12 2Z" />
          </svg>
        </span>
      </div>

      <a href="#services" className="hero__scroll">
        <span className="hero__scroll-line" />
        Листайте вниз
      </a>
    </section>
  );
}
