import * as React from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { FaSearch } from 'react-icons/fa';
import { Incident } from 'tps-calls-shared';

import { Sizes, Colors } from '../../config';
import IncidentView, { WIDTH as IncidentViewWidth } from './Incident';
import DefaultView from './Default';

const HEIGHT = 35;
const DEFAULT_WIDTH = 275;

const AnimatedContainer = posed.div({
  default: {
    opacity: 1,
  },
  dim: {
    opacity: 0.2,
  },
});

const Container = styled(AnimatedContainer)<{ width: number }>`
  position: absolute;
  bottom: ${Sizes.SPACING * 4}px;
  left: ${props => `calc(50% - ${props.width / 2}px)`};
  width: auto;
  min-width: ${DEFAULT_WIDTH}px;
  max-width: 350px;
  height: auto;
  min-height: ${HEIGHT}px;
  transition: 1s height;
  transition: 1s width;
`;

export enum Animation {
  DEFAULT = 'default',
  DIM = 'dim',
}

interface MapInfo {
  openDrawer: () => void;
  dim: boolean;
  selectedIncident?: Incident<any>;
}

const MapInfo: React.FunctionComponent<MapInfo> = ({
  openDrawer,
  dim,
  selectedIncident,
}) => {
  const [animationState, setAnimationState] = React.useState<Animation>(
    Animation.DEFAULT
  );
  const [width, setWidth] = React.useState<number>(DEFAULT_WIDTH);

  React.useEffect(() => {
    // If they're moving the map and we don't have a selected incident
    // Dim the map info search box
    if (!dim) {
      setAnimationState(Animation.DEFAULT);
      setWidth(DEFAULT_WIDTH);
    }

    if (dim) {
      setAnimationState(Animation.DIM);
    }
  }, [dim]);

  /*
  React.useEffect(() => {
    console.log(animationState);
  }, [animationState]);
  */

  return (
    <Container pose={animationState} width={width}>
      {!selectedIncident && <DefaultView onClick={openDrawer} />}

      {selectedIncident && (
        <IncidentView
          key="incident"
          onOpen={() => setWidth(IncidentViewWidth)}
        />
      )}
    </Container>
  );
};

export default MapInfo;
