import * as React from 'react';
import styled from 'styled-components';
import { Marker } from 'react-map-gl';
import posed from 'react-pose';

import { Colors } from '../../config';

const AnimatedContainer = posed.div({
  hoverable: true,
  hover: {
    scale: 1.2,
  },
});

const Container = styled(AnimatedContainer)`
  height: 10px;
  width: 10px;
  background-color: ${Colors.PRIMARY};
  border-radius: 5px;
`;

interface MapMarkerProps {
  latitude: number;
  longitude: number;
  onClick: () => void;
}
const MapMarker: React.FunctionComponent<MapMarkerProps> = ({
  latitude,
  longitude,
  onClick,
}) => (
  <Marker latitude={latitude} longitude={longitude}>
    <Container onClick={onClick} />
  </Marker>
);

export default MapMarker;
