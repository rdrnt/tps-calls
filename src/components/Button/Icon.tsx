import * as React from 'react';
import styled from 'styled-components';

import Icon, { IconProps } from '../Icon';

interface IconButtonProps {
  iconProps: IconProps;
  onClick?: () => void;
  size: number;
  borderRadius?: number;
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
}) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      height={size}
      width={size}
      borderRadius={borderRadius}
    >
      <Icon {...iconProps} size={iconProps.size || size} />
    </Button>
  );
};

export default IconButton;
