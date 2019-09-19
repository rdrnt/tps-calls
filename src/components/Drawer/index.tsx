import * as React from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { useDispatch, useSelector } from 'react-redux';

import { Colors, Sizes } from '../../config';
import { AppState } from '../../store';
import { UIState } from '../../store/ui';
import { IncidentsState } from '../../store/incidents';
import { toggleDrawer } from '../../store/ui/actions';
import { setSelectedIncident } from '../../store/incidents/actions';

import IncidentView from './Incident';
import DrawerList from './List';

const DesktopDrawerStyles = css`
  left: ${Sizes.SPACING}px;
  top: 12.5%;
  height: 75%;
  width: ${Sizes.DRAWER_WIDTH}px;
  max-width: ${Sizes.DRAWER_WIDTH}px;
  border-radius: 8px;
  box-shadow: 1px 2px rgba(0, 0, 0, 0.2);
`;

const MobileDrawerStyles = css`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Container = styled(
  posed.div({
    enter: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  })
)`
  position: absolute;
  @media only screen and (max-width: 600px) {
    ${MobileDrawerStyles};
  }
  @media only screen and (min-width: 600px) {
    ${DesktopDrawerStyles};
  }
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

  return (
    <PoseGroup>
      {uiState.drawerOpen && (
        <Container key="drawer">
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
      )}
    </PoseGroup>
  );
};

export default Drawer;
