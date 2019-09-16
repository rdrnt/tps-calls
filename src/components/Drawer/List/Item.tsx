import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';
import Text from '../../Text';
import { Sizes } from '../../../config';
import { DateHelper } from '../../../helpers';

export interface DrawerListItem {
  incident: Incident<any>;
}

const Container = styled.li`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid black;
  padding: ${Sizes.SPACING}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DrawerListItem: React.FunctionComponent<DrawerListItem> = ({
  incident,
}) => {
  return (
    <Container>
      <Text as="h5">{incident.name}</Text>
      <Text as="p">{incident.location}</Text>
      <Text as="span">{DateHelper.formatIncidentDate(incident.date)}</Text>
    </Container>
  );
};

export default DrawerListItem;
