import * as React from 'react';
import styled, { css } from 'styled-components';
import posed from 'react-pose';
import { FaSearch } from 'react-icons/fa';

import { Sizes, Colors } from '../../config';

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
  display: flex;
  background-color: ${Colors.BACKGROUND};
  border: none;
  padding: 5px;
  border-radius: 4px;
`;

const ButtonContent = styled.button`
  height: auto; /* Dont use 100% because it will be max height during the animation*/
  width: 100%;
  background-color: ${Colors.BACKGROUND_SECONDARY};
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-self: center;
  border: none;
  pointer-events: auto;
  border-radius: 4px;
  flex-grow: 1;
`;

const Text = styled.span`
  color: black;
  font-size: 14px;
`;

const IconContainer = styled.div`
  height: 100%;
  width: 25px;
  border-left: 1px solid black;
  display: flex;
  justify-content: center;
`;

export enum Animation {
  DEFAULT = 'default',
  DIM = 'dim',
}

interface MapInfo {
  toggleDrawer: (value: boolean) => void;
  dim: boolean;
}

const MapInfo: React.FunctionComponent<MapInfo> = ({ toggleDrawer, dim }) => {
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
      <ButtonContent type="button" onClick={() => toggleDrawer(true)}>
        <Text>Search for stabbing, theft, etc...</Text>
        <IconContainer>
          <FaSearch />
        </IconContainer>
      </ButtonContent>
    </Container>
  );
};

export default MapInfo;
