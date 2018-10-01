import { loadModules } from 'react-arcgis';
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
            date: dateHelper.parse(attributes.ATSCENE_TS),
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
      fetch('/.netlify/functions/policeApi')
        .then(response => response.json())
        .then(json => json);

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

    fetchIncidents().then(incidents => {
      convertIncidentsToLatLon(incidents, values => {
        callback(values);
      });
    });
  },
};

export default policeApi;
