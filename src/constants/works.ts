import { IMAGES } from './images';

export const WORK_CATEGORIES = ['Все', 'Авто', 'Мото', 'Лодки'] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export interface Work {
  id: number;
  title: string;
  category: Exclude<WorkCategory, 'Все'>;
  material: string;
  time: string;
  image: string;
}

export const WORKS: Work[] = [
  {
    id: 1,
    title: 'BMW 5 G30',
    category: 'Авто',
    material: 'Nappa + алькантара',
    time: '5 дней',
    image: IMAGES.works.sedan,
  },
  {
    id: 2,
    title: 'Ducati Streetfighter',
    category: 'Мото',
    material: 'Перфорированная кожа',
    time: '2 дня',
    image: IMAGES.works.moto,
  },
  {
    id: 3,
    title: 'Катер Silver 550',
    category: 'Лодки',
    material: 'Морской винил',
    time: '7 дней',
    image: IMAGES.works.boat,
  },
  {
    id: 4,
    title: 'Mercedes G-Class',
    category: 'Авто',
    material: 'Кожа Designo, ромб',
    time: '6 дней',
    image: IMAGES.works.gclass,
  },
  {
    id: 5,
    title: 'Alcantara Package',
    category: 'Авто',
    material: 'Потолок + стойки',
    time: '1 день',
    image: IMAGES.works.alcantara,
  },
  {
    id: 6,
    title: 'Yamaha WaveRunner',
    category: 'Лодки',
    material: 'Антискользящий винил',
    time: '3 дня',
    image: IMAGES.works.waverunner,
  },
];
