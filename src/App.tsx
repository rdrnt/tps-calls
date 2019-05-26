import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
// import { Router } from '@reach/router';

import Map from './containers/Map';

import store from './store';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const App: React.FunctionComponent = () => (
  <>
    <Provider store={store}>
      <GlobalStyle />
      <div>
        <Map />
      </div>
    </Provider>
  </>
);

export default App;
