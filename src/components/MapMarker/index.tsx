import * as React from 'react';
import { Feature } from 'react-mapbox-gl';
import { Coordinates } from '@rdrnt/tps-calls-shared';

import { Colors } from '../../config';

interface MapMarkerProps {
  selected?: boolean;
  coordinates: Coordinates;
  onClick: () => void;
}

const MapMarker: React.FunctionComponent<MapMarkerProps> = ({
  selected,
  coordinates,
  onClick,
}) => (
  <Feature
    coordinates={[coordinates.longitude, coordinates.latitude]}
    properties={{
      // https://docs.mapbox.com/mapbox-gl-js/example/data-driven-lines/
      color: selected ? Colors.BLACK : Colors.PRIMARY,
      size: selected ? 8 : 6,
      border: selected ? 2 : 1,
    }}
    onClick={onClick}
  />
);
export default MapMarker;
