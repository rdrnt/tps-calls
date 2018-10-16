import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import '../sass/main.scss';

import Map from './containers/Map';
import Drawer from './containers/Drawer';

import store from './store';

import { analyticsHelper } from './helpers';

// Analytics setup
analyticsHelper.initialize();

// Create our theme so we can use the new typography
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <div className="App">
        <Drawer />
        <Map />
      </div>
    </Provider>
  </MuiThemeProvider>
);

export default App;
