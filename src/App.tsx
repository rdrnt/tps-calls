import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
// import { Router } from '@reach/router';

import Map from './containers/Map';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const App: React.FunctionComponent = () => (
  <>
    <GlobalStyle />
    <div>
      <Map />
    </div>
  </>
);

export default App;
