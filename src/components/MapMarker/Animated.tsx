import * as React from 'react';
import { Marker } from 'react-map-gl';
import { Coordinates } from '@rdrnt/tps-calls-shared';
import { darken } from 'polished';
interface AnimatedMapMarkerProps {
  coordinates: Coordinates;
  color: string;
  size?: number;
}

const AnimatedMapMarker: React.FunctionComponent<AnimatedMapMarkerProps> = ({
  coordinates,
  color,
  size = 15,
}) => (
  <Marker {...coordinates} style={{ zIndex: 0 }} anchor="center">
    <div className={`animate-ping bg-white fixed size-full rounded-full`} />
    <div
      className="border-2 border-white rounded-full"
      style={{
        height: `${size}px`,
        width: `${size}px`,

        backgroundColor: darken(0.2, color),
      }}
    />
  </Marker>
);

export default AnimatedMapMarker;
