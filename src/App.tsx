import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router';

import { lazyWithReload } from './helpers/lazyWithReload';

const Map = lazyWithReload(() => import('./routes/Map'));
const ContactPage = lazyWithReload(() => import('./routes/Contact'));
const DownloadPage = lazyWithReload(() => import('./routes/Download'));
const UnsupportedPage = lazyWithReload(() => import('./routes/Unsupported'));
const Modal = lazyWithReload(() => import('./components/Modal'));

// Popup code loads the first time a popup opens, not on every page.
const ModalHost: React.FunctionComponent = () => {
  const opened = useAppSelector(state => state.ui.modal.type !== undefined);
  return opened ? (
    <React.Suspense fallback={null}>
      <Modal />
    </React.Suspense>
  ) : null;
};

import { MotionConfig } from 'motion/react';

import { ThemeProvider } from './theme-provider';

import store, { useAppSelector } from './store';

import ErrorBoundary from './components/ErrorBoundary';
import Loader, { StaticLoader } from './components/Loader';

const routeFallback = <StaticLoader message="Loading..." />;
// Matches the map, so loading doesn't flash.
const mapFallback = <StaticLoader className="bg-(--map-background)" />;

const App: React.FunctionComponent = () => (
  <ThemeProvider defaultTheme="system" storageKey="tpscalls-ui-theme">
    {/* Motion animations follow the device's reduced-motion setting too. */}
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <Router>
          <Provider store={store}>
            <>
              <Loader />
              <ModalHost />

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
    </MotionConfig>
  </ThemeProvider>
);

export default App;
