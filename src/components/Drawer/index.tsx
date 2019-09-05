import * as React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { Colors, Sizes } from '../../config';
import { Incident } from 'tps-calls-shared';
import { connect, useDispatch } from 'react-redux';

import IncidentCard from '../Card/Incident';
import { AppState } from '../../store';
import { UIState } from '../../store/ui';
import { IncidentsState } from '../../store/incidents';
import { toggleDrawer } from '../../store/ui/actions';
import IncidentView from './Incident';

const Container = styled.div`
  height: 100%;
  width: ${Sizes.DRAWER_WIDTH}px;
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.3s;
  z-index: 999;
  margin: 0;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

interface DrawerProps {
  incidents: IncidentsState;
  ui: UIState;
}

enum DrawerViews {
  INCIDENT = 'incident',
  DEFAULT = 'default',
}

const Drawer: React.FunctionComponent<DrawerProps> = ({ ui, incidents }) => {
  const dispatch = useDispatch();

  const [currentView, setView] = React.useState<DrawerViews>(
    DrawerViews.DEFAULT
  );

  React.useEffect(() => {
    if (incidents.selected) {
      setView(DrawerViews.INCIDENT);
      dispatch(toggleDrawer(true));
    } else if (!incidents.selected) {
      setView(DrawerViews.DEFAULT);
    }
  }, [incidents.selected]);

  if (ui.drawerOpen) {
    return (
      <Container>
        {currentView === DrawerViews.DEFAULT && (
          <List>
            {incidents.list.map(incident => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </List>
        )}

        {currentView === DrawerViews.INCIDENT && incidents.selected && (
          <IncidentView incident={incidents.selected} />
        )}
      </Container>
    );
  }

  return null;
};

const mapStateToProps = (state: AppState) => ({
  incidents: state.incidents,
  ui: state.ui,
});

export default connect(mapStateToProps)(Drawer);
