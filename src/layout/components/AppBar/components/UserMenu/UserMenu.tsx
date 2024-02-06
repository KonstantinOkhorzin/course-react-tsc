import { Box } from '@mui/material';

import { useAppDispatch } from '../../../../../redux/hooks';
import { useLogOutMutation } from '../../../../../redux/auth/api';
import { clearUserCredentials } from '../../../../../redux/auth/slice';
import Button from '../../../../../components/Button';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const [logOut, { isLoading }] = useLogOutMutation();

  const onLogoutClick = () => {
    logOut()
      .unwrap()
      .then(() => {
        dispatch(clearUserCredentials());
        window.localStorage.removeItem('token');
      });
  };

  return (
    <Box>
      <Button type='button' onClick={onLogoutClick} disabled={isLoading}>
        log out
      </Button>
    </Box>
  );
};

export default UserMenu;
