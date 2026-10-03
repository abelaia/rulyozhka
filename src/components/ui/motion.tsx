import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

import { inView, pillSpring, splitText, splitWord, VIEWPORT } from '../../animations';
import { cx } from '../../utils/format';

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number };

/** Блок плавно появляется при прокрутке */
export function Reveal({ delay = 0, y = 32, ...rest }: RevealProps) {
  return <motion.div {...inView(delay, { y }, 0.9)} {...rest} />;
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
    <motion.span className="split" initial="hidden" {...trigger} variants={splitText(delay)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="split__word">
            <motion.span className={cx('split__inner', accent.includes(word) && 'is-accent')} variants={splitWord}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  );
}

/** Плашка, которая «перетекает» между активными пунктами (меню, фильтры, вкладки) */
export function ActivePill({ id, className, stiffness }: { id: string; className: string; stiffness?: number }) {
  return <motion.span layoutId={id} className={className} transition={pillSpring(stiffness)} />;
}
