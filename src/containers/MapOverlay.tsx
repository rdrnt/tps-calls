import * as React from 'react';
import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';
import { connect } from 'react-redux';
import { toggleDrawer } from '../store/ui/actions';
import { AppState } from '../store';

import Drawer from '../components/Drawer';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

const DrawerOpenButton = styled.button`
  height: 50px;
  width: 50px;
  background-color: transparent;
  border: none;
  pointer-events: auto;
  margin: 22px;

  svg {
    height: 100%;
    width: 100%;
  }
`;

interface MapOverlayProps {
  toggleDrawerState: (value: boolean) => void;
  drawerOpen: boolean;
}

const MapOverlay: React.FunctionComponent<MapOverlayProps> = ({
  toggleDrawerState,
  drawerOpen,
}) => (
  <Container>
    <Content>
      {!drawerOpen && (
        <DrawerOpenButton onClick={() => toggleDrawerState(true)}>
          <FiMenu />
        </DrawerOpenButton>
      )}
      {drawerOpen && <Drawer />}
    </Content>
  </Container>
);

export const mapStateToProps = (state: AppState) => ({
  drawerOpen: state.ui.drawerOpen,
});

export const mapDispatchToProps = (dispatch: any) => ({
  toggleDrawerState: (value: boolean) => dispatch(toggleDrawer(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapOverlay);
