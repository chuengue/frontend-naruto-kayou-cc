import { APP_ROUTES } from '@/constants/appRoutes';
import { AuthContext } from '@/contexts/authContext/authContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { privateRouterProps } from './privateRoute.types';

const PrivateRoute = ({ children }: privateRouterProps) => {
  const { push } = useRouter();

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const loginRoute = APP_ROUTES.publics.login.name;
    if (!isAuthenticated) {
      push(loginRoute);
    }
  }, [isAuthenticated, push]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};
export default PrivateRoute;
