import * as React from 'react';
import { Marker } from 'react-map-gl';
import styled from 'styled-components';
import { Coordinates } from '@rdrnt/tps-calls-shared';

import { Colors } from '../../config';

const StyledMarkerDot = styled.div`
  height: 17px;
  width: 17px;
  border-radius: 8.5px;
  background-color: ${Colors.PRIMARY};
  border: 2px solid white;
`;

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
  <Marker
    {...coordinates}
    color={selected ? Colors.BLACK : Colors.PRIMARY}
    scale={selected ? 8 : 6}
    style={{
      border: selected ? 2 : 1,
    }}
    onClick={onClick}
  >
    <StyledMarkerDot />
  </Marker>
);
export default MapMarker;
