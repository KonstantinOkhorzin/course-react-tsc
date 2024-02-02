import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';

interface Props {
  component: FC;
  redirectTo?: string;
}

const RestrictedRoute: FC<Props> = ({ component: Component, redirectTo = '/' }) => {
  const { state } = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={state ? state.from : redirectTo} /> : <Component />;
};

export default RestrictedRoute;
