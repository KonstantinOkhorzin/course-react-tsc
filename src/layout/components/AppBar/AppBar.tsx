import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import AuthNav from './components/AuthNav';
import Navigation from './components/Navigation';
import UserMenu from './components/UserMenu';
import { useAuth } from '../../../hooks';

const ResponsiveAppBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Button
            component={Link}
            to='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: 21,
            }}
          >
            LOGO
          </Button>

          <Navigation />

          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
