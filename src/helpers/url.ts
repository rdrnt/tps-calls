import { Incident } from '@rdrnt/tps-calls-shared';
import { Environment } from '.';

export const createShareUrl = (incidentId: string): string => {
  let baseUrl = `${window.location.protocol}//${window.location.hostname}`;

  if (Environment.isDevelopment) {
    baseUrl += `:${window.location.port}`;
  }

  baseUrl += `/${incidentId}`;

  return baseUrl;
};

export const createTwitterShareUrl = (incidentId: string) => {
  let url = `https://twitter.com/intent/tweet`;

  const tweetText = `Via ${createShareUrl(incidentId)}`;

  url += `?text=${tweetText}`;

  return encodeURI(url);
};
