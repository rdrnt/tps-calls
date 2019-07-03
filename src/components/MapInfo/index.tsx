import * as React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { FaSearch } from 'react-icons/fa';

import { Sizes, Colors } from '../../config';
import { Incident } from 'tps-calls-shared';

const AnimatedContainer = posed.button({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  dim: {
    opacity: 0.3,
  },
});

const Container = styled(AnimatedContainer)`
  position: absolute;
  bottom: ${Sizes.SPACING * 2}px;
  left: calc(50% - 150px);
  width: 300px;
  height: 50px;
  background-color: ${Colors.BACKGROUND};
  border: none;
  padding: 7px;
  pointer-events: auto;
`;

const Content = styled.div`
  background-color: ${Colors.BACKGROUND_SECONDARY};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
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

const determineAnimation = ({
  drawerOpen,
  isInteractingWithMap,
}: {
  isInteractingWithMap: boolean;
  drawerOpen: boolean;
}): string => {
  if (isInteractingWithMap) {
    return 'dim';
  }

  if (!drawerOpen && !isInteractingWithMap) {
    return 'enter';
  }

  if (drawerOpen) {
    return 'exit';
  }

  if (!drawerOpen) {
    return 'close';
  }

  return '';
};

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
  return (
    <Container
      pose={determineAnimation({
        isInteractingWithMap,
        drawerOpen,
      })}
      onClick={() => toggleDrawer(true)}
    >
      {selectedIncident && (
        <Content>
          <Text>{selectedIncident.name}</Text>
        </Content>
      )}
      <Content>
        <Text>Search for stabbing, theft, etc...</Text>
        <IconContainer>
          <FaSearch />
        </IconContainer>
      </Content>
    </Container>
  );
};

export default MapInfo;
