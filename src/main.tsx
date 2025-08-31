import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { ToastContainer } from '@features/toasts/index.ts';
import { ModalsProvider } from '@/features/modals';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
