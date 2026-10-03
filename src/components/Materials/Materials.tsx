import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { curtainIn, swapText } from '../../animations';
import { CONTENT, MATERIALS } from '../../data';
import { cx, pad2 } from '../../utils/format';
import { CheckIcon } from '../ui/icons';
import { ActivePill, Reveal } from '../ui/motion';
import Section from '../ui/Section';
import './Materials.scss';

const TEXT = CONTENT.materials;

export default function Materials() {
  const [active, setActive] = useState(MATERIALS[0]);
  return (
    <Section id="materials" className="materials" head={TEXT.head}>
      <Reveal className="materials__layout">
        <div className="materials__tabs" role="tablist" aria-label={TEXT.tabsLabel}>
          {MATERIALS.map((material, i) => {
            const isActive = material.id === active.id;
            return (
              <button
                key={material.id}
                type="button"
                role="tab"
                id={`material-tab-${material.id}`}
                aria-selected={isActive}
                aria-controls="material-panel"
                className={cx('materials__tab', isActive && 'is-active')}
                onClick={() => setActive(material)}
                onMouseEnter={() => setActive(material)}
              >
                {isActive && <ActivePill id="material-tab-bg" className="materials__tab-bg" stiffness={300} />}
                <span className="materials__tab-index mono">{pad2(i + 1)}</span>
                <span className="materials__tab-body">
                  <span className="materials__tab-title">{material.title}</span>
                  <span className="materials__tab-subtitle">{material.subtitle}</span>
                </span>
                <span className="materials__tab-thumb"><img src={material.image} alt="" loading="lazy" /></span>
              </button>
            );
          })}
        </div>
        <div className="materials__panel" id="material-panel" role="tabpanel" aria-labelledby={`material-tab-${active.id}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img key={active.id} className="materials__image" src={active.image} alt={active.title} {...curtainIn} />
          </AnimatePresence>
          <div className="materials__shade" />
          <span className="materials__badge chip">{active.badge}</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active.id} className="materials__info" {...swapText}>
              <h3 className="materials__title">{active.title}</h3>
              <ul className="materials__features">
                {active.features.map((feature) => (
                  <li key={feature}>
                    <span className="materials__check"><CheckIcon /></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
