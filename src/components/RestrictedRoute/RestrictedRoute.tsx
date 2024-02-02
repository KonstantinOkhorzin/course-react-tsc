import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsLoggedIn } from '../../redux/auth/slice';

interface Props {
  component: FC;
  redirectTo?: string;
}

const RestrictedRoute: FC<Props> = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { state } = useLocation();

  return isLoggedIn ? <Navigate to={state ? state.from : redirectTo} /> : <Component />;
};

export default RestrictedRoute;
