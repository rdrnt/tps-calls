import * as React from 'react';
import styled from 'styled-components';
import { Marker } from 'react-map-gl';
import { Colors } from '../../config';

const Container = styled.div`
  height: 15px;
  width: 15px;
  background-color: ${Colors.SECONDARY};
  border-radius: 7.5px;
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
