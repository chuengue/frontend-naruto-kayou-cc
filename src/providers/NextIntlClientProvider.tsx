'use client';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
interface CustomNextIntlClientProviderProps {
  children: React.ReactNode;
  locale: string | undefined;
  messages: AbstractIntlMessages | undefined;
}
export default function CustomNextIntlClientProvider({
  children,
  locale,
  messages
}: CustomNextIntlClientProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
