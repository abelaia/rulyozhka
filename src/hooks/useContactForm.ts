import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

export type FormStatus = 'idle' | 'sending' | 'success';
export type FormErrors = Partial<Record<'name' | 'phone', string>>;

interface Messages {
  name: string;
  phone: string;
}

/** Состояние, валидация и отправка формы заявки */
export function useContactForm(defaultService: string, messages: Messages) {
  const initial = { name: '', phone: '', service: defaultService, message: '' };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const update = (field: keyof typeof initial) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = messages.name;
    if (form.phone.replace(/\D/g, '').length < 10) nextErrors.phone = messages.phone;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStatus('sending');
    window.setTimeout(() => setStatus('success'), 900);
  };

  const reset = () => {
    setForm(initial);
    setStatus('idle');
  };

  return { form, errors, status, update, submit, reset };
}
