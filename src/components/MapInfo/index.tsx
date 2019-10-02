import * as React from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { Incident } from 'tps-calls-shared';

import { DateHelper } from '../../helpers';
import { Sizes, Colors } from '../../config';
import Text from '../Text';

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
  left: calc(50% - ${350 / 2}px);
  width: 350px;
  height: auto;
  min-height: 50px;
  background-color: ${Colors.BACKGROUND};
  border-radius: 10px;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  padding: ${Sizes.SPACING / 2}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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
            <Text as="h5" size={20}>
              {incident.name}
            </Text>
            <Text as="p" size={14} lineHeight={16}>
              {incident.location}
            </Text>
            <Text as="span" size={12}>
              {DateHelper.formatIncidentDate(incident.date)}
            </Text>
          </Content>
        </Container>
      )}
    </PoseGroup>
  );
};

export default MapInfo;
