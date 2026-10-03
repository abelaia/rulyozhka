/**
 * Все анимации сайта (framer-motion) в одном месте.
 * Компоненты берут готовые пресеты: <motion.div {...modal} />.
 * CSS-анимации (@keyframes: вращение бейджа, бегущая строка) лежат в SCSS компонентов.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;
export const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' } as const;

/** Пружины: плашка активного пункта, полосы прогресса */
export const pillSpring = (stiffness = 380) => ({ type: 'spring' as const, stiffness, damping: 32 });
export const PROGRESS_SPRING = { stiffness: 140, damping: 30 };
export const STEPS_SPRING = { stiffness: 120, damping: 30 };

interface Offset {
  x?: number;
  y?: number;
  scale?: number;
}

/** Появление при прокрутке: из смещения from в исходное положение */
export const inView = (delay = 0, from: Offset = { y: 40 }, duration = 0.8) => ({
  initial: { opacity: 0, ...from },
  whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
  viewport: VIEWPORT,
  transition: { duration, delay, ease: EASE },
});

/** Появление сразу после загрузки страницы */
export const appear = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

/** Заголовки: слова выезжают из-под маски по очереди */
export const splitText = (delay: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
});

export const splitWord = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease: EASE } },
};

/** Пунктир-«строчка» у надзаголовка секции вырастает слева */
export const growX = {
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport: VIEWPORT,
  transition: { duration: 0.8, ease: EASE },
  style: { transformOrigin: '0 50%' },
};

/* ---------- Шапка ---------- */

export const headerSlide = (hidden: boolean) => ({
  animate: { y: hidden ? '-110%' : '0%' },
  transition: { duration: 0.45, ease: EASE },
});

export const menuPanel = {
  initial: { clipPath: 'inset(0 0 100% 0)' },
  animate: { clipPath: 'inset(0 0 0% 0)' },
  exit: { clipPath: 'inset(0 0 100% 0)' },
  transition: { duration: 0.6, ease: EASE },
};

export const menuLink = (index: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.15 + index * 0.05, ease: EASE },
});

export const menuActions = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.5 },
};

/* ---------- Первый экран ---------- */

export const heroImage = {
  initial: { opacity: 0, scale: 1.15 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.8, ease: EASE },
};

/** Диапазоны параллакса: [начало, конец] прокрутки секции */
export const heroParallax = {
  mediaY: ['0%', '22%'],
  mediaScale: [1.08, 1.2],
  contentY: ['0%', '18%'],
  contentFadeUntil: 0.75,
};

export const drawLine = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 1.2, delay: 1.1, ease: EASE },
};

export const badgeIn = {
  initial: { opacity: 0, scale: 0.6, rotate: -90 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  transition: { duration: 1.2, delay: 0.8, ease: EASE },
};

/* ---------- Материалы ---------- */

/** Фото открывается «шторкой» справа налево */
export const curtainIn = {
  initial: { clipPath: 'inset(0 0 0 100%)', scale: 1.15 },
  animate: { clipPath: 'inset(0 0 0 0%)', scale: 1 },
  exit: { opacity: 0.4 },
  transition: { duration: 0.9, ease: EASE },
};

export const swapText = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.45, ease: EASE },
};

/* ---------- Портфолио ---------- */

export const workExit = { exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } } };

export const backdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35 },
};

export const modal = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 },
  transition: { duration: 0.5, ease: EASE },
};

/* ---------- Форма заявки ---------- */

export const successOverlay = { ...backdrop, transition: { duration: 0.4 } };

export const successIcon = {
  initial: { scale: 0, rotate: -90 },
  animate: { scale: 1, rotate: 0 },
  transition: { type: 'spring' as const, stiffness: 260, damping: 16, delay: 0.1 },
};

export const successText = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.25, ease: EASE },
};

/* ---------- Подвал ---------- */

export const wordmarkIn = {
  initial: { y: '40%', opacity: 0 },
  whileInView: { y: '0%', opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1.2, ease: EASE },
};
