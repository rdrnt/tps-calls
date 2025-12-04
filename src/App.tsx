import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

const Map = React.lazy(() => import('./routes/Map'));
import ContactPage from './routes/Contact';
import DownloadPage from './routes/Download';

import { ThemeProvider } from './theme-provider';

import {
  LocationListener,
  IncidentListener,
  CameraListener,
} from './components/Listeners';

import store from './store';

import Loader, { StaticLoader } from './components/Loader';
import Modal from './components/Modal';
import TrafficCams from './routes/TrafficCams';

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
              <Route path="/traffic-cams" element={<TrafficCams />} />
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
