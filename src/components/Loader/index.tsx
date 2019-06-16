import * as React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { Colors } from '../../config';

const AnimatedContainer = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
});

const Container = styled(AnimatedContainer)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  background-color: ${Colors.BACKGROUND};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  font-size: 26px;
  color: ${Colors.TEXT_PRIMARY};
`;

export interface Loader {
  open: boolean;
  message?: string;
}

const Loader: React.FunctionComponent<Loader> = ({ open, message }) => (
  <PoseGroup>
    {open && (
      <Container key="loader">{message && <Text>{message}</Text>}</Container>
    )}
  </PoseGroup>
);

const mapStateToProps = (state: AppState) => ({
  ...state.ui.loader,
});

export default connect(mapStateToProps)(Loader);
