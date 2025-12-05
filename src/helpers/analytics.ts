import * as Sentry from '@sentry/react';
import ReactGA from 'react-ga4';
import { Environment } from '.';

// Initializes the analytics
export const initialize = () => {
  const { SENTRY_DSN, GOOGLEANALYTICS_KEY } = Environment.config;

  // Initialize Sentry and ReactGA in production
  if (!Environment.isDevelopment) {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: 'production',
      release: `tpscalls-frontend@${import.meta.env.npm_package_version}`,
      tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
      beforeSend(event) {
        // Filter out known non-critical errors
        return event;
      },
    });

    ReactGA.initialize(GOOGLEANALYTICS_KEY);
  } else {
    console.info('Not initializing analytics for development build');
  }
};

export type EventCategory = 'UI';

// The actions for the UI
export enum UI {
  SHARE_INCIDENT_TWITTER = 'Shared incident via Twitter',
  SHARE_INCIDENT_URL = 'Shared incident via URL',
  SHOW_PROJECT_INFO = 'Show project info modal',
  SHOW_ANDROID_BETA_MODAL = 'Show Android Beta Modal',
  SHOW_DOWNLOAD_APP_MODAL = 'Show Download App Modal',
}

export const pageview = (path: string): void => {
  ReactGA.send({ hitType: 'pageview', page: path, title: path });
};

interface EventParams {
  category: EventCategory;
  action: UI;
  label?: string;
  nonInteraction?: boolean;
}

export const event = ({
  category,
  action,
  label,
  nonInteraction,
}: EventParams): void => {
  ReactGA.event({ category, action, label, nonInteraction });
};
