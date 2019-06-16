import * as React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { Colors, Sizes } from '../../config';
import { Incident } from 'tps-calls-shared';

import Item from './Item';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { UIState } from '../../store/ui';
import { IncidentsState } from '../../store/incidents';

const AnimatedContainer = posed.div({
  enter: {
    width: Sizes.DRAWER_WIDTH,
    opacity: 1,
  },
  exit: {
    width: 0,
    opacity: 0,
  },
});

const Container = styled(AnimatedContainer)`
  height: 100%;
  background-color: ${Colors.BACKGROUND};
  transition: 0.5s;
  z-index: 999;
  margin: 0;
`;

interface DrawerProps {
  incidents: IncidentsState;
  ui: UIState;
}

const Drawer: React.FunctionComponent<DrawerProps> = ({ ui, incidents }) => (
  <Container pose={ui.drawerOpen ? 'enter' : 'exit'}>
    {/*
      {incidents.list.map(incident => (
        <Item key={incident.id} incident={incident} />
      ))}
       */}
  </Container>
);

const mapStateToProps = (state: AppState) => ({
  incidents: state.incidents,
  ui: state.ui,
});

export default connect(mapStateToProps)(Drawer);
