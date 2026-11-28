import * as React from 'react';
import { Marker } from 'react-map-gl/mapbox';
import { Coordinates } from '@rdrnt/tps-calls-shared';

import { Colors } from '../../config';
import { cn } from '../../lib/utils';

interface MapMarkerProps {
  coordinates: Coordinates;
  onClick: () => void;
  color?: string;
  /** Milliseconds to wait before the pin animates in. */
  delay?: number;
  /** Hidden while selected; staying mounted stops the entrance replaying. */
  hidden?: boolean;
}

const MapMarker: React.FunctionComponent<MapMarkerProps> = ({
  coordinates,
  onClick,
  color = Colors.PRIMARY,
  delay = 0,
  hidden = false,
}) => (
  <Marker {...coordinates} onClick={onClick}>
    <div
      className={cn(
        'animate-in fade-in zoom-in-50 fill-mode-backwards size-[17px] rounded-full border-2 border-white duration-300 ease-out motion-reduce:animate-none',
        hidden && 'invisible'
      )}
      style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
    />
  </Marker>
);
export default MapMarker;
