import { useEffect } from 'react';

/** Блокирует прокрутку страницы, пока locked = true (меню, модалка) */
export function useLockBodyScroll(locked = true) {
  useEffect(() => {
    if (!locked) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [locked]);
}
