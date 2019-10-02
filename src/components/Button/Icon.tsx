import * as React from 'react';
import styled from 'styled-components';

import Icon, { IconProps } from '../Icon';

interface IconButtonProps {
  iconProps: IconProps;
  onClick?: () => void;
  size: number;
  borderRadius?: number;
  hoverColor?: string;
}

const Button = styled.button<{
  height: number;
  width: number;
  borderRadius?: number;
}>`
  border: none;
  padding: 0;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: transparent;
  border-radius: ${props =>
    props.borderRadius ? `${props.borderRadius}px` : 0};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconButton: React.FunctionComponent<IconButtonProps> = ({
  iconProps,
  onClick,
  size,
  borderRadius,
  hoverColor,
}) => {
  const [isHovering, setIsHovering] = React.useState<boolean>(false);

  const determineColor = () => {
    if (hoverColor && isHovering) {
      return hoverColor;
    }

    return iconProps.color;
  };
  return (
    <Button
      type="button"
      onClick={onClick}
      height={size}
      width={size}
      borderRadius={borderRadius}
      {...hoverColor && {
        onMouseOver: () => setIsHovering(true),
        onMouseOut: () => setIsHovering(false),
      }}
    >
      <Icon
        {...iconProps}
        color={determineColor()}
        size={iconProps.size || size}
      />
    </Button>
  );
};

export default IconButton;
