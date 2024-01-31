import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, Global } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import ContextProvider from './context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';
import { theme, globalStyles, muiTheme } from './styles';
import { store, persistor } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={muiTheme}>
        <BrowserRouter>
          <ContextProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <App />
              </PersistGate>
            </Provider>
          </ContextProvider>
        </BrowserRouter>
      </MuiThemeProvider>
      <Global styles={globalStyles} />
    </ThemeProvider>
  </React.StrictMode>
);
