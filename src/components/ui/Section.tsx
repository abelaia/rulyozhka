import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

import type { SectionHeadContent } from '../../models';
import { growX } from '../../animations';
import { Reveal, SplitText } from './motion';

/** «01 — Услуги»: номер секции, пунктир-строчка и надзаголовок */
export function Overline({ index, overline }: Pick<SectionHeadContent, 'index' | 'overline'>) {
  return (
    <p className="section-head__overline">
      <span className="section-head__index">{index}</span>
      <motion.span className="section-head__dash stitch" {...growX} />
      {overline}
    </p>
  );
}

export function SectionHead({ index, overline, title, accent, note, children }: SectionHeadContent & { children?: ReactNode }) {
  return (
    <div className="section-head">
      <div>
        <Overline index={index} overline={overline} />
        <h2 className="section-head__title">
          <SplitText text={title} accent={accent} />
        </h2>
      </div>
      {note && (
        <Reveal delay={0.2}>
          <p className="section-head__note">{note}</p>
        </Reveal>
      )}
      {children && <Reveal delay={0.2}>{children}</Reveal>}
    </div>
  );
}

interface SectionProps {
  id: string;
  className: string;
  head: SectionHeadContent;
  /** Блок справа от заголовка (фильтры, стрелки карусели) */
  aside?: ReactNode;
  children?: ReactNode;
  /** Содержимое вне контейнера — на всю ширину экрана */
  after?: ReactNode;
}

/** Секция страницы: контейнер + заголовок + содержимое */
export default function Section({ id, className, head, aside, children, after }: SectionProps) {
  return (
    <section className={`${className} section`} id={id}>
      <div className="container">
        <SectionHead {...head}>{aside}</SectionHead>
        {children}
      </div>
      {after}
    </section>
  );
}
