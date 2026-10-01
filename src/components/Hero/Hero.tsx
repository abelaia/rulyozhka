import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { IMAGES as images } from '../../constants/images';
import { useCountUp, useInView } from '../../hooks';
import { ArrowDownIcon, ArrowRightIcon } from '../ui/icons';
import { EASE, Magnetic, SplitText } from '../ui/motion';
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

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>(0.3);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  // Параллакс: фото уходит медленнее контента
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <motion.div className="hero__media" style={{ y: mediaY, scale: mediaScale }}>
        <motion.img
          src={images.hero}
          alt="Перетянутый кожей салон автомобиля"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
      </motion.div>
      <div className="hero__scrim" />
      <div className="hero__glow" aria-hidden="true" />

      <motion.div className="container hero__content" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.p className="hero__overline mono" {...fadeUp(0.2)}>
          <span className="hero__overline-dot" />
          Мастер по перетяжке салонов · с 2018 года
        </motion.p>

        <h1 className="hero__title">
          <span className="hero__title-line">
            <SplitText text="Интерьерный" immediate delay={0.3} />
          </span>
          <span className="hero__title-line hero__title-line--accent">
            <SplitText text="тюнинг" accent={['тюнинг']} immediate delay={0.42} />
            <svg className="hero__stitch" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
              <motion.path
                d="M2 12 C 80 4, 160 18, 240 9 S 360 6, 398 11"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
              />
            </svg>
          </span>
          <span className="hero__title-line">
            <SplitText text="автомобиля" immediate delay={0.54} />
          </span>
        </h1>

        <motion.p className="hero__subtitle" {...fadeUp(0.9)}>
          Перетяжка салонов автомобилей, мотоциклов и лодок — натуральная кожа, алькантара и экокожа.
        </motion.p>

        <motion.div className="hero__actions" {...fadeUp(1.05)}>
          <Magnetic>
            <a href="#works" className="btn btn--solid">
              Смотреть работы
              <ArrowRightIcon />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contacts" className="btn btn--ghost">
              Записаться на замер
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div className="hero__bottom" {...fadeUp(1.25)}>
        <div className="container hero__bottom-inner">
          <div className="hero__stats" ref={statsRef}>
            {STATS.map((stat) => (
              <StatItem key={stat.label} stat={stat} started={statsInView} />
            ))}
          </div>
          <a href="#services" className="hero__scroll mono">
            <span className="hero__scroll-icon">
              <ArrowDownIcon />
            </span>
            Листайте вниз
          </a>
        </div>
      </motion.div>

      <motion.div
        className="hero__badge"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
      >
        <svg viewBox="0 0 160 160" className="hero__badge-ring">
          <defs>
            <path id="hero-circle" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
          </defs>
          <text>
            <textPath href="#hero-circle" textLength="386" lengthAdjust="spacing">ПЕРЕТЯЖКА · КОЖА · АЛЬКАНТАРА · ГАРАНТИЯ ·</textPath>
          </text>
        </svg>
        <span className="hero__badge-core">R</span>
      </motion.div>
    </section>
  );
}
