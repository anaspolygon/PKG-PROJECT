'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect, useState } from 'react';

interface DynamicIntlProviderProps {
  children: ReactNode;
  locale: string;
  namespaces?: string[];
}

export default function DynamicIntlProvider({ 
  children, 
  locale,
  namespaces
}: DynamicIntlProviderProps) {
  const [messages, setMessages] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const url = namespaces 
          ? `/api/messages/${locale}?namespaces=${namespaces.join(',')}`
          : `/api/messages/${locale}`;
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to load messages');
          // Fallback to empty messages to prevent crashes
          setMessages({});
        }
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages({});
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [locale, namespaces]);

  if (isLoading) {
    return (
      // <div className="flex items-center justify-center h-screen w-full">
      //   <div className="text-center">
      //     <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#003970] border-r-transparent" role="status">
      //       <span className="sr-only">Loading...</span>
      //     </div>
      //     <p className="mt-2 text-gray-500">Loading...</p>
      //   </div>
      // </div>

      <></>
    );
  }

  return (
    <NextIntlClientProvider messages={messages || {}} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
