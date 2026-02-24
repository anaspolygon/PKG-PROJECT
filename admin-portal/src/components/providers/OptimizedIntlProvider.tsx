'use client';

import { usePathname } from 'next/navigation';
import DynamicIntlProvider from './DynamicIntlProvider';
import { getRouteNamespaces } from '@/utils/getRouteNamespaces';
import { ReactNode } from 'react';

interface OptimizedIntlProviderProps {
  children: ReactNode;
  locale: string;
}

export default function OptimizedIntlProvider({ 
  children, 
  locale 
}: OptimizedIntlProviderProps) {
  const pathname = usePathname();
  const namespaces = getRouteNamespaces(pathname);

  return (
    <DynamicIntlProvider locale={locale} namespaces={namespaces}>
      {children}
    </DynamicIntlProvider>
  );
}
