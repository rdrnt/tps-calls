import * as React from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { Colors, Sizes } from '../../config';
import { connect, useDispatch } from 'react-redux';

import { AppState } from '../../store';
import { UIState } from '../../store/ui';
import { IncidentsState } from '../../store/incidents';
import { toggleDrawer } from '../../store/ui/actions';

import IncidentView from './Incident';
import DrawerList from './List';
import { setSelectedIncident } from '../../store/incidents/actions';

const DesktopDrawerStyles = css`
  left: ${Sizes.SPACING}px;
  top: 12.5%;
  height: 75%;
  width: ${Sizes.DRAWER_WIDTH}px;
  max-width: ${Sizes.DRAWER_WIDTH}px;
  border-radius: 8px;
  box-shadow: 2px 2px black;
`;

const Container = styled.div`
  position: absolute;
  ${DesktopDrawerStyles};
  background-color: ${Colors.BACKGROUND};
  z-index: 999;
  margin: 0;
  overflow: hidden;
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
    // if the drawer is closing and we were looking at an incident, unselect it
    if (!ui.drawerOpen && currentView === DrawerViews.INCIDENT) {
      dispatch(setSelectedIncident(undefined));
    }
  }, [ui.drawerOpen]);

  React.useEffect(() => {
    if (incidents.selected) {
      setView(DrawerViews.INCIDENT);
      if (!ui.drawerOpen) {
        dispatch(toggleDrawer(true));
      }
    } else if (!incidents.selected) {
      setView(DrawerViews.DEFAULT);
    }
  }, [incidents.selected]);

  if (ui.drawerOpen) {
    return (
      <Container>
        {currentView === DrawerViews.DEFAULT && (
          <DrawerList incidents={incidents.list} />
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
