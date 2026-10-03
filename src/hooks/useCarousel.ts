import { useEffect, useRef, useState } from 'react';

/**
 * Карусель на нативной прокрутке со snap: свайпается на телефоне,
 * scrollByCard листает по одной карточке и зацикливается на краях.
 */
export function useCarousel<T extends HTMLElement>(gap: number) {
  const trackRef = useRef<T>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const step = (track: T) => ((track.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0) + gap;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
      setIndex(Math.round(track.scrollLeft / step(track)));
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
    if (!track) return;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const atStart = track.scrollLeft <= 4;
    if (direction === 1 && atEnd) return track.scrollTo({ left: 0, behavior: 'smooth' });
    if (direction === -1 && atStart) return track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    track.scrollBy({ left: direction * step(track), behavior: 'smooth' });
  };

  return { trackRef, index, progress, scrollByCard };
}
