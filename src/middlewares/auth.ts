import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest
} from 'next/server';

import { APP_ROUTES } from '@/constants/appRoutes';
import { CustomMiddleware } from './stackHandler';
const appPrivateRoutes = Object.values(APP_ROUTES.privates).map(
  route => route.name
);
export function withMiddleware1(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('authToken')?.value;
    const response = NextResponse.next();

    if (token) {
      const pathWithoutLocale = pathname.slice(3);
      if (pathWithoutLocale.match('/login')) {
        return NextResponse.redirect(new URL('/home', request.url));
      }
    } else if (appPrivateRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return middleware(request, event, response);
  };
}
