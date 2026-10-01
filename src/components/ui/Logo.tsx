import { useState } from 'react';

import './Logo.scss';

export default function Logo({ onClick }: { onClick?: () => void }) {
  const [logoError, setLogoError] = useState(false);

  return (
    <a href="#hero" className="logo" onClick={onClick} aria-label="RULYOZHKA — на главную">
      {logoError ? (
        <span className="logo__mark">R</span>
      ) : (
        <img src="/logo.png" alt="" className="logo__img" onError={() => setLogoError(true)} />
      )}
      <span className="logo__text">
        RULYOZHKA<span className="logo__dot">.</span>
      </span>
    </a>
  );
}
