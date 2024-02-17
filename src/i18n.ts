import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'pt'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
  return {
    messages: (
      await (locale === 'pt'
        ? // When using Turbopack, this will enable HMR for `en`
          import('../messages/pt.json')
        : import(`../messages/${locale}.json`))
    ).default
  };
});
