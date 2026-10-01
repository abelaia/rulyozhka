import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

import { WORKS as works, WORK_CATEGORIES as categories } from '../../constants/works';
import type { Work, WorkCategory } from '../../constants/works';
import { ArrowUpRightIcon, CloseIcon } from '../ui/icons';
import { EASE, Magnetic, Reveal } from '../ui/motion';
import SectionHead from '../ui/SectionHead';
import './Works.scss';

export default function Works() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('Все');
  const [opened, setOpened] = useState<Work | null>(null);

  const filtered =
    activeCategory === 'Все' ? works : works.filter((work) => work.category === activeCategory);

  return (
    <section className="works section" id="works">
      <div className="container">
        <SectionHead index="03" overline="Галерея" title="Портфолио">
          <LayoutGroup id="works-filters">
            <div className="works__filters" role="tablist" aria-label="Фильтр работ">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`works__filter ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="works-filter-pill"
                        className="works__filter-pill"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="works__filter-text">{category}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </SectionHead>

        <motion.div className="works__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((work, i) => (
              <motion.div
                layout
                key={work.id}
                className="works__item"
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: EASE }}
              >
              <button type="button" className="work-card" onClick={() => setOpened(work)}>
                <span className="work-card__frame">
                  <img className="work-card__media" src={work.image} alt={work.title} loading="lazy" />
                </span>
                <span className="work-card__overlay" />
                <span className="work-card__top chip">{work.category}</span>
                <span className="work-card__view" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
                <span className="work-card__body">
                  <span className="work-card__title">{work.title}</span>
                  <span className="work-card__meta mono">
                    {work.material} · {work.time}
                  </span>
                </span>
              </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="works__foot">
          <p className="works__count mono">
            Показано {filtered.length} из {works.length} · больше работ в Telegram
          </p>
          <Magnetic>
            <a href="#contacts" className="btn btn--solid">
              Хочу так же
            </a>
          </Magnetic>
        </Reveal>
      </div>

      <AnimatePresence>{opened && <Lightbox work={opened} onClose={() => setOpened(null)} />}</AnimatePresence>
    </section>
  );
}

function Lightbox({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.figure
        className="lightbox__figure"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <img src={work.image} alt={work.title} />
        <figcaption className="lightbox__caption">
          <div>
            <span className="chip">{work.category}</span>
            <h3 className="lightbox__title">{work.title}</h3>
            <p className="lightbox__meta mono">
              {work.material} · {work.time}
            </p>
          </div>
          <a href="#contacts" className="btn btn--solid" onClick={onClose}>
            Хочу так же
          </a>
        </figcaption>
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="Закрыть" autoFocus>
          <CloseIcon />
        </button>
      </motion.figure>
    </motion.div>
  );
}
