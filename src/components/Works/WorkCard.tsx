import type { Work } from '../../models';
import { ArrowUpRightIcon } from '../ui/icons';

export const workMeta = (work: Work) => `${work.material} · ${work.time}`;

export default function WorkCard({ work, onOpen }: { work: Work; onOpen: () => void }) {
  return (
    <button type="button" className="work-card" onClick={onOpen}>
      <span className="work-card__frame">
        <img className="work-card__media" src={work.image} alt={work.title} loading="lazy" />
      </span>
      <span className="work-card__overlay" />
      <span className="work-card__top chip">{work.category}</span>
      <span className="work-card__view" aria-hidden="true"><ArrowUpRightIcon /></span>
      <span className="work-card__body">
        <span className="work-card__title">{work.title}</span>
        <span className="work-card__meta mono">{workMeta(work)}</span>
      </span>
    </button>
  );
}
