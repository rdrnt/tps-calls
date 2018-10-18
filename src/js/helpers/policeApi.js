import { loadModules } from 'react-arcgis';
import axios from 'axios';

import dateHelper from './dateHelper';
import isValidIncident from './isValidIncident';
import stringToCamelCase from './stringToCamelCase';

const policeApi = {
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

          /*
          console.log(
            'The incident',
            incidentValues,
            isValidIncident(incidentValues)
          );
          */
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
        .get('/.netlify/functions/policeApi', { responseType: 'json' })
        .then(response => response);

    // Convert the incident to lat / lon
    const convertIncidentsToLatLon = (incidents, cb) => {
      Promise.all(
        incidents.map(incident =>
          policeApi
            .convertXYToLatLon(incident)
            .then(convertedIncident => convertedIncident)
        )
      ).then(results => {
        // results is an array of names
        cb(results);
      });
    };

    fetchIncidents()
      .then(response => {
        // Either 200, 203, 500, etc
        const { status } = response;
        // all of the incidents from the api
        const incidents = response.data;

        if (status === 200) {
          convertIncidentsToLatLon(incidents, values => {
            callback({ status, values });
          });
        } else {
          callback({ status, values: [] });
        }
      })
      .catch(error => {
        console.log('The error is in policeApi', error);
        callback({ status: 500, values: [] });
      });
  },
};

export default policeApi;
