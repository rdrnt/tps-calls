import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
// import { Router } from '@reach/router';

import { Firebase } from './helpers';

import Map from './containers/Map';
import MapOverlay from './containers/MapOverlay';

import IncidentListener from './components/IncidentListener';

import store from './store';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

Firebase.initialize();

const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <GlobalStyle />
    <IncidentListener />
    <>
      <MapOverlay />
      <Map />
    </>
  </Provider>
);

export default App;
