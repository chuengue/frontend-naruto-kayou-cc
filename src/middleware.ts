import { NextRequest, NextResponse } from 'next/server';
import { APP_ROUTES } from './constants/appRoutes';

const appPrivateRoutes = Object.values(APP_ROUTES.privates).map(
  route => route.name
);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  if (token) {
    if (pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else if (appPrivateRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
}
