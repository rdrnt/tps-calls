import { Environment } from '.';

export default function(incidentId: string) {
  let baseUrl = `${window.location.protocol}//${window.location.hostname}`;

  if (Environment.isDevelopment) {
    baseUrl += `:${window.location.port}`;
  }

  baseUrl += `/${incidentId}`;

  return baseUrl;
}
