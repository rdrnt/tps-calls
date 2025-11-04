import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

import Map from './containers/Map';
import ContactPage from './containers/Contact';
import DownloadPage from './containers/Download';
import BetaFeature from './containers/BetaFeature';

import { ThemeProvider } from './theme-provider';

import { LocationListener, IncidentListener } from './components/Listeners';

import store from './store';

import Loader from './components/Loader';
import Modal from './components/Modal';
import TorontoCamerasListener from './components/Listeners/Cameras';

const App: React.FunctionComponent = () => (
  <>
    <ThemeProvider defaultTheme="system" storageKey="tpscalls-ui-theme">
      <Router>
        <Provider store={store}>
          <>
            <IncidentListener />
            <TorontoCamerasListener />
            <LocationListener />
            <Loader />

            <Modal />

            <Routes>
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/beta-feature" element={<BetaFeature />} />
              <Route path="/:id" element={<Map />} />
              <Route path="/" element={<Map />} />
            </Routes>
          </>
        </Provider>
      </Router>
    </ThemeProvider>
  </>
);

export default App;
