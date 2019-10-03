import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Firebase } from './helpers';

import Map from './containers/Map';

import IncidentListener from './components/IncidentListener';

import store from './store';
import Drawer from './components/Drawer';
import Loader from './components/Loader';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    font-family: 'Roboto', arial, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

Firebase.initialize();

const App: React.FunctionComponent = () => (
  <>
    <GlobalStyle />
    <Router>
      <Provider store={store}>
        <IncidentListener />
        <Loader />
        <Drawer />
        <Switch>
          <Route path={['/', '/:incidentId']} component={Map} />
        </Switch>
      </Provider>
    </Router>
  </>
);

export default App;
