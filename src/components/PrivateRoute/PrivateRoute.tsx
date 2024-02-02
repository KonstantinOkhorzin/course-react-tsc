import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';

interface Props {
  component: FC;
  redirectTo?: string;
}

export const PrivateRoute: FC<Props> = ({ component: Component, redirectTo = '/' }) => {
  const location = useLocation();
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} state={{ from: location }} /> : <Component />;
};

export default PrivateRoute;
