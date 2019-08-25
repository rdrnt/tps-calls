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
    <div>
      <Text type={TextType.H3}>{incident.name}</Text>
      <Text type={TextType.P} secondaryFont={true}>
        {`${incident.location} - ${DateHelper.formatIncidentDate(
          incident.date
        )}`}
      </Text>
    </div>
  </Container>
);

export default IncidentCard;
