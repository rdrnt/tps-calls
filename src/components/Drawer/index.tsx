import * as React from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { Colors, Sizes } from '../../config';
import { connect, useDispatch, useSelector } from 'react-redux';

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
  box-shadow: 1px 2px rgba(0, 0, 0, 0.2);
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

const Drawer: React.FunctionComponent<DrawerProps> = ({}) => {
  const dispatch = useDispatch();
  const incidentsState = useSelector((state: AppState) => state.incidents);
  const uiState = useSelector((state: AppState) => state.ui);

  const [currentView, setView] = React.useState<DrawerViews>(
    DrawerViews.DEFAULT
  );

  React.useEffect(() => {
    // if the drawer is closing and we were looking at an incident, unselect it
    if (!uiState.drawerOpen && currentView === DrawerViews.INCIDENT) {
      dispatch(setSelectedIncident(undefined));
    }
  }, [uiState.drawerOpen]);

  React.useEffect(() => {
    if (incidentsState.selected) {
      setView(DrawerViews.INCIDENT);
      if (!uiState.drawerOpen) {
        dispatch(toggleDrawer(true));
      }
    } else if (!incidentsState.selected) {
      setView(DrawerViews.DEFAULT);
    }
  }, [incidentsState.selected]);

  if (uiState.drawerOpen) {
    return (
      <Container>
        {currentView === DrawerViews.DEFAULT && (
          <DrawerList
            incidents={incidentsState.list}
            filter={incidentsState.filter}
          />
        )}

        {currentView === DrawerViews.INCIDENT && incidentsState.selected && (
          <IncidentView incident={incidentsState.selected} />
        )}
      </Container>
    );
  }

  return null;
};

export default Drawer;
