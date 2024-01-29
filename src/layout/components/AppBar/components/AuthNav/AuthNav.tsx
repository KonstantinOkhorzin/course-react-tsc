import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AuthNav = () => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button component={Link} to='register'>
        register
      </Button>
      <Button component={Link} to='login'>
        log in
      </Button>
    </Box>
  );
};

export default AuthNav;
