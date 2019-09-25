import * as React from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { FaSearch } from 'react-icons/fa';
import { Incident } from 'tps-calls-shared';

import { Sizes, Colors } from '../../config';
import IncidentView from './Incident';
import DefaultView from './Default';

const HEIGHT = 35;
const WIDTH = 275;

const AnimatedContainer = posed.div({
  default: {
    opacity: 1,
  },
  dim: {
    opacity: 0.2,
  },
});

const Container = styled(AnimatedContainer)`
  position: absolute;
  bottom: ${Sizes.SPACING * 6}px;
  left: calc(50% - ${WIDTH / 2}px);
  width: ${WIDTH}px;
  height: auto;
  min-height: ${HEIGHT}px;
  transition: 1s height ease-in-out;
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

  React.useEffect(() => {
    // If they're moving the map and we don't have a selected incident
    // Dim the map info search box
    if (!dim) {
      setAnimationState(Animation.DEFAULT);
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
    <Container pose={animationState}>
      {!selectedIncident && <DefaultView onClick={openDrawer} />}

      {selectedIncident && <IncidentView key="incident" />}
    </Container>
  );
};

export default MapInfo;
