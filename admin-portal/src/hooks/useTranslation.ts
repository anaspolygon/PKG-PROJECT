'use client';

import { useTranslations  } from 'next-intl';

export function useTranslation(namespace: string) {
  const t = useTranslations(namespace);

  return {
    t,
    tn: (key: string) => t(key), 
  };
}
