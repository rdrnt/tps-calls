import * as React from 'react';
import { Marker } from 'react-map-gl';
import { Coordinates } from '@rdrnt/tps-calls-shared';
import { cn } from '../../lib/utils';

const COLOR_CLASSES = {
  primary: 'bg-tpscalls-primary border-tpscalls-primary',
  secondary: 'bg-amber-700 border-amber-700',
  // add more here
} as const;

interface AnimatedMapMarkerProps {
  coordinates: Coordinates;
  color?: keyof typeof COLOR_CLASSES;
  size?: number;
}

const AnimatedMapMarker: React.FunctionComponent<AnimatedMapMarkerProps> = ({
  coordinates,
  color = 'primary',
  size = 15,
}) => (
  <Marker {...coordinates} style={{ zIndex: 0 }} anchor="center">
    <div className={`animate-ping bg-white fixed size-full rounded-full`} />
    <div
      className={cn(
        'border-2 rounded-full',
        COLOR_CLASSES[color],
        'z-10 relative'
      )}
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    />
  </Marker>
);

export default AnimatedMapMarker;
