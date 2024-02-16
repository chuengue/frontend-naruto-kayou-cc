import { withMiddleware2 } from './middlewares/Intl';
import { withMiddleware1 } from './middlewares/auth';
import { chain } from './middlewares/stackHandler';

export default chain([withMiddleware1, withMiddleware2]);

export const config = {
  matcher: ['/', '/(pt|en)/:path*', '/((?!_next/image|_vercel|.*\\..*).*)']
};
// '/((?!api|_next/static|_next/image|favicon.ico).*)',
