import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';
import { Colors } from '../../config';

import Text, { TextType } from '../Text';
import { DateHelper } from '../../helpers';

const Container = styled.li`
  height: 75px;
  width: 100%;
  background-color: ${Colors.BACKGROUND_SECONDARY};
  border-bottom: 1px solid ${Colors.BACKGROUND};
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    flex-direction: column;
  }
`;

interface DrawerItemProps {
  incident: Incident<any>;
}

const Item: React.FunctionComponent<DrawerItemProps> = ({ incident }) => (
  <Container>
    <div>
      <Text type={TextType.H3}>{incident.name}</Text>
      <Text type={TextType.P}>
        {DateHelper.formatIncidentDate(incident.date)}
      </Text>
    </div>
  </Container>
);

export default Item;
