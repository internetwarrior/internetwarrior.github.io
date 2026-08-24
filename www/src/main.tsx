import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import App from './App.tsx';
import { DomRefsProvider } from './app/context/RefContext.tsx';
import { AppProvider } from './app/context/GlobalContext.tsx';

createRoot(document.getElementById('root')!).render(
  <DomRefsProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </DomRefsProvider>
);
