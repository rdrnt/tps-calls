import * as React from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { Incident } from 'tps-calls-shared';

import { DateHelper } from '../../helpers';
import { Sizes, Colors } from '../../config';
import Text from '../Text';

const WIDTH = 325;

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
  bottom: ${Sizes.SPACING * 3}px;
  left: calc(50% - ${WIDTH / 2}px);
  width: ${WIDTH}px;
  height: auto;
  min-height: 50px;
  background-color: ${Colors.BACKGROUND};
  border-radius: 8px;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;

  > div {
    margin: 0 ${Sizes.SPACING / 2}px;
    padding: ${Sizes.SPACING / 2}px 0;

    &:first-child {
      margin-top: 0;
    }
  }
`;

const IncidentContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ExtraContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid ${Colors.BACKGROUND_SECONDARY};
`;

const ExtraAction = styled.button`
  padding: ${Sizes.SPACING / 2}px;
  background-color: ${Colors.SECONDARY};
  border: none;
  border-radius: 8px;
`;

interface MapInfo {
  incident?: Incident<any>;
  drawerOpen: boolean;
}

const MapInfo: React.FunctionComponent<MapInfo> = ({
  incident,
  drawerOpen,
}) => {
  return (
    <PoseGroup>
      {incident && !drawerOpen && (
        <Container key="info">
          <Content>
            <IncidentContent>
              <Text as="h5">{incident.name}</Text>
              <Text as="p" size={14} lineHeight={16}>
                {incident.location}
              </Text>
              <Text as="span" size={12}>
                {DateHelper.formatIncidentDate(incident.date)}
              </Text>
            </IncidentContent>
            <ExtraContent>
              <ExtraAction type="button">
                <Text as="span" color="white">
                  Share
                </Text>
              </ExtraAction>
            </ExtraContent>
          </Content>
        </Container>
      )}
    </PoseGroup>
  );
};

export default MapInfo;
