import * as React from 'react';
import styled from 'styled-components';
import { Incident } from '@rdrnt/tps-calls-shared';
import VisibilitySensor from 'react-visibility-sensor';

import Text from '../../Text';
import { Sizes, Colors } from '../../../config';
import { DateHelper } from '../../../helpers';
import posed from 'react-pose';

export interface DrawerListItem {
  incident: Incident<any>;
  onClick: () => void;
}

const AnimatedContainer = posed.li({
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
});

const Container = styled(AnimatedContainer)`
  height: 75px;
  width: 100%;
  background-color: ${Colors.BACKGROUND};
  padding: ${Sizes.SPACING / 2}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    background-color: ${Colors.PRIMARY};

    * {
      color: white;
    }
  }
`;

const DrawerListItem: React.FunctionComponent<DrawerListItem> = ({
  incident,
  onClick,
}) => {
  const [animationState, setAnimationState] = React.useState<
    'hidden' | 'visible'
  >('hidden');

  return (
    <VisibilitySensor
      onChange={isVisible => {
        setAnimationState(isVisible ? 'visible' : 'hidden');
      }}
      partialVisibility={true}
    >
      <Container pose={animationState} onClick={onClick}>
        <Text as="h5">{incident.name}</Text>
        <Text as="p" size={12} lineHeight={14}>
          {incident.location}
        </Text>
        <Text as="span">{DateHelper.formatIncidentDate(incident.date)}</Text>
      </Container>
    </VisibilitySensor>
  );
};

export default DrawerListItem;
