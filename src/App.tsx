import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Map from './containers/Map';
import ContactPage from './containers/Contact';
import DownloadPage from './containers/Download';

import { LocationListener, IncidentListener } from './components/Listeners';

import store from './store';
import Drawer from './components/Drawer';
import Loader from './components/Loader';
import Modal from './components/Modal';
import Toast from './components/Toast';
import BetaFeature from './containers/BetaFeature';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    font-family: 'Poppins', arial, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

const App: React.FunctionComponent = () => (
  <>
    <GlobalStyle />
    <Router>
      <Provider store={store}>
        <>
          <IncidentListener />
          <LocationListener />
          <Loader />
          <Drawer />
          <Modal />
          <Toast />

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
