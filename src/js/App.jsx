import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import '../sass/main.scss';

import Map from './containers/Map';

import Template from './Template';

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
  <Router>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Template>
            <Switch>
              <Route path={['/:incidentId', '/']} component={Map} />
            </Switch>
          </Template>
        </div>
      </Provider>
    </MuiThemeProvider>
  </Router>
);

export default App;
