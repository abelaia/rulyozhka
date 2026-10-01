import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { MATERIALS as materials } from '../../constants/site';
import { CheckIcon } from '../ui/icons';
import { EASE, Reveal } from '../ui/motion';
import SectionHead from '../ui/SectionHead';
import './Materials.scss';

export default function Materials() {
  const [activeId, setActiveId] = useState(materials[0].id);
  const active = materials.find((material) => material.id === activeId) ?? materials[0];

  return (
    <section className="materials section" id="materials">
      <div className="container">
        <SectionHead
          index="02"
          overline="Материалы"
          title="Из чего шью"
          accent={['шью']}
          note="Только проверенные материалы. Определиться с выбором можно в мастерской."
        />

        <Reveal className="materials__layout">
          <div className="materials__tabs" role="tablist" aria-label="Материалы">
            {materials.map((material, i) => {
              const isActive = material.id === activeId;
              return (
                <button
                  key={material.id}
                  type="button"
                  role="tab"
                  id={`material-tab-${material.id}`}
                  aria-selected={isActive}
                  aria-controls="material-panel"
                  className={`materials__tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveId(material.id)}
                  onMouseEnter={() => setActiveId(material.id)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="material-tab-bg"
                      className="materials__tab-bg"
                      transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                    />
                  )}
                  <span className="materials__tab-index mono">0{i + 1}</span>
                  <span className="materials__tab-body">
                    <span className="materials__tab-title">{material.title}</span>
                    <span className="materials__tab-subtitle">{material.subtitle}</span>
                  </span>
                  <span className="materials__tab-thumb">
                    <img src={material.image} alt="" loading="lazy" />
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="materials__panel"
            id="material-panel"
            role="tabpanel"
            aria-labelledby={`material-tab-${active.id}`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={active.id}
                className="materials__image"
                src={active.image}
                alt={active.title}
                initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.15 }}
                animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            </AnimatePresence>
            <div className="materials__shade" />
            <span className="materials__badge chip">{active.badge}</span>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                className="materials__info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h3 className="materials__title">{active.title}</h3>
                <ul className="materials__features">
                  {active.features.map((feature) => (
                    <li key={feature}>
                      <span className="materials__check">
                        <CheckIcon />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
