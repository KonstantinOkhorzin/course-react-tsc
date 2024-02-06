import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/slice';

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return {
    isLoggedIn,
  };
};

export default useAuth;
