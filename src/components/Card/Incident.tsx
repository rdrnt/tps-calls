import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';
import { Colors } from '../../config';

import Text, { TextType } from '../Text';
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

  div {
    flex-direction: column;
  }
`;

const Icon = styled.img`
  height: 35px;
  width: 35px;
  background-color: ${Colors.PRIMARY};
  border-radius: 17.5px;
  margin-right: 7px;
`;

interface IncidentCard {
  incident: Incident<any>;
}

const IncidentCard: React.FunctionComponent<IncidentCard> = ({ incident }) => (
  <Container>
    <Icon />
    <div>
      <Text type={TextType.H3}>{incident.name}</Text>
      <Text type={TextType.P} secondaryFont={true}>
        {DateHelper.formatIncidentDate(incident.date)}
      </Text>
    </div>
    <Text type={TextType.CAPTION}>
      {Translate.getNameForIncidentSource(incident.source)}
    </Text>
  </Container>
);

export default IncidentCard;
