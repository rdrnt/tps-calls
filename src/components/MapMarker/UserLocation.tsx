import * as React from 'react';
import styled from 'styled-components';
import { Marker } from 'react-mapbox-gl';
import { Coordinates } from '@rdrnt/tps-calls-shared';
import { darken, rgba } from 'polished';
import posed from 'react-pose';

import { Colors } from '../../config';

interface MapMarkerUserLocation {
  coordinates: Coordinates;
}

const getRgbaForAnimation = (opacity: number) =>
  rgba(darken(0.2, Colors.PRIMARY), opacity);

const Dot = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 7.5px;
  background-color: ${darken(0.2, Colors.PRIMARY)};
`;

const AnimatedDot = posed(Dot)({
  animate: {
    'box-shadow': `0px 0px 0px 0px ${getRgbaForAnimation(0.6)}`,
    transition: () => ({
      type: 'keyframes',
      values: [
        `0px 0px 0px 0px ${getRgbaForAnimation(0.8)}`,
        `0px 0px 0px 6px ${getRgbaForAnimation(0.4)}`,
        `0px 0px 0px 0px ${getRgbaForAnimation(0)}`,
      ],
      duration: 1500,
      loop: Infinity,
    }),
  },
});

const MapMarkerUserLocation: React.FunctionComponent<MapMarkerUserLocation> = ({
  coordinates,
}) => {
  return (
    <Marker
      coordinates={[coordinates.longitude, coordinates.latitude]}
      style={{ zIndex: 0 }}
    >
      <AnimatedDot initialPose="none" pose="animate" />
    </Marker>
  );
};

export default MapMarkerUserLocation;
