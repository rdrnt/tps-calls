import React from 'react';
import { Provider } from 'react-redux';
import '../sass/main.scss';

import Map from './containers/Map';
import Overlay from './containers/Overlay';

import store from './store';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Overlay />
      <Map />
    </div>
  </Provider>
);

export default App;
