import { useState } from 'react';

import { CONTACTS as contacts, SOCIALS as socials, SERVICE_OPTIONS as serviceOptions } from '../../constants/site';
import { useInView } from '../../hooks';
import './Contacts.scss';

type FormStatus = 'idle' | 'sending' | 'success';

interface FormErrors {
  name?: string;
  phone?: string;
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 12.5 5.5 5.5L20 7" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 1 1-4.2 14.8l-.5-.3-3 .8.8-2.9-.3-.5A8 8 0 0 1 12 4Zm-3 4.2c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 1.9 3 4.7 4.1 2.3.9 2.8.7 3.3.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a6.6 6.6 0 0 1-3.2-2.8c-.2-.4 0-.5.1-.7l.6-.7c.1-.2.1-.4 0-.6L9.6 8.6c-.2-.4-.4-.4-.6-.4Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.9 4.6 19 18.4c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6L18.6 6c.4-.3-.1-.5-.6-.2L7.7 12.4l-4.4-1.4c-1-.3-1-1 .2-1.4l17-6.5c.8-.3 1.5.2 1.4 1.5Z" />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.8 17.5c-5.6 0-8.8-3.9-9-10.2h2.9c.1 4.7 2.2 6.7 3.8 7.1V7.3h2.7v4.1c1.6-.2 3.3-2 3.9-4.1h2.7a7.9 7.9 0 0 1-3.6 5.1 8.2 8.2 0 0 1 4.2 5.1h-3a4.9 4.9 0 0 0-4.2-3.5v3.5h-.4Z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, () => React.ReactElement> = {
  whatsapp: WhatsappIcon,
  telegram: TelegramIcon,
  vk: VkIcon,
};

export default function Contacts() {
  const { ref: infoRef, inView: infoInView } = useInView<HTMLDivElement>();
  const { ref: formRef, inView: formInView } = useInView<HTMLFormElement>();
  const [form, setForm] = useState({ name: '', phone: '', service: serviceOptions[0], message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const update = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Укажите имя';
    if (form.phone.replace(/\D/g, '').length < 10) nextErrors.phone = 'Укажите корректный номер';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStatus('sending');
    window.setTimeout(() => setStatus('success'), 900);
  };

  const resetForm = () => {
    setForm({ name: '', phone: '', service: serviceOptions[0], message: '' });
    setStatus('idle');
  };

  return (
    <section className="contacts section" id="contacts">
      <span className="contacts__watermark" aria-hidden="true">
        Rulyozhka
      </span>
      <div className="container">
        <div className="contacts__grid">
          <div className={`contacts__info reveal ${infoInView ? 'is-visible' : ''}`} ref={infoRef}>
            <p className="section-head__overline">Контакты</p>
            <h2 className="section-head__title">Запишитесь на замер</h2>
            <p className="contacts__lead">
              Приезжайте в мастерскую — покажу материалы вживую и посчитаю точную смету.
              Или отправьте фото салона в мессенджер: отвечу за 15 минут.
            </p>

            <div className="contacts__items">
              <a href={contacts.phoneHref} className="contact-item">
                <span className="contact-item__icon">
                  <PhoneIcon />
                </span>
                <span>
                  <span className="contact-item__label">Телефон</span>
                  <span className="contact-item__value">{contacts.phone}</span>
                  <span className="contact-item__extra">Звонки и мессенджеры</span>
                </span>
              </a>
              <div className="contact-item">
                <span className="contact-item__icon">
                  <PinIcon />
                </span>
                <span>
                  <span className="contact-item__label">Адрес мастерской</span>
                  <span className="contact-item__value">{contacts.address}</span>
                  <span className="contact-item__extra">{contacts.addressExtra}</span>
                </span>
              </div>
              <div className="contact-item">
                <span className="contact-item__icon">
                  <ClockIcon />
                </span>
                <span>
                  <span className="contact-item__label">Режим работы</span>
                  <span className="contact-item__value">{contacts.hours}</span>
                  <span className="contact-item__extra">{contacts.hoursExtra}</span>
                </span>
              </div>
              <a href={`mailto:${contacts.email}`} className="contact-item">
                <span className="contact-item__icon">
                  <MailIcon />
                </span>
                <span>
                  <span className="contact-item__label">Почта</span>
                  <span className="contact-item__value">{contacts.email}</span>
                </span>
              </a>
            </div>

            <div className="contacts__socials">
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    className="contacts__social"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <form
            className={`contacts__form reveal ${formInView ? 'is-visible' : ''}`}
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
          >
            <h3 className="contacts__form-title">Оставить заявку</h3>
            <p className="contacts__form-subtitle">Перезвоним в течение 15 минут в рабочее время</p>

            <div className="contacts__form-row">
              <div className="form-field">
                <label className="form-field__label" htmlFor="contact-name">
                  Имя *
                </label>
                <input
                  id="contact-name"
                  className={`form-field__input ${errors.name ? 'has-error' : ''}`}
                  type="text"
                  placeholder="Как к вам обращаться"
                  value={form.name}
                  onChange={update('name')}
                />
                {errors.name && <span className="form-field__hint">{errors.name}</span>}
              </div>
              <div className="form-field">
                <label className="form-field__label" htmlFor="contact-phone">
                  Телефон *
                </label>
                <input
                  id="contact-phone"
                  className={`form-field__input ${errors.phone ? 'has-error' : ''}`}
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={update('phone')}
                />
                {errors.phone && <span className="form-field__hint">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="contact-service">
                Что перетянуть?
              </label>
              <div className="form-field__select-wrap">
                <select
                  id="contact-service"
                  className="form-field__select"
                  value={form.service}
                  onChange={update('service')}
                >
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="contact-message">
                Комментарий
              </label>
              <textarea
                id="contact-message"
                className="form-field__textarea"
                placeholder="Марка, год, пожелания по материалу…"
                value={form.message}
                onChange={update('message')}
              />
            </div>

            <button className="btn btn--solid contacts__submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
            </button>
            <p className="contacts__note">
              Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
            </p>

            {status === 'success' && (
              <div className="contacts__success">
                <span className="contacts__success-icon">
                  <CheckIcon />
                </span>
                <h4 className="contacts__success-title">Заявка отправлена!</h4>
                <p className="contacts__success-text">
                  Спасибо, {form.name}. Свяжусь с вами по номеру {form.phone} в ближайшее время.
                </p>
                <button type="button" className="btn btn--outline" onClick={resetForm}>
                  Отправить ещё одну
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
