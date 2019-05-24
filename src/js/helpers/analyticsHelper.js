import * as Sentry from '@sentry/browser';
import ReactGA from 'react-ga';

import environmentHelper from './environment';

const analyticsHelper = {
  categories: {
    UI: 'UI',
    User: 'User',
  },

  // Initialize the analytics only if we're in production
  initialize: () => {
    if (!environmentHelper.isDevelopment()) {
      /*
      Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        release: environmentHelper.getCurrentVersion().toString(),
      });
      */
      // ReactGA.initialize(process.env.REACT_APP_GANALYTICS_KEY);
    }
  },

  pageView: path => {
    ReactGA.pageview(path);
  },

  // An event for Google Analytics
  gaEvent: ({ category, event, action, label, nonInteraction }) => {
    ReactGA.event({
      category,
      event,
      action,
      label,
      nonInteraction,
    });
  },
};

export default analyticsHelper;
