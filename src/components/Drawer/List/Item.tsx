import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';
import Text from '../../Text';
import { Sizes, Colors } from '../../../config';
import { DateHelper } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { setSelectedIncident } from '../../../store/incidents/actions';

export interface DrawerListItem {
  incident: Incident<any>;
}

const Container = styled.li`
  height: 75px;
  background-color: ${Colors.BACKGROUND};
  padding: ${Sizes.SPACING / 2}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${Sizes.SPACING / 2}px;
  border-radius: 10px;

  :hover {
    background-color: white;
  }
`;

const DrawerListItem: React.FunctionComponent<DrawerListItem> = ({
  incident,
}) => {
  const dispatch = useDispatch();

  return (
    <Container onClick={() => dispatch(setSelectedIncident(incident))}>
      <Text as="h5">{incident.name}</Text>
      <Text as="p" size={12} lineHeight={14}>
        {incident.location}
      </Text>
      <Text as="span">{DateHelper.formatIncidentDate(incident.date)}</Text>
    </Container>
  );
};

export default DrawerListItem;
