import { Incident } from '@rdrnt/tps-calls-shared';
import { Environment, DateHelper } from '.';

export const createShareUrl = (incidentId: string): string => {
  let baseUrl = `${window.location.protocol}//${window.location.hostname}`;

  if (Environment.isDevelopment) {
    baseUrl += `:${window.location.port}`;
  }

  baseUrl += `/${incidentId}`;

  return baseUrl;
};

export const createTwitterShareUrl = (incident: Incident<any>) => {
  let url = `https://twitter.com/intent/tweet`;

  const tweetText = `${incident.name} @ ${
    incident.location
  } (${DateHelper.distanceInWords(incident.date)} ago)\n\n${createShareUrl(
    incident.id
  )}`;

  url += `?text=${tweetText}`;

  return encodeURI(url);
};
