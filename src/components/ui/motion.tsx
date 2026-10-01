import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' } as const;

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number };

/** Плавное появление блока при прокрутке */
export function Reveal({ delay = 0, y = 32, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface SplitTextProps {
  text: string;
  /** Слова, которые подсвечиваются акцентным цветом */
  accent?: string[];
  delay?: number;
  /** Запуск сразу при монтировании, а не при попадании в зону видимости */
  immediate?: boolean;
}

/** Слова «выезжают» снизу из-под маски по очереди */
export function SplitText({ text, accent = [], delay = 0, immediate = false }: SplitTextProps) {
  const words = text.split(' ');
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT };

  return (
    <motion.span
      className="split"
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="split__word">
            <motion.span
              className={`split__inner ${accent.includes(word) ? 'is-accent' : ''}`}
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 1, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  );
}

/** Элемент слегка тянется за курсором */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const spring = { stiffness: 220, damping: 16, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (event: React.PointerEvent) => {
    if (event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: 'inline-flex' }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
