import { CONTENT } from '../../data';
import { cx } from '../../utils/format';
import './Marquee.scss';

// Список дублируется, чтобы лента прокручивалась бесшовно
const ITEMS = [...CONTENT.marquee, ...CONTENT.marquee];

const TAPES = [
  { variant: 'dark', reverse: true },
  { variant: 'accent', reverse: false },
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      {TAPES.map(({ variant, reverse }) => (
        <div key={variant} className={`marquee__tape marquee__tape--${variant}`}>
          <div className={cx('marquee__track', reverse && 'marquee__track--reverse')}>
            {ITEMS.map((item, i) => (
              <span className="marquee__item" key={`${item}-${i}`}>
                {item}
                <span className="marquee__sep">✦</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
