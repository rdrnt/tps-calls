import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';
import VisibilitySensor from 'react-visibility-sensor';

import Text from '../../Text';
import { Sizes, Colors } from '../../../config';
import { DateHelper } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { setSelectedIncident } from '../../../store/incidents/actions';
import posed from 'react-pose';

export interface DrawerListItem {
  incident: Incident<any>;
  scrollPosition: number;
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
  background-color: ${Colors.BACKGROUND};
  padding: ${Sizes.SPACING / 2}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${Sizes.SPACING / 2}px;
  border-radius: 10px;

  :hover {
    background-color: ${Colors.PRIMARY};

    * {
      color: white;
    }
  }
`;

const DrawerListItem: React.FunctionComponent<DrawerListItem> = ({
  incident,
  scrollPosition,
}) => {
  const dispatch = useDispatch();
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
      <Container
        pose={animationState}
        onClick={() => dispatch(setSelectedIncident(incident))}
      >
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
