import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import Icon, { IconProps } from '../Icon';
import { onHover } from '../../helpers/hooks';

interface IconButtonProps {
  iconProps: IconProps;
  onClick?: () => void;
  size: number;
  borderRadius?: number;
  hoverColor?: string;
  backgroundColor?: string;
}

const Button = styled.button<{
  height: number;
  width: number;
  borderRadius?: number;
  backgroundColor: string;
}>`
  border: none;
  padding: 0;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: ${props => props.backgroundColor};
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
  backgroundColor = 'transparent',
}) => {
  const [hovering, hoverProps] = onHover();

  const determineIconColor = () => {
    if (hoverColor && hovering) {
      return hoverColor;
    }

    return iconProps.color;
  };

  const determineBackgroundColor = () => {
    if (hovering && backgroundColor !== 'transparent') {
      return darken(0.2, backgroundColor);
    }

    return backgroundColor;
  };

  return (
    <Button
      type="button"
      onClick={onClick}
      height={size}
      width={size}
      borderRadius={borderRadius}
      backgroundColor={determineBackgroundColor()}
      {...hoverProps}
    >
      <Icon
        {...iconProps}
        color={determineIconColor()}
        size={iconProps.size || size}
      />
    </Button>
  );
};

export default IconButton;
