import { motion } from 'framer-motion';

import { backdrop, modal } from '../../animations';
import { CONTENT } from '../../data';
import { useEscape, useLockBodyScroll } from '../../hooks';
import type { Work } from '../../models';
import Button from '../ui/Button';
import { CloseIcon } from '../ui/icons';
import { workMeta } from './WorkCard';

const TEXT = CONTENT.works;

export default function Lightbox({ work, onClose }: { work: Work; onClose: () => void }) {
  useEscape(onClose);
  useLockBodyScroll();
  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      onClick={onClose}
      {...backdrop}
    >
      <motion.figure className="lightbox__figure" onClick={(event) => event.stopPropagation()} {...modal}>
        <img src={work.image} alt={work.title} />
        <figcaption className="lightbox__caption">
          <div>
            <span className="chip">{work.category}</span>
            <h3 className="lightbox__title">{work.title}</h3>
            <p className="lightbox__meta mono">{workMeta(work)}</p>
          </div>
          <Button href="#contacts" onClick={onClose}>{TEXT.cta}</Button>
        </figcaption>
        <button type="button" className="lightbox__close" onClick={onClose} aria-label={TEXT.close} autoFocus>
          <CloseIcon />
        </button>
      </motion.figure>
    </motion.div>
  );
}
