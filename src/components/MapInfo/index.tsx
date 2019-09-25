import * as React from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { FaSearch } from 'react-icons/fa';
import { Incident } from 'tps-calls-shared';

import { Sizes, Colors } from '../../config';

const AnimatedContainer = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
});

const Container = styled(AnimatedContainer)`
  position: absolute;
  bottom: ${Sizes.SPACING * 4}px;
  left: calc(50% - (350 / 2)) px;
  width: 350px;
  height: auto;
  min-height: 50px;
  background-color: ${Colors.BACKGROUND};
`;

interface MapInfo {
  incident?: Incident<any>;
}

const MapInfo: React.FunctionComponent<MapInfo> = ({ incident }) => {
  return <PoseGroup>{incident && <Container key="info" />}</PoseGroup>;
};

export default MapInfo;
