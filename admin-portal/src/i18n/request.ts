import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '../services/locale';

export const locales = ['en', 'bn'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
