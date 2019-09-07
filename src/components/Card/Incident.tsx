import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';
import { Colors } from '../../config';

import Text from '../Text';
import { DateHelper, Translate } from '../../helpers';

const Container = styled.li`
  height: 50px;
  width: 100%;
  background-color: ${Colors.BACKGROUND};
  border-bottom: 1px solid ${Colors.BACKGROUND_SECONDARY};
  margin: 0;
  padding: 7px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IncidentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  word-break: break-all;
`;

const Icon = styled.div`
  height: 35px;
  width: 35px;
  min-height: 35px;
  min-width: 35px;
  background-color: ${Colors.PRIMARY};
  border-radius: 17.5px;
  margin-right: 7px;

  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    height: 20px;
    width: 20px;
    color: white;
  }
`;

interface IncidentCard {
  incident: Incident<any>;
}

const IncidentCard: React.FunctionComponent<IncidentCard> = ({ incident }) => (
  <Container>
    <Icon>{Translate.getIconForIncidentType(incident.type)}</Icon>
    <IncidentInfo>
      {/*
      <Text as="h5">{incident.name}</Text>
      <Text as="p">{incident.location}</Text>
      <Text as="span">{DateHelper.formatIncidentDate(incident.date)}</Text>
      */}
      <p style={{ fontSize: '2vw' }}>testing</p>
    </IncidentInfo>
  </Container>
);

export default IncidentCard;
