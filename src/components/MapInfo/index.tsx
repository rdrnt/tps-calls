import * as React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { FaSearch } from 'react-icons/fa';
import { Incident } from 'tps-calls-shared';
import { useDispatch } from 'react-redux';

import { Sizes, Colors } from '../../config';

import SelectedIncident, {
  HEIGHT as SELECTED_INCIDENT_HEIGHT,
} from './SelectedIncident';
import { setSelectedIncident } from '../../store/incidents/actions';

const HEIGHT = 35;

const AnimatedContainer = posed.div({
  default: {
    height: HEIGHT,
    opacity: 1,
  },
  dim: {
    opacity: 0.3,
  },
  expand: {
    height: SELECTED_INCIDENT_HEIGHT,
    opacity: 1,
  },
});

const Container = styled(AnimatedContainer)`
  position: absolute;
  bottom: ${Sizes.SPACING * 2}px;
  left: calc(50% - 150px);
  width: 300px;
  height: ${HEIGHT}px;
  display: flex;
  background-color: ${Colors.BACKGROUND};
  border: none;
  padding: 7px;
  border-radius: 3px;
`;

const Content = styled.button`
  height: 100%;
  width: 100%;
  background-color: ${Colors.BACKGROUND_SECONDARY};
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-self: center;
  border: none;
  padding: 7px;
  pointer-events: auto;
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
  ENTER = 'enter',
  EXIT = 'exit',
  CLOSE = 'close',
  EXPAND = 'expand',
}

interface MapInfo {
  toggleDrawer: (value: boolean) => void;
  isInteractingWithMap: boolean;
  drawerOpen: boolean;
  selectedIncident?: Incident<any>;
}

const MapInfo: React.FunctionComponent<MapInfo> = ({
  toggleDrawer,
  isInteractingWithMap,
  drawerOpen,
  selectedIncident,
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
      setAnimationState(Animation.EXPAND);
    }
    // If we have no selected incident & we're not interacting with the map, set to defaults
    if (!selectedIncident && !isInteractingWithMap) {
      setAnimationState(Animation.DEFAULT);
    }
  }, [isInteractingWithMap, drawerOpen, selectedIncident]);

  React.useEffect(() => {
    console.log(animationState);
  }, [animationState]);

  return (
    <Container pose={animationState}>
      {selectedIncident ? (
        <SelectedIncident close={() => dispatch(setSelectedIncident())}>
          <Text>{selectedIncident.name}</Text>
          <button
            type="button"
            onClick={() => setAnimationState(Animation.DEFAULT)}
          >
            close
          </button>
        </SelectedIncident>
      ) : (
        <Content type="button" onClick={() => toggleDrawer(true)}>
          <Text>Search for stabbing, theft, etc...</Text>
          <IconContainer>
            <FaSearch />
          </IconContainer>
        </Content>
      )}
    </Container>
  );
};

export default MapInfo;
