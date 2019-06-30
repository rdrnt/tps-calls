import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';

import { Firebase } from './helpers';

import Map from './containers/Map';

import IncidentListener from './components/IncidentListener';
import Template from './components/Template';

import store from './store';
import Drawer from './components/Drawer';
import Loader from './components/Loader';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    font-family: 'Raleway';
  }
`;

Firebase.initialize();

const App: React.FunctionComponent = () => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <IncidentListener />
      <Loader />
      <Drawer />
      <Template>
        <Map />
      </Template>
    </Provider>
  </>
);

export default App;
