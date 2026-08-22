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
  'Гарантия 3 года',
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
