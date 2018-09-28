import React from 'react';
import { Provider } from 'react-redux';
import '../sass/main.scss';

import Map from './containers/Map';
import SideDrawer from './containers/Drawer';

import store from './store';

const App = () => (
  <Provider store={store}>
    <div className="App">
      {/* <SideDrawer /> */}
      <Map />
    </div>
  </Provider>
);

export default App;
