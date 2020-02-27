import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Map from './containers/Map';

import { LocationListener, IncidentListener } from './components/Listeners';

import store from './store';
import Drawer from './components/Drawer';
import Loader from './components/Loader';
import Modal from './components/Modal';
import Toast from './components/Toast';

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
        <IncidentListener />
        <LocationListener />
        <Loader />
        <Drawer />
        <Modal />
        <Toast />
        <Switch>
          <Route path={['/:id', '/']} component={Map} />
        </Switch>
      </Provider>
    </Router>
  </>
);

export default App;
