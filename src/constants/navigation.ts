export interface NavItem {
  name: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Главная', path: '#hero' },
  { name: 'Услуги', path: '#services' },
  { name: 'Материалы', path: '#materials' },
  { name: 'Работы', path: '#works' },
  { name: 'Отзывы', path: '#reviews' },
  { name: 'Контакты', path: '#contacts' },
];
