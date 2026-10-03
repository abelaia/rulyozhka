import type {
  ContactDetails,
  ContactItem,
  Material,
  NavItem,
  ProcessStep,
  Review,
  Service,
  Social,
  Work,
  WorkCategory,
} from '../models';
import contacts from './contacts.json';
import content from './content.json';
import materials from './materials.json';
import navigation from './navigation.json';
import process from './process.json';
import reviews from './reviews.json';
import services from './services.json';
import works from './works.json';

export const CONTENT = content;
export const NAV_ITEMS: NavItem[] = navigation;
export const SERVICES: Service[] = services;
export const MATERIALS: Material[] = materials;
export const WORK_CATEGORIES = works.categories as WorkCategory[];
export const WORKS = works.items as Work[];
export const PROCESS_STEPS: ProcessStep[] = process;
export const REVIEWS: Review[] = reviews;
export const CONTACTS: ContactDetails = contacts.details;
export const SOCIALS: Social[] = contacts.socials;
export const SERVICE_OPTIONS: string[] = contacts.serviceOptions;

// Значения и ссылки для карточек контактов — подписи берутся из content.json
const CONTACT_VALUES: Record<string, Omit<ContactItem, 'id' | 'label'>> = {
  phone: { value: CONTACTS.phone, href: CONTACTS.phoneHref },
  address: { value: CONTACTS.address, extra: CONTACTS.addressExtra },
  hours: { value: CONTACTS.hours, extra: CONTACTS.hoursExtra },
  email: { value: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
};

export const CONTACT_ITEMS: ContactItem[] = content.contacts.items.map((item) => ({
  ...CONTACT_VALUES[item.id],
  ...item,
}));
