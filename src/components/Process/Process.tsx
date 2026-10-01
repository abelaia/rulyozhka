import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';

import { PROCESS_STEPS as steps } from '../../constants/site';
import { ClockIcon } from '../ui/icons';
import { EASE, Reveal, VIEWPORT } from '../ui/motion';
import SectionHead from '../ui/SectionHead';
import './Process.scss';

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(0);

  // Линия-«строчка» прошивается по мере прокрутки, шаги загораются по очереди
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 85%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setReached(Math.min(steps.length, Math.floor(value * steps.length + 0.35)));
  });

  return (
    <section className="process section" id="process">
      <div className="container">
        <SectionHead index="04" overline="Формат работы" title="4 шага до нового салона" accent={['4']} />

        <div className="process__track" ref={trackRef}>
          <div className="process__line" aria-hidden="true">
            <motion.div className="process__line-fill" style={{ scaleX: progress }} />
            <motion.div className="process__line-fill process__line-fill--vertical" style={{ scaleY: progress }} />
          </div>

          <ol className="process__grid">
            {steps.map((step, i) => (
              <motion.li
                key={step.index}
                className={`process__step ${i < reached ? 'is-reached' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              >
                <span className="process__node mono">{step.index}</span>
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-text">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal className="process__note">
          <span className="process__note-icon">
            <ClockIcon />
          </span>
          <p>Средний срок полной перетяжки салона от 5 дней.</p>
        </Reveal>
      </div>
    </section>
  );
}
