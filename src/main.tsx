import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import 'leaflet/dist/leaflet.css';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root not found in document. Please verify index.html.');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
