import { Box, Button } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const pages = [
  { name: 'pokemon', path: '/pokemon' },
  { name: 'clock', path: '/clock' },
  { name: 'todos', path: '/todos' },
  { name: 'products', path: '/products' },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <Box
      component='nav'
      sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}
    >
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
  );
};

export default Navigation;
