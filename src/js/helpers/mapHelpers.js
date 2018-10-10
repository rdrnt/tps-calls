import { FlyToInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';

import { easeCubic } from 'd3-ease';

const mapHelper = {
  // We're checking if the incident lat/lon is inside the Map bounds
  // This function is mainly used to render items only in the bounds
  isMarkerInBounds: (bounds, incident) =>
    incident.coordinates.lat <= bounds._ne.lat &&
    incident.coordinates.lon <= bounds._ne.lng &&
    (incident.coordinates.lat >= bounds._sw.lat &&
      incident.coordinates.lon >= bounds._sw.lng),

  // oldViewport is used for reference
  // bounds are for figuring out center
  // coordinates are lat / lon
  animateViewportToCentre: (oldViewport, bounds, coordinates) => {
    // create a new instance of WebMercatorViewport
    const webViewport = new WebMercatorViewport(oldViewport);

    // centre the screen from the bounds
    const bound = webViewport.fitBounds(
      [[bounds._sw.lng, bounds._sw.lat], [bounds._ne.lng, bounds._ne.lat]],
      {
        padding: 0,
        offset: [0, 0],
      }
    );

    return {
      ...bound,
      latitude: coordinates.lat,
      longitude: coordinates.lon,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    };
  },
};

export default mapHelper;
