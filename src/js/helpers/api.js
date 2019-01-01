import { loadModules } from 'react-arcgis';
import axios from 'axios';

import dateHelper from './dateHelper';
import isValidIncident from './isValidIncident';
import stringToCamelCase from './stringToCamelCase';

import convertXYLatLon from './convertLatLonToXY';

const api = {
  // Get all the incidents from the API
  getAllIncidents: async () => {
    // Get the incidents from the API
    const fetchIncidents = async () => {
      try {
        const fetchedResults = await axios.get('/.netlify/functions/all', {
          responseType: 'json',
        });
        return JSON.parse(fetchedResults.data.body);
      } catch (error) {
        console.log('Error getting incidents');
        return [];
      }
    };

    const convertPoliceIncidentsXY = async incidents => {
      try {
        const promiseconvertedTPSIncidents = await incidents.map(
          async incident => {
            const convertedIncident = await convertXYLatLon(incident);
            return convertedIncident;
          }
        );
        const convertedTPSIncidents = await Promise.all(
          promiseconvertedTPSIncidents
        ).then(convertedIncidents => convertedIncidents);
        return convertedTPSIncidents;
      } catch (error) {
        console.log('Error converting police incidents XY', error);
      }
    };

    const allIncidents = await fetchIncidents();

    const convertedTPSIncidents = await convertPoliceIncidentsXY(allIncidents);

    return { status: 200, values: convertedTPSIncidents || [] };
    /*
    fetchIncidents()
      .then(response => {
        try {
          const { status } = response;
          // all of the incidents from the api
          const incidents = JSON.parse(response.data.body);
          if (status === 200) {
            const promiseconvertedTPSIncidents = incidents.map(
              async incident => {
                const convertedIncident = await convertXYLatLon(incident);
                return convertedIncident;
              }
            );
            const converted = await Promise.all(promiseconvertedTPSIncidents);
            console.log('convert', convertedPoliceIncidents);
            callback({ status, values: convertedPoliceIncidents });
          } else {
            callback({ status, values: [] });
          }
        } catch (error) {
          console.log('Error getting incidents', error);
        }
        // Either 200, 203, 500, etc
      })
      .catch(error => {
        console.log('Error getting incidents', error);
        callback({ status: 500, values: [] });
      });
      */
  },
};

export default api;
