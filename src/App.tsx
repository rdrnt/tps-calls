import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

const Map = React.lazy(() => import('./routes/Map'));
const ContactPage = React.lazy(() => import('./routes/Contact'));
const DownloadPage = React.lazy(() => import('./routes/Download'));
const TrafficCams = React.lazy(() => import('./routes/TrafficCams'));
const UnsupportedPage = React.lazy(() => import('./routes/Unsupported'));

import { ThemeProvider } from './theme-provider';

import store from './store';

import Loader, { StaticLoader } from './components/Loader';
import Modal from './components/Modal';

const routeFallback = <StaticLoader message="Loading..." />;

const App: React.FunctionComponent = () => (
  <>
    <ThemeProvider defaultTheme="system" storageKey="tpscalls-ui-theme">
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
    </ThemeProvider>
  </>
);

export default App;
