import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

import { EASE, Reveal, SplitText, VIEWPORT } from './motion';

interface SectionHeadProps {
  index: string;
  overline: string;
  title: string;
  accent?: string[];
  note?: string;
  children?: ReactNode;
}

export default function SectionHead({ index, overline, title, accent, note, children }: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <p className="section-head__overline">
          <span className="section-head__index">{index}</span>
          <motion.span
            className="section-head__dash stitch"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ transformOrigin: '0 50%' }}
          />
          {overline}
        </p>
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
