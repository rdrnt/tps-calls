import * as React from 'react';
import { Incident } from 'tps-calls-shared';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setSelectedIncident } from '../../../store/incidents/actions';
import { Sizes, Colors } from '../../../config';
import Text from '../../Text';
import { DEFAULT_TEXT_STYLES } from '../../Text/text.styles';

interface IncidentView {
  incident: Incident<any>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  > * {
    margin-bottom: ${Sizes.SPACING}px;
  }
`;

const Content = styled.div`
  padding: ${Sizes.SPACING / 2}px;
  width: 100%;

  > #incident-info {
    * > {
      margin-bottom: ${Sizes.SPACING / 3}px;
    }
  }
`;

const StreetviewImage = styled.div`
  width: 100%;
  height: 100px;
  background-color: red;
`;

const IncidentView: React.FunctionComponent<IncidentView> = ({ incident }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(setSelectedIncident(undefined));
    };
  }, []);

  return (
    <Container>
      <StreetviewImage />
      <Content>
        <div id="incident-info">
          <Text as="h2" size={DEFAULT_TEXT_STYLES.h2.size! - 10}>
            {incident.name}
          </Text>
          <Text as="h4">{incident.location}</Text>
          <Text as="p" color={Colors.TEXT_SECONDARY}>
            {incident.date.toDate().toDateString()}
          </Text>
        </div>
      </Content>
    </Container>
  );
};

export default IncidentView;
