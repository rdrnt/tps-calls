import * as React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

import { Colors } from '../../config';
import Icon from '../Icon';

interface MapDrawerButton {
  openDrawer: () => void;
}

const AnimatedContainer = posed.button({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
});

const Container = styled(AnimatedContainer)`
  position: absolute;
  top: 15px;
  left: 15px;
  height: 50px;
  width: 50px;
  border: none;
  border-radius: 25px;
  background-color: ${Colors.BACKGROUND};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${Colors.SECONDARY};
  }
`;

const MapDrawerButton: React.FunctionComponent<MapDrawerButton> = ({
  openDrawer,
}) => {
  const [isHovering, setIsHovering] = React.useState<boolean>(false);
  return (
    <Container
      type="button"
      onClick={openDrawer}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <Icon
        name="menu"
        size={25}
        color={isHovering ? Colors.BACKGROUND : Colors.SECONDARY}
      />
    </Container>
  );
};

export default MapDrawerButton;
