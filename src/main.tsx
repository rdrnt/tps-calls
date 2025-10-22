import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import 'typeface-poppins';
import '@reach/slider/styles.css';
import '@reach/dialog/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

import App from './App';

import { Analytics } from './helpers';

Analytics.initialize();

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
