import * as React from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { useDispatch, useSelector } from 'react-redux';

import { Colors, Sizes } from '../../config';
import { AppState } from '../../store';
import { toggleDrawer } from '../../store/ui/actions';
import { setSelectedIncident } from '../../store/incidents/actions';

import DrawerList from './List';

const DesktopDrawerStyles = css`
  left: 0;
  top: 0;
  height: 100%;
  width: ${Sizes.DRAWER_WIDTH}px;
  max-width: ${Sizes.DRAWER_WIDTH}px;
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
      x: 0,
      opacity: 1,
      transition: {
        x: {
          duration: 150,
          ease: 'easeInOut',
        },
      },
    },
    exit: {
      x: -Sizes.DRAWER_WIDTH,
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
  z-index: 2;
  margin: 0;
  overflow: hidden;
  border: none;
`;

const Drawer: React.FunctionComponent = ({}) => {
  const dispatch = useDispatch();
  const incidentsState = useSelector((state: AppState) => state.incidents);
  const uiState = useSelector((state: AppState) => state.ui);

  React.useEffect(() => {
    if (incidentsState.selected) {
      if (uiState.drawerOpen) {
        dispatch(toggleDrawer(false));
      }
    }
  }, [incidentsState.selected]);

  return (
    <PoseGroup>
      {uiState.drawerOpen && (
        <Container key="drawer">
          <DrawerList
            incidents={incidentsState.list}
            filter={incidentsState.filter}
          />
        </Container>
      )}
    </PoseGroup>
  );
};

export default Drawer;
