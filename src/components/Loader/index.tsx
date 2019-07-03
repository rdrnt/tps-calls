import * as React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { AppState } from '../../store';
import { connect } from 'react-redux';

import { Colors } from '../../config';

import Text, { TextType } from '../Text';

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

export interface Loader {
  open: boolean;
  message?: string;
}

const Loader: React.FunctionComponent<Loader> = ({ open, message }) => (
  <PoseGroup>
    {open && (
      <Container key="loader">
        {message && (
          <Text type={TextType.H1} bold={true}>
            {message}
          </Text>
        )}
      </Container>
    )}
  </PoseGroup>
);

const mapStateToProps = (state: AppState) => ({
  ...state.ui.loader,
});

export default connect(mapStateToProps)(Loader);
