import * as Sentry from '@sentry/browser';
import ReactGA from 'react-ga';

import environmentHelper from './environment';

const analyticsHelper = {
  // Initialize the analytics only if we're in production
  initialize: () => {
    if (!environmentHelper.isDevelopment()) {
      Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        release: environmentHelper.getCurrentVersion().toString(),
      });

      ReactGA.initialize(process.env.REACT_APP_GANALYTICS_KEY);
    }
  },

  pageView: path => {
    ReactGA.pageview(path);
  },
};

export default analyticsHelper;
