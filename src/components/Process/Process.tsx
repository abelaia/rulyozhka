import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';

import { inView, STEPS_SPRING } from '../../animations';
import { CONTENT, PROCESS_STEPS } from '../../data';
import { cx } from '../../utils/format';
import { ClockIcon } from '../ui/icons';
import { Reveal } from '../ui/motion';
import Section from '../ui/Section';
import './Process.scss';

const TEXT = CONTENT.process;

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(0);
  // Линия-«строчка» прошивается по мере прокрутки, шаги загораются по очереди
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 85%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, STEPS_SPRING);
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setReached(Math.min(PROCESS_STEPS.length, Math.floor(value * PROCESS_STEPS.length + 0.35)));
  });
  return (
    <Section id="process" className="process" head={TEXT.head}>
      <div className="process__track" ref={trackRef}>
        <div className="process__line" aria-hidden="true">
          <motion.div className="process__line-fill" style={{ scaleX: progress }} />
          <motion.div className="process__line-fill process__line-fill--vertical" style={{ scaleY: progress }} />
        </div>
        <ol className="process__grid">
          {PROCESS_STEPS.map((step, i) => (
            <motion.li key={step.index} className={cx('process__step', i < reached && 'is-reached')} {...inView(i * 0.1)}>
              <span className="process__node mono">{step.index}</span>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-text">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
      <Reveal className="process__note">
        <span className="process__note-icon"><ClockIcon /></span>
        <p>{TEXT.note}</p>
      </Reveal>
    </Section>
  );
}
