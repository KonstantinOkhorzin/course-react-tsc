import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsLoggedIn, selectIsRefreshing } from '../../redux/auth/slice';

interface Props {
  component: FC;
  redirectTo?: string;
}

export const PrivateRoute: FC<Props> = ({ component: Component, redirectTo = '/' }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} state={{ from: location }} /> : <Component />;
};

export default PrivateRoute;
