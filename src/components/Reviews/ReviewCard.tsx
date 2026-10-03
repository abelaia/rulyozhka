import { motion } from 'framer-motion';

import { inView } from '../../animations';
import { CONTENT } from '../../data';
import type { Review } from '../../models';
import { fill } from '../../utils/format';
import { StarIcon } from '../ui/icons';

const TEXT = CONTENT.reviews;

export default function ReviewCard({ review, delay }: { review: Review; delay: number }) {
  return (
    <motion.article className="review-card" {...inView(delay, { x: 60 })}>
      <div className="review-card__head">
        <div className="review-card__stars" aria-label={fill(TEXT.rating, { rating: review.rating })}>
          {Array.from({ length: review.rating }, (_, star) => <StarIcon key={star} />)}
        </div>
        <span className="review-card__quote" aria-hidden="true">”</span>
      </div>
      <p className="review-card__project mono">{review.project}</p>
      <p className="review-card__text">{review.text}</p>
      {review.reply && (
        <blockquote className="review-card__reply">
          <span className="review-card__reply-label mono">{TEXT.reply}</span>
          {review.reply}
        </blockquote>
      )}
      <div className="review-card__footer">
        <span className="review-card__avatar">{review.name[0]}</span>
        <div>
          <p className="review-card__name">{review.name}</p>
          <p className="review-card__date">{review.date}</p>
        </div>
      </div>
    </motion.article>
  );
}
