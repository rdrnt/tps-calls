import * as React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import BounceLoader from 'react-spinners/BounceLoader';

import { Colors } from '../../config';

import Text from '../Text';

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  background-color: ${Colors.BACKGROUND};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Make the loader message smaller on mobile devices */
  > h1 {
    @media only screen and (max-width: 600px) {
      font-size: 43px;
    }
  }
`;

export interface Loader {
  open: boolean;
  message?: string;
}

const Loader: React.FunctionComponent<Loader> = ({ open, message }) => (
  <AnimatePresence>
    {open && (
      <Container key="loader" animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <BounceLoader color={Colors.PRIMARY} />
        {message && (
          <Text as="h1" weight="bold">
            {message}
          </Text>
        )}
      </Container>
    )}
  </AnimatePresence>
);

const mapStateToProps = (state: AppState) => ({
  ...state.ui.loader,
});

export default connect(mapStateToProps)(Loader);
