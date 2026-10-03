import type { ReactNode } from 'react';

import { cx } from '../../utils/format';

interface ButtonProps {
  children: ReactNode;
  variant?: 'solid' | 'ghost';
  size?: 'sm';
  /** Есть href — рендерится ссылка, нет — кнопка */
  href?: string;
  icon?: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({ children, variant = 'solid', size, href, icon, className, type = 'button', disabled, onClick }: ButtonProps) {
  const classes = cx('btn', `btn--${variant}`, size && `btn--${size}`, className);
  const content = (
    <>
      {children}
      {icon && <span className="btn__icon">{icon}</span>}
    </>
  );
  return href ? (
    <a href={href} className={classes} onClick={onClick}>{content}</a>
  ) : (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>{content}</button>
  );
}
