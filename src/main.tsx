import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './core/components/navigation/app.routing.tsx';
import { NextUIProvider, Spinner } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import './index.css';
import { StoreProvider } from './core/store/StoreProvider.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <NextUIProvider>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <RouterProvider router={router} fallbackElement={<Spinner />} />
        </ThemeProvider>
      </NextUIProvider>
    </StoreProvider>
  </React.StrictMode>,
);
