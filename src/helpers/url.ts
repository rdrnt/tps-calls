import { Environment, DateHelper } from '.';
import { LocalIncident } from '../types';

export const createShareUrl = (incidentId: string): string => {
  let baseUrl = `${window.location.protocol}//${window.location.hostname}`;

  if (Environment.isDevelopment) {
    baseUrl += `:${window.location.port}`;
  }

  baseUrl += `/${incidentId}`;

  return baseUrl;
};

export const createTwitterShareUrl = (incident: LocalIncident) => {
  let url = `https://twitter.com/intent/tweet`;

  const tweetText = `${incident.name} @ ${
    incident.location
  } (${DateHelper.distanceInWords(incident.date)} ago)\n\n${createShareUrl(
    incident.id
  )}`;

  const tweetHashtags = '?hashtags=tpscalls';

  url += tweetHashtags;

  url += `&text=${encodeURIComponent(tweetText)}`;

  return url;
};
