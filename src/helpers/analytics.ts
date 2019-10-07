import * as Sentry from '@sentry/browser';
import { Environment } from '.';

export const initialize = () => {
  const { SENTRY_DSN } = Environment.config;

  if (!Environment.isDevelopment) {
    Sentry.init({ dsn: SENTRY_DSN });
  } else {
    console.warn('Not initializing analytics for development build');
  }
};
