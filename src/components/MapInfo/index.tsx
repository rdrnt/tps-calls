import * as React from 'react';
import styled, { css } from 'styled-components';
import posed from 'react-pose';
import { FaSearch } from 'react-icons/fa';
import { Incident } from 'tps-calls-shared';
import { useDispatch } from 'react-redux';

import { Sizes, Colors } from '../../config';

import { setSelectedIncident } from '../../store/incidents/actions';

const HEIGHT = 35;
const WIDTH = 275;

const AnimatedContainer = posed.div({
  default: {
    opacity: 1,
  },
  dim: {
    opacity: 0.3,
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

const DefaultContentStyles = css`
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
`;

const Content = styled.div`
  ${DefaultContentStyles};
  flex-grow: 1;
`;

const ButtonContent = styled.button`
  ${DefaultContentStyles};
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
  isInteractingWithMap: boolean;
  drawerOpen: boolean;
  selectedIncident?: Incident<any>;
  setSelectedIncident: typeof setSelectedIncident;
}

const MapInfo: React.FunctionComponent<MapInfo> = ({
  toggleDrawer,
  isInteractingWithMap,
  drawerOpen,
  selectedIncident,
  setSelectedIncident,
}) => {
  const dispatch = useDispatch();

  const [animationState, setAnimationState] = React.useState<Animation>(
    Animation.DEFAULT
  );

  React.useEffect(() => {
    // If they're moving the map and we don't have a selected incident
    // Dim the map info search box
    if (isInteractingWithMap && !selectedIncident) {
      setAnimationState(Animation.DIM);
    }
    // If the drawer is closed & not interacting with the map
    // Reset to defaults
    if (!drawerOpen && !isInteractingWithMap) {
      setAnimationState(Animation.DIM);
    }
    // if the drawer is open, dim
    if (drawerOpen) {
      setAnimationState(Animation.DIM);
    }
    // If we have a new selected incident, expand the box
    if (selectedIncident) {
      // setAnimationState(Animation.EXPAND);
      setAnimationState(Animation.DIM);
    }

    // If we have no selected incident & we're not interacting with the map, set to defaults
    if (!selectedIncident && !isInteractingWithMap) {
      setAnimationState(Animation.DEFAULT);
    }
  }, [isInteractingWithMap, drawerOpen, selectedIncident]);

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
