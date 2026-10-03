import { motion } from 'framer-motion';

import { appear, badgeIn, drawLine, heroImage } from '../../animations';
import { CONTENT } from '../../data';
import { useCountUp, useInView, useParallax } from '../../hooks';
import type { Stat } from '../../models';
import { cx } from '../../utils/format';
import Button from '../ui/Button';
import { ArrowDownIcon, ArrowRightIcon } from '../ui/icons';
import { SplitText } from '../ui/motion';
import './Hero.scss';

const TEXT = CONTENT.hero;

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

/** Пунктирная «строчка», которая прорисовывается под акцентным словом */
function StitchUnderline() {
  return (
    <svg className="hero__stitch" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d="M2 12 C 80 4, 160 18, 240 9 S 360 6, 398 11" {...drawLine} />
    </svg>
  );
}

export default function Hero() {
  const { ref: sectionRef, media, content } = useParallax<HTMLElement>();
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>(0.3);
  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <motion.div className="hero__media" style={media}>
        <motion.img src={TEXT.image} alt={TEXT.imageAlt} {...heroImage} />
      </motion.div>
      <div className="hero__scrim" />
      <div className="hero__glow" aria-hidden="true" />
      <motion.div className="container hero__content" style={content}>
        <motion.p className="hero__overline mono" {...appear(0.2)}>
          <span className="hero__overline-dot" />
          {TEXT.overline}
        </motion.p>
        <h1 className="hero__title">
          {TEXT.title.map((line, i) => {
            const isAccent = i === TEXT.accentLine;
            return (
              <span key={line} className={cx('hero__title-line', isAccent && 'hero__title-line--accent')}>
                <SplitText text={line} accent={isAccent ? [line] : []} immediate delay={0.3 + i * 0.12} />
                {isAccent && <StitchUnderline />}
              </span>
            );
          })}
        </h1>
        <motion.p className="hero__subtitle" {...appear(0.9)}>{TEXT.subtitle}</motion.p>
        <motion.div className="hero__actions" {...appear(1.05)}>
          <Button href="#works" icon={<ArrowRightIcon />}>{TEXT.primaryCta}</Button>
          <Button href="#contacts" variant="ghost">{TEXT.secondaryCta}</Button>
        </motion.div>
      </motion.div>
      <motion.div className="hero__bottom" {...appear(1.25)}>
        <div className="container hero__bottom-inner">
          <div className="hero__stats" ref={statsRef}>
            {TEXT.stats.map((stat) => <StatItem key={stat.label} stat={stat} started={statsInView} />)}
          </div>
          <a href="#services" className="hero__scroll mono">
            <span className="hero__scroll-icon"><ArrowDownIcon /></span>
            {TEXT.scroll}
          </a>
        </div>
      </motion.div>
      <motion.div className="hero__badge" aria-hidden="true" {...badgeIn}>
        <svg viewBox="0 0 160 160" className="hero__badge-ring">
          <defs>
            <path id="hero-circle" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
          </defs>
          <text>
            <textPath href="#hero-circle" textLength="386" lengthAdjust="spacing">{TEXT.badge}</textPath>
          </text>
        </svg>
        <span className="hero__badge-core">{TEXT.badgeCore}</span>
      </motion.div>
    </section>
  );
}
