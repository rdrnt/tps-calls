import * as React from 'react';
import styled from 'styled-components';
import { Marker } from 'react-map-gl';
import { Feature } from 'react-mapbox-gl';
import posed from 'react-pose';

import { Colors } from '../../config';

const AnimatedContainer = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  hover: {
    scale: 1.2,
  },
  default: {
    scale: 1.0,
  },
});

const Container = styled(AnimatedContainer)`
  height: 10px;
  width: 10px;
  background-color: ${Colors.PRIMARY};
  border-radius: 5px;
  z-index: 1;
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
}) => {
  const [isHovering, setIsHovering] = React.useState<boolean>(false);
  console.log(longitude, latitude);
  return <Feature coordinates={[longitude, latitude]} />;
};
export default MapMarker;
