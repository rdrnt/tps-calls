import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

const Map = React.lazy(() => import('./containers/Map'));
import ContactPage from './containers/Contact';
import DownloadPage from './containers/Download';
import BetaFeature from './containers/BetaFeature';

import { ThemeProvider } from './theme-provider';

import {
  LocationListener,
  IncidentListener,
  CameraListener,
} from './components/Listeners';

import store from './store';

import Loader, { StaticLoader } from './components/Loader';
import Modal from './components/Modal';

const App: React.FunctionComponent = () => (
  <>
    <ThemeProvider defaultTheme="system" storageKey="tpscalls-ui-theme">
      <Router>
        <Provider store={store}>
          <>
            <IncidentListener />
            <CameraListener />
            <LocationListener />
            <Loader />
            <Modal />

            <Routes>
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/beta-feature" element={<BetaFeature />} />
              <Route
                path="/:id"
                element={
                  <React.Suspense fallback={<StaticLoader />}>
                    <Map />
                  </React.Suspense>
                }
              />
              <Route
                path="/"
                element={
                  <React.Suspense fallback={<StaticLoader />}>
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
