import axios from 'axios';
import Sentry from '@sentry/node';

import { environmentHelper } from '../helpers';

// Load polyfills for async/await
if (!global._babelPolyfill) {
  require('babel-polyfill');
}

// Initialize Sentry

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: `Functions - ${environmentHelper.getCurrentVersion()}`,
  });
}

const policeApiInfo = [
  {
    name: 'York-South Weston',
    ward: 'Ward 12',
    url:
      'http://c4s.torontopolice.on.ca/arcgis/rest/services/CADPublic/C4S/MapServer/0/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-8883817.175431233%2C%22ymin%22%3A5400734.670537084%2C%22xmax%22%3A-8844681.416949276%2C%22ymax%22%3A5439870.4290190395%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100&timeStamp=1537821487496',
  },
  {
    name: 'Scarborough-Rouge River',
    ward: 'Ward 42',
    url:
      'http://c4s.torontopolice.on.ca/arcgis/rest/services/CADPublic/C4S/MapServer/0/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-8844681.416949276%2C%22ymin%22%3A5400734.670537084%2C%22xmax%22%3A-8805545.65846732%2C%22ymax%22%3A5439870.4290190395%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100&timeStamp=1537821487502',
  },
];

const fetchAllIncidents = async () => {
  try {
    // Loop through each api endpoint
    // And return the array of incidents from that endpoint
    const allIncidents = await Promise.all(
      policeApiInfo.map(async apiEndpoit => {
        const incident = await axios.get(apiEndpoit.url, {
          responseType: 'json',
        });
        return incident.data.features;
      })
    );

    // Flatten the array since it looks like [[], []]
    // https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
    return [].concat(...allIncidents);
  } catch (error) {
    throw new Error('Error fetching all incidents', error);
  }
};

exports.handler = async (event, context) => {
  try {
    const incidents = await fetchAllIncidents();
    return {
      statusCode: 200,
      body: JSON.stringify(incidents),
    };
  } catch (error) {
    console.log('Error', error);
    Sentry.captureException(error);
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Lambda issue' }),
    };
  }
};
