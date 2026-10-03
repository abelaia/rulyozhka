import { CONTENT } from '../../data';
import './Logo.scss';

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg className={`logo-mark ${className}`} viewBox="0 0 54 34" aria-hidden="true">
      <path className="logo-mark__red" d="M10 0h12L12 34H0z" />
      <path className="logo-mark__red" d="M26 0h12L28 34H16z" opacity="0.7" />
      <path d="M42 0h12L44 34H32z" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#hero" className="logo" onClick={onClick} aria-label={CONTENT.brand.logoLabel}>
      <LogoMark className="logo__mark" />
      <span className="logo__body" aria-hidden="true">
        {/* «РУЛЁЖКА»: точки над Ё нарисованы красными квадратами */}
        <span className="logo__text">
          РУЛ
          <span className="logo__yo">
            Е<i />
            <i />
          </span>
          ЖКА
        </span>
        <span className="logo__sub">{CONTENT.brand.logoSub}</span>
      </span>
    </a>
  );
}
