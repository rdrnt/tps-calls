import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

import { lazyWithReload } from './helpers/lazyWithReload';

const Map = lazyWithReload(() => import('./routes/Map'));
const ContactPage = lazyWithReload(() => import('./routes/Contact'));
const DownloadPage = lazyWithReload(() => import('./routes/Download'));
const TrafficCams = lazyWithReload(() => import('./routes/TrafficCams'));
const UnsupportedPage = lazyWithReload(() => import('./routes/Unsupported'));

import { ThemeProvider } from './theme-provider';

import store from './store';

import ErrorBoundary from './components/ErrorBoundary';
import Loader, { StaticLoader } from './components/Loader';
import Modal from './components/Modal';

const routeFallback = <StaticLoader message="Loading..." />;

const App: React.FunctionComponent = () => (
  <ThemeProvider defaultTheme="system" storageKey="tpscalls-ui-theme">
    <ErrorBoundary>
      <Router>
        <Provider store={store}>
          <>
            <Loader />
            <Modal />

            <Routes>
              <Route
                path="/contact"
                element={
                  <React.Suspense fallback={routeFallback}>
                    <ContactPage />
                  </React.Suspense>
                }
              />
              <Route
                path="/download"
                element={
                  <React.Suspense fallback={routeFallback}>
                    <DownloadPage />
                  </React.Suspense>
                }
              />
              <Route
                path="/traffic-cams"
                element={
                  <React.Suspense fallback={routeFallback}>
                    <TrafficCams />
                  </React.Suspense>
                }
              />
              {/* Must precede /:id so the literal path isn't swallowed as an incident id. */}
              <Route
                path="/unsupported"
                element={
                  <React.Suspense fallback={routeFallback}>
                    <UnsupportedPage />
                  </React.Suspense>
                }
              />
              <Route
                path="/:id"
                element={
                  <React.Suspense fallback={routeFallback}>
                    <Map />
                  </React.Suspense>
                }
              />
              <Route
                path="/"
                element={
                  <React.Suspense fallback={routeFallback}>
                    <Map />
                  </React.Suspense>
                }
              />
            </Routes>
          </>
        </Provider>
      </Router>
    </ErrorBoundary>
  </ThemeProvider>
);

export default App;
