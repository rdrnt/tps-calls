import * as React from 'react';
import styled from 'styled-components';
import { Marker } from 'react-mapbox-gl';
import { Coordinates } from '@rdrnt/tps-calls-shared';
import { darken, rgba } from 'polished';
import posed from 'react-pose';

interface AnimatedMapMarker {
  coordinates: Coordinates;
  color: string;
  size?: number;
}

const getRgbaForAnimation = (opacity: number, color: string) =>
  rgba(darken(0.2, color), opacity);

const Dot = styled.div<{ color: string; size: number }>`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  background-color: ${props => props.color};
`;

const AnimatedDot = posed(Dot)(props => ({
  animate: {
    'box-shadow': `0px 0px 0px 0px ${getRgbaForAnimation(
      0.6,
      props.color as string
    )}`,
    transition: () => ({
      type: 'keyframes',
      values: [
        `0px 0px 0px 0px ${getRgbaForAnimation(0.8, props.color as string)}`,
        `0px 0px 0px 8px ${getRgbaForAnimation(0.0, props.color as string)}`,
        `0px 0px 0px 0px ${getRgbaForAnimation(0, props.color as string)}`,
      ],
      duration: 1500,
      loop: Infinity,
    }),
  },
}));

const AnimatedMapMarker: React.FunctionComponent<AnimatedMapMarker> = ({
  coordinates,
  color,
  size = 15,
}) => (
  <Marker
    coordinates={[coordinates.longitude, coordinates.latitude]}
    style={{ zIndex: 0 }}
    anchor="center"
  >
    <AnimatedDot initialPose="none" pose="animate" color={color} size={size} />
  </Marker>
);

export default AnimatedMapMarker;
