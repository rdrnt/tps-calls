import * as React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { Colors, Sizes } from '../../config';
import { Incident } from 'tps-calls-shared';
import { connect } from 'react-redux';

import IncidentCard from '../Card/Incident';
import { AppState } from '../../store';
import { UIState } from '../../store/ui';
import { IncidentsState } from '../../store/incidents';

const AnimatedContainer = posed.div({
  enter: {},
  exit: {},
});

const Container = styled(AnimatedContainer)`
  height: 100vh;
  width: ${Sizes.DRAWER_WIDTH}px;
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.3s;
  z-index: 999;
  margin: 0;
`;

const List = styled.ul`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-y: auto;
`;

interface DrawerProps {
  incidents: IncidentsState;
  ui: UIState;
}

const Drawer: React.FunctionComponent<DrawerProps> = ({ ui, incidents }) => (
  <PoseGroup>
    {ui.drawerOpen && (
      <Container key="drawer">
        <List>
          {incidents.list.map(incident => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </List>
      </Container>
    )}
  </PoseGroup>
);

const mapStateToProps = (state: AppState) => ({
  incidents: state.incidents,
  ui: state.ui,
});

export default connect(mapStateToProps)(Drawer);
