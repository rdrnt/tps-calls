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
}
const MapMarker: React.FunctionComponent<MapMarkerProps> = ({
  latitude,
  longitude,
}) => (
  <Marker latitude={latitude} longitude={longitude}>
    <Container />
  </Marker>
);

export default MapMarker;
