import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

import { inView, workExit } from '../../animations';
import { CONTENT, WORK_CATEGORIES, WORKS } from '../../data';
import type { Work, WorkCategory } from '../../models';
import { cx, fill } from '../../utils/format';
import Button from '../ui/Button';
import { ActivePill, Reveal } from '../ui/motion';
import Section from '../ui/Section';
import Lightbox from './Lightbox';
import WorkCard from './WorkCard';
import './Works.scss';

const TEXT = CONTENT.works;

export default function Works() {
  const [category, setCategory] = useState<WorkCategory>(WORK_CATEGORIES[0]);
  const [opened, setOpened] = useState<Work | null>(null);
  const filtered = category === WORK_CATEGORIES[0] ? WORKS : WORKS.filter((work) => work.category === category);
  const filters = (
    <LayoutGroup id="works-filters">
      <div className="works__filters" role="tablist" aria-label={TEXT.filtersLabel}>
        {WORK_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={item === category}
            className={cx('works__filter', item === category && 'is-active')}
            onClick={() => setCategory(item)}
          >
            {item === category && <ActivePill id="works-filter-pill" className="works__filter-pill" stiffness={400} />}
            <span className="works__filter-text">{item}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
  return (
    <Section
      id="works"
      className="works"
      head={TEXT.head}
      aside={filters}
      after={<AnimatePresence>{opened && <Lightbox work={opened} onClose={() => setOpened(null)} />}</AnimatePresence>}
    >
      <motion.div className="works__grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((work, i) => (
            <motion.div
              layout
              key={work.id}
              className="works__item"
              {...inView((i % 3) * 0.08, { y: 60, scale: 0.96 })}
              {...workExit}
            >
              <WorkCard work={work} onOpen={() => setOpened(work)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <Reveal className="works__foot">
        <p className="works__count mono">{fill(TEXT.count, { shown: filtered.length, total: WORKS.length })}</p>
        <Button href="#contacts">{TEXT.cta}</Button>
      </Reveal>
    </Section>
  );
}
