import * as React from 'react';
import { Marker } from 'react-map-gl';
import { Coordinates } from '@rdrnt/tps-calls-shared';

import { Colors } from '../../config';

interface MapMarkerProps {
  selected?: boolean;
  coordinates: Coordinates;
  onClick: () => void;
  color?: string;
}

const MapMarker: React.FunctionComponent<MapMarkerProps> = ({
  selected,
  coordinates,
  onClick,
  color = Colors.PRIMARY,
}) => (
  <Marker
    {...coordinates}
    color={selected ? Colors.BLACK : color}
    scale={selected ? 8 : 6}
    style={{
      border: selected ? 2 : 1,
    }}
    onClick={onClick}
  >
    <div
      className="w-[17px] h-[17px] bg-red-500 rounded-full border-white border-2 "
      style={{ backgroundColor: color }}
    />
  </Marker>
);
export default MapMarker;
