import * as React from 'react';
import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';
import { connect } from 'react-redux';
import { toggleDrawer } from '../store/ui/actions';
import { AppState } from '../store';

import posed, { PoseGroup } from 'react-pose';

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
  isInteractingWithMap: boolean;
}

const MapOverlay: React.FunctionComponent<MapOverlayProps> = ({
  toggleDrawerState,
  drawerOpen,
  isInteractingWithMap,
}) => (
  <Container>
    <Content>
      {!drawerOpen && (
        <DrawerOpenButton
          key="drawer-button"
          onClick={() => toggleDrawerState(true)}
        >
          <FiMenu />
        </DrawerOpenButton>
      )}
      <PoseGroup>{drawerOpen && <Drawer key="muppet" />}</PoseGroup>
    </Content>
  </Container>
);

export const mapStateToProps = (state: AppState) => ({
  ...state.ui,
});

export const mapDispatchToProps = (dispatch: any) => ({
  toggleDrawerState: (value: boolean) => dispatch(toggleDrawer(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapOverlay);
