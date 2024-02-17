import { NextFetchEvent, NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { localePrefix, locales, pathnames } from '@/config';
import { CustomMiddleware } from './stackHandler';

export function withMiddleware2(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = createMiddleware({
      locales,
      pathnames,
      localePrefix,
      defaultLocale: 'pt'
    });
    return response(request);
  };
}
