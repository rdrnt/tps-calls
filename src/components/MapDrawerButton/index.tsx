import * as React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';

import { Colors } from '../../config';
import Icon from '../Icon';
import { onHover } from '../../helpers/hooks';

interface MapDrawerButton {
  openDrawer: () => void;
  hidden: boolean;
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
  right: 15px;
  height: 50px;
  width: 50px;
  border: none;
  border-radius: 25px;
  background-color: ${Colors.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${Colors.BACKGROUND_SECONDARY};
  }
`;

const MapDrawerButton: React.FunctionComponent<MapDrawerButton> = ({
  openDrawer,
  hidden,
}) => {
  const [hovering, hoverProps] = onHover();

  return (
    <Container
      pose={hidden ? 'exit' : 'enter'}
      type="button"
      onClick={openDrawer}
      {...hoverProps}
    >
      <Icon
        name="menu"
        size={25}
        color={hovering ? Colors.PRIMARY : Colors.BACKGROUND}
      />
    </Container>
  );
};

export default MapDrawerButton;
