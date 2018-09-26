import { loadModules } from 'react-arcgis';

const incidentObj = values => {
  const incident = {
    ...values,
  };
  return incident;
};

const policeApi = {
  // converts x & y to Lat/Long
  // Returns and array like [87.11, 28.11]
  convertXYToLatLon: incident =>
    new Promise(resolve => {
      loadModules(['esri/geometry/support/webMercatorUtils'])
        .then(([webMercatorUtils]) => {
          const { geometry, attributes } = incident;
          const incidentValues = {
            coordinates: webMercatorUtils.xyToLngLat(geometry.x, geometry.y),
            type: attributes.TYP_ENG,
            id: attributes.OBJECTID,
            street: attributes.XSTREETS,
            date: attributes.ATSCENE_TS,
          };
          resolve(incidentObj(incidentValues));
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
