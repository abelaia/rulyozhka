export interface NavItem {
  name: string;
  path: string;
}

export interface Service {
  id: string;
  index: string;
  title: string;
  description: string;
  price: string;
  tags: string;
}

export interface Material {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  features: string[];
}

export type WorkCategory = 'Все' | 'Авто' | 'Мото' | 'Лодки';

export interface Work {
  id: number;
  title: string;
  category: Exclude<WorkCategory, 'Все'>;
  material: string;
  time: string;
  image: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  text: string;
}

export interface Review {
  id: number;
  name: string;
  date: string;
  project: string;
  text: string;
  reply?: string;
  rating: number;
}

export interface Social {
  id: string;
  label: string;
  href: string;
}

export interface ContactDetails {
  phone: string;
  phoneHref: string;
  address: string;
  addressExtra: string;
  email: string;
  hours: string;
  hoursExtra: string;
}

export interface ContactItem {
  id: string;
  label: string;
  value: string;
  extra?: string;
  href?: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

/** Заголовок секции: номер, надзаголовок, заголовок и подсвеченные слова */
export interface SectionHeadContent {
  index: string;
  overline: string;
  title: string;
  accent?: string[];
  note?: string;
}
