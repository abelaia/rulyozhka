import type { ReactElement } from 'react';

const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const ArrowRightIcon = () => (
  <svg {...stroke}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeftIcon = () => (
  <svg {...stroke}>
    <path d="M19 12H5m6-6-6 6 6 6" />
  </svg>
);

export const ArrowUpRightIcon = () => (
  <svg {...stroke}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const ArrowUpIcon = () => (
  <svg {...stroke}>
    <path d="M12 19V5m-6 6 6-6 6 6" />
  </svg>
);

export const ArrowDownIcon = () => (
  <svg {...stroke}>
    <path d="M12 5v14m6-6-6 6-6-6" />
  </svg>
);

export const CloseIcon = () => (
  <svg {...stroke}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const CheckIcon = () => (
  <svg {...stroke} strokeWidth={2.4}>
    <path d="m4 12.5 5.5 5.5L20 7" />
  </svg>
);

export const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5z" />
  </svg>
);

export const PhoneIcon = () => (
  <svg {...stroke} strokeWidth={1.8}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const PinIcon = () => (
  <svg {...stroke} strokeWidth={1.8}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ClockIcon = () => (
  <svg {...stroke} strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const MailIcon = () => (
  <svg {...stroke} strokeWidth={1.8}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

export const MaxIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 20V5h3.2L12 13l4.8-8H20v15h-3v-9.3L13.4 18h-2.8L7 10.7V20H4Z" />
  </svg>
);

export const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.9 4.6 19 18.4c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6L18.6 6c.4-.3-.1-.5-.6-.2L7.7 12.4l-4.4-1.4c-1-.3-1-1 .2-1.4l17-6.5c.8-.3 1.5.2 1.4 1.5Z" />
  </svg>
);

export const VkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.8 17.5c-5.6 0-8.8-3.9-9-10.2h2.9c.1 4.7 2.2 6.7 3.8 7.1V7.3h2.7v4.1c1.6-.2 3.3-2 3.9-4.1h2.7a7.9 7.9 0 0 1-3.6 5.1 8.2 8.2 0 0 1 4.2 5.1h-3a4.9 4.9 0 0 0-4.2-3.5v3.5h-.4Z" />
  </svg>
);

export const SOCIAL_ICONS: Record<string, () => ReactElement> = {
  max: MaxIcon,
  telegram: TelegramIcon,
  vk: VkIcon,
};
