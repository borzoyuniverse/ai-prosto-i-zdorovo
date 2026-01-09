import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '@/testing/mocks/enable-mocks';

import { App } from './app';

import './index.css';

import '@/config/polyfills';
import '@/lib/i18n/i18n';

if (import.meta.env.VITE_ENABLE_SENTRY === 'true') {
  import('@/lib/sentry');
}
const root = document.querySelector('#root');

if (root) {
  enableMocking().then(() => {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  });
}
