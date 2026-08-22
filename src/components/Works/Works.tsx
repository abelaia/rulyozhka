import { useState } from 'react';

import { WORKS as works, WORK_CATEGORIES as categories } from '../../constants/works';
import type { WorkCategory } from '../../constants/works';
import { useInView } from '../../hooks';
import './Works.scss';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export default function Works() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('Все');
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();

  const filtered =
    activeCategory === 'Все' ? works : works.filter((work) => work.category === activeCategory);

  return (
    <section className="works section" id="works">
      <div className="container">
        <div className={`section-head reveal ${headInView ? 'is-visible' : ''}`} ref={headRef}>
          <div>
            <p className="section-head__overline">Галерея</p>
            <h2 className="section-head__title">Портфолио</h2>
          </div>
          <div className="works__filters" role="tablist" aria-label="Фильтр работ">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={`works__filter ${activeCategory === category ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="works__grid" key={activeCategory}>
          {filtered.map((work, i) => (
            <article className="work-card" key={work.id} style={{ animationDelay: `${i * 70}ms` }}>
              <img className="work-card__media" src={work.image} alt={work.title} loading="lazy" />
              <div className="work-card__overlay" />
              <span className="work-card__top">{work.category}</span>
              <div className="work-card__body">
                <h3 className="work-card__title">{work.title}</h3>
                <p className="work-card__meta">
                  {work.material} · {work.time}
                </p>
              </div>
              <span className="work-card__view" aria-hidden="true">
                <ArrowIcon />
              </span>
            </article>
          ))}
        </div>

        <div className="works__foot">
          <p className="works__count">
            Показано {filtered.length} из {works.length} · полный каталог — в Telegram
          </p>
          <a href="#contacts" className="btn btn--outline-accent">
            Хочу так же
          </a>
        </div>
      </div>
    </section>
  );
}
