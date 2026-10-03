import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

import { heroParallax as range } from '../animations';

/** Параллакс секции: фон уходит медленнее контента, контент гаснет к концу секции */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const media = {
    y: useTransform(scrollYProgress, [0, 1], range.mediaY),
    scale: useTransform(scrollYProgress, [0, 1], range.mediaScale),
  };
  const content = {
    y: useTransform(scrollYProgress, [0, 1], range.contentY),
    opacity: useTransform(scrollYProgress, [0, range.contentFadeUntil], [1, 0]),
  };
  return { ref, media, content };
}
