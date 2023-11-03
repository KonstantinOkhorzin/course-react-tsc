import { createTheme } from '@mui/material/styles';
import { theme } from './theme';

export const muiTheme = createTheme({
  palette: {
    secondary: {
      main: theme.colors.secondary,
    },
  },
});
