import * as React from 'react';
import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';
import { connect } from 'react-redux';
import { toggleDrawer } from '../store/ui/actions';
import { AppState } from '../store';

import posed, { PoseGroup } from 'react-pose';

import Drawer from '../components/Drawer';
import SearchButton from '../components/MapSearchButton';

const AnimatedContainer = posed.div({
  dim: {
    opacity: 0.2,
  },
  show: {
    opacity: 1,
  },
});

const Container = styled(AnimatedContainer)`
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
  <Container pose={isInteractingWithMap ? 'dim' : 'show'}>
    <Content>
      {!drawerOpen && (
        <SearchButton key="search-button" toggleDrawer={toggleDrawerState} />
      )}
      {drawerOpen && <Drawer key="drawer" />}
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
