import { CONTENT, REVIEWS } from '../../data';
import { useCarousel } from '../../hooks';
import { pad2 } from '../../utils/format';
import { ArrowLeftIcon, ArrowRightIcon } from '../ui/icons';
import Section from '../ui/Section';
import ReviewCard from './ReviewCard';
import './Reviews.scss';

const TEXT = CONTENT.reviews;
const CARD_GAP = 24;

export default function Reviews() {
  const { trackRef, index, progress, scrollByCard } = useCarousel<HTMLDivElement>(CARD_GAP);
  const arrow = (direction: 1 | -1) => (
    <button type="button" className="reviews__btn" onClick={() => scrollByCard(direction)} aria-label={direction < 0 ? TEXT.prev : TEXT.next}>
      {direction < 0 ? <ArrowLeftIcon /> : <ArrowRightIcon />}
    </button>
  );
  const controls = (
    <div className="reviews__controls">
      {arrow(-1)}
      <span className="reviews__counter mono">
        <em>{pad2(Math.min(index + 1, REVIEWS.length))}</em> / {pad2(REVIEWS.length)}
      </span>
      {arrow(1)}
    </div>
  );
  const track = (
    <>
      <div className="reviews__track" ref={trackRef}>
        {REVIEWS.map((review, i) => <ReviewCard key={review.id} review={review} delay={Math.min(i, 3) * 0.1} />)}
      </div>
      <div className="container">
        <div className="reviews__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} />
        </div>
      </div>
    </>
  );
  return <Section id="reviews" className="reviews" head={TEXT.head} aside={controls} after={track} />;
}
