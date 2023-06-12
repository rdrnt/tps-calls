import * as Sentry from '@sentry/browser';
import ReactGA from 'react-ga4';
import { Environment } from '.';

// Initializes the analytics
export const initialize = () => {
  const { SENTRY_DSN, GOOGLEANALYTICS_KEY } = Environment.config;

  if (!Environment.isDevelopment) {
    Sentry.init({ dsn: SENTRY_DSN });

    ReactGA.initialize(GOOGLEANALYTICS_KEY);
  } else {
    console.warn('Not initializing analytics for development build');
  }
};

export type EventCategory = 'UI';

// The actions for the UI
export enum UI {
  SHARE_INCIDENT_TWITTER = 'Shared incident via Twitter',
  SHARE_INCIDENT_URL = 'Shared incident via URL',
  SHOW_PROJECT_INFO = 'Show project info modal',
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
