/** Подставляет значения в шаблон: fill('Показано {shown}', { shown: 3 }) */
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));

/** 1 → "01" */
export const pad2 = (value: number) => String(value).padStart(2, '0');

export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');
