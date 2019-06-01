import * as React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
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
  width: 300px;
  background-color: ${Colors.BACKGROUND};
`;

interface DrawerProps {
  open: boolean;
}

const Drawer: React.FunctionComponent<DrawerProps> = ({ open }) => {
  return <Container pose={open ? 'enter' : 'exit'} />;
};

export default Drawer;
