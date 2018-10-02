import axios from 'axios';

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

/*
// Simply just fetch from a URL
const fetchIncident = url =>
  fetch(url).then(response => response.json().then(json => json));

// Go through each incident API endpoint and return all the incidents
const fetchAllIncidents = () =>
  // Promise to GET all
  new Promise.all([
    fetchIncident(policeApiInfo[0].url),
    fetchIncident(policeApiInfo[1].url),
  ]).then(response => {
    // We'll store all of our incidents here
    const allIncidents = [];
    // Since we're hitting more than 1 endpoint, we have to use the spread operator ...
    // To spread each array into allIncidents
    response.map(resp => allIncidents.push(...resp.data.features));
    return allIncidents;
  });

*/

// Interate over fetch
const fetchIncident = url => axios.get(url, { responseType: 'json' });

const fetchAllIncidents = () =>
  axios
    .all([
      fetchIncident(policeApiInfo[0].url),
      fetchIncident(policeApiInfo[1].url),
    ])
    .then(response => {
      const allIncidents = [];
      response.map(responseData =>
        allIncidents.push(...responseData.data.features)
      );
      console.log('returning values');
      return allIncidents;
    });

exports.handler = (event, context, callback) => {
  fetchAllIncidents()
    .then(incidents => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(incidents),
      });
    })
    .catch(error => {
      console.log('Error in lambda ', error);
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({ error: 'Lambda issue' }),
      });
    });
};
