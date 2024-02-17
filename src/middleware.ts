import { withMiddleware2 } from './middlewares/Intl';
import { withMiddleware1 } from './middlewares/auth';
import { chain } from './middlewares/stackHandler';

export default chain([withMiddleware1, withMiddleware2]);

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
// '/((?!api|_next/static|_next/image|favicon.ico).*)',
