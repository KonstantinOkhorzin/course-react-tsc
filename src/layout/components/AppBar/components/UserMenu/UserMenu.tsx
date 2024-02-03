import { Box } from '@mui/material';

import { useAppDispatch } from '../../../../../redux/hooks';
import { logOutThunk } from '../../../../../redux/auth/slice';
import Button from '../../../../../components/Button';

const UserMenu = () => {
  const dispatch = useAppDispatch();

  const onLogoutClick = () => {
    dispatch(logOutThunk())
      .unwrap()
      .then(() => window.localStorage.removeItem('token'));
  };

  return (
    <Box>
      <Button type='button' onClick={onLogoutClick}>
        log out
      </Button>
    </Box>
  );
};

export default UserMenu;
