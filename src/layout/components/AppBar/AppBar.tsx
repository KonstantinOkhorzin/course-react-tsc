import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, NavLink, useLocation } from 'react-router-dom';

const pages = [
  { name: 'pokemon', path: '/pokemon' },
  { name: 'clock', path: '/clock' },
  { name: 'todos', path: '/todos' },
  { name: 'products', path: '/products' },
];

const ResponsiveAppBar = () => {
  const location = useLocation();

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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map(({ name, path }) => (
              <Button
                component={NavLink}
                to={path}
                key={name}
                sx={{
                  my: 2,
                  color: 'white',
                  fontWeight: location.pathname === path ? 700 : 'inherit',
                  textDecoration: location.pathname === path ? 'underline' : 'none',
                }}
              >
                {name}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button component={Link} to='register'>
              register
            </Button>
            <Button component={Link} to='login'>
              Log in
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
