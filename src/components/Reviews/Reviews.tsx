import { useEffect, useState } from 'react';

import { REVIEWS as reviews } from '../../constants/site';
import { useInView } from '../../hooks';
import './Reviews.scss';

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5m6-6-6 6 6 6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5z" />
    </svg>
  );
}

function getPerPage(width: number) {
  if (width < 640) return 1;
  if (width < 1020) return 2;
  return 3;
}

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(() => getPerPage(window.innerWidth));
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();

  useEffect(() => {
    const onResize = () => setPerPage(getPerPage(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxIndex = Math.max(reviews.length - perPage, 0);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const next = () => setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prev = () => setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <section className="reviews section" id="reviews">
      <div className="container">
        <div className={`section-head reveal ${headInView ? 'is-visible' : ''}`} ref={headRef}>
          <div>
            <p className="section-head__overline">Отзывы</p>
            <h2 className="section-head__title">Что говорят владельцы</h2>
          </div>
          <div className="reviews__controls">
            <button type="button" className="reviews__btn" onClick={prev} aria-label="Предыдущие отзывы">
              <ArrowLeftIcon />
            </button>
            <span className="reviews__counter">
              <em>{String(index + 1).padStart(2, '0')}</em> / {String(reviews.length).padStart(2, '0')}
            </span>
            <button type="button" className="reviews__btn" onClick={next} aria-label="Следующие отзывы">
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <div className="reviews__viewport">
          <div
            className="reviews__track"
            style={{ transform: `translateX(-${index * (100 / perPage)}%)` }}
          >
            {reviews.map((review) => (
              <div className="reviews__slot" key={review.id}>
                <article className="review-card">
                  <span className="review-card__quote">”</span>
                  <div className="review-card__stars" aria-label={`Оценка ${review.rating} из 5`}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                <p className="review-card__text">{review.text}</p>
                {review.reply && (
                  <blockquote className="review-card__reply">
                    <span className="review-card__reply-label">Ответ</span>
                    {review.reply}
                  </blockquote>
                )}
                <div className="review-card__footer">
                  <span className="review-card__avatar">{review.name[0]}</span>
                  <div>
                    <p className="review-card__name">{review.name}</p>
                    <p className="review-card__car">
                      {review.date} · {review.project}
                    </p>
                  </div>
                </div>                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
