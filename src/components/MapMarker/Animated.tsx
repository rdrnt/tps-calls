import * as React from 'react';
import styled from 'styled-components';
import { Marker } from 'react-map-gl';
import { Coordinates } from '@rdrnt/tps-calls-shared';
import { darken, rgba } from 'polished';
import { motion } from 'motion/react';

interface AnimatedMapMarker {
  coordinates: Coordinates;
  color: string;
  size?: number;
}

const getRgbaForAnimation = (opacity: number, color: string) =>
  rgba(darken(0.2, color), opacity);

const Dot = styled(motion.div)<{ color: string; size: number }>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-color: ${(props) => props.color};
`;

const AnimatedMapMarker: React.FunctionComponent<AnimatedMapMarker> = ({
  coordinates,
  color,
  size = 15,
}) => (
  <Marker {...coordinates} style={{ zIndex: 0 }} anchor="center">
    <Dot
      animate={{
        boxShadow: `0px 0px 0px 0px ${getRgbaForAnimation(0.8, color)}`,
        transition: () => ({
          type: 'keyframes',
          values: [
            `0px 0px 0px 0px ${getRgbaForAnimation(0.8, color)}`,
            `0px 0px 0px 20px ${getRgbaForAnimation(0.0, color)}`,
            `0px 0px 0px 0px ${getRgbaForAnimation(0, color)}`,
          ],
          duration: 1500,
          loop: Infinity,
        }),
      }}
      color={color}
      size={size}
    />
  </Marker>
);

export default AnimatedMapMarker;
