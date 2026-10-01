import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { CONTACTS as contacts, SOCIALS as socials, SERVICE_OPTIONS as serviceOptions } from '../../constants/site';
import { CheckIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon, SOCIAL_ICONS } from '../ui/icons';
import { EASE, Magnetic, Reveal, SplitText } from '../ui/motion';
import './Contacts.scss';

type FormStatus = 'idle' | 'sending' | 'success';

interface FormErrors {
  name?: string;
  phone?: string;
}

export default function Contacts() {
  const [form, setForm] = useState({ name: '', phone: '', service: serviceOptions[0], message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const update = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const items = [
    { icon: <PhoneIcon />, label: 'Телефон', value: contacts.phone, extra: 'Звонки и мессенджеры', href: contacts.phoneHref },
    { icon: <PinIcon />, label: 'Адрес мастерской', value: contacts.address, extra: contacts.addressExtra },
    { icon: <ClockIcon />, label: 'Режим работы', value: contacts.hours, extra: contacts.hoursExtra },
    { icon: <MailIcon />, label: 'Почта', value: contacts.email, href: `mailto:${contacts.email}` },
  ];

  return (
    <section className="contacts section" id="contacts">
      <div className="contacts__glow" aria-hidden="true" />
      <div className="container">
        <div className="contacts__grid">
          <div className="contacts__info">
            <p className="section-head__overline">
              <span className="section-head__index">06</span>
              <span className="section-head__dash stitch" />
              Контакты
            </p>
            <h2 className="contacts__title">
              <SplitText text="Запишитесь на замер" accent={['замер']} />
            </h2>
            <Reveal delay={0.15}>
              <p className="contacts__lead">
                Приезжайте в мастерскую — покажу материалы вживую и посчитаю точную смету.
                Или отправьте фото салона в MAX или Telegram.
              </p>
            </Reveal>

            <div className="contacts__items">
              {items.map((item, i) => {
                const content = (
                  <>
                    <span className="contact-item__icon">{item.icon}</span>
                    <span className="contact-item__label mono">{item.label}</span>
                    <span className="contact-item__value">{item.value}</span>
                    {item.extra && <span className="contact-item__extra">{item.extra}</span>}
                  </>
                );
                return (
                  <Reveal key={item.label} delay={0.1 + i * 0.08} y={24}>
                    {item.href ? (
                      <a href={item.href} className="contact-item is-link">
                        {content}
                      </a>
                    ) : (
                      <div className="contact-item">{content}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="contacts__socials" delay={0.3}>
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.id];
                return (
                  <Magnetic key={social.id} strength={0.2}>
                    <a
                      href={social.href}
                      className={`contacts__social contacts__social--${social.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon />
                      {social.label}
                    </a>
                  </Magnetic>
                );
              })}
            </Reveal>
          </div>

          <Reveal delay={0.15} y={48}>
            <form className="contacts__form" onSubmit={handleSubmit} noValidate>
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
                    autoComplete="name"
                    placeholder="Как к вам обращаться"
                    value={form.name}
                    onChange={update('name')}
                    aria-invalid={!!errors.name}
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
                    autoComplete="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={update('phone')}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span className="form-field__hint">{errors.phone}</span>}
                </div>
              </div>

              <fieldset className="form-field">
                <legend className="form-field__label">Что перетянуть?</legend>
                <div className="form-chips">
                  {serviceOptions.map((option) => (
                    <label key={option} className={`form-chip ${form.service === option ? 'is-active' : ''}`}>
                      <input
                        type="radio"
                        name="service"
                        value={option}
                        checked={form.service === option}
                        onChange={update('service')}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

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

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    className="contacts__success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    role="status"
                  >
                    <motion.span
                      className="contacts__success-icon"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                    >
                      <CheckIcon />
                    </motion.span>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
                    >
                      <h4 className="contacts__success-title">Заявка отправлена!</h4>
                      <p className="contacts__success-text">
                        Спасибо, {form.name}. Свяжусь с вами по номеру {form.phone} в ближайшее время.
                      </p>
                      <button type="button" className="btn btn--ghost" onClick={resetForm}>
                        Отправить ещё одну
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
