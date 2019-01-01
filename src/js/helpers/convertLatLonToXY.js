import { loadModules } from 'react-arcgis';

import dateHelper from './dateHelper';
import isValidIncident from './isValidIncident';
import stringToCamelCase from './stringToCamelCase';

// converts x & y to Lat/Long
// Returns and array like [87.11, 28.11]

async function convertXYToLatLon(incident) {
  try {
    const [webMercatorUtils] = await loadModules([
      'esri/geometry/support/webMercatorUtils',
    ]);
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
      return incidentValues;
    }
    return [];
  } catch (error) {
    console.log('Error convertXYToLatLon', error);
    return [];
  }
}
/*
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
  });
  */

export default convertXYToLatLon;
