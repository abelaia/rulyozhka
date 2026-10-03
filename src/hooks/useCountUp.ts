import { useEffect, useState } from 'react';

/** Плавно считает от 0 до target, когда start становится true */
export function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      // Первый кадр rAF может прийти с меткой раньше t0 — без нижней границы счётчик уходил в минус
      const p = Math.min(Math.max((now - t0) / duration, 0), 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);
  return value;
}
