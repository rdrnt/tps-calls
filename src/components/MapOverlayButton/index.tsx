import * as React from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';

import { Colors } from '../../config';
import Icon, { IconNames } from '../Icon';
import { onHover } from '../../helpers/hooks';

interface CssPosition {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

interface MapOverlayButton {
  onClick: () => void;
  position: CssPosition;
  iconName: IconNames;
  color?: string;
  hoverColor?: string;
  size?: number;
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

const Container = styled(AnimatedContainer)<{
  position: CssPosition;
}>`
  position: absolute;
  ${props => props.position.top && `top: ${props.position.top}px`};
  ${props => props.position.bottom && `bottom: ${props.position.bottom}px`};
  ${props => props.position.left && `left: ${props.position.left}px`};
  ${props => props.position.right && `right: ${props.position.right}px`};
  height: 45px;
  width: 45px;
  border: none;
  border-radius: 22.5px;
  background-color: ${Colors.BACKGROUND};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 4px 9px 1px rgba(0, 0, 0, 0.7);
`;

const MapOverlayButton: React.FunctionComponent<MapOverlayButton> = ({
  onClick,
  position,
  color = 'black',
  hoverColor = Colors.PRIMARY,
  iconName,
  size = 25,
  hidden,
}) => {
  const [hovering, hoverProps] = onHover();

  return (
    <PoseGroup>
      {!hidden && (
        <Container
          key={`overlay-${iconName}`}
          type="button"
          onClick={onClick}
          position={position}
          {...hoverProps}
        >
          <Icon
            name={iconName}
            size={size}
            color={hovering ? hoverColor : color}
          />
        </Container>
      )}
    </PoseGroup>
  );
};

export default MapOverlayButton;
