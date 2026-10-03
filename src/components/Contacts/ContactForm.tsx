import type { ChangeEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { successIcon, successOverlay, successText } from '../../animations';
import { CONTENT, SERVICE_OPTIONS } from '../../data';
import { useContactForm } from '../../hooks';
import { cx, fill } from '../../utils/format';
import Button from '../ui/Button';
import { CheckIcon } from '../ui/icons';

const TEXT = CONTENT.contacts.form;

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  type?: 'text' | 'tel';
  autoComplete?: string;
  multiline?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function Field({ id, label, error, multiline, type = 'text', ...input }: FieldProps) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea id={id} className="form-field__textarea" {...input} />
      ) : (
        <input id={id} type={type} className={cx('form-field__input', error && 'has-error')} aria-invalid={!!error} {...input} />
      )}
      {error && <span className="form-field__hint">{error}</span>}
    </div>
  );
}

export default function ContactForm() {
  const { form, errors, status, update, submit, reset } = useContactForm(SERVICE_OPTIONS[0], {
    name: TEXT.name.error,
    phone: TEXT.phone.error,
  });
  return (
    <form className="contacts__form" onSubmit={submit} noValidate>
      <h3 className="contacts__form-title">{TEXT.title}</h3>
      <p className="contacts__form-subtitle">{TEXT.subtitle}</p>
      <div className="contacts__form-row">
        <Field id="contact-name" autoComplete="name" label={TEXT.name.label} placeholder={TEXT.name.placeholder} value={form.name} error={errors.name} onChange={update('name')} />
        <Field id="contact-phone" type="tel" autoComplete="tel" label={TEXT.phone.label} placeholder={TEXT.phone.placeholder} value={form.phone} error={errors.phone} onChange={update('phone')} />
      </div>
      <fieldset className="form-field">
        <legend className="form-field__label">{TEXT.service}</legend>
        <div className="form-chips">
          {SERVICE_OPTIONS.map((option) => (
            <label key={option} className={cx('form-chip', form.service === option && 'is-active')}>
              <input type="radio" name="service" value={option} checked={form.service === option} onChange={update('service')} />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <Field id="contact-message" multiline {...TEXT.message} value={form.message} onChange={update('message')} />
      <Button type="submit" className="contacts__submit" disabled={status === 'sending'}>
        {status === 'sending' ? TEXT.sending : TEXT.submit}
      </Button>
      <p className="contacts__note">{TEXT.note}</p>
      <AnimatePresence>
        {status === 'success' && (
          <motion.div className="contacts__success" role="status" {...successOverlay}>
            <motion.span className="contacts__success-icon" {...successIcon}><CheckIcon /></motion.span>
            <motion.div {...successText}>
              <h4 className="contacts__success-title">{TEXT.success.title}</h4>
              <p className="contacts__success-text">{fill(TEXT.success.text, form)}</p>
              <Button variant="ghost" onClick={reset}>{TEXT.success.again}</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
