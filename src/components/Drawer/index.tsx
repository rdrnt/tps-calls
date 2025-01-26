import * as React from 'react';
import styled, { css } from 'styled-components';
import { AnimatePresence, motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';

import { Colors, Sizes } from '../../config';
import { AppState } from '../../store';
import { toggleDrawer } from '../../store/ui/actions';
import {
  setSelectedIncident,
  SetIncidentFilterParams,
  setIncidentFilter,
} from '../../store/incidents/actions';

import DrawerHeader from './Header';

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

const Container = styled(motion.div)`
  position: absolute;
  @media only screen and (max-width: 600px) {
    ${MobileDrawerStyles};
  }
  @media only screen and (min-width: 600px) {
    ${DesktopDrawerStyles};
  }
  background-color: ${Colors.BACKGROUND};
  z-index: 3;
  margin: 0;
  overflow: hidden;
  border: none;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.BACKGROUND_SECONDARY};
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

  const setFilter = ({ values, merge }: SetIncidentFilterParams) => {
    dispatch(setIncidentFilter({ values, merge }));
  };

  return (
    <AnimatePresence>
      {uiState.drawerOpen && (
        <Container
          key="drawer"
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              x: {
                duration: 150,
                ease: 'easeInOut',
              },
            },
          }}
          exit={{
            x: -Sizes.DRAWER_WIDTH,
            opacity: 0,
          }}
        >
          <Content>
            <DrawerHeader
              setFilter={setFilter}
              filters={incidentsState.filter}
              closeDrawer={() => dispatch(toggleDrawer(false))}
            />
            <DrawerList
              incidents={incidentsState.list}
              setSelectedIncident={(incident) =>
                dispatch(setSelectedIncident(incident))
              }
            />
          </Content>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
