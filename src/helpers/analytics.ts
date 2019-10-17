import * as Sentry from '@sentry/browser';
import ReactGA from 'react-ga';
import { Environment } from '.';

export enum EventCategory {
  UI = 'UI',
}

export enum EventAction {
  SHARE_TWITTER = 'Shared incident via twitter',
  SHARE_URL = 'Shared incident via url',
  SHOW_PROJECT_INFO = 'Show project info modal',
  TRACK_LOCATION = 'Track',
}

export const initialize = () => {
  const { SENTRY_DSN, GOOGLEANALYTICS_KEY } = Environment.config;

  if (!Environment.isDevelopment) {
    Sentry.init({ dsn: SENTRY_DSN });

    ReactGA.initialize(GOOGLEANALYTICS_KEY);
  } else {
    console.warn('Not initializing analytics for development build');
  }
};

export const pageview = (path: string) => {
  ReactGA.pageview(path);
};

export const event = {};
