import * as Sentry from '@sentry/browser';
import ReactGA from 'react-ga';

// We use IS_DEV so we don't log analytics in development
const IS_DEV = process.env.NODE_ENV === 'development';

const analyticsHelper = {
  // Initialize the analytics
  initialize: () => {
    if (!IS_DEV) {
      Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
      });

      ReactGA.initialize(process.env.REACT_APP_GANALYTICS_KEY);
    }
  },

  pageView: path => {
    ReactGA.pageview(path);
  },
};

export default analyticsHelper;
