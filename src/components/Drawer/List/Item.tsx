import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';
import Text from '../../Text';
import { Sizes, Colors } from '../../../config';
import { DateHelper } from '../../../helpers';

export interface DrawerListItem {
  incident: Incident<any>;
}

const Container = styled.li`
  width: 100%;
  height: 60px;
  background-color: ${Colors.BACKGROUND};
  border-bottom: 1px solid ${Colors.BACKGROUND_SECONDARY};
  padding: ${Sizes.SPACING / 2}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  :hover {
    background-color: ${Colors.BACKGROUND_SECONDARY};
  }
`;

const DrawerListItem: React.FunctionComponent<DrawerListItem> = ({
  incident,
}) => {
  return (
    <Container>
      <Text as="h5">{incident.name}</Text>
      <Text as="p" size={12}>
        {incident.location}
      </Text>
      <Text as="span">{DateHelper.formatIncidentDate(incident.date)}</Text>
    </Container>
  );
};

export default DrawerListItem;
