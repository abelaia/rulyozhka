import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { REVIEWS as reviews } from '../../constants/site';
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from '../ui/icons';
import { EASE, VIEWPORT } from '../ui/motion';
import SectionHead from '../ui/SectionHead';
import './Reviews.scss';

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Нативная прокрутка со snap: свайпается на телефоне, кнопки листают по карточке
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
      const card = track.firstElementChild as HTMLElement | null;
      if (card) setIndex(Math.round(track.scrollLeft / (card.offsetWidth + 24)));
    };
    onScroll();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const atStart = track.scrollLeft <= 4;
    if (direction === 1 && atEnd) return track.scrollTo({ left: 0, behavior: 'smooth' });
    if (direction === -1 && atStart) return track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    track.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: 'smooth' });
  };

  return (
    <section className="reviews section" id="reviews">
      <div className="container">
        <SectionHead index="05" overline="Отзывы" title="Что говорят владельцы" accent={['владельцы']}>
          <div className="reviews__controls">
            <button type="button" className="reviews__btn" onClick={() => scrollByCard(-1)} aria-label="Предыдущие отзывы">
              <ArrowLeftIcon />
            </button>
            <span className="reviews__counter mono">
              <em>{String(Math.min(index + 1, reviews.length)).padStart(2, '0')}</em> / {String(reviews.length).padStart(2, '0')}
            </span>
            <button type="button" className="reviews__btn" onClick={() => scrollByCard(1)} aria-label="Следующие отзывы">
              <ArrowRightIcon />
            </button>
          </div>
        </SectionHead>
      </div>

      <div className="reviews__track" ref={trackRef}>
        {reviews.map((review, i) => (
          <motion.article
            className="review-card"
            key={review.id}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, delay: Math.min(i, 3) * 0.1, ease: EASE }}
          >
            <div className="review-card__head">
              <div className="review-card__stars" aria-label={`Оценка ${review.rating} из 5`}>
                {Array.from({ length: review.rating }).map((_, star) => (
                  <StarIcon key={star} />
                ))}
              </div>
              <span className="review-card__quote" aria-hidden="true">
                ”
              </span>
            </div>
            <p className="review-card__project mono">{review.project}</p>
            <p className="review-card__text">{review.text}</p>
            {review.reply && (
              <blockquote className="review-card__reply">
                <span className="review-card__reply-label mono">Ответ</span>
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
        ))}
      </div>

      <div className="container">
        <div className="reviews__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} />
        </div>
      </div>
    </section>
  );
}
