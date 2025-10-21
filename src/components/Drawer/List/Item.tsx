import * as React from 'react';
import styled from 'styled-components';
import { Incident } from '@rdrnt/tps-calls-shared';

import Text from '../../Text';
import { Sizes, Colors } from '../../../config';
import { DateHelper } from '../../../helpers';

export interface DrawerListItem {
  incident: Incident<any>;
  onClick: () => void;
}

const Container = styled.li`
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

  &:hover {
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
  return (
    <Container onClick={onClick}>
      <Text as="h5">{incident.name}</Text>
      <Text as="p" size={12} lineHeight={14}>
        {incident.location}
      </Text>
      <Text as="span">{DateHelper.formatIncidentDate(incident.date)}</Text>
    </Container>
  );
};

export default DrawerListItem;
