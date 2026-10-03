import { useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

/** Шапка: isScrolled — страница прокручена, isHidden — прокрутка идёт вниз */
export function useHideOnScroll(offset = 24, hideAfter = 400) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (current) => {
    setIsScrolled(current > offset);
    setIsHidden(current > hideAfter && current > (scrollY.getPrevious() ?? 0));
  });
  return { isScrolled, isHidden };
}
