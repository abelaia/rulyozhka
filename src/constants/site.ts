import { IMAGES } from './images';

export interface Material {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image?: string;
  texture?: 'perforated' | 'weave';
  features: string[];
}

export const MATERIALS: Material[] = [
  {
    id: 'leather',
    title: 'Натуральная кожа',
    subtitle: 'Италия · Германия',
    badge: 'Премиум',
    image: IMAGES.materials.leather,
    features: [
      'Срок службы 10+ лет',
      'Дышит и стареет благородно',
      'Фактура Nappa, Madras, Dakota',
    ],
  },
  {
    id: 'alcantara',
    title: 'Алькантара',
    subtitle: 'Оригинал, Италия',
    badge: 'Спорт',
    image: IMAGES.materials.alcantara,
    features: [
      'Не скользит и не бликует',
      'Мягкая, как замша',
      'Выбор M-Power и AMG',
    ],
  },
  {
    id: 'ecoleather',
    title: 'Экокожа Premium',
    subtitle: 'Корея · Польша',
    badge: 'Практика',
    texture: 'perforated',
    features: [
      'Неотличима от натуральной',
      'Не боится влаги и мороза',
      'Лучшая цена за вид',
    ],
  },
  {
    id: 'marine',
    title: 'Морской винил',
    subtitle: 'Для лодок и катеров',
    badge: 'Влагостойкий',
    texture: 'weave',
    features: [
      'Устойчив к воде и соли',
      'Не выцветает на солнце',
      'Легко моется',
    ],
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  text: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Заявка и расчёт',
    text: 'Присылаете фото салона в WhatsApp или Telegram — за 15 минут считаем смету и подбираем материал.',
  },
  {
    index: '02',
    title: 'Замер и договор',
    text: 'Приезжаете в ателье, вживую смотрите образцы. Фиксируем цену и срок в договоре.',
  },
  {
    index: '03',
    title: 'Перетяжка',
    text: 'Разбираем элементы, шьём по заводским лекалам, используем армированные нити и немецкий клей.',
  },
  {
    index: '04',
    title: 'Выдача и гарантия',
    text: 'Принимаете работу, получаете гарантию 3 года на швы и материал.',
  },
];

export interface Review {
  id: number;
  name: string;
  car: string;
  project: string;
  text: string;
  rating: number;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Дмитрий',
    car: 'BMW 530d',
    project: 'Полная перетяжка салона',
    text: 'Перетянули весь салон в Nappa с красной строчкой за 4 дня. Швы ровнее заводских, кожа пахнет так, что из машины выходить не хочется.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Анна',
    car: 'Mercedes GLC',
    project: 'Сиденья + руль',
    text: 'Долго выбирала между кожей и экокожей — привезли образцы прямо в офис, всё объяснили. Результат превзошёл ожидания, муж теперь хочет так же.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Сергей',
    car: 'Ducati Multistrada',
    project: 'Сиденье мотоцикла',
    text: 'Сиденье стало как с завода, только лучше: добавили гель, сделали антискользящую вставку. После 300 км спина говорит спасибо.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Игорь',
    car: 'Катер Silver 550',
    project: 'Салон катера',
    text: 'Морской винил лёг идеально, все швы проклеены. За сезон на воде — ни одного пузыря. Рекомендую всем яхтсменам Ростова.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Елена',
    car: 'Range Rover Velar',
    project: 'Потолок в алькантару',
    text: 'Потолок провис после химчистки у дилера. Здесь перетянули за день, чёрная алькантара — небо и земля. Салон стал выглядеть дороже машины.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Максим',
    car: 'ГАЗель Next',
    project: 'Кабина + сиденья',
    text: 'Заказывали перетяжку трёх кабин для автопарка. Сделали быстро, материал неубиваемый, водители довольны. Цены адекватные для опта.',
    rating: 4,
  },
];

export interface Social {
  id: string;
  label: string;
  href: string;
}

export const SOCIALS: Social[] = [
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/79185553131' },
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/rulyozhka' },
  { id: 'vk', label: 'ВКонтакте', href: 'https://vk.com/rulyozhka' },
];

export const CONTACTS = {
  phone: '+7 (918) 555-31-31',
  phoneHref: 'tel:+79185553131',
  address: 'г. Ростов-на-Дону, ул. Малиновского, 25',
  addressExtra: 'Заезд со стороны парковки, бокс №7',
  email: 'hello@rulyozhka.ru',
  hours: 'Пн–Сб: 9:00–19:00',
  hoursExtra: 'Воскресенье — по записи',
};

export const SERVICE_OPTIONS = [
  'Салон автомобиля',
  'Мотоцикл / квадроцикл',
  'Лодка или катер',
  'Руль / ручка КПП',
  'Потолок и стойки',
  'Коммерческий транспорт',
  'Другое',
];
