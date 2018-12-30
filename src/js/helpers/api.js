import { loadModules } from 'react-arcgis';
import axios from 'axios';

import dateHelper from './dateHelper';
import isValidIncident from './isValidIncident';
import stringToCamelCase from './stringToCamelCase';

const api = {
  // converts x & y to Lat/Long
  // Returns and array like [87.11, 28.11]
  convertXYToLatLon: incident =>
    new Promise(resolve => {
      loadModules(['esri/geometry/support/webMercatorUtils'])
        .then(([webMercatorUtils]) => {
          const { geometry, attributes } = incident;
          // coordinatesFromXY is an array that holds two numbers
          // At 0 it stores the longitude & at 1 it stores latitude
          const coordinatesFromXY = webMercatorUtils.xyToLngLat(
            geometry.x,
            geometry.y
          );
          const incidentValues = {
            coordinates: {
              lat: coordinatesFromXY[1],
              lon: coordinatesFromXY[0],
            },
            type: stringToCamelCase(attributes.TYP_ENG),
            id: attributes.OBJECTID,
            street: stringToCamelCase(attributes.XSTREETS),
            date: dateHelper.convert(attributes.ATSCENE_TS),
          };
          if (isValidIncident(incidentValues)) {
            resolve(incidentValues);
          }
        })
        .catch(err => console.error('Error!', err));
    }),

  // Get all the incidents from the API
  getAllIncidents: callback => {
    // Get the incidents from the API
    const fetchIncidents = () =>
      axios
        .get('/.netlify/functions/all', { responseType: 'json' })
        .then(response => response);

    // Convert the incident to lat / lon
    const convertIncidentsToLatLon = (incidents, cb) =>
      new Promise((resolve, reject) => {
        Promise.all(
          incidents.map(incident =>
            api
              .convertXYToLatLon(incident)
              .then(convertedIncident => convertedIncident)
          )
        ).then(results => {
          // results is an array of names
          resolve(results);
        });
      });

    fetchIncidents()
      .then(response => {
        // Either 200, 203, 500, etc
        const { status } = response;
        // all of the incidents from the api
        const incidents = JSON.parse(response.data.body);
        if (status === 200) {
          convertIncidentsToLatLon(incidents).then(convertedIncidents => {
            callback({ status, values: convertedIncidents });
          });
        } else {
          callback({ status, values: [] });
        }
      })
      .catch(error => {
        console.log('Error getting incidents', error);
        callback({ status: 500, values: [] });
      });
  },
};

export default api;
