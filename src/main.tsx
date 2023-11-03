import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, Global } from '@emotion/react';

import App from './App.tsx';
import { theme, globalStyles } from './styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <Global styles={globalStyles} />
    </ThemeProvider>
  </React.StrictMode>
);
