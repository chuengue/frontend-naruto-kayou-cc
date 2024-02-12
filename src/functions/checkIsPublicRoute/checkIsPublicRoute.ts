import { APP_ROUTES } from '../../constants/appRoutes';

export const checkIsPublicRoute = (
  asPath: keyof (typeof APP_ROUTES)['publics']
) => {
  const appPublicRoutes = Object.keys(APP_ROUTES.publics);
  return appPublicRoutes.includes(asPath);
};
