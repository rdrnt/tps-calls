import * as React from 'react';
import { Marker } from 'react-map-gl/mapbox';
import { Coordinates } from '@rdrnt/tps-calls-shared';
import { cn } from '../../lib/utils';

const COLOR_CLASSES = {
  primary: 'bg-tpscalls-primary border-white',
  secondary: 'bg-amber-700 border-amber-200',
} as const;

// A white pulse disappears on the light map, so it takes the pin's colour there.
const PING_CLASSES = {
  primary: 'bg-tpscalls-primary/50',
  secondary: 'bg-amber-600/50',
} satisfies Record<keyof typeof COLOR_CLASSES, string>;

interface AnimatedMapMarkerProps {
  coordinates: Coordinates;
  color?: keyof typeof COLOR_CLASSES;
  size?: number;
  className?: string;
}

const AnimatedMapMarker: React.FunctionComponent<AnimatedMapMarkerProps> = ({
  coordinates,
  color = 'primary',
  size = 15,
  className,
}) => (
  <Marker {...coordinates} style={{ zIndex: 0 }} anchor="center">
    <div
      className={cn(
        'animate-ping fixed size-full rounded-full dark:bg-white',
        PING_CLASSES[color]
      )}
    />
    <div
      className={cn(
        'border-2 rounded-full',
        COLOR_CLASSES[color],
        'z-10 relative',
        className
      )}
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    />
  </Marker>
);

export default AnimatedMapMarker;
