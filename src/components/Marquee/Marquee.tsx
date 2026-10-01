import './Marquee.scss';

const MARQUEE_ITEMS = [
  'Натуральная кожа',
  'Алькантара',
  'Экокожа',
  'Перетяжка руля',
  'Сиденья',
  'Потолки',
  'Лодки и катера',
  'Мотоциклы',
];

function Tape({ variant, reverse = false }: { variant: 'accent' | 'dark'; reverse?: boolean }) {
  // Дублируем список, чтобы лента прокручивалась бесшовно
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className={`marquee__tape marquee__tape--${variant}`}>
      <div className={`marquee__track ${reverse ? 'marquee__track--reverse' : ''}`}>
        {items.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <span className="marquee__sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <Tape variant="dark" reverse />
      <Tape variant="accent" />
    </div>
  );
}
