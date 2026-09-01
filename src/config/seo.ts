export const SITE_NAME = 'tpscalls';
export const SITE_URL = 'https://www.tpscalls.live';
export const DEFAULT_TITLE = 'Live Toronto Police Calls Map | tpscalls';

export type RouteMetadata = {
  title: string;
  description: string;
  canonicalPath: string;
};

export const MAP_METADATA: RouteMetadata = {
  title: DEFAULT_TITLE,
  description:
    'Live map of Toronto Police calls for service across the city, updated in real time.',
  canonicalPath: '/',
};

export const CONTACT_METADATA: RouteMetadata = {
  title: 'Contact | tpscalls',
  description:
    'Get in touch about tpscalls — report bugs, share ideas, or ask questions about the data.',
  canonicalPath: '/contact',
};

export const DOWNLOAD_METADATA: RouteMetadata = {
  title: 'Download the tpscalls App | tpscalls',
  description:
    'Download the tpscalls app for iOS and Android. Every Toronto Police call on the map the moment it is dispatched.',
  canonicalPath: '/download',
};

export const TRAFFIC_CAMS_METADATA: RouteMetadata = {
  title: 'Toronto Traffic Cameras | tpscalls',
  description:
    'Real-time traffic camera feeds from intersections across Toronto.',
  canonicalPath: '/traffic-cams',
};

export const UNSUPPORTED_METADATA: RouteMetadata = {
  title: 'Unsupported Browser | tpscalls',
  description:
    'The tpscalls map needs a browser with WebGL2 support. Get the iOS or Android app instead.',
  canonicalPath: '/unsupported',
};

export const buildIncidentTitle = (name: string, location: string): string => {
  // Historical incidents can omit cross streets, so the title must not expose an empty `at` fragment.
  if (location.trim()) {
    return `${name} at ${location} | ${SITE_NAME}`;
  }

  return `${name} | ${SITE_NAME}`;
};
