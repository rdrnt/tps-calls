import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Map from './containers/Map';
import ContactPage from './containers/Contact';
import DownloadPage from './containers/Download';
import BetaFeature from './containers/BetaFeature';

import { Toaster } from './components/ui/sonner';

import { LocationListener, IncidentListener } from './components/Listeners';

import store from './store';

import Loader from './components/Loader';
import Modal from './components/Modal';
import TorontoCamerasListener from './components/Listeners/Cameras';

const App: React.FunctionComponent = () => (
  <>
    <Router>
      <Provider store={store}>
        <>
          <IncidentListener />
          <TorontoCamerasListener />
          <LocationListener />
          <Loader />

          <Modal />

          <Toaster />

          <Switch>
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/download" component={DownloadPage} />
            <Route exact path="/beta-feature" component={BetaFeature} />
            <Route path={['/:id', '/']} component={Map} />
          </Switch>
        </>
      </Provider>
    </Router>
  </>
);

export default App;
