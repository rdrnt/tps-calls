import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router';

import { lazyWithReload } from './helpers/lazyWithReload';

const Map = lazyWithReload(() => import('./routes/Map'));
const ContactPage = lazyWithReload(() => import('./routes/Contact'));
const DownloadPage = lazyWithReload(() => import('./routes/Download'));
const UnsupportedPage = lazyWithReload(() => import('./routes/Unsupported'));

import { ThemeProvider } from './theme-provider';

import store from './store';

import ErrorBoundary from './components/ErrorBoundary';
import Loader, { StaticLoader } from './components/Loader';
import Modal from './components/Modal';

const routeFallback = <StaticLoader message="Loading..." />;
// Matches the map, so loading doesn't flash.
const mapFallback = <StaticLoader className="bg-(--map-background)" />;

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
              {/* The traffic cams page was removed; send old links to the map. */}
              <Route
                path="/traffic-cams"
                element={<Navigate to="/" replace />}
              />
              <Route
                path="/unsupported"
                element={
                  <React.Suspense fallback={routeFallback}>
                    <UnsupportedPage />
                  </React.Suspense>
                }
              />
              {/* One route for / and /:id, so opening an incident doesn't remount the map. */}
              <Route
                path="/:id?"
                element={
                  <React.Suspense fallback={mapFallback}>
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
